import { db } from "./db";
import { protocols } from "@shared/schema";

export async function seedClarkCountyProtocols() {
  console.log("Seeding Clark County EMS protocols...");

  const clarkCountyProtocols = [
    // Adult Treatment Protocols
    {
      name: "General Adult Assessment",
      category: "Adult Treatment",
      state: "Nevada",
      description: "Comprehensive assessment protocol for adult patients including initial evaluation, vital signs, and systematic examination procedures.",
      content: `
# General Adult Assessment Protocol

## Primary Assessment
- **Scene Safety**: Ensure scene is safe for providers and patient
- **General Impression**: Age, sex, position, distress level, chief complaint
- **Level of Consciousness**: Alert, responsive to verbal/painful stimuli, unresponsive
- **Airway**: Patent, maintainable, not maintainable
- **Breathing**: Present/absent, adequate/inadequate
- **Circulation**: Pulse present/absent, skin color/temperature/moisture
- **Disability**: Gross neurological assessment

## Secondary Assessment
- **Vital Signs**: Blood pressure, pulse, respirations, temperature, oxygen saturation
- **SAMPLE History**: 
  - S: Signs and symptoms
  - A: Allergies
  - M: Medications
  - P: Past medical history
  - L: Last oral intake
  - E: Events leading to illness/injury

## Reassessment
- **Stable patients**: Every 15 minutes
- **Unstable patients**: Every 5 minutes
- **Critical patients**: Continuously

## Documentation Requirements
- Complete patient care report
- All interventions and patient responses
- Vital signs with times
- Medication administration records
      `,
      scope: "EMT-B",
      filePath: "/protocols/clark-county/adult-assessment.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "General Adult Trauma Assessment",
      category: "Adult Treatment",
      state: "Nevada",
      description: "Systematic trauma assessment protocol for adult patients including mechanism of injury evaluation and trauma-specific examination.",
      content: `
# General Adult Trauma Assessment Protocol

## Mechanism of Injury Assessment
- **High-energy mechanisms**: Motor vehicle crashes, falls >20 feet, penetrating trauma
- **Moderate-energy mechanisms**: Falls 10-20 feet, bicycle crashes, sports injuries
- **Low-energy mechanisms**: Ground-level falls, minor collisions

## Primary Survey (ABCDE)
- **A**: Airway with C-spine control
- **B**: Breathing and ventilation
- **C**: Circulation with hemorrhage control
- **D**: Disability (neurologic assessment)
- **E**: Exposure/Environmental control

## Secondary Survey
- **Head-to-toe examination**
- **Neurological assessment**
- **Spinal immobilization considerations**
- **Extremity assessment**

## Trauma Triage Criteria
- **Red (Priority 1)**: Life-threatening injuries
- **Yellow (Priority 2)**: Urgent but not immediately life-threatening
- **Green (Priority 3)**: Minor injuries
- **Black (Priority 4)**: Deceased/expectant

## Transport Decisions
- **Trauma center**: Major trauma, penetrating injuries
- **Local ED**: Stable patients with minor trauma
- **Specialty center**: Burns, pediatric trauma
      `,
      scope: "EMT-B",
      filePath: "/protocols/clark-county/adult-trauma-assessment.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "Cardiac Arrest (Non-Traumatic)",
      category: "Adult Treatment",
      state: "Nevada",
      description: "Comprehensive cardiac arrest management protocol including CPR, defibrillation, and advanced life support interventions.",
      content: `
# Cardiac Arrest (Non-Traumatic) Protocol

## Immediate Actions
1. **Verify cardiac arrest**: Unresponsive, no breathing, no pulse
2. **Begin CPR**: 30:2 compression-ventilation ratio
3. **Attach AED/Monitor**: Analyze rhythm
4. **Establish IV/IO access**: For medication administration

## Rhythm Analysis
### Shockable Rhythms (VF/VT)
- **Defibrillate**: 200J biphasic
- **Resume CPR**: 2 minutes before rhythm check
- **Medications**: Epinephrine 1mg IV/IO every 3-5 minutes
- **Advanced**: Amiodarone 300mg IV/IO after 3rd shock

### Non-Shockable Rhythms (PEA/Asystole)
- **CPR**: Continuous high-quality compressions
- **Epinephrine**: 1mg IV/IO every 3-5 minutes
- **Reversible causes**: H's and T's

## H's and T's (Reversible Causes)
### H's
- Hypovolemia
- Hypoxia
- Hydrogen ion (acidosis)
- Hypo/hyperkalemia
- Hypothermia

### T's
- Tension pneumothorax
- Tamponade (cardiac)
- Toxins
- Thrombosis (coronary/pulmonary)

## Return of Spontaneous Circulation (ROSC)
- **Pulse check**: Every 2 minutes during CPR
- **Post-ROSC care**: Blood pressure support, 12-lead ECG
- **Transport**: To appropriate facility

## Termination of Resuscitation
- **Consider termination**: After 20 minutes of adequate ALS
- **Exceptions**: Hypothermia, overdose, pediatric
- **Medical control**: Contact required for termination
      `,
      scope: "Paramedic",
      filePath: "/protocols/clark-county/cardiac-arrest.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "Chest Pain (Non-Traumatic) and Suspected ACS",
      category: "Adult Treatment",
      state: "Nevada",
      description: "Acute coronary syndrome assessment and treatment protocol including 12-lead ECG interpretation and medication administration.",
      content: `
# Chest Pain (Non-Traumatic) and Suspected ACS Protocol

## Assessment
- **Pain characteristics**: Location, quality, radiation, severity (0-10)
- **Associated symptoms**: Shortness of breath, nausea, diaphoresis
- **Risk factors**: Age, diabetes, hypertension, smoking, family history
- **12-lead ECG**: Obtain within 10 minutes of patient contact

## Treatment
### All Patients
- **Oxygen**: If SpO2 <90% or respiratory distress
- **Aspirin**: 324mg PO (chewed) if no allergy
- **Nitroglycerin**: 0.4mg SL (patient's own or EMS)
- **IV access**: Establish in case of deterioration

### STEMI Criteria
- **ST elevation**: ≥2mm in consecutive leads
- **New LBBB**: In appropriate clinical setting
- **Posterior MI**: ST depression V1-V3 with tall R waves

### STEMI Treatment
- **Aspirin**: 324mg PO
- **Clopidogrel**: 600mg PO (if no contraindications)
- **Heparin**: Per protocol
- **Transport**: To PCI-capable facility

## Contraindications
### Nitroglycerin
- Systolic BP <90 mmHg
- Recent sildenafil use (24-48 hours)
- Right heart failure
- Severe aortic stenosis

### Aspirin
- Known allergy
- Active GI bleeding
- Severe asthma with aspirin sensitivity

## Destination
- **STEMI**: PCI-capable facility
- **High-risk ACS**: Facility with cardiology services
- **Low-risk chest pain**: Appropriate emergency department
      `,
      scope: "AEMT",
      filePath: "/protocols/clark-county/chest-pain-acs.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "Respiratory Distress",
      category: "Adult Treatment",
      state: "Nevada",
      description: "Comprehensive respiratory distress management including assessment, oxygen therapy, and medication administration.",
      content: `
# Respiratory Distress Protocol

## Assessment
- **Respiratory rate**: Normal 12-20/min
- **Oxygen saturation**: Target >94%
- **Work of breathing**: Accessory muscle use, retractions
- **Breath sounds**: Wheezes, crackles, diminished
- **Position**: Tripod position, inability to lie flat

## Causes
### Obstructive
- **Asthma**: Wheezing, prolonged expiration
- **COPD**: Barrel chest, pursed lip breathing
- **Foreign body**: Sudden onset, stridor

### Restrictive
- **Pneumonia**: Fever, productive cough, crackles
- **Pulmonary edema**: Pink frothy sputum, CHF history
- **Pneumothorax**: Sudden onset, diminished breath sounds

## Treatment
### Universal
- **Position**: Fowler's or position of comfort
- **Oxygen**: Titrate to SpO2 >94%
- **IV access**: For medication administration
- **Continuous monitoring**: ECG, SpO2, vitals

### Bronchospasm (Asthma/COPD)
- **Albuterol**: 2.5mg nebulized, repeat PRN
- **Ipratropium**: 0.5mg nebulized with albuterol
- **Methylprednisolone**: 125mg IV for severe cases

### Pulmonary Edema
- **Furosemide**: 40-80mg IV
- **Nitroglycerin**: 0.4mg SL, repeat q5min
- **CPAP**: If available and indicated

### Anaphylaxis
- **Epinephrine**: 0.3mg IM (0.15mg pediatric)
- **Diphenhydramine**: 25-50mg IV/IM
- **Methylprednisolone**: 125mg IV
- **Albuterol**: For bronchospasm

## Severe Respiratory Failure
- **Bag-mask ventilation**: If inadequate breathing
- **Intubation**: Consider for impending respiratory arrest
- **CPAP/BiPAP**: If available and appropriate
      `,
      scope: "AEMT",
      filePath: "/protocols/clark-county/respiratory-distress.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "Stroke (CVA)",
      category: "Adult Treatment",
      state: "Nevada",
      description: "Stroke assessment and management protocol including Cincinnati Stroke Scale and time-critical interventions.",
      content: `
# Stroke (CVA) Protocol

## Assessment Tools
### Cincinnati Stroke Scale
1. **Facial droop**: Ask patient to smile
2. **Arm drift**: Both arms up for 10 seconds
3. **Speech**: Ask patient to repeat phrase

### Los Angeles Prehospital Stroke Screen (LAPSS)
- Age >45 years
- No history of seizure disorder
- Symptom duration <24 hours
- Blood glucose 60-400 mg/dL
- Obvious asymmetry

## Signs and Symptoms
### Sudden Onset
- **Weakness**: Face, arm, or leg (especially unilateral)
- **Numbness**: Face, arm, or leg (especially unilateral)
- **Confusion**: Trouble speaking or understanding
- **Vision problems**: Double vision, visual field cuts
- **Severe headache**: "Worst headache of my life"
- **Dizziness**: With other neurologic symptoms

## Treatment
### All Patients
- **Airway management**: Protect airway, suction PRN
- **Oxygen**: If SpO2 <90%
- **IV access**: Normal saline at KVO rate
- **Blood glucose**: Check and treat if <60 mg/dL
- **Position**: Head elevated 30 degrees

### Hemorrhagic Stroke Considerations
- **Blood pressure**: Do NOT lower unless >220/120
- **Anticoagulants**: Avoid aspirin
- **Seizure precautions**: Have medications ready

### Ischemic Stroke
- **Aspirin**: 325mg PO (if no contraindications)
- **Time critical**: "Time is brain"
- **Last known well**: Document exact time

## Time Windows
- **Symptom onset**: Critical for treatment decisions
- **tPA window**: 3-4.5 hours from symptom onset
- **Thrombectomy**: Up to 24 hours in select cases
- **Door-to-needle**: Goal <60 minutes

## Contraindications to Aspirin
- Suspected hemorrhagic stroke
- Active bleeding
- Severe hypertension (>220/120)
- Recent surgery
- Anticoagulant use

## Transport
- **Stroke center**: Primary or comprehensive
- **Notify hospital**: Stroke alert activation
- **Rapid transport**: Minimize scene time
      `,
      scope: "EMT-B",
      filePath: "/protocols/clark-county/stroke-cva.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "Seizure",
      category: "Adult Treatment",
      state: "Nevada",
      description: "Seizure management protocol including status epilepticus treatment and post-ictal care.",
      content: `
# Seizure Protocol

## Types of Seizures
### Generalized Tonic-Clonic
- **Tonic phase**: Muscle rigidity, loss of consciousness
- **Clonic phase**: Rhythmic muscle contractions
- **Post-ictal**: Confusion, fatigue, altered mental status

### Focal Seizures
- **Simple focal**: Consciousness preserved
- **Complex focal**: Altered consciousness
- **Secondary generalization**: Focal becomes generalized

### Status Epilepticus
- **Definition**: Seizure >5 minutes or recurrent without recovery
- **Medical emergency**: Requires immediate treatment

## Assessment
- **Duration**: How long has seizure lasted?
- **Type**: Generalized vs focal
- **First seizure**: Or history of epilepsy
- **Precipitating factors**: Fever, hypoglycemia, trauma
- **Medications**: Antiepileptic compliance

## Treatment
### Active Seizure
- **Protect airway**: Position patient, suction PRN
- **Oxygen**: High-flow oxygen
- **IV access**: For medication administration
- **Blood glucose**: Check and treat if <60 mg/dL
- **Protect from injury**: Do not restrain

### Medications
#### First-line: Benzodiazepines
- **Lorazepam**: 2-4mg IV (may repeat once)
- **Midazolam**: 5-10mg IM/IV (may repeat once)
- **Diazepam**: 5-10mg IV (may repeat once)

#### Second-line: Status Epilepticus
- **Phenytoin**: 15-20mg/kg IV (max 1000mg)
- **Fosphenytoin**: 15-20mg PE/kg IV
- **Valproic acid**: 20-40mg/kg IV

### Post-Ictal Care
- **Positioning**: Recovery position
- **Oxygen**: Continue if indicated
- **Neurological assessment**: Level of consciousness
- **Glucose**: Recheck if initially low
- **Vital signs**: Monitor for complications

## Special Considerations
### Febrile Seizures (Pediatric)
- **Cooling measures**: Remove clothing, tepid sponging
- **Antipyretics**: Acetaminophen or ibuprofen
- **Usually benign**: But transport for evaluation

### Pregnancy
- **Eclampsia**: Seizure in pregnancy/postpartum
- **Magnesium sulfate**: 4-6g IV over 20 minutes
- **Left lateral position**: Prevent supine hypotension

### Hypoglycemic Seizure
- **Dextrose**: 25g IV (D50W)
- **Glucagon**: 1mg IM if no IV access
- **Thiamine**: 100mg IV (if malnourished)

## Transport
- **All new-onset seizures**: Require evaluation
- **Status epilepticus**: Immediate transport
- **Known epileptic**: Transport if prolonged or multiple
      `,
      scope: "AEMT",
      filePath: "/protocols/clark-county/seizure.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "Altered Mental Status/Syncope",
      category: "Adult Treatment",
      state: "Nevada",
      description: "Assessment and management of altered mental status and syncope including differential diagnosis and treatment.",
      content: `
# Altered Mental Status/Syncope Protocol

## Altered Mental Status Assessment
### AEIOU TIPS Mnemonic
- **A**: Alcohol, Acidosis
- **E**: Epilepsy, Endocrine, Electrolytes
- **I**: Insulin (hypoglycemia)
- **O**: Opiates, Oxygen (hypoxia)
- **U**: Uremia, Underdose/Overdose
- **T**: Trauma, Temperature, Toxins
- **I**: Infection
- **P**: Psychiatric, Poisoning
- **S**: Stroke, Shock, Seizure

## Syncope Assessment
### Causes
- **Vasovagal**: Most common, triggers identifiable
- **Cardiac**: Arrhythmias, structural heart disease
- **Orthostatic**: Volume depletion, medications
- **Neurologic**: Seizure, stroke, TIA

### Red Flags
- **Chest pain**: Cardiac cause
- **Shortness of breath**: PE, cardiac
- **Neurologic deficits**: Stroke, TIA
- **Family history**: Sudden cardiac death
- **Exertional syncope**: Cardiac cause

## Treatment
### Universal Care
- **ABCs**: Airway, breathing, circulation
- **Oxygen**: If SpO2 <90%
- **IV access**: Normal saline
- **Cardiac monitor**: Continuous ECG
- **Blood glucose**: Check and document

### Hypoglycemia (BG <60 mg/dL)
- **Dextrose**: 25g IV (D50W)
- **Glucagon**: 1mg IM if no IV access
- **Thiamine**: 100mg IV (if malnourished)
- **Reassess**: Mental status after glucose

### Suspected Overdose
- **Naloxone**: 0.4-2mg IV/IM/IN (opioid overdose)
- **Flumazenil**: Generally contraindicated
- **Activated charcoal**: Per poison control

### Alcohol Intoxication
- **Thiamine**: 100mg IV (prevent Wernicke's)
- **Glucose**: After thiamine administration
- **Observation**: For withdrawal symptoms

## Assessment Tools
### Glasgow Coma Scale
- **Eye opening**: 4 (spontaneous) to 1 (none)
- **Verbal response**: 5 (oriented) to 1 (none)
- **Motor response**: 6 (obeys commands) to 1 (none)

### AVPU Scale
- **A**: Alert
- **V**: Responsive to verbal stimuli
- **P**: Responsive to painful stimuli
- **U**: Unresponsive

## Special Considerations
### Psychiatric Causes
- **Safety**: Scene safety paramount
- **De-escalation**: Calm, non-threatening approach
- **Restraints**: Only if immediate danger
- **Medical clearance**: Rule out medical causes

### Stroke Mimics
- **Hypoglycemia**: Can mimic stroke symptoms
- **Seizure**: Post-ictal confusion
- **Migraine**: Can cause focal deficits
- **Conversion disorder**: Psychological cause

## Transport
- **All altered mental status**: Requires evaluation
- **Syncope**: Transport unless clearly vasovagal
- **Hypoglycemia**: Transport even if improved
      `,
      scope: "EMT-B",
      filePath: "/protocols/clark-county/altered-mental-status.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "Allergic Reaction",
      category: "Adult Treatment",
      state: "Nevada",
      description: "Allergic reaction and anaphylaxis management protocol including epinephrine administration and supportive care.",
      content: `
# Allergic Reaction Protocol

## Severity Classification
### Mild Allergic Reaction
- **Skin**: Urticaria, pruritus, mild swelling
- **Respiratory**: Minimal symptoms
- **Cardiovascular**: Stable vital signs
- **GI**: Mild nausea

### Moderate Allergic Reaction
- **Skin**: Widespread urticaria, angioedema
- **Respiratory**: Wheezing, mild dyspnea
- **Cardiovascular**: Tachycardia
- **GI**: Vomiting, diarrhea

### Severe Allergic Reaction (Anaphylaxis)
- **Skin**: Widespread urticaria, severe angioedema
- **Respiratory**: Severe bronchospasm, stridor
- **Cardiovascular**: Hypotension, shock
- **GI**: Severe cramping, vomiting

## Common Triggers
- **Foods**: Nuts, shellfish, dairy, eggs
- **Medications**: Antibiotics, NSAIDs, contrast
- **Insect stings**: Bees, wasps, hornets
- **Environmental**: Latex, pollen

## Treatment
### Mild Reactions
- **Diphenhydramine**: 25-50mg PO/IV/IM
- **Observation**: Monitor for progression
- **Remove trigger**: If identifiable

### Moderate Reactions
- **Diphenhydramine**: 25-50mg IV/IM
- **Methylprednisolone**: 125mg IV
- **Albuterol**: 2.5mg nebulized (if wheezing)
- **IV fluids**: Normal saline

### Severe Reactions (Anaphylaxis)
#### Immediate Actions
- **Epinephrine**: 0.3mg IM (0.15mg pediatric)
- **High-flow oxygen**: 15L non-rebreather
- **IV access**: Large bore, normal saline
- **Cardiac monitor**: Continuous ECG

#### Secondary Medications
- **Diphenhydramine**: 25-50mg IV/IM
- **Methylprednisolone**: 125mg IV
- **Albuterol**: 2.5mg nebulized
- **Fluid resuscitation**: 1-2L normal saline

#### Refractory Anaphylaxis
- **Epinephrine**: Repeat every 5-10 minutes
- **Epinephrine infusion**: 1-4 mcg/min
- **Vasopressors**: Dopamine, norepinephrine
- **Intubation**: If severe airway edema

## Epinephrine Administration
### Indications
- **Anaphylaxis**: Systemic allergic reaction
- **Severe bronchospasm**: With allergic reaction
- **Hypotension**: With allergic reaction
- **Stridor**: Upper airway edema

### Dosing
- **Adults**: 0.3mg IM (1:1000)
- **Pediatric**: 0.15mg IM (1:1000)
- **Auto-injector**: Follow device instructions
- **Repeat**: Every 5-10 minutes if needed

### Routes
- **Intramuscular**: Preferred route (vastus lateralis)
- **Subcutaneous**: Slower absorption
- **Intravenous**: Only in severe cases (1:10,000)

## Biphasic Reactions
- **Definition**: Recurrence 4-12 hours after initial reaction
- **Incidence**: 5-20% of anaphylaxis cases
- **Management**: All anaphylaxis patients need transport
- **Steroids**: May help prevent biphasic reactions

## Transport
- **All anaphylaxis**: Immediate transport
- **Moderate reactions**: Transport for observation
- **Mild reactions**: Consider transport based on history
      `,
      scope: "EMT-B",
      filePath: "/protocols/clark-county/allergic-reaction.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "Overdose/Poisoning",
      category: "Adult Treatment",
      state: "Nevada",
      description: "Overdose and poisoning management protocol including specific antidotes and supportive care measures.",
      content: `
# Overdose/Poisoning Protocol

## General Principles
- **ABCs**: Airway, breathing, circulation first
- **Decontamination**: Remove from source
- **Supportive care**: Maintain vital functions
- **Specific antidotes**: When available and indicated
- **Poison control**: 1-800-222-1222

## Common Overdoses
### Opioid Overdose
#### Signs/Symptoms
- **Respiratory depression**: Slow, shallow breathing
- **Altered mental status**: Stupor to coma
- **Miosis**: Pinpoint pupils
- **Hypotension**: Decreased blood pressure

#### Treatment
- **Naloxone**: 0.4-2mg IV/IM/IN
- **Airway management**: Bag-mask ventilation
- **Repeat dosing**: Every 2-3 minutes PRN
- **Duration**: Naloxone half-life 30-60 minutes

### Benzodiazepine Overdose
#### Signs/Symptoms
- **Sedation**: Drowsiness to coma
- **Respiratory depression**: Less common than opioids
- **Ataxia**: Unsteady gait
- **Confusion**: Altered mental status

#### Treatment
- **Flumazenil**: Generally contraindicated
- **Supportive care**: Airway management
- **Complications**: Seizures with chronic use

### Tricyclic Antidepressant Overdose
#### Signs/Symptoms
- **Anticholinergic**: Dry mouth, mydriasis, confusion
- **Cardiac**: Wide QRS, arrhythmias
- **Neurologic**: Seizures, coma
- **Hypotension**: Shock

#### Treatment
- **Sodium bicarbonate**: 1-2 mEq/kg IV
- **Seizure control**: Benzodiazepines
- **Avoid**: Class IA and IC antiarrhythmics

### Acetaminophen Overdose
#### Signs/Symptoms
- **Phase I (0-24h)**: Nausea, vomiting, malaise
- **Phase II (24-72h)**: Apparent recovery
- **Phase III (72-96h)**: Hepatotoxicity
- **Phase IV (4-14 days)**: Recovery or death

#### Treatment
- **N-acetylcysteine**: 140mg/kg PO loading dose
- **Activated charcoal**: If <4 hours post-ingestion
- **Supportive care**: Monitor hepatic function

## Specific Antidotes
### Alcohol Poisoning
- **Thiamine**: 100mg IV (prevent Wernicke's)
- **Glucose**: After thiamine
- **Supportive care**: Airway protection

### Carbon Monoxide
- **High-flow oxygen**: 100% via non-rebreather
- **Hyperbaric oxygen**: Consider for severe cases
- **Avoid**: Room air until COHb <5%

### Methanol/Ethylene Glycol
- **Ethanol**: Loading dose 0.6g/kg
- **Fomepizole**: 15mg/kg IV loading dose
- **Dialysis**: For severe cases

### Organophosphate Poisoning
- **Atropine**: 2-4mg IV, double until dry
- **Pralidoxime**: 1-2g IV over 15-30 minutes
- **Decontamination**: Remove clothing, wash skin

## Decontamination
### Dermal Exposure
- **Remove clothing**: Prevent further absorption
- **Copious irrigation**: Water for 15-20 minutes
- **Protect providers**: Appropriate PPE

### Ocular Exposure
- **Immediate irrigation**: Normal saline or water
- **Duration**: 15-20 minutes minimum
- **pH testing**: Until normal (7.4)

### Ingestion
- **Activated charcoal**: 1g/kg PO (if <1 hour)
- **Contraindications**: Altered mental status, caustics
- **Whole bowel irrigation**: For sustained-release drugs

## Transport
- **All overdoses**: Require hospital evaluation
- **Poison control**: Contact during transport
- **Supportive care**: Continue monitoring
      `,
      scope: "AEMT",
      filePath: "/protocols/clark-county/overdose-poisoning.pdf",
      fileType: "pdf",
      userId: 1
    }
  ];

  // Pediatric protocols
  const pediatricProtocols = [
    {
      name: "General Pediatric Assessment",
      category: "Pediatric Treatment",
      state: "Nevada",
      description: "Comprehensive pediatric assessment protocol including age-appropriate evaluation techniques and vital sign parameters.",
      content: `
# General Pediatric Assessment Protocol

## Age Classifications
- **Neonate**: 0-28 days
- **Infant**: 1-12 months
- **Toddler**: 1-3 years
- **Preschool**: 3-5 years
- **School age**: 6-12 years
- **Adolescent**: 13-18 years

## Pediatric Assessment Triangle (PAT)
### Appearance
- **Tone**: Limp vs normal muscle tone
- **Interactiveness**: Response to environment
- **Consolability**: Can be comforted
- **Look/gaze**: Eye contact and tracking
- **Speech/cry**: Age-appropriate sounds

### Work of Breathing
- **Abnormal sounds**: Stridor, grunting, wheezing
- **Abnormal positioning**: Tripod, sniffing
- **Retractions**: Subcostal, intercostal, suprasternal
- **Flaring**: Nasal flaring

### Circulation to Skin
- **Pallor**: Especially mucous membranes
- **Mottling**: Skin color pattern
- **Cyanosis**: Central vs peripheral

## Vital Signs by Age
### Neonate (0-28 days)
- **Heart rate**: 100-160 bpm
- **Respiratory rate**: 30-60/min
- **Systolic BP**: 60-90 mmHg

### Infant (1-12 months)
- **Heart rate**: 80-140 bpm
- **Respiratory rate**: 24-40/min
- **Systolic BP**: 70-100 mmHg

### Toddler (1-3 years)
- **Heart rate**: 80-130 bpm
- **Respiratory rate**: 20-30/min
- **Systolic BP**: 80-110 mmHg

### Preschool (3-5 years)
- **Heart rate**: 70-120 bpm
- **Respiratory rate**: 18-25/min
- **Systolic BP**: 85-115 mmHg

### School age (6-12 years)
- **Heart rate**: 60-100 bpm
- **Respiratory rate**: 16-20/min
- **Systolic BP**: 90-120 mmHg

## SAMPLE History (Modified for Pediatrics)
- **S**: Signs and symptoms
- **A**: Allergies
- **M**: Medications and immunizations
- **P**: Past medical history and birth history
- **L**: Last oral intake and last void
- **E**: Events leading to illness/injury

## Special Considerations
### Communication
- **Age-appropriate**: Use simple language
- **Caregiver involvement**: Include parents/guardians
- **Comfort items**: Allow security objects
- **Distraction techniques**: Toys, games

### Physical Examination
- **Least invasive first**: Observe before touching
- **Toe-to-head**: Reverse of adult examination
- **Caregiver's lap**: May be less threatening
- **Warm hands**: And stethoscope

## Common Pediatric Emergencies
### Respiratory
- **Croup**: Barking cough, stridor
- **Bronchiolitis**: Wheezing, fine crackles
- **Asthma**: Wheezing, prolonged expiration
- **Pneumonia**: Fever, crackles, increased WOB

### Cardiovascular
- **Congenital heart disease**: Cyanosis, murmurs
- **Myocarditis**: CHF symptoms, arrhythmias
- **Shock**: Tachycardia, delayed capillary refill

### Neurological
- **Febrile seizures**: Most common seizure type
- **Meningitis**: Fever, headache, stiff neck
- **Altered mental status**: Multiple etiologies

## Family-Centered Care
- **Include caregivers**: In assessment and treatment
- **Explain procedures**: Age-appropriate explanations
- **Comfort measures**: Allow caregiver presence
- **Cultural sensitivity**: Respect family values
      `,
      scope: "EMT-B",
      filePath: "/protocols/clark-county/pediatric-assessment.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "Pediatric Cardiac Arrest",
      category: "Pediatric Treatment",
      state: "Nevada",
      description: "Pediatric cardiac arrest management protocol including CPR techniques and medication dosing for children.",
      content: `
# Pediatric Cardiac Arrest Protocol

## Age Definitions
- **Infant**: <1 year
- **Child**: 1 year to puberty
- **Adolescent**: Puberty to adult

## CPR Techniques
### Infants (<1 year)
- **Compression technique**: 2 fingers or 2 thumb-encircling hands
- **Compression depth**: 1.5 inches (4 cm)
- **Compression rate**: 100-120/min
- **Ventilation**: 30:2 ratio (single rescuer), 15:2 (two rescuer)

### Children (1 year to puberty)
- **Compression technique**: Heel of one hand
- **Compression depth**: 2 inches (5 cm)
- **Compression rate**: 100-120/min
- **Ventilation**: 30:2 ratio (single rescuer), 15:2 (two rescuer)

## Rhythm Analysis
### Shockable Rhythms (VF/VT)
- **Defibrillation**: 2 J/kg (max 200J for manual)
- **AED**: Use pediatric pads if <8 years
- **Subsequent shocks**: 4 J/kg (max 200J)
- **Resume CPR**: 2 minutes between shocks

### Non-Shockable Rhythms (PEA/Asystole)
- **CPR**: High-quality chest compressions
- **Epinephrine**: 0.01 mg/kg IV/IO (max 1mg)
- **Repeat**: Every 3-5 minutes

## Medications
### Epinephrine
- **Dose**: 0.01 mg/kg IV/IO (0.1 mL/kg of 1:10,000)
- **Maximum**: 1 mg
- **Repeat**: Every 3-5 minutes
- **ET dose**: 0.1 mg/kg (0.1 mL/kg of 1:1,000)

### Amiodarone
- **Dose**: 5 mg/kg IV/IO
- **Maximum**: 300 mg
- **Indication**: Refractory VF/VT

### Lidocaine
- **Dose**: 1 mg/kg IV/IO
- **Alternative**: To amiodarone for VF/VT

## Airway Management
### Bag-Mask Ventilation
- **Rate**: 1 breath every 6 seconds during CPR
- **Tidal volume**: Visible chest rise
- **Oxygen**: 100% during cardiac arrest

### Advanced Airway
- **Intubation**: Consider if BVM ineffective
- **Size**: Age/4 + 4 (cuffed), Age/4 + 4.5 (uncuffed)
- **Confirmation**: Waveform capnography preferred

## Reversible Causes (H's and T's)
### H's
- **Hypovolemia**: Fluid bolus 20 mL/kg
- **Hypoxia**: Ensure adequate oxygenation
- **Hydrogen ion**: Sodium bicarbonate rarely indicated
- **Hypo/hyperkalemia**: Rare in pediatrics
- **Hypothermia**: Warm gradually

### T's
- **Tension pneumothorax**: Needle decompression
- **Tamponade**: Pericardiocentesis
- **Toxins**: Specific antidotes
- **Thrombosis**: Rare in pediatrics

## Special Considerations
### Neonatal Resuscitation
- **Temperature**: Maintain normothermia
- **Compressions**: 3:1 ratio with ventilations
- **Medications**: Epinephrine, volume expansion
- **Meconium**: Suction if non-vigorous

### SIDS/ALTE
- **Careful examination**: Look for signs of trauma
- **Family support**: Emotional care important
- **Investigation**: May require law enforcement

### Trauma
- **Hemorrhage**: Most common cause
- **Fluid resuscitation**: 20 mL/kg boluses
- **Blood products**: Consider early

## Family Presence
- **Allow**: Family presence during resuscitation
- **Support**: Provide emotional support
- **Facilitate**: Assign team member to family
- **Respect**: Cultural and religious practices

## Transport
- **Continue CPR**: During transport
- **Specialized center**: Pediatric-capable facility
- **Notification**: Early hospital notification
      `,
      scope: "Paramedic",
      filePath: "/protocols/clark-county/pediatric-cardiac-arrest.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "Pediatric Respiratory Distress",
      category: "Pediatric Treatment",
      state: "Nevada",
      description: "Pediatric respiratory distress management including age-specific assessment and treatment protocols.",
      content: `
# Pediatric Respiratory Distress Protocol

## Assessment
### Work of Breathing
- **Retractions**: Subcostal, intercostal, suprasternal
- **Nasal flaring**: Especially in infants
- **Grunting**: Expiratory sound
- **Stridor**: Inspiratory (upper airway)
- **Wheezing**: Expiratory (lower airway)

### Positioning
- **Tripod position**: Sitting, leaning forward
- **Sniffing position**: Neck extended
- **Refusal to lie down**: Significant finding

## Common Causes by Age
### Infants (0-1 year)
- **Bronchiolitis**: RSV, wheezing, crackles
- **Pneumonia**: Fever, tachypnea, grunting
- **Croup**: Barking cough, stridor
- **Foreign body**: Sudden onset

### Toddlers (1-3 years)
- **Croup**: Most common cause of stridor
- **Asthma**: Wheezing, prolonged expiration
- **Foreign body**: Choking, stridor
- **Pneumonia**: Fever, increased WOB

### School age (3+ years)
- **Asthma**: Most common cause
- **Pneumonia**: Bacterial more common
- **Anaphylaxis**: Severe allergic reaction

## Treatment
### Universal Care
- **Position**: Position of comfort
- **Oxygen**: If SpO2 <90% or distress
- **Avoid agitation**: Minimize procedures
- **Caregiver**: Keep with child if possible

### Croup
- **Cool mist**: Humidified oxygen
- **Dexamethasone**: 0.6 mg/kg PO/IV (max 10mg)
- **Racemic epinephrine**: 0.5 mL in 3 mL NS (severe)
- **Position**: Upright, position of comfort

### Asthma/Bronchospasm
- **Albuterol**: 2.5 mg (≤20 kg) or 5 mg (>20 kg) nebulized
- **Ipratropium**: 250 mcg nebulized with albuterol
- **Prednisolone**: 1-2 mg/kg PO (max 60 mg)
- **Continuous albuterol**: For severe cases

### Bronchiolitis
- **Supportive care**: Oxygen, hydration
- **Albuterol**: Trial dose (may not help)
- **Avoid**: Steroids (not effective)
- **Suction**: Nasal suction for infants

### Pneumonia
- **Oxygen**: For hypoxemia
- **Fever reduction**: Acetaminophen/ibuprofen
- **Hydration**: Encourage fluids
- **Antibiotics**: Hospital therapy

## Medication Dosing
### Albuterol
- **≤20 kg**: 2.5 mg nebulized
- **>20 kg**: 5 mg nebulized
- **Repeat**: Every 20 minutes for 3 doses
- **Continuous**: 10-20 mg/hour for severe

### Ipratropium
- **Dose**: 250 mcg nebulized
- **Frequency**: Every 20 minutes × 3 doses
- **Combination**: With albuterol

### Dexamethasone
- **Dose**: 0.6 mg/kg PO/IV
- **Maximum**: 10 mg
- **Indication**: Croup

### Racemic Epinephrine
- **Dose**: 0.5 mL in 3 mL normal saline
- **Indication**: Severe croup with stridor
- **Observation**: Monitor for rebound

## Respiratory Failure
### Signs
- **Decreased level of consciousness**
- **Cyanosis**: Central cyanosis
- **Bradycardia**: Ominous sign
- **Decreased breath sounds**
- **Weak cry**: In infants

### Management
- **Bag-mask ventilation**: 100% oxygen
- **Intubation**: Consider for failure
- **CPAP**: If available and appropriate
- **Positioning**: Sniffing position

## Transport
- **All moderate-severe**: Require transport
- **Mild asthma**: May improve with treatment
- **Croup**: Transport after racemic epinephrine
- **Continuous care**: Monitor during transport
      `,
      scope: "AEMT",
      filePath: "/protocols/clark-county/pediatric-respiratory.pdf",
      fileType: "pdf",
      userId: 1
    }
  ];

  // Operations protocols
  const operationsProtocols = [
    {
      name: "Do Not Resuscitate (DNR/POLST)",
      category: "Operations",
      state: "Nevada",
      description: "Protocol for handling Do Not Resuscitate orders and Physician Orders for Life-Sustaining Treatment.",
      content: `
# Do Not Resuscitate (DNR/POLST) Protocol

## Legal Framework
- **Nevada Revised Statutes**: Chapter 449
- **Valid DNR orders**: Must be properly executed
- **POLST forms**: Physician Orders for Life-Sustaining Treatment
- **Advance directives**: Living wills, healthcare proxies

## DNR Order Requirements
### Valid DNR Must Include:
- **Patient identification**: Full name, date of birth
- **Physician signature**: Attending physician
- **Date**: When order was written
- **Clear instructions**: Specific limitations
- **Witness**: Or notarization if required

### Invalid DNR Indicators:
- **Unclear instructions**: Ambiguous language
- **Missing signatures**: Physician or witness
- **Expired orders**: Check expiration date
- **Questionable authenticity**: Suspicious documents

## POLST Form Components
### Section A: Cardiopulmonary Resuscitation
- **Attempt resuscitation**: Full CPR
- **Do not attempt**: No CPR
- **Physician signature**: Required for validity

### Section B: Medical Interventions
- **Comfort measures**: Symptom relief only
- **Limited interventions**: Some treatment
- **Full interventions**: All treatments

### Section C: Antibiotics
- **Use antibiotics**: If indicated
- **Determine use**: Case-by-case basis
- **No antibiotics**: Comfort care only

## EMS Response
### When DNR is Present
1. **Verify validity**: Check all requirements
2. **Confirm identity**: Patient matches order
3. **Assess reversibility**: Treatable causes
4. **Contact medical control**: If questions arise
5. **Document thoroughly**: All findings and actions

### When DNR is Absent
- **Provide full care**: Until DNR located
- **Family statements**: Not legally binding
- **Physician orders**: Must be in writing
- **Continue resuscitation**: Until valid DNR found

## Special Situations
### Cardiac Arrest
- **Valid DNR**: Do not initiate CPR
- **Comfort measures**: Provide symptom relief
- **Family support**: Emotional care
- **Death determination**: Follow protocols

### Respiratory Distress
- **Oxygen therapy**: Generally acceptable
- **Ventilation**: May be limited by DNR
- **Comfort measures**: Pain relief, positioning
- **Medical control**: Consult for guidance

### Trauma
- **Mechanism**: May override DNR
- **Accidental injury**: Treat per protocol
- **Reversible causes**: Consider treatment
- **Case-by-case**: Individualized decisions

## Comfort Care Measures
### Symptom Management
- **Pain relief**: Morphine, other analgesics
- **Anxiety**: Anxiolytics if available
- **Nausea**: Antiemetics
- **Positioning**: Patient comfort

### Family Support
- **Emotional care**: Compassionate presence
- **Explanation**: Of comfort measures
- **Grief support**: Initial counseling
- **Referral**: To appropriate resources

## Documentation
### Required Elements
- **DNR verification**: How validity confirmed
- **Patient condition**: Assessment findings
- **Interventions**: All care provided
- **Family interaction**: Conversations held
- **Medical control**: Any consultations

### Legal Considerations
- **Accurate documentation**: Detailed records
- **Witness signatures**: For verbal orders
- **Time stamps**: All critical events
- **Continuation**: Of care provided

## Medical Control
### When to Contact
- **Questionable validity**: Unclear orders
- **Family disagreement**: Conflicts arise
- **Reversible causes**: Treatable conditions
- **Ethical concerns**: Difficult decisions

### Information to Provide
- **Patient condition**: Current status
- **DNR details**: Specific limitations
- **Family input**: Concerns or conflicts
- **Your assessment**: Clinical findings

## Transport Decisions
### DNR Patients
- **Comfort transport**: For symptom management
- **Family wishes**: Consider preferences
- **Hospital capability**: Palliative care services
- **Continuity**: Of established care

### Non-Transport
- **Death determination**: If appropriate
- **Family support**: Grief counseling
- **Referral**: To hospice or funeral home
- **Documentation**: Complete records
      `,
      scope: "EMT-B",
      filePath: "/protocols/clark-county/dnr-polst.pdf",
      fileType: "pdf",
      userId: 1
    },
    {
      name: "Trauma Field Triage Criteria",
      category: "Operations",
      state: "Nevada",
      description: "Field triage criteria for trauma patients including transport destination decisions and trauma center activation.",
      content: `
# Trauma Field Triage Criteria Protocol

## Triage Decision Scheme
### Step 1: Physiologic Criteria
- **Glasgow Coma Scale**: ≤13
- **Systolic blood pressure**: <90 mmHg
- **Respiratory rate**: <10 or >29/min
- **Revised Trauma Score**: ≤12

### Step 2: Anatomic Criteria
- **Penetrating injuries**: Head, neck, torso, extremities
- **Chest wall instability**: Flail chest
- **Two or more proximal long-bone fractures**
- **Crushed, degloved, or mangled extremity**
- **Amputation**: Proximal to wrist/ankle
- **Pelvic fractures**: Unstable
- **Open or depressed skull fracture**
- **Paralysis**: Spinal cord injury

### Step 3: Mechanism of Injury
- **Falls**: Adults >20 feet, children >10 feet
- **High-risk auto crash**: Intrusion >12 inches
- **Auto vs pedestrian**: Thrown, run over, >20 mph
- **Motorcycle crash**: >20 mph
- **Ejection**: From automobile

### Step 4: Special Considerations
- **Age**: >55 years
- **Pregnancy**: >20 weeks
- **Anticoagulation**: Warfarin, heparin
- **Burns**: With trauma
- **Time-sensitive extremity injury**

## Transport Destinations
### Trauma Center (Level I/II)
- **Any Step 1 criteria**: Physiologic compromise
- **Any Step 2 criteria**: Anatomic injury
- **High-risk mechanisms**: Step 3 criteria
- **Special populations**: Step 4 criteria

### Regional Hospital
- **Stable patients**: Minor trauma
- **Isolated extremity**: Fractures
- **Low-risk mechanisms**: Ground-level falls
- **Patient preference**: If appropriate

### Specialty Centers
- **Burn center**: Major burns
- **Pediatric trauma**: Children <15 years
- **Spinal cord**: Paralysis
- **Replantation**: Amputations

## Trauma Team Activation
### Full Activation
- **Physiologic criteria**: Vital sign abnormalities
- **Anatomic criteria**: Major injuries
- **Mechanism**: High-energy transfer
- **EMS judgment**: Clinical concern

### Modified Activation
- **Moderate mechanisms**: Lower energy
- **Isolated injuries**: Single system
- **Stable patients**: Normal vital signs
- **Age factors**: Elderly patients

## Assessment Priorities
### Primary Survey (ABCDE)
- **A**: Airway with C-spine control
- **B**: Breathing and ventilation
- **C**: Circulation with hemorrhage control
- **D**: Disability (neurologic)
- **E**: Exposure and environment

### Secondary Survey
- **Head-to-toe**: Systematic examination
- **Vital signs**: Frequent monitoring
- **Neurologic**: Detailed assessment
- **Diagnostics**: 12-lead ECG if indicated

## Prehospital Interventions
### Airway Management
- **Manual techniques**: Jaw thrust, chin lift
- **Adjuncts**: OPA, NPA
- **Advanced**: Intubation if needed
- **C-spine**: Maintain immobilization

### Breathing Support
- **Oxygen**: High-flow if indicated
- **Ventilation**: Bag-mask if needed
- **Decompression**: Tension pneumothorax
- **Seal**: Open pneumothorax

### Circulation
- **Hemorrhage control**: Direct pressure
- **IV access**: Two large-bore IVs
- **Fluid resuscitation**: Balanced approach
- **Shock position**: If appropriate

### Disability
- **Spinal immobilization**: Full c-spine
- **Neurologic assessment**: GCS, pupils
- **Extremity**: Splinting, alignment
- **Pain management**: Appropriate analgesia

## Special Populations
### Pediatric Trauma
- **Different criteria**: Lower thresholds
- **Mechanism**: Height adjusted
- **Anatomy**: Proportional differences
- **Destination**: Pediatric-capable facility

### Geriatric Trauma
- **Lower thresholds**: Frail patients
- **Medications**: Anticoagulants
- **Comorbidities**: Multiple conditions
- **Complications**: Higher risk

### Pregnancy
- **Mother first**: Maternal resuscitation
- **Positioning**: Left lateral tilt
- **Monitoring**: Fetal heart tones
- **Delivery**: Consider field delivery

## Documentation
### Required Elements
- **Mechanism**: Detailed description
- **Injuries**: Anatomic findings
- **Vital signs**: Serial measurements
- **Interventions**: All treatments
- **Response**: Patient improvement

### Triage Justification
- **Criteria met**: Specific indicators
- **Clinical judgment**: EMS assessment
- **Transport decision**: Destination choice
- **Time factors**: Critical intervals

## Quality Improvement
### Trauma Registry
- **Data collection**: Standardized reporting
- **Outcome tracking**: Patient follow-up
- **System evaluation**: Performance metrics
- **Feedback**: Continuous improvement

### Overtriage vs Undertriage
- **Overtriage**: Acceptable 25-50%
- **Undertriage**: Should be <5%
- **Balance**: Sensitivity vs specificity
- **Monitoring**: Continuous assessment
      `,
      scope: "EMT-B",
      filePath: "/protocols/clark-county/trauma-triage.pdf",
      fileType: "pdf",
      userId: 1
    }
  ];

  // Combine all protocols
  const allProtocols = [...clarkCountyProtocols, ...pediatricProtocols, ...operationsProtocols];

  // Insert protocols into database
  for (const protocol of allProtocols) {
    await db.insert(protocols).values(protocol);
  }

  console.log(`Successfully seeded ${allProtocols.length} Clark County EMS protocols`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedClarkCountyProtocols()
    .then(() => {
      console.log("Clark County protocols seeding completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error seeding Clark County protocols:", error);
      process.exit(1);
    });
}