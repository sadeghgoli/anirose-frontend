'use client'
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'react-feather';

const pageClass = (isActive, isDisabled) => {
    if (isDisabled) return 'w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center opacity-50 cursor-not-allowed';
    if (isActive) return 'w-10 h-10 rounded-lg flex items-center justify-center bg-[#e0a96d] text-white';
    return 'w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-all';
};

const Pagination = ({ currentPage, totalPages, buildHref }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let last;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        for (const i of range) {
            if (last) {
                if (i - last === 2) rangeWithDots.push(last + 1);
                else if (i - last !== 1) rangeWithDots.push('...');
            }
            rangeWithDots.push(i);
            last = i;
        }

        return rangeWithDots;
    };

    const prevHref = currentPage > 1 ? buildHref(currentPage - 1) : null;
    const nextHref = currentPage < totalPages ? buildHref(currentPage + 1) : null;

    return (
        <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-2" aria-label="صفحه‌بندی محصولات">
                {prevHref ? (
                    <Link href={prevHref} scroll={false} className={pageClass(false, false)} aria-label="صفحه قبل">
                        <ChevronRight size={18} />
                    </Link>
                ) : (
                    <span className={pageClass(false, true)} aria-disabled="true">
                        <ChevronRight size={18} />
                    </span>
                )}

                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`dots-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                    ) : (
                        <Link
                            key={page}
                            href={buildHref(page)}
                            scroll={false}
                            aria-current={page === currentPage ? 'page' : undefined}
                            className={pageClass(page === currentPage, false)}
                        >
                            {page}
                        </Link>
                    )
                ))}

                {nextHref ? (
                    <Link href={nextHref} scroll={false} className={pageClass(false, false)} aria-label="صفحه بعد">
                        <ChevronLeft size={18} />
                    </Link>
                ) : (
                    <span className={pageClass(false, true)} aria-disabled="true">
                        <ChevronLeft size={18} />
                    </span>
                )}
            </nav>
        </div>
    );
};

export default Pagination;
