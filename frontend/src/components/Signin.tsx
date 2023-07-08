import './Signin.css';

import { Dispatch, SetStateAction, useState } from 'react';

import { publicChatApi } from '../apis/public-chat/v1/PublicChatApi';
import { Link } from 'react-router-dom';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (setState: Dispatch<SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  }

  const signin = (e: any) => {
    e.preventDefault();
    publicChatApi.login(username, password);
  }

  return (
    <div className='signin'>
      <form className='signin-form' action="">
        <input onChange={handleChange(setUsername)} value={username} type="text" placeholder='Username'/>
        <input onChange={handleChange(setPassword)} value={password} type="text" placeholder='Password'/>
        <button onClick={signin}>Login</button>
        <p>
          Don't have an account? &nbsp;
          <Link to='/signup' >
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signin