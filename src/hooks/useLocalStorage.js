// hooks/useLocalStorage.js
"use client";

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            if (!item) return initialValue;

            const parsed = JSON.parse(item);

            // ─── Merge: initialValue-এর missing keys যোগ করি ───
            if (
                parsed &&
                typeof parsed === "object" &&
                !Array.isArray(parsed) &&
                initialValue &&
                typeof initialValue === "object" &&
                !Array.isArray(initialValue)
            ) {
                return { ...initialValue, ...parsed };
            }

            return parsed;
        } catch (err) {
            console.error("useLocalStorage read error:", err);
            return initialValue;
        }
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error("useLocalStorage write error:", err);
        }
    }, [key, value]);

    const clear = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem(key);
        }
        setValue(initialValue);
    };

    return [value, setValue, clear];
}