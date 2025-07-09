import React from 'react';
import useWindowWidth from '../hooks/useWindowWidth'; // adjust path if needed

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages <= 1) return null;

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 640;
  const maxVisiblePages = isMobile ? 3 : 10;

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('ellipsis-start');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('ellipsis-end');
        if (end !== totalPages) pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex space-x-1 sm:space-x-2 items-center">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md text-sm font-medium border bg-white text-purple-700 hover:bg-purple-100 disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) =>
          typeof page === 'string' && page.startsWith('ellipsis') ? (
            <span key={page} className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 rounded-md text-sm font-medium border transition-all ${
                page === currentPage
                  ? 'bg-purple-600 text-white'
                  : 'bg-white border-purple-300 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md text-sm font-medium border bg-white text-purple-700 hover:bg-purple-100 disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
