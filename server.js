import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock data for now (will be replaced with real database later)
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

// API Routes
app.get('/api/protocols', (req, res) => {
  try {
    const { category, state, userId } = req.query;
    let filteredProtocols = [...mockProtocols];
    
    if (category) {
      filteredProtocols = filteredProtocols.filter(p => p.category === category);
    }
    if (state) {
      filteredProtocols = filteredProtocols.filter(p => p.state === state);
    }
    
    res.json({
      success: true,
      data: filteredProtocols,
      total: filteredProtocols.length
    });
  } catch (error) {
    console.error('Error fetching protocols:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch protocols' });
  }
});

app.get('/api/protocols/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const protocol = mockProtocols.find(p => p.id === id);
    
    if (!protocol) {
      return res.status(404).json({ success: false, message: 'Protocol not found' });
    }
    
    res.json({ success: true, data: protocol });
  } catch (error) {
    console.error('Error fetching protocol:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch protocol' });
  }
});

app.get('/api/medications', (req, res) => {
  try {
    const { category, search } = req.query;
    let filteredMedications = [...mockMedications];
    
    if (category) {
      filteredMedications = filteredMedications.filter(m => m.category === category);
    }
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredMedications = filteredMedications.filter(m => 
        m.name.toLowerCase().includes(searchTerm) ||
        m.indication.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json({
      success: true,
      data: filteredMedications,
      total: filteredMedications.length
    });
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch medications' });
  }
});

app.get('/api/medications/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const medication = mockMedications.find(m => m.id === id);
    
    if (!medication) {
      return res.status(404).json({ success: false, message: 'Medication not found' });
    }
    
    res.json({ success: true, data: medication });
  } catch (error) {
    console.error('Error fetching medication:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch medication' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'EMS Training Platform API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Calculator endpoints
app.post('/api/calculators/apgar', (req, res) => {
  try {
    const { appearance, pulse, grimace, activity, respiration } = req.body;
    const total = appearance + pulse + grimace + activity + respiration;
    
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
  } catch (error) {
    console.error('Error calculating APGAR:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate APGAR score' });
  }
});

app.post('/api/calculators/bmi', (req, res) => {
  try {
    const { weight, height, unit } = req.body;
    let weightKg = weight;
    let heightM = height;
    
    if (unit === 'imperial') {
      weightKg = weight * 0.453592; // lbs to kg
      heightM = height * 0.0254; // inches to meters
    } else {
      heightM = height / 100; // cm to meters
    }
    
    const bmi = weightKg / (heightM * heightM);
    
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
  } catch (error) {
    console.error('Error calculating BMI:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate BMI' });
  }
});

// Serve static files from the React app build directory
const clientBuildPath = path.join(__dirname, 'client/dist');
app.use(express.static(clientBuildPath));

// The "catchall" handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// Start the server
app.listen(PORT, () => {
  console.log('🚀 EMS Training Platform Server Started!');
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api`);
  console.log(`💊 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🏥 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  if (process.env.DATABASE_URL) {
    console.log('🗄️  Database: Connected');
  } else {
    console.log('⚠️  Database: Using mock data (set DATABASE_URL for real database)');
  }
});

export default app;