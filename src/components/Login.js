import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import '../pages/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate('/home');
    } catch (error) {
      setError(error.message);
      if (error.code === 'auth/user-not-found') {
        alert('Email is not registered.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Password is incorrect.');
      }
    }
  };

  return (
    <div className="page-transition">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleLogin} className="form1">
        <h3>Login</h3>
        <label htmlFor="username">Username</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          id="username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="butto" type="submit">
          Log In
        </button>
        <p>
          Don't have an account? <Link to="/registration">Register here</Link>.
        </p>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default Login;
