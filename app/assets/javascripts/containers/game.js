import { connect } from 'react-redux';
import Game from '../components/game';
import { addEvent } from '../actions/events';
import { addGroup, joinGroup, leaveGroup } from '../actions/groups.js';


function props(state){
  const { current_user, data } = state;

  const username = (user_id) => data.users.getIn([user_id, 'name'])
  const groups = data.groups.map(
    group => group.set('joined', group.get('members').includes(current_user.id))
                  .update('members', ms => ms.map(username))
  ).toIndexedSeq().toJS();

  return {
    title: 'Geweren en Explosies 24',
    image_url: 'http://fotodes.ru/upload/img1342258123.jpg',
    events: data.events.toList().toJS(),
    groups
  };
}

function actions(dispatch){
  return {
    eventActions: {
      add: e => dispatch(addEvent(e))
    },
    groupActions: {
      add: e => dispatch(addGroup(e)),
      join: e => dispatch(joinGroup(e)),
      leave: e => dispatch(leaveGroup(e))
    }
  };
}
export default connect(props, actions)(Game);