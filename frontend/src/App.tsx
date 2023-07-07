import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signup from './components/Signup';
import Signin from './components/Signin';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* SignUp */}
          <Route path="/signup" Component={Signup} />
          {/* SignIn */}
          <Route path="signin" Component={Signin} />
          {/* Chat */}
          <Route path="/" Component={Chat} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
