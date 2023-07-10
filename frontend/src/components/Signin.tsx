import './Signin.css';

import { Dispatch, SetStateAction, useState } from 'react';

import { publicChatApi } from '../apis/public-chat/v1/PublicChatApi';
import { Link, Navigate } from 'react-router-dom';
import { SetLoggedUsername } from '../interfaces/appProps';

function Signin( props: SetLoggedUsername ) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (setState: Dispatch<SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  }

  const signin = async (e: any) => {
    e.preventDefault();
    const response = await publicChatApi.login(username, password);
    if(!response.success) {
      console.log(response.msg);
      return;
    }
    response.username && props.setLoggedUsername(response.username);
    setLoggedIn(true);
  }

  return (
    <div className='signin'>
      {/* Go to chat if logged in */}
      {loggedIn && <Navigate to='/' />}

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