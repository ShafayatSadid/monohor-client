// components/products/StarSelector.jsx
"use client";

import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

const StarSelector = ({ value = 0, onChange }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = (hover || value) >= star;
                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        aria-label={`${star} star`}
                        className="text-secondary hover:scale-110 transition-transform"
                    >
                        {filled ? (
                            <IoStar className="w-7 h-7 md:w-8 md:h-8" />
                        ) : (
                            <IoStarOutline className="w-7 h-7 md:w-8 md:h-8" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default StarSelector;