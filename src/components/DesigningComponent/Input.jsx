import React from 'react';
import './Input.css'

const Input = ({ type , placeholder, value, onChange, className = '', disabled = false }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`custom-input ${className}`}  
      disabled={disabled}
    />
  );
};

export default Input;
