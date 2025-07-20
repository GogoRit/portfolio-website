# Gaurank Maheshwari - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Express.js. Features an AI-powered chat assistant, interactive animations, and a comprehensive showcase of projects and skills.

## 🚀 Features

- **AI Chat Assistant**: Powered by OpenAI GPT-4, provides intelligent responses about Gaurank's background and projects
- **Interactive Animations**: Smooth transitions and micro-interactions using Framer Motion
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **PDF Upload**: Job description analysis with AI-powered insights
- **Modern UI**: Built with Radix UI components and Tailwind CSS
- **Performance Optimized**: Code splitting and optimized bundle sizes

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **AI Integration**: OpenAI GPT-4 API
- **PDF Processing**: PDF.js for job description parsing
- **Deployment**: Netlify, Docker support

## 📦 Installation

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Docker (optional, for containerized development)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/GogoRit/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:8080`

### Docker Development

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Or run individual containers**
   ```bash
   # Build the image
   docker build -t portfolio-website .
   
   # Run the container
   docker run -p 3000:8080 -e OPENAI_API_KEY=your_key_here portfolio-website
   ```

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect your GitHub repository to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub account
   - Select this repository

2. **Configure build settings**
   - Build command: `npm run build:client`
   - Publish directory: `dist/spa`
   - Functions directory: `netlify/functions`

3. **Set environment variables**
   - Go to Site settings > Environment variables
   - Add `OPENAI_API_KEY` with your OpenAI API key

4. **Deploy**
   - Netlify will automatically deploy on every push to main branch

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**

### Docker Production

1. **Build production image**
   ```bash
   docker build -t portfolio-website-prod .
   ```

2. **Run with environment variables**
   ```bash
   docker run -p 3000:3000 \
     -e OPENAI_API_KEY=your_key_here \
     -e NODE_ENV=production \
     portfolio-website-prod
   ```

### Traditional VPS

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=production
```

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── components/        # UI components
│   ├── pages/            # Page components
│   ├── contexts/         # React contexts
│   └── hooks/            # Custom hooks
├── server/               # Express.js backend
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── logger.ts         # Winston logging
├── netlify/              # Netlify functions
├── public/               # Static assets
├── dist/                 # Build output
└── logs/                 # Application logs
```

## 🧪 Testing

```bash
# Run tests
npm test

# Type checking
npm run typecheck

# Build test
npm run build
```

## 📊 Performance

- **Bundle Size**: Optimized with code splitting (~600KB total)
- **Loading Speed**: Static assets optimized and compressed
- **SEO**: Meta tags and structured data included
- **Accessibility**: WCAG compliant components

## 🔍 API Endpoints

- `GET /api/ping` - Health check
- `POST /api/chat` - AI chat endpoint
- `GET /api/demo` - Demo endpoint

## 📝 Logging

The application uses Winston for structured logging:
- Logs are written to `logs/combined.log` and `logs/error.log`
- Console logging in development mode
- JSON format with timestamps and service metadata

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Gaurank Maheshwari**
- LinkedIn: [Gaurank Maheshwari](https://linkedin.com/in/gaurank-maheshwari)
- GitHub: [@GogoRit](https://github.com/GogoRit)

---

Built with ❤️ using React, TypeScript, and Express.js