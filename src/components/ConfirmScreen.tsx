import { useState } from "react";
import { postPay } from "../api/mockApi";
import { useQuoteTimer } from "../hooks/useQuoteTimer";
import type {
    QuoteResponse,
    QuoteRequest,
} from "../types";

interface Props {
    quote: QuoteResponse;
    quoteRequest: QuoteRequest;
    onPaymentSuccess: (id: string) => void;
    onRetryQuote: (req: QuoteRequest) => Promise<void>;
}

const ConfirmScreen = ({quote, quoteRequest, onPaymentSuccess, onRetryQuote}: Props) => {
    const [loading, setLoading] = useState(false);
    const [retrying, setRetrying] = useState(false);
    const [error, setError] = useState("");

    const timeLeftInMs = useQuoteTimer(quote.expiresAt);
    const expired = timeLeftInMs === 0;

    const handlePay = async () => {
        if (loading || expired) return;

        setLoading(true);
        setError("");

        try {
            const res = await postPay();
            onPaymentSuccess(res.transactionId);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = async () => {
        if (retrying) return;
        setRetrying(true);
        await onRetryQuote(quoteRequest);
        setRetrying(false);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
                Confirm & Pay
            </h2>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Amount</span>
                     <span className="font-medium">
                         {quoteRequest.amount.toFixed(2)}{" "}
                         {quoteRequest.sourceCurrency}
                     </span>
                </div>
                <div className="flex justify-between">
                    <span>Rate</span>
                    <span>{quote.rate.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span>Fees</span>
                    <span>{quote.fees.toFixed(2)}</span>
                </div>

                <div className="flex justify-between border-t pt-2 font-medium">
                    <span>Recipient Gets</span>
                    <span>{quote.total.toFixed(2)}  {quoteRequest.destinationCurrency}</span>
                </div>
            </div>

            <p className={`text-sm`} aria-live="polite">
                {retrying ? "Refreshing quote...": expired ? "Expired" : <>Expires in{" "}
                        <span
                            className={`font-semibold ${
                                expired
                                    ? "text-red-500"
                                    : "text-blue-600"
                            }`}
                        >
                  {Math.ceil(timeLeftInMs / 1000)}s
                </span>
                </>}
            </p>


            <button
                aria-label={loading ? "Processing..." : "Pay Now"}
                onClick={handlePay}
                disabled={loading || expired}
                className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>

            <button
                aria-label= {retrying
                    ? "Refreshing..."
                    : "Refresh Quote"}
                onClick={handleRetry}
                disabled={retrying}
                className="w-full border border-gray-300 py-2.5 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
                {retrying
                    ? "Refreshing..."
                    : "Refresh Quote"}
            </button>

            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
        </div>
    );
}
export default ConfirmScreen