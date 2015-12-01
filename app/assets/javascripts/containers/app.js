import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from '../components/chat';
import Sidebar from '../components/sidebar';
import ShowUser from './user';
import { sendMessage } from '../actions/messages';

class App extends Component {
  renderContent() {
    if (this.props.current_user) {
      return (
        <div>
          {this.props.children}
          <Chat
            message_map={this.props.message_map}
            sendMessage={this.props.sendMessage}
          />
        </div>
      );
    } else {
      return <ShowUser/>;
    }
  }

  render() {
    return (
      <div>
        <Sidebar games={this.props.games} />
        <div id='content'>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

function select(state) {
  const { chat, data } = state;
  const userName = u_id => data.users.getIn([u_id, 'name']);
  const channelName = g_id =>
    data.groups.getIn([g_id, 'name']) || 'general';

  return {
    current_user: state.current_user,
    games: data.games.toJS(),
    message_map: chat.mapKeys(channelName).toJS()
  };
}

function actions(dispatch){
  return {
    sendMessage: m => dispatch(sendMessage(m))
  };
}

export default connect(select, actions)(App);
