import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { login } from '../context/authService';
import Button from '../components/DesigningComponent/Button';
import Input from './../components/DesigningComponent/Input';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const [errorMessage, setErrorMessage] = useState("");  
  const navigate = useNavigate();  
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();  

    try {
      const { authToken, user } = await login(email, password);
      localStorage.setItem('authToken', authToken);  
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  const handleInputChange = () => {
    setErrorMessage("");
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        
        <Input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleInputChange();
          }}
          placeholder="Email"
          required
        />

        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleInputChange();
          }}
          placeholder="Password"
          required
        />
        
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <Button type="submit" text="Login" />

        <div>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
