import { Router, Request, Response } from "express";

const router = Router();

// ===== Types =====
interface Invoice {
  uid: string;
  from_asset_id: string;
  from_dchain_id: string;
  to_asset_id: string;
  to_dchain_id: string;
  status: string;
  input_amount: number;
  output_amount: number;
}

interface MarketAsset {
  code: string;
  input_precission: number;
  output_precission: number;
  input_available: boolean;
  output_available: boolean;
  input_min_amount: number;
}

interface Market {
  market: string;
  base_asset: MarketAsset;
  quote_asset: MarketAsset;
}

// ===== Mock Data =====
const invoices: Invoice[] = Array.from({ length: 100 }).map((_, idx) => ({
  uid: "uid",
  from_asset_id: "usdt",
  from_dchain_id: "",
  to_asset_id: "btc",
  to_dchain_id: "",
  status: "done",
  input_amount: 100000 + idx,
  output_amount: 1 + idx * 0.01,
}));

const markets: Market[] = [
  {
    market: "xrpusdt",
    base_asset: {
      code: "xrp",
      input_precission: 0,
      output_precission: 6,
      input_available: true,
      output_available: true,
      input_min_amount: 10,
    },
    quote_asset: {
      code: "usdt",
      input_precission: 0,
      output_precission: 6,
      input_available: true,
      output_available: true,
      input_min_amount: 10,
    },
  },
];

// ===== Routes =====

// GET invoices history
router.get("/invoices/history", (req: Request, res: Response) => {
  const { status, from_asset_id, to_asset_id, uid } = req.query;
  const per_page = parseInt(req.query.per_page as string) || 10;
  const page = parseInt(req.query.page as string) || 1;

  let filtered = invoices.filter(
    (inv) =>
      (!status || inv.status === status) &&
      (!from_asset_id || inv.from_asset_id === from_asset_id) &&
      (!to_asset_id || inv.to_asset_id === to_asset_id) &&
      (!uid || inv.uid === uid)
  );

  const total_count = filtered.length;
  const total_pages = Math.ceil(total_count / per_page);

  const start = (page - 1) * per_page;
  const items = filtered.slice(start, start + per_page);

  res.json({
    items,
    total_count,
    per_page,
    total_pages,
    page,
    prev_page: page > 1 ? page - 1 : null,
    next_page: page < total_pages ? page + 1 : null,
  });
});

// GET markets
router.get("/markets", (_req: Request, res: Response) => {
  res.json({ items: markets });
});

// GET estimate (simple mock)
router.get("/estimate", (req: Request, res: Response) => {
  const { from_asset_id, to_asset_id, amount } = req.query;

  if (!from_asset_id || !to_asset_id || !amount) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const rate = 0.00001;
  res.json({
    from_asset_id,
    to_asset_id,
    amount: Number(amount),
    estimated_amount: Number(amount) * rate,
  });
});

// POST create exchange
router.post("/exchange", (req: Request, res: Response) => {
  const { from_asset_id, to_asset_id } = req.body;

  if (!from_asset_id || !to_asset_id) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  res.json({
    deposit_address: "address",
  });
});

export default router;
