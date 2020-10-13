    
import * as React from 'react';


import { LoginButton } from './LoginButton';
import { SendButton } from './SendButton';
import { Socket } from './Socket';

export function Content() {
    const [messages, setMessages] = React.useState([]);
    const [username, setUsername] = React.useState([]);
    
    function getNewMessages() {
        React.useEffect(() => {
            Socket.on('messages received', (data) => {
                console.log("Received messages from server: " + data['allMessages']);
                setMessages(data['allMessages']);
                setUsername(data['username']);
            });
        });
    }
    
    getNewMessages();

    return (
        <div>
            <LoginButton />
                <ul>
                    {messages.map((info) =>
                    <li>
                    {info[2] &&
                        <div class="container">
                        <span class="text right">{info[0]}</span>
                        <span class="user right">from:{username}</span>
                        <span class="time right">{info[1]}</span>
                        </div>
                    }
                    {!info[2] &&
                        <div class="container darker">
                        <span class="text left">{info[0]}</span>
                        <span class="user left">from:bot</span>
                        <span class="time left">{info[1]}</span>
                        </div>
                    }
                    </li>
                    )}
                    
                    <div class="parent">
                    <div class="div1"> </div>
                    <div class="div2"> </div>
                    </div>
                </ul>
            <SendButton />
        </div>
    );
}
