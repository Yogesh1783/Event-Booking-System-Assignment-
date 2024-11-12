import React from 'react';
import Button from './Button'; 
import './Pagination.css';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      <Button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className={"pagination-button"}
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }, (_, i) => (
        <Button 
          key={i} 
          onClick={() => onPageChange(i + 1)} 
          className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
          text={i + 1}
        >
          {}
        </Button>
      ))}

      <Button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className={"pagination-button"}
        text={Next}
      >
        
      </Button>
    </div>
  );
};

export default Pagination;
