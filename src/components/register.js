// As a registered user I want to:

// be able to log in with my username/password combination
// see meaningful messages if there are errors during login, so that I may correct them
// stay logged in between page visits (for example, if I close my browser, and come back later)
// be able to log out if I am logged in
// see tabbed navigation for Routines, My Routines (once logged in), and Activities (with matching routes)


import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = ({ setToken, navigate }) => {
  // props.setToken
  // const {setToken} = props
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async () => {
    const results = await registerUser(username, password);
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem('token', results.data.token);
      navigate('/profile');
    } else {
      console.log(results.error.message)
    }
  }
  
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      handleSubmit();
    }}>

      <br></br>

      <input className='newUsername'
        type='text'
        placeholder='Enter Username'
        onChange={(event) => setUsername(event.target.value)}
      />

      <br></br>

      <input className='newUserPassword'
        type='password'
        placeholder='Enter Password'
        onChange={(event) => setPassword(event.target.value)}
      />

      <br></br>

      <button type='submit'>Submit</button>
    </form>
  )
}

export default Register;