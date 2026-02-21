# Salawat App - Feature Roadmap 🗺️

Welcome to the Salawat App Roadmap! This document provides a high-level overview of our current priorities, upcoming features, and long-term goals for the project. 

Our roadmap is heavily driven by community feedback and server performance metrics, as our paramount goal is absolute stability and uptime.

## Phase 1: Foundation (Current)
*Status: In Progress 🛠️*

- [x] Bootstrapping Next.js 15+ App Router application.
- [x] Real-time global counter logic utilizing Upstash Redis atomic INCR.
- [x] Initial design system with Tailwind CSS v4 and Framer Motion.
- [x] Implement robust edge deployment architecture.
- [x] Establish comprehensive GitHub repository documentation (README, CONTRIBUTING, ARCHITECTURE, CI/CD).
- [ ] Implement robust error boundaries and fallback UI.

## Phase 2: Community & Gamification
*Status: Planned 🗓️*

- [ ] **Global Leaderboard:** Display total contributions grouped by country (using Vercel Edge Geolocation).
- [ ] **Milestone System:** Global public milestones (e.g., Target: 1 Billion) with real-time progress bars.
- [ ] **Personal Achievements:** Opt-in browser local storage tracking for personal daily streaks.
- [ ] **Localization (i18n):** Support for Arabic, English, Urdu, French, and Indonesian as a starting point.

## Phase 3: High Availability Enhancements
*Status: Planned 🗓️*

- [ ] **Debouncer Queue:** Instead of hitting Redis directly on every click, implement Upstash QStash to queue clicks at the edge and batch them every 5 seconds to reduce network load.
- [ ] **WebSocket Fallback:** Provide long-polling or WebSocket connections for those who cannot fetch via SWR.
- [ ] **Comprehensive E2E Testing:** Setup Cypress/Playwright to test the flow end-to-end automatically on CI.

## Phase 4: Long-Term Vision
*Status: Under Consideration 🔮*

- [ ] **Mobile Applications:** Dedicated React Native (Expo) apps for iOS and Android.
- [ ] **Smartwatch Apps:** Porting the counter to Apple Watch and Wear OS for quick access.
- [ ] **Public API:** Offer an open, rate-limited REST API for other developers to build their own frontend widgets displaying the global Salawat count.

## How to Contribute
If you want to speed up the roadmap, consider helping out! Pick an item from this list, open a GitHub issue indicating you're working on it, and refer to our [CONTRIBUTING.md](CONTRIBUTING.md) to get started!
