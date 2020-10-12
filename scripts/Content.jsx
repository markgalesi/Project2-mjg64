    
import * as React from 'react';


import { LoginButton } from './LoginButton';
import { SendButton } from './SendButton';
import { Socket } from './Socket';

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
                        <li>{info[0]} at {info[1]},from:{info[2].toString()}</li>
                    )}
                </ul>
            <SendButton />
        </div>
    );
}
