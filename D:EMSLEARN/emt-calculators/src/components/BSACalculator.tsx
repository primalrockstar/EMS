import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const BSACalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [formula, setFormula] = useState('mosteller');

  const convertHeight = (value: number, unit: string) => {
    return unit === 'in' ? value * 2.54 : value; // Convert to cm
  };

  const convertWeight = (value: number, unit: string) => {
    return unit === 'lbs' ? value / 2.205 : value; // Convert to kg
  };

  const heightInCm = height ? convertHeight(parseFloat(height), heightUnit) : 0;
  const weightInKg = weight ? convertWeight(parseFloat(weight), weightUnit) : 0;

  const isValidInputs = heightInCm > 0 && weightInKg > 0;

  const calculateBSA = () => {
    if (!isValidInputs) return null;

    let bsa = 0;
    
    switch (formula) {
      case 'mosteller':
        // Mosteller formula: BSA = √(height × weight / 3600)
        bsa = Math.sqrt((heightInCm * weightInKg) / 3600);
        break;
      case 'dubois':
        // DuBois formula: BSA = 0.007184 × height^0.725 × weight^0.425
        bsa = 0.007184 * Math.pow(heightInCm, 0.725) * Math.pow(weightInKg, 0.425);
        break;
      case 'haycock':
        // Haycock formula: BSA = 0.024265 × height^0.3964 × weight^0.5378
        bsa = 0.024265 * Math.pow(heightInCm, 0.3964) * Math.pow(weightInKg, 0.5378);
        break;
      default:
        bsa = Math.sqrt((heightInCm * weightInKg) / 3600);
    }

    return {
      bsa: bsa,
      formula: formula
    };
  };

  const bsaResult = calculateBSA();

  const getFormulas = () => [
    { value: 'mosteller', label: 'Mosteller (Most Common)', description: '√(height × weight / 3600)' },
    { value: 'dubois', label: 'DuBois & DuBois', description: '0.007184 × height^0.725 × weight^0.425' },
    { value: 'haycock', label: 'Haycock', description: '0.024265 × height^0.3964 × weight^0.5378' }
  ];

  const getBSAApplications = () => [
    'Burn injury assessment (Rule of Nines percentage)',
    'Medication dosing in oncology',
    'Cardiac index calculations',
    'Renal function assessments',
    'Fluid replacement calculations'
  ];

  const getNormalBSAValues = () => [
    { category: 'Adult Male', range: '1.9 - 2.0 m²' },
    { category: 'Adult Female', range: '1.6 - 1.7 m²' },
    { category: 'Child (10 years)', range: '1.1 - 1.3 m²' },
    { category: 'Child (5 years)', range: '0.7 - 0.9 m²' },
    { category: 'Infant (1 year)', range: '0.4 - 0.5 m²' },
    { category: 'Newborn', range: '0.2 - 0.3 m²' }
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                BSA Calculator
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Formula</InputLabel>
                <Select
                  value={formula}
                  label="Formula"
                  onChange={(e) => setFormula(e.target.value)}
                >
                  {getFormulas().map((f) => (
                    <MenuItem key={f.value} value={f.value}>
                      {f.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Height
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    label={`Height (${heightUnit})`}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    type="number"
                    sx={{ flex: 1 }}
                  />
                  <ToggleButtonGroup
                    value={heightUnit}
                    exclusive
                    onChange={(_, value) => value && setHeightUnit(value)}
                    size="small"
                  >
                    <ToggleButton value="cm">cm</ToggleButton>
                    <ToggleButton value="in">in</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Weight
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    label={`Weight (${weightUnit})`}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    sx={{ flex: 1 }}
                  />
                  <ToggleButtonGroup
                    value={weightUnit}
                    exclusive
                    onChange={(_, value) => value && setWeightUnit(value)}
                    size="small"
                  >
                    <ToggleButton value="kg">kg</ToggleButton>
                    <ToggleButton value="lbs">lbs</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>

              {bsaResult && (
                <Alert severity="info">
                  <Typography variant="h6" gutterBottom>
                    Body Surface Area
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {bsaResult.bsa.toFixed(2)} m²
                  </Typography>
                  <Typography variant="body2">
                    Formula: {getFormulas().find(f => f.value === formula)?.label}
                  </Typography>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Information Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                BSA Applications
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Clinical Uses:
              </Typography>
              <Box sx={{ mb: 3 }}>
                {getBSAApplications().map((app, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • {app}
                  </Typography>
                ))}
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Normal BSA Values:
              </Typography>
              <Box>
                {getNormalBSAValues().map((val, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • <strong>{val.category}:</strong> {val.range}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Formula Information */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                BSA Formula Comparison
              </Typography>

              <Grid container spacing={2}>
                {getFormulas().map((f) => (
                  <Grid item xs={12} md={4} key={f.value}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: 2, 
                        bgcolor: f.value === formula ? 'primary.50' : 'grey.50',
                        border: f.value === formula ? '2px solid' : '1px solid',
                        borderColor: f.value === formula ? 'primary.main' : 'grey.300'
                      }}
                    >
                      <Typography variant="subtitle2" gutterBottom>
                        {f.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                        {f.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {f.value === 'mosteller' && 'Most widely used, recommended by NCI'}
                        {f.value === 'dubois' && 'Historical standard, still commonly used'}
                        {f.value === 'haycock' && 'Often used in pediatric calculations'}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Paper elevation={1} sx={{ p: 2, mt: 3, bgcolor: 'warning.50' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Important Notes:
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  • BSA calculations are estimates - individual variation exists
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  • Different formulas may give slightly different results
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  • Mosteller formula is most commonly used in clinical practice
                </Typography>
                <Typography variant="body2">
                  • For EMT-B: BSA primarily used with burn assessments (Rule of Nines)
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BSACalculator;