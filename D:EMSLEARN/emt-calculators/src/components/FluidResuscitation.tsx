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
  Divider
} from '@mui/material';

const FluidResuscitation: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [bsaBurned, setBsaBurned] = useState('');

  const weightInKg = weightUnit === 'kg' ? parseFloat(weight) : parseFloat(weight) / 2.205;
  const isValidWeight = !isNaN(weightInKg) && weightInKg > 0;
  const isValidBSA = !isNaN(parseFloat(bsaBurned)) && parseFloat(bsaBurned) > 0;

  // Parkland Formula: 4 mL × weight (kg) × % BSA burned
  const calculateFluidRequirement = () => {
    if (!isValidWeight || !isValidBSA) return null;

    const totalFluid = 4 * weightInKg * parseFloat(bsaBurned); // mL in 24 hours
    const firstEightHours = totalFluid / 2; // Half in first 8 hours
    const nextSixteenHours = totalFluid / 2; // Half in next 16 hours
    
    return {
      total24h: totalFluid,
      first8h: firstEightHours,
      next16h: nextSixteenHours,
      hourlyFirst8h: firstEightHours / 8,
      hourlyNext16h: nextSixteenHours / 16
    };
  };

  const fluidCalc = calculateFluidRequirement();

  const getEducationalNotes = () => [
    'This is for educational purposes only - NOT for field use',
    'EMT-B scope does not include IV fluid administration',
    'Actual fluid resuscitation requires hospital-level care',
    'Multiple factors affect fluid requirements in practice',
    'Parkland formula is a starting point, not absolute requirement'
  ];

  const getClinicalConsiderations = () => [
    'Formula applies only to burns >20% BSA',
    'Start timing from time of burn injury, not arrival',
    'Monitor urine output as primary endpoint (0.5-1 mL/kg/hr)',
    'Adjust rates based on patient response',
    'Consider additional fluids for inhalation injury',
    'Electrolyte composition matters (Lactated Ringer\'s preferred)'
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Educational Tool Only
        </Typography>
        <Typography>
          This calculator is for educational purposes. EMT-B personnel do not perform fluid resuscitation in the field. 
          Focus on burn assessment, pain management, and rapid transport to appropriate burn center.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Patient Information
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Weight Unit
                </Typography>
                <ToggleButtonGroup
                  value={weightUnit}
                  exclusive
                  onChange={(_, value) => value && setWeightUnit(value)}
                  color="primary"
                  size="small"
                >
                  <ToggleButton value="kg">kg</ToggleButton>
                  <ToggleButton value="lbs">lbs</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <TextField
                fullWidth
                label={`Weight (${weightUnit})`}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                sx={{ mb: 3 }}
                helperText={
                  isValidWeight ? 
                    `Weight: ${weightInKg.toFixed(1)} kg (${(weightInKg * 2.205).toFixed(1)} lbs)` : 
                    'Enter patient weight'
                }
              />

              <TextField
                fullWidth
                label="BSA Burned (%)"
                value={bsaBurned}
                onChange={(e) => setBsaBurned(e.target.value)}
                type="number"
                helperText="Percentage of body surface area burned"
                inputProps={{ min: 0, max: 100 }}
              />

              {fluidCalc && (
                <Box sx={{ mt: 3 }}>
                  <Alert severity="info">
                    <Typography variant="h6" gutterBottom>
                      Parkland Formula Results
                    </Typography>
                    <Typography>
                      Calculation: 4 mL × {weightInKg.toFixed(1)} kg × {bsaBurned}% = {fluidCalc.total24h.toFixed(0)} mL
                    </Typography>
                  </Alert>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calculated Fluid Requirements
              </Typography>

              {fluidCalc ? (
                <Box>
                  <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'primary.50' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Total 24-Hour Requirement
                    </Typography>
                    <Typography variant="h5" color="primary">
                      {fluidCalc.total24h.toFixed(0)} mL
                    </Typography>
                    <Typography variant="body2">
                      ({(fluidCalc.total24h / 1000).toFixed(1)} Liters)
                    </Typography>
                  </Paper>

                  <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'warning.50' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      First 8 Hours (50% of total)
                    </Typography>
                    <Typography variant="h6" color="warning.dark">
                      {fluidCalc.first8h.toFixed(0)} mL
                    </Typography>
                    <Typography variant="body2">
                      Rate: {fluidCalc.hourlyFirst8h.toFixed(0)} mL/hour
                    </Typography>
                  </Paper>

                  <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'info.50' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Next 16 Hours (50% of total)
                    </Typography>
                    <Typography variant="h6" color="info.dark">
                      {fluidCalc.next16h.toFixed(0)} mL
                    </Typography>
                    <Typography variant="body2">
                      Rate: {fluidCalc.hourlyNext16h.toFixed(0)} mL/hour
                    </Typography>
                  </Paper>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Enter weight and BSA burned to calculate fluid requirements
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Educational Notes */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Educational Information
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Important Notes for EMT-B Students:
              </Typography>
              <Box sx={{ mb: 3 }}>
                {getEducationalNotes().map((note, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }} color="warning.dark">
                    • {note}
                  </Typography>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Clinical Considerations (Advanced Practice):
              </Typography>
              <Box>
                {getClinicalConsiderations().map((consideration, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • {consideration}
                  </Typography>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" gutterBottom>
                  EMT-B Burn Management Priorities:
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  1. <strong>Scene safety</strong> - ensure fire is out, no electrical hazards
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  2. <strong>Airway assessment</strong> - watch for inhalation injury signs
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  3. <strong>Stop the burning</strong> - remove from heat source, cool burns
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  4. <strong>Pain management</strong> - cover burns, provide comfort
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  5. <strong>Prevent hypothermia</strong> - avoid over-cooling
                </Typography>
                <Typography variant="body2">
                  6. <strong>Rapid transport</strong> - to appropriate burn center
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FluidResuscitation;