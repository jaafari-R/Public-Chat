import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signup from './components/Signup';
import Signin from './components/Signin';
import Chat from './components/Chat';
import { useEffect, useState } from 'react';
import { publicChatApi } from './apis/public-chat/v1/PublicChatApi';

function App() {
  const [loggedUsername, setLoggedUsername] = useState('');
  
  const verifyAuth = async () => {
    const response = await publicChatApi.verifyJWT();
    if(!response.success) {
      return;
    }
    response.username && setLoggedUsername(response.username);
  }

  useEffect( () => {
    verifyAuth();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* SignUp */}
          <Route path="/signup" element={<Signup loggedUsername={loggedUsername} setLoggedUsername={setLoggedUsername} />} />
          {/* SignIn */}
          <Route path="signin" element={<Signin loggedUsername={loggedUsername} setLoggedUsername={setLoggedUsername} />} />
          {/* Chat */}
          <Route path="/" element={<Chat loggedUsername={loggedUsername} setLoggedUsername={setLoggedUsername} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
