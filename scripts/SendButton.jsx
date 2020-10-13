import * as React from 'react';
import { Socket } from './Socket';

function handleSubmit(event) {
    let newMessage = document.getElementById("message_input");
    Socket.emit('new message input', {
        'message': newMessage.value,
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
