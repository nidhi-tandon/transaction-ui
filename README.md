# Transaction Experience Dashboard

A simplified frontend experience for an international money transfer flow built with **React + TypeScript + Vite + Tailwind CSS**.

The app models a typical cross-border transfer lifecycle:

1. Get FX Quote
2. Confirm & Pay
3. Track Transaction Status

---

## 🚀 How to Run

```bash
npm install
npm run dev
```

## 🏗 Architecture

The flow is controlled using a simple state model:

- QUOTE
- CONFIRM 
- STATUS

UI transitions are fully state-driven.

### 🔄 Flow Overview
* Quote Screen

    - User selects currencies and amount. 
    - Calls POST /quote (mocked). 
    - Displays rate, fees, total, and expiry timestamp. 
    - Countdown timer is derived from server-provided expiry. 
    - Quote can be refreshed anytime.
  

* Confirm & Pay
    - Displays full transfer breakdown. 
    - POST /pay returns a transaction ID 
    - Transaction Status is handled on the next screen.


* Status
    - Polls GET /transaction/:id. 
    - Displays: Processing, Sent, Failed. 
    - Allows restart after completion or failure.
  

## 🔑 Key Design Decisions 
• State-Driven Flow 
   - The app is modeled around a single FlowStep state (QUOTE → CONFIRM → STATUS)
   - It keeps transitions predictable

• Separation of Initiation and Settlement of payment
  - POST /pay API only creates a transaction attempt 
  - Final success/failure is handled status polling

• Server-Driven Quote Expiry
- Countdown derived from backend 
- It will keep the UI aligned with backend 

• Polling Encapsulated in a Custom Hook
- Stops polling automatically on terminal states

• Clear Separation of Data Responsibilities
- `quote`, `quoteRequest`, and `transactionId` stored independently
- It makes the code and retry logic clean


## What you would improve with more time?
- I would have focused more on improving the app’s responsiveness and refining the UI to make it more polished and production-ready.

- The transaction ID could be stored in localStorage to persist the transaction state across page refreshes.

- Given more time, I would have expanded the test coverage by adding E2E tests with Playwright.

- Although this app is small in scope, for a production-ready version I would consider introducing React Query for better async state management and routing based on API responses.

- In a production-ready environment, WebSockets or Server-Sent Events would be more appropriate than polling for real-time transaction updates.
