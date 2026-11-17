// components/admin/ProductImageUploader.jsx
"use client";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { IoAdd, IoClose } from "react-icons/io5";

const MAX_IMAGES = 5;

const ProductImageUploader = ({ images = [], onChange }) => {
    // ── ref always mirrors the latest `images` so multi-fire onSuccess
    //    callbacks never read a stale value (fixes the "only last image
    //    survives" bug when uploading multiple files at once).
    const imagesRef = useRef(images);

    useEffect(() => {
        imagesRef.current = images;
    }, [images]);

    const handleSuccess = (result) => {
        if (result?.event !== "success") return;

        const url = result?.info?.secure_url;
        if (!url) return;

        const current = imagesRef.current;

        if (current.length >= MAX_IMAGES) {
            toast.error(`সর্বোচ্চ ${MAX_IMAGES}টি ছবি যোগ করা যাবে`);
            return;
        }

        if (current.includes(url)) return;

        const next = [...current, url];
        imagesRef.current = next; // update synchronously for the next callback
        onChange?.(next);
        toast.success("ছবি আপলোড হয়েছে");
    };

    const handleRemove = (index) => {
        const next = imagesRef.current.filter((_, i) => i !== index);
        imagesRef.current = next;
        onChange?.(next);
    };

    const remainingSlots = Math.max(MAX_IMAGES - images.length, 0);

    return (
        <div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {images.map((url, i) => (
                    <div
                        // use url as key — stable across removals
                        key={url}
                        className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                    >
                        <Image
                            src={url}
                            alt={`ছবি ${i + 1}`}
                            fill
                            sizes="150px"
                            className="object-cover"
                        />

                        {i === 0 && (
                            <span className="absolute top-1 left-1 bg-primary text-white font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">
                                প্রধান
                            </span>
                        )}

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(i);
                            }}
                            aria-label="Remove image"
                            className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white transition z-10"
                        >
                            <IoClose className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}

                {remainingSlots > 0 && (
                    <CldUploadWidget
                        cloudName={
                            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                        }
                        uploadPreset={
                            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                        }
                        onSuccess={handleSuccess}
                        options={{
                            sources: ["local", "url", "camera"],
                            multiple: true,
                            // limit per-session to remaining slots, not 5
                            maxFiles: remainingSlots,
                            maxFileSize: 5000000,
                            clientAllowedFormats: [
                                "jpg",
                                "jpeg",
                                "png",
                                "webp",
                            ],
                            folder: "monohor/products",
                        }}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                onClick={() => open()}
                                className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary text-text-muted hover:text-primary transition flex flex-col items-center justify-center gap-1 cursor-pointer"
                            >
                                <IoAdd className="w-6 h-6" />
                                <span className="font-body text-[10px]">
                                    ছবি যোগ
                                </span>
                            </button>
                        )}
                    </CldUploadWidget>
                )}
            </div>

            <p className="font-body text-xs text-text-muted mt-2">
                সর্বোচ্চ {MAX_IMAGES}টি ছবি (৫MB max)। প্রথম ছবিটি প্রধান
                হিসেবে দেখানো হবে।
                {images.length > 0 &&
                    ` — ${images.length}/${MAX_IMAGES} যোগ হয়েছে`}
            </p>
        </div>
    );
};

export default ProductImageUploader;