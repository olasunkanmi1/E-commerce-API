import { useState } from 'react';

// cookies wont be set from backedn if we use it without setting proxy in package.json cos they are on different route. react is starting on 3000 while server is starting on 5000
// const rootUrl = 'http://localhost:5000'; //no need after setting proxy in package.jon

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const user = { email, password };

    try {
      // const url = `${rootUrl}/api/v1/auth/login`; ---not using this anymore. to solve cookies not setting issue
      const url = `/api/v1/auth/login`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      setPassword('');
      setEmail('');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTesting = async () => {
    // const url = `${rootUrl}/api/v1`; ---not using this anymore. to solve cookies not setting issue
    const url = `/api/v1`;
    await fetch(url);
  };
  const fetchLogout = async () => {
    // const url = `${rootUrl}/api/v1/auth/logout`; ---not using this anymore. to solve cookies not setting issue
    const url = `/api/v1/auth/logout`;
    await fetch(url);
  };

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <h4>login form</h4>
        <div className='form-row'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-input email-input'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            name='password'
            className='form-input password-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-block submit-btn'>
          submit
        </button>
      </form>
      <div className='container'>
        <button className='btn testing-btn' onClick={fetchTesting}>
          Testing
        </button>
        <button className='btn logout-btn' onClick={fetchLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default App;
