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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';

interface ApgarScores {
  appearance: number;
  pulse: number;
  grimace: number;
  activity: number;
  respiratory: number;
}

const ApgarScore: React.FC = () => {
  const [scores, setScores] = useState<ApgarScores>({
    appearance: -1,
    pulse: -1,
    grimace: -1,
    activity: -1,
    respiratory: -1
  });

  const handleScoreChange = (category: keyof ApgarScores, value: number) => {
    setScores(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const totalScore = Object.values(scores).reduce((sum, score) => sum + Math.max(0, score), 0);
  const isComplete = Object.values(scores).every(score => score >= 0);

  const getScoreInterpretation = (score: number) => {
    if (!isComplete) return { condition: 'Incomplete', color: 'default', description: 'Complete all assessments', action: 'Continue assessment' };
    if (score >= 8) return { condition: 'Normal', color: 'success', description: 'Newborn in good condition', action: 'Routine care, monitor' };
    if (score >= 4) return { condition: 'Moderate Depression', color: 'warning', description: 'Some intervention may be needed', action: 'Stimulation, oxygen, close monitoring' };
    return { condition: 'Severe Depression', color: 'error', description: 'Immediate intervention required', action: 'Resuscitation, ventilation, medication' };
  };

  const interpretation = getScoreInterpretation(totalScore);

  const apgarCriteria = {
    appearance: [
      { score: 0, description: 'Blue or pale all over' },
      { score: 1, description: 'Pink body, blue extremities' },
      { score: 2, description: 'Pink all over' }
    ],
    pulse: [
      { score: 0, description: 'Absent' },
      { score: 1, description: 'Less than 100 bpm' },
      { score: 2, description: '100 bpm or greater' }
    ],
    grimace: [
      { score: 0, description: 'No response' },
      { score: 1, description: 'Grimace or weak cry' },
      { score: 2, description: 'Vigorous cry, cough, sneeze' }
    ],
    activity: [
      { score: 0, description: 'Limp, no movement' },
      { score: 1, description: 'Some flexion of arms and legs' },
      { score: 2, description: 'Active movement, flexed arms and legs' }
    ],
    respiratory: [
      { score: 0, description: 'Absent' },
      { score: 1, description: 'Weak, irregular, gasping' },
      { score: 2, description: 'Strong, regular, crying' }
    ]
  };

  const getClinicalGuidance = () => ({
    timing: [
      'First APGAR at 1 minute after birth',
      'Second APGAR at 5 minutes after birth',
      'Additional scores at 10, 15, 20 minutes if indicated'
    ],
    limitations: [
      'APGAR is not predictive of long-term outcomes',
      'Scores can be affected by medications, prematurity',
      'Should not delay resuscitation efforts',
      'Use in conjunction with other clinical assessments'
    ],
    actions: {
      '8-10': ['Routine care', 'Dry and warm', 'Monitor'],
      '4-7': ['Stimulation', 'Oxygen as needed', 'Close monitoring', 'Consider positive pressure'],
      '0-3': ['Immediate resuscitation', 'Positive pressure ventilation', 'Consider chest compressions', 'Medication if indicated']
    }
  });

  const guidance = getClinicalGuidance();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* Assessment Form */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                APGAR Score Assessment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Appearance, Pulse, Grimace, Activity, Respiratory
              </Typography>

              {Object.entries(apgarCriteria).map(([category, criteria]) => (
                <Box key={category} sx={{ mb: 4 }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                      {category === 'grimace' ? 'Grimace (Reflex Response)' : category}
                    </FormLabel>
                    <RadioGroup
                      value={scores[category as keyof ApgarScores]}
                      onChange={(e) => handleScoreChange(category as keyof ApgarScores, parseInt(e.target.value))}
                      sx={{ mt: 1 }}
                    >
                      {criteria.map((criterion) => (
                        <FormControlLabel
                          key={criterion.score}
                          value={criterion.score}
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Chip 
                                label={criterion.score} 
                                size="small" 
                                color={criterion.score === 2 ? 'success' : criterion.score === 1 ? 'warning' : 'error'}
                              />
                              <Typography variant="body2">
                                {criterion.description}
                              </Typography>
                            </Box>
                          }
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Results */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                APGAR Results
              </Typography>

              <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
                <Typography variant="h3" align="center" gutterBottom>
                  {isComplete ? totalScore : '-'}/10
                </Typography>
                <Typography variant="subtitle1" align="center">
                  Total APGAR Score
                </Typography>
              </Paper>

              {isComplete && (
                <Alert severity={interpretation.color as any} sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {interpretation.condition}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {interpretation.description}
                  </Typography>
                  <Typography variant="subtitle2">
                    Action: {interpretation.action}
                  </Typography>
                </Alert>
              )}

              <Typography variant="subtitle2" gutterBottom>
                Individual Scores:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {Object.entries(scores).map(([category, score]) => (
                  <Chip
                    key={category}
                    label={`${category.charAt(0).toUpperCase()}: ${score >= 0 ? score : '?'}`}
                    color={score >= 0 ? 'primary' : 'default'}
                    size="small"
                  />
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
                APGAR Scoring Reference
              </Typography>

              <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Assessment</strong></TableCell>
                      <TableCell align="center"><strong>0 Points</strong></TableCell>
                      <TableCell align="center"><strong>1 Point</strong></TableCell>
                      <TableCell align="center"><strong>2 Points</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Appearance (Color)</strong></TableCell>
                      <TableCell align="center">Blue/pale all over</TableCell>
                      <TableCell align="center">Pink body, blue extremities</TableCell>
                      <TableCell align="center">Pink all over</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Pulse (Heart Rate)</strong></TableCell>
                      <TableCell align="center">Absent</TableCell>
                      <TableCell align="center">&lt; 100 bpm</TableCell>
                      <TableCell align="center">≥ 100 bpm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Grimace (Reflex)</strong></TableCell>
                      <TableCell align="center">No response</TableCell>
                      <TableCell align="center">Grimace/weak cry</TableCell>
                      <TableCell align="center">Vigorous cry/cough</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Activity (Muscle Tone)</strong></TableCell>
                      <TableCell align="center">Limp</TableCell>
                      <TableCell align="center">Some flexion</TableCell>
                      <TableCell align="center">Active movement</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Respiratory (Breathing)</strong></TableCell>
                      <TableCell align="center">Absent</TableCell>
                      <TableCell align="center">Weak/irregular</TableCell>
                      <TableCell align="center">Strong/regular</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Clinical Guidance */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Clinical Guidance
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Timing:
                    </Typography>
                    {guidance.timing.map((item, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        • {item}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Actions by Score:
                    </Typography>
                    {Object.entries(guidance.actions).map(([range, actions]) => (
                      <Box key={range} sx={{ mb: 1 }}>
                        <Typography variant="caption" fontWeight="bold">
                          {range}:
                        </Typography>
                        {actions.map((action, index) => (
                          <Typography key={index} variant="body2" fontSize="0.8rem" sx={{ ml: 1 }}>
                            • {action}
                          </Typography>
                        ))}
                      </Box>
                    ))}
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Important Notes:
                    </Typography>
                    {guidance.limitations.map((item, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        • {item}
                      </Typography>
                    ))}
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

export default ApgarScore;