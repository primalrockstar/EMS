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
  Chip,
  Grid,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const EpinephrineCalculator: React.FC = () => {
  const [patientType, setPatientType] = useState<'adult' | 'pediatric'>('adult');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');

  const weightInKg = weightUnit === 'kg' ? parseFloat(weight) : parseFloat(weight) / 2.205;
  const isValidWeight = !isNaN(weightInKg) && weightInKg > 0;

  const calculateDose = () => {
    if (!isValidWeight) return null;

    if (patientType === 'adult') {
      // Adult: 0.3-0.5 mg IM (standard 0.3 mg for anaphylaxis)
      return {
        standardDose: 0.3,
        maxDose: 0.5,
        concentration: '1:1000 (1 mg/mL)',
        volume: 0.3,
        maxVolume: 0.5,
        route: 'IM (anterolateral thigh preferred)'
      };
    } else {
      // Pediatric: 0.01 mg/kg IM (max 0.3 mg)
      const calculatedDose = Math.round((weightInKg * 0.01) * 1000) / 1000;
      const actualDose = Math.min(calculatedDose, 0.3);
      
      return {
        standardDose: actualDose,
        maxDose: 0.3,
        concentration: '1:1000 (1 mg/mL)',
        volume: actualDose,
        maxVolume: 0.3,
        route: 'IM (anterolateral thigh preferred)',
        calculation: `${weightInKg.toFixed(1)} kg × 0.01 mg/kg = ${calculatedDose.toFixed(3)} mg`
      };
    }
  };

  const dose = calculateDose();

  const getAutoInjectorRecommendation = () => {
    if (!isValidWeight) return null;

    if (patientType === 'adult' || weightInKg >= 30) {
      return {
        type: 'EpiPen® Adult',
        dose: '0.3 mg',
        indication: 'Weight ≥ 30 kg (66 lbs)'
      };
    } else if (weightInKg >= 15) {
      return {
        type: 'EpiPen Jr.®',
        dose: '0.15 mg',
        indication: 'Weight 15-30 kg (33-66 lbs)'
      };
    } else {
      return {
        type: 'Manual Calculation Required',
        dose: dose?.standardDose.toFixed(3) + ' mg',
        indication: 'Weight < 15 kg - use manual dosing'
      };
    }
  };

  const autoInjector = getAutoInjectorRecommendation();

  const contraindications = [
    'No absolute contraindications in anaphylaxis',
    'Relative: Severe hypertension, coronary artery disease',
    'Use with caution in elderly patients'
  ];

  const clinicalConsiderations = [
    'May repeat dose every 5-15 minutes if needed',
    'Monitor for cardiac arrhythmias after administration',
    'Massage injection site after administration',
    'Be prepared for potential second dose requirement',
    'Document time of administration and patient response'
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Patient Information
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Patient Type
                </Typography>
                <ToggleButtonGroup
                  value={patientType}
                  exclusive
                  onChange={(_, value) => value && setPatientType(value)}
                  color="primary"
                  fullWidth
                >
                  <ToggleButton value="adult">Adult</ToggleButton>
                  <ToggleButton value="pediatric">Pediatric</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Weight Unit
                </Typography>
                <ToggleButtonGroup
                  value={weightUnit}
                  exclusive
                  onChange={(_, value) => value && setWeightUnit(value)}
                  color="secondary"
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
                helperText={
                  isValidWeight ? 
                    `Weight: ${weightInKg.toFixed(1)} kg (${(weightInKg * 2.205).toFixed(1)} lbs)` : 
                    'Enter patient weight'
                }
              />

              {dose && (
                <Box sx={{ mt: 3 }}>
                  <Alert severity="info">
                    <Typography variant="h6" gutterBottom>
                      Calculated Dose
                    </Typography>
                    <Typography>
                      <strong>{dose.standardDose} mg</strong> IM
                    </Typography>
                    <Typography variant="body2">
                      Volume: {dose.volume} mL ({dose.concentration})
                    </Typography>
                    {dose.calculation && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Calculation: {dose.calculation}
                      </Typography>
                    )}
                  </Alert>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Results Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Administration Guidelines
              </Typography>

              {autoInjector && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Auto-Injector Recommendation
                  </Typography>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: 'primary.50' }}>
                    <Typography variant="h6" color="primary">
                      {autoInjector.type}
                    </Typography>
                    <Typography>
                      Dose: {autoInjector.dose}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {autoInjector.indication}
                    </Typography>
                  </Paper>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Contraindications
              </Typography>
              <Box sx={{ mb: 2 }}>
                {contraindications.map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • {item}
                  </Typography>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Clinical Considerations
              </Typography>
              <Box>
                {clinicalConsiderations.map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • {item}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Reference Table */}
        <Grid size={{ xs: 12 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Epinephrine Dosing Reference
              </Typography>

              <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Patient Type</strong></TableCell>
                      <TableCell><strong>Weight Range</strong></TableCell>
                      <TableCell><strong>Dose</strong></TableCell>
                      <TableCell><strong>Auto-Injector</strong></TableCell>
                      <TableCell><strong>Notes</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Adult</TableCell>
                      <TableCell>≥ 30 kg (66 lbs)</TableCell>
                      <TableCell>0.3-0.5 mg IM</TableCell>
                      <TableCell>EpiPen® Adult (0.3 mg)</TableCell>
                      <TableCell>Standard adult dose</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pediatric</TableCell>
                      <TableCell>15-30 kg (33-66 lbs)</TableCell>
                      <TableCell>0.01 mg/kg IM (max 0.3 mg)</TableCell>
                      <TableCell>EpiPen Jr.® (0.15 mg)</TableCell>
                      <TableCell>Typical school-age children</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pediatric</TableCell>
                      <TableCell>&lt; 15 kg (33 lbs)</TableCell>
                      <TableCell>0.01 mg/kg IM</TableCell>
                      <TableCell>Manual calculation</TableCell>
                      <TableCell>Infants and toddlers</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  * All doses are for 1:1000 concentration (1 mg/mL)<br/>
                  * IM injection preferred route (anterolateral thigh)<br/>
                  * May repeat every 5-15 minutes as needed
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EpinephrineCalculator;