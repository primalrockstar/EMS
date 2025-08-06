import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Alert,
  Grid,
  Paper,
  Chip,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';

const OralGlucose: React.FC = () => {
  const [glucoseValue, setGlucoseValue] = useState('');
  const [glucoseUnit, setGlucoseUnit] = useState<'mg/dL' | 'mmol/L'>('mg/dL');

  // Convert between units if needed
  const convertToMgDl = (value: number, unit: string) => {
    return unit === 'mmol/L' ? value * 18.0182 : value;
  };

  const convertToMmolL = (value: number) => {
    return value / 18.0182;
  };

  const glucoseNumber = parseFloat(glucoseValue);
  const isValidGlucose = !isNaN(glucoseNumber) && glucoseNumber > 0;
  const glucoseInMgDl = isValidGlucose ? convertToMgDl(glucoseNumber, glucoseUnit) : 0;

  const getGlucoseAssessment = (glucose: number) => {
    if (glucose < 60) {
      return {
        category: 'Severe Hypoglycemia',
        color: 'error',
        severity: 'error' as const,
        action: 'IMMEDIATE INTERVENTION REQUIRED',
        recommendations: [
          'Administer oral glucose if patient is conscious and able to swallow',
          'Consider IV dextrose if oral route not feasible',
          'Monitor airway and breathing closely',
          'Prepare for potential seizures or loss of consciousness',
          'Reassess glucose in 15 minutes',
          'Transport immediately'
        ]
      };
    } else if (glucose < 70) {
      return {
        category: 'Mild-Moderate Hypoglycemia',
        color: 'warning',
        severity: 'warning' as const,
        action: 'ORAL GLUCOSE INDICATED',
        recommendations: [
          'Administer oral glucose gel/paste',
          'Encourage patient to eat complex carbohydrates',
          'Monitor for symptom improvement',
          'Reassess glucose in 15 minutes',
          'Consider transport if symptoms persist'
        ]
      };
    } else if (glucose <= 110) {
      return {
        category: 'Normal Range',
        color: 'success',
        severity: 'success' as const,
        action: 'GLUCOSE NORMAL',
        recommendations: [
          'Blood glucose within normal limits',
          'Continue assessment for other causes of symptoms',
          'Monitor patient status',
          'Document findings'
        ]
      };
    } else if (glucose <= 200) {
      return {
        category: 'Mild Hyperglycemia',
        color: 'info',
        severity: 'info' as const,
        action: 'MONITOR',
        recommendations: [
          'Assess for signs of dehydration',
          'Check for diabetic history',
          'Monitor vital signs',
          'Consider transport if symptomatic'
        ]
      };
    } else {
      return {
        category: 'Severe Hyperglycemia',
        color: 'warning',
        severity: 'warning' as const,
        action: 'TRANSPORT INDICATED',
        recommendations: [
          'Assess for signs of diabetic ketoacidosis',
          'Monitor for altered mental status',
          'Check for dehydration',
          'Obtain complete diabetic history',
          'Transport for medical evaluation',
          'Monitor airway and breathing'
        ]
      };
    }
  };

  const assessment = isValidGlucose ? getGlucoseAssessment(glucoseInMgDl) : null;

  const getOralGlucoseIndications = () => [
    'Blood glucose < 70 mg/dL (3.9 mmol/L)',
    'Patient is conscious and alert',
    'Patient can swallow safely',
    'Intact gag reflex',
    'Signs/symptoms of hypoglycemia present'
  ];

  const getOralGlucoseContraindications = () => [
    'Unconscious or altered mental status',
    'Unable to swallow safely',
    'Absent gag reflex',
    'Vomiting',
    'Seizure activity'
  ];

  const getAdministrationGuidelines = () => [
    'Typical dose: 15-20g oral glucose gel/paste',
    'Place gel under tongue or between cheek and gum',
    'Do not force if patient cannot swallow',
    'Monitor for improvement in 10-15 minutes',
    'May repeat dose if glucose remains < 70 mg/dL',
    'Encourage complex carbohydrates after improvement'
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Blood Glucose Assessment
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Units
                </Typography>
                <ToggleButtonGroup
                  value={glucoseUnit}
                  exclusive
                  onChange={(_, value) => value && setGlucoseUnit(value)}
                  color="primary"
                  size="small"
                >
                  <ToggleButton value="mg/dL">mg/dL</ToggleButton>
                  <ToggleButton value="mmol/L">mmol/L</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <TextField
                fullWidth
                label={`Blood Glucose (${glucoseUnit})`}
                value={glucoseValue}
                onChange={(e) => setGlucoseValue(e.target.value)}
                type="number"
                sx={{ mb: 3 }}
                helperText={
                  isValidGlucose && glucoseUnit === 'mg/dL' ? 
                    `${convertToMmolL(glucoseInMgDl).toFixed(1)} mmol/L` :
                    isValidGlucose && glucoseUnit === 'mmol/L' ?
                    `${glucoseInMgDl.toFixed(0)} mg/dL` :
                    'Enter blood glucose reading'
                }
              />

              {assessment && (
                <Alert severity={assessment.severity} sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {assessment.category}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {assessment.action}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {assessment.recommendations.map((rec, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        • {rec}
                      </Typography>
                    ))}
                  </Box>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Guidelines Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Oral Glucose Guidelines
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Indications
              </Typography>
              <Box sx={{ mb: 2 }}>
                {getOralGlucoseIndications().map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }} color="success.dark">
                    • {item}
                  </Typography>
                ))}
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Contraindications
              </Typography>
              <Box sx={{ mb: 2 }}>
                {getOralGlucoseContraindications().map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }} color="error.dark">
                    • {item}
                  </Typography>
                ))}
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Administration
              </Typography>
              <Box>
                {getAdministrationGuidelines().map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • {item}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Reference Ranges */}
        <Grid size={{ xs: 12 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Blood Glucose Reference Ranges
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                  <Paper 
                    elevation={1} 
                    sx={{ p: 2, bgcolor: 'error.50', border: '1px solid', borderColor: 'error.200' }}
                  >
                    <Chip label="CRITICAL" color="error" size="small" sx={{ mb: 1 }} />
                    <Typography variant="h6" color="error.dark">
                      &lt; 60 mg/dL
                    </Typography>
                    <Typography variant="body2" color="error.dark">
                      &lt; 3.3 mmol/L
                    </Typography>
                    <Typography variant="caption">
                      Severe Hypoglycemia
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                  <Paper 
                    elevation={1} 
                    sx={{ p: 2, bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}
                  >
                    <Chip label="LOW" color="warning" size="small" sx={{ mb: 1 }} />
                    <Typography variant="h6" color="warning.dark">
                      60-69 mg/dL
                    </Typography>
                    <Typography variant="body2" color="warning.dark">
                      3.3-3.8 mmol/L
                    </Typography>
                    <Typography variant="caption">
                      Mild Hypoglycemia
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                  <Paper 
                    elevation={1} 
                    sx={{ p: 2, bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}
                  >
                    <Chip label="NORMAL" color="success" size="small" sx={{ mb: 1 }} />
                    <Typography variant="h6" color="success.dark">
                      70-110 mg/dL
                    </Typography>
                    <Typography variant="body2" color="success.dark">
                      3.9-6.1 mmol/L
                    </Typography>
                    <Typography variant="caption">
                      Normal Range
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                  <Paper 
                    elevation={1} 
                    sx={{ p: 2, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}
                  >
                    <Chip label="ELEVATED" color="info" size="small" sx={{ mb: 1 }} />
                    <Typography variant="h6" color="info.dark">
                      111-200 mg/dL
                    </Typography>
                    <Typography variant="body2" color="info.dark">
                      6.2-11.1 mmol/L
                    </Typography>
                    <Typography variant="caption">
                      Mild Hyperglycemia
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                  <Paper 
                    elevation={1} 
                    sx={{ p: 2, bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}
                  >
                    <Chip label="HIGH" color="warning" size="small" sx={{ mb: 1 }} />
                    <Typography variant="h6" color="warning.dark">
                      &gt; 200 mg/dL
                    </Typography>
                    <Typography variant="body2" color="warning.dark">
                      &gt; 11.1 mmol/L
                    </Typography>
                    <Typography variant="caption">
                      Severe Hyperglycemia
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Important Clinical Notes:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • <strong>Hypoglycemia symptoms:</strong> Sweating, shakiness, confusion, irritability, rapid heartbeat<br/>
                  • <strong>Severe hypoglycemia:</strong> May present as altered mental status, seizures, or unconsciousness<br/>
                  • <strong>Rule of 15:</strong> Treat with 15g carbohydrates, wait 15 minutes, recheck glucose<br/>
                  • <strong>Always reassess:</strong> Glucose levels can change rapidly - monitor frequently
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OralGlucose;