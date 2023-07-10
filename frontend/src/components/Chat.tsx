import './Chat.css';

import { Navigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useState } from 'react';

import { Username } from '../interfaces/appProps';
import Message from './Message';

function Chat( props: Username ) {
  const [msg, setMsg] = useState('')

  const username = props.loggedUsername;

  const handleChange = (setState: Dispatch<SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
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
        <input value={msg} onChange={handleChange(setMsg)} type="text" placeholder='Send a message'/>
      </form>
    </div>
  )
}

export default Chat