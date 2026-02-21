# State Management Architecture

One of the most critical decisions in building the Salawat App was how to manage state across a distributed global audience while maintaining an instantaneous, localized user experience.

## Why Not Redux, MobX, or Zustand?
Traditional Global State Managers (Redux, Zustand) are excellent for client-side state. However, the Salawat App's core state (the total count) does not belong to the client; it belongs to the *Server*. Utilizing purely client-side state managers creates a massive disconnect when millions of users are mutating the exact same integer simultaneously.

## Our Approach: **Server-State First (SWR)**

We utilize **SWR** (Stale-While-Revalidate) by Vercel for the overarching state synchronization. SWR treats the database as the ultimate source of truth but operates optimistically on the client.

### 1. Optmistic Mutations
When a user clicks "صَلِّ عَلَيْهِ":
1. The local integer increments immediately via a local `setState`. No waiting for network responses.
2. The UI repaints, Framer Motion plays the physics animation.
3. Behind the scenes, the *intent* to increment is cached into a `useRef` queue (the Debouncer).

### 2. The Debouncer (Batching System)
**The Problem**: Sending an HTTP request for every single click (when a user might click 10 times in 2 seconds) will DDOS our own API.
**The Solution**: A custom `setInterval` (currently set to 1500ms) polls the `useRef` queue. If `clicks > 0`, it zeroes the queue and sends a unified `POST` request (e.g., `{ amount: 10 }`) to the Edge API.

### 3. Revalidation & Conflict Resolution
While SWR regularly polls the `api/total` route, there's a risk of the client total going *backwards* if a cached (stale) response is returned before a fresh increment.
We resolve this explicitly in the SWR callback:
```javascript
setGlobalCount((prev) => Math.max(prev, fetchedData.count));
```
By implementing this monotonic function, the counter can *only* go up, completely hiding network jitters or backend CDN caching delays from the end-user.
