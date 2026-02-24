export const FLOW_STEPS = {
    QUOTE: "QUOTE",
    CONFIRM: "CONFIRM",
    STATUS: "STATUS",
} as const;

export const TRANSACTION_STATUS = {
    PROCESSING: "Processing",
    SENT: "Sent",
    SETTLED: "Settled",
    FAILED: "Failed",
} as const;

export const QUOTE_EXPIRY_MS = 30_000;
export const POLLING_INTERVAL_MS = 3_000;

export const SUPPORTED_CURRENCIES = [
    "USD",
    "EUR",
    "GBP",
    "INR",
    "SGD",
    "AUD",
] as const;