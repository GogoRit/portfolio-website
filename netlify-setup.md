# Netlify Deployment Setup

## Current Status
✅ Frontend: Deployed on Netlify  
❌ Backend (API routes): Getting 502 errors

## Steps to Fix

### 1. Set Environment Variables in Netlify Dashboard

Go to your Netlify site dashboard:
1. Navigate to **Site Settings** → **Environment Variables**
2. Add the following variables:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   NODE_ENV=production
   ```

### 2. Verify netlify.toml Configuration

Your `netlify.toml` should look like this:
```toml
[build]
  command = "npm run build:client"
  functions = "netlify/functions"
  publish = "dist/spa"

[functions]
  external_node_modules = ["express", "openai", "multer", "cors"]
  node_bundler = "esbuild"
  
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api"
  status = 200

[[redirects]]
  from = "/test"
  to = "/.netlify/functions/test"
  status = 200
```

### 3. Push Changes to GitHub

After setting environment variables, push your latest changes:
```bash
git add .
git commit -m "Fix serverless function configuration"
git push origin main
```

### 4. Test the Deployment

Once deployed, test these endpoints:
- `https://your-site.netlify.app/test` - Should return "Serverless function is working!"
- `https://your-site.netlify.app/api/ping` - Should return "Hello from Express server v2!"

### 5. Test Chat API

Test the chat endpoint:
```javascript
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello!' })
})
.then(res => res.json())
.then(data => console.log(data));
```

## Troubleshooting

If you still get 502 errors:
1. Check Netlify function logs in the dashboard
2. Verify environment variables are set correctly
3. Make sure all dependencies are in `external_node_modules`
4. Try the test endpoint first to isolate the issue 