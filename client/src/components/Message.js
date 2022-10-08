import React, { useState } from "react";
import ChatDataService from '../services/chat.service'

function Message({setMessages, user, channel, setLoggedIn, socket, setUser, setChannel}) {

    const [currentMessage, setCurrentMessage] = useState("")

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

    const keyDownHandlerMessage = e => {
        e.preventDefault();
        sendMessage();
    }

    const homeButtonHandler = e => {
        e.preventDefault();
        console.log(user)
        console.log(channel)
        setLoggedIn(() => false);
        setUser(() => "");
        setChannel(() => "");
    }

    return(
        <form onSubmit={keyDownHandlerMessage}>
            <button type="button" onClick={homeButtonHandler}>Home</button>
            <input id="message_input" type='text' value={currentMessage} placeholder="Type a message..." onChange={(event) => {
                setCurrentMessage(event.target.value)
            }}></input>
            <button type="button" onClick={sendMessage}>Send</button>
        </form>
    )
}

export default Message;