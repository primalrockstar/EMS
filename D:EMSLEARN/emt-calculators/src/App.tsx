import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Chip,
  Divider
} from '@mui/material';
import {
  Psychology,
  Monitor,
  Medication,
  LocalHospital,
  Emergency,
  School,
  Calculate
} from '@mui/icons-material';

// Import calculator components
import GlasgowComaScale from './components/GlasgowComaScale';
import PediatricVitals from './components/PediatricVitals';
import EpinephrineCalculator from './components/EpinephrineCalculator';
import ActivatedCharcoal from './components/ActivatedCharcoal';
import OralGlucose from './components/OralGlucose';
import ASAFlags from './components/ASAFlags';
import RuleOfNines from './components/RuleOfNines';
import FluidResuscitation from './components/FluidResuscitation';
import StartTriage from './components/StartTriage';
import StrokeAssessment from './components/StrokeAssessment';
import WeightConverter from './components/WeightConverter';
import BSACalculator from './components/BSACalculator';
import ApgarScore from './components/ApgarScore';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

interface Calculator {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}

const calculators: Calculator[] = [
  {
    id: 'gcs',
    title: 'Glasgow Coma Scale',
    description: 'Adult and pediatric GCS with auto-scoring',
    category: 'Vital Signs & Assessment',
    icon: <Psychology />,
    component: GlasgowComaScale,
  },
  {
    id: 'pediatric-vitals',
    title: 'Pediatric Vital Ranges',
    description: 'Age-based normal values for HR, RR, BP',
    category: 'Vital Signs & Assessment',
    icon: <Monitor />,
    component: PediatricVitals,
  },
  {
    id: 'epinephrine',
    title: 'Epinephrine IM Dose',
    description: 'Adult vs pediatric weight-based dosing',
    category: 'Dosing & Medications',
    icon: <Medication />,
    component: EpinephrineCalculator,
  },
  {
    id: 'activated-charcoal',
    title: 'Activated Charcoal Dose',
    description: 'mg/kg dosing with manual override',
    category: 'Dosing & Medications',
    icon: <Medication />,
    component: ActivatedCharcoal,
  },
  {
    id: 'oral-glucose',
    title: 'Oral Glucose Threshold',
    description: 'Blood glucose input with action guidance',
    category: 'Dosing & Medications',
    icon: <Medication />,
    component: OralGlucose,
  },
  {
    id: 'asa-flags',
    title: 'ASA Administration Flags',
    description: 'Contraindication identification',
    category: 'Dosing & Medications',
    icon: <Medication />,
    component: ASAFlags,
  },
  {
    id: 'rule-of-nines',
    title: 'Rule of Nines',
    description: 'Burn surface area calculation',
    category: 'Trauma & Burn',
    icon: <LocalHospital />,
    component: RuleOfNines,
  },
  {
    id: 'fluid-resuscitation',
    title: 'Fluid Resuscitation',
    description: 'Parkland formula for burns',
    category: 'Trauma & Burn',
    icon: <LocalHospital />,
    component: FluidResuscitation,
  },
  {
    id: 'start-triage',
    title: 'START Triage',
    description: 'Auto-classification scoring',
    category: 'Triage & Transport',
    icon: <Emergency />,
    component: StartTriage,
  },
  {
    id: 'stroke-assessment',
    title: 'Stroke Assessment',
    description: 'FAST/Cincinnati with transport guide',
    category: 'Triage & Transport',
    icon: <Emergency />,
    component: StrokeAssessment,
  },
  {
    id: 'weight-converter',
    title: 'Weight Converter',
    description: 'lbs ↔ kg conversion',
    category: 'Prep & Education',
    icon: <Calculate />,
    component: WeightConverter,
  },
  {
    id: 'bsa-calculator',
    title: 'Body Surface Area',
    description: 'BSA calculation for dosing',
    category: 'Prep & Education',
    icon: <School />,
    component: BSACalculator,
  },
  {
    id: 'apgar-score',
    title: 'APGAR Score',
    description: 'Newborn assessment scoring',
    category: 'Prep & Education',
    icon: <School />,
    component: ApgarScore,
  },
];

function App() {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);

  const handleCalculatorSelect = (calculatorId: string) => {
    setSelectedCalculator(calculatorId);
  };

  const handleBackToMenu = () => {
    setSelectedCalculator(null);
  };

  const selectedCalc = calculators.find(calc => calc.id === selectedCalculator);

  const categories = Array.from(new Set(calculators.map(calc => calc.category)));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <LocalHospital sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🧮 Essential EMT-B Calculators
          </Typography>
          {selectedCalculator && (
            <Button color="inherit" onClick={handleBackToMenu}>
              Back to Menu
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {!selectedCalculator ? (
          <Box>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
              Essential EMT-B Calculators & Tools
            </Typography>
            
            {categories.map((category) => (
              <Box key={category} sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  {category}
                </Typography>
                <Grid container spacing={3}>
                  {calculators
                    .filter(calc => calc.category === category)
                    .map((calculator) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={calculator.id}>
                        <Card 
                          sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            cursor: 'pointer',
                            '&:hover': {
                              elevation: 4,
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.2s ease-in-out'
                          }}
                          onClick={() => handleCalculatorSelect(calculator.id)}
                        >
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              {calculator.icon}
                              <Typography variant="h6" component="h2" sx={{ ml: 1 }}>
                                {calculator.title}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {calculator.description}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" variant="contained" fullWidth>
                              Open Calculator
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
                <Divider sx={{ mt: 3 }} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              {selectedCalc?.icon}
              <Typography variant="h4">
                {selectedCalc?.title}
              </Typography>
              <Chip label={selectedCalc?.category} color="primary" />
            </Box>
            {selectedCalc && <selectedCalc.component />}
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
