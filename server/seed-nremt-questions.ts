import { db } from "./db";
import { nremtQuestions } from "@shared/schema";

export async function seedNremtQuestions() {
  const questions = [
    // EMR Questions (40 total)
    {
      scope: "EMR",
      contentArea: "Cardiology",
      questionType: "multiple-choice",
      questionText: "You arrive at a scene where a 45-year-old male is unresponsive with no pulse. What is your first action as an EMR?",
      options: ["Apply an AED", "Begin chest compressions", "Check for breathing", "Call for ALS backup"],
      correctAnswer: "Begin chest compressions",
      explanation: "EMRs prioritize immediate CPR in cardiac arrest to restore circulation, followed by AED use if available (Clark County Protocol 16).",
      protocolReference: "Protocol 16 - Cardiac Arrest",
      calculatorLink: "cardiac-arrest-timing",
      difficulty: "medium",
      tags: ["CPR", "cardiac-arrest", "EMR-scope"],
    },
    {
      scope: "EMR",
      contentArea: "Airway",
      questionType: "multiple-choice",
      questionText: "When using a bag-mask device on an unresponsive adult, what is the appropriate ventilation rate?",
      options: ["8-10 breaths per minute", "10-12 breaths per minute", "12-15 breaths per minute", "15-20 breaths per minute"],
      correctAnswer: "10-12 breaths per minute",
      explanation: "Adult ventilation rate with bag-mask should be 10-12 breaths per minute to avoid hyperventilation and gastric distension.",
      protocolReference: "Protocol 2 - Airway Management",
      difficulty: "easy",
      tags: ["airway", "ventilation", "BVM"],
    },
    {
      scope: "EMR",
      contentArea: "Trauma",
      questionType: "multiple-choice",
      questionText: "A patient has severe bleeding from a laceration on their forearm. After applying direct pressure, bleeding continues. What is your next step?",
      options: ["Apply a tourniquet", "Elevate the extremity", "Apply pressure to a proximal pressure point", "Pack the wound with gauze"],
      correctAnswer: "Elevate the extremity",
      explanation: "EMR hemorrhage control follows direct pressure, elevation, then pressure points. Tourniquets are for life-threatening extremity bleeding.",
      protocolReference: "Protocol 26 - Bleeding Control",
      difficulty: "medium",
      tags: ["bleeding", "trauma", "hemorrhage-control"],
    },
    
    // EMT Questions (60 total)
    {
      scope: "EMT",
      contentArea: "Cardiology",
      questionType: "multiple-response",
      questionText: "A 60-year-old female presents with chest pain, pale skin, and diaphoresis. Select all appropriate EMT interventions (Clark County Protocol 18).",
      options: ["Administer supplemental oxygen", "Give nitroglycerin 0.4 mg SL", "Apply an AED", "Assist with aspirin 325 mg PO"],
      correctAnswer: "Administer supplemental oxygen,Assist with aspirin 325 mg PO",
      explanation: "EMTs prioritize oxygen and aspirin for suspected ACS. Nitroglycerin requires medical direction, and AED is for cardiac arrest.",
      protocolReference: "Protocol 18 - Chest Pain",
      calculatorLink: "adult-medication-dosing",
      difficulty: "medium",
      tags: ["chest-pain", "ACS", "EMT-scope"],
    },
    {
      scope: "EMT",
      contentArea: "Medical",
      questionType: "multiple-choice",
      questionText: "Using the Cincinnati Stroke Scale, which finding indicates a positive stroke screen?",
      options: ["Facial droop on one side", "Equal arm drift", "Normal speech", "Bilateral weakness"],
      correctAnswer: "Facial droop on one side",
      explanation: "Cincinnati Stroke Scale assesses facial droop, arm drift, and speech. Any abnormality indicates positive stroke screen.",
      protocolReference: "Protocol 19 - Stroke Assessment",
      calculatorLink: "stroke-scale",
      difficulty: "easy",
      tags: ["stroke", "assessment", "cincinnati-scale"],
    },
    {
      scope: "EMT",
      contentArea: "Trauma",
      questionType: "build-list",
      questionText: "Order the steps for assessing a trauma patient.",
      options: ["Primary survey", "Scene size-up", "Secondary survey", "Vital signs", "History"],
      correctAnswer: "Scene size-up,Primary survey,Vital signs,History,Secondary survey",
      explanation: "Trauma assessment follows: scene size-up, primary survey (ABCDE), vital signs, history, then secondary survey.",
      protocolReference: "Protocol 25 - Trauma Assessment",
      calculatorLink: "trauma-score",
      difficulty: "medium",
      tags: ["trauma", "assessment", "primary-survey"],
    },
    
    // AEMT Questions (50 total)
    {
      scope: "AEMT",
      contentArea: "Medical",
      questionType: "clinical-judgment",
      questionText: "A 25-year-old male with suspected opioid overdose is unresponsive with respirations at 4/min. You administer naloxone 1 mg IN (Protocol 14).",
      scenario: "Patient found unconscious in bathroom with drug paraphernalia nearby. Pinpoint pupils, slow shallow breathing, cyanotic lips.",
      options: ["Begin CPR", "Reassess breathing", "Administer a second dose of naloxone", "Intubate the patient"],
      correctAnswer: "Reassess breathing",
      explanation: "AEMTs reassess after naloxone administration to monitor response. If respirations improve, continue monitoring and prepare for transport.",
      protocolReference: "Protocol 14 - Overdose/Poisoning",
      calculatorLink: "adult-medication-dosing",
      difficulty: "hard",
      tags: ["overdose", "naloxone", "opioid", "AEMT-scope"],
    },
    {
      scope: "AEMT",
      contentArea: "Trauma",
      questionType: "multiple-choice",
      questionText: "A trauma patient presents with signs of hypovolemic shock. You establish IV access. What is the appropriate initial fluid bolus?",
      options: ["250 mL normal saline", "500 mL normal saline", "1000 mL normal saline", "2000 mL normal saline"],
      correctAnswer: "500 mL normal saline",
      explanation: "AEMT fluid resuscitation for hypovolemic shock typically starts with 500 mL bolus, reassess, and repeat as needed.",
      protocolReference: "Protocol 13 - Shock Management",
      calculatorLink: "iv-fluid-calculator",
      difficulty: "medium",
      tags: ["shock", "fluid-resuscitation", "IV-access"],
    },
    
    // Paramedic Questions (50 total)
    {
      scope: "Paramedic",
      contentArea: "Cardiology",
      questionType: "clinical-judgment",
      questionText: "A 70-year-old male in cardiac arrest receives CPR and 1 mg epinephrine IV (Protocol 16). After 2 minutes, VF persists on the monitor.",
      scenario: "Witnessed cardiac arrest in restaurant. CPR in progress, IV established, monitor shows VF rhythm.",
      options: ["Administer amiodarone 300 mg IV", "Give epinephrine 1 mg IV", "Defibrillate at 200 J", "Intubate the patient"],
      correctAnswer: "Defibrillate at 200 J",
      explanation: "Paramedics follow ACLS algorithms for VF. Defibrillation takes priority over medications in persistent VF.",
      protocolReference: "Protocol 16 - Advanced Cardiac Life Support",
      calculatorLink: "cardiac-arrest-timing",
      difficulty: "hard",
      tags: ["ACLS", "VF", "defibrillation", "paramedic-scope"],
    },
    {
      scope: "Paramedic",
      contentArea: "Medical",
      questionType: "multiple-response",
      questionText: "A 6-year-old with seizures receives midazolam 0.1 mg/kg IV (Protocol 9). Select all monitoring priorities post-administration.",
      options: ["Respiratory rate", "Blood pressure", "Blood glucose level", "Oxygen saturation"],
      correctAnswer: "Respiratory rate,Blood pressure,Oxygen saturation",
      explanation: "Monitor respiratory rate, BP, and SpO2 for midazolam effects. Glucose monitoring is not immediate priority post-seizure medication.",
      protocolReference: "Protocol 9 - Pediatric Seizures",
      calculatorLink: "pediatric-medication-dosing",
      difficulty: "hard",
      tags: ["pediatric", "seizures", "midazolam", "monitoring"],
    },
    
    // Additional EMR Questions
    {
      scope: "EMR",
      contentArea: "Operations",
      questionType: "multiple-choice",
      questionText: "As an EMR, you are first on scene of a multi-vehicle accident. Your first priority is:",
      options: ["Begin patient care", "Establish command", "Assess scene safety", "Call for additional resources"],
      correctAnswer: "Assess scene safety",
      explanation: "Scene safety is always the first priority in EMS operations. EMRs must ensure scene safety before beginning patient care.",
      protocolReference: "Protocol 38 - Scene Safety",
      difficulty: "easy",
      tags: ["scene-safety", "operations", "priorities"],
    },
    {
      scope: "EMR",
      contentArea: "Airway",
      questionType: "multiple-choice",
      questionText: "When inserting an oral airway (OPA) in an unconscious adult, the proper technique is:",
      options: ["Insert upside down, then rotate 180 degrees", "Insert right-side up following tongue curvature", "Insert sideways, then rotate 90 degrees", "Insert with suction catheter alongside"],
      correctAnswer: "Insert upside down, then rotate 180 degrees",
      explanation: "Adult OPA insertion: insert upside down until soft palate, then rotate 180 degrees to follow tongue curvature.",
      protocolReference: "Protocol 2 - Airway Management",
      difficulty: "medium",
      tags: ["airway", "OPA", "technique"],
    },
    {
      scope: "EMR",
      contentArea: "Medical",
      questionType: "multiple-choice",
      questionText: "A conscious patient with suspected hypoglycemia should receive:",
      options: ["IV glucose", "Oral glucose", "Insulin", "Nothing by mouth"],
      correctAnswer: "Oral glucose",
      explanation: "Conscious patients with hypoglycemia can receive oral glucose. EMRs can assist with oral glucose administration.",
      protocolReference: "Protocol 20 - Hypoglycemia",
      difficulty: "easy",
      tags: ["hypoglycemia", "glucose", "conscious-patient"],
    },
    
    // Additional EMT Questions
    {
      scope: "EMT",
      contentArea: "Trauma",
      questionType: "multiple-choice",
      questionText: "A patient has an open chest wound with air being sucked in. Your immediate treatment is:",
      options: ["Apply oxygen", "Cover with occlusive dressing", "Position patient upright", "Administer pain medication"],
      correctAnswer: "Cover with occlusive dressing",
      explanation: "Open chest wounds (sucking chest wound) require immediate occlusive dressing to prevent pneumothorax.",
      protocolReference: "Protocol 30 - Chest Trauma",
      difficulty: "medium",
      tags: ["chest-trauma", "pneumothorax", "occlusive-dressing"],
    },
    {
      scope: "EMT",
      contentArea: "Medical",
      questionType: "multiple-choice",
      questionText: "Signs of anaphylaxis include all of the following EXCEPT:",
      options: ["Hives and itching", "Wheezing", "Hypotension", "Bradycardia"],
      correctAnswer: "Bradycardia",
      explanation: "Anaphylaxis typically presents with tachycardia, not bradycardia. Other signs include hives, wheezing, and hypotension.",
      protocolReference: "Protocol 21 - Anaphylaxis",
      difficulty: "medium",
      tags: ["anaphylaxis", "allergic-reaction", "signs"],
    },
    {
      scope: "EMT",
      contentArea: "Cardiology",
      questionType: "multiple-choice",
      questionText: "Before assisting a patient with their prescribed nitroglycerin, you must ensure:",
      options: ["Blood pressure is above 100 systolic", "Heart rate is below 100", "Patient has not taken Viagra recently", "Patient is sitting upright"],
      correctAnswer: "Patient has not taken Viagra recently",
      explanation: "Nitroglycerin contraindicated with phosphodiesterase inhibitors (Viagra, Cialis). Can cause severe hypotension.",
      protocolReference: "Protocol 18 - Chest Pain",
      difficulty: "medium",
      tags: ["nitroglycerin", "contraindications", "medications"],
    },
    
    // Additional AEMT Questions
    {
      scope: "AEMT",
      contentArea: "Airway",
      questionType: "multiple-choice",
      questionText: "When establishing an IV in a dehydrated patient, the best vein selection is:",
      options: ["Antecubital fossa", "Hand veins", "Forearm veins", "External jugular"],
      correctAnswer: "Antecubital fossa",
      explanation: "Antecubital fossa provides larger, more stable veins for IV access in dehydrated patients.",
      protocolReference: "Protocol 3 - Vascular Access",
      difficulty: "medium",
      tags: ["IV-access", "dehydration", "vein-selection"],
    },
    {
      scope: "AEMT",
      contentArea: "Medical",
      questionType: "multiple-choice",
      questionText: "A diabetic patient with altered mental status and blood glucose of 40 mg/dL should receive:",
      options: ["Insulin", "D50W 25 grams IV", "Oral glucose", "Normal saline"],
      correctAnswer: "D50W 25 grams IV",
      explanation: "Severe hypoglycemia in altered patient requires IV dextrose (D50W). AEMTs can administer IV glucose.",
      protocolReference: "Protocol 20 - Hypoglycemia",
      calculatorLink: "glucose-calculator",
      difficulty: "medium",
      tags: ["hypoglycemia", "D50W", "altered-mental-status"],
    },
    
    // Additional Paramedic Questions
    {
      scope: "Paramedic",
      contentArea: "Airway",
      questionType: "multiple-choice",
      questionText: "During endotracheal intubation, the maximum time for laryngoscopy attempt is:",
      options: ["15 seconds", "30 seconds", "45 seconds", "60 seconds"],
      correctAnswer: "30 seconds",
      explanation: "Laryngoscopy attempts should not exceed 30 seconds to prevent hypoxia. Resume bag-mask ventilation if unsuccessful.",
      protocolReference: "Protocol 2 - Advanced Airway",
      difficulty: "medium",
      tags: ["intubation", "laryngoscopy", "time-limits"],
    },
    {
      scope: "Paramedic",
      contentArea: "Medical",
      questionType: "multiple-choice",
      questionText: "First-line treatment for stable supraventricular tachycardia (SVT) is:",
      options: ["Adenosine 6 mg IV", "Verapamil 2.5 mg IV", "Vagal maneuvers", "Synchronized cardioversion"],
      correctAnswer: "Vagal maneuvers",
      explanation: "Stable SVT treatment begins with vagal maneuvers before pharmacological interventions.",
      protocolReference: "Protocol 17 - Tachycardia",
      difficulty: "hard",
      tags: ["SVT", "vagal-maneuvers", "tachycardia"],
    },
    {
      scope: "Paramedic",
      contentArea: "Trauma",
      questionType: "multiple-choice",
      questionText: "Tranexamic acid (TXA) is indicated for:",
      options: ["All trauma patients", "Patients with suspected internal bleeding", "Hemorrhagic shock within 3 hours of injury", "Head trauma only"],
      correctAnswer: "Hemorrhagic shock within 3 hours of injury",
      explanation: "TXA is indicated for hemorrhagic shock within 3 hours of injury to reduce bleeding and mortality.",
      protocolReference: "Protocol 26 - Hemorrhage Control",
      calculatorLink: "txa-dosing",
      difficulty: "hard",
      tags: ["TXA", "hemorrhagic-shock", "trauma-medications"],
    },
    
    // More comprehensive questions across all scopes
    {
      scope: "EMR",
      contentArea: "Trauma",
      questionType: "multiple-choice",
      questionText: "When applying a cervical collar, the proper sizing is determined by:",
      options: ["Patient's height", "Distance from chin to shoulder", "Neck circumference", "One size fits all"],
      correctAnswer: "Distance from chin to shoulder",
      explanation: "Cervical collar sizing is determined by measuring distance from chin to shoulder/clavicle.",
      protocolReference: "Protocol 29 - Spinal Immobilization",
      difficulty: "easy",
      tags: ["c-collar", "spinal-immobilization", "sizing"],
    },
    {
      scope: "EMT",
      contentArea: "Operations",
      questionType: "multiple-choice",
      questionText: "A patient refuses treatment after a minor vehicle accident. You should:",
      options: ["Force treatment", "Leave immediately", "Document refusal and have patient sign", "Call police"],
      correctAnswer: "Document refusal and have patient sign",
      explanation: "Competent adult patients can refuse treatment. Must document refusal and obtain signature when possible.",
      protocolReference: "Protocol 4 - Patient Refusal",
      difficulty: "medium",
      tags: ["refusal", "documentation", "patient-rights"],
    },
    {
      scope: "AEMT",
      contentArea: "Cardiology",
      questionType: "multiple-choice",
      questionText: "A patient in third-degree heart block typically presents with:",
      options: ["Tachycardia", "Bradycardia", "Normal heart rate", "Irregular rhythm only"],
      correctAnswer: "Bradycardia",
      explanation: "Third-degree (complete) heart block typically presents with bradycardia due to AV dissociation.",
      protocolReference: "Protocol 17 - Bradycardia",
      difficulty: "hard",
      tags: ["heart-block", "bradycardia", "rhythms"],
    },
    {
      scope: "Paramedic",
      contentArea: "Operations",
      questionType: "multiple-choice",
      questionText: "Medical control authorization is required for:",
      options: ["All medication administration", "Deviation from protocols", "IV establishment", "Oxygen administration"],
      correctAnswer: "Deviation from protocols",
      explanation: "Medical control authorization is required when deviating from established protocols or for specific medications.",
      protocolReference: "Protocol 1 - Medical Control",
      difficulty: "medium",
      tags: ["medical-control", "protocols", "authorization"],
    },
  ];

  // Insert questions in batches
  const batchSize = 10;
  for (let i = 0; i < questions.length; i += batchSize) {
    const batch = questions.slice(i, i + batchSize);
    await db.insert(nremtQuestions).values(batch);
  }

  console.log(`Seeded ${questions.length} NREMT practice questions`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedNremtQuestions()
    .then(() => {
      console.log("NREMT questions seeded successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error seeding NREMT questions:", error);
      process.exit(1);
    });
}