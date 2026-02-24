import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuoteScreen from "../components/QuoteScreen";

describe("QuoteScreen", () => {
    it("renders headline and button", () => {
        render(<QuoteScreen onQuoteReceived={vi.fn()} />);

        expect(
            screen.getByText(/Send Money Internationally/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /Get Quote/i })
        ).toBeInTheDocument();
    });

    it("shows error if same currency selected", async () => {
        const user = userEvent.setup();

        render(<QuoteScreen onQuoteReceived={vi.fn()} />);

        // Defaults may already be different
        // So set both to same value explicitly

        const selects = screen.getAllByRole("combobox");

        await user.selectOptions(selects[1], "USD");

        await user.click(
            screen.getByRole("button", { name: /Get Quote/i })
        );

        expect(
            screen.getByText(/cannot be the same/i)
        ).toBeInTheDocument();
    });
});