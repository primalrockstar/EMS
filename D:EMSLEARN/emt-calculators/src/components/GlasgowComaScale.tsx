import React, { useState, useEffect } from 'react';
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
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Chip,
  Divider,
  Paper
} from '@mui/material';

interface GCSScores {
  eye: number;
  verbal: number;
  motor: number;
}

const adultEyeResponse = [
  { value: 4, label: 'Opens eyes spontaneously' },
  { value: 3, label: 'Opens eyes to verbal command' },
  { value: 2, label: 'Opens eyes to pain' },
  { value: 1, label: 'No eye opening' }
];

const adultVerbalResponse = [
  { value: 5, label: 'Oriented and converses' },
  { value: 4, label: 'Disoriented and converses' },
  { value: 3, label: 'Inappropriate words' },
  { value: 2, label: 'Incomprehensible sounds' },
  { value: 1, label: 'No verbal response' }
];

const adultMotorResponse = [
  { value: 6, label: 'Obeys commands' },
  { value: 5, label: 'Localizes pain' },
  { value: 4, label: 'Withdraws from pain' },
  { value: 3, label: 'Flexion to pain (decorticate)' },
  { value: 2, label: 'Extension to pain (decerebrate)' },
  { value: 1, label: 'No motor response' }
];

const pediatricEyeResponse = [
  { value: 4, label: 'Opens eyes spontaneously' },
  { value: 3, label: 'Opens eyes to speech' },
  { value: 2, label: 'Opens eyes to pain' },
  { value: 1, label: 'No eye opening' }
];

const pediatricVerbalResponse = [
  { value: 5, label: 'Appropriate words/social smile, fixes & follows' },
  { value: 4, label: 'Cries but consolable, inappropriate interactions' },
  { value: 3, label: 'Inconsistently consolable, moaning' },
  { value: 2, label: 'Inconsolable, agitated' },
  { value: 1, label: 'No verbal response' }
];

const pediatricMotorResponse = [
  { value: 6, label: 'Normal spontaneous movement' },
  { value: 5, label: 'Withdraws to touch' },
  { value: 4, label: 'Withdraws to pain' },
  { value: 3, label: 'Abnormal flexion (decorticate)' },
  { value: 2, label: 'Abnormal extension (decerebrate)' },
  { value: 1, label: 'No motor response' }
];

const GlasgowComaScale: React.FC = () => {
  const [patientType, setPatientType] = useState<'adult' | 'pediatric'>('adult');
  const [scores, setScores] = useState<GCSScores>({
    eye: 0,
    verbal: 0,
    motor: 0
  });

  const totalScore = scores.eye + scores.verbal + scores.motor;

  const getScoreInterpretation = (score: number) => {
    if (score === 0) return { severity: 'Not assessed', color: 'default', description: 'Complete assessment required' };
    if (score <= 8) return { severity: 'Severe', color: 'error', description: 'Severe brain injury - Immediate transport' };
    if (score <= 12) return { severity: 'Moderate', color: 'warning', description: 'Moderate brain injury - Monitor closely' };
    return { severity: 'Mild', color: 'success', description: 'Mild brain injury - Continue assessment' };
  };

  const interpretation = getScoreInterpretation(totalScore);

  const handleScoreChange = (category: keyof GCSScores, value: number) => {
    setScores(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const eyeOptions = patientType === 'adult' ? adultEyeResponse : pediatricEyeResponse;
  const verbalOptions = patientType === 'adult' ? adultVerbalResponse : pediatricVerbalResponse;
  const motorOptions = patientType === 'adult' ? adultMotorResponse : pediatricMotorResponse;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Card elevation={3}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
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

          {/* Eye Response */}
          <Box sx={{ mb: 3 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Eye Response (E)</FormLabel>
              <RadioGroup
                value={scores.eye}
                onChange={(e) => handleScoreChange('eye', parseInt(e.target.value))}
              >
                {eyeOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={`${option.value} - ${option.label}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Verbal Response */}
          <Box sx={{ mb: 3 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Verbal Response (V)</FormLabel>
              <RadioGroup
                value={scores.verbal}
                onChange={(e) => handleScoreChange('verbal', parseInt(e.target.value))}
              >
                {verbalOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={`${option.value} - ${option.label}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Motor Response */}
          <Box sx={{ mb: 3 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Motor Response (M)</FormLabel>
              <RadioGroup
                value={scores.motor}
                onChange={(e) => handleScoreChange('motor', parseInt(e.target.value))}
              >
                {motorOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={`${option.value} - ${option.label}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Results */}
          <Paper elevation={2} sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              Glasgow Coma Scale Results
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Chip label={`E: ${scores.eye}`} color={scores.eye > 0 ? 'primary' : 'default'} />
              <Chip label={`V: ${scores.verbal}`} color={scores.verbal > 0 ? 'primary' : 'default'} />
              <Chip label={`M: ${scores.motor}`} color={scores.motor > 0 ? 'primary' : 'default'} />
            </Box>

            <Typography variant="h4" sx={{ mb: 2 }}>
              Total Score: {totalScore > 0 ? totalScore : '-'}/15
            </Typography>

            {totalScore > 0 && (
              <Alert severity={interpretation.color as any} sx={{ mb: 2 }}>
                <Typography variant="h6">{interpretation.severity} Brain Injury</Typography>
                <Typography>{interpretation.description}</Typography>
              </Alert>
            )}

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Scene Interpretation Tips:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • GCS ≤ 8: Consider advanced airway management<br/>
                • GCS 9-12: Monitor for deterioration, consider ALS intercept<br/>
                • GCS 13-15: Continue assessment, monitor trends<br/>
                • Always reassess and document changes in GCS
              </Typography>
            </Box>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GlasgowComaScale;