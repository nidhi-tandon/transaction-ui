import { useTransactionStatus } from "../hooks/useTransactionStatus";
import { TRANSACTION_STATUS } from "../constants";

interface Props {
    transactionId: string;
    onRestart: () => void;
}

const StatusScreen = ({transactionId,onRestart}: Props) => {
    const status = useTransactionStatus(transactionId);

    return (
        <div className="space-y-8 text-center">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Transaction Status
                </h2>
                <p className="text-sm text-gray-500">
                    Track the progress of your transfer
                </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-4 shadow-sm" aria-live="polite">

                {status === TRANSACTION_STATUS.SENT && (
                    <div className="flex justify-center">
                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                                className="w-7 h-7 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                )}

                <p
                    className={`text-xl font-semibold ${
                        status === TRANSACTION_STATUS.SENT
                            ? "text-green-600"
                            : status === TRANSACTION_STATUS.FAILED
                                ? "text-red-600"
                                : "text-blue-600"
                    }`}
                >
                    {status}
                </p>

                {status === TRANSACTION_STATUS.SENT && (
                    <p className="text-sm text-gray-600">
                        Your funds have been successfully sent.
                    </p>
                )}

                {status === TRANSACTION_STATUS.FAILED && (
                    <p className="text-sm text-gray-600">
                        The transfer could not be completed. Please try again.
                    </p>
                )}

                {status === TRANSACTION_STATUS.PROCESSING && (
                    <p className="text-sm text-gray-600">
                        Your transfer is being processed.
                    </p>
                )}

                <div className="pt-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Transaction ID
                    </p>
                    <p className="text-xs bg-white rounded-md px-3 py-2 mt-1 break-all border">
                        {transactionId}
                    </p>
                </div>
            </div>

            {(status === TRANSACTION_STATUS.SETTLED ||
                status === TRANSACTION_STATUS.FAILED) && (
                <button
                    aria-label="Start New Transfer"
                    onClick={onRestart}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition shadow-md hover:shadow-lg"
                >
                    Start New Transfer
                </button>
            )}
        </div>
    );
}

export default StatusScreen