// components/admin/DeleteModal.jsx
"use client";

import { IoAlertCircleOutline, IoClose } from "react-icons/io5";

const DeleteModal = ({ open, onClose, onConfirm, itemName, loading }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <div className="relative bg-surface border border-border rounded-2xl shadow-2xl max-w-md w-full p-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:bg-background transition"
                    aria-label="Close"
                >
                    <IoClose className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-4 mb-5">
                    <div className="w-11 h-11 rounded-full bg-error/10 flex items-center justify-center shrink-0">
                        <IoAlertCircleOutline className="w-6 h-6 text-error" />
                    </div>
                    <div>
                        <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                            নিশ্চিত করুন
                        </h3>
                        <p className="font-body text-sm text-text-muted">
                            আপনি কি{" "}
                            <span className="font-semibold text-foreground">
                                {itemName}
                            </span>{" "}
                            মুছে ফেলতে চান? এই কাজটি undo করা যাবে না।
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 justify-end">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-5 py-2.5 rounded-full border border-border font-body text-sm font-semibold text-foreground hover:border-secondary transition disabled:opacity-50"
                    >
                        বাতিল
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-5 py-2.5 rounded-full bg-error hover:bg-error/90 text-white font-body text-sm font-semibold transition disabled:opacity-50"
                    >
                        {loading ? "মুছছে..." : "মুছে ফেলুন"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;