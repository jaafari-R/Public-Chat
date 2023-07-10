import { LoggedUsername } from '../interfaces/appProps';
import './Chat.css';

function Chat( props: LoggedUsername ) {
  return (
    <div> {props.loggedUsername} </div>
  )
}

export default Chat