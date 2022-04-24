import React, {useEffect, useState} from 'react';
import axios from "axios";

const LongPolling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        subscribe()
    }, []);

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages')
            setMessages(prevState => [data, ...prevState])
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        });
    }

    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={event => setValue(event.target.value)} type="text"/>
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div className="messages">
                    {messages.length ? messages.map((message, index) =>
                        <div key={message.id + index} className="message">
                            {message.message}
                        </div>
                    ) : <h1>No messages yet...</h1>}
                </div>
            </div>
        </div>
    );
};

export default LongPolling;
