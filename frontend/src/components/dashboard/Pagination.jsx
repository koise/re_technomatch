import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
  return (
    <div className="pagination-controls">
      <button 
        className="pagination-btn" 
        onClick={onPrevious}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>
      <span className="page-indicator">{currentPage} / {totalPages}</span>
      <button 
        className="pagination-btn" 
        onClick={onNext}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination; 