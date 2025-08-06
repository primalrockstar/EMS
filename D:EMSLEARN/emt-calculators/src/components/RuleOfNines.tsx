import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Paper,
  Button,
  Chip,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slider
} from '@mui/material';

interface BodyArea {
  name: string;
  adultPercent: number;
  pediatricPercent: number;
  selected: boolean;
}

const RuleOfNines: React.FC = () => {
  const [patientType, setPatientType] = useState<'adult' | 'pediatric'>('adult');
  const [bodyAreas, setBodyAreas] = useState<BodyArea[]>([
    { name: 'Head & Neck', adultPercent: 9, pediatricPercent: 18, selected: false },
    { name: 'Right Arm', adultPercent: 9, pediatricPercent: 9, selected: false },
    { name: 'Left Arm', adultPercent: 9, pediatricPercent: 9, selected: false },
    { name: 'Chest', adultPercent: 9, pediatricPercent: 9, selected: false },
    { name: 'Abdomen', adultPercent: 9, pediatricPercent: 9, selected: false },
    { name: 'Upper Back', adultPercent: 9, pediatricPercent: 9, selected: false },
    { name: 'Lower Back', adultPercent: 9, pediatricPercent: 9, selected: false },
    { name: 'Right Thigh', adultPercent: 9, pediatricPercent: 7, selected: false },
    { name: 'Left Thigh', adultPercent: 9, pediatricPercent: 7, selected: false },
    { name: 'Right Leg & Foot', adultPercent: 9, pediatricPercent: 7, selected: false },
    { name: 'Left Leg & Foot', adultPercent: 9, pediatricPercent: 7, selected: false },
    { name: 'Genitalia', adultPercent: 1, pediatricPercent: 1, selected: false }
  ]);

  const [manualPercentage, setManualPercentage] = useState(0);
  const [useManualEntry, setUseManualEntry] = useState(false);

  const toggleBodyArea = (index: number) => {
    setBodyAreas(prev => prev.map((area, i) => 
      i === index ? { ...area, selected: !area.selected } : area
    ));
  };

  const clearAll = () => {
    setBodyAreas(prev => prev.map(area => ({ ...area, selected: false })));
  };

  const calculateTotalBSA = () => {
    if (useManualEntry) return manualPercentage;
    
    return bodyAreas.reduce((total, area) => {
      if (area.selected) {
        return total + (patientType === 'adult' ? area.adultPercent : area.pediatricPercent);
      }
      return total;
    }, 0);
  };

  const totalBSA = calculateTotalBSA();

  const getBurnSeverity = (percentage: number) => {
    if (percentage === 0) return { severity: 'None', color: 'default', description: 'No burns assessed' };
    if (percentage < 10) return { severity: 'Minor', color: 'success', description: 'Outpatient management may be appropriate' };
    if (percentage < 20) return { severity: 'Moderate', color: 'warning', description: 'Hospital admission likely required' };
    if (percentage < 30) return { severity: 'Major', color: 'error', description: 'Burn center referral recommended' };
    return { severity: 'Critical', color: 'error', description: 'Immediate burn center transport required' };
  };

  const burnAssessment = getBurnSeverity(totalBSA);

  const getBurnCenterCriteria = () => [
    'Burns > 20% BSA (adult) or > 10% BSA (pediatric)',
    'Burns involving face, hands, feet, genitalia, or major joints',
    'Full-thickness burns > 5% BSA',
    'Electrical or chemical burns',
    'Inhalation injury',
    'Burns with associated trauma',
    'Pre-existing medical conditions affecting healing'
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* Controls */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Rule of Nines Calculator
                </Typography>
                <Button variant="outlined" onClick={clearAll} size="small">
                  Clear All
                </Button>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Patient Type
                </Typography>
                <ToggleButtonGroup
                  value={patientType}
                  exclusive
                  onChange={(_, value) => value && setPatientType(value)}
                  color="primary"
                >
                  <ToggleButton value="adult">Adult</ToggleButton>
                  <ToggleButton value="pediatric">Pediatric</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Input Method
                </Typography>
                <ToggleButtonGroup
                  value={useManualEntry ? 'manual' : 'visual'}
                  exclusive
                  onChange={(_, value) => setUseManualEntry(value === 'manual')}
                  color="secondary"
                  size="small"
                >
                  <ToggleButton value="visual">Visual Selection</ToggleButton>
                  <ToggleButton value="manual">Manual Entry</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {useManualEntry && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Total BSA Burned: {manualPercentage}%
                  </Typography>
                  <Slider
                    value={manualPercentage}
                    onChange={(_, value) => setManualPercentage(value as number)}
                    min={0}
                    max={100}
                    step={1}
                    marks={[
                      { value: 0, label: '0%' },
                      { value: 25, label: '25%' },
                      { value: 50, label: '50%' },
                      { value: 75, label: '75%' },
                      { value: 100, label: '100%' }
                    ]}
                    sx={{ mt: 2 }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Body Area Selection */}
        {!useManualEntry && (
          <Grid item xs={12} md={8}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Select Burned Areas
                </Typography>
                <Grid container spacing={2}>
                  {bodyAreas.map((area, index) => (
                    <Grid item xs={12} sm={6} md={4} key={area.name}>
                      <Paper
                        elevation={area.selected ? 3 : 1}
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          bgcolor: area.selected ? 'primary.50' : 'white',
                          border: area.selected ? '2px solid' : '1px solid',
                          borderColor: area.selected ? 'primary.main' : 'grey.300',
                          '&:hover': {
                            bgcolor: area.selected ? 'primary.100' : 'grey.50'
                          }
                        }}
                        onClick={() => toggleBodyArea(index)}
                      >
                        <Typography variant="subtitle2" gutterBottom>
                          {area.name}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {patientType === 'adult' ? area.adultPercent : area.pediatricPercent}%
                        </Typography>
                        {area.selected && (
                          <Chip label="Selected" color="primary" size="small" sx={{ mt: 1 }} />
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Results */}
        <Grid item xs={12} md={useManualEntry ? 12 : 4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assessment Results
              </Typography>

              <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
                <Typography variant="h4" align="center" gutterBottom>
                  {totalBSA}%
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Total Body Surface Area Burned
                </Typography>
                
                <Alert severity={burnAssessment.color as any} sx={{ mt: 2 }}>
                  <Typography variant="h6">{burnAssessment.severity} Burns</Typography>
                  <Typography>{burnAssessment.description}</Typography>
                </Alert>
              </Paper>

              <Typography variant="subtitle2" gutterBottom>
                Burn Center Criteria
              </Typography>
              <Box sx={{ mb: 2 }}>
                {getBurnCenterCriteria().map((criterion, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • {criterion}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Reference Table */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rule of Nines Reference
              </Typography>

              <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Body Area</strong></TableCell>
                      <TableCell><strong>Adult (%)</strong></TableCell>
                      <TableCell><strong>Pediatric (%)</strong></TableCell>
                      <TableCell><strong>Notes</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Head & Neck</TableCell>
                      <TableCell>9%</TableCell>
                      <TableCell>18%</TableCell>
                      <TableCell>Larger head proportion in children</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Each Arm</TableCell>
                      <TableCell>9%</TableCell>
                      <TableCell>9%</TableCell>
                      <TableCell>Same proportion in adults and children</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chest</TableCell>
                      <TableCell>9%</TableCell>
                      <TableCell>9%</TableCell>
                      <TableCell>Anterior trunk</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Abdomen</TableCell>
                      <TableCell>9%</TableCell>
                      <TableCell>9%</TableCell>
                      <TableCell>Anterior trunk</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Upper Back</TableCell>
                      <TableCell>9%</TableCell>
                      <TableCell>9%</TableCell>
                      <TableCell>Posterior trunk</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lower Back</TableCell>
                      <TableCell>9%</TableCell>
                      <TableCell>9%</TableCell>
                      <TableCell>Posterior trunk</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Each Leg (thigh + leg)</TableCell>
                      <TableCell>18%</TableCell>
                      <TableCell>14%</TableCell>
                      <TableCell>Smaller leg proportion in children</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Genitalia</TableCell>
                      <TableCell>1%</TableCell>
                      <TableCell>1%</TableCell>
                      <TableCell>Perineum</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  * Rule of Nines is an estimation tool - actual BSA may vary<br/>
                  * For small or irregular burns, use patient's palm = ~1% BSA<br/>
                  * Consider Lund-Browder chart for more accurate pediatric calculations
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RuleOfNines;