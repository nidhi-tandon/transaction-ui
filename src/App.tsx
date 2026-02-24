import { useState } from "react";
import QuoteScreen from "./components/QuoteScreen";
import ConfirmScreen from "./components/ConfirmScreen";
import StatusScreen from "./components/StatusScreen";
import { FLOW_STEPS } from "./constants";
import { postQuote } from "./api/mockApi";
import type {
    FlowStep,
    QuoteResponse,
    QuoteRequest,
} from "./types";

const App = () => {
    const [step, setStep] =
        useState<FlowStep>(FLOW_STEPS.QUOTE);

    const [quote, setQuote] =
        useState<QuoteResponse | null>(null);

    const [quoteRequest, setQuoteRequest] =
        useState<QuoteRequest | null>(null);

    const [transactionId, setTransactionId] =
        useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                {step === FLOW_STEPS.QUOTE && (
                    <QuoteScreen
                        onQuoteReceived={(q, req) => {
                            setQuote(q);
                            setQuoteRequest(req);
                            setStep(FLOW_STEPS.CONFIRM);
                        }}
                    />
                )}

                {step === FLOW_STEPS.CONFIRM &&
                    quote &&
                    quoteRequest && (
                        <ConfirmScreen
                            quote={quote}
                            quoteRequest={quoteRequest}
                            onPaymentSuccess={(id) => {
                                setTransactionId(id);
                                setStep(FLOW_STEPS.STATUS);
                            }}
                            onRetryQuote={async (req) => {
                                const newQuote =
                                    await postQuote(req);
                                setQuote(newQuote);
                            }}
                        />
                    )}

                {step === FLOW_STEPS.STATUS &&
                    transactionId && (
                        <StatusScreen
                            transactionId={transactionId}
                            onRestart={() => {
                                setQuote(null);
                                setQuoteRequest(null);
                                setTransactionId(null);
                                setStep(FLOW_STEPS.QUOTE);
                            }}
                        />
                    )}
            </div>
        </div>
    );
}

export default App;