# Testing Guidelines

We utilize automated testing to ensure the Salawat App's core increment API handles load without crashing, and the React UI does not lock up under heavy interaction.

*(Note: Test suites are currently being implemented under Phase 3 of our [ROADMAP](../ROADMAP.md)).*

## 1. Unit Testing (Jest & React Testing Library)
Run `npm run test` locally to execute:

1. **State Assertions:** Ensuring SWR falls back correctly when `fetch()` fails.
2. **Animation Assertions:** Confirming Framer Motion loads the initial state before user click.
3. **API Logic:** Mocking Upstash REST connection locally and verifying `INCR` payload.

## 2. Load and Stress Testing
When simulating 10,000+ concurrent clicks, traditional unit tests fail. 

We highly recommend using an Edge-based load tester like:
- **Artillery** (`npm i -g artillery`)
- **k6 (Grafana)**

### Example k6 Script (`loadTest.js`):
```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 100, // Virtual Users
  duration: '30s', // Test Duration
};

export default function () {
  const res = http.post('http://localhost:3000/api/increment');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(0.1);
}
```

Do **not** run load tests against the production Upstash database, as it will exhaust free-tier quotas instantly. Use a mock local Redis instance for load tests.
