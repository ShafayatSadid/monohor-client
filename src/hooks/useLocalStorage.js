// hooks/useLocalStorage.js
"use client";

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
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