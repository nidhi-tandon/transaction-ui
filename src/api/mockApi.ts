interface QuoteResponse {
    rate: number;
    fees: number;
    total: number;
    expiresAt: number;
}

type TransactionStatus =
    | "Processing"
    | "Sent"
    | "Settled"
    | "Failed";


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const postQuote = async (
    payload
): Promise<QuoteResponse> => {
    await delay(1000);

    const rate = 83 + Math.random();
    const fees = 5;
    const total = payload.amount * rate + fees;

    return {
        rate,
        fees,
        total,
        expiresAt: Date.now() + 30000,
    };
};

export const postPay = async (): Promise<{ transactionId: string }> => {
    await delay(1200);

    if (Math.random() < 0.15) {
        throw new Error("Payment request failed.");
    }

    return { transactionId: crypto.randomUUID() };
};

export const getTransaction = async (
    id: string
): Promise<{ status: TransactionStatus }> => {
    await delay(1000);

    const states: TransactionStatus[] = [
        "Processing",
        "Sent",
        "Settled",
        "Failed",
    ];

    const random = states[Math.floor(Math.random() * states.length)];

    return { status: random };
};