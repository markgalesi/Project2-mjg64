import * as React from 'react';
import { Socket } from './Socket';

function handleSubmit(event) {
    let newUser = document.getElementById("username_input");
    Socket.emit('new username input', {
        'username': newUser.value,
    });
    
    console.log('Sent the username ' + newUser.value + ' to server!');
    newUser.value = '';
    
    event.preventDefault();
}

export function LoginButton() {
    return (
        <form onSubmit={handleSubmit}>
            <h3>Change User</h3>
            <input id="username_input"></input>
            <button>Log in</button>
        </form>
    );
}
