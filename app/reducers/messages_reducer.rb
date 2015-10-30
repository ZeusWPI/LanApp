class MessagesReducer < Reducer
  def snapshot
    Message.action(:receive, Message.all)
  end

  def create message
    Message.create! message.merge(
      timestamp: DateTime.current,
      user: current_user
    )
  end
end