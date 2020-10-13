import * as React from 'react';
import { Socket } from './Socket';
import { setUser } from './LoginButton';

function handleSubmit(event) {
    var newMessage = document.getElementById("message_input");
    console.log(setUser());
    Socket.emit('new message input', {
        'message': newMessage.value,
        'username' : setUser(),
    });
    
    console.log('Sent the message ' + newMessage.value + ' to server!');
    newMessage.value = '';
    
    event.preventDefault();
}
export function SendButton() {
    return (
        <form onSubmit={handleSubmit}>
            <input id="message_input" placeholder="Type message.."></input>
            <button>Send!</button>
        </form>
    );
}
