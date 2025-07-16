export interface PatientSimulation {
  id: string;
  title: string;
  patient: string;
  vitals: {
    pulse: number;
    resp: number;
    bp: string;
    temp?: string;
    spo2?: number;
  };
  initialAssessment: string;
  actions: string[];
  correctSequence: string[];
  feedback: { [key: string]: string };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export const simulations: PatientSimulation[] = [
  {
    id: '1',
    title: 'Asthma Exacerbation',
    patient: '22-year-old female, shortness of breath, history of asthma',
    vitals: {
      pulse: 110,
      resp: 28,
      bp: '120/80',
      temp: '98.6°F',
      spo2: 89
    },
    initialAssessment: 'Patient appears anxious, sitting upright, using accessory muscles to breathe. Audible wheezing on expiration. Skin is pale and diaphoretic.',
    actions: [
      'Check airway patency',
      'Administer albuterol nebulizer',
      'Start IV access',
      'Apply oxygen',
      'Check blood glucose',
      'Obtain SAMPLE history',
      'Position patient upright',
      'Prepare for transport'
    ],
    correctSequence: [
      'Check airway patency',
      'Position patient upright',
      'Apply oxygen',
      'Administer albuterol nebulizer'
    ],
    feedback: {
      'Check airway patency': 'Correct! Always ensure airway is clear before other interventions.',
      'Position patient upright': 'Good choice! Upright position helps with breathing difficulty.',
      'Apply oxygen': 'Appropriate! Low SpO2 requires oxygen supplementation.',
      'Administer albuterol nebulizer': 'Excellent! Albuterol is first-line treatment for bronchospasm.',
      'Start IV access': 'Not immediately necessary for mild-moderate asthma exacerbation.',
      'Check blood glucose': 'Not a priority in this respiratory emergency.',
      'Obtain SAMPLE history': 'Important but not the immediate priority.',
      'Prepare for transport': 'Important but treat the patient first.'
    },
    difficulty: 'beginner',
    tags: ['respiratory', 'asthma', 'bronchospasm', 'oxygen']
  },
  {
    id: '2',
    title: 'Chest Pain Assessment',
    patient: '58-year-old male, chest pain, history of hypertension',
    vitals: {
      pulse: 88,
      resp: 20,
      bp: '150/90',
      temp: '98.2°F',
      spo2: 96
    },
    initialAssessment: 'Patient reports crushing chest pain radiating to left arm, started 20 minutes ago. Appears diaphoretic and anxious. Denies shortness of breath.',
    actions: [
      'Obtain 12-lead ECG',
      'Administer aspirin 324mg',
      'Start IV access',
      'Give nitroglycerin',
      'Obtain OPQRST assessment',
      'Check blood glucose',
      'Apply oxygen',
      'Prepare for rapid transport'
    ],
    correctSequence: [
      'Obtain OPQRST assessment',
      'Obtain 12-lead ECG',
      'Administer aspirin 324mg',
      'Prepare for rapid transport'
    ],
    feedback: {
      'Obtain OPQRST assessment': 'Correct! Detailed pain assessment is crucial for cardiac complaints.',
      'Obtain 12-lead ECG': 'Essential! ECG helps identify cardiac issues and guides treatment.',
      'Administer aspirin 324mg': 'Appropriate! Aspirin is indicated for suspected ACS.',
      'Give nitroglycerin': 'Hold - check BP and ECG first before nitroglycerin.',
      'Start IV access': 'Good to establish but not the immediate priority.',
      'Check blood glucose': 'Not immediately relevant for this presentation.',
      'Apply oxygen': 'Not needed with normal SpO2 and no respiratory distress.',
      'Prepare for rapid transport': 'Critical! Time is muscle in cardiac events.'
    },
    difficulty: 'intermediate',
    tags: ['cardiac', 'chest-pain', 'acs', 'ecg']
  },
  {
    id: '3',
    title: 'Pediatric Febrile Seizure',
    patient: '18-month-old male, witnessed seizure, fever',
    vitals: {
      pulse: 140,
      resp: 24,
      bp: '90/50',
      temp: '102.8°F',
      spo2: 98
    },
    initialAssessment: 'Toddler is post-ictal, lethargic but arousable. Parents report 2-minute generalized seizure. Child has been feverish for 24 hours.',
    actions: [
      'Check blood glucose',
      'Cool patient gradually',
      'Administer rectal diazepam',
      'Obtain detailed history',
      'Check for signs of meningitis',
      'Prepare for transport',
      'Reassure parents',
      'Monitor airway closely'
    ],
    correctSequence: [
      'Monitor airway closely',
      'Check blood glucose',
      'Cool patient gradually',
      'Reassure parents'
    ],
    feedback: {
      'Monitor airway closely': 'Correct! Airway management is priority in post-ictal patients.',
      'Check blood glucose': 'Good! Hypoglycemia can cause seizures in children.',
      'Cool patient gradually': 'Appropriate! Gradual cooling helps prevent rebound seizures.',
      'Reassure parents': 'Important! Parents are often very frightened by seizures.',
      'Administer rectal diazepam': 'Not indicated for simple febrile seizures.',
      'Obtain detailed history': 'Important but not immediate priority.',
      'Check for signs of meningitis': 'Good assessment but not immediate action.',
      'Prepare for transport': 'All febrile seizures require evaluation.'
    },
    difficulty: 'intermediate',
    tags: ['pediatric', 'seizure', 'fever', 'post-ictal']
  },
  {
    id: '4',
    title: 'Multi-System Trauma',
    patient: '35-year-old male, motorcycle accident, multiple injuries',
    vitals: {
      pulse: 120,
      resp: 22,
      bp: '110/70',
      temp: '97.8°F',
      spo2: 94
    },
    initialAssessment: 'Patient conscious but confused, obvious deformity to right femur, abrasions on chest and arms. Complains of abdominal pain.',
    actions: [
      'Immobilize cervical spine',
      'Control bleeding',
      'Splint femur fracture',
      'Obtain IV access',
      'Administer pain medication',
      'Perform secondary assessment',
      'Prepare for trauma center transport',
      'Apply oxygen'
    ],
    correctSequence: [
      'Immobilize cervical spine',
      'Apply oxygen',
      'Control bleeding',
      'Perform secondary assessment'
    ],
    feedback: {
      'Immobilize cervical spine': 'Critical! C-spine precautions are essential in trauma.',
      'Apply oxygen': 'Appropriate! SpO2 of 94% requires oxygen supplementation.',
      'Control bleeding': 'Essential! Bleeding control prevents shock.',
      'Perform secondary assessment': 'Important to identify all injuries systematically.',
      'Splint femur fracture': 'Important but not immediately life-threatening.',
      'Obtain IV access': 'Needed but not immediate priority over ABCs.',
      'Administer pain medication': 'Important but assess fully first.',
      'Prepare for trauma center transport': 'Meets trauma center criteria.'
    },
    difficulty: 'advanced',
    tags: ['trauma', 'multiple-injuries', 'c-spine', 'bleeding']
  },
  {
    id: '5',
    title: 'Diabetic Emergency',
    patient: '45-year-old female, altered mental status, diabetes history',
    vitals: {
      pulse: 100,
      resp: 18,
      bp: '130/80',
      temp: '98.4°F',
      spo2: 99
    },
    initialAssessment: 'Patient found by family acting confused and disoriented. Skin is cool and diaphoretic. Family reports she has diabetes and may have missed meals.',
    actions: [
      'Check blood glucose immediately',
      'Administer oral glucose',
      'Start IV and give D50',
      'Obtain medication history',
      'Check for medical alert bracelet',
      'Assess neurological status',
      'Prepare for transport',
      'Reassess after treatment'
    ],
    correctSequence: [
      'Check blood glucose immediately',
      'Assess neurological status',
      'Start IV and give D50',
      'Reassess after treatment'
    ],
    feedback: {
      'Check blood glucose immediately': 'Correct! Blood glucose check is essential in diabetic emergencies.',
      'Assess neurological status': 'Good! Establish baseline neurological function.',
      'Start IV and give D50': 'Appropriate for severe hypoglycemia with altered mental status.',
      'Reassess after treatment': 'Critical! Monitor response to treatment.',
      'Administer oral glucose': 'Contraindicated - patient has altered mental status.',
      'Obtain medication history': 'Important but not immediate priority.',
      'Check for medical alert bracelet': 'Good practice but not immediate priority.',
      'Prepare for transport': 'All diabetic emergencies require evaluation.'
    },
    difficulty: 'intermediate',
    tags: ['diabetes', 'hypoglycemia', 'altered-mental-status', 'glucose']
  }
];