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
  Chip,
  Divider,
  Paper
} from '@mui/material';

interface ContraindicationItem {
  key: string;
  label: string;
  severity: 'absolute' | 'relative';
  description: string;
}

const contraindications: ContraindicationItem[] = [
  {
    key: 'allergy',
    label: 'Known aspirin allergy or hypersensitivity',
    severity: 'absolute',
    description: 'History of allergic reaction to aspirin or salicylates'
  },
  {
    key: 'bleeding',
    label: 'Active bleeding or bleeding disorder',
    severity: 'absolute',
    description: 'GI bleeding, intracranial hemorrhage, or coagulopathy'
  },
  {
    key: 'age',
    label: 'Age under 18 years',
    severity: 'absolute',
    description: 'Risk of Reye\'s syndrome in children and adolescents'
  },
  {
    key: 'stroke',
    label: 'Suspected stroke',
    severity: 'absolute',
    description: 'Cannot differentiate hemorrhagic from ischemic stroke in field'
  },
  {
    key: 'pregnancy',
    label: 'Third trimester pregnancy',
    severity: 'relative',
    description: 'Risk of bleeding complications and effects on fetus'
  },
  {
    key: 'asthma',
    label: 'Severe asthma or bronchospasm',
    severity: 'relative',
    description: 'Aspirin-induced bronchospasm in sensitive patients'
  },
  {
    key: 'ulcer',
    label: 'History of peptic ulcer disease',
    severity: 'relative',
    description: 'Increased risk of GI bleeding'
  },
  {
    key: 'warfarin',
    label: 'Taking warfarin or anticoagulants',
    severity: 'relative',
    description: 'Increased bleeding risk when combined with anticoagulants'
  }
];

const ASAFlags: React.FC = () => {
  const [selectedContraindications, setSelectedContraindications] = useState<string[]>([]);

  const handleContraindicationChange = (key: string, checked: boolean) => {
    if (checked) {
      setSelectedContraindications(prev => [...prev, key]);
    } else {
      setSelectedContraindications(prev => prev.filter(item => item !== key));
    }
  };

  const absoluteContraindications = contraindications.filter(c => 
    c.severity === 'absolute' && selectedContraindications.includes(c.key)
  );

  const relativeContraindications = contraindications.filter(c => 
    c.severity === 'relative' && selectedContraindications.includes(c.key)
  );

  const hasAbsoluteContraindications = absoluteContraindications.length > 0;
  const hasRelativeContraindications = relativeContraindications.length > 0;

  const getRecommendation = () => {
    if (hasAbsoluteContraindications) {
      return {
        action: 'DO NOT ADMINISTER ASPIRIN',
        severity: 'error' as const,
        reasoning: 'Absolute contraindications present'
      };
    } else if (hasRelativeContraindications) {
      return {
        action: 'CAUTION - Consider Risk vs Benefit',
        severity: 'warning' as const,
        reasoning: 'Relative contraindications present - consult medical control if available'
      };
    } else if (selectedContraindications.length === 0) {
      return {
        action: 'Complete Assessment',
        severity: 'info' as const,
        reasoning: 'Check all applicable conditions before administering aspirin'
      };
    } else {
      return {
        action: 'ASPIRIN MAY BE ADMINISTERED',
        severity: 'success' as const,
        reasoning: 'No contraindications identified'
      };
    }
  };

  const recommendation = getRecommendation();

  const getIndications = () => [
    'Suspected acute coronary syndrome (ACS)',
    'Chest pain suspicious for MI',
    'Adult patient (≥18 years)',
    'Able to swallow safely',
    'No known contraindications'
  ];

  const getDosageInfo = () => ({
    dose: '324 mg (4 × 81mg tablets) OR 2 × 162mg tablets',
    route: 'Oral - chewed or dissolved',
    onset: '15-30 minutes',
    notes: 'Chewing increases absorption rate'
  });

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* Assessment Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contraindication Assessment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Check all conditions that apply to the patient:
              </Typography>

              <FormControl component="fieldset">
                <FormGroup>
                  {contraindications.map((item) => (
                    <FormControlLabel
                      key={item.key}
                      control={
                        <Checkbox
                          checked={selectedContraindications.includes(item.key)}
                          onChange={(e) => handleContraindicationChange(item.key, e.target.checked)}
                          color={item.severity === 'absolute' ? 'error' : 'warning'}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2">
                            {item.label}
                          </Typography>
                          <Chip
                            label={item.severity.toUpperCase()}
                            size="small"
                            color={item.severity === 'absolute' ? 'error' : 'warning'}
                          />
                        </Box>
                      }
                      sx={{ mb: 1, alignItems: 'flex-start' }}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recommendation
              </Typography>

              <Alert severity={recommendation.severity} sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {recommendation.action}
                </Typography>
                <Typography>
                  {recommendation.reasoning}
                </Typography>
              </Alert>

              {hasAbsoluteContraindications && (
                <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'error.50' }}>
                  <Typography variant="subtitle2" color="error.dark" gutterBottom>
                    Absolute Contraindications Present:
                  </Typography>
                  {absoluteContraindications.map((item) => (
                    <Typography key={item.key} variant="body2" color="error.dark" sx={{ mb: 0.5 }}>
                      • {item.label}
                    </Typography>
                  ))}
                </Paper>
              )}

              {hasRelativeContraindications && (
                <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'warning.50' }}>
                  <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                    Relative Contraindications Present:
                  </Typography>
                  {relativeContraindications.map((item) => (
                    <Typography key={item.key} variant="body2" color="warning.dark" sx={{ mb: 0.5 }}>
                      • {item.label}
                    </Typography>
                  ))}
                  <Typography variant="body2" color="warning.dark" sx={{ mt: 1, fontStyle: 'italic' }}>
                    Consider consulting medical control before administration
                  </Typography>
                </Paper>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Indications for Aspirin
              </Typography>
              <Box sx={{ mb: 2 }}>
                {getIndications().map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    • {item}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Dosage Information */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Aspirin Administration Guidelines
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Standard Dosage
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {getDosageInfo().dose}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Route: {getDosageInfo().route}
                    </Typography>
                    <Typography variant="body2">
                      Onset: {getDosageInfo().onset}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getDosageInfo().notes}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Important Notes
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      • Ensure patient is conscious and can swallow
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      • Document time of administration
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      • Monitor for allergic reactions
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      • Continue with other ACS protocols
                    </Typography>
                    <Typography variant="body2">
                      • Transport for definitive care
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

export default ASAFlags;