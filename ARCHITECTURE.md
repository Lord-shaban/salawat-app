# System Architecture & Design

This document details the architectural decisions, data flow, and scaling strategies that enable the **Salawat App** to handle millions of concurrent users with zero downtime.

## 1. High-Level Architecture

The system is designed as an Edge-First serverless application. Traditional centralized servers create latency bottlenecks. By moving our compute to the edge (closer to the user) and using a distributed in-memory datastore, we achieve unprecedented speed.

### Components
1. **Frontend Client**: Next.js App Router built with React 19. It aggressively caches static assets while maintaining dynamic client-side state using SWR (Stale-While-Revalidate).
2. **Edge API Route**: Next.js Route Handlers deployed to Vercel's Edge Network. They act as ultra-fast, lightweight proxies that receive click payloads and talk to the database.
3. **Primary Datastore**: Upstash Serverless Redis. Specifically chosen for its `INCR` (Increment) atomic operation, which is critical for preventing race conditions when thousands of users click simultaneously.

## 2. Data Flow & Synchronization

### The "Click" Lifecycle
1. **User Action**: The user clicks the counter button.
2. **Optimistic UI Update**: SWR instantly updates the local React state. The user perceives zero latency. At this moment, Framer Motion fires a physics-based animation.
3. **Background Mutation**: A `POST` request is fired to the Edge `/api/increment` endpoint asynchronously.
4. **Atomic Increment**: The Edge function hits Upstash Redis using the blazing-fast REST API. It performs an atomic `INCR` operation on the global counter key.
5. **Revalidation**: Periodically, SWR polls the latest global total, merging it with the user's optimistic local state smoothly.

## 3. Scalability & High Availability Strategy

### Dealing with "The Thundering Herd" problem
When millions of users connect at once, traditional SQL or Document databases (like PostgreSQL or MongoDB) will lock rows or crash due to connection limits.

**Our Solution:**
- **Stateless Edge**: Vercel scales functions infinitely without managing connections.
- **Connectionless Redis (REST)**: By communicating with Upstash via REST rather than persistent TCP connections, we eliminate connection pooling issues.
- **Debouncing / Batching (Future Phase)**: If the scale reaches billions per minute, the Next.js API route will be updated to queue increments in an Edge-based Kafka/QStash queue, flushing them to Redis in batches.

## 4. Frontend Architecture

### Design System
- **Tailwind CSS v4**: Serves as the design token engine.
- **Framer Motion**: Used for highly optimized CSS transforms that utilize the GPU, ensuring smooth animations even on low-end mobile devices.

### State Management
- Local component state (`useState`) handles the immediate button physics and haptics.
- Global synchronization is handled entirely by `swr`. No complex Redux or Zustand setups are required, keeping the bundle size minuscule.

## 5. Security Architecture
- All sensitive variables (`UPSTASH_REDIS_REST_TOKEN`) are isolated securely in the server/edge environment.
- The API routes implement basic Rate Limiting (via Upstash Ratelimit) to prevent abuse and bot-spamming.
