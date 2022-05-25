import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import ChatDataService from '../services/chat.service'
import Message from './Message'

function Chat({ socket, user, channel, loggedIn, setLoggedIn }) {
    
    const [messages, setMessages] = useState([])
    

    

    useEffect(() => {
        console.log('Test')
        const m = ChatDataService.getAll()
            .then(res => {
                const arr = res.data.filter(mes => mes.channel == channel)
                setMessages(() => [...arr])
            })
            .catch(err => console.log(err.message))
    }, [])

    useEffect(() => {
        socket.on("messageReceived", (message) => {
            
            setMessages((old) => [...old, message])
        });
    }, [socket])
    
    useEffect(() => {
        var element = document.querySelector('.ref');
        window.scroll({
            top: element.scrollHeight,
            left: 0,
        });    
      }, [messages])

    return (
      <div id="container" className="ref">
        <div id="chat">
            {messages.map((message) => {

                
                let date = isNaN(message.time) ? new Date(message.createdAt) : new Date(message.time);
                
                return(
                    
                    <div key={uuidv4()} id="messageanddate">
                        <div  id="message">
                            <div id="messagesender">
                                {message.user}: 
                            </div>
                            <div id="messagebody">
                                {message.text}
                            </div>
                        </div>
                        <div id="date">
                            {date.getHours()}:{date.getMinutes() > 9 ? date.getMinutes() : "0" +date.getMinutes()}
                        </div>
                    </div>
                   
                )
            })}
        </div>
        <div id="footer">
            <Message setMessages={setMessages} user={user} channel={channel} setLoggedIn={setLoggedIn} socket={socket} />
        </div>  
      </div>
    );
  }
  
  export default Chat;