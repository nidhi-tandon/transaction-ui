import { useCallback, useEffect, useState } from "react";

export const useQuoteTimer = (expiresAt: number | null) => {
    const [timeLeftInMs, setTimeLeftInMs] = useState(expiresAt ? expiresAt - Date.now() : 0);

    const updateTimer = useCallback(() => {
        if (!expiresAt) return;

        const remaining = Math.max(
            0,
            expiresAt - Date.now()
        );
        setTimeLeftInMs(remaining);
        return remaining;
    }, [expiresAt])

    useEffect(() => {
        if (!expiresAt) return;

        updateTimer()

        const interval = setInterval(() => {
            const remaining = updateTimer();
            if (remaining === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt, updateTimer]);

    return timeLeftInMs
};