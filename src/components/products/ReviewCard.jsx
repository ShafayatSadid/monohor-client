// components/products/ReviewCard.jsx
"use client";

import Image from "next/image";
import { IoPersonCircleOutline } from "react-icons/io5";
import RatingStars from "./RatingStars";

const formatDate = (d) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-surface border border-border rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3 mb-3">
                {/* Avatar */}
                <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                    {review.userImage ? (
                        <Image
                            src={review.userImage}
                            alt={review.userName}
                            width={40}
                            height={40}
                            className="object-cover w-10 h-10"
                        />
                    ) : (
                        <IoPersonCircleOutline className="w-6 h-6 text-primary" />
                    )}
                </div>

                {/* Name + Date */}
                <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm font-bold text-foreground line-clamp-1">
                        {review.userName || "ব্যবহারকারী"}
                    </p>
                    <p className="font-body text-[11px] text-text-muted">
                        {formatDate(review.createdAt)}
                    </p>
                </div>

                {/* Stars */}
                <RatingStars rating={review.rating} size="sm" />
            </div>

            {review.comment && (
                <p className="font-body text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">
                    {review.comment}
                </p>
            )}
        </div>
    );
};

export default ReviewCard;