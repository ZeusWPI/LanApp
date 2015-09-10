$(".chat.index").ready ->
    append_message_div = (content) ->
        chatbox = $( ".chatbox")
        chatbox.append $('<div/>')
            .addClass( "message" )
                .append $('<span/>').text(content["username"]+ " (" + content["timestamp"] + ") :").addClass("username")
                .append $('<span/>').text(content["text"])
        chatbox.scrollTop(chatbox[0].scrollHeight)

    window.dispatcher.bind 'chat.incoming_message', (content) ->
        append_message_div content
        emojify.run()

    window.send_message = (event) ->
      if (event.which == 13 || event.keyCode == 13)
        window.dispatcher.trigger 'chat.new_message', { user_id: $("#user_id").val(), content: $( "#send_message" ).val() }
        # Clear input field
        $( "#send_message" ).val ''
