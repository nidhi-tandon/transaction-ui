import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import * as api from "../api/mockApi";

describe("App flow", () => {
    it("moves from quote to confirm screen", async () => {
        const user = userEvent.setup();

        vi.spyOn(api, "postQuote").mockResolvedValue({
            rate: 80,
            fees: 5,
            total: 805,
            expiresAt: Date.now() + 30000,
        });

        render(<App />);

        await user.click(
            screen.getByRole("button", { name: /Get Quote/i })
        );

        expect(
            await screen.findByText(/Confirm & Pay/i)
        ).toBeInTheDocument();
    });
});