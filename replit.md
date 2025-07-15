# NewEMSAPP - Emergency Medical Services Application

## Overview

NewEMSAPP is a comprehensive cross-platform Emergency Medical Services (EMS) application built with React and Express.js. The application serves both educational and professional purposes with a two-level system: Basic for EMS students and Pro for field professionals. It provides protocol management, medical calculators, medication references, and educational modules.

## User Preferences

Preferred communication style: Simple, everyday language.
Project Designer: Shaun Williamson, EMS student at Guardian Elite Medical Services, Las Vegas, Nevada.
Target Users: EMS students and professionals in Clark County, Nevada.
Focus Areas: Clark County EMS protocols, mobile optimization, accessibility, HIPAA compliance.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **File Handling**: Multer for protocol file uploads
- **API Design**: RESTful API with proper error handling

### Mobile-First Design
- Responsive design optimized for mobile devices
- Bottom navigation for easy thumb access
- Touch-friendly interface elements
- Progressive Web App capabilities

## Key Components

### Core Features
1. **Protocol Management**: Upload, store, and access EMS protocols (PDF, DOCX, JSON)
2. **Medical Calculators**: APGAR score, pediatric dosing, IV drip rates, etc.
3. **Medication Reference**: Comprehensive drug database with dosing and contraindications
4. **Educational Modules**: Structured learning content for EMS students
5. **Voice Control**: Speech recognition for hands-free operation
6. **Interactive Case Scenarios**: Decision-tree based learning scenarios with real-time feedback
7. **Virtual Patient Simulations**: Realistic patient assessment and treatment simulations
8. **Interactive Anatomy Explorer**: 3D anatomy visualization with EMS-specific annotations
9. **Gamified Learning Paths**: Structured learning progression with badges and achievements

### User Interface Components
- **Layout**: Header with user info, main content area, bottom navigation
- **Modals**: Dialog-based calculators and forms
- **Cards**: Grid-based layout for content organization
- **Forms**: Controlled inputs with validation
- **File Upload**: Drag-and-drop protocol uploading

### Database Schema
- **Users**: User profiles with level management (basic/pro)
- **Protocols**: Protocol storage with metadata and file paths including Clark County EMS protocols
- **Medications**: Drug reference database with 38 emergency medications (cleaned up redundant references)
- **Calculator Results**: Saved calculation history
- **Learning Modules**: Educational content structure with EMT reference guides (Basic only)
- **Study Notes**: Complete chapter-based study notes for Emergency Care and Transportation of the Sick and Injured 12th Edition (all 41 chapters)
- **Scenarios**: Interactive case scenarios with decision trees and scoring
- **Simulations**: Virtual patient simulations with vitals and treatment responses
- **Anatomy Systems**: Interactive anatomy explorer with EMS-specific annotations
- **Learning Paths**: Gamified progression system with badges and achievements

## Data Flow

### Client-Server Communication
1. **API Requests**: RESTful endpoints for all operations
2. **File Upload**: Multipart form data for protocol files
3. **Real-time Updates**: Query invalidation for immediate UI updates
4. **Error Handling**: Centralized error management with user feedback

### Database Operations
1. **CRUD Operations**: Full create, read, update, delete functionality
2. **Filtering**: Category, state, and search-based filtering
3. **Relationships**: Proper foreign key constraints between entities
4. **Transactions**: Atomic operations for data integrity

### State Management
1. **Server State**: TanStack Query for caching and synchronization
2. **Local State**: React hooks for component-level state
3. **Form State**: Controlled components with validation
4. **Navigation State**: Wouter for route management

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **Styling**: Tailwind CSS for utility-first styling
- **Validation**: Zod for runtime type checking and validation
- **File Handling**: React Dropzone for file uploads

