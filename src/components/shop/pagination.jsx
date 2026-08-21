// src/components/common/Shop/Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-2">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    <ChevronRight size={18} />
                </button>

                {getPageNumbers().map((page, index) => (
                    <button key={index} onClick={() => typeof page === 'number' && onPageChange(page)} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${page === currentPage ? 'bg-[#e0a96d] text-white' : page === '...' ? 'cursor-default' : 'border border-gray-300 hover:bg-gray-100'}`} disabled={page === '...'}>
                        {page}
                    </button>
                ))}

                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    <ChevronLeft size={18} />
                </button>
            </nav>
        </div>
    );
};

export default Pagination;