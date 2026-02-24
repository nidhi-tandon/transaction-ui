import { useEffect, useState } from "react";
import { getTransaction } from "../api/mockApi";
import {
    TRANSACTION_STATUS,
    POLLING_INTERVAL_MS,
} from "../constants";
import type { TransactionStatus } from "../types";

export const useTransactionStatus = (
    id: string | null
) => {
    const [status, setStatus] =
        useState<TransactionStatus>(
            TRANSACTION_STATUS.PROCESSING
        );

    useEffect(() => {
        if (!id) return;

        const interval = setInterval(async () => {
            try {
                const res = await getTransaction(id);
                setStatus(res.status);

                if (
                    res.status === TRANSACTION_STATUS.SETTLED ||
                    res.status === TRANSACTION_STATUS.FAILED
                ) {
                    clearInterval(interval);
                }
            } catch {
                // silent retry
            }
        }, POLLING_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [id]);

    return status;
};