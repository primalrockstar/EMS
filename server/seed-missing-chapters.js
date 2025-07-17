import { db } from './db';
import { studyNotes } from '../shared/schema';
const missingChapters = [
    {
        chapterNumber: 7,
        title: "Life Span Development",
        content: "Life span development examines the physical, cognitive, and psychosocial changes that occur throughout human life. Understanding developmental stages helps EMTs provide age-appropriate care and communication.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["development", "life span", "age groups"],
        keyPoints: [
            "Infancy (0-1 year): Rapid growth, fontanelles, stranger anxiety",
            "Toddler (1-3 years): Walking, language development, separation anxiety",
            "Preschool (3-6 years): Improved coordination, magical thinking",
            "School age (6-12 years): Concrete thinking, peer influence",
            "Adolescence (13-18 years): Identity formation, risk-taking behavior",
            "Early adulthood (19-40 years): Peak physical condition, career focus",
            "Middle adulthood (41-60 years): Physical changes, chronic conditions",
            "Late adulthood (60+ years): Multiple health issues, medication use"
        ],
        objectives: [
            "Describe the physical and cognitive changes in each life stage",
            "Explain appropriate communication strategies for different age groups",
            "Identify common medical concerns for each developmental stage",
            "Understand the impact of development on emergency care"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 8,
        title: "Lifting and Moving Patients",
        content: "Proper lifting and moving techniques are essential for preventing injury to both patients and EMTs. Understanding body mechanics, equipment use, and patient positioning ensures safe patient transport.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["lifting", "moving", "body mechanics", "safety"],
        keyPoints: [
            "Power grip: Palms and fingers in complete contact with object",
            "Power lift: Straight back, bent knees, weight close to body",
            "Keep back straight and locked during lifts",
            "Communicate clearly with partner during moves",
            "Use proper number of people for lift",
            "Emergency moves: Immediate danger to patient or EMT",
            "Urgent moves: Treatment requires repositioning",
            "Non-urgent moves: No immediate threat, normal precautions"
        ],
        objectives: [
            "Demonstrate proper lifting techniques to prevent injury",
            "Explain when to use emergency, urgent, and non-urgent moves",
            "Describe proper body mechanics for patient movement",
            "Identify equipment used for patient transport"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 9,
        title: "The Team Approach to Healthcare",
        content: "Healthcare delivery requires coordination among multiple professionals. EMTs must understand their role within the healthcare team and work effectively with other providers.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["healthcare team", "coordination", "communication"],
        keyPoints: [
            "Primary care providers: Family physicians, internists, pediatricians",
            "Emergency department staff: Physicians, nurses, technicians",
            "Specialists: Cardiologists, surgeons, psychiatrists",
            "Allied health professionals: Respiratory therapists, social workers",
            "Public safety: Police, fire, rescue personnel",
            "Effective communication is essential for patient care",
            "Professional boundaries and scope of practice",
            "Continuity of care from scene to hospital"
        ],
        objectives: [
            "Identify members of the healthcare team",
            "Explain the role of EMTs within the healthcare system",
            "Describe effective communication strategies",
            "Understand professional boundaries and scope of practice"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 10,
        title: "Patient Assessment",
        content: "Systematic patient assessment is the foundation of emergency care. The assessment process includes scene size-up, primary assessment, history taking, secondary assessment, and reassessment.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["assessment", "primary assessment", "secondary assessment"],
        keyPoints: [
            "Scene size-up: Safety, number of patients, mechanism of injury",
            "Primary assessment: Life-threatening conditions first",
            "XABCDE approach: eXsanguinating hemorrhage, Airway, Breathing, Circulation, Disability, Exposure",
            "History taking: SAMPLE (Signs/Symptoms, Allergies, Medications, Past history, Last meal, Events)",
            "Secondary assessment: Systematic physical examination",
            "Reassessment: Ongoing monitoring of patient condition",
            "Vital signs: Blood pressure, pulse, respirations, temperature",
            "Mental status assessment: AVPU scale"
        ],
        objectives: [
            "Perform a systematic patient assessment",
            "Identify life-threatening conditions in primary assessment",
            "Obtain an accurate patient history",
            "Conduct appropriate physical examination techniques"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 11,
        title: "Airway Management",
        content: "Airway management is the highest priority in emergency care. Understanding airway anatomy, assessment techniques, and interventions is critical for patient survival.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["airway", "breathing", "ventilation", "oxygenation"],
        keyPoints: [
            "Anatomy: Upper airway (nose, mouth, pharynx, larynx) and lower airway (trachea, bronchi, lungs)",
            "Assessment: Look, listen, feel for breathing",
            "Opening techniques: Head-tilt chin-lift, jaw thrust",
            "Airway adjuncts: Oral airway, nasal airway",
            "Suction: Remove secretions, vomit, blood",
            "Oxygen delivery: Nasal cannula, non-rebreather mask, bag-valve mask",
            "Ventilation: Mouth-to-mouth, bag-valve mask, mechanical ventilation",
            "Special considerations: Pediatric, geriatric, trauma patients"
        ],
        objectives: [
            "Identify signs of airway obstruction",
            "Demonstrate proper airway opening techniques",
            "Use airway adjuncts appropriately",
            "Provide effective ventilation and oxygenation"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 12,
        title: "Principles of Pharmacology",
        content: "Pharmacology is the study of drugs and their effects on the body. EMTs must understand basic pharmacological principles to safely administer medications within their scope of practice.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["pharmacology", "medications", "drug administration"],
        keyPoints: [
            "Drug names: Generic, trade, chemical names",
            "Drug forms: Tablet, capsule, liquid, gas, topical",
            "Routes of administration: Oral, sublingual, intravenous, intramuscular, subcutaneous, inhalation, topical",
            "Pharmacokinetics: Absorption, distribution, metabolism, excretion",
            "Pharmacodynamics: How drugs affect the body",
            "Therapeutic effects: Desired drug actions",
            "Side effects: Undesired but expected effects",
            "Adverse reactions: Harmful, unexpected effects",
            "Contraindications: Conditions where drug should not be used",
            "Drug interactions: Effects when multiple drugs are used"
        ],
        objectives: [
            "Define basic pharmacological terms",
            "Explain routes of drug administration",
            "Describe factors affecting drug action",
            "Identify contraindications and adverse reactions"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 13,
        title: "Shock",
        content: "Shock is inadequate tissue perfusion that can lead to cellular death. Understanding the pathophysiology, types, and treatment of shock is essential for EMT practice.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["shock", "perfusion", "hypoperfusion", "circulation"],
        keyPoints: [
            "Definition: Inadequate tissue perfusion and oxygenation",
            "Pathophysiology: Decreased cardiac output, vascular problems, blood/fluid loss",
            "Types: Cardiogenic, hypovolemic, distributive (septic, anaphylactic, neurogenic)",
            "Compensated shock: Body maintains blood pressure",
            "Decompensated shock: Blood pressure drops, organs fail",
            "Signs and symptoms: Altered mental status, rapid pulse, cool/clammy skin, decreased blood pressure",
            "Treatment: Airway management, oxygen, positioning, fluid replacement, rapid transport",
            "Pediatric considerations: Children compensate well initially but decompensate rapidly"
        ],
        objectives: [
            "Define shock and its underlying pathophysiology",
            "Identify the different types of shock",
            "Recognize signs and symptoms of shock",
            "Implement appropriate treatment for shock patients"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 14,
        title: "BLS Resuscitation",
        content: "Basic Life Support (BLS) resuscitation includes CPR, AED use, and foreign body airway obstruction management. These skills are fundamental to emergency care.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["BLS", "CPR", "AED", "resuscitation"],
        keyPoints: [
            "Chain of survival: Early recognition, early CPR, early defibrillation, early advanced care",
            "Adult CPR: 30 compressions to 2 breaths, rate 100-120/min, depth 2-2.4 inches",
            "Pediatric CPR: 30:2 for one rescuer, 15:2 for two rescuers",
            "Infant CPR: Two-finger technique, depth 1.5 inches",
            "AED use: Automated external defibrillator for ventricular fibrillation/tachycardia",
            "Foreign body airway obstruction: Back blows, abdominal thrusts (Heimlich maneuver)",
            "Recovery position: Unconscious breathing patients",
            "Termination of resuscitation: Medical control, family wishes, safety concerns"
        ],
        objectives: [
            "Demonstrate proper CPR technique for all age groups",
            "Operate an AED safely and effectively",
            "Manage foreign body airway obstruction",
            "Understand when to initiate and terminate resuscitation"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 15,
        title: "Medical Overview",
        content: "Medical emergencies encompass a wide range of conditions affecting body systems. Understanding common medical conditions and their management is essential for EMT practice.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["medical emergencies", "pathophysiology", "assessment"],
        keyPoints: [
            "Nature of illness: Determine what's wrong with the patient",
            "Chief complaint: Patient's primary concern in their own words",
            "History of present illness: Onset, provocation, quality, region, severity, timing",
            "Assessment approach: Look for patterns, consider differential diagnosis",
            "Common medical conditions: Respiratory, cardiovascular, neurological, endocrine",
            "Medication history: Current medications, allergies, compliance",
            "Environmental factors: Temperature, toxins, infectious agents",
            "Psychosocial factors: Stress, mental health, substance abuse"
        ],
        objectives: [
            "Conduct systematic assessment of medical patients",
            "Identify common medical emergencies",
            "Obtain relevant medical history",
            "Recognize life-threatening medical conditions"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 16,
        title: "Respiratory Emergencies",
        content: "Respiratory emergencies are common in EMS and can be life-threatening. Understanding respiratory anatomy, pathophysiology, and treatment is crucial for patient care.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["respiratory", "breathing", "dyspnea", "hypoxia"],
        keyPoints: [
            "Anatomy: Upper and lower airway structures, muscles of respiration",
            "Physiology: Ventilation, gas exchange, oxygen transport",
            "Pathophysiology: Airway obstruction, impaired ventilation, impaired gas exchange",
            "Common conditions: Asthma, COPD, pneumonia, pulmonary edema, pneumothorax",
            "Assessment: Inspection, palpation, auscultation, vital signs",
            "Signs of respiratory distress: Dyspnea, tachypnea, accessory muscle use, cyanosis",
            "Treatment: Airway management, oxygen therapy, positioning, medications",
            "Pediatric considerations: Smaller airways, higher oxygen demand"
        ],
        objectives: [
            "Identify signs and symptoms of respiratory distress",
            "Recognize common respiratory emergencies",
            "Provide appropriate airway management",
            "Administer oxygen therapy effectively"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 17,
        title: "Cardiovascular Emergencies",
        content: "Cardiovascular emergencies include acute coronary syndromes, heart failure, and cardiac arrest. Understanding cardiac anatomy and pathophysiology is essential for EMT practice.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["cardiovascular", "cardiac", "heart attack", "ACS"],
        keyPoints: [
            "Anatomy: Heart chambers, valves, coronary arteries, electrical system",
            "Physiology: Cardiac cycle, blood flow, electrical conduction",
            "Acute coronary syndrome: Unstable angina, STEMI, NSTEMI",
            "Signs and symptoms: Chest pain, dyspnea, diaphoresis, nausea",
            "Heart failure: Left-sided, right-sided, acute vs. chronic",
            "Cardiac arrest: Ventricular fibrillation, asystole, PEA",
            "Treatment: Oxygen, aspirin, nitroglycerin, morphine, rapid transport",
            "AED use: Early defibrillation for shockable rhythms"
        ],
        objectives: [
            "Recognize signs and symptoms of acute coronary syndrome",
            "Provide appropriate treatment for cardiac emergencies",
            "Understand indications for cardiac medications",
            "Perform effective cardiac resuscitation"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 18,
        title: "Neurologic Emergencies",
        content: "Neurologic emergencies affect the brain, spinal cord, and peripheral nerves. Understanding neurological anatomy and common conditions is important for EMT practice.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["neurologic", "stroke", "seizure", "altered mental status"],
        keyPoints: [
            "Anatomy: Central nervous system (brain, spinal cord), peripheral nervous system",
            "Pathophysiology: Ischemia, hemorrhage, infection, trauma, metabolic disorders",
            "Stroke: Ischemic (thrombotic, embolic), hemorrhagic",
            "Stroke assessment: Cincinnati Stroke Scale, FAST assessment",
            "Seizures: Generalized, partial, status epilepticus",
            "Altered mental status: Hypoglycemia, hypoxia, toxins, infection",
            "Headache: Tension, migraine, cluster, secondary causes",
            "Treatment: Airway management, oxygen, glucose, positioning, rapid transport"
        ],
        objectives: [
            "Recognize signs and symptoms of stroke",
            "Assess patients with altered mental status",
            "Manage seizure patients appropriately",
            "Understand time-sensitive nature of neurologic emergencies"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 19,
        title: "Gastrointestinal and Urologic Emergencies",
        content: "Gastrointestinal and urologic emergencies can present with abdominal pain, bleeding, or systemic symptoms. Understanding these conditions helps EMTs provide appropriate care.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["gastrointestinal", "urologic", "abdominal pain", "bleeding"],
        keyPoints: [
            "GI anatomy: Esophagus, stomach, small intestine, large intestine, liver, pancreas",
            "Urologic anatomy: Kidneys, ureters, bladder, urethra",
            "Acute abdomen: Sudden onset of severe abdominal pain",
            "Common GI conditions: Appendicitis, bowel obstruction, GI bleeding, ulcers",
            "Urologic conditions: Kidney stones, urinary tract infections, renal failure",
            "Assessment: History, physical examination, vital signs",
            "Signs and symptoms: Pain, nausea, vomiting, diarrhea, fever",
            "Treatment: Positioning, IV fluids, pain management, rapid transport"
        ],
        objectives: [
            "Assess patients with abdominal pain",
            "Recognize signs of GI bleeding",
            "Understand common urologic emergencies",
            "Provide supportive care for GI/urologic patients"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 20,
        title: "Endocrine and Hematologic Emergencies",
        content: "Endocrine and hematologic emergencies involve hormonal imbalances and blood disorders. Understanding diabetes, thyroid disorders, and blood conditions is important for EMTs.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["endocrine", "hematologic", "diabetes", "blood disorders"],
        keyPoints: [
            "Endocrine system: Hormones, glands, feedback mechanisms",
            "Diabetes: Type 1, Type 2, gestational",
            "Hypoglycemia: Low blood sugar, altered mental status, diaphoresis",
            "Hyperglycemia: High blood sugar, dehydration, ketoacidosis",
            "Thyroid disorders: Hyperthyroidism, hypothyroidism, thyroid storm",
            "Hematologic disorders: Anemia, sickle cell disease, hemophilia",
            "Assessment: Blood glucose testing, vital signs, mental status",
            "Treatment: Glucose administration, supportive care, rapid transport"
        ],
        objectives: [
            "Recognize signs and symptoms of diabetic emergencies",
            "Perform blood glucose testing",
            "Understand thyroid emergency presentations",
            "Manage patients with hematologic disorders"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 21,
        title: "Allergy and Anaphylaxis",
        content: "Allergic reactions range from mild to life-threatening anaphylaxis. Understanding the immune response and treatment of allergic emergencies is crucial for EMTs.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["allergy", "anaphylaxis", "immune response", "epinephrine"],
        keyPoints: [
            "Immune system: Antibodies, antigens, hypersensitivity reactions",
            "Types of reactions: Local, systemic, anaphylactic",
            "Common allergens: Foods, medications, insect stings, latex",
            "Pathophysiology: Histamine release, vasodilation, increased permeability",
            "Signs and symptoms: Urticaria, angioedema, bronchospasm, hypotension",
            "Anaphylaxis: Rapid onset, life-threatening, multisystem involvement",
            "Treatment: Epinephrine, oxygen, IV fluids, antihistamines, steroids",
            "Prevention: Avoidance, medical alert jewelry, action plans"
        ],
        objectives: [
            "Differentiate between mild and severe allergic reactions",
            "Recognize signs and symptoms of anaphylaxis",
            "Administer epinephrine appropriately",
            "Provide supportive care for allergic patients"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 22,
        title: "Toxicology",
        content: "Toxicologic emergencies involve poisoning from various substances. Understanding toxicology principles and antidotes helps EMTs manage poisoned patients effectively.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["toxicology", "poisoning", "overdose", "antidotes"],
        keyPoints: [
            "Routes of exposure: Ingestion, inhalation, absorption, injection",
            "Toxidromes: Characteristic signs and symptoms of poison classes",
            "Common poisons: Alcohol, drugs, household products, plants, carbon monoxide",
            "Assessment: History of exposure, physical examination, vital signs",
            "Decontamination: Removal from source, skin/eye irrigation",
            "Antidotes: Naloxone (opioids), flumazenil (benzodiazepines), activated charcoal",
            "Supportive care: Airway management, oxygen, IV fluids, monitoring",
            "Prevention: Education, poison control centers, safety measures"
        ],
        objectives: [
            "Identify common toxidromes",
            "Provide appropriate decontamination",
            "Administer antidotes when indicated",
            "Recognize signs of specific poisonings"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 23,
        title: "Behavioral Health Emergencies",
        content: "Behavioral health emergencies involve psychiatric conditions and mental health crises. Understanding mental health disorders and crisis intervention is important for EMTs.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["behavioral", "mental health", "psychiatric", "crisis"],
        keyPoints: [
            "Mental health continuum: Normal stress to severe mental illness",
            "Common disorders: Depression, anxiety, bipolar, schizophrenia, PTSD",
            "Crisis situations: Suicidal ideation, psychosis, agitation, violence",
            "Risk factors: Substance abuse, trauma, medical conditions, medications",
            "Assessment: Mental status exam, suicide risk, danger to others",
            "De-escalation techniques: Calm demeanor, active listening, respect",
            "Legal considerations: Involuntary commitment, patient rights, documentation",
            "Safety: Scene safety, restraints, law enforcement involvement"
        ],
        objectives: [
            "Recognize signs of mental health emergencies",
            "Use appropriate de-escalation techniques",
            "Assess suicide risk factors",
            "Understand legal aspects of psychiatric emergencies"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 24,
        title: "Gynecologic Emergencies",
        content: "Gynecologic emergencies affect the female reproductive system. Understanding these conditions helps EMTs provide appropriate care for women's health emergencies.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["gynecologic", "reproductive", "women's health", "bleeding"],
        keyPoints: [
            "Anatomy: External and internal reproductive organs",
            "Menstrual cycle: Phases, hormonal changes, normal variations",
            "Vaginal bleeding: Menorrhagia, metrorrhagia, postmenopausal bleeding",
            "Pelvic pain: Ovarian cysts, pelvic inflammatory disease, endometriosis",
            "Sexual assault: Medical care, evidence preservation, emotional support",
            "Pregnancy-related emergencies: Ectopic pregnancy, miscarriage, preeclampsia",
            "Assessment: History, physical examination, vital signs, privacy",
            "Treatment: Supportive care, pain management, emotional support, transport"
        ],
        objectives: [
            "Assess patients with gynecologic emergencies",
            "Recognize signs of serious gynecologic conditions",
            "Provide appropriate care for sexual assault victims",
            "Maintain patient privacy and dignity"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 25,
        title: "Trauma Overview",
        content: "Trauma is a leading cause of death and disability. Understanding trauma mechanisms, assessment, and management principles is fundamental to EMT practice.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["trauma", "injury", "mechanism", "assessment"],
        keyPoints: [
            "Epidemiology: Leading cause of death in young adults",
            "Mechanism of injury: Blunt, penetrating, blast, thermal",
            "Kinematics: Energy transfer, deceleration, cavitation",
            "Trauma assessment: Primary survey, secondary survey, reassessment",
            "Golden hour: Time-sensitive nature of trauma care",
            "Triage: Prioritizing patients based on injury severity",
            "Trauma centers: Designation levels, appropriate transport",
            "Prevention: Education, legislation, engineering, enforcement"
        ],
        objectives: [
            "Understand trauma epidemiology and prevention",
            "Recognize high-energy mechanisms of injury",
            "Perform systematic trauma assessment",
            "Understand trauma center designation and transport decisions"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 26,
        title: "Bleeding",
        content: "Bleeding control is a fundamental skill in emergency care. Understanding hemorrhage classification and control techniques is essential for EMTs.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["bleeding", "hemorrhage", "hemostasis", "shock"],
        keyPoints: [
            "Circulatory system: Heart, blood vessels, blood components",
            "Hemostasis: Platelet plug formation, coagulation cascade",
            "Classification: Arterial, venous, capillary bleeding",
            "Severity: Mild, moderate, severe hemorrhage",
            "External bleeding control: Direct pressure, elevation, pressure points, tourniquet",
            "Internal bleeding: Signs, symptoms, shock management",
            "Complications: Hypovolemic shock, infection, compartment syndrome",
            "Special considerations: Anticoagulant medications, bleeding disorders"
        ],
        objectives: [
            "Classify types and severity of bleeding",
            "Demonstrate proper bleeding control techniques",
            "Recognize signs of internal bleeding",
            "Manage patients with severe hemorrhage"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 27,
        title: "Soft-Tissue Injuries",
        content: "Soft-tissue injuries affect the skin, muscles, and underlying structures. Understanding wound types and management is important for EMT practice.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["soft tissue", "wounds", "skin", "infection"],
        keyPoints: [
            "Skin anatomy: Epidermis, dermis, subcutaneous tissue",
            "Functions: Protection, temperature regulation, sensation",
            "Wound classification: Closed (contusions, hematomas), open (abrasions, lacerations, punctures, avulsions)",
            "Assessment: Mechanism, location, size, depth, contamination",
            "Wound care: Cleaning, irrigation, dressing, bandaging",
            "Infection prevention: Sterile technique, antibiotics, tetanus prophylaxis",
            "Special wounds: Crush injuries, degloving, amputations",
            "Complications: Infection, scarring, loss of function"
        ],
        objectives: [
            "Classify different types of soft-tissue injuries",
            "Provide appropriate wound care",
            "Prevent infection in wound management",
            "Recognize complications of soft-tissue injuries"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 28,
        title: "Face and Neck Injuries",
        content: "Face and neck injuries can be life-threatening due to airway compromise. Understanding anatomy and management of these injuries is crucial for EMTs.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["face", "neck", "airway", "bleeding"],
        keyPoints: [
            "Anatomy: Facial bones, muscles, nerves, blood vessels",
            "Airway concerns: Obstruction, bleeding, swelling, fractures",
            "Facial fractures: Mandible, maxilla, zygoma, nasal, orbital",
            "Soft tissue injuries: Lacerations, abrasions, avulsions",
            "Eye injuries: Corneal abrasions, foreign bodies, chemical burns",
            "Neck injuries: Penetrating wounds, cervical spine concerns",
            "Assessment: Airway patency, breathing, circulation, neurologic function",
            "Treatment: Airway management, bleeding control, spinal immobilization"
        ],
        objectives: [
            "Recognize life-threatening face and neck injuries",
            "Manage airway complications from facial trauma",
            "Provide appropriate care for eye injuries",
            "Control bleeding from facial wounds"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 29,
        title: "Head and Spine Injuries",
        content: "Head and spine injuries can result in permanent disability or death. Understanding neurological anatomy and spinal immobilization is essential for EMTs.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["head injury", "spine", "neurologic", "immobilization"],
        keyPoints: [
            "Neuroanatomy: Brain, spinal cord, meninges, cerebrospinal fluid",
            "Head injuries: Scalp wounds, skull fractures, brain injuries",
            "Brain injuries: Concussion, contusion, hemorrhage, increased ICP",
            "Spinal injuries: Vertebrae, spinal cord, nerve roots",
            "Mechanisms: Flexion, extension, rotation, compression, distraction",
            "Assessment: Neurologic examination, spinal clearance criteria",
            "Spinal immobilization: Cervical collar, backboard, strapping",
            "Complications: Herniation, paralysis, autonomic dysreflexia"
        ],
        objectives: [
            "Recognize signs of head and spine injuries",
            "Perform neurologic assessment",
            "Implement proper spinal immobilization",
            "Manage increased intracranial pressure"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 30,
        title: "Chest Injuries",
        content: "Chest injuries can be immediately life-threatening. Understanding thoracic anatomy and injury patterns is crucial for EMT practice.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["chest", "thoracic", "pneumothorax", "hemothorax"],
        keyPoints: [
            "Anatomy: Ribs, sternum, lungs, heart, great vessels",
            "Mechanisms: Blunt, penetrating, blast, compression",
            "Pneumothorax: Simple, tension, open (sucking chest wound)",
            "Hemothorax: Blood in pleural space, shock potential",
            "Flail chest: Multiple rib fractures, paradoxical movement",
            "Cardiac tamponade: Blood in pericardial sac, Beck's triad",
            "Assessment: Inspection, palpation, auscultation, vital signs",
            "Treatment: Airway management, oxygen, chest seal, needle decompression"
        ],
        objectives: [
            "Recognize life-threatening chest injuries",
            "Assess breathing and circulation in chest trauma",
            "Provide appropriate treatment for pneumothorax",
            "Manage flail chest and cardiac tamponade"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 31,
        title: "Abdominal and Genitourinary Injuries",
        content: "Abdominal and genitourinary injuries can cause significant internal bleeding. Understanding these injuries and their management is important for EMTs.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["abdominal", "genitourinary", "internal bleeding", "organs"],
        keyPoints: [
            "Anatomy: Solid organs (liver, spleen, kidneys), hollow organs (stomach, intestines, bladder)",
            "Mechanisms: Blunt, penetrating, compression, deceleration",
            "Solid organ injuries: Liver, spleen, kidney lacerations",
            "Hollow organ injuries: Perforation, contamination, peritonitis",
            "Genitourinary injuries: Kidney, bladder, urethra, external genitalia",
            "Assessment: Inspection, palpation, vital signs, shock signs",
            "Evisceration: Bowel protrusion, moist sterile dressing",
            "Treatment: Shock management, rapid transport, supportive care"
        ],
        objectives: [
            "Recognize signs of abdominal trauma",
            "Assess for internal bleeding",
            "Manage evisceration appropriately",
            "Provide care for genitourinary injuries"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 32,
        title: "Orthopedic Injuries",
        content: "Orthopedic injuries affect bones, joints, and soft tissues. Understanding fracture types and immobilization techniques is important for EMTs.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["fractures", "dislocations", "sprains", "immobilization"],
        keyPoints: [
            "Musculoskeletal anatomy: Bones, joints, ligaments, tendons, muscles",
            "Fracture types: Closed, open, complete, incomplete, comminuted",
            "Dislocations: Joint displacement, neurovascular compromise",
            "Sprains and strains: Ligament and muscle injuries",
            "Assessment: Deformity, pain, swelling, loss of function",
            "Immobilization: Splinting, traction, joint above and below",
            "Complications: Compartment syndrome, fat embolism, infection",
            "Special considerations: Pediatric, geriatric, pathologic fractures"
        ],
        objectives: [
            "Classify different types of orthopedic injuries",
            "Perform proper assessment of extremity injuries",
            "Apply appropriate immobilization techniques",
            "Recognize complications of orthopedic injuries"
        ],
        isCompleted: false
    },
    {
        chapterNumber: 33,
        title: "Environmental Emergencies",
        content: "Environmental emergencies result from exposure to extreme temperatures, altitude, water, or other environmental factors. Understanding these conditions is important for EMTs.",
        bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
        tags: ["environmental", "heat", "cold", "drowning", "altitude"],
        keyPoints: [
            "Thermoregulation: Heat production, heat loss, normal body temperature",
            "Heat emergencies: Heat exhaustion, heat stroke, hyperthermia",
            "Cold emergencies: Hypothermia, frostbite, immersion foot",
            "Water emergencies: Drowning, near-drowning, diving injuries",
            "High altitude: Acute mountain sickness, pulmonary edema, cerebral edema",
            "Lightning and electrical injuries: Entry/exit wounds, cardiac effects",
            "Venomous bites and stings: Snakes, spiders, insects, marine animals",
            "Prevention: Education, preparation, environmental awareness"
        ],
        objectives: [
            "Recognize environmental emergency conditions",
            "Provide appropriate treatment for heat and cold injuries",
            "Manage drowning and near-drowning patients",
            "Understand prevention strategies for environmental emergencies"
        ],
        isCompleted: false
    }
];
export async function seedMissingChapters() {
    console.log('Seeding missing chapters 7-33...');
    for (const chapter of missingChapters) {
        try {
            await db.insert(studyNotes).values(chapter);
            console.log(`✓ Added Chapter ${chapter.chapterNumber}: ${chapter.title}`);
        }
        catch (error) {
            console.error(`✗ Failed to add Chapter ${chapter.chapterNumber}:`, error);
        }
    }
    console.log('Missing chapters seeding completed!');
}
// Auto-execute when run directly
seedMissingChapters()
    .then(() => {
    console.log('Missing chapters seeding completed successfully');
    process.exit(0);
})
    .catch((error) => {
    console.error('Missing chapters seeding failed:', error);
    process.exit(1);
});
