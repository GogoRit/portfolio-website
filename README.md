# Gaurank Maheshwari - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Express.js. Features an AI-powered chat assistant, interactive animations, and a comprehensive showcase of projects and skills.

## Live Site

[gaurank-maheshwari.netlify.app](https://gaurank-maheshwari.netlify.app)

## Features

- **AI Chat Assistant** - Powered by OpenAI GPT-4, provides intelligent responses about background, projects, and experience
- **Interactive Animations** - Smooth transitions and micro-interactions using Framer Motion
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Case Study Pages** - Detailed project breakdowns with dynamic routing
- **LeetCode Integration** - Real-time coding statistics display
- **Modern UI** - Built with Radix UI components and Tailwind CSS
- **Performance Optimized** - Code splitting, lazy loading, and optimized bundle sizes

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router 6 (SPA mode)
- Tailwind CSS 3
- Framer Motion
- Radix UI Components
- Recharts (data visualization)
- Three.js (3D graphics)

### Backend
- Express.js
- Node.js
- Winston (logging)
- Zod (validation)

### Integrations
- OpenAI GPT-4 API
- LeetCode API
- PDF.js (document parsing)

### Deployment
- Netlify (with serverless functions)
- Docker support

## Project Structure

```
client/                    # React SPA frontend
├── components/
│   ├── sections/         # Page sections (Hero, Projects, Skills, etc.)
│   └── ui/               # Reusable UI components
├── pages/                # Route components
├── contexts/             # React context providers
├── hooks/                # Custom React hooks
├── config/               # Configuration files
├── data/                 # Static data (projects, certifications)
└── global.css            # Tailwind CSS theming

server/                    # Express API backend
├── routes/               # API route handlers
│   ├── chat.ts          # AI chat endpoint
│   ├── leetcode.ts      # LeetCode stats proxy
│   └── demo.ts          # Demo endpoint
├── services/             # Business logic
└── logger.ts             # Winston logging configuration

netlify/                   # Netlify serverless functions
└── functions/
    └── api.ts            # Serverless API wrapper

shared/                    # Shared types (client and server)
└── api.ts                # API interface definitions

public/                    # Static assets
```

## Installation

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker (optional)

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/GogoRit/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   
   Add your OpenAI API key to the `.env` file:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:8080`

### Docker Development

Build and run with Docker Compose:
```bash
docker-compose up --build
```

Or run individual containers:
```bash
docker build -t portfolio-website .
docker run -p 8080:8080 -e OPENAI_API_KEY=your_key_here portfolio-website
```

## Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm install --production=false && npm run build:client`
   - Publish directory: `dist/spa`
   - Functions directory: `netlify/functions`
3. Set environment variables in Netlify dashboard:
   - `OPENAI_API_KEY`
4. Deploy - Netlify automatically deploys on every push to main

### Docker Production

```bash
docker build -f Dockerfile.prod -t portfolio-website-prod .
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your_key_here \
  -e NODE_ENV=production \
  portfolio-website-prod
```

### Traditional Server

```bash
npm run build
npm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (client + server) |
| `npm run build` | Production build (client + server) |
| `npm run build:client` | Build client only |
| `npm run build:server` | Build server only |
| `npm start` | Start production server |
| `npm test` | Run Vitest tests |
| `npm run typecheck` | TypeScript validation |
| `npm run format.fix` | Format code with Prettier |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ping` | GET | Health check |
| `/api/chat` | POST | AI chat interaction |
| `/api/leetcode/stats` | GET | LeetCode statistics |
| `/api/demo` | GET | Demo endpoint |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for chat functionality |
| `PORT` | No | Server port (default: 8080 dev, 3000 prod) |
| `NODE_ENV` | No | Environment (development/production) |

## Logging

Application uses Winston for structured logging:
- Combined logs: `logs/combined.log`
- Error logs: `logs/error.log`
- Console output in development mode
- JSON format with timestamps

## Author

**Gaurank Maheshwari**
- Website: [gaurank-maheshwari.netlify.app](https://gaurank-maheshwari.netlify.app)
- LinkedIn: [linkedin.com/in/gaurank](https://linkedin.com/in/gaurank)
- GitHub: [github.com/GogoRit](https://github.com/GogoRit)

## License

This project is licensed under the MIT License.
