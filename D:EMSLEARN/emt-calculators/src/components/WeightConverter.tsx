import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const WeightConverter: React.FC = () => {
  const [pounds, setPounds] = useState('');
  const [kilograms, setKilograms] = useState('');

  const handlePoundsChange = (value: string) => {
    setPounds(value);
    const lbsValue = parseFloat(value);
    if (!isNaN(lbsValue) && lbsValue > 0) {
      const kgValue = lbsValue / 2.205;
      setKilograms(kgValue.toFixed(1));
    } else {
      setKilograms('');
    }
  };

  const handleKilogramsChange = (value: string) => {
    setKilograms(value);
    const kgValue = parseFloat(value);
    if (!isNaN(kgValue) && kgValue > 0) {
      const lbsValue = kgValue * 2.205;
      setPounds(lbsValue.toFixed(1));
    } else {
      setPounds('');
    }
  };

  const getCommonWeights = () => [
    { lbs: 110, kg: 50 },
    { lbs: 132, kg: 60 },
    { lbs: 154, kg: 70 },
    { lbs: 176, kg: 80 },
    { lbs: 198, kg: 90 },
    { lbs: 220, kg: 100 }
  ];

  const getPediatricWeights = () => [
    { age: 'Newborn', lbs: 7.7, kg: 3.5 },
    { age: '6 months', lbs: 17.6, kg: 8 },
    { age: '1 year', lbs: 22, kg: 10 },
    { age: '2 years', lbs: 26.4, kg: 12 },
    { age: '3 years', lbs: 33, kg: 15 },
    { age: '5 years', lbs: 44, kg: 20 },
    { age: '10 years', lbs: 66, kg: 30 },
    { age: '15 years', lbs: 110, kg: 50 }
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* Converter */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weight Converter
              </Typography>

              <TextField
                fullWidth
                label="Pounds (lbs)"
                value={pounds}
                onChange={(e) => handlePoundsChange(e.target.value)}
                type="number"
                sx={{ mb: 3 }}
                helperText="Enter weight in pounds"
              />

              <TextField
                fullWidth
                label="Kilograms (kg)"
                value={kilograms}
                onChange={(e) => handleKilogramsChange(e.target.value)}
                type="number"
                helperText="Enter weight in kilograms"
              />

              <Paper elevation={1} sx={{ p: 2, mt: 3, bgcolor: 'info.50' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Conversion Formula:
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  • Pounds to kg: divide by 2.205
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  • Kg to pounds: multiply by 2.205
                </Typography>
                <Typography variant="body2">
                  • Quick estimate: 1 kg ≈ 2.2 lbs
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        {/* Common Adult Weights */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Common Adult Weights
              </Typography>

              <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Pounds</strong></TableCell>
                      <TableCell><strong>Kilograms</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getCommonWeights().map((weight, index) => (
                      <TableRow key={index}>
                        <TableCell>{weight.lbs} lbs</TableCell>
                        <TableCell>{weight.kg} kg</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pediatric Reference */}
        <Grid size={{ xs: 12 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pediatric Weight Reference
              </Typography>

              <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Age</strong></TableCell>
                      <TableCell><strong>Average Weight (lbs)</strong></TableCell>
                      <TableCell><strong>Average Weight (kg)</strong></TableCell>
                      <TableCell><strong>Notes</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getPediatricWeights().map((weight, index) => (
                      <TableRow key={index}>
                        <TableCell>{weight.age}</TableCell>
                        <TableCell>{weight.lbs} lbs</TableCell>
                        <TableCell>{weight.kg} kg</TableCell>
                        <TableCell>
                          {weight.age === 'Newborn' && 'Term infant'}
                          {weight.age === '1 year' && 'Typical toddler'}
                          {weight.age === '5 years' && 'School entry'}
                          {weight.age === '15 years' && 'Adolescent'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Paper elevation={1} sx={{ p: 2, mt: 3, bgcolor: 'warning.50' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Pediatric Weight Estimation (if scale unavailable):
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  • <strong>Ages 1-10 years:</strong> Weight (kg) = (Age × 2) + 8
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  • <strong>Broselow tape:</strong> Length-based weight estimation
                </Typography>
                <Typography variant="body2">
                  • <strong>Adult size:</strong> Usually achieved by age 16-18
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeightConverter;