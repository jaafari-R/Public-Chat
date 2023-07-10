import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signup from './components/Signup';
import Signin from './components/Signin';
import Chat from './components/Chat';
import { useState } from 'react';

function App() {
  const [loggedUsername, setLoggedUsername] = useState('');
  
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
