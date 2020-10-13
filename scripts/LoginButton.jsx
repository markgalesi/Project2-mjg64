import * as React from 'react';
import { Socket } from './Socket';



function handleSubmit(event) {
    let newUser = document.getElementById("username_input");
    Socket.emit('new username input', {
        'username': newUser.value,
    });
    
    console.log('Sent the username ' + newUser.value + ' to server!');
    event.preventDefault();
    console.log("newUser.value:" + newUser.value);
    setUser();
}

export function setUser(){
    return(document.getElementById("username_input").value);
}


export function LoginButton() {
    return (
        <form onSubmit={handleSubmit}>
            <h3>Change or Create User</h3>
            <input id="username_input"></input>
            <button>Log in</button>
        </form>
    );
}