### Backend Dependencies
- **Database**: Neon Database with WebSocket support
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **File Processing**: Multer for handling file uploads
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build**: Vite with React plugin and error overlay
- **TypeScript**: Strict mode with path mapping
- **Database Migrations**: Drizzle Kit for schema management
- **Code Quality**: ESLint and TypeScript compiler checks

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite development server with HMR
- **Database**: Development database with seed data
- **File Storage**: Local file system for uploads
- **Environment Variables**: Local .env file configuration

### Production Build
- **Frontend**: Vite build with optimization and bundling
- **Backend**: esbuild for server-side bundling
- **Static Assets**: Served through Express static middleware
- **Database**: Production PostgreSQL with connection pooling

### Hosting Considerations
- **Platform**: Designed for Replit deployment
- **Database**: Neon Database for serverless PostgreSQL
- **File Storage**: Local file system (can be extended to cloud storage)
- **Environment**: Node.js runtime with ES modules support

### Security Measures
- **Input Validation**: Zod schemas for all user inputs
- **File Upload**: Restricted file types and size limits
- **Database**: Parameterized queries through Drizzle ORM
- **CORS**: Proper configuration for cross-origin requests

## Recent Updates (January 2025)

### Professional Branding & Color Scheme (January 13, 2025)
- **Application Name**: Updated from "ProMedixEMS3" to "ProMedix EMS" for professional branding
- **Color Scheme**: Implemented comprehensive ProMedix EMS color system with medical emergency services theme
  - Primary: Medical Blue (hsl(196, 85%, 35%)) - Professional, trustworthy
  - Secondary: Emergency Red (hsl(0, 85%, 45%)) - Critical actions and alerts
  - Accent: Caution Yellow (hsl(45, 90%, 50%)) - Warnings and attention items
  - Success: Medical Green (hsl(142, 76%, 36%)) - Positive outcomes and confirmations
- **Typography**: Integrated Google Fonts with Inter (primary) and JetBrains Mono (monospace) for medical data display
- **Dark Mode**: Night shift-ready theme with adjusted color brightness and contrast
- **Component Styling**: Added specialized EMS button styles, badge classes, and medical data formatting
- **Enhanced UI**: Gradient backgrounds, improved shadows, and professional card layouts

## Recent Updates (January 2025)

### UI Enhancement Initiative (January 15, 2025)
- **Comprehensive UI Improvements**: Successfully implemented major visual design enhancements across the application
- **Enhanced Header Design**: Added gradient backgrounds, improved logo presentation with hover effects, and better visual hierarchy
- **Upgraded Bottom Navigation**: Enhanced styling with active states, smooth transitions, backdrop blur, and improved accessibility
- **Dashboard Enhancements**: 
  - Implemented gradient backgrounds and improved visual hierarchy
  - Enhanced stats cards with gradients, shadows, and hover effects
  - Better spacing and typography throughout
  - Added fade-in animations for smoother page transitions
- **Custom Animation System**: Added comprehensive CSS animations including:
  - Float animation for subtle movement effects
  - Pulse-glow for attention-grabbing elements
  - Slide-in animations for smooth transitions
  - Fade-in-up for page loading effects
- **Protocols Page Improvements**: Enhanced typography with gradient text effects and improved button styling
- **Professional Styling**: Maintained ProMedix EMS brand consistency while improving user experience
- **Performance Optimized**: All animations and effects designed for smooth performance across devices

### Latest Updates (January 14, 2025)

#### Enhanced Field Calculator Suite (January 14, 2025)
- **Seven Additional Professional Calculators**: Expanded the Pro Tier calculator suite from 8 to 15 calculators
- **Trauma Assessment**: Added Shock Index Calculator for rapid shock severity assessment using heart rate and systolic BP
- **Cardiovascular Support**: Integrated MAP (Mean Arterial Pressure) Calculator for perfusion evaluation
- **Pediatric Enhancements**: Added Pediatric Weight Estimator with age-based formulas for emergency dosing
- **Respiratory Assessment**: Implemented Minute Ventilation Calculator for respiratory monitoring
- **Neurological Assessment**: Added comprehensive Stroke Scale Calculator with FAST and BE-FAST protocols
- **Metabolic Disorders**: Integrated Anion Gap Calculator for DKA and acid-base disorder assessment
- **Burn Management**: Added Parkland Formula Calculator for fluid resuscitation in burn patients
- **Clinical Integration**: All calculators include reference values, clinical recommendations, and scope-appropriate guidance
- **Offline Capability**: Designed for field use with comprehensive offline functionality

