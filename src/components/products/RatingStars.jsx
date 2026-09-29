// components/products/RatingStars.jsx
"use client";

import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const RatingStars = ({ rating = 0, size = "sm" }) => {
    const sizeMap = {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };
    const cls = sizeMap[size] || sizeMap.sm;

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<IoStar key={i} className={cls} />);
        } else if (rating >= i - 0.5) {
            stars.push(<IoStarHalf key={i} className={cls} />);
        } else {
            stars.push(<IoStarOutline key={i} className={cls} />);
        }
    }

    return <div className="flex items-center text-secondary">{stars}</div>;
};

export default RatingStars;