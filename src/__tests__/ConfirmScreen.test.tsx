import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmScreen from "../components/ConfirmScreen";

const mockQuote = {
    rate: 80,
    fees: 5,
    total: 805,
    expiresAt: Date.now() + 30000,
};

const mockRequest = {
    sourceCurrency: "USD",
    destinationCurrency: "INR",
    amount: 10,
};

describe("ConfirmScreen", () => {
    it("renders amount and currencies", () => {
        render(
            <ConfirmScreen
                quote={mockQuote}
                quoteRequest={mockRequest}
                onPaymentSuccess={vi.fn()}
                onRetryQuote={vi.fn()}
            />
        );

        expect(
            screen.getByText(/Pay Now/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/USD/i)
        ).toBeInTheDocument();
    });

    it("calls retry when refresh clicked", async () => {
        const user = userEvent.setup();
        const retryMock = vi.fn().mockResolvedValue(undefined);

        render(
            <ConfirmScreen
                quote={mockQuote}
                quoteRequest={mockRequest}
                onPaymentSuccess={vi.fn()}
                onRetryQuote={retryMock}
            />
        );

        await user.click(
            screen.getByRole("button", {
                name: /Refresh Quote/i,
            })
        );

        expect(retryMock).toHaveBeenCalledTimes(1);
    });
});