#### Pro Mode Dark Theme Implementation (January 14, 2025)
- **Professional Black Background**: Pro page now features a dedicated black background for field professionals
- **Dark Theme UI Components**: Updated all cards, tabs, inputs, and text elements to work seamlessly with black background
- **Professional Mode Styling**: 
  - Main background: `bg-black` with inline `backgroundColor: '#000000'` for reliable black background
  - Card components: `bg-gray-800` with `border-gray-700` for proper contrast
  - Text elements: White text for headings, gray-300/400 for secondary text
  - Tab navigation: Dark gray styling with proper active states
  - Form inputs: Dark styling with proper placeholder text
- **Navigation Fix**: Fixed basic/pro toggle to properly navigate between dashboard (/) and pro page (/pro)
- **Quick Actions Enhancement**: Updated dashboard Quick Actions buttons with proper functionality:
  - Protocol Search → Opens protocol search modal
  - Field Calculators → Navigates to calculators page
  - Medication Lookup → Navigates to medications page
  - Emergency Protocols → Opens emergency protocols modal
  - Protocol Upload → Opens protocol upload modal
- **Consistent User Experience**: Dashboard retains theme-aware styling while Pro mode has dedicated professional appearance
- **Enhanced Accessibility**: Proper contrast ratios maintained throughout dark theme implementation
- **Feature Inventory**: Created comprehensive feature list documenting all 50+ features and capabilities
- **Logo Enhancement**: Updated to new professional ProMedixEMS logo with h-32 size and "Empowering EMS Excellence" tagline
- **Calculator Completion**: All 15 medical calculators now fully functional with comprehensive features:
  - APGAR Score Calculator with newborn assessment
  - Pediatric Dose Calculator with weight-based dosing
  - IV Drip Rate Calculator with multiple drop factors
  - Glasgow Coma Scale Calculator with neurological assessment
  - Cardiac Output Calculator with hemodynamic parameters
  - Burn Surface Area Calculator with Rule of Nines method
  - Oxygen Tank Duration Calculator with tank specifications
  - BMI Calculator with health risk assessment
  - Shock Index Calculator for trauma assessment
  - MAP Calculator for perfusion evaluation
  - Pediatric Weight Estimator with age-based formulas
  - Minute Ventilation Calculator for respiratory assessment
  - Stroke Scale Calculator with FAST/BE-FAST protocols
  - Anion Gap Calculator for metabolic disorders
  - Parkland Formula Calculator for burn fluid resuscitation
- **Accessibility Improvements**: Fixed dialog accessibility warnings with proper aria-describedby attributes
- **Protocols Page Optimization**: Converted from large wasteful cards to compact table format for better space efficiency and usability
- **Comprehensive Protocol Detail Viewer**: Enhanced protocol viewing with tabbed interface showing:
  - Overview tab with protocol information and critical actions
  - Procedures tab with step-by-step protocols and special considerations
  - Medications tab with associated drugs and dosing guidelines
  - Equipment tab with required equipment and checks
- **Dashboard Optimization**: Removed redundant protocol cards and replaced with actionable Quick Actions section featuring Protocol Search, Medication Checker, Emergency Protocols, and Protocol Upload tools
- **Enhanced Color Scheme**: Updated interface colors to match official ProMedix EMS logo branding:
  - Primary: ProMedix Blue (hsl(221, 83%, 53%)) - Professional medical blue from logo
  - Secondary: ProMedix Red (hsl(0, 84%, 60%)) - Emergency red from medical star
  - Enhanced header tagline with brand colors: "Empowering" in red, "EMS Excellence" in blue
  - Updated medication cards to be clickable with proper navigation to medications page
  - Improved button styles and badge colors to match brand identity
