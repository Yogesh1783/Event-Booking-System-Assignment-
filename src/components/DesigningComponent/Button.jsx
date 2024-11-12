import React from 'react';
import './Button.css';

const Button = ({ type = 'button', text, onClick, className = '' }) => {
  return (
    <button type={type} onClick={onClick} className={`custom-button ${className}`}>
      {text}
    </button>
  );
};

export default Button;
