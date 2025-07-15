# NewEMSAPP - Emergency Medical Services Platform

A comprehensive Emergency Medical Services (EMS) educational and professional platform built with React, TypeScript, and Node.js. Designed for both EMS students and field professionals with Clark County, Nevada EMS protocol integration.

## 🚀 Features

- **Protocol Management**: Upload, store, and access EMS protocols (PDF, DOCX, JSON)
- **Medical Calculators**: 15 comprehensive calculators (APGAR, pediatric dosing, IV drip rates, etc.)
- **Medication Reference**: 38 emergency medications with dosing and contraindications
- **Educational Modules**: Structured learning content for EMS students
- **Clark County EMS Protocols**: Complete protocol integration
- **Voice Control**: Speech recognition for hands-free operation
- **Mobile-First Design**: Optimized for mobile devices and field use
- **Role-Based Access**: Different content for Basic (students) and Pro (professionals)

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Radix UI** components with shadcn/ui
- **Wouter** for routing
- **TanStack Query** for state management

### Backend
- **Node.js** with Express.js
- **TypeScript** with ESM modules
- **PostgreSQL** with Drizzle ORM
- **Neon Database** (serverless PostgreSQL)
- **Multer** for file uploads

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd promedix-ems
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your database connection details and other required environment variables.

4. Set up the database:
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Prepare the build**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy using the included `vercel.json` configuration

3. **Environment Variables**:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NODE_ENV`: Set to "production"
   - Any other custom environment variables

### Manual Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
promedix-ems/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── data/           # Static data
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── db.ts              # Database connection
│   └── storage.ts         # Database operations
├── shared/                 # Shared types and schemas
└── uploads/               # File uploads directory
```

## 🔧 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run db:push`: Push database schema
- `npm run db:seed`: Seed database with sample data
- `npm run type-check`: Run TypeScript type checking
- `npm run lint`: Run ESLint

## 📱 Mobile Support

The application is built mobile-first with:
- Responsive design optimized for mobile devices
- Bottom navigation for easy thumb access
- Touch-friendly interface elements
- Progressive Web App capabilities

## 🏥 EMS Features

### For Students (Basic Tier)
- Educational modules and study notes
- Basic medical calculators
- Protocol reference
- Learning progress tracking

### For Professionals (Pro Tier)
- Advanced medical calculators
- Field protocol access
- Voice control for hands-free operation
- Real-time alerts and updates

## 📊 Database Schema

The application uses PostgreSQL with the following main tables:
- `users`: User profiles and authentication
- `protocols`: EMS protocols with metadata
- `medications`: Drug reference database
- `learning_modules`: Educational content
- `study_notes`: Chapter-based study materials
- `flashcards`: Learning flashcards
- `nremt_questions`: Practice exam questions

## 🔐 Security

- Input validation with Zod schemas
- Parameterized database queries
- File upload restrictions
- CORS configuration
- Environment-based configuration

## 📄 License

This project is licensed under the MIT License.

## 👨‍⚕️ Creator

**Shaun Williamson**  
EMS Student at Guardian Elite Medical Services  
Las Vegas, Nevada

---

Built with ❤️ for the EMS community