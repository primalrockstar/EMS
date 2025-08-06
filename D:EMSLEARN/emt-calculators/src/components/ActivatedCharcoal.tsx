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
  Divider,
  Paper,
  FormControlLabel,
  Switch,
  Chip
} from '@mui/material';

const ActivatedCharcoal: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [manualOverride, setManualOverride] = useState(false);
  const [manualDose, setManualDose] = useState('');

  const weightInKg = weightUnit === 'kg' ? parseFloat(weight) : parseFloat(weight) / 2.205;
  const isValidWeight = !isNaN(weightInKg) && weightInKg > 0;

  // Standard dose: 1 g/kg (maximum 50-100g)
  const calculateDose = () => {
    if (!isValidWeight) return null;

    const calculatedDose = weightInKg * 1; // 1 g/kg
    const maxDose = 50; // Typical maximum for adults
    const recommendedDose = Math.min(calculatedDose, maxDose);

    return {
      calculated: calculatedDose,
      recommended: recommendedDose,
      max: maxDose,
      calculation: `${weightInKg.toFixed(1)} kg × 1 g/kg = ${calculatedDose.toFixed(1)} g`
    };
  };

  const dose = calculateDose();
  const finalDose = manualOverride ? parseFloat(manualDose) : dose?.recommended;

  const getIndications = () => [
    'Acute oral poisoning/overdose',
    'Within 1-2 hours of ingestion (optimal)',
    'Alert patient with intact gag reflex',
    'Ingested toxin that binds to activated charcoal'
  ];

  const getContraindications = () => [
    'Altered mental status/unconscious patient',
    'Absent gag reflex',
    'Caustic ingestion (acids, alkalis)',
    'Hydrocarbon ingestion (petroleum products)',
    'Iron, lithium, alcohol poisoning',
    'Gastrointestinal obstruction or perforation'
  ];

  const getNonBindingSubstances = () => [
    'Alcohols (ethanol, methanol, isopropanol)',
    'Caustics (acids, alkalis)',
    'Cyanide',
    'Iron',
    'Lithium',
    'Hydrocarbons',
    'Heavy metals (lead, mercury)',
    'Potassium'
  ];

  const getAdministrationNotes = () => [
    'Mix with water to create slurry consistency',
    'Typical ratio: 1 part charcoal to 4-8 parts water',
    'Administer via large-bore NG tube if patient cannot drink',
    'May repeat dose if patient vomits within 1 hour',
    'Monitor for aspiration risk',
    'Document time of ingestion and charcoal administration'
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dosing Calculator
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

              <FormControlLabel
                control={
                  <Switch
                    checked={manualOverride}
                    onChange={(e) => setManualOverride(e.target.checked)}
                  />
                }
                label="Manual Dose Override"
                sx={{ mb: 2 }}
              />

              {manualOverride && (
                <TextField
                  fullWidth
                  label="Manual Dose (grams)"
                  value={manualDose}
                  onChange={(e) => setManualDose(e.target.value)}
                  type="number"
                  sx={{ mb: 3 }}
                  helperText="Enter custom dose in grams"
                />
              )}

              {dose && (
                <Box sx={{ mt: 3 }}>
                  <Alert severity="info">
                    <Typography variant="h6" gutterBottom>
                      Calculated Dose
                    </Typography>
                    {!manualOverride ? (
                      <>
                        <Typography>
                          <strong>{dose.recommended} grams</strong>
                        </Typography>
                        <Typography variant="body2">
                          Calculation: {dose.calculation}
                        </Typography>
                        {dose.calculated > dose.max && (
                          <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
                            ⚠ Calculated dose ({dose.calculated.toFixed(1)}g) exceeds typical maximum ({dose.max}g)
                          </Typography>
                        )}
                      </>
                    ) : (
                      <Typography>
                        <strong>{finalDose} grams</strong> (Manual Override)
                      </Typography>
                    )}
                  </Alert>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Guidelines Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Clinical Guidelines
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Indications
              </Typography>
              <Box sx={{ mb: 2 }}>
                {getIndications().map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • {item}
                  </Typography>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Contraindications
              </Typography>
              <Box sx={{ mb: 2 }}>
                {getContraindications().map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }} color="error.dark">
                    • {item}
                  </Typography>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Administration Notes
              </Typography>
              <Box>
                {getAdministrationNotes().map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • {item}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Reference Information */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Substances NOT Bound by Activated Charcoal
              </Typography>
              
              <Paper elevation={1} sx={{ p: 2, bgcolor: 'warning.50' }}>
                <Typography variant="subtitle2" gutterBottom color="warning.dark">
                  ⚠ Activated charcoal is NOT effective for these substances:
                </Typography>
                <Grid container spacing={1}>
                  {getNonBindingSubstances().map((substance, index) => (
                    <Grid item key={index}>
                      <Chip 
                        label={substance} 
                        size="small" 
                        color="warning"
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Key Clinical Points:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • <strong>Timing is critical:</strong> Most effective within 1 hour of ingestion<br/>
                  • <strong>Standard dose:</strong> 1 g/kg (maximum 50g for adults)<br/>
                  • <strong>Multiple doses:</strong> May be indicated for sustained-release preparations<br/>
                  • <strong>Aspiration risk:</strong> Primary concern - ensure adequate airway protection<br/>
                  • <strong>Effectiveness decreases:</strong> Rapidly with time since ingestion
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActivatedCharcoal;