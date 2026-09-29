// components/products/ReviewsSection.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
    IoChatbubbleOutline,
    IoStar,
    IoCheckmarkCircle,
    IoTimeOutline,
    IoCloseCircleOutline,
} from "react-icons/io5";

import { authClient } from "@/lib/auth-client";
import {
    getProductReviews,
    getMyReview,
    submitReview,
} from "@/lib/reviewApi";
import RatingStars from "./RatingStars";
import StarSelector from "./StarSelector";
import ReviewCard from "./ReviewCard";

const ReviewsSection = ({ productSlug }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [reviews, setReviews] = useState([]);
    const [summary, setSummary] = useState({
        average: 0,
        total: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    });
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    // User's own review
    const [myReview, setMyReview] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(false);

    // Form state
    const [formRating, setFormRating] = useState(0);
    const [formComment, setFormComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // ─── Load reviews (public) ───
    const loadReviews = async () => {
        setLoading(true);
        const result = await getProductReviews(productSlug);
        if (result.ok) {
            setReviews(result.reviews || []);
            setSummary(
                result.summary || {
                    average: 0,
                    total: 0,
                    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
                }
            );
        }
        setLoading(false);
    };

    // ─── Load user's own review ───
    const loadMyReview = async () => {
        if (!user) {
            setMyReview(null);
            setHasReviewed(false);
            return;
        }
        const result = await getMyReview(productSlug);
        if (result.ok && result.hasReviewed) {
            setHasReviewed(true);
            setMyReview(result.review);
            setFormRating(result.review.rating || 0);
            setFormComment(result.review.comment || "");
        } else {
            setHasReviewed(false);
            setMyReview(null);
            setFormRating(0);
            setFormComment("");
        }
    };

    useEffect(() => {
        loadReviews();
    }, [productSlug]);

    useEffect(() => {
        loadMyReview();
    }, [productSlug, user?.id]);

    // ─── Submit ───
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("রিভিউ দিতে লগইন করুন");
            return;
        }

        if (formRating < 1 || formRating > 5) {
            toast.error("রেটিং নির্বাচন করুন");
            return;
        }

        setSubmitting(true);

        const result = await submitReview({
            productSlug,
            rating: formRating,
            comment: formComment.trim(),
        });

        setSubmitting(false);

        if (!result.ok) {
            toast.error(result.message || "রিভিউ জমা দেওয়া যায়নি");
            return;
        }

        toast.success(
            result.message || "রিভিউ যাচাইয়ের পরে প্রকাশিত হবে"
        );
        await loadMyReview();
    };

    const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

    return (
        <section className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-border">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6 md:mb-8">
                <IoChatbubbleOutline className="w-5 h-5 text-primary" />
                <h2 className="font-heading text-xl md:text-2xl font-extrabold text-foreground">
                    রেটিং ও রিভিউ
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">
                {/* ─── Left: Summary + Form ─── */}
                <div className="space-y-5">
                    {/* Rating Summary */}
                    <div className="bg-surface border border-border rounded-xl p-5">
                        <div className="text-center pb-4 border-b border-border mb-4">
                            <p className="font-price text-4xl md:text-5xl font-extrabold text-primary mb-2">
                                {summary.average || "0.0"}
                            </p>
                            <div className="flex justify-center mb-2">
                                <RatingStars
                                    rating={summary.average}
                                    size="md"
                                />
                            </div>
                            <p className="font-body text-xs text-text-muted">
                                {summary.total > 0
                                    ? `${summary.total}টি রিভিউ`
                                    : "এখনো কোনো রিভিউ নেই"}
                            </p>
                        </div>

                        {/* Distribution */}
                        {summary.total > 0 && (
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count =
                                        summary.distribution?.[star] || 0;
                                    const percent =
                                        summary.total > 0
                                            ? (count / summary.total) * 100
                                            : 0;
                                    return (
                                        <div
                                            key={star}
                                            className="flex items-center gap-2"
                                        >
                                            <span className="font-price text-xs font-bold text-foreground w-3">
                                                {star}
                                            </span>
                                            <IoStar className="w-3 h-3 text-secondary shrink-0" />
                                            <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-secondary rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${percent}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="font-body text-[11px] text-text-muted w-6 text-right">
                                                {count}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Review Form */}
                    <div className="bg-surface border border-border rounded-xl p-5">
                        {!user ? (
                            <div className="text-center py-3">
                                <p className="font-body text-sm text-text-muted mb-3">
                                    রিভিউ দিতে লগইন করুন
                                </p>
                                <Link
                                    href="/login"
                                    className="inline-block bg-primary hover:bg-primary-hover text-white font-body font-semibold text-xs px-5 py-2.5 rounded-full transition"
                                >
                                    লগইন করুন
                                </Link>
                            </div>
                        ) : hasReviewed && myReview ? (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <IoCheckmarkCircle className="w-4 h-4 text-success" />
                                    <p className="font-heading text-sm font-bold text-foreground">
                                        আপনার রিভিউ
                                    </p>
                                </div>

                                {/* Status badge */}
                                <div className="mb-3">
                                    {myReview.status === "pending" && (
                                        <span className="inline-flex items-center gap-1.5 font-body text-[11px] text-warning bg-warning/10 px-2.5 py-1 rounded-full">
                                            <IoTimeOutline className="w-3 h-3" />
                                            যাচাইয়ের অপেক্ষায়
                                        </span>
                                    )}
                                    {myReview.status === "approved" && (
                                        <span className="inline-flex items-center gap-1.5 font-body text-[11px] text-success bg-success/10 px-2.5 py-1 rounded-full">
                                            <IoCheckmarkCircle className="w-3 h-3" />
                                            প্রকাশিত
                                        </span>
                                    )}
                                    {myReview.status === "rejected" && (
                                        <span className="inline-flex items-center gap-1.5 font-body text-[11px] text-error bg-error/10 px-2.5 py-1 rounded-full">
                                            <IoCloseCircleOutline className="w-3 h-3" />
                                            বাতিল করা হয়েছে
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <RatingStars
                                        rating={myReview.rating}
                                        size="sm"
                                    />
                                </div>

                                {myReview.comment && (
                                    <p className="font-body text-xs text-text-muted leading-relaxed line-clamp-3 mb-3">
                                        {myReview.comment}
                                    </p>
                                )}

                                <p className="font-body text-[11px] text-text-muted mb-3">
                                    আপনি আবার রিভিউ দিলে পুরোনোটি আপডেট হবে।
                                </p>

                                {/* Allow edit form */}
                                <details className="group">
                                    <summary className="cursor-pointer font-body text-xs font-semibold text-primary hover:underline list-none">
                                        রিভিউ পরিবর্তন করুন →
                                    </summary>
                                    <div className="mt-4">
                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-3"
                                        >
                                            <StarSelector
                                                value={formRating}
                                                onChange={setFormRating}
                                            />
                                            <textarea
                                                value={formComment}
                                                onChange={(e) =>
                                                    setFormComment(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="আপনার মতামত লিখুন (ঐচ্ছিক)"
                                                rows={3}
                                                maxLength={500}
                                                className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-text-muted font-body text-sm focus:outline-none focus:border-primary resize-none"
                                            />
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-body font-semibold text-sm py-2.5 rounded-full transition"
                                            >
                                                {submitting
                                                    ? "জমা হচ্ছে..."
                                                    : "আপডেট করুন"}
                                            </button>
                                        </form>
                                    </div>
                                </details>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <p className="font-heading text-sm font-bold text-foreground">
                                    আপনার মতামত দিন
                                </p>

                                <div>
                                    <label className="block font-body text-xs text-text-muted mb-2">
                                        রেটিং{" "}
                                        <span className="text-error">*</span>
                                    </label>
                                    <StarSelector
                                        value={formRating}
                                        onChange={setFormRating}
                                    />
                                </div>

                                <div>
                                    <label className="block font-body text-xs text-text-muted mb-2">
                                        রিভিউ (ঐচ্ছিক)
                                    </label>
                                    <textarea
                                        value={formComment}
                                        onChange={(e) =>
                                            setFormComment(e.target.value)
                                        }
                                        placeholder="আপনার অভিজ্ঞতা শেয়ার করুন..."
                                        rows={3}
                                        maxLength={500}
                                        className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder:text-text-muted font-body text-sm focus:outline-none focus:border-primary resize-none"
                                    />
                                    <p className="font-body text-[10px] text-text-muted mt-1">
                                        {formComment.length}/৫০০
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting || formRating < 1}
                                    className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-body font-semibold text-sm py-2.5 rounded-full transition"
                                >
                                    {submitting ? "জমা হচ্ছে..." : "জমা দিন"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* ─── Right: Reviews List ─── */}
                <div>
                    {loading ? (
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-24 bg-surface border border-border rounded-xl animate-pulse"
                                />
                            ))}
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-12 border border-border border-dashed rounded-xl bg-surface/50">
                            <IoChatbubbleOutline className="w-10 h-10 text-text-muted mx-auto mb-3" />
                            <p className="font-heading text-base font-bold text-foreground mb-1">
                                এখনো কোনো রিভিউ নেই
                            </p>
                            <p className="font-body text-sm text-text-muted">
                                প্রথম রিভিউ আপনি দিতে পারেন
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-3 md:space-y-4">
                                {visibleReviews.map((review) => (
                                    <ReviewCard
                                        key={review._id}
                                        review={review}
                                    />
                                ))}
                            </div>

                            {reviews.length > 3 && (
                                <div className="text-center mt-5">
                                    <button
                                        onClick={() =>
                                            setShowAll(!showAll)
                                        }
                                        className="font-body text-sm font-semibold text-primary hover:underline"
                                    >
                                        {showAll
                                            ? "কম দেখুন"
                                            : `আরও ${reviews.length - 3}টি রিভিউ দেখুন`}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;