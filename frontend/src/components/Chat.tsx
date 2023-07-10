import { Navigate } from 'react-router-dom';
import { LoggedUsername } from '../interfaces/appProps';
import './Chat.css';

function Chat( props: LoggedUsername ) {
  const username = props.loggedUsername;

  return (
    <div> 
      {username === '' && <Navigate to='/signin'/>}
      {username} 
    </div>
  )
}

export default Chat