import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Grid,
  Chip,
  Paper,
  Divider
} from '@mui/material';

const StartTriage: React.FC = () => {
  const [breathing, setBreathing] = useState('');
  const [circulation, setCirculation] = useState('');
  const [mental, setMental] = useState('');

  const getTriageCategory = () => {
    if (!breathing || !circulation || !mental) {
      return { category: 'Incomplete', color: 'default', priority: 'Complete assessment', description: 'Answer all questions to determine triage category' };
    }

    // Dead/Expectant
    if (breathing === 'absent') {
      return { category: 'Black (Expectant)', color: 'default', priority: '4 - Expectant', description: 'Deceased or injuries incompatible with life' };
    }

    // Immediate
    if (breathing === 'over30' || circulation === 'over2sec' || circulation === 'absent' || mental === 'unable') {
      return { category: 'Red (Immediate)', color: 'error', priority: '1 - Immediate', description: 'Life-threatening injuries requiring immediate care' };
    }

    // Delayed
    if (breathing === 'under30' && circulation === 'under2sec' && mental === 'able') {
      return { category: 'Yellow (Delayed)', color: 'warning', priority: '2 - Delayed', description: 'Serious injuries that can wait for treatment' };
    }

    // Minor (Walking Wounded)
    return { category: 'Green (Minor)', color: 'success', priority: '3 - Minor', description: 'Minor injuries, can walk and follow commands' };
  };

  const triage = getTriageCategory();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                START Triage Assessment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Simple Triage and Rapid Treatment (START) Protocol
              </Typography>

              {/* Breathing Assessment */}
              <Box sx={{ mb: 3 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">1. Breathing Assessment</FormLabel>
                  <RadioGroup
                    value={breathing}
                    onChange={(e) => setBreathing(e.target.value)}
                  >
                    <FormControlLabel
                      value="absent"
                      control={<Radio />}
                      label="No breathing after airway positioning"
                    />
                    <FormControlLabel
                      value="over30"
                      control={<Radio />}
                      label="Respiratory rate > 30/min"
                    />
                    <FormControlLabel
                      value="under30"
                      control={<Radio />}
                      label="Respiratory rate < 30/min"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Circulation Assessment */}
              <Box sx={{ mb: 3 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">2. Circulation Assessment</FormLabel>
                  <RadioGroup
                    value={circulation}
                    onChange={(e) => setCirculation(e.target.value)}
                  >
                    <FormControlLabel
                      value="absent"
                      control={<Radio />}
                      label="No radial pulse"
                    />
                    <FormControlLabel
                      value="over2sec"
                      control={<Radio />}
                      label="Capillary refill > 2 seconds"
                    />
                    <FormControlLabel
                      value="under2sec"
                      control={<Radio />}
                      label="Capillary refill < 2 seconds"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Mental Status */}
              <Box sx={{ mb: 3 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">3. Mental Status</FormLabel>
                  <RadioGroup
                    value={mental}
                    onChange={(e) => setMental(e.target.value)}
                  >
                    <FormControlLabel
                      value="unable"
                      control={<Radio />}
                      label="Unable to follow simple commands"
                    />
                    <FormControlLabel
                      value="able"
                      control={<Radio />}
                      label="Able to follow simple commands"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Triage Result
              </Typography>

              <Alert severity={triage.color as any} sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {triage.category}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Priority: {triage.priority}
                </Typography>
                <Typography>
                  {triage.description}
                </Typography>
              </Alert>

              <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" gutterBottom>
                  START Protocol Steps:
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  1. Can patient walk? → Green
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  2. Breathing present? → Check rate
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  3. Circulation adequate? → Check pulse/cap refill
                </Typography>
                <Typography variant="body2">
                  4. Mental status? → Simple commands
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Triage Categories Reference
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: 'error.50' }}>
                    <Chip label="RED" color="error" sx={{ mb: 1 }} />
                    <Typography variant="h6" color="error.dark">
                      Immediate
                    </Typography>
                    <Typography variant="body2">
                      Life-threatening injuries requiring immediate intervention
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: 'warning.50' }}>
                    <Chip label="YELLOW" color="warning" sx={{ mb: 1 }} />
                    <Typography variant="h6" color="warning.dark">
                      Delayed
                    </Typography>
                    <Typography variant="body2">
                      Serious but stable injuries that can wait
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: 'success.50' }}>
                    <Chip label="GREEN" color="success" sx={{ mb: 1 }} />
                    <Typography variant="h6" color="success.dark">
                      Minor
                    </Typography>
                    <Typography variant="body2">
                      Walking wounded with minor injuries
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.200' }}>
                    <Chip label="BLACK" sx={{ mb: 1 }} />
                    <Typography variant="h6">
                      Expectant
                    </Typography>
                    <Typography variant="body2">
                      Deceased or injuries incompatible with life
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StartTriage;