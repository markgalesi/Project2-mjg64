    
import * as React from 'react';


import { LoginButton } from './LoginButton';
import { SendButton } from './SendButton';
import { Socket } from './Socket';

export function Content() {
    const [messages, setMessages] = React.useState([]);
    
    function getNewAddresses() {
        React.useEffect(() => {
            Socket.on('messages received', (data) => {
                console.log("Received messages from server: " + data['allMessages']);
                setMessages(data['allMessages']);
            });
        });
    }
    
    getNewAddresses();

    return (
        <div>
                <ol>
                    {messages.map((message) =>
                        <li>{messages}</li>)}
                </ol>
            <LoginButton />
            <SendButton />
        </div>
    );
}
