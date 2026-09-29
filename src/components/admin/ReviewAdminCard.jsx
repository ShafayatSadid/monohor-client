// components/admin/ReviewAdminCard.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    IoPersonCircleOutline,
    IoStar,
    IoCheckmarkCircle,
    IoCloseCircleOutline,
    IoTrashOutline,
    IoTimeOutline,
    IoOpenOutline,
} from "react-icons/io5";

const formatDate = (d) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const StatusBadge = ({ status }) => {
    const map = {
        pending: {
            icon: IoTimeOutline,
            label: "পেন্ডিং",
            cls: "bg-warning/15 text-warning border-warning/30",
        },
        approved: {
            icon: IoCheckmarkCircle,
            label: "অ্যাপ্রুভড",
            cls: "bg-success/15 text-success border-success/30",
        },
        rejected: {
            icon: IoCloseCircleOutline,
            label: "রিজেক্টেড",
            cls: "bg-error/15 text-error border-error/30",
        },
    };

    const s = map[status] || map.pending;
    const Icon = s.icon;

    return (
        <span
            className={`inline-flex items-center gap-1 font-body text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.cls}`}
        >
            <Icon className="w-3 h-3" />
            {s.label}
        </span>
    );
};

const RatingStars = ({ rating }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <IoStar
                    key={star}
                    className={`w-3.5 h-3.5 ${
                        star <= rating
                            ? "text-secondary"
                            : "text-border"
                    }`}
                />
            ))}
            <span className="font-price text-xs font-bold text-foreground ml-1">
                {rating}
            </span>
        </div>
    );
};

const ReviewAdminCard = ({
    review,
    onApprove,
    onReject,
    onDelete,
    processing,
}) => {
    return (
        <div className="bg-surface border border-border rounded-xl p-4 md:p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-border">
                <div className="flex items-start gap-3 min-w-0">
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

                    <div className="min-w-0">
                        <p className="font-heading text-sm font-bold text-foreground line-clamp-1">
                            {review.userName || "ব্যবহারকারী"}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <RatingStars rating={review.rating} />
                            <span className="font-body text-[11px] text-text-muted">
                                · {formatDate(review.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>

                <StatusBadge status={review.status} />
            </div>

            {/* Product */}
            <div className="mb-3">
                <Link
                    href={`/products/${review.productSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-primary hover:underline"
                >
                    📦 {review.productName}
                    <IoOpenOutline className="w-3 h-3" />
                </Link>
            </div>

            {/* Comment */}
            {review.comment ? (
                <p className="font-body text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap mb-4">
                    &ldquo;{review.comment}&rdquo;
                </p>
            ) : (
                <p className="font-body text-sm text-text-muted italic mb-4">
                    (কোনো comment দেননি — শুধু rating)
                </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-border">
                {review.status !== "approved" && (
                    <button
                        onClick={() => onApprove(review)}
                        disabled={processing}
                        className="inline-flex items-center gap-1.5 bg-success hover:bg-success/90 disabled:opacity-50 text-white font-body text-xs font-semibold px-4 py-2 rounded-full transition"
                    >
                        <IoCheckmarkCircle className="w-4 h-4" />
                        Approve
                    </button>
                )}

                {review.status !== "rejected" && (
                    <button
                        onClick={() => onReject(review)}
                        disabled={processing}
                        className="inline-flex items-center gap-1.5 bg-warning hover:bg-warning/90 disabled:opacity-50 text-white font-body text-xs font-semibold px-4 py-2 rounded-full transition"
                    >
                        <IoCloseCircleOutline className="w-4 h-4" />
                        Reject
                    </button>
                )}

                <button
                    onClick={() => onDelete(review)}
                    disabled={processing}
                    className="ml-auto inline-flex items-center gap-1.5 border border-border hover:border-error hover:text-error disabled:opacity-50 text-text-muted font-body text-xs font-semibold px-4 py-2 rounded-full transition"
                >
                    <IoTrashOutline className="w-4 h-4" />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ReviewAdminCard;