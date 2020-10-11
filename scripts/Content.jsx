    
import * as React from 'react';


import { Button } from './Button';
import { Socket } from './Socket';

export function Content() {
    const [usernames, setUsernames] = React.useState([]);
    
    function getNewAddresses() {
        React.useEffect(() => {
            Socket.on('usernames received', (data) => {
                console.log("Received usernames from server: " + data['allUsernames']);
                setUsernames(data['allUsernames']);
            })
        });
    }
    
    getNewAddresses();

    return (
        <div>
            <h1>Usernames!</h1>
                <ol>
                    {usernames.map((username, index) =>
                        <li key={index}>{usernames}</li>)}
                </ol>
            <Button />
        </div>
    );
}
