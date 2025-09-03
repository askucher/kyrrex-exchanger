Here’s a clean **README.md** for your Express router project:

````markdown
# Crypto Exchange API (Mock)

This project provides a mock **Express.js API** for simulating a simple crypto exchange.  
It includes routes for retrieving invoices history, markets, exchange rate estimation, and creating mock exchanges.

## Features

- **Invoices History** – Filterable and paginated invoice history
- **Markets** – List of supported markets and assets
- **Estimate** – Simple conversion estimate between assets
- **Exchange** – Create a mock exchange request

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Installation

```bash
# Clone the repository
git clone https://github.com/askucher/kyrrex-exchanger.git
cd your-repo

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build and run in production
npm run build
npm start
````

## API Endpoints

### 🔹 Get Invoices History

**GET** `/invoices/history`

Query Parameters:

* `status` (string) – filter by status
* `from_asset_id` (string)
* `to_asset_id` (string)
* `uid` (string)
* `per_page` (number, default `10`)
* `page` (number, default `1`)

**Response Example:**

```json
{
  "items": [
    {
      "uid": "uid",
      "from_asset_id": "usdt",
      "to_asset_id": "btc",
      "status": "done",
      "input_amount": 100000,
      "output_amount": 1
    }
  ],
  "total_count": 100,
  "per_page": 10,
  "total_pages": 10,
  "page": 1,
  "prev_page": null,
  "next_page": 2
}
```

---

### 🔹 Get Markets

**GET** `/markets`

**Response Example:**

```json
{
  "items": [
    {
      "market": "xrpusdt",
      "base_asset": {
        "code": "xrp",
        "input_precission": 0,
        "output_precission": 6,
        "input_available": true,
        "output_available": true,
        "input_min_amount": 10
      },
      "quote_asset": {
        "code": "usdt",
        "input_precission": 0,
        "output_precission": 6,
        "input_available": true,
        "output_available": true,
        "input_min_amount": 10
      }
    }
  ]
}
```

---

### 🔹 Get Estimate

**GET** `/estimate`

Query Parameters:

* `from_asset_id` (string, required)
* `to_asset_id` (string, required)
* `amount` (number, required)

**Response Example:**

```json
{
  "from_asset_id": "usdt",
  "to_asset_id": "btc",
  "amount": 1000,
  "estimated_amount": 0.01
}
```

---

### 🔹 Create Exchange

**POST** `/exchange`

Body Parameters:

* `from_asset_id` (string, required)
* `to_asset_id` (string, required)

**Response Example:**

```json
{
  "deposit_address": "address"
}
```

---

## Project Structure

```
.
├── index.ts                   # Entry point
├── routers/exchange.ts        # Express router with routes
├── package.json
└── tsconfig.json
```

## Notes

* This project is **mock only** – it does not connect to any real blockchain or exchange.
* Use it for **testing**, **prototyping**, or as a **template** for real-world integration.

---

## License

MIT

