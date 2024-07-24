import React, { useEffect, useState } from "react";
import axios from "axios";

const LongPolling = (props) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        subscribe();
    }, []);

    useEffect(() => {
        console.log('новое сообщение');
    }, [messages]);

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages');
            console.log(data);
            setMessages(prevMessages => [...prevMessages, {...data}]);
            setValue('');
            await subscribe();
        } catch (err) {
            setTimeout(() => {
                subscribe();
            }, 500);
        }
    };

    const sentMessage = async (e) => {
        await axios.post('http://localhost:5000/new-message', {
            'message': value,
            'id': new Date()
        })
    }

    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={sentMessage}>отправить</button>
            <div>
                {messages.map(item => 
                    <div key={item.id}>{item.message}</div>
                )}
            </div>
        </div>
    );
}

export default LongPolling;