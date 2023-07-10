import { Navigate } from 'react-router-dom';
import { Username } from '../interfaces/appProps';
import './Chat.css';

function Chat( props: Username ) {
  const username = props.loggedUsername;

  return (
    <div> 
      {username === '' && <Navigate to='/signin'/>}
      {username} 
    </div>
  )
}

export default Chat