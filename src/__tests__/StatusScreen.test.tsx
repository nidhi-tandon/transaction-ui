import { render, screen } from "@testing-library/react";
import StatusScreen from "../components/StatusScreen";
import * as statusHook from "../hooks/useTransactionStatus";
import { TRANSACTION_STATUS } from "../constants";

describe("StatusScreen", () => {
    it("shows settled state and button", () => {
        vi.spyOn(statusHook, "useTransactionStatus")
            .mockReturnValue(
                TRANSACTION_STATUS.SETTLED
            );

        render(
            <StatusScreen
                transactionId="123"
                onRestart={vi.fn()}
            />
        );

        expect(
            screen.getByText(/Settled/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /Start New Transfer/i,
            })
        ).toBeInTheDocument();
    });
});