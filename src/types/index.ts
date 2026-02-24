import { FLOW_STEPS, TRANSACTION_STATUS } from "../constants";

export type FlowStep =
    typeof FLOW_STEPS[keyof typeof FLOW_STEPS];

export interface QuoteRequest {
    sourceCurrency: string;
    destinationCurrency: string;
    amount: number;
}

export interface QuoteResponse {
    rate: number;
    fees: number;
    total: number;
    expiresAt: number;
}

export type TransactionStatus =
    typeof TRANSACTION_STATUS[keyof typeof TRANSACTION_STATUS];