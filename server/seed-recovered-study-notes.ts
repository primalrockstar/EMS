import { db } from './db';
import { studyNotes } from '../shared/schema';

export async function seedAllStudyNotes() {
  console.log("Seeding recovered study notes...");
  
  const allStudyNotes = [
    {
      chapterNumber: 7,
      title: 'Life Span Development',
      content: `Life span development examines the physical, cognitive, and psychosocial changes that occur throughout human life. Understanding developmental stages helps EMTs provide age-appropriate care and communication.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["development", "life span", "age groups"],
      keyPoints: ["Infancy (0-1 year): Rapid growth, fontanelles, stranger anxiety", "Toddler (1-3 years): Walking, language development, separation anxiety", "Preschool (3-6 years): Improved coordination, magical thinking", "School age (6-12 years): Concrete thinking, peer influence", "Adolescence (13-18 years): Identity formation, risk-taking behavior", "Early adulthood (19-40 years): Peak physical condition, career focus", "Middle adulthood (41-60 years): Physical changes, chronic conditions", "Late adulthood (60+ years): Multiple health issues, medication use"],
      objectives: ["Describe the physical and cognitive changes in each life stage", "Explain appropriate communication strategies for different age groups", "Identify common medical concerns for each developmental stage", "Understand the impact of development on emergency care"],
      isCompleted: false
    },
    {
      chapterNumber: 8,
      title: 'Lifting and Moving Patients',
      content: `Proper lifting and moving techniques are essential for preventing injury to both patients and EMTs. Understanding body mechanics, equipment use, and patient positioning ensures safe patient transport.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["lifting", "moving", "body mechanics", "safety"],
      keyPoints: ["Power grip: Palms and fingers in complete contact with object", "Power lift: Straight back, bent knees, weight close to body", "Keep back straight and locked during lifts", "Communicate clearly with partner during moves", "Use proper number of people for lift", "Emergency moves: Immediate danger to patient or EMT", "Urgent moves: Treatment requires repositioning", "Non-urgent moves: No immediate threat, normal precautions"],
      objectives: ["Demonstrate proper lifting techniques to prevent injury", "Explain when to use emergency, urgent, and non-urgent moves", "Describe proper body mechanics for patient movement", "Identify equipment used for patient transport"],
      isCompleted: false
    },
    {
      chapterNumber: 9,
      title: 'The Team Approach to Healthcare',
      content: `Healthcare delivery requires coordination among multiple professionals. EMTs must understand their role within the healthcare team and work effectively with other providers.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["healthcare team", "coordination", "communication"],
      keyPoints: ["Primary care providers: Family physicians, internists, pediatricians", "Emergency department staff: Physicians, nurses, technicians", "Specialists: Cardiologists, surgeons, psychiatrists", "Allied health professionals: Respiratory therapists, social workers", "Public safety: Police, fire, rescue personnel", "Effective communication is essential for patient care", "Professional boundaries and scope of practice", "Continuity of care from scene to hospital"],
      objectives: ["Identify members of the healthcare team", "Explain the role of EMTs within the healthcare system", "Describe effective communication strategies", "Understand professional boundaries and scope of practice"],
      isCompleted: false
    },
    {
      chapterNumber: 10,
      title: 'Patient Assessment',
      content: `Systematic patient assessment is the foundation of emergency care. The assessment process includes scene size-up, primary assessment, history taking, secondary assessment, and reassessment.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["assessment", "primary assessment", "secondary assessment"],
      keyPoints: ["Scene size-up: Safety, number of patients, mechanism of injury", "Primary assessment: Life-threatening conditions first", "XABCDE approach: eXsanguinating hemorrhage, Airway, Breathing, Circulation, Disability, Exposure", "History taking: SAMPLE (Signs/Symptoms, Allergies, Medications, Past history, Last meal, Events)", "Secondary assessment: Systematic physical examination", "Reassessment: Ongoing monitoring of patient condition", "Vital signs: Blood pressure, pulse, respirations, temperature", "Mental status assessment: AVPU scale"],
      objectives: ["Perform a systematic patient assessment", "Identify life-threatening conditions in primary assessment", "Obtain an accurate patient history", "Conduct appropriate physical examination techniques"],
      isCompleted: false
    },
    {
      chapterNumber: 11,
      title: 'Airway Management',
      content: `Airway management is the highest priority in emergency care. Understanding airway anatomy, assessment techniques, and interventions is critical for patient survival.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["airway", "breathing", "ventilation", "oxygenation"],
      keyPoints: ["Anatomy: Upper airway (nose, mouth, pharynx, larynx) and lower airway (trachea, bronchi, lungs)", "Assessment: Look, listen, feel for breathing", "Opening techniques: Head-tilt chin-lift, jaw thrust", "Airway adjuncts: Oral airway, nasal airway", "Suction: Remove secretions, vomit, blood", "Oxygen delivery: Nasal cannula, non-rebreather mask, bag-valve mask", "Ventilation: Mouth-to-mouth, bag-valve mask, mechanical ventilation", "Special considerations: Pediatric, geriatric, trauma patients"],
      objectives: ["Identify signs of airway obstruction", "Demonstrate proper airway opening techniques", "Use airway adjuncts appropriately", "Provide effective ventilation and oxygenation"],
      isCompleted: false
    },
    {
      chapterNumber: 12,
      title: 'Principles of Pharmacology',
      content: `Pharmacology is the study of drugs and their effects on the body. EMTs must understand basic pharmacological principles to safely administer medications within their scope of practice.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["pharmacology", "medications", "drug administration"],
      keyPoints: ["Drug names: Generic, trade, chemical names", "Drug forms: Tablet, capsule, liquid, gas, topical", "Routes of administration: Oral, sublingual, intravenous, intramuscular, subcutaneous, inhalation, topical", "Pharmacokinetics: Absorption, distribution, metabolism, excretion", "Pharmacodynamics: How drugs affect the body", "Therapeutic effects: Desired drug actions", "Side effects: Undesired but expected effects", "Adverse reactions: Harmful, unexpected effects", "Contraindications: Conditions where drug should not be used", "Drug interactions: Effects when multiple drugs are used"],
      objectives: ["Define basic pharmacological terms", "Explain routes of drug administration", "Describe factors affecting drug action", "Identify contraindications and adverse reactions"],
      isCompleted: false
    },
    {
      chapterNumber: 13,
      title: 'Shock',
      content: `Shock is inadequate tissue perfusion that can lead to cellular death. Understanding the pathophysiology, types, and treatment of shock is essential for EMT practice.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["shock", "perfusion", "hypoperfusion", "circulation"],
      keyPoints: ["Definition: Inadequate tissue perfusion and oxygenation", "Pathophysiology: Decreased cardiac output, vascular problems, blood/fluid loss", "Types: Cardiogenic, hypovolemic, distributive (septic, anaphylactic, neurogenic)", "Compensated shock: Body maintains blood pressure", "Decompensated shock: Blood pressure drops, organs fail", "Signs and symptoms: Altered mental status, rapid pulse, cool/clammy skin, decreased blood pressure", "Treatment: Airway management, oxygen, positioning, fluid replacement, rapid transport", "Pediatric considerations: Children compensate well initially but decompensate rapidly"],
      objectives: ["Define shock and its underlying pathophysiology", "Identify the different types of shock", "Recognize signs and symptoms of shock", "Implement appropriate treatment for shock patients"],
      isCompleted: false
    },
    {
      chapterNumber: 14,
      title: 'BLS Resuscitation',
      content: `Basic Life Support (BLS) resuscitation includes CPR, AED use, and foreign body airway obstruction management. These skills are fundamental to emergency care.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["BLS", "CPR", "AED", "resuscitation"],
      keyPoints: ["Chain of survival: Early recognition, early CPR, early defibrillation, early advanced care", "Adult CPR: 30 compressions to 2 breaths, rate 100-120/min, depth 2-2.4 inches", "Pediatric CPR: 30:2 for one rescuer, 15:2 for two rescuers", "Infant CPR: Two-finger technique, depth 1.5 inches", "AED use: Automated external defibrillator for ventricular fibrillation/tachycardia", "Foreign body airway obstruction: Back blows, abdominal thrusts (Heimlich maneuver)", "Recovery position: Unconscious breathing patients", "Termination of resuscitation: Medical control, family wishes, safety concerns"],
      objectives: ["Demonstrate proper CPR technique for all age groups", "Operate an AED safely and effectively", "Manage foreign body airway obstruction", "Understand when to initiate and terminate resuscitation"],
      isCompleted: false
    },
    {
      chapterNumber: 15,
      title: 'Medical Overview',
      content: `Medical emergencies encompass a wide range of conditions affecting body systems. Understanding common medical conditions and their management is essential for EMT practice.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["medical emergencies", "pathophysiology", "assessment"],
      keyPoints: ["Nature of illness: Determine what", ",\n      ", "s primary concern in their own words", "History of present illness: Onset, provocation, quality, region, severity, timing", "Assessment approach: Look for patterns, consider differential diagnosis", "Common medical conditions: Respiratory, cardiovascular, neurological, endocrine", "Medication history: Current medications, allergies, compliance", "Environmental factors: Temperature, toxins, infectious agents", "Psychosocial factors: Stress, mental health, substance abuse"],
      objectives: ["Conduct systematic assessment of medical patients", "Identify common medical emergencies", "Obtain relevant medical history", "Recognize life-threatening medical conditions"],
      isCompleted: false
    },
    {
      chapterNumber: 16,
      title: 'Respiratory Emergencies',
      content: `Respiratory emergencies are common in EMS and can be life-threatening. Understanding respiratory anatomy, pathophysiology, and treatment is crucial for patient care.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["respiratory", "breathing", "dyspnea", "hypoxia"],
      keyPoints: ["Anatomy: Upper and lower airway structures, muscles of respiration", "Physiology: Ventilation, gas exchange, oxygen transport", "Pathophysiology: Airway obstruction, impaired ventilation, impaired gas exchange", "Common conditions: Asthma, COPD, pneumonia, pulmonary edema, pneumothorax", "Assessment: Inspection, palpation, auscultation, vital signs", "Signs of respiratory distress: Dyspnea, tachypnea, accessory muscle use, cyanosis", "Treatment: Airway management, oxygen therapy, positioning, medications", "Pediatric considerations: Smaller airways, higher oxygen demand"],
      objectives: ["Identify signs and symptoms of respiratory distress", "Recognize common respiratory emergencies", "Provide appropriate airway management", "Administer oxygen therapy effectively"],
      isCompleted: false
    },
    {
      chapterNumber: 17,
      title: 'Cardiovascular Emergencies',
      content: `Cardiovascular emergencies include acute coronary syndromes, heart failure, and cardiac arrest. Understanding cardiac anatomy and pathophysiology is essential for EMT practice.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["cardiovascular", "cardiac", "heart attack", "ACS"],
      keyPoints: ["Anatomy: Heart chambers, valves, coronary arteries, electrical system", "Physiology: Cardiac cycle, blood flow, electrical conduction", "Acute coronary syndrome: Unstable angina, STEMI, NSTEMI", "Signs and symptoms: Chest pain, dyspnea, diaphoresis, nausea", "Heart failure: Left-sided, right-sided, acute vs. chronic", "Cardiac arrest: Ventricular fibrillation, asystole, PEA", "Treatment: Oxygen, aspirin, nitroglycerin, morphine, rapid transport", "AED use: Early defibrillation for shockable rhythms"],
      objectives: ["Recognize signs and symptoms of acute coronary syndrome", "Provide appropriate treatment for cardiac emergencies", "Understand indications for cardiac medications", "Perform effective cardiac resuscitation"],
      isCompleted: false
    },
    {
      chapterNumber: 18,
      title: 'Neurologic Emergencies',
      content: `Neurologic emergencies affect the brain, spinal cord, and peripheral nerves. Understanding neurological anatomy and common conditions is important for EMT practice.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["neurologic", "stroke", "seizure", "altered mental status"],
      keyPoints: ["Anatomy: Central nervous system (brain, spinal cord), peripheral nervous system", "Pathophysiology: Ischemia, hemorrhage, infection, trauma, metabolic disorders", "Stroke: Ischemic (thrombotic, embolic), hemorrhagic", "Stroke assessment: Cincinnati Stroke Scale, FAST assessment", "Seizures: Generalized, partial, status epilepticus", "Altered mental status: Hypoglycemia, hypoxia, toxins, infection", "Headache: Tension, migraine, cluster, secondary causes", "Treatment: Airway management, oxygen, glucose, positioning, rapid transport"],
      objectives: ["Recognize signs and symptoms of stroke", "Assess patients with altered mental status", "Manage seizure patients appropriately", "Understand time-sensitive nature of neurologic emergencies"],
      isCompleted: false
    },
    {
      chapterNumber: 19,
      title: 'Gastrointestinal and Urologic Emergencies',
      content: `Gastrointestinal and urologic emergencies can present with abdominal pain, bleeding, or systemic symptoms. Understanding these conditions helps EMTs provide appropriate care.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["gastrointestinal", "urologic", "abdominal pain", "bleeding"],
      keyPoints: ["GI anatomy: Esophagus, stomach, small intestine, large intestine, liver, pancreas", "Urologic anatomy: Kidneys, ureters, bladder, urethra", "Acute abdomen: Sudden onset of severe abdominal pain", "Common GI conditions: Appendicitis, bowel obstruction, GI bleeding, ulcers", "Urologic conditions: Kidney stones, urinary tract infections, renal failure", "Assessment: History, physical examination, vital signs", "Signs and symptoms: Pain, nausea, vomiting, diarrhea, fever", "Treatment: Positioning, IV fluids, pain management, rapid transport"],
      objectives: ["Assess patients with abdominal pain", "Recognize signs of GI bleeding", "Understand common urologic emergencies", "Provide supportive care for GI/urologic patients"],
      isCompleted: false
    },
    {
      chapterNumber: 20,
      title: 'Endocrine and Hematologic Emergencies',
      content: `Endocrine and hematologic emergencies involve hormonal imbalances and blood disorders. Understanding diabetes, thyroid disorders, and blood conditions is important for EMTs.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["endocrine", "hematologic", "diabetes", "blood disorders"],
      keyPoints: ["Endocrine system: Hormones, glands, feedback mechanisms", "Diabetes: Type 1, Type 2, gestational", "Hypoglycemia: Low blood sugar, altered mental status, diaphoresis", "Hyperglycemia: High blood sugar, dehydration, ketoacidosis", "Thyroid disorders: Hyperthyroidism, hypothyroidism, thyroid storm", "Hematologic disorders: Anemia, sickle cell disease, hemophilia", "Assessment: Blood glucose testing, vital signs, mental status", "Treatment: Glucose administration, supportive care, rapid transport"],
      objectives: ["Recognize signs and symptoms of diabetic emergencies", "Perform blood glucose testing", "Understand thyroid emergency presentations", "Manage patients with hematologic disorders"],
      isCompleted: false
    },
    {
      chapterNumber: 21,
      title: 'Allergy and Anaphylaxis',
      content: `Allergic reactions range from mild to life-threatening anaphylaxis. Understanding the immune response and treatment of allergic emergencies is crucial for EMTs.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["allergy", "anaphylaxis", "immune response", "epinephrine"],
      keyPoints: ["Immune system: Antibodies, antigens, hypersensitivity reactions", "Types of reactions: Local, systemic, anaphylactic", "Common allergens: Foods, medications, insect stings, latex", "Pathophysiology: Histamine release, vasodilation, increased permeability", "Signs and symptoms: Urticaria, angioedema, bronchospasm, hypotension", "Anaphylaxis: Rapid onset, life-threatening, multisystem involvement", "Treatment: Epinephrine, oxygen, IV fluids, antihistamines, steroids", "Prevention: Avoidance, medical alert jewelry, action plans"],
      objectives: ["Differentiate between mild and severe allergic reactions", "Recognize signs and symptoms of anaphylaxis", "Administer epinephrine appropriately", "Provide supportive care for allergic patients"],
      isCompleted: false
    },
    {
      chapterNumber: 22,
      title: 'Toxicology',
      content: `Toxicologic emergencies involve poisoning from various substances. Understanding toxicology principles and antidotes helps EMTs manage poisoned patients effectively.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["toxicology", "poisoning", "overdose", "antidotes"],
      keyPoints: ["Routes of exposure: Ingestion, inhalation, absorption, injection", "Toxidromes: Characteristic signs and symptoms of poison classes", "Common poisons: Alcohol, drugs, household products, plants, carbon monoxide", "Assessment: History of exposure, physical examination, vital signs", "Decontamination: Removal from source, skin/eye irrigation", "Antidotes: Naloxone (opioids), flumazenil (benzodiazepines), activated charcoal", "Supportive care: Airway management, oxygen, IV fluids, monitoring", "Prevention: Education, poison control centers, safety measures"],
      objectives: ["Identify common toxidromes", "Provide appropriate decontamination", "Administer antidotes when indicated", "Recognize signs of specific poisonings"],
      isCompleted: false
    },
    {
      chapterNumber: 23,
      title: 'Behavioral Health Emergencies',
      content: `Behavioral health emergencies involve psychiatric conditions and mental health crises. Understanding mental health disorders and crisis intervention is important for EMTs.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["behavioral", "mental health", "psychiatric", "crisis"],
      keyPoints: ["Mental health continuum: Normal stress to severe mental illness", "Common disorders: Depression, anxiety, bipolar, schizophrenia, PTSD", "Crisis situations: Suicidal ideation, psychosis, agitation, violence", "Risk factors: Substance abuse, trauma, medical conditions, medications", "Assessment: Mental status exam, suicide risk, danger to others", "De-escalation techniques: Calm demeanor, active listening, respect", "Legal considerations: Involuntary commitment, patient rights, documentation", "Safety: Scene safety, restraints, law enforcement involvement"],
      objectives: ["Recognize signs of mental health emergencies", "Use appropriate de-escalation techniques", "Assess suicide risk factors", "Understand legal aspects of psychiatric emergencies"],
      isCompleted: false
    },
    {
      chapterNumber: 24,
      title: 'Gynecologic Emergencies',
      content: `Gynecologic emergencies affect the female reproductive system. Understanding these conditions helps EMTs provide appropriate care for women`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["gynecologic", "reproductive", "women", ", "],
      keyPoints: ["Anatomy: External and internal reproductive organs", "Menstrual cycle: Phases, hormonal changes, normal variations", "Vaginal bleeding: Menorrhagia, metrorrhagia, postmenopausal bleeding", "Pelvic pain: Ovarian cysts, pelvic inflammatory disease, endometriosis", "Sexual assault: Medical care, evidence preservation, emotional support", "Pregnancy-related emergencies: Ectopic pregnancy, miscarriage, preeclampsia", "Assessment: History, physical examination, vital signs, privacy", "Treatment: Supportive care, pain management, emotional support, transport"],
      objectives: ["Assess patients with gynecologic emergencies", "Recognize signs of serious gynecologic conditions", "Provide appropriate care for sexual assault victims", "Maintain patient privacy and dignity"],
      isCompleted: false
    },
    {
      chapterNumber: 25,
      title: 'Trauma Overview',
      content: `Trauma is a leading cause of death and disability. Understanding trauma mechanisms, assessment, and management principles is fundamental to EMT practice.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["trauma", "injury", "mechanism", "assessment"],
      keyPoints: ["Epidemiology: Leading cause of death in young adults", "Mechanism of injury: Blunt, penetrating, blast, thermal", "Kinematics: Energy transfer, deceleration, cavitation", "Trauma assessment: Primary survey, secondary survey, reassessment", "Golden hour: Time-sensitive nature of trauma care", "Triage: Prioritizing patients based on injury severity", "Trauma centers: Designation levels, appropriate transport", "Prevention: Education, legislation, engineering, enforcement"],
      objectives: ["Understand trauma epidemiology and prevention", "Recognize high-energy mechanisms of injury", "Perform systematic trauma assessment", "Understand trauma center designation and transport decisions"],
      isCompleted: false
    },
    {
      chapterNumber: 26,
      title: 'Bleeding',
      content: `Bleeding control is a fundamental skill in emergency care. Understanding hemorrhage classification and control techniques is essential for EMTs.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["bleeding", "hemorrhage", "hemostasis", "shock"],
      keyPoints: ["Circulatory system: Heart, blood vessels, blood components", "Hemostasis: Platelet plug formation, coagulation cascade", "Classification: Arterial, venous, capillary bleeding", "Severity: Mild, moderate, severe hemorrhage", "External bleeding control: Direct pressure, elevation, pressure points, tourniquet", "Internal bleeding: Signs, symptoms, shock management", "Complications: Hypovolemic shock, infection, compartment syndrome", "Special considerations: Anticoagulant medications, bleeding disorders"],
      objectives: ["Classify types and severity of bleeding", "Demonstrate proper bleeding control techniques", "Recognize signs of internal bleeding", "Manage patients with severe hemorrhage"],
      isCompleted: false
    },
    {
      chapterNumber: 27,
      title: 'Soft-Tissue Injuries',
      content: `Soft-tissue injuries affect the skin, muscles, and underlying structures. Understanding wound types and management is important for EMT practice.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["soft tissue", "wounds", "skin", "infection"],
      keyPoints: ["Skin anatomy: Epidermis, dermis, subcutaneous tissue", "Functions: Protection, temperature regulation, sensation", "Wound classification: Closed (contusions, hematomas), open (abrasions, lacerations, punctures, avulsions)", "Assessment: Mechanism, location, size, depth, contamination", "Wound care: Cleaning, irrigation, dressing, bandaging", "Infection prevention: Sterile technique, antibiotics, tetanus prophylaxis", "Special wounds: Crush injuries, degloving, amputations", "Complications: Infection, scarring, loss of function"],
      objectives: ["Classify different types of soft-tissue injuries", "Provide appropriate wound care", "Prevent infection in wound management", "Recognize complications of soft-tissue injuries"],
      isCompleted: false
    },
    {
      chapterNumber: 28,
      title: 'Face and Neck Injuries',
      content: `Face and neck injuries can be life-threatening due to airway compromise. Understanding anatomy and management of these injuries is crucial for EMTs.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["face", "neck", "airway", "bleeding"],
      keyPoints: ["Anatomy: Facial bones, muscles, nerves, blood vessels", "Airway concerns: Obstruction, bleeding, swelling, fractures", "Facial fractures: Mandible, maxilla, zygoma, nasal, orbital", "Soft tissue injuries: Lacerations, abrasions, avulsions", "Eye injuries: Corneal abrasions, foreign bodies, chemical burns", "Neck injuries: Penetrating wounds, cervical spine concerns", "Assessment: Airway patency, breathing, circulation, neurologic function", "Treatment: Airway management, bleeding control, spinal immobilization"],
      objectives: ["Recognize life-threatening face and neck injuries", "Manage airway complications from facial trauma", "Provide appropriate care for eye injuries", "Control bleeding from facial wounds"],
      isCompleted: false
    },
    {
      chapterNumber: 29,
      title: 'Head and Spine Injuries',
      content: `Head and spine injuries can result in permanent disability or death. Understanding neurological anatomy and spinal immobilization is essential for EMTs.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["head injury", "spine", "neurologic", "immobilization"],
      keyPoints: ["Neuroanatomy: Brain, spinal cord, meninges, cerebrospinal fluid", "Head injuries: Scalp wounds, skull fractures, brain injuries", "Brain injuries: Concussion, contusion, hemorrhage, increased ICP", "Spinal injuries: Vertebrae, spinal cord, nerve roots", "Mechanisms: Flexion, extension, rotation, compression, distraction", "Assessment: Neurologic examination, spinal clearance criteria", "Spinal immobilization: Cervical collar, backboard, strapping", "Complications: Herniation, paralysis, autonomic dysreflexia"],
      objectives: ["Recognize signs of head and spine injuries", "Perform neurologic assessment", "Implement proper spinal immobilization", "Manage increased intracranial pressure"],
      isCompleted: false
    },
    {
      chapterNumber: 30,
      title: 'Chest Injuries',
      content: `Chest injuries can be immediately life-threatening. Understanding thoracic anatomy and injury patterns is crucial for EMT practice.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["chest", "thoracic", "pneumothorax", "hemothorax"],
      keyPoints: ["Anatomy: Ribs, sternum, lungs, heart, great vessels", "Mechanisms: Blunt, penetrating, blast, compression", "Pneumothorax: Simple, tension, open (sucking chest wound)", "Hemothorax: Blood in pleural space, shock potential", "Flail chest: Multiple rib fractures, paradoxical movement", "Cardiac tamponade: Blood in pericardial sac, Beck", ",\n      ", ",\n      "],
      objectives: ["Recognize life-threatening chest injuries", "Assess breathing and circulation in chest trauma", "Provide appropriate treatment for pneumothorax", "Manage flail chest and cardiac tamponade"],
      isCompleted: false
    },
    {
      chapterNumber: 31,
      title: 'Abdominal and Genitourinary Injuries',
      content: `Abdominal and genitourinary injuries can cause significant internal bleeding. Understanding these injuries and their management is important for EMTs.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["abdominal", "genitourinary", "internal bleeding", "organs"],
      keyPoints: ["Anatomy: Solid organs (liver, spleen, kidneys), hollow organs (stomach, intestines, bladder)", "Mechanisms: Blunt, penetrating, compression, deceleration", "Solid organ injuries: Liver, spleen, kidney lacerations", "Hollow organ injuries: Perforation, contamination, peritonitis", "Genitourinary injuries: Kidney, bladder, urethra, external genitalia", "Assessment: Inspection, palpation, vital signs, shock signs", "Evisceration: Bowel protrusion, moist sterile dressing", "Treatment: Shock management, rapid transport, supportive care"],
      objectives: ["Recognize signs of abdominal trauma", "Assess for internal bleeding", "Manage evisceration appropriately", "Provide care for genitourinary injuries"],
      isCompleted: false
    },
    {
      chapterNumber: 32,
      title: 'Orthopedic Injuries',
      content: `Orthopedic injuries affect bones, joints, and soft tissues. Understanding fracture types and immobilization techniques is important for EMTs.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["fractures", "dislocations", "sprains", "immobilization"],
      keyPoints: ["Musculoskeletal anatomy: Bones, joints, ligaments, tendons, muscles", "Fracture types: Closed, open, complete, incomplete, comminuted", "Dislocations: Joint displacement, neurovascular compromise", "Sprains and strains: Ligament and muscle injuries", "Assessment: Deformity, pain, swelling, loss of function", "Immobilization: Splinting, traction, joint above and below", "Complications: Compartment syndrome, fat embolism, infection", "Special considerations: Pediatric, geriatric, pathologic fractures"],
      objectives: ["Classify different types of orthopedic injuries", "Perform proper assessment of extremity injuries", "Apply appropriate immobilization techniques", "Recognize complications of orthopedic injuries"],
      isCompleted: false
    },
    {
      chapterNumber: 33,
      title: 'Environmental Emergencies',
      content: `Environmental emergencies result from exposure to extreme temperatures, altitude, water, or other environmental factors. Understanding these conditions is important for EMTs.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["environmental", "heat", "cold", "drowning", "altitude"],
      keyPoints: ["Thermoregulation: Heat production, heat loss, normal body temperature", "Heat emergencies: Heat exhaustion, heat stroke, hyperthermia", "Cold emergencies: Hypothermia, frostbite, immersion foot", "Water emergencies: Drowning, near-drowning, diving injuries", "High altitude: Acute mountain sickness, pulmonary edema, cerebral edema", "Lightning and electrical injuries: Entry/exit wounds, cardiac effects", "Venomous bites and stings: Snakes, spiders, insects, marine animals", "Prevention: Education, preparation, environmental awareness"],
      objectives: ["Recognize environmental emergency conditions", "Provide appropriate treatment for heat and cold injuries", "Manage drowning and near-drowning patients", "Understand prevention strategies for environmental emergencies"],
      isCompleted: false
    },
    {
      chapterNumber: 34,
      title: 'Obstetrics and Neonatal Care',
      content: `This chapter focuses on obstetrics and neonatal care, covering the anatomy and physiology of the female reproductive system during pregnancy. You will learn emergency treatment for childbirth, including the stages of labor and normal delivery. Complications of pregnancy and neonatal evaluations are also covered.

The female reproductive system includes several key organs. The ovaries are two glands containing thousands of follicles, each containing an egg. Ovulation happens about two weeks before menstruation, and the fertilized egg implants in the endometrium.

The placenta is a disc-shaped structure attached to the uterine wall that provides nourishment to the fetus. It keeps the woman`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["obstetrics", "neonatal", "pregnancy", "delivery", "APGAR", "complications", "trauma"],
      keyPoints: ["Female reproductive anatomy and pregnancy physiology", "Placenta, umbilical cord, and amniotic sac functions", "Normal physiological changes during pregnancy", "Complications: gestational diabetes, hypertensive disorders, bleeding", "Eclampsia treatment: side position, airway, oxygen, transport", "Trauma considerations: two patients, fall risk, blood volume changes", "Three stages of labor and normal delivery process", "APGAR scoring system for neonatal assessment", "Abnormal presentations: breech, prolapsed cord, multiple births", "Postpartum hemorrhage recognition and management"],
      objectives: ["Describe the anatomy and physiology of the female reproductive system during pregnancy", "Explain normal physiological changes that occur during pregnancy", "Identify complications of pregnancy and their emergency management", "Outline the three stages of labor and normal delivery process", "Demonstrate proper neonatal assessment using the APGAR score", "Recognize abnormal presentations and emergency delivery situations", "Discuss special considerations for trauma in pregnant patients", "Explain postpartum complications and their management"],
      isCompleted: false
    },
    {
      chapterNumber: 35,
      title: 'Pediatric Emergencies',
      content: `Treating children is different from treating adults. Children vary anatomically, physically, and emotionally from adults. Their illnesses and injuries differ based on age and development. Pediatrics is the specialized medical practice for young patients. Caring for children can be challenging due to their age and developmental level.

Communication and family support are crucial in pediatric care. Caring for a child means caring for both the patient and caregivers. Family members often need emotional support, and a calm parent helps the child remain calm. Different age groups require different communication approaches: infants benefit from caregiver holding during assessment, toddlers need simple words and calm voice, preschoolers require direct communication without lies, school-aged children should be talked to directly with simple explanations, and adolescents should be involved in their own care.

Growth and development stages include infancy (first year), toddler (1-3 years), preschool age (3-6 years), school age (6-12 years), and adolescence (13-18 years). Each stage has unique characteristics affecting assessment and care approaches.

Pediatric anatomy and physiology differences are significant. The respiratory system has smaller airway diameter, larger tongue relative to mouth size, funnel-shaped upper airway, and higher oxygen demand. The circulatory system shows variable pulse ranges with age and different compensation mechanisms. The nervous system is immature and less protected, with disproportionately larger head-to-body ratio.

Respiratory emergencies are common in children. Upper airway obstruction can be caused by croup, epiglottitis, or foreign body aspiration. Lower airway conditions include asthma, bronchiolitis, and pneumonia. Treatment focuses on positioning, oxygen delivery, and avoiding agitation.

Cardiopulmonary arrest in children is usually respiratory in origin. Shock in children compensates well initially but decompensates rapidly. Signs include tachycardia, altered mental status, and poor perfusion. Anaphylaxis requires immediate epinephrine administration and supportive care.

Neurologic emergencies include seizures, altered mental status, and head trauma. Febrile seizures are common and usually benign. Gastrointestinal emergencies involve dehydration, which is more serious in children due to higher surface area-to-body weight ratio.

Pediatric trauma considerations include different injury patterns, anatomical differences affecting assessment, and special equipment needs. Child abuse and neglect require recognition and proper reporting. SIDS (Sudden Infant Death Syndrome) and ALTE (Apparent Life-Threatening Events) are specialized pediatric conditions requiring specific approaches.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["pediatrics", "developmental stages", "respiratory emergencies", "child abuse", "SIDS", "trauma"],
      keyPoints: ["Pediatric patients differ anatomically, physically, and emotionally from adults", "Age-specific communication strategies for different developmental stages", "Five growth and development stages: infancy through adolescence", "Respiratory system differences: smaller airways, higher oxygen demand", "Circulatory system: variable pulse ranges, different compensation mechanisms", "Respiratory emergencies: croup, epiglottitis, asthma, bronchiolitis", "Cardiopulmonary arrest usually respiratory in origin", "Dehydration more serious due to higher surface area-to-body weight ratio", "Child abuse recognition and mandatory reporting requirements", "SIDS and ALTE as specialized pediatric emergency conditions"],
      objectives: ["Describe age-specific approaches to pediatric patient assessment and care", "Explain anatomical and physiological differences between children and adults", "Identify common pediatric respiratory emergencies and their management", "Recognize signs of shock and cardiopulmonary arrest in children", "Discuss pediatric trauma considerations and injury patterns", "Explain the assessment and management of pediatric neurologic emergencies", "Describe signs of child abuse and neglect and reporting requirements", "Identify SIDS and ALTE presentations and appropriate responses"],
      isCompleted: false
    },
    {
      chapterNumber: 36,
      title: 'Geriatric Emergencies',
      content: `Geriatrics focuses on the assessment and treatment of disease in individuals aged 65 or older. The population aged 65 and older is projected to nearly double between 2012 and 2050. Caring for geriatric patients presents unique challenges due to chronic conditions, multiple medications, and the physiological changes of aging.

Communication with older adults requires understanding and patience. Always treat patients with respect and avoid ageism. Use their name or`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["geriatrics", "aging", "polypharmacy", "elder abuse", "GEMS triangle", "atypical presentations"],
      keyPoints: ["Geriatric population (65+) projected to nearly double by 2050", "Communication requires patience, respect, and avoiding ageism", "Leading causes of death: respiratory disease, heart disease, cancer, stroke", "Age-related respiratory changes increase pneumonia and PE risk", "Cardiovascular changes: hypertrophy, decreased output, arteriosclerosis", "Myocardial infarctions often silent or atypical in older adults", "Neurologic changes: decreased brain weight, slower reflexes, dementia risk", "Polypharmacy increases adverse drug reactions and interactions", "Elder abuse and neglect recognition and reporting requirements", "GEMS triangle framework for geriatric assessment"],
      objectives: ["Describe the demographic trends and challenges of geriatric care", "Explain effective communication strategies for older adult patients", "Identify age-related changes in all major body systems", "Recognize atypical presentations of common conditions in older adults", "Discuss the impact of polypharmacy on geriatric patients", "Describe the assessment and management of geriatric emergencies", "Explain the GEMS triangle approach to geriatric assessment", "Identify signs of elder abuse and neglect and reporting procedures"],
      isCompleted: false
    },
    {
      chapterNumber: 37,
      title: 'Special Challenges',
      content: `This chapter discusses patients with special challenges in emergency care, covering the needs of patients with developmental, sensory, and physical disabilities. Understanding the unique anatomy and physiology of these patients is crucial. Special care is also needed for patients relying on medical technology.

Intellectual and developmental disabilities may impair physical ability, learning, language, or behavioral skills. Intellectual disability involves limitations in intellectual functioning and daily living skills, diagnosed before age 18. Autism spectrum disorder is characterized by deficiencies in social communication and repetitive behaviors. Patients may have abnormal sensory responses and require calm environments with minimal stimulation.

Down syndrome is a genetic chromosomal defect resulting in mild to severe intellectual impairment. Physical abnormalities include round head, flat occiput, and large protruding tongue. Intubation can be difficult due to anatomical differences, and approximately 15% have upper spine instability, placing them at increased trauma risk.

Sensory disabilities affect vision or hearing. Visual impairment management includes making yourself known, introducing your team, describing surroundings, and taking assistive devices during transport. Hearing impairment requires facing the patient for lip reading, lowering pitch rather than speaking louder, and considering alternative communication methods.

Physical disabilities include cerebral palsy, spina bifida, and paralysis. Cerebral palsy results from brain damage causing poorly controlled movement. Observe the airway closely, don`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["disabilities", "developmental", "sensory impairment", "bariatric", "medical technology", "home care"],
      keyPoints: ["Intellectual disabilities: limitations in functioning and daily living skills", "Autism spectrum disorder: social communication deficits, sensory responses", "Down syndrome: genetic defect with intellectual impairment and physical abnormalities", "Visual impairment: make yourself known, describe surroundings, take assistive devices", "Hearing impairment: face patient, lower pitch, consider alternative communication", "Physical disabilities: cerebral palsy, spina bifida, paralysis considerations", "Bariatric patients: plan for extra help, coordinate lifts, notify hospitals", "Tracheostomy tubes: airway access, prone to obstruction, specialized care", "Medical technology: ventilators, pacemakers, feeding tubes, monitoring devices", "Home care patients: complex needs, family caregivers as information sources"],
      objectives: ["Describe the assessment and care of patients with intellectual and developmental disabilities", "Explain communication strategies for patients with sensory impairments", "Identify special considerations for patients with physical disabilities", "Discuss the challenges and techniques for caring for bariatric patients", "Describe the function and complications of common medical technology devices", "Explain the assessment and transport of patients with tracheostomies", "Identify the special needs of home care patients and their families", "Discuss safety considerations for patients with medical technology"],
      isCompleted: false
    },
    {
      chapterNumber: 38,
      title: 'Transport Operations',
      content: `Emergency medical transport aims to provide effective preparation for transport, safe emergency vehicle operations, appropriate transport decisions, and safe patient transfer techniques. EMTs play a vital role in each phase of an ambulance call.

Modern ambulances are designed based on NFPA 1917 standards and include a driver`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["transport", "ambulance operations", "emergency driving", "air medical", "safety", "nine phases"],
      keyPoints: ["Nine phases of ambulance call from preparation to post-run activities", "Equipment stored by urgency and frequency of use", "Daily inspections include vehicle systems and medical equipment", "En route to scene is most dangerous phase - use seat belts always", "Proper positioning: 100 feet from crash, uphill/upwind of hazards", "Patient monitoring: stable every 15 minutes, unstable every 5 minutes", "Defensive driving: maintain safe distances, exercise due regard", "Siren use should be judicious - may not be heard by other drivers", "Speed, vehicle size, and road conditions affect emergency operations", "Air medical operations: helicopters need 100x100 foot landing zones"],
      objectives: ["Describe the nine phases of an ambulance call and key activities in each", "Explain proper ambulance equipment storage and daily inspection procedures", "Identify safe driving practices for emergency vehicle operations", "Discuss the proper use of emergency warning devices and due regard principles", "Describe factors affecting emergency vehicle safety and common hazards", "Explain patient monitoring and care during transport", "Identify indications for air medical transport and safety considerations", "Describe landing zone establishment and safety procedures for helicopters"],
      isCompleted: false
    },
    {
      chapterNumber: 39,
      title: 'Vehicle Extrication and Special Rescue',
      content: `Vehicle extrication and special rescue operations require mental and physical preparation. Priority is patient care, but personal and team safety must come first. EMTs usually assist with extrication rather than lead rescue operations.

Vehicle safety systems can become hazards after collisions. Shock-absorbing bumpers may be compressed and could release suddenly. Airbags are supplemental restraints that may not have deployed and could inflate spontaneously. Maintain proper clearance distances: 5 inches for side-impact, 10 inches for driver-side, and 20 inches for passenger-side airbags.

Alternative fuel vehicles present special hazards including electric, hybrid, propane, natural gas, methanol, or hydrogen power. Disconnect batteries to prevent fire or explosion. Hybrid vehicles may have multiple batteries with higher voltage than traditional systems. High voltage systems may take up to 10 minutes to de-energize. Avoid orange high-voltage cables and retreat if unusual odors are detected.

Roles and responsibilities vary by jurisdiction but typically include: EMS providers assess and provide medical care, rescue teams secure vehicles and provide access, law enforcement controls traffic, and firefighters extinguish fires and ensure vehicle safety. Good communication and clear leadership are essential.

The 10 phases of extrication include: preparation, en route, arrival and size-up, hazard control, support operations, gaining access, emergency care, patient removal, transfer, and termination. Each phase has specific objectives and safety considerations.

Gaining access depends on the situation including terrain, vehicle position, patient location, hazards, and vehicle stability. Simple access tries to get patients out quickly without tools, using door handles or rolling down windows. Complex access requires special tools like pneumatic or hydraulic devices and is typically done by specialized teams.

Emergency care for trapped patients is similar to other patients once the scene is safe. Perform primary assessment, address hemorrhaging, provide spinal stabilization, and manage airway and breathing. Coordinate with rescue personnel on the best removal route and participate in planning patient removal.

Specialized rescue situations include technical rescues requiring special skills and equipment. Only trained personnel should enter hazardous areas. Many team members are also EMRs or EMTs. Types include confined space rescue, trench rescue, high-angle rescue, and water rescue.

Tactical EMS involves working with law enforcement in dangerous situations. Water rescue requires specialized training and equipment. Wilderness rescue may involve prolonged care in remote areas. Cave rescue requires specialized techniques and equipment.

The key principle is that untrained personnel should not attempt specialized rescues. Know your limitations and call for appropriate specialized teams. Focus on patient care within your scope of practice while supporting rescue operations.`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["extrication", "vehicle rescue", "safety systems", "specialized rescue", "hazards", "access techniques"],
      keyPoints: ["Personal and team safety comes first, then patient care", "Vehicle safety systems become hazards: compressed bumpers, airbags", "Alternative fuel vehicles: disconnect batteries, avoid orange cables", "Airbag clearance distances: 5\u2033 side, 10\u2033 driver, 20\u2033 passenger", "10 phases of extrication from preparation to termination", "Simple access: use doors/windows before breaking glass", "Complex access: requires special tools and trained personnel", "Emergency care: primary assessment, hemorrhage control, spinal stabilization", "Specialized rescues: confined space, trench, high-angle, water", "Know limitations - call for appropriate specialized teams"],
      objectives: ["Describe safety considerations and hazards in vehicle extrication", "Explain the roles and responsibilities of different agencies at rescue scenes", "Identify the 10 phases of vehicle extrication and key activities", "Discuss simple and complex access techniques for vehicle extrication", "Describe emergency care considerations for trapped patients", "Explain the principles of specialized rescue operations", "Identify when to call for specialized rescue teams", "Discuss the EMT"],
      isCompleted: false
    },
    {
      chapterNumber: 40,
      title: 'Incident Management',
      content: `The National Incident Management System (NIMS) promotes efficient coordination of emergency incidents at all levels. The Incident Command System (ICS) is a component of NIMS designed to ensure responder and public safety, achieve incident management goals, and ensure efficient resource use.

Mass Casualty Incidents (MCIs) involve three or more patients or any situation placing great demand on equipment or personnel. Disasters are widespread events disrupting community functions and resources, threatening lives and property. Unlike MCIs, disasters can require responders for days, weeks, or months.

The Incident Commander (IC) is in charge of overall incident management. Large incidents may require unified command with multiple agencies. EMTs must know who the IC is, how to communicate, and where the command post is located. Command can be transferred to someone with more experience as incidents develop.

General staff includes command, finance, logistics, operations, and planning. Finance documents expenditures for reimbursement. Logistics is responsible for communications, facilities, food, water, fuel, and supplies. Operations manages tactical operations at large incidents. Planning solves problems and develops incident action plans.

Command staff includes the Public Information Officer (PIO), Safety Officer, and Liaison Officer. The Safety Officer monitors for hazards and can stop operations if rescuers are in danger. The PIO provides information to media and public. The Liaison Officer relays information between agencies.

Communication is critical for incident management. Integrated communications allow all agencies to communicate quickly using common terminology and clear text. Avoid 10-codes or signals on radio. Face-to-face communication helps limit radio traffic. Equipment must be reliable and durable with backups.

EMS response within ICS includes specific roles: Medical Branch Director supervises triage, treatment, and transport. Triage Supervisor counts and prioritizes patients. Treatment Supervisor locates treatment areas. Transportation Supervisor coordinates patient distribution. Staging Officer manages emergency vehicles.

Triage procedures prioritize patients based on severity and survivability. START (Simple Triage and Rapid Treatment) is used for patients over 8 years old. JumpSTART is used for pediatric patients. Triage categories include immediate (red), delayed (yellow), minor (green), and deceased (black).

START triage assesses respiratory status, perfusion, and mental status. Patients who can walk are minor. Non-ambulatory patients are assessed for breathing - if absent and positioning doesn`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["incident management", "ICS", "NIMS", "triage", "START", "JumpSTART", "HAZMAT", "MCI"],
      keyPoints: ["NIMS provides framework for incident coordination at all levels", "MCIs involve 3+ patients or overwhelming resource demand", "Incident Commander oversees overall incident management", "General staff: command, finance, logistics, operations, planning", "Command staff: PIO, Safety Officer, Liaison Officer", "Communication using common terminology and clear text essential", "EMS roles: Medical Branch Director, Triage, Treatment, Transport supervisors", "START triage for adults, JumpSTART for pediatrics", "Triage categories: immediate (red), delayed (yellow), minor (green), deceased (black)", "HAZMAT incidents require specialized training and control zones"],
      objectives: ["Describe the components and purpose of NIMS and ICS", "Explain the roles and responsibilities within incident command structure", "Identify the key functions of general staff and command staff", "Discuss effective communication principles for incident management", "Describe the EMS branch structure and roles within ICS", "Explain START and JumpSTART triage procedures and categories", "Identify special considerations for mass casualty incidents", "Describe basic principles of hazardous materials incident management"],
      isCompleted: false
    },
    {
      chapterNumber: 41,
      title: 'Terrorism and Disaster Management',
      content: `Terrorism involves violent or dangerous acts that violate law and intend to intimidate populations or influence government policy. International terrorism occurs primarily outside U.S. jurisdiction, while domestic terrorism occurs primarily within U.S. jurisdiction. EMTs must be prepared mentally and physically for possible terrorist events.

Types of terrorism include religious extremist groups, doomsday cults, extremist political groups, violent supremacy groups, cyber terrorists, and single-issue groups. An alarming trend is lone wolf terrorism - violence by a single actor pursuing political change linked to ideology without outside orders or support.

Active shooter events have prompted discussion of gun laws, mental health, and casualty treatment. The Hartford Consensus recommends a THREAT response plan: Threat suppression, Hemorrhage control, Rapid extrication, Assessment by medical providers, and Transport to definitive care. EMS crews may be equipped with ballistic vests and helmets.

Weapons of Mass Destruction (WMDs) are designed to cause mass death or damage to property and infrastructure. Acronyms BE-NICE (Biologic, Nuclear, Incendiary, Chemical, Explosive) or CBRNE (Chemical, Biologic, Radiologic, Nuclear, Explosive) help remember WMD types. Explosives have been the preferred WMD for terrorists due to relative ease of obtaining and creating.

Chemical agents include vesicants (blister agents), respiratory agents (choking agents), nerve agents, and metabolic agents (cyanides). Vesicants cause burn-like blisters and skin irritation. Respiratory agents damage lung tissue causing pulmonary edema. Nerve agents are extremely toxic and rapidly fatal, requiring DuoDote auto-injectors. Metabolic agents affect oxygen utilization.

Biological agents include bacteria, viruses, and toxins used as weapons. Dissemination methods include aerosol, food/water contamination, and infected vectors. Response includes recognizing unusual disease patterns, implementing isolation precautions, and decontamination procedures.

Radiological and nuclear terrorism involves radioactive materials or nuclear weapons. Radiological Dispersal Devices (RDDs) or`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: ["terrorism", "WMD", "chemical agents", "biological agents", "radiological", "explosives", "disaster management"],
      keyPoints: ["Terrorism: violent acts to intimidate populations or influence government", "Types: international, domestic, lone wolf, active shooter events", "THREAT response: Threat suppression, Hemorrhage control, Rapid extrication, Assessment, Transport", "WMDs: BE-NICE or CBRNE - Biologic, Nuclear, Incendiary, Chemical, Explosive", "Chemical agents: vesicants, respiratory, nerve, metabolic agents", "Nerve agents require DuoDote auto-injectors for treatment", "Biological agents: bacteria, viruses, toxins with delayed symptoms", "Radiological devices: dirty bombs combining explosives with radioactive materials", "Blast injuries: primary (pressure), secondary (debris), tertiary (thrown), quaternary (burns)", "EMT response: scene safety, PPE, control zones, coordination with law enforcement"],
      objectives: ["Define terrorism and describe different types of terrorist threats", "Explain the THREAT response plan for active shooter events", "Identify the categories of weapons of mass destruction", "Describe the effects and treatment of chemical warfare agents", "Explain the characteristics and management of biological agents", "Discuss radiological and nuclear terrorism threats and response", "Identify the patterns of injuries from explosive devices", "Describe EMT response principles for suspected terrorist events"],
      isCompleted: false
    },
  ];

  try {
    // Clear existing study notes
    console.log("Clearing existing study notes...");
    await db.delete(studyNotes);
    
    // Insert all recovered notes
    console.log(`Inserting ${allStudyNotes.length} study notes...`);
    for (const note of allStudyNotes) {
      await db.insert(studyNotes).values(note);
    }
    
    console.log("✅ Study notes seeding completed successfully!");
    console.log(`📚 Inserted ${allStudyNotes.length} chapters`);
    
    return { success: true, count: allStudyNotes.length };
  } catch (error) {
    console.error("❌ Error seeding study notes:", error);
    throw error;
  }
}

// Export for use in other files
export { allStudyNotes };
