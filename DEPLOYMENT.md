# 🚀 NewEMSAPP Deployment Guide

This guide covers multiple ways to deploy your **Emergency Medical Services Platform** to GitHub and other hosting platforms.

## 🌐 GitHub Deployment Options

### Option 1: GitHub Pages (Free Static Hosting)

#### Quick Setup:
1. **Push your code to GitHub**
2. **Go to your repository → Settings → Pages**
3. **Source**: Deploy from a branch
4. **Branch**: `main`
5. **Folder**: `/client/dist` (after running build)

#### Detailed Steps:

```bash
# 1. Build your application
cd client
npm run build

# 2. Commit the dist folder (if needed)
git add client/dist
git commit -m "Add production build"
git push origin main
```

#### Configure for GitHub Pages:
In `client/vite.config.mjs`, uncomment and update:
```js
base: '/your-repo-name/',  // Replace with actual repo name
```

#### Custom Domain (Optional):
1. Add `CNAME` file in `client/public/` with your domain
2. Configure DNS settings with your domain provider

---

### Option 2: GitHub Actions (Automatic Deployment)

The included `.github/workflows/deploy.yml` will:
- ✅ Automatically build on every push to `main`
- ✅ Deploy to GitHub Pages
- ✅ Handle all dependencies and build steps

**Setup:**
1. Push your code to GitHub
2. Go to Repository Settings → Pages
3. Source: **GitHub Actions**
4. The workflow will run automatically!

---

## 🚀 Alternative Hosting Platforms

### Vercel (Recommended for Production)

1. **Connect GitHub repo** at [vercel.com](https://vercel.com)
2. **Import your repository**
3. **Configure settings**:
   - Framework: `Vite`
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `cd client && npm install`
4. **Deploy** - Vercel handles everything automatically!

**Advantages:**
- ✅ Automatic deployments on git push
- ✅ Preview deployments for pull requests
- ✅ Custom domains included
- ✅ Edge network (CDN)
- ✅ Analytics

---

### Netlify

1. **Connect your GitHub repo** at [netlify.com](https://netlify.com)
2. **Build settings**:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`
   - Node version: `18`
3. **Deploy**

**Advantages:**
- ✅ Form handling
- ✅ Serverless functions
- ✅ Split testing
- ✅ Custom domains

---

### Railway (Full-Stack with Backend)

For full-stack deployment with the backend server:

1. **Create `railway.toml`**:
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "node simple-server.js"

[env]
NODE_ENV = "production"
PORT = "3000"
```

2. **Connect repository** at [railway.app](https://railway.app)
3. **Deploy** - Railway handles the rest!

---

## 🔧 Environment Configuration

### For Production:
Create `.env` file:
```bash
NODE_ENV=production
DATABASE_URL="your-database-url"  # Optional
PORT=3001
```

### For GitHub Pages:
Update `client/vite.config.mjs`:
```js
base: '/NewEMSAPP/',  // Your repo name
```

---

## 📱 Domain Setup

### Custom Domain on GitHub Pages:
1. Add `CNAME` file in `client/public/`:
```
yourdomain.com
```

2. Configure DNS:
```
Type: CNAME
Name: www
Value: yourusername.github.io
```

### Custom Domain on Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS as instructed

---

## 🔍 Troubleshooting

### Build Fails:
```bash
# Clear cache and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GitHub Pages 404:
- Check that `base` path in `vite.config.mjs` matches repo name
- Ensure files are in correct directory structure
- Verify GitHub Pages source settings

### Assets Not Loading:
- Confirm `base` path is correctly set
- Check that all assets are in `client/public/` or imported properly

---

## 🚀 Quick Deploy Commands

### GitHub Pages:
```bash
# One-time setup
cd client
npm run build
git add client/dist
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

### Netlify CLI:
```bash
npm i -g netlify-cli
cd client
npm run build
netlify deploy --prod --dir=dist
```

---

## 🏥 Your EMS App is Ready!

Once deployed, your **NewEMSAPP** will be available with:
- ✅ Professional EMS interface
- ✅ Medical calculators
- ✅ Protocol management
- ✅ Mobile-optimized design
- ✅ Voice control ready
- ✅ Clark County EMS integration

**Example URLs:**
- GitHub Pages: `https://yourusername.github.io/NewEMSAPP/`
- Vercel: `https://your-app.vercel.app/`
- Netlify: `https://your-app.netlify.app/`

---

🚑 **Built for Emergency Medical Services professionals and students!** 🏥