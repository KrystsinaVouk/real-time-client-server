import React, {useRef, useState} from 'react';

const WebSocks = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('')

    function connect() {
        socket.current = new WebSocket('ws://localhost:8080')

        socket.current.onopen = () => {
            setConnected(true);
            const message = {
                event: `connection`,
                id: Date.now(),
                username,
            }
            socket.current.send(JSON.stringify(message));
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prevState => [message, ...prevState]);

        }
        socket.current.onclose = () => {
            console.log(`The Socket is closed`);
        }
        socket.current.onerror = (err) => {
            console.log(`The error ${err} has occurred...`);
        }
    }

    const sendMessage = async () => {
       const message = {
           username,
           message: value,
           id: Date.now(),
           event: 'message'
       }
       socket.current.send(JSON.stringify(message));
       setValue('')
    }

    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input
                        type='text'
                        value={username}
                        placeholder='Please enter your username'
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <button onClick={connect}>Open chat</button>
                </div>
            </div>
        )
    }

    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Send message</button>
                </div>
                <div className="messages">
                    {messages.length && messages.map((message, index) =>
                            <div key={message.id + index}>
                                {message.event === `connection`
                                    ?
                                        <div className="connection_message">
                                            <h3>The user {message.username} has connected</h3>
                                        </div>
                                    :
                                        <div className="message">
                                            {message.username}. {message.message}
                                        </div>}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default WebSocks;
