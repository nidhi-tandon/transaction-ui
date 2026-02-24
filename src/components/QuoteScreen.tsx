import { useState } from "react";
import { postQuote } from "../api/mockApi";
import { SUPPORTED_CURRENCIES } from "../constants";
import type {
    QuoteRequest,
    QuoteResponse,
} from "../types";

interface Props {
    onQuoteReceived: (
        quote: QuoteResponse,
        request: QuoteRequest
    ) => void;
}

const QuoteScreen = ({onQuoteReceived}: Props) => {
    const [sourceCurrency, setSourceCurrency] =
        useState("USD");

    const [destinationCurrency, setDestinationCurrency] =
        useState("INR");

    const [amount, setAmount] = useState(100);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleQuote = async () => {
        if (sourceCurrency === destinationCurrency) {
            setError(
                "Source and destination currency cannot be the same."
            );
            return;
        }

        setLoading(true);
        setError("");

        const request = {
            sourceCurrency,
            destinationCurrency,
            amount,
        };

        try {
            const quote = await postQuote(request);
            onQuoteReceived(quote, request);
        } catch {
            setError("Failed to fetch quote.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
                Send Money Internationally
            </h2>

            <div className="space-y-4">
                <label
                    htmlFor="sourceCurrency"
                    className="text-sm font-medium text-gray-700"
                >
                    From
                </label>
                <select
                    disabled={loading}
                    value={sourceCurrency}
                    onChange={(e) =>
                        setSourceCurrency(e.target.value)
                    }
                    className="w-full border rounded-lg px-2 py-2 bg-white mb-2"
                >
                    {SUPPORTED_CURRENCIES.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>

                <label
                    htmlFor="sourceCurrency"
                    className="text-sm font-medium text-gray-700"
                >
                    To
                </label>
                <select
                    disabled={loading}
                    value={destinationCurrency}
                    onChange={(e) =>
                        setDestinationCurrency(e.target.value)
                    }
                    className="w-full border rounded-lg px-4 py-2 bg-white mb-4"
                >
                    {SUPPORTED_CURRENCIES.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>

                <label
                    htmlFor="sourceCurrency"
                    className="text-sm font-medium text-gray-700"
                >
                    Amount
                </label>
                <input
                    type="number"
                    className="w-full border rounded-lg px-4 py-2"
                    value={amount}
                    min={1}
                    disabled={loading}
                    onChange={(e) =>
                        setAmount(Number(e.target.value))
                    }
                />
            </div>

            <button
                aria-label={loading ? "Fetching..." : "Get Quote"}
                onClick={handleQuote}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Fetching..." : "Get Quote"}
            </button>

            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
        </div>
    );
}

export default QuoteScreen