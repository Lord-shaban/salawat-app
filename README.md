<div align="center">
  <img src="public/globe.svg" alt="Salawat App Logo" width="120" />

  # Salawat App 📿

  **A High-Performance, Real-Time Global Prayer Counter**

  [![Next.js](https://img.shields.io/badge/Next.js-15.0+-black?logo=next.js&logoColor=white)](#)
  [![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](#)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](#)
  [![Redis](https://img.shields.io/badge/Upstash_Redis-DC382D?logo=redis&logoColor=white)](#)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  [Live Demo](https://salawat-app.vercel.app) · [Report Bug](https://github.com/your-username/salawat-app/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D+) · [Request Feature](https://github.com/your-username/salawat-app/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=%5BFEATURE%5D+)
</div>

---

## 📖 About The Project

**Salawat App** is a highly scalable, real-time web application built with a noble purpose: to serve as a unified, global counter for sending blessings (Salawat) upon the Prophet Muhammad (Peace Be Upon Him).

Engineered to handle massive scale seamlessly, the architecture ensures zero downtime even with millions of concurrent users contributing billions of clicks simultaneously. By leveraging edge computing and in-memory databases, the synchronization happens in milliseconds across the globe.

### ✨ Key Features

- **⚡ Blazing Fast Performance:** Fully optimized React 19 and Next.js 15+ App Router application.
- **🌍 Real-Time Global Synchronization:** Utilizing Upstash Redis for instantaneous, highly concurrent database updates.
- **🎨 Modern & Interactive UI:** Crafted with Tailwind CSS v4 and enhanced with smooth, physics-based animations via Framer Motion.
- **🔄 Optimistic UI Updates:** SWR handles data fetching and mutation, ensuring the counter feels instant for the user while syncing reliably in the background.
- **📱 Fully Responsive:** Carefully designed to provide an optimal experience across all devices, from desktop to mobile.

## 🛠 Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org)
- **UI Library:** [React 19](https://react.dev)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database / Cache:** [Upstash (Redis)](https://upstash.com/)
- **Data Fetching:** [SWR (Stale-While-Revalidate)](https://swr.vercel.app/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js (v18 or higher) and npm (or pnpm/yarn) installed on your machine.
- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/salawat-app.git
   ```

2. **Navigate into the project directory**
   ```bash
   cd salawat-app
   ```

3. **Install NPM packages**
   ```bash
   npm install
   ```

4. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your Upstash Redis credentials:
   ```env
   UPSTASH_REDIS_REST_URL="YOUR_UPSTASH_REST_URL"
   UPSTASH_REDIS_REST_TOKEN="YOUR_UPSTASH_REST_TOKEN"
   ```
   *Note: You can obtain these credentials by creating a free database on [Upstash](https://upstash.com/).*

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🚢 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

```bash
npm i -g vercel
vercel
```
*Don't forget to add your `.env` variables in the Vercel project settings.*

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make to this noble cause are **greatly appreciated**.

Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started. Also, review our [Code of Conduct](CODE_OF_CONDUCT.md) to understand the standards we hold for our community.

### Development Steps
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🛡️ Security

If you discover any security related issues, please refer to our [Security Policy](SECURITY.md) for reporting guidelines.

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

## 🌟 Acknowledgements

May Allah accept this effort and reward everyone who contributes to or uses this application.
