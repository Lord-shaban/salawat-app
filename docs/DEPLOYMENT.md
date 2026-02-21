# Deployment Guide

The Salawat App is built specifically to deploy seamlessly on Vercel, maximizing the performance of Next.js 15 App Router.

## Production Deployment on Vercel

1. **Connect Repository:**
   Go to [Vercel](https://vercel.com/new) and import your GitHub repository.

2. **Configure Environment Variables:**
   Before hitting deploy, you must add the following variables in the Vercel Dashboard (Settings > Environment Variables):
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

3. **Deploy:**
   Vercel will automatically detect Next.js. The Build Command (`npm run build`) and Install Command (`npm install`) require no configuration.

4. **Assign Custom Domain (Optional):**
   In the project settings, assign your custom domain (e.g., `salawat.com`). Vercel automatically provisions SSL certificates.

## Self-Hosting (Docker / VPS)

If you prefer to deploy on your own VPS (DigitalOcean, AWS EC2, Hetzner), follow these steps using the provided `Dockerfile`.

1. **Build the Image:**
   ```bash
   docker build -t salawatapp/web:latest .
   ```

2. **Run the Container:**
   ```bash
   docker run -d \
     -p 3000:3000 \
     -e UPSTASH_REDIS_REST_URL=your_url \
     -e UPSTASH_REDIS_REST_TOKEN=your_token \
     -e NODE_ENV=production \
     salawatapp/web:latest
   ```

*Note: When self-hosting, you lose the Vercel Edge Network benefits. API routes will run in a standard Node.js environment in whichever region your server is located.*
