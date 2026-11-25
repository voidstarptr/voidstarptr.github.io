# Market Re-entry Lab

A dependency-free, browser-only research tool for comparing trend-confirmed equity re-entry against passive and simpler trend-following strategies. Serve the repository root with any static web server and visit `/market-reentry/`. No build step or API keys are required.

## Data

The default demo uses deterministic synthetic weekday data (not an actual exchange calendar or ticker). To test a real ticker, import a daily OHLCV CSV with columns Date, Open, High, Low, Close, Volume and optionally Adj Close. All processing is local. Include sufficient history before the test start for indicator warm-up; the default weekly model needs 105 weekly bars. For total-return research use consistently adjusted prices and appropriate volume adjustments. CSV Adj Close scaling does not adjust volume for splits.

## Methodology

Entry requires rising VZO, optional prior capitulation, a recent MACD bullish crossover (or bullish regime), a configurable rebound from a preceding low, and price above fast EMA and slow SMA. Daily/weekly signals, an optional weekly gate, and several exit rules are supported. The defaults (7 EMA, 20 SMA, VZO rising two bars, 5% rebound over six bars, MACD cross within four bars, exit below SMA) are research interpretations, not independently validated trading rules.

The engine uses completed bars and next-session open fills, fractional shares, configurable transaction costs and annual cash yield. Initial exposure is inferred from pre-range signals. No forced final liquidation. Comparisons use buy and hold, weekly moving averages, 200-day SMA and 10-month SMA. Sharpe uses daily excess returns; drawdown uses daily closing equity. Taxes, liquidity constraints, exchange-calendar validation, survivorship corrections and parameter optimization are omitted.

## Tests

Run `node market-reentry/test.js` from the repository root. Tests cover daily/weekly execution timing and invariance to future bars, costs, and CSV validation and adjustment. Browser smoke tests use synthetic and CSV data.

## Future work

Automatic ticker lookup requires a server-side market-data provider adapter and suitable data rights. Do not embed provider secrets in the frontend. Add data provenance, coverage and calendar checks before relying on vendor data; consider out-of-sample tests and parameter sensitivity before drawing conclusions.
