import './Chat.css';

import { Navigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useState } from 'react';

import { Username } from '../interfaces/appProps';
import Message from './Message';
import { publicChatApi } from '../apis/public-chat/v1/PublicChatApi';

function Chat( props: Username ) {
  const [message, setMessage] = useState('')

  const username = props.loggedUsername;

  const handleChange = (setState: Dispatch<SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  }

  const sendMessage = (e: any) => {
    e.preventDefault();
    publicChatApi.sendMessage(message);
  }

  return (
    <div className='chat'> 
      {/* Go to sign in page when not authenticated */}
      {username === '' && <Navigate to='/signin'/>}

      <header className='chat-userTag'>
        <h2>{username}</h2>
      </header>

      {/* Messages Components */}
      <Message />
      <Message />
      <Message />

      <form action="">
        <input value={message} onChange={handleChange(setMessage)} type="text" placeholder='Send a message'/>
        <button onClick={sendMessage}>Send Message</button>
      </form>
    </div>
  )
}

export default Chat