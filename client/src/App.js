import './App.css';
import {useState} from 'react'
import io from 'socket.io-client'
import Chat from './components/Chat.js'

const socket = io.connect('http://localhost:3001')

function App() {
  const [user, setUser] = useState("")
  const [channel, setChannel] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  const logIn = () => {
    if(user !== "" && channel !== ""){
      setLoggedIn(() => true)
      socket.emit("joinedChannel", channel, user)
    }
    

  }

  return (
    <div className="App">
      {loggedIn ? <Chat socket={socket} user={user} channel={channel} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setChannel={setChannel} setUser={setUser}/> :
      <div>
      <div id='form_container'>
        <div className='inputs'>
          <div id='name_field' >
            <label id='name_label' className='input'>
              <input type="text" placeholder="Name" name='name' id='name_input' className='input_field'
              onChange={(event) => { 
                setUser(event.target.value)
              }}>
              </input>
              <span className='input_label'>Username</span>
            </label>  
          </div>
          <label className='input'>
          <input type="text" placeholder="Channel ID" name='channel' className='input_field' id='channel_input'
          onChange={(event) => { 
            setChannel(event.target.value)
          }}>
          </input>
          <span className='input_label'>Room ID</span>
          </label>        
        </div>
        <div className='button-group'>
            <button onClick={logIn}>Log in</button>
        </div>
      </div> 
      </div>}
      
    </div>
  );
}

export default App;
