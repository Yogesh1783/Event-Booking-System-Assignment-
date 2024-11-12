import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Input from "../components/DesigningComponent/Input";
import Button from "../components/DesigningComponent/Button";
import { Link } from "react-router-dom"; 
import './Register.css'

const Register = () => {
  const navigate = useNavigate(); 

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem('users')) || [];

    if (existingUser.some(user => user.email === email)) {
      setError("Email is already registered.");
      return;
    }

    const newUser = { username, email, password };
    existingUser.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUser));

    localStorage.setItem('user', JSON.stringify(newUser));

    alert("Registration successful!");
    setUsername("");
    setEmail("");
    setPassword("");

    navigate("/login");
  };

  return (
    <div className="register">
            <h1>Event Management System</h1>

      <form onSubmit={handleSubmit} className="register-container">
        <h2 className="heading">Register</h2>
        {error && <p className="error">{error}</p>}
        
        <Input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username"
          required
        />
        <Input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
          required
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
          required
        />
        <Button type="submit" text="Register" />
        
        <div>
          <p style={{color:"white"}}>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
