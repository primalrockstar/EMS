# NewEMSAPP - Emergency Medical Services Platform

A comprehensive Emergency Medical Services (EMS) educational and professional platform built with React, TypeScript, and Node.js. Designed for both EMS students and field professionals with Clark County, Nevada EMS protocol integration.

## 🚀 Live Demo

- **Development**: [http://localhost:5173](http://localhost:5173)
- **Production Build**: [http://localhost:4173](http://localhost:4173)

## 🛠️ Quick Start

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd NewEMSAPP

# Install dependencies for client
cd client
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
cd client
npm run build

# Preview production build
npm run preview
```

## 🌐 GitHub Deployment Options

### Option 1: GitHub Pages (Static Hosting)

1. **Build the app**:
   ```bash
   cd client && npm run build
   ```

2. **Configure for GitHub Pages** in `vite.config.mjs`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/',  // Add this line
   })
   ```

3. **Deploy to GitHub Pages**:
   - Go to Repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `docs` or `gh-pages`
   - Folder: `/client/dist`

### Option 2: Vercel (Recommended)

1. **Connect your GitHub repo to Vercel**
2. **Configure build settings**:
   - Framework: Vite
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `cd client && npm install`

### Option 3: Netlify

1. **Connect GitHub repo to Netlify**
2. **Build settings**:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`

### Option 4: Railway (Full-Stack)

1. **Add Railway config** in `railway.toml`:
   ```toml
   [build]
   builder = "NIXPACKS"
   
   [deploy]
   startCommand = "npm start"
   
   [env]
   NODE_ENV = "production"
   ```

## 🔧 Environment Variables

Create `.env` file in root directory:

```bash
# Database (optional - uses mock data if not provided)
DATABASE_URL="postgresql://username:password@host:port/database"

# Environment
NODE_ENV=production

# Port (optional)
PORT=3001
```

## 📦 Project Structure

```
NewEMSAPP/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── App.tsx         # Main app component
│   ├── dist/              # Built files (after npm run build)
│   └── package.json       # Client dependencies
├── server/                 # Backend Express application (optional)
├── shared/                 # Shared types and schemas
├── simple-server.js       # Simple production server
└── package.json           # Root dependencies
```

## 🏥 Features

- **Protocol Management**: Upload, store, and access EMS protocols
- **Medical Calculators**: 15+ comprehensive calculators (APGAR, BMI, etc.)
- **Medication Reference**: Emergency medications with dosing info
- **Educational Modules**: Structured learning for EMS students
- **Clark County EMS Protocols**: Complete protocol integration
- **Voice Control Ready**: Speech recognition for hands-free operation
- **Mobile-First Design**: Optimized for tablets and mobile devices
- **Role-Based Access**: Basic (students) vs Pro (professionals)

## 🚀 Technologies

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **UI Components**: Radix UI with shadcn/ui
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom medical theme

## 📱 Mobile Support

- Responsive design optimized for mobile/tablet use
- Touch-friendly interface for field operations
- Bottom navigation for easy thumb access
- Progressive Web App capabilities

## 🔐 Security Features

- Input validation with Zod schemas
- CORS configuration
- Environment-based configuration
- Secure file upload handling

## 📄 License

MIT License - Built for the EMS community

## 👨‍⚕️ Creator

**Shaun Williamson**  
EMS Student at Guardian Elite Medical Services  
Las Vegas, Nevada

---

Built with ❤️ for Emergency Medical Services professionals and students