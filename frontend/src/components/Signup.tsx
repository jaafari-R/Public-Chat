import './Signup.css';

import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';

import { publicChatApi } from '../apis/public-chat/v1/PublicChatApi';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (setState: Dispatch<SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  }

  const signup = (e: any) => {
    e.preventDefault();
    publicChatApi.registerUser(username, password);
  }

  return (
    <div className='signup'>
      <form className='signup-form' action="">
        <input onChange={handleChange(setUsername)} value={username} type="text" placeholder='Username'/>
        <input onChange={handleChange(setPassword)} value={password} type="text" placeholder='Password'/>
        <button onClick={signup}>Register</button>
      </form>
    </div>
  )
}

export default Signup