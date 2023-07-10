import './Signup.css';

import { Dispatch, SetStateAction, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { publicChatApi } from '../apis/public-chat/v1/PublicChatApi';
import { SetLoggedUsername } from '../interfaces/appProps';

function Signup( props: SetLoggedUsername ) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (setState: Dispatch<SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  }

  const signup = async (e: any): Promise<void> => {
    e.preventDefault();
    const response = await publicChatApi.registerUser(username, password);
    if(!response.success) {
      console.log(response.msg);
      return;
    }
    props.setLoggedUsername(username);
    setLoggedIn(true);
  }

  return (
    <div className='signup'>
      {/* Go to chat if logged in */}
      {loggedIn && <Navigate to='/' />}

      <form className='signup-form' action="">
        <input onChange={handleChange(setUsername)} value={username} type="text" placeholder='Username'/>
        <input onChange={handleChange(setPassword)} value={password} type="text" placeholder='Password'/>
        <button onClick={signup}>Register</button>
        <p>
          Have an account already? &nbsp;
          <Link to='/signin' >
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup