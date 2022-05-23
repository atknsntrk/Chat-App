import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import ChatDataService from '../services/chat.service'

function Chat({ socket, user, channel, loggedIn, setLoggedIn }) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messages, setMessages] = useState([])
    

    const sendMessage = async () => {
        
        if(currentMessage !== ""){
            const message = {
                user: user,
                text: currentMessage,
                channel: channel,
                time: new Date()
            } 
            
            
            await socket.emit("messageSend", message)
            
            ChatDataService.create(message)
                .then(res => console.log(res.data))
                .catch(err => console.log(err.message))
            
            
            setMessages((old) => [...old, message])
            setCurrentMessage("")
        }
    }

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
            <button onClick={() => {setLoggedIn(false)}}>Home</button>
            <input id="message_input" type='text' value={currentMessage} placeholder="Type a message..." onChange={(event) => {
                setCurrentMessage(event.target.value)
            }}></input>
            <button onClick={sendMessage}>Send</button>
        </div>  
      </div>
    );
  }
  
  export default Chat;