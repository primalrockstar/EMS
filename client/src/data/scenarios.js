export const scenarios = [
    {
        id: '1',
        title: 'Adult Cardiac Arrest',
        category: 'Cardiac Emergencies',
        tags: ['cardiac', 'adult', 'cpr', 'aed'],
        difficulty: 'beginner',
        narrative: 'You arrive at a scene where a 45-year-old male is found unresponsive on the floor. Bystanders report he suddenly collapsed 3 minutes ago while watching TV. He is not breathing and has no pulse.',
        decisions: [
            {
                question: 'What is your immediate first action?',
                options: ['Check for responsiveness', 'Start chest compressions', 'Check airway', 'Call for AED'],
                correct: 'Start chest compressions',
                feedback: 'Immediate chest compressions are critical in cardiac arrest. High-quality CPR should begin within 10 seconds of recognizing cardiac arrest.'
            },
            {
                question: 'What is the correct compression rate for adult CPR?',
                options: ['80-100 per minute', '100-120 per minute', '120-140 per minute', '60-80 per minute'],
                correct: '100-120 per minute',
                feedback: 'The AHA recommends 100-120 compressions per minute for effective circulation during CPR.'
            },
            {
                question: 'An AED arrives. What should you do?',
                options: ['Continue CPR', 'Immediately attach pads', 'Check pulse first', 'Give rescue breaths'],
                correct: 'Immediately attach pads',
                feedback: 'AED should be applied as soon as available. Early defibrillation is crucial for survival in shockable rhythms.'
            },
            {
                question: 'The AED advises "Shock advised." What do you do?',
                options: ['Continue compressions', 'Ensure everyone is clear and deliver shock', 'Check pulse', 'Give rescue breaths'],
                correct: 'Ensure everyone is clear and deliver shock',
                feedback: 'Always ensure no one is touching the patient before delivering a shock. Safety first!'
            }
        ]
    },
    {
        id: '2',
        title: 'Pediatric Respiratory Distress',
        category: 'Pediatric Emergencies',
        tags: ['pediatric', 'respiratory', 'asthma', 'children'],
        difficulty: 'intermediate',
        narrative: 'You respond to a call for a 6-year-old child having difficulty breathing. The child is sitting upright, using accessory muscles, and has audible wheezing. The mother states the child has a history of asthma.',
        decisions: [
            {
                question: 'What is your priority assessment?',
                options: ['Take vital signs', 'Assess airway, breathing, circulation', 'Get medical history', 'Start oxygen'],
                correct: 'Assess airway, breathing, circulation',
                feedback: 'Primary assessment (ABCs) always comes first, especially with respiratory distress. This will guide immediate treatment needs.'
            },
            {
                question: 'The child is alert but anxious with increased work of breathing. What position is best?',
                options: ['Supine', 'Trendelenburg', 'Position of comfort', 'Prone'],
                correct: 'Position of comfort',
                feedback: 'Allow the child to remain in position of comfort. Forcing a position can increase anxiety and worsen breathing.'
            },
            {
                question: 'What is the most appropriate initial treatment?',
                options: ['Albuterol via nebulizer', 'Bag-mask ventilation', 'Oral corticosteroids', 'Epinephrine'],
                correct: 'Albuterol via nebulizer',
                feedback: 'Albuterol (beta-2 agonist) is first-line treatment for bronchospasm in asthma exacerbations.'
            },
            {
                question: 'After treatment, the child shows improvement but still has mild wheezing. What next?',
                options: ['Discharge home', 'Transport for evaluation', 'Give another albuterol treatment', 'Call parents'],
                correct: 'Transport for evaluation',
                feedback: 'Children with asthma exacerbations should be transported for medical evaluation, even if improved, to prevent rebound symptoms.'
            }
        ]
    },
    {
        id: '3',
        title: 'Trauma Assessment',
        category: 'Trauma',
        tags: ['trauma', 'assessment', 'c-spine', 'bleeding'],
        difficulty: 'advanced',
        narrative: 'You arrive at a motor vehicle collision. A 30-year-old male driver is conscious but complaining of neck pain and has a laceration on his forehead that is bleeding moderately.',
        decisions: [
            {
                question: 'What is your first priority?',
                options: ['Stop the bleeding', 'Immobilize the cervical spine', 'Get patient history', 'Check vitals'],
                correct: 'Immobilize the cervical spine',
                feedback: 'C-spine immobilization is the priority in trauma with mechanism of injury and neck pain complaints.'
            },
            {
                question: 'How do you control the forehead bleeding while maintaining c-spine?',
                options: ['Direct pressure with gauze', 'Pressure point', 'Tourniquet', 'Elevation only'],
                correct: 'Direct pressure with gauze',
                feedback: 'Direct pressure is the first-line method for bleeding control. Can be applied while maintaining c-spine precautions.'
            },
            {
                question: 'The patient asks to get out of the car. What do you do?',
                options: ['Let him get out carefully', 'Keep him in place with c-spine immobilization', 'Help him out quickly', 'Check for other injuries first'],
                correct: 'Keep him in place with c-spine immobilization',
                feedback: 'Maintain c-spine immobilization until injury is ruled out. Movement could cause spinal cord injury.'
            },
            {
                question: 'Patient becomes agitated about staying still. How do you respond?',
                options: ['Restrain the patient', 'Explain the importance calmly', 'Sedate the patient', 'Let him move slightly'],
                correct: 'Explain the importance calmly',
                feedback: 'Patient education and reassurance are key. Explain why immobilization is necessary for their safety.'
            }
        ]
    },
    {
        id: '4',
        title: 'Anaphylactic Reaction',
        category: 'Allergic Reactions',
        tags: ['anaphylaxis', 'allergic-reaction', 'epinephrine', 'airway'],
        difficulty: 'intermediate',
        narrative: 'A 25-year-old woman develops hives, swelling of her face and lips, and difficulty breathing after eating at a restaurant. She has a history of severe peanut allergy.',
        decisions: [
            {
                question: 'What is your immediate assessment priority?',
                options: ['Check blood pressure', 'Assess airway and breathing', 'Get allergy history', 'Start IV'],
                correct: 'Assess airway and breathing',
                feedback: 'Airway compromise is the most life-threatening aspect of anaphylaxis. This must be assessed immediately.'
            },
            {
                question: 'The patient has facial swelling and wheezing. What is the first-line treatment?',
                options: ['Albuterol', 'Epinephrine', 'Diphenhydramine', 'Corticosteroids'],
                correct: 'Epinephrine',
                feedback: 'Epinephrine is the first-line treatment for anaphylaxis. It reverses bronchospasm and vascular permeability.'
            },
            {
                question: 'What route should epinephrine be given?',
                options: ['Intramuscular', 'Intravenous', 'Subcutaneous', 'Sublingual'],
                correct: 'Intramuscular',
                feedback: 'IM epinephrine (typically in the thigh) is the preferred route for anaphylaxis treatment.'
            },
            {
                question: 'After epinephrine, the patient improves but then symptoms return. What do you do?',
                options: ['Wait and monitor', 'Give second dose of epinephrine', 'Give diphenhydramine only', 'Transport immediately'],
                correct: 'Give second dose of epinephrine',
                feedback: 'Biphasic reactions are common. A second dose of epinephrine may be needed if symptoms return or persist.'
            }
        ]
    },
    {
        id: '5',
        title: 'Stroke Assessment',
        category: 'Neurological',
        tags: ['stroke', 'cva', 'neurological', 'fast'],
        difficulty: 'intermediate',
        narrative: 'You respond to a 68-year-old male who suddenly developed weakness on his right side and difficulty speaking. His wife noticed symptoms started about 30 minutes ago.',
        decisions: [
            {
                question: 'What assessment tool should you use first?',
                options: ['Glasgow Coma Scale', 'Cincinnati Stroke Scale', 'SAMPLE history', 'Vital signs'],
                correct: 'Cincinnati Stroke Scale',
                feedback: 'Cincinnati Stroke Scale (FAST) is the rapid assessment tool for stroke recognition in the field.'
            },
            {
                question: 'The patient has facial droop and arm weakness. What is critical to determine?',
                options: ['Blood pressure', 'Time of symptom onset', 'Medical history', 'Blood glucose'],
                correct: 'Time of symptom onset',
                feedback: 'Time of onset is critical for stroke center treatment decisions. Thrombolytic therapy is time-dependent.'
            },
            {
                question: 'Should you give the patient anything by mouth?',
                options: ['Water if thirsty', 'Aspirin', 'Nothing by mouth', 'Glucose tablet'],
                correct: 'Nothing by mouth',
                feedback: 'NPO (nothing by mouth) is essential due to potential swallowing difficulties and aspiration risk in stroke patients.'
            },
            {
                question: 'What is the transport priority?',
                options: ['Closest hospital', 'Stroke center', 'Trauma center', 'Patient choice'],
                correct: 'Stroke center',
                feedback: 'Stroke centers have specialized capabilities for rapid stroke treatment including thrombolytic therapy.'
            }
        ]
    }
];