- **Shaun Williamson Enhancement Implementation**: Implementing comprehensive improvement suggestions from Shaun Williamson (Guardian Elite Medical Services):
  - **Quick Access Widget**: Role-based customizable dashboard with pinned protocols and calculators
  - **Protocol Search**: Advanced search with decision-tree navigation and Clark County EMS protocol integration
  - **User Role Management**: Dynamic content based on EMR/EMT/AEMT/Paramedic scope of practice
  - **Enhanced Dashboard**: Improved navigation with one-tap access to critical protocols and calculators
  - **Medication Interaction Checker**: Comprehensive drug interaction verification system with:
    - Clark County approved medications database integration
    - Patient information tracking (age, weight, allergies)
    - Real-time interaction analysis with severity levels (major, moderate, minor)
    - Medication administration logging with timestamps
    - Clinical effects and management recommendations
  - **Real-Time Alert System**: Comprehensive notification system with:
    - Protocol updates and certification reminders
    - Medication recalls and safety alerts
    - Role-based filtering (EMR/EMT/AEMT/Paramedic)
    - Customizable alert preferences
    - Email and push notification delivery options
    - Action-required flagging and alert dismissal
- **Legal Disclaimer System**: Created comprehensive legal disclaimer for medical application compliance with HIPAA considerations, medical disclaimers, and user protection
- **About Page Integration**: Added professional About page with ProMedix EMS mission, features, creator information, and technical specifications

### Enhanced Educational Features
- **Clark County EMS Protocols**: Integrated 25 comprehensive protocols including adult treatment, pediatric care, operations, and procedures
- **Interactive Case Scenarios**: 5 realistic EMS scenarios with decision trees, scoring, and detailed feedback
- **Virtual Patient Simulations**: 5 patient simulations with dynamic vital signs and treatment responses
- **Interactive Anatomy Explorer**: 3 anatomical systems (respiratory, circulatory, musculoskeletal) with EMS-specific annotations
- **Gamified Learning Paths**: 5 structured learning paths with badges, points, and progress tracking
- **Study Notes Module**: Complete study notes system for Emergency Care and Transportation of the Sick and Injured 12th Edition (all 41 chapters integrated)
- **Advanced UI Components**: Enhanced modal dialogs with comprehensive functionality

### Database Integration
- Successfully seeded database with Clark County protocols and medical references
- Added comprehensive medication database with 38 emergency drugs (cleaned up redundant references)
- Integrated educational content with proper categorization and metadata
- Integrated complete Clark County, Nevada EMS protocol set with 15 protocols across Adult Treatment, Pediatric Treatment, and Operations categories
- Enhanced database schema with description and scope fields for better protocol management
- Added study notes table with chapter-based organization, tags, key points, and completion tracking
- Successfully integrated complete Emergency Care and Transportation textbook with all 41 chapters

### Content Quality Improvements (January 14, 2025)
- **Comprehensive Content Review**: Systematically reviewed and updated all 41 study note chapters
- **Enhanced Content Structure**: Implemented proper formatting with headings, bullet points, and visual hierarchy
- **Robust Content Standards**: Expanded all chapters to include comprehensive coverage with:
  - Detailed anatomy and physiology sections
  - Pathophysiology explanations
  - Assessment techniques and findings
  - Treatment interventions and medications
  - Complications and special considerations
  - Quality improvement and prevention strategies
- **Content Metrics**: Achieved average content length of 6,059 characters per chapter with 29 chapters having excellent content (7000+ characters)
- **Structured Learning Elements**: Each chapter now includes 10 comprehensive key points, 10 detailed learning objectives, and relevant tags for easy navigation

