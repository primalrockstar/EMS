import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  Grid,
  Paper,
  Divider,
  TextField
} from '@mui/material';

const StrokeAssessment: React.FC = () => {
  const [faceDropping, setFaceDropping] = useState(false);
  const [armWeakness, setArmWeakness] = useState(false);
  const [speechDifficulty, setSpeechDifficulty] = useState(false);
  const [timeOnset, setTimeOnset] = useState('');

  const positiveFindings = [faceDropping, armWeakness, speechDifficulty].filter(Boolean).length;
  const isStrokeAlert = positiveFindings > 0;

  const getRecommendation = () => {
    if (positiveFindings === 0) {
      return {
        alert: 'Low Stroke Probability',
        severity: 'success' as const,
        action: 'Continue assessment for other causes',
        transport: 'Standard transport appropriate'
      };
    } else if (positiveFindings === 1) {
      return {
        alert: 'Possible Stroke',
        severity: 'warning' as const,
        action: 'Consider stroke protocol activation',
        transport: 'Transport to stroke-capable facility'
      };
    } else {
      return {
        alert: 'High Stroke Probability',
        severity: 'error' as const,
        action: 'Activate stroke protocol immediately',
        transport: 'Emergent transport to stroke center'
      };
    }
  };

  const recommendation = getRecommendation();

  const getFastInstructions = () => ({
    face: 'Ask patient to smile. Look for facial droop or asymmetry.',
    arms: 'Ask patient to raise both arms. Check for arm drift or weakness.',
    speech: 'Ask patient to repeat a phrase. Listen for slurred or strange speech.',
    time: 'Note time of symptom onset - critical for treatment decisions.'
  });

  const getStrokeSymptoms = () => [
    'Sudden numbness or weakness of face, arm, or leg',
    'Sudden confusion or trouble speaking/understanding',
    'Sudden trouble seeing in one or both eyes',
    'Sudden trouble walking, dizziness, loss of coordination',
    'Sudden severe headache with no known cause'
  ];

  const instructions = getFastInstructions();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* FAST Assessment */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                FAST Stroke Assessment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Face, Arms, Speech, Time
              </Typography>

              <FormControl component="fieldset">
                <FormGroup>
                  <Box sx={{ mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={faceDropping}
                          onChange={(e) => setFaceDropping(e.target.checked)}
                          color="error"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="subtitle2">
                            <strong>F</strong>ace Drooping
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {instructions.face}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={armWeakness}
                          onChange={(e) => setArmWeakness(e.target.checked)}
                          color="error"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="subtitle2">
                            <strong>A</strong>rm Weakness
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {instructions.arms}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={speechDifficulty}
                          onChange={(e) => setSpeechDifficulty(e.target.checked)}
                          color="error"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="subtitle2">
                            <strong>S</strong>peech Difficulty
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {instructions.speech}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      <strong>T</strong>ime of Onset
                    </Typography>
                    <TextField
                      fullWidth
                      label="Time symptoms started"
                      value={timeOnset}
                      onChange={(e) => setTimeOnset(e.target.value)}
                      placeholder="e.g., 2:30 PM or 2 hours ago"
                      helperText="Critical for treatment decisions"
                    />
                  </Box>
                </FormGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Results */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assessment Results
              </Typography>

              <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
                <Typography variant="h6" gutterBottom>
                  FAST Score: {positiveFindings}/3
                </Typography>
                <Typography variant="body2">
                  Positive findings: {positiveFindings}
                </Typography>
              </Paper>

              <Alert severity={recommendation.severity} sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {recommendation.alert}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {recommendation.action}
                </Typography>
                <Typography>
                  {recommendation.transport}
                </Typography>
              </Alert>

              {isStrokeAlert && (
                <Paper elevation={1} sx={{ p: 2, bgcolor: 'error.50' }}>
                  <Typography variant="subtitle2" color="error.dark" gutterBottom>
                    ⚠ Stroke Protocol Actions:
                  </Typography>
                  <Typography variant="body2" color="error.dark" sx={{ mb: 0.5 }}>
                    • Establish IV access if trained
                  </Typography>
                  <Typography variant="body2" color="error.dark" sx={{ mb: 0.5 }}>
                    • Check blood glucose level
                  </Typography>
                  <Typography variant="body2" color="error.dark" sx={{ mb: 0.5 }}>
                    • Obtain baseline vital signs
                  </Typography>
                  <Typography variant="body2" color="error.dark" sx={{ mb: 0.5 }}>
                    • Contact receiving hospital
                  </Typography>
                  <Typography variant="body2" color="error.dark">
                    • Transport to stroke center if within protocols
                  </Typography>
                </Paper>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Stroke Signs Reference */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Additional Stroke Warning Signs
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Classic Stroke Symptoms:
                    </Typography>
                    {getStrokeSymptoms().map((symptom, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        • {symptom}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Time-Critical Considerations:
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      • <strong>Golden Hour:</strong> Treatment most effective within 1 hour
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      • <strong>3-Hour Window:</strong> tPA eligibility cutoff
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      • <strong>4.5-Hour Window:</strong> Extended tPA window in some cases
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      • <strong>24-Hour Window:</strong> Mechanical thrombectomy possible
                    </Typography>
                    <Typography variant="body2">
                      • <strong>Last Known Well:</strong> Use if exact onset unknown
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Paper elevation={1} sx={{ p: 2, bgcolor: 'info.50' }}>
                <Typography variant="subtitle2" gutterBottom>
                  EMT-B Stroke Management:
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  1. <strong>Recognition:</strong> Use FAST assessment to identify potential stroke
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  2. <strong>Time Documentation:</strong> Record exact time of onset or last known well
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  3. <strong>Glucose Check:</strong> Hypoglycemia can mimic stroke symptoms
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  4. <strong>Positioning:</strong> Elevate head 15-30° if no spinal injury suspected
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  5. <strong>Transport:</strong> Rapid transport to appropriate stroke facility
                </Typography>
                <Typography variant="body2">
                  6. <strong>Communication:</strong> Pre-alert receiving facility for stroke alert
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StrokeAssessment;