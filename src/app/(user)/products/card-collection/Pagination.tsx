import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({ currentPage, totalPages, onPageChange }:any) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex gap-3 justify-center overflow-scroll no-scrollbar">
      <nav className="flex gap-3 rounded-full" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative flex items-center rounded-full px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`relative flex items-center  rounded-full px-4 py-2 text-sm font-semibold ${
              pageNumber === currentPage
                ? "text-black bg-white"
                : "text-black "
            } ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative flex items-center rounded-full px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
