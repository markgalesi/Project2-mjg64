    
import * as React from 'react';


import { LoginButton } from './LoginButton';
import { SendButton } from './SendButton';
import { Socket } from './Socket';
import { setUser } from './LoginButton';

export function Content() {
    const [messages, setMessages] = React.useState([]);
    
    function getNewMessages() {
        React.useEffect(() => {
            Socket.on('messages received', (data) => {
                console.log("Received messages from server: " + data['allMessages']);
                setMessages(data['allMessages']);
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
                    {info[2]==setUser() &&
                        <div class="container">
                        <span class="text right">{info[0]}</span>
                        <span class="user right">from:{info[2]}</span>
                        <span class="time right">{info[1]}</span>
                        </div>
                    }
                    {(info[2]!=setUser() && info[2]!='bot') &&
                        <div class="container darker">
                        <span class="text left">{info[0]}</span>
                        <span class="user left">from:{info[2]}</span>
                        <span class="time left">{info[1]}</span>
                        </div>
                    }
                    {info[2]=='bot' &&
                        <div class="container bot">
                        <span class="text left">{info[0]}</span>
                        <span class="user left">from:{info[2]}</span>
                        <span class="time left">{info[1]}</span>
                        </div>
                    }
                    </li>
                    )}
                </ul>
            <SendButton />
        </div>
    );
}
