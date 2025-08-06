import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Chip,
  Grid,
  Divider
} from '@mui/material';

interface VitalRanges {
  heartRate: { min: number; max: number };
  respiratoryRate: { min: number; max: number };
  systolicBP: { min: number; max: number };
  weight: { min: number; max: number }; // kg
}

const ageGroups = {
  'Newborn (0-1 month)': {
    heartRate: { min: 120, max: 160 },
    respiratoryRate: { min: 30, max: 60 },
    systolicBP: { min: 60, max: 90 },
    weight: { min: 2.5, max: 4.5 }
  },
  'Infant (1-12 months)': {
    heartRate: { min: 100, max: 160 },
    respiratoryRate: { min: 24, max: 40 },
    systolicBP: { min: 70, max: 100 },
    weight: { min: 4, max: 10 }
  },
  'Toddler (1-3 years)': {
    heartRate: { min: 90, max: 150 },
    respiratoryRate: { min: 20, max: 30 },
    systolicBP: { min: 80, max: 110 },
    weight: { min: 10, max: 15 }
  },
  'Preschool (3-6 years)': {
    heartRate: { min: 80, max: 140 },
    respiratoryRate: { min: 20, max: 25 },
    systolicBP: { min: 90, max: 110 },
    weight: { min: 15, max: 25 }
  },
  'School Age (6-12 years)': {
    heartRate: { min: 70, max: 120 },
    respiratoryRate: { min: 16, max: 20 },
    systolicBP: { min: 95, max: 120 },
    weight: { min: 20, max: 40 }
  },
  'Adolescent (12-18 years)': {
    heartRate: { min: 60, max: 100 },
    respiratoryRate: { min: 12, max: 20 },
    systolicBP: { min: 100, max: 130 },
    weight: { min: 40, max: 70 }
  }
} as const;

type AgeGroup = keyof typeof ageGroups;

const PediatricVitals: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('Infant (1-12 months)');
  const [vitals, setVitals] = useState({
    heartRate: '',
    respiratoryRate: '',
    systolicBP: '',
    weight: ''
  });

  const ranges = ageGroups[selectedAge];

  const getVitalStatus = (value: string, range: { min: number; max: number }) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return { status: 'normal', color: 'default' };
    
    if (numValue < range.min) return { status: 'low', color: 'error' };
    if (numValue > range.max) return { status: 'high', color: 'warning' };
    return { status: 'normal', color: 'success' };
  };

  const hrStatus = getVitalStatus(vitals.heartRate, ranges.heartRate);
  const rrStatus = getVitalStatus(vitals.respiratoryRate, ranges.respiratoryRate);
  const bpStatus = getVitalStatus(vitals.systolicBP, ranges.systolicBP);
  const weightStatus = getVitalStatus(vitals.weight, ranges.weight);

  const hasAbnormalVitals = [hrStatus, rrStatus, bpStatus, weightStatus].some(
    status => status.status !== 'normal' && status.status !== 'default'
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Patient Assessment
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Age Group</InputLabel>
                <Select
                  value={selectedAge}
                  label="Age Group"
                  onChange={(e) => setSelectedAge(e.target.value as AgeGroup)}
                >
                  {Object.keys(ageGroups).map((age) => (
                    <MenuItem key={age} value={age}>
                      {age}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Heart Rate (bpm)"
                value={vitals.heartRate}
                onChange={(e) => setVitals(prev => ({ ...prev, heartRate: e.target.value }))}
                type="number"
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: hrStatus.status !== 'normal' && (
                    <Chip
                      label={hrStatus.status.toUpperCase()}
                      color={hrStatus.color as any}
                      size="small"
                    />
                  )
                }}
              />

              <TextField
                fullWidth
                label="Respiratory Rate (breaths/min)"
                value={vitals.respiratoryRate}
                onChange={(e) => setVitals(prev => ({ ...prev, respiratoryRate: e.target.value }))}
                type="number"
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: rrStatus.status !== 'normal' && (
                    <Chip
                      label={rrStatus.status.toUpperCase()}
                      color={rrStatus.color as any}
                      size="small"
                    />
                  )
                }}
              />

              <TextField
                fullWidth
                label="Systolic Blood Pressure (mmHg)"
                value={vitals.systolicBP}
                onChange={(e) => setVitals(prev => ({ ...prev, systolicBP: e.target.value }))}
                type="number"
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: bpStatus.status !== 'normal' && (
                    <Chip
                      label={bpStatus.status.toUpperCase()}
                      color={bpStatus.color as any}
                      size="small"
                    />
                  )
                }}
              />

              <TextField
                fullWidth
                label="Weight (kg)"
                value={vitals.weight}
                onChange={(e) => setVitals(prev => ({ ...prev, weight: e.target.value }))}
                type="number"
                InputProps={{
                  endAdornment: weightStatus.status !== 'normal' && (
                    <Chip
                      label={weightStatus.status.toUpperCase()}
                      color={weightStatus.color as any}
                      size="small"
                    />
                  )
                }}
              />

              {hasAbnormalVitals && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Abnormal Vitals Detected
                  </Typography>
                  <Typography variant="body2">
                    Consider reassessment and appropriate interventions based on clinical presentation.
                  </Typography>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Reference Ranges */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Normal Ranges for {selectedAge}
              </Typography>

              <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Vital Sign</strong></TableCell>
                      <TableCell><strong>Normal Range</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Heart Rate</TableCell>
                      <TableCell>{ranges.heartRate.min} - {ranges.heartRate.max} bpm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Respiratory Rate</TableCell>
                      <TableCell>{ranges.respiratoryRate.min} - {ranges.respiratoryRate.max} breaths/min</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Systolic BP</TableCell>
                      <TableCell>{ranges.systolicBP.min} - {ranges.systolicBP.max} mmHg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Weight</TableCell>
                      <TableCell>{ranges.weight.min} - {ranges.weight.max} kg</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Clinical Considerations:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                • <strong>Bradycardia:</strong> Often late sign in pediatric patients<br/>
                • <strong>Tachycardia:</strong> Early sign of shock or distress<br/>
                • <strong>Hypotension:</strong> Late sign - significant blood loss already occurred<br/>
                • <strong>Respiratory:</strong> Primary cause of cardiac arrest in children<br/>
                • <strong>Weight:</strong> Use for medication dosing calculations
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Complete Reference Table */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Complete Pediatric Vital Signs Reference
              </Typography>

              <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Age Group</strong></TableCell>
                      <TableCell><strong>Heart Rate (bpm)</strong></TableCell>
                      <TableCell><strong>Resp Rate (breaths/min)</strong></TableCell>
                      <TableCell><strong>Systolic BP (mmHg)</strong></TableCell>
                      <TableCell><strong>Weight (kg)</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(ageGroups).map(([age, ranges]) => (
                      <TableRow
                        key={age}
                        sx={{
                          backgroundColor: age === selectedAge ? 'primary.50' : 'inherit',
                          '&:hover': { backgroundColor: 'grey.50' }
                        }}
                      >
                        <TableCell>
                          <strong>{age}</strong>
                        </TableCell>
                        <TableCell>{ranges.heartRate.min} - {ranges.heartRate.max}</TableCell>
                        <TableCell>{ranges.respiratoryRate.min} - {ranges.respiratoryRate.max}</TableCell>
                        <TableCell>{ranges.systolicBP.min} - {ranges.systolicBP.max}</TableCell>
                        <TableCell>{ranges.weight.min} - {ranges.weight.max}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PediatricVitals;