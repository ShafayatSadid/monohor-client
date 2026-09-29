// app/admin/reviews/page.jsx
"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoChatbubbleOutline } from "react-icons/io5";

import {
    getAdminReviews,
    approveReview,
    rejectReview,
    deleteReview,
} from "@/lib/adminApi";
import ReviewAdminCard from "@/components/admin/ReviewAdminCard";
import ReviewFilterTabs from "@/components/admin/ReviewFilterTabs";

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [counts, setCounts] = useState({
        all: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    });
    const [status, setStatus] = useState("pending");
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const loadReviews = async (filter = status) => {
        setLoading(true);
        const { ok, data } = await getAdminReviews(filter);

        if (!ok) {
            toast.error(data.message || "রিভিউ লোড করা যায়নি");
            setReviews([]);
        } else {
            setReviews(data.reviews || []);
            setCounts(
                data.counts || {
                    all: 0,
                    pending: 0,
                    approved: 0,
                    rejected: 0,
                }
            );
        }
        setLoading(false);
    };

    useEffect(() => {
        loadReviews(status);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    const handleApprove = async (review) => {
        setProcessingId(review._id);
        const { ok, data } = await approveReview(review._id);
        setProcessingId(null);

        if (!ok) {
            toast.error(data.message || "Approve করা যায়নি");
            return;
        }

        toast.success("রিভিউ অনুমোদন করা হয়েছে");
        loadReviews(status);
    };

    const handleReject = async (review) => {
        setProcessingId(review._id);
        const { ok, data } = await rejectReview(review._id);
        setProcessingId(null);

        if (!ok) {
            toast.error(data.message || "Reject করা যায়নি");
            return;
        }

        toast.success("রিভিউ বাতিল করা হয়েছে");
        loadReviews(status);
    };

    const handleDelete = async (review) => {
        const confirmed = window.confirm(
            `"${review.userName}" এর এই রিভিউটি স্থায়ীভাবে মুছে ফেলতে চান? এই কাজটি undo করা যাবে না।`
        );
        if (!confirmed) return;

        setProcessingId(review._id);
        const { ok, data } = await deleteReview(review._id);
        setProcessingId(null);

        if (!ok) {
            toast.error(data.message || "Delete করা যায়নি");
            return;
        }

        toast.success("রিভিউ মুছে ফেলা হয়েছে");
        loadReviews(status);
    };

    return (
        <div className="space-y-5">
            {/* Filter Tabs */}
            <ReviewFilterTabs
                active={status}
                onChange={setStatus}
                counts={counts}
            />

            {/* Count line */}
            {!loading && (
                <p className="font-body text-xs text-text-muted">
                    {reviews.length}টি রিভিউ দেখানো হচ্ছে
                </p>
            )}

            {/* Content */}
            {loading ? (
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-40 bg-surface border border-border rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-16 border border-border rounded-xl bg-surface/50">
                    <IoChatbubbleOutline className="w-10 h-10 text-text-muted mx-auto mb-3" />
                    <p className="font-heading text-lg font-bold text-foreground mb-1">
                        কোনো রিভিউ নেই
                    </p>
                    <p className="font-body text-sm text-text-muted">
                        {status === "pending"
                            ? "নতুন রিভিউ আসলে এখানে দেখাবে"
                            : "এই ফিল্টারে কোনো রিভিউ নেই"}
                    </p>
                </div>
            ) : (
                <div className="space-y-3 md:space-y-4">
                    {reviews.map((review) => (
                        <ReviewAdminCard
                            key={review._id}
                            review={review}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onDelete={handleDelete}
                            processing={processingId === review._id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}