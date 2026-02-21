# API Reference

The Salawat App is built primarily as a client-first application, but it relies on internal Edge API routes to communicate with the Redis datastore securely.

Currently, these routes act as the bridge but could be configured as a public API in the future (with appropriate rate limits).

---

## 1. POST `/api/increment`

Increments the global Salawat counter atomically.

### Request
No body is strictly required, but you may pass an optional `{ count: number }` if batching is implemented later. Currently, every hit simply increments by 1.

**Example Request (Fetch):**
```javascript
const response = await fetch('/api/increment', {
  method: 'POST',
});
```

### Response
Returns the new updated total after the increment.

**Example Success Response (200 OK):**
```json
{
  "success": true,
  "total": 1000045,
  "message": "Increment successful."
}
```

**Example Error Response (429 Too Many Requests):**
```json
{
  "success": false,
  "error": "Rate limit exceeded"
}
```

---

## 2. GET `/api/total`

Fetches the current global total of the counter without incrementing. Usually polled by the client via SWR.

### Request
**Example Request (Fetch):**
```javascript
const response = await fetch('/api/total', {
  method: 'GET',
});
```

### Response

**Example Success Response (200 OK):**
```json
{
  "total": 1000045
}
```

*Note: In Edge environments, this route leverages `stale-while-revalidate` cache headings to avoid constantly querying Redis for pure reads.*
