import './Signup.css';

function Signup() {
  return (
    <div className='signup'>
      <form className='signup-form' action="">
        <input type="text" placeholder='Username'/>
        <input type="text" placeholder='Password'/>
        <button>Register</button>
      </form>
    </div>
  )
}

export default Signup