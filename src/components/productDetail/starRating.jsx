// src/components/common/ProductDetail/StarRating.jsx
import React from "react";

const StarRating = ({ rating, reviewCount }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => {
                    if (i < fullStars) {
                        return <span key={i} className="text-yellow-500 text-lg">★</span>;
                    } else if (i === fullStars && hasHalfStar) {
                        return <span key={i} className="text-yellow-500 text-lg">½</span>;
                    } else {
                        return <span key={i} className="text-gray-300 text-lg">★</span>;
                    }
                })}
            </div>
            {reviewCount !== undefined && (
                <span className="text-gray-500 text-sm">({reviewCount} نظر)</span>
            )}
        </div>
    );
};

export default StarRating;