This architecture provides a scalable, maintainable foundation for ProMedix EMS that can serve both educational and professional use cases while maintaining performance and user experience across different devices and platforms. The professional branding and color scheme ensures the application meets the visual standards expected by medical emergency services professionals.

## GitHub Migration Notes (January 14, 2025)

### Migration Requirements
- Complete ProMedix EMS application ready for GitHub deployment
- All 103 TypeScript/React components functional
- PostgreSQL database with seeded data (15 protocols, 38 medications, 41 study notes, 30 flashcards, 25 NREMT questions)
- Full-stack architecture with Express.js backend and React frontend
- Professional branding and comprehensive feature set (50+ features)

### Pre-Migration Status
- Application fully operational with comprehensive diagnostic completed
- Database connectivity verified, all API endpoints functional
- Both Basic (student) and Pro (professional) modes working
- PCR Documentation App successfully integrated
- All 15 medical calculators operational
- Interactive learning tools and field tools verified

## Deployment Fixes (January 15, 2025)

### Database Connection Issues Resolved
- **Problem**: Deployment failed due to missing DATABASE_URL during build phase
- **Solution**: Implemented build-safe database connection handling
- **Files Modified**:
  - `server/db.ts`: Added enhanced build-phase detection with comprehensive environment detection
  - `server/storage.ts`: Added safeDatabaseOperation wrapper for all database calls
  - `server/startup.ts`: Created comprehensive startup checks and database verification
  - `server/index.ts`: Integrated startup checks and health endpoint

### Deployment Strategy
- **Created**: `DEPLOYMENT_GUIDE.md` with comprehensive deployment instructions
- **Created**: `scripts/deploy.sh` script for automated deployment process
- **Created**: `ENV_SETUP.md` with detailed environment configuration guide
- **Created**: `scripts/deploy-setup.js` for post-deployment database initialization
- **Created**: `scripts/safe-postinstall.js` for build-safe npm postinstall handling
- **Created**: `scripts/verify-deployment.js` for comprehensive deployment verification
- **Added**: Health check endpoint at `/health` for monitoring
- **Strategy**: Build without database, then initialize database post-build

### Key Improvements
- Graceful handling of missing DATABASE_URL during build phase
- Enhanced build environment detection (production, CI environments, build scripts, deployment platforms)
- Comprehensive startup checks and database verification
- Health monitoring endpoint for deployment verification
- Automated deployment script with proper error handling
- Clear documentation for various deployment platforms
- Build-then-connect deployment strategy to avoid postinstall script issues
- Environment variable setup guides for multiple platforms (Replit, Heroku, Vercel, Railway)

### Applied Deployment Fixes (January 15, 2025)
- **Database Connection**: Enhanced `server/db.ts` to handle missing DATABASE_URL during build phase with improved detection including CI platforms, build scripts, and deployment contexts
- **Safe Operations**: All database operations wrapped in `safeDatabaseOperation` for graceful fallback
- **Deployment Scripts**: Created comprehensive deployment automation with:
  - `scripts/deploy.sh`: Full deployment automation with dependency checks, build process, database setup, and verification
  - `scripts/deploy-setup.js`: Dedicated database initialization script for post-deployment setup
  - `scripts/safe-postinstall.js`: Build-safe postinstall script that won't fail during npm install
  - `scripts/verify-deployment.js`: Comprehensive deployment verification with health checks
- **Documentation**: Comprehensive guides for deployment across multiple platforms
- **Environment Setup**: Detailed `ENV_SETUP.md` with connection string formats and troubleshooting
- **Build Environment Detection**: Added robust detection for build phases, CI environments, and build scripts

### Build-Safe Configuration
- **Postinstall Script**: Automatically skips database operations during build phase
- **Build Detection**: Detects various build environments (CI, deployment platforms, build scripts)
- **Graceful Fallback**: Application builds successfully without DATABASE_URL
- **Post-Deployment**: Manual database setup via `scripts/deploy-setup.js` after deployment
- **Script Permissions**: Made deployment scripts executable with proper permissions

