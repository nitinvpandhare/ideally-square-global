# Ideally Square Global

A premium business magazine website built with React 18 and Vite — featuring leadership insights, magazine issues, and industry articles across tech, AI, fintech, healthcare, and more.

## Tech Stack

- **React 18** with Vite (fast dev server + HMR)
- **React Router v6** for routing
- **Framer Motion** for smooth animations
- **React Hook Form** for form validation
- **React Helmet Async** for SEO meta tags
- **Axios** for API calls with interceptors
- **CSS Modules** for scoped styling

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Midnight | `#0A0A0A` | Header, hero, primary dark |
| Charcoal | `#1A1A1A` | Secondary dark surfaces |
| Gold | `#C9A961` | Brand accent, buttons, tags |
| Bronze | `#B8935A` | Hover states, italic accents |
| Cream | `#F5F2EC` | Page background |
| White | `#FFFFFF` | Card surfaces |

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Copy env file and configure
cp .env.example .env

# Start dev server (opens at http://localhost:3000)
npm run dev
```

### Build for Production

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

## Project Structure

```
src/
├── assets/              Images, icons, fonts
├── components/
│   ├── common/          Button, Card, Loader (reusable)
│   ├── layout/          Header, Footer, Layout
│   ├── home/            HeroSection, MagazinesGrid, ArticlesSection, NewsletterBanner
│   └── forms/           ContactForm, SubscribeForm
├── pages/               Home, Magazines, Articles, Interviews, About, Contact, NotFound
├── routes/              AppRoutes (React Router config)
├── hooks/               useFetch, useDebounce, useScrollPosition
├── context/             Global state providers
├── services/api/        Axios config + API endpoint wrappers
├── utils/               formatDate, slugify, constants
├── data/                Static content (quotes, navLinks, mockData)
├── styles/              globals.css with CSS variables
└── config/              Environment config
```

## Path Aliases

The project uses Vite path aliases — import modules cleanly without relative paths:

```js
import Header from '@components/layout/Header/Header';
import Home from '@pages/Home/Home';
import useFetch from '@hooks/useFetch';
import { articlesApi } from '@services/api/articlesApi';
```

## Connecting to a Real Backend

The project currently uses mock data from `src/data/mockData.js`. To connect to a live API:

1. Set `VITE_API_URL` in your `.env` file
2. Replace mock imports with API calls via the `useFetch` hook:

```jsx
import useFetch from '@hooks/useFetch';
import { articlesApi } from '@services/api/articlesApi';

const { data, loading, error } = useFetch(() => articlesApi.getAll(), []);
```

## Features

- Fully responsive (mobile-first breakpoints)
- Sticky header with scroll-aware styling
- Animated hero quote carousel (auto-rotating)
- Magazine grid with hover reveal effects
- Article filter by category
- Working contact form with validation
- Newsletter signup with inline success state
- SEO-ready with per-page meta tags
- 404 page
- Smooth page transitions via Framer Motion

## Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Deployment

The `dist/` folder after `npm run build` is a static site — deploy anywhere:

- **Vercel**: `vercel deploy` (zero config)
- **Netlify**: drag-and-drop the `dist/` folder
- **GitHub Pages**: use `gh-pages` package
- **AWS S3 + CloudFront**: upload `dist/` contents

Remember to set `VITE_API_URL` in your hosting platform's environment variables.

## License

© 2026 Ideally Square Global. All rights reserved.
