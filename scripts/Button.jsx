import * as React from 'react';
import { Socket } from './Socket';

function handleSubmit(event) {
    let newUser = document.getElementById("username_input");
    Socket.emit('new address input', {
        'username': newUser.value,
    });
    
    console.log('Sent the address ' + newUser.value + ' to server!');
    newUser.value = ''
    
    event.preventDefault();
}

export function Button() {
    return (
        <form onSubmit={handleSubmit}>
            <input id="username_input" placeholder="Enter a Username"></input>
            <button>Add to DB!</button>
        </form>
    );
}
