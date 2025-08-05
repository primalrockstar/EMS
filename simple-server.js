import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS headers manually
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Mock data
const mockProtocols = [
  {
    id: 1,
    name: "Cardiac Arrest Protocol",
    category: "cardiac",
    state: "nevada",
    description: "Adult cardiac arrest management protocol for Clark County EMS",
    ageGroup: "adult",
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2,
    name: "Pediatric Respiratory Distress",
    category: "respiratory",
    state: "nevada",
    description: "Management of pediatric respiratory emergencies",
    ageGroup: "pediatric",
    lastUpdated: new Date().toISOString()
  }
];

const mockMedications = [
  {
    id: 1,
    name: "Epinephrine",
    category: "cardiac",
    indication: "Cardiac arrest, anaphylaxis, severe asthma",
    dosage: "1mg IV/IO q3-5min for cardiac arrest",
    contraindications: "None in life-threatening emergencies",
    sideEffects: "Hypertension, tachycardia, anxiety"
  },
  {
    id: 2,
    name: "Atropine",
    category: "cardiac",
    indication: "Symptomatic bradycardia",
    dosage: "0.5mg IV/IO q3-5min (max 3mg)",
    contraindications: "Second or third-degree AV block",
    sideEffects: "Tachycardia, confusion, dry mouth"
  }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'EMS Training Platform API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Protocols API
app.get('/api/protocols', (req, res) => {
  res.json({
    success: true,
    data: mockProtocols,
    total: mockProtocols.length
  });
});

app.get('/api/protocols/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const protocol = mockProtocols.find(p => p.id === id);
  
  if (!protocol) {
    return res.status(404).json({ success: false, message: 'Protocol not found' });
  }
  
  res.json({ success: true, data: protocol });
});

// Medications API
app.get('/api/medications', (req, res) => {
  res.json({
    success: true,
    data: mockMedications,
    total: mockMedications.length
  });
});

app.get('/api/medications/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const medication = mockMedications.find(m => m.id === id);
  
  if (!medication) {
    return res.status(404).json({ success: false, message: 'Medication not found' });
  }
  
  res.json({ success: true, data: medication });
});

// Calculator endpoints
app.post('/api/calculators/apgar', (req, res) => {
  const { appearance, pulse, grimace, activity, respiration } = req.body;
  const total = (appearance || 0) + (pulse || 0) + (grimace || 0) + (activity || 0) + (respiration || 0);
  
  let interpretation = '';
  if (total >= 7) {
    interpretation = 'Normal - No immediate intervention needed';
  } else if (total >= 4) {
    interpretation = 'Moderate distress - May need some assistance';
  } else {
    interpretation = 'Severe distress - Immediate intervention required';
  }
  
  res.json({
    success: true,
    data: {
      total,
      interpretation,
      breakdown: { appearance, pulse, grimace, activity, respiration }
    }
  });
});

app.post('/api/calculators/bmi', (req, res) => {
  const { weight, height, unit } = req.body;
  let weightKg = parseFloat(weight) || 0;
  let heightM = parseFloat(height) || 0;
  
  if (unit === 'imperial') {
    weightKg = weight * 0.453592; // lbs to kg
    heightM = height * 0.0254; // inches to meters
  } else {
    heightM = height / 100; // cm to meters
  }
  
  const bmi = heightM > 0 ? weightKg / (heightM * heightM) : 0;
  
  let category = '';
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25) {
    category = 'Normal weight';
  } else if (bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }
  
  res.json({
    success: true,
    data: {
      bmi: Math.round(bmi * 10) / 10,
      category,
      weightKg: Math.round(weightKg * 10) / 10,
      heightM: Math.round(heightM * 100) / 100
    }
  });
});

// Serve static files from the React app build directory
const clientBuildPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientBuildPath));

// The catchall handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log('🚀 EMS Training Platform Server Started!');
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api`);
  console.log(`💊 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🏥 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('⚠️  Database: Using mock data (set DATABASE_URL for real database)');
  console.log('');
  console.log('✅ Application is ready to use!');
});