# Performance & Scaling Strategy

This document outlines the rigorous strategies utilized to guarantee sub-second rendering times and millisecond response latency globally for the Salawat App.

## 1. Edge Compute (Zero Cold Starts)

Next.js Route Handlers (`/api/...`) and middleware are deployed exclusively to the **Vercel Edge Network** (utilizing the V8 isolate engine). 
- **Benefit:** Traditional Node.js serverless functions have a "cold start" penalty of 500ms to 2s. V8 Edge isolates start in < 50ms and run at the CDN node physically closest to the user.

## 2. Stateless Redis connections (REST vs TCP)

When 1,000,000 users connect simultaneously, standard databases require maintaining 1,000,000 open TCP connections. This exhausts connection pools instantly.
- **Our Solution:** By utilizing **Upstash REST APIs**, the app sends stateless HTTP requests to fetch/increment data. Upstash handles the massive throughput without connection pooling bottlenecks.

## 3. Optimistic UI Updates (SWR)

We employ a "Stale-While-Revalidate" approach using `swr`.
- When a user clicks, the local React state updates instantly.
- The mutation fires in the background.
- If the background mutation fails, the UI gracefully rolls back.
- **Result:** The user never experiences network lag while clicking.

## 4. Sub-resource Integrity & Font Optimization

We do not block the main render tree:
- `next/font` provides localized CSS and avoids layout shifts (CLS).
- SVG icons (`lucide-react`) are bundled, avoiding extra HTTP requests.

## 5. Potential Bottleneck Warning
If the transaction rate exceeds 10,000 increments per second on the exact same Redis key, Upstash might throttle.
**Future Mitigation:** Implement `QStash` (or similar Edge queueing) to batch-click events (e.g., adding `INCRBY 500` every 2 seconds instead of 500 individual `INCR 1` calls).
