import { useEffect, useState } from "react";

export const useQuoteTimer = (expiresAt: number | null) => {
    const [timeLeftInMs, setTimeLeftInMs] = useState(expiresAt - Date.now());

    const updateTimer = () => {
        const remaining = Math.max(
            0,
            expiresAt - Date.now()
        );
        setTimeLeftInMs(remaining);
        return remaining;
    }

    useEffect(() => {
        if (!expiresAt) return;

        setTimeLeftInMs(() => updateTimer())

        const interval = setInterval(() => {
            const remaining = updateTimer();
            if (remaining === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);

    return timeLeftInMs
};