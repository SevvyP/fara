# Fara - Route Optimizer

When planning a vacation, I came across a lack of tools for planning the shortest route in a round trip with multiple stops. This struck me as odd, as this has long been solved (traveling salesman problem). While tools do exist, I found myself having to open new tabs to cross check open hours, weather, etc. to assist me with planning. I thought to myself this might be an easy project to whip up with a couple google APIs, and perhaps some good ol' AI.

This is a [Next.js](https://nextjs.org) project that implements the traveling salesman problem for Google Maps, allowing users to optimize their travel routes.

## Features

Coming soon!

### Prerequisites

1. **Google Maps API Key**: You'll need a Google Maps API key with the following APIs enabled:

   - Maps JavaScript API
   - Places API (New)
   - Directions API
   - Distance Matrix API

   Get your API key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/).

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.local.example .env.local
```

3. Edit `.env.local` and add your Google Maps API key:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Routes

This directory contains example API routes for the headless API app.

For more details, see [route.js file convention](https://nextjs.org/docs/app/api-reference/file-conventions/route).
