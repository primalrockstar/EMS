import { db } from "./db";
import { flashcards } from "@shared/schema";

export async function seedMedicationFlashcards() {
  console.log("Starting medication flashcard seeding...");
  
  // Get all medications
  const medications = await db.query.medications.findMany();
  
  const medicationFlashcards = [
    // EMT-B Level Medications
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Albuterol?",
      answer: "Albuterol is a selective beta-2 adrenergic agonist that activates adenylyl cyclase, increasing cAMP levels, which leads to smooth muscle relaxation and bronchodilation. It also stabilizes mast cells, reducing inflammatory mediator release.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["albuterol", "beta-2", "bronchodilation", "EMT-B", "respiratory"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Albuterol at the EMT-B level?",
      answer: "Albuterol is indicated for acute bronchospasm in asthma, COPD exacerbation, exercise-induced bronchospasm, and as adjunctive therapy in anaphylaxis. EMT-B can administer via nebulizer or MDI.",
      difficulty: "basic",
      category: "indications",
      tags: ["albuterol", "asthma", "COPD", "bronchospasm", "EMT-B"]
    },
    {
      chapterNumber: 12,
      question: "What is the standard EMT-B dose of Albuterol?",
      answer: "Adults: 2.5-5 mg (0.5-1 mL of 0.5% solution) in 3 mL normal saline, nebulized over 5-15 minutes. Pediatric: 1.25-2.5 mg based on weight. Can be repeated every 20 minutes for severe cases.",
      difficulty: "basic",
      category: "dosing",
      tags: ["albuterol", "nebulizer", "dosing", "EMT-B", "pediatric"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Aspirin in cardiac emergencies?",
      answer: "Aspirin irreversibly inhibits cyclooxygenase-1 (COX-1), preventing thromboxane A2 synthesis, which reduces platelet aggregation and vasoconstriction. This antiplatelet effect lasts for the platelet's lifespan (7-10 days).",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["aspirin", "COX-1", "thromboxane", "platelet", "EMT-B", "cardiac"]
    },
    {
      chapterNumber: 12,
      question: "When can EMT-B personnel administer Aspirin?",
      answer: "EMT-B can administer aspirin for suspected acute coronary syndrome (ACS), chest pain suggestive of cardiac origin, and suspected myocardial infarction in patients without contraindications.",
      difficulty: "basic",
      category: "indications",
      tags: ["aspirin", "ACS", "chest-pain", "MI", "EMT-B"]
    },
    {
      chapterNumber: 12,
      question: "What is the EMT-B dose of Aspirin for cardiac emergencies?",
      answer: "160-325 mg (2-4 chewable 81 mg tablets) orally, chewed for rapid absorption. Chewing increases bioavailability and speeds onset of action compared to swallowing whole tablets.",
      difficulty: "basic",
      category: "dosing",
      tags: ["aspirin", "160-325mg", "chewable", "rapid-absorption", "EMT-B"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Epinephrine 1:1,000?",
      answer: "Epinephrine 1:1,000 is a potent alpha and beta adrenergic agonist. Alpha effects cause vasoconstriction; beta-1 effects increase heart rate and contractility; beta-2 effects cause bronchodilation and stabilize mast cells.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["epinephrine-1000", "alpha-beta", "vasoconstriction", "bronchodilation", "EMT-B"]
    },
    {
      chapterNumber: 12,
      question: "When can EMT-B personnel administer Epinephrine 1:1,000?",
      answer: "EMT-B can administer epinephrine 1:1,000 for anaphylaxis, severe allergic reactions, and severe asthma unresponsive to other treatments. It's first-line for anaphylaxis.",
      difficulty: "basic",
      category: "indications",
      tags: ["epinephrine-1000", "anaphylaxis", "allergic-reactions", "severe-asthma", "EMT-B"]
    },
    {
      chapterNumber: 12,
      question: "What is the EMT-B dose of Epinephrine 1:1,000 for anaphylaxis?",
      answer: "Adults: 0.3-0.5 mg (0.3-0.5 mL) IM in anterolateral thigh. Pediatric: 0.01 mg/kg (0.01 mL/kg) IM, maximum 0.3 mg. May repeat every 5-15 minutes if needed. Never give 1:1,000 IV.",
      difficulty: "basic",
      category: "dosing",
      tags: ["epinephrine-1000", "anaphylaxis", "IM", "anterolateral-thigh", "never-IV", "EMT-B"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Oral Glucose?",
      answer: "Oral glucose provides immediate glucose for cellular metabolism, rapidly increasing blood glucose levels when absorbed through the GI tract. It reverses hypoglycemic symptoms by restoring brain glucose availability.",
      difficulty: "basic",
      category: "mechanism",
      tags: ["oral-glucose", "glucose", "metabolism", "hypoglycemia", "EMT-B"]
    },
    {
      chapterNumber: 12,
      question: "When can EMT-B personnel administer Oral Glucose?",
      answer: "EMT-B can administer oral glucose for hypoglycemia (blood glucose <60 mg/dL) in conscious patients who can swallow and protect their airway. Patient must be alert and able to swallow safely.",
      difficulty: "basic",
      category: "indications",
      tags: ["oral-glucose", "hypoglycemia", "conscious", "swallow", "EMT-B"]
    },
    {
      chapterNumber: 12,
      question: "What is the EMT-B dose of Oral Glucose?",
      answer: "Adults: 15-30 g oral gel or tablets. Pediatric: 7.5-15 g for children, adjusted for age/weight. Recheck blood glucose after 10 minutes and repeat if needed.",
      difficulty: "basic",
      category: "dosing",
      tags: ["oral-glucose", "15-30g", "pediatric", "recheck-10min", "EMT-B"]
    },
    {
      chapterNumber: 12,
      question: "What delivery methods can EMT-B use for Oxygen?",
      answer: "Nasal cannula: 1-6 L/min (24-44% FiO2), Simple mask: 6-10 L/min (35-60% FiO2), Non-rebreather mask: 10-15 L/min (60-100% FiO2), Bag-valve mask: 10-15 L/min (100% FiO2).",
      difficulty: "basic",
      category: "delivery-methods",
      tags: ["oxygen", "nasal-cannula", "non-rebreather", "bag-valve-mask", "EMT-B"]
    },

    // AEMT Level Medications
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Dextrose 50%?",
      answer: "Dextrose 50% provides immediate glucose for cellular metabolism, rapidly increasing blood glucose levels. It crosses the blood-brain barrier to provide glucose for brain metabolism and reverse hypoglycemic symptoms.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["dextrose-50", "glucose", "metabolism", "blood-brain-barrier", "AEMT"]
    },
    {
      chapterNumber: 12,
      question: "When can AEMT personnel administer Dextrose 50%?",
      answer: "AEMT can administer dextrose 50% for symptomatic hypoglycemia (blood glucose <60 mg/dL), altered mental status with suspected hypoglycemia, and as empirical treatment in coma of unknown etiology.",
      difficulty: "basic",
      category: "indications",
      tags: ["dextrose-50", "hypoglycemia", "altered-mental-status", "coma", "AEMT"]
    },
    {
      chapterNumber: 12,
      question: "What is the AEMT dose of Dextrose 50%?",
      answer: "Adults: 25-50 mL (12.5-25 g) IV push over 1-2 minutes. Pediatric: Use dextrose 25% at 2-4 mL/kg (0.5-1 g/kg) IV push. Recheck blood glucose after 10 minutes.",
      difficulty: "basic",
      category: "dosing",
      tags: ["dextrose-50", "25-50mL", "pediatric", "dextrose-25", "AEMT"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Glucagon?",
      answer: "Glucagon activates adenylyl cyclase, increasing cAMP levels, which stimulates glycogenolysis and gluconeogenesis in the liver, raising blood glucose. It also has positive inotropic effects on the heart.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["glucagon", "adenylyl-cyclase", "cAMP", "glycogenolysis", "AEMT"]
    },
    {
      chapterNumber: 12,
      question: "When can AEMT personnel administer Glucagon?",
      answer: "AEMT can administer glucagon for severe hypoglycemia when IV access is unavailable, unconscious diabetic patients, and as alternative to dextrose when IV access is difficult.",
      difficulty: "basic",
      category: "indications",
      tags: ["glucagon", "hypoglycemia", "no-IV-access", "unconscious", "AEMT"]
    },
    {
      chapterNumber: 12,
      question: "What is the AEMT dose of Glucagon?",
      answer: "Adults: 1 mg IM/SC, may repeat in 15 minutes if needed. Pediatric: 0.5 mg for weight <20 kg, 1 mg for weight ≥20 kg. Onset 5-15 minutes, duration 1-2 hours.",
      difficulty: "basic",
      category: "dosing",
      tags: ["glucagon", "1mg", "IM-SC", "pediatric", "onset-5-15min", "AEMT"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Naloxone?",
      answer: "Naloxone is a competitive opioid receptor antagonist that displaces opioids from mu, kappa, and delta receptors, rapidly reversing opioid-induced respiratory depression, sedation, and analgesia.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["naloxone", "opioid-antagonist", "competitive", "respiratory-depression", "AEMT"]
    },
    {
      chapterNumber: 12,
      question: "When can AEMT personnel administer Naloxone?",
      answer: "AEMT can administer naloxone for opioid overdose with respiratory depression, suspected opioid intoxication, and reversal of opioid-induced sedation. It's diagnostic and therapeutic.",
      difficulty: "basic",
      category: "indications",
      tags: ["naloxone", "opioid-overdose", "respiratory-depression", "diagnostic", "AEMT"]
    },
    {
      chapterNumber: 12,
      question: "What is the AEMT dose of Naloxone?",
      answer: "Adults: 0.4-2 mg IV/IM/SC/IN, may repeat every 2-3 minutes. Pediatric: 0.01 mg/kg IV/IM/SC/IN, may repeat. Intranasal: 2 mg per nostril.",
      difficulty: "basic",
      category: "dosing",
      tags: ["naloxone", "0.4-2mg", "pediatric", "0.01mg/kg", "intranasal", "AEMT"]
    },

    // Paramedic Level Medications
    {
      chapterNumber: 12,
      question: "What is the primary mechanism of action of Acetylcysteine?",
      answer: "Acetylcysteine works by replenishing glutathione stores and providing free sulfhydryl groups that bind to the toxic metabolite NAPQI (N-acetyl-p-benzoquinone imine) formed during acetaminophen metabolism, preventing hepatotoxicity.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["acetylcysteine", "toxicology", "acetaminophen", "antidote", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Acetylcysteine?",
      answer: "Acetylcysteine is indicated for acetaminophen (paracetamol) overdose, both acute and chronic. It should be given within 8 hours of ingestion for maximum effectiveness, but can be beneficial up to 24 hours post-ingestion.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["acetylcysteine", "toxicology", "overdose", "acetaminophen", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic IV dosing protocol for Acetylcysteine?",
      answer: "Loading dose: 150 mg/kg in 200 mL D5W over 60 minutes, then 50 mg/kg in 500 mL D5W over 4 hours, then 100 mg/kg in 1000 mL D5W over 16 hours. Total treatment duration is 21 hours.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["acetylcysteine", "dosing", "IV", "protocol", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Adenosine?",
      answer: "Adenosine activates A1 receptors in the AV node, causing temporary AV block by hyperpolarizing AV nodal cells and prolonging the refractory period, effectively interrupting reentrant tachycardia circuits.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["adenosine", "cardiac", "AV-block", "reentrant", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Adenosine?",
      answer: "Adenosine is indicated for stable supraventricular tachycardia (SVT) including AV nodal reentrant tachycardia (AVNRT) and AV reentrant tachycardia (AVRT). It can also be used diagnostically for wide-complex tachycardia.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["adenosine", "SVT", "AVNRT", "AVRT", "diagnostic", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dosing for Adenosine?",
      answer: "Initial dose: 6 mg IV push rapidly followed immediately by 20 mL saline flush. If no response in 1-2 minutes, give 12 mg IV push with flush. May repeat 12 mg once more if needed. Use large peripheral IV or central line.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["adenosine", "dosing", "IV-push", "flush", "rapid", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Amiodarone?",
      answer: "Amiodarone is a Class III antiarrhythmic that blocks multiple ion channels including sodium, potassium, and calcium channels, and has alpha and beta-blocking properties. It prolongs action potential duration and refractory period.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["amiodarone", "class-III", "potassium", "sodium", "calcium", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Amiodarone?",
      answer: "Amiodarone is indicated for life-threatening ventricular arrhythmias including VT and VF, atrial fibrillation/flutter, and SVT refractory to other treatments. It's used in both stable and unstable rhythms.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["amiodarone", "VT", "VF", "atrial-fibrillation", "SVT", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic IV loading dose of Amiodarone?",
      answer: "For cardiac arrest (VF/VT): 300 mg IV/IO push, may repeat with 150 mg IV/IO push once. For stable VT: 150 mg IV over 10 minutes, then 1 mg/min infusion for 6 hours, then 0.5 mg/min.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["amiodarone", "cardiac-arrest", "VF", "VT", "loading-dose", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Atropine?",
      answer: "Atropine is an anticholinergic agent that competitively antagonizes acetylcholine at muscarinic receptors, blocking parasympathetic nervous system effects and increasing heart rate by reducing vagal tone.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["atropine", "anticholinergic", "muscarinic", "acetylcholine", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Atropine?",
      answer: "Atropine is indicated for symptomatic bradycardia with hemodynamic compromise, AV blocks, organophosphate poisoning, and as a premedication to reduce secretions. It's also used in asystole protocols.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["atropine", "bradycardia", "AV-blocks", "organophosphate", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Atropine for bradycardia?",
      answer: "Adults: 0.5-1 mg IV push, may repeat every 3-5 minutes to maximum of 3 mg. Pediatric: 0.02 mg/kg IV/IO, minimum 0.1 mg, maximum single dose 0.5 mg in children, 1 mg in adolescents.",
      difficulty: "basic",
      category: "dosing",
      tags: ["atropine", "bradycardia", "0.5-1mg", "pediatric", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Calcium Gluconate?",
      answer: "Calcium gluconate provides calcium ions that stabilize cell membranes, particularly cardiac myocytes, and antagonizes the effects of hyperkalemia by restoring normal membrane potential and cardiac conduction.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["calcium-gluconate", "membrane-stabilization", "hyperkalemia", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Calcium Gluconate?",
      answer: "Calcium gluconate is indicated for hyperkalemia with ECG changes, calcium channel blocker overdose, magnesium sulfate overdose, and hypocalcemia. It's also used in hydrofluoric acid burns.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["calcium-gluconate", "hyperkalemia", "calcium-channel-blocker", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Calcium Gluconate?",
      answer: "Adults: 1-2 grams (10-20 mL of 10% solution) IV over 2-5 minutes, may repeat in 5-10 minutes if needed. Pediatric: 60-100 mg/kg (0.6-1 mL/kg of 10% solution) IV over 2-5 minutes.",
      difficulty: "basic",
      category: "dosing",
      tags: ["calcium-gluconate", "1-2grams", "pediatric", "slow-IV", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Dexamethasone?",
      answer: "Dexamethasone is a synthetic corticosteroid that binds to glucocorticoid receptors, suppressing inflammatory response, stabilizing cell membranes, and reducing capillary permeability. It has potent anti-inflammatory effects.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["dexamethasone", "corticosteroid", "glucocorticoid", "anti-inflammatory", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Dexamethasone?",
      answer: "Dexamethasone is indicated for severe asthma exacerbation, COPD exacerbation, croup, allergic reactions, cerebral edema, and as adjunctive therapy in anaphylaxis. It's particularly useful in pediatric croup.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["dexamethasone", "asthma", "COPD", "croup", "allergic-reactions", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Dexamethasone?",
      answer: "Pediatric croup: 0.15-0.6 mg/kg (maximum 10 mg) PO, IM, or IV. Adult asthma: 4-8 mg IV/IM. Cerebral edema: 4-6 mg IV every 6 hours. Single dose is often sufficient for croup.",
      difficulty: "basic",
      category: "dosing",
      tags: ["dexamethasone", "croup", "pediatric", "0.15-0.6mg/kg", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Diphenhydramine?",
      answer: "Diphenhydramine is a first-generation antihistamine that competitively blocks H1 histamine receptors, preventing histamine-mediated allergic reactions. It also has anticholinergic and sedative properties.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["diphenhydramine", "antihistamine", "H1-receptor", "histamine", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Diphenhydramine?",
      answer: "Diphenhydramine is indicated for allergic reactions, anaphylaxis (adjunctive therapy), extrapyramidal reactions, motion sickness, and as a sedative. It's commonly used with epinephrine in anaphylaxis.",
      difficulty: "basic",
      category: "indications",
      tags: ["diphenhydramine", "allergic-reactions", "anaphylaxis", "extrapyramidal", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Diphenhydramine?",
      answer: "Adults: 25-50 mg IV/IM/PO every 6-8 hours. Pediatric: 1-1.5 mg/kg IV/IM/PO every 6-8 hours, maximum 50 mg per dose. For severe reactions, IV route is preferred.",
      difficulty: "basic",
      category: "dosing",
      tags: ["diphenhydramine", "25-50mg", "pediatric", "1-1.5mg/kg", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Dobutamine?",
      answer: "Dobutamine is a synthetic catecholamine that primarily stimulates beta-1 adrenergic receptors, increasing myocardial contractility and heart rate. It has minimal effect on peripheral vascular resistance.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["dobutamine", "beta-1", "catecholamine", "contractility", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Dobutamine?",
      answer: "Dobutamine is indicated for cardiogenic shock, heart failure with reduced ejection fraction, and as an inotropic support in cardiac decompensation. It's used when increased contractility is needed.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["dobutamine", "cardiogenic-shock", "heart-failure", "inotropic", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dosing range for Dobutamine?",
      answer: "Dobutamine is given as continuous IV infusion: 2.5-15 mcg/kg/min, titrated to effect. Start at 2.5 mcg/kg/min and increase by 2.5 mcg/kg/min every 5-10 minutes based on hemodynamic response.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["dobutamine", "continuous-infusion", "2.5-15mcg/kg/min", "titrated", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Dopamine?",
      answer: "Dopamine has dose-dependent effects: low doses (2-5 mcg/kg/min) stimulate dopamine receptors causing renal vasodilation; moderate doses (5-10 mcg/kg/min) stimulate beta-1 receptors increasing contractility; high doses (>10 mcg/kg/min) stimulate alpha receptors causing vasoconstriction.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["dopamine", "dose-dependent", "dopamine-receptors", "beta-1", "alpha", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Dopamine?",
      answer: "Dopamine is indicated for cardiogenic shock, severe heart failure, hypotension refractory to fluid resuscitation, and as second-line vasopressor after norepinephrine. It provides both inotropic and vasopressor effects.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["dopamine", "cardiogenic-shock", "heart-failure", "hypotension", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic dosing ranges for Dopamine?",
      answer: "Dopamine infusion ranges: 2-5 mcg/kg/min (renal dose), 5-10 mcg/kg/min (cardiac dose for contractility), 10-20 mcg/kg/min (vasopressor dose). Start low and titrate to effect.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["dopamine", "2-5mcg", "5-10mcg", "10-20mcg", "renal-cardiac-vasopressor", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Epinephrine 1:10,000?",
      answer: "Epinephrine 1:10,000 contains 0.1 mg/mL (for IV use in cardiac arrest). In cardiac arrest, epinephrine's alpha-adrenergic effects increase coronary and cerebral perfusion pressure during CPR, improving chances of ROSC.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["epinephrine-10000", "cardiac-arrest", "alpha-adrenergic", "perfusion-pressure", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Epinephrine 1:10,000?",
      answer: "Epinephrine 1:10,000 is indicated for cardiac arrest (VF, VT, asystole, PEA), severe bradycardia unresponsive to atropine, and severe hypotension. It's given IV/IO during resuscitation.",
      difficulty: "basic",
      category: "indications",
      tags: ["epinephrine-10000", "cardiac-arrest", "VF", "VT", "asystole", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Epinephrine 1:10,000?",
      answer: "Adults: 1 mg (10 mL of 1:10,000) IV/IO every 3-5 minutes during CPR. Pediatric: 0.01 mg/kg (0.1 mL/kg of 1:10,000) IV/IO every 3-5 minutes, maximum 1 mg per dose.",
      difficulty: "basic",
      category: "dosing",
      tags: ["epinephrine-10000", "1mg", "3-5minutes", "pediatric", "0.01mg/kg", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Fentanyl?",
      answer: "Fentanyl is a synthetic opioid that binds to mu-opioid receptors in the brain and spinal cord, blocking pain transmission and producing analgesia. It's 50-100 times more potent than morphine.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["fentanyl", "opioid", "mu-opioid-receptors", "analgesia", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Fentanyl?",
      answer: "Fentanyl is indicated for severe pain, procedural sedation, rapid sequence intubation, and as an adjunct to anesthesia. It's preferred over morphine for hemodynamically unstable patients.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["fentanyl", "severe-pain", "procedural-sedation", "RSI", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Fentanyl?",
      answer: "Adults: 1-2 mcg/kg IV/IM/IN, may repeat every 5-10 minutes. Pediatric: 1-2 mcg/kg IV/IM/IN, maximum 100 mcg per dose. Intranasal route useful when IV access difficult.",
      difficulty: "basic",
      category: "dosing",
      tags: ["fentanyl", "1-2mcg/kg", "intranasal", "pediatric", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Flumazenil?",
      answer: "Flumazenil is a competitive benzodiazepine receptor antagonist that reverses the effects of benzodiazepines by blocking their binding to GABA-A receptors, reversing sedation, respiratory depression, and muscle relaxation.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["flumazenil", "benzodiazepine-antagonist", "GABA-A", "competitive", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Flumazenil?",
      answer: "Flumazenil is indicated for benzodiazepine overdose with respiratory depression, reversal of procedural sedation, and suspected benzodiazepine toxicity. It's diagnostic and therapeutic for benzodiazepine poisoning.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["flumazenil", "benzodiazepine-overdose", "respiratory-depression", "diagnostic", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Flumazenil?",
      answer: "Adults: 0.2 mg IV over 30 seconds, may repeat 0.3 mg, then 0.5 mg every minute to maximum 3 mg. Pediatric: 0.01 mg/kg IV over 15 seconds, may repeat every minute to maximum 1 mg.",
      difficulty: "basic",
      category: "dosing",
      tags: ["flumazenil", "0.2mg", "pediatric", "0.01mg/kg", "maximum-3mg", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Furosemide?",
      answer: "Furosemide is a loop diuretic that inhibits the Na-K-2Cl co-transporter in the ascending limb of the loop of Henle, preventing sodium and chloride reabsorption, leading to increased urine production and decreased preload.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["furosemide", "loop-diuretic", "Na-K-2Cl", "loop-of-Henle", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Furosemide?",
      answer: "Furosemide is indicated for acute pulmonary edema, congestive heart failure, hypertensive emergencies, and fluid overload. It's commonly used in cardiogenic pulmonary edema.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["furosemide", "pulmonary-edema", "CHF", "hypertensive-emergency", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Furosemide?",
      answer: "Adults: 40-80 mg IV push, may repeat or double dose in 30 minutes if needed. If patient on chronic furosemide, give dose equal to or greater than daily dose. Monitor for hypotension.",
      difficulty: "basic",
      category: "dosing",
      tags: ["furosemide", "40-80mg", "IV-push", "chronic-furosemide", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Haloperidol?",
      answer: "Haloperidol is a butyrophenone antipsychotic that blocks dopamine D2 receptors in the brain, particularly in the mesolimbic and mesocortical pathways, reducing psychotic symptoms and agitation.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["haloperidol", "butyrophenone", "dopamine-D2", "mesolimbic", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Haloperidol?",
      answer: "Haloperidol is indicated for acute psychosis, severe agitation, combative behavior, and as adjunct in excited delirium. It's used for chemical restraint in violent patients.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["haloperidol", "acute-psychosis", "agitation", "combative", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Haloperidol?",
      answer: "Adults: 5-10 mg IM/IV, may repeat every 30-60 minutes as needed. Elderly: 1-2 mg IM/IV. Pediatric: 0.05-0.15 mg/kg IM/IV. Monitor for QT prolongation with IV use.",
      difficulty: "basic",
      category: "dosing",
      tags: ["haloperidol", "5-10mg", "elderly", "pediatric", "QT-prolongation", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Ipratropium?",
      answer: "Ipratropium is an anticholinergic bronchodilator that blocks muscarinic receptors in the airways, preventing acetylcholine-mediated bronchoconstriction and reducing mucus secretion.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["ipratropium", "anticholinergic", "bronchodilator", "muscarinic", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Ipratropium?",
      answer: "Ipratropium is indicated for COPD exacerbation, severe asthma (combined with albuterol), and bronchospasm. It's particularly effective in COPD and as adjunct to beta-2 agonists.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["ipratropium", "COPD", "severe-asthma", "bronchospasm", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Ipratropium?",
      answer: "Adults: 0.5 mg (2.5 mL) via nebulizer, may repeat every 20 minutes for 3 doses, then every 2-4 hours. Often combined with albuterol in the same nebulizer.",
      difficulty: "basic",
      category: "dosing",
      tags: ["ipratropium", "0.5mg", "nebulizer", "every-20min", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Ketorolac?",
      answer: "Ketorolac is a non-steroidal anti-inflammatory drug (NSAID) that inhibits cyclooxygenase (COX) enzymes, reducing prostaglandin synthesis and providing potent anti-inflammatory and analgesic effects.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["ketorolac", "NSAID", "cyclooxygenase", "COX", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Ketorolac?",
      answer: "Ketorolac is indicated for moderate to severe pain, particularly post-operative pain, renal colic, and pain where opioids are contraindicated. It has morphine-equivalent analgesic potency.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["ketorolac", "moderate-severe-pain", "renal-colic", "morphine-equivalent", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Ketorolac?",
      answer: "Adults: 30-60 mg IM or 15-30 mg IV every 6 hours, maximum 5 days. Elderly (>65 years): 15 mg IM or IV every 6 hours. Not recommended in pediatric patients.",
      difficulty: "basic",
      category: "dosing",
      tags: ["ketorolac", "30-60mg-IM", "15-30mg-IV", "elderly", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Lidocaine?",
      answer: "Lidocaine is a Class IB antiarrhythmic that blocks voltage-gated sodium channels, stabilizing cardiac cell membranes and suppressing ventricular arrhythmias. It also provides local anesthesia by blocking nerve conduction.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["lidocaine", "class-IB", "sodium-channels", "ventricular-arrhythmias", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Lidocaine?",
      answer: "Lidocaine is indicated for ventricular tachycardia, ventricular fibrillation, ventricular ectopy, and as local anesthesia for procedures. It's alternative to amiodarone in cardiac arrest.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["lidocaine", "ventricular-tachycardia", "ventricular-fibrillation", "local-anesthesia", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Lidocaine?",
      answer: "Adults: 1-1.5 mg/kg IV push, may repeat 0.5-0.75 mg/kg every 5-10 minutes to maximum 3 mg/kg. Maintenance infusion: 1-4 mg/min. Reduce dose in heart failure or liver disease.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["lidocaine", "1-1.5mg/kg", "maintenance-infusion", "heart-failure", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Lorazepam?",
      answer: "Lorazepam is a benzodiazepine that enhances GABA neurotransmission by increasing the frequency of chloride channel opening, producing anxiolysis, sedation, anticonvulsant effects, and muscle relaxation.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["lorazepam", "benzodiazepine", "GABA", "chloride-channel", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Lorazepam?",
      answer: "Lorazepam is indicated for status epilepticus, seizures, severe anxiety, agitation, alcohol withdrawal, and premedication. It's first-line for status epilepticus.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["lorazepam", "status-epilepticus", "seizures", "anxiety", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Lorazepam?",
      answer: "Adults: 0.1 mg/kg IV (usually 4-8 mg), may repeat in 5-10 minutes if seizures continue. Pediatric: 0.05-0.1 mg/kg IV/IM/rectal, may repeat once. Maximum single dose 4 mg.",
      difficulty: "basic",
      category: "dosing",
      tags: ["lorazepam", "0.1mg/kg", "4-8mg", "pediatric", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Magnesium Sulfate?",
      answer: "Magnesium sulfate acts as a calcium channel blocker, membrane stabilizer, and smooth muscle relaxant. It has anticonvulsant properties and can reverse digitalis-induced arrhythmias by normalizing cellular electrolyte balance.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["magnesium-sulfate", "calcium-channel-blocker", "membrane-stabilizer", "anticonvulsant", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Magnesium Sulfate?",
      answer: "Magnesium sulfate is indicated for eclampsia, pre-eclampsia, torsades de pointes, severe asthma, hypomagnesemia, and digitalis toxicity. It's first-line for eclampsia and torsades de pointes.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["magnesium-sulfate", "eclampsia", "pre-eclampsia", "torsades-de-pointes", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Magnesium Sulfate?",
      answer: "Adults: 4-6 g IV over 5-10 minutes for eclampsia, then 1-2 g/hr infusion. For torsades de pointes: 2 g IV over 1-2 minutes, may repeat. Asthma: 2 g IV over 20 minutes.",
      difficulty: "basic",
      category: "dosing",
      tags: ["magnesium-sulfate", "4-6g", "torsades", "2g", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Methylprednisolone?",
      answer: "Methylprednisolone is a synthetic corticosteroid that binds to glucocorticoid receptors, suppressing inflammatory response, stabilizing lysosomal membranes, and reducing capillary permeability and immune system activity.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["methylprednisolone", "corticosteroid", "glucocorticoid-receptors", "anti-inflammatory", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Methylprednisolone?",
      answer: "Methylprednisolone is indicated for severe asthma exacerbation, COPD exacerbation, allergic reactions, spinal cord injury, and inflammatory conditions. It's potent anti-inflammatory agent.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["methylprednisolone", "severe-asthma", "COPD", "spinal-cord-injury", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Methylprednisolone?",
      answer: "Adults: 125-250 mg IV every 6 hours for severe asthma. Pediatric: 1-2 mg/kg IV every 6 hours, maximum 125 mg per dose. Spinal cord injury: 30 mg/kg IV bolus, then 5.4 mg/kg/hr infusion.",
      difficulty: "basic",
      category: "dosing",
      tags: ["methylprednisolone", "125-250mg", "pediatric", "spinal-cord-injury", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Morphine?",
      answer: "Morphine is an opioid agonist that binds to mu-opioid receptors in the brain, spinal cord, and peripheral tissues, inhibiting pain transmission and producing analgesia, sedation, and euphoria.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["morphine", "opioid-agonist", "mu-opioid-receptors", "analgesia", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Morphine?",
      answer: "Morphine is indicated for severe pain, myocardial infarction, pulmonary edema, and palliative care. It's gold standard for severe pain management and reduces preload in heart failure.",
      difficulty: "basic",
      category: "indications",
      tags: ["morphine", "severe-pain", "myocardial-infarction", "pulmonary-edema", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Morphine?",
      answer: "Adults: 2-10 mg IV every 5-15 minutes or 5-15 mg IM every 4 hours. Pediatric: 0.1-0.2 mg/kg IV/IM every 2-4 hours. Start with lower doses and titrate to effect.",
      difficulty: "basic",
      category: "dosing",
      tags: ["morphine", "2-10mg-IV", "5-15mg-IM", "pediatric", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Nitroglycerin?",
      answer: "Nitroglycerin is metabolized to nitric oxide, which activates guanylate cyclase, increasing cGMP levels, causing smooth muscle relaxation, venodilation (reducing preload), and coronary vasodilation.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["nitroglycerin", "nitric-oxide", "guanylate-cyclase", "cGMP", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Nitroglycerin?",
      answer: "Nitroglycerin is indicated for angina pectoris, acute coronary syndrome, congestive heart failure, and hypertensive emergencies. It's first-line for angina and reduces cardiac workload.",
      difficulty: "basic",
      category: "indications",
      tags: ["nitroglycerin", "angina-pectoris", "acute-coronary-syndrome", "CHF", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Nitroglycerin?",
      answer: "Sublingual: 0.3-0.4 mg every 5 minutes for 3 doses maximum. IV: 10-20 mcg/min, increase by 10-20 mcg/min every 3-5 minutes. Avoid if systolic BP <90 mmHg.",
      difficulty: "basic",
      category: "dosing",
      tags: ["nitroglycerin", "sublingual", "0.3-0.4mg", "IV", "systolic-BP-90", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Norepinephrine?",
      answer: "Norepinephrine is a potent alpha-1 and alpha-2 adrenergic agonist with minimal beta activity, causing intense vasoconstriction, increased blood pressure, and increased systemic vascular resistance.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["norepinephrine", "alpha-1", "alpha-2", "vasoconstriction", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Norepinephrine?",
      answer: "Norepinephrine is indicated for septic shock, distributive shock, severe hypotension unresponsive to fluid resuscitation, and as first-line vasopressor in septic shock per guidelines.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["norepinephrine", "septic-shock", "distributive-shock", "first-line-vasopressor", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dosing range for Norepinephrine?",
      answer: "Norepinephrine infusion: 0.1-3 mcg/kg/min (8-30 mcg/min for 70 kg adult), titrated to maintain MAP >65 mmHg. Requires central venous access due to extravasation risk.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["norepinephrine", "0.1-3mcg/kg/min", "MAP-65", "central-venous-access", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Ondansetron?",
      answer: "Ondansetron is a selective 5-HT3 receptor antagonist that blocks serotonin receptors in the chemoreceptor trigger zone and vagal afferents, preventing nausea and vomiting.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["ondansetron", "5-HT3-antagonist", "serotonin", "chemoreceptor-trigger-zone", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Ondansetron?",
      answer: "Ondansetron is indicated for nausea and vomiting from any cause, chemotherapy-induced nausea, post-operative nausea, and motion sickness. It's highly effective antiemetic.",
      difficulty: "basic",
      category: "indications",
      tags: ["ondansetron", "nausea", "vomiting", "chemotherapy-induced", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Ondansetron?",
      answer: "Adults: 4-8 mg IV/IM/PO every 6-8 hours. Pediatric: 0.15 mg/kg IV/IM (4-11 years: 4 mg, >11 years: 8 mg). Maximum 16 mg per day due to QT prolongation risk.",
      difficulty: "basic",
      category: "dosing",
      tags: ["ondansetron", "4-8mg", "pediatric", "0.15mg/kg", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Phenytoin?",
      answer: "Phenytoin blocks voltage-gated sodium channels in neurons, stabilizing neuronal membranes and preventing the spread of seizure activity. It has minimal effect on normal neuronal function.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["phenytoin", "voltage-gated-sodium-channels", "neuronal-membranes", "seizure-activity", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Phenytoin?",
      answer: "Phenytoin is indicated for status epilepticus, seizure prophylaxis in head trauma, and maintenance therapy for epilepsy. It's second-line after benzodiazepines for status epilepticus.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["phenytoin", "status-epilepticus", "seizure-prophylaxis", "head-trauma", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Phenytoin?",
      answer: "Adults: 15-20 mg/kg IV at rate ≤50 mg/min. Pediatric: 15-20 mg/kg IV at rate ≤1 mg/kg/min. Must dilute in normal saline; precipitates in dextrose solutions.",
      difficulty: "basic",
      category: "dosing",
      tags: ["phenytoin", "15-20mg/kg", "50mg/min", "pediatric", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Procainamide?",
      answer: "Procainamide is a Class IA antiarrhythmic that blocks fast sodium channels, prolongs action potential duration and refractory period, and has anticholinergic properties.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["procainamide", "class-IA", "sodium-channels", "action-potential", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Procainamide?",
      answer: "Procainamide is indicated for stable wide-complex tachycardia, atrial fibrillation with rapid ventricular response, and ventricular tachycardia. It's alternative to amiodarone for stable VT.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["procainamide", "wide-complex-tachycardia", "atrial-fibrillation", "ventricular-tachycardia", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Procainamide?",
      answer: "Adults: 100 mg IV every 5 minutes until arrhythmia suppressed, hypotension occurs, QRS widens >50%, or maximum 17 mg/kg given. Maintenance: 1-4 mg/min infusion.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["procainamide", "100mg", "every-5min", "QRS-widens-50", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Sodium Bicarbonate?",
      answer: "Sodium bicarbonate acts as a buffer, neutralizing excess hydrogen ions and increasing blood pH and bicarbonate levels. It shifts potassium intracellularly and can reverse sodium channel blockade.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["sodium-bicarbonate", "buffer", "hydrogen-ions", "pH", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Sodium Bicarbonate?",
      answer: "Sodium bicarbonate is indicated for severe metabolic acidosis, hyperkalemia, tricyclic antidepressant overdose, and urinary alkalinization. Limited use in cardiac arrest.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["sodium-bicarbonate", "metabolic-acidosis", "hyperkalemia", "tricyclic-overdose", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Sodium Bicarbonate?",
      answer: "Adults: 1-2 mEq/kg IV push, may repeat half dose every 10 minutes based on ABG. Pediatric: 1-2 mEq/kg IV push. For hyperkalemia: 1-2 mEq/kg IV push.",
      difficulty: "basic",
      category: "dosing",
      tags: ["sodium-bicarbonate", "1-2mEq/kg", "pediatric", "hyperkalemia", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Thiamine?",
      answer: "Thiamine (Vitamin B1) is a cofactor for carbohydrate metabolism enzymes, particularly pyruvate dehydrogenase and α-ketoglutarate dehydrogenase, essential for glucose metabolism and ATP production.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["thiamine", "vitamin-B1", "cofactor", "carbohydrate-metabolism", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Thiamine?",
      answer: "Thiamine is indicated for suspected thiamine deficiency, chronic alcoholism, malnutrition, and before glucose administration in altered mental status to prevent Wernicke's encephalopathy.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["thiamine", "thiamine-deficiency", "chronic-alcoholism", "Wernicke's-encephalopathy", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Thiamine?",
      answer: "Adults: 100-500 mg IV/IM, typically 100 mg IV/IM daily. Give before glucose in suspected alcoholics or malnourished patients. Pediatric: 10-25 mg IV/IM daily.",
      difficulty: "basic",
      category: "dosing",
      tags: ["thiamine", "100-500mg", "before-glucose", "alcoholics", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Vasopressin?",
      answer: "Vasopressin acts on V1 receptors causing vasoconstriction and on V2 receptors increasing water reabsorption in kidneys. In cardiac arrest, it provides non-adrenergic vasoconstriction.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["vasopressin", "V1-receptors", "vasoconstriction", "V2-receptors", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Vasopressin?",
      answer: "Vasopressin is indicated for cardiac arrest (alternative to epinephrine), septic shock, and diabetes insipidus. It's used when catecholamine responsiveness is decreased.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["vasopressin", "cardiac-arrest", "alternative-epinephrine", "septic-shock", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Vasopressin?",
      answer: "Adults: 40 units IV/IO as one-time dose, can replace first or second dose of epinephrine. For septic shock: 0.01-0.04 units/min continuous infusion.",
      difficulty: "basic",
      category: "dosing",
      tags: ["vasopressin", "40-units", "one-time-dose", "septic-shock", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Verapamil?",
      answer: "Verapamil is a calcium channel blocker that blocks L-type calcium channels, slowing conduction through the AV node, reducing heart rate, and decreasing myocardial contractility.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["verapamil", "calcium-channel-blocker", "L-type-calcium", "AV-node", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What are the Paramedic indications for Verapamil?",
      answer: "Verapamil is indicated for supraventricular tachycardia, atrial fibrillation/flutter with rapid ventricular response, and hypertension. It's alternative to adenosine for SVT.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["verapamil", "supraventricular-tachycardia", "atrial-fibrillation", "alternative-adenosine", "Paramedic"]
    },
    {
      chapterNumber: 12,
      question: "What is the Paramedic dose of Verapamil?",
      answer: "Adults: 2.5-5 mg IV over 2 minutes, may repeat 5-10 mg every 15-30 minutes to maximum 20 mg. Elderly: 2.5 mg IV over 2 minutes. Not recommended in pediatrics.",
      difficulty: "basic",
      category: "dosing",
      tags: ["verapamil", "2.5-5mg", "over-2min", "maximum-20mg", "elderly", "Paramedic"]
    }
  ];

  // Insert flashcards in batches
  console.log(`Inserting ${medicationFlashcards.length} medication flashcards organized by scope of practice...`);
  
  for (const flashcard of medicationFlashcards) {
    await db.insert(flashcards).values(flashcard);
  }

  console.log("Medication flashcard seeding completed successfully!");
}

// Run the seeding function
seedMedicationFlashcards().catch(console.error);
    {
      chapterNumber: 12,
      question: "What are the indications for Acetylcysteine administration?",
      answer: "Acetylcysteine is indicated for acetaminophen (paracetamol) overdose, both acute and chronic. It should be given within 8 hours of ingestion for maximum effectiveness, but can be beneficial up to 24 hours post-ingestion.",
      difficulty: "basic",
      category: "indications",
      tags: ["acetylcysteine", "toxicology", "overdose", "acetaminophen"]
    },
    {
      chapterNumber: 12,
      question: "What is the standard IV dosing protocol for Acetylcysteine in acetaminophen overdose?",
      answer: "Loading dose: 150 mg/kg in 200 mL D5W over 60 minutes, then 50 mg/kg in 500 mL D5W over 4 hours, then 100 mg/kg in 1000 mL D5W over 16 hours. Total treatment duration is 21 hours.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["acetylcysteine", "dosing", "IV", "protocol"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Acetylcysteine?",
      answer: "There are no absolute contraindications for Acetylcysteine in acetaminophen overdose. Relative contraindications include known hypersensitivity to acetylcysteine, but the risk-benefit ratio favors treatment in life-threatening overdose.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["acetylcysteine", "contraindications", "hypersensitivity"]
    },
    {
      chapterNumber: 12,
      question: "What are the common side effects of Acetylcysteine?",
      answer: "Common side effects include nausea, vomiting, anaphylactoid reactions (flushing, rash, bronchospasm), and rarely anaphylaxis. IV administration has higher risk of allergic reactions than oral administration.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["acetylcysteine", "side-effects", "anaphylactoid", "allergic"]
    },

    // Activated Charcoal
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Activated Charcoal?",
      answer: "Activated charcoal works by adsorption, binding to toxins in the gastrointestinal tract through van der Waals forces and preventing their absorption into the systemic circulation.",
      difficulty: "basic",
      category: "mechanism",
      tags: ["activated-charcoal", "toxicology", "adsorption", "GI"]
    },
    {
      chapterNumber: 12,
      question: "What substances does Activated Charcoal NOT effectively bind to?",
      answer: "Activated charcoal does not effectively bind to acids, alkalis, alcohols, iron, lithium, potassium, sodium, cyanide, and hydrocarbons. It also has poor binding to small molecules and ionic compounds.",
      difficulty: "advanced",
      category: "limitations",
      tags: ["activated-charcoal", "limitations", "ineffective", "toxins"]
    },
    {
      chapterNumber: 12,
      question: "What is the standard dose of Activated Charcoal for overdose?",
      answer: "Adults: 25-100 g orally, typically 50-100 g. Pediatric: 1-2 g/kg, maximum 50 g. Should be given within 1 hour of ingestion for maximum effectiveness.",
      difficulty: "basic",
      category: "dosing",
      tags: ["activated-charcoal", "dosing", "overdose", "timing"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Activated Charcoal?",
      answer: "Contraindications include altered mental status without airway protection, GI obstruction, perforation, caustic ingestion, and hydrocarbon ingestion with aspiration risk.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["activated-charcoal", "contraindications", "airway", "caustic"]
    },
    {
      chapterNumber: 12,
      question: "What complications can occur with Activated Charcoal administration?",
      answer: "Complications include aspiration pneumonia (especially in altered mental status), constipation, bowel obstruction, and black stools. Aspiration is the most serious complication.",
      difficulty: "intermediate",
      category: "complications",
      tags: ["activated-charcoal", "complications", "aspiration", "pneumonia"]
    },

    // Adenosine
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Adenosine?",
      answer: "Adenosine activates A1 receptors in the AV node, causing temporary AV block by hyperpolarizing AV nodal cells and prolonging the refractory period, effectively interrupting reentrant tachycardia circuits.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["adenosine", "cardiac", "AV-block", "reentrant"]
    },
    {
      chapterNumber: 12,
      question: "What are the primary indications for Adenosine?",
      answer: "Adenosine is indicated for stable supraventricular tachycardia (SVT) including AV nodal reentrant tachycardia (AVNRT) and AV reentrant tachycardia (AVRT). It can also be used diagnostically for wide-complex tachycardia.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["adenosine", "SVT", "AVNRT", "AVRT", "diagnostic"]
    },
    {
      chapterNumber: 12,
      question: "What is the correct dosing and administration technique for Adenosine?",
      answer: "Initial dose: 6 mg IV push rapidly followed immediately by 20 mL saline flush. If no response in 1-2 minutes, give 12 mg IV push with flush. May repeat 12 mg once more if needed. Use large peripheral IV or central line.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["adenosine", "dosing", "IV-push", "flush", "rapid"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Adenosine?",
      answer: "Contraindications include second or third-degree AV block, sick sinus syndrome, symptomatic bradycardia, severe asthma/COPD, and known hypersensitivity to adenosine.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["adenosine", "contraindications", "AV-block", "asthma", "bradycardia"]
    },
    {
      chapterNumber: 12,
      question: "What are the common side effects of Adenosine?",
      answer: "Common side effects include transient chest pain, dyspnea, flushing, brief asystole (1-15 seconds), sense of impending doom, and metallic taste. Most effects last <30 seconds due to short half-life.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["adenosine", "side-effects", "chest-pain", "asystole", "transient"]
    },

    // Albuterol
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Albuterol?",
      answer: "Albuterol is a selective beta-2 adrenergic agonist that activates adenylyl cyclase, increasing cAMP levels, which leads to smooth muscle relaxation and bronchodilation. It also stabilizes mast cells, reducing inflammatory mediator release.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["albuterol", "beta-2", "bronchodilation", "cAMP", "mast-cells"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Albuterol?",
      answer: "Albuterol is indicated for acute bronchospasm in asthma, COPD exacerbation, exercise-induced bronchospasm, and as adjunctive therapy in anaphylaxis. It can also be used for hyperkalemia treatment.",
      difficulty: "basic",
      category: "indications",
      tags: ["albuterol", "asthma", "COPD", "bronchospasm", "anaphylaxis"]
    },
    {
      chapterNumber: 12,
      question: "What is the standard nebulizer dose of Albuterol?",
      answer: "Adults: 2.5-5 mg (0.5-1 mL of 0.5% solution) in 3 mL normal saline, nebulized over 5-15 minutes. Pediatric: 1.25-2.5 mg based on weight. Can be repeated every 20 minutes for severe cases.",
      difficulty: "basic",
      category: "dosing",
      tags: ["albuterol", "nebulizer", "dosing", "pediatric", "repeat"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Albuterol?",
      answer: "Contraindications include hypersensitivity to albuterol or sympathomimetics. Relative contraindications include severe tachycardia >180 bpm, severe hypertension, and known cardiac arrhythmias.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["albuterol", "contraindications", "tachycardia", "hypertension", "arrhythmias"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Albuterol?",
      answer: "Side effects include tachycardia, palpitations, tremor, nervousness, headache, hypokalemia, hyperglycemia, and rarely paradoxical bronchospasm. Cardiac effects are more common with excessive dosing.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["albuterol", "side-effects", "tachycardia", "tremor", "hypokalemia"]
    },

    // Amiodarone
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Amiodarone?",
      answer: "Amiodarone is a Class III antiarrhythmic that blocks multiple ion channels including sodium, potassium, and calcium channels, and has alpha and beta-blocking properties. It prolongs action potential duration and refractory period.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["amiodarone", "class-III", "potassium", "sodium", "calcium", "antiarrhythmic"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Amiodarone?",
      answer: "Amiodarone is indicated for life-threatening ventricular arrhythmias including VT and VF, atrial fibrillation/flutter, and SVT refractory to other treatments. It's used in both stable and unstable rhythms.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["amiodarone", "VT", "VF", "atrial-fibrillation", "SVT", "arrhythmias"]
    },
    {
      chapterNumber: 12,
      question: "What is the IV loading dose of Amiodarone for cardiac arrest?",
      answer: "For cardiac arrest (VF/VT): 300 mg IV/IO push, may repeat with 150 mg IV/IO push once. For stable VT: 150 mg IV over 10 minutes, then 1 mg/min infusion for 6 hours, then 0.5 mg/min.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["amiodarone", "cardiac-arrest", "VF", "VT", "loading-dose", "infusion"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Amiodarone?",
      answer: "Contraindications include cardiogenic shock, severe bradycardia, second or third-degree AV block (without pacemaker), severe hypotension, and known hypersensitivity to amiodarone or iodine.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["amiodarone", "contraindications", "cardiogenic-shock", "bradycardia", "AV-block"]
    },
    {
      chapterNumber: 12,
      question: "What are the major side effects of Amiodarone?",
      answer: "Acute side effects include hypotension, bradycardia, AV blocks, and phlebitis. Long-term effects include pulmonary fibrosis, thyroid dysfunction, hepatotoxicity, and corneal deposits.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["amiodarone", "side-effects", "hypotension", "bradycardia", "pulmonary-fibrosis"]
    },

    // Aspirin
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Aspirin in acute coronary syndrome?",
      answer: "Aspirin irreversibly inhibits cyclooxygenase-1 (COX-1), preventing thromboxane A2 synthesis, which reduces platelet aggregation and vasoconstriction. This antiplatelet effect lasts for the platelet's lifespan (7-10 days).",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["aspirin", "COX-1", "thromboxane", "platelet", "irreversible"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Aspirin in EMS?",
      answer: "Aspirin is indicated for suspected acute coronary syndrome (ACS), ST-elevation myocardial infarction (STEMI), non-ST elevation myocardial infarction (NSTEMI), and unstable angina in patients without contraindications.",
      difficulty: "basic",
      category: "indications",
      tags: ["aspirin", "ACS", "STEMI", "NSTEMI", "unstable-angina"]
    },
    {
      chapterNumber: 12,
      question: "What is the correct dose and administration of Aspirin for ACS?",
      answer: "160-325 mg (2-4 chewable 81 mg tablets) orally, chewed for rapid absorption. Chewing increases bioavailability and speeds onset of action compared to swallowing whole tablets.",
      difficulty: "basic",
      category: "dosing",
      tags: ["aspirin", "ACS", "chewable", "160-325mg", "rapid-absorption"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Aspirin?",
      answer: "Contraindications include known allergy to aspirin or NSAIDs, active bleeding (GI, intracranial), recent hemorrhagic stroke, severe liver disease, and concurrent anticoagulant therapy with high bleeding risk.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["aspirin", "contraindications", "allergy", "bleeding", "hemorrhagic-stroke"]
    },
    {
      chapterNumber: 12,
      question: "What are the potential side effects of Aspirin?",
      answer: "Side effects include GI bleeding, peptic ulcers, tinnitus, allergic reactions (bronchospasm, angioedema), prolonged bleeding time, and rarely, Reye's syndrome in children with viral infections.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["aspirin", "side-effects", "GI-bleeding", "tinnitus", "allergic", "Reye-syndrome"]
    },

    // Atropine
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Atropine?",
      answer: "Atropine is an anticholinergic agent that competitively antagonizes acetylcholine at muscarinic receptors, blocking parasympathetic nervous system effects and increasing heart rate by reducing vagal tone.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["atropine", "anticholinergic", "muscarinic", "acetylcholine", "vagal"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Atropine?",
      answer: "Atropine is indicated for symptomatic bradycardia with hemodynamic compromise, AV blocks, organophosphate poisoning, and as a premedication to reduce secretions. It's also used in asystole protocols.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["atropine", "bradycardia", "AV-blocks", "organophosphate", "asystole"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Atropine for symptomatic bradycardia?",
      answer: "Adults: 0.5-1 mg IV push, may repeat every 3-5 minutes to maximum of 3 mg. Pediatric: 0.02 mg/kg IV/IO, minimum 0.1 mg, maximum single dose 0.5 mg in children, 1 mg in adolescents.",
      difficulty: "basic",
      category: "dosing",
      tags: ["atropine", "bradycardia", "0.5-1mg", "pediatric", "maximum"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Atropine?",
      answer: "Contraindications include angle-closure glaucoma, myasthenia gravis, obstructive uropathy, and tachycardia. Relative contraindications include hyperthyroidism and coronary artery disease.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["atropine", "contraindications", "glaucoma", "myasthenia-gravis", "tachycardia"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Atropine?",
      answer: "Side effects include dry mouth, blurred vision, urinary retention, confusion, tachycardia, hyperthermia, and at high doses, delirium and coma. 'Mad as a hatter, blind as a bat, red as a beet, hot as a pistol, dry as a bone.'",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["atropine", "side-effects", "dry-mouth", "blurred-vision", "tachycardia", "hyperthermia"]
    },

    // Calcium Gluconate
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Calcium Gluconate?",
      answer: "Calcium gluconate provides calcium ions that stabilize cell membranes, particularly cardiac myocytes, and antagonizes the effects of hyperkalemia by restoring normal membrane potential and cardiac conduction.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["calcium-gluconate", "membrane-stabilization", "hyperkalemia", "cardiac-conduction"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Calcium Gluconate?",
      answer: "Calcium gluconate is indicated for hyperkalemia with ECG changes, calcium channel blocker overdose, magnesium sulfate overdose, and hypocalcemia. It's also used in hydrofluoric acid burns.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["calcium-gluconate", "hyperkalemia", "calcium-channel-blocker", "hypocalcemia", "hydrofluoric-acid"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Calcium Gluconate for hyperkalemia?",
      answer: "Adults: 1-2 grams (10-20 mL of 10% solution) IV over 2-5 minutes, may repeat in 5-10 minutes if needed. Pediatric: 60-100 mg/kg (0.6-1 mL/kg of 10% solution) IV over 2-5 minutes.",
      difficulty: "basic",
      category: "dosing",
      tags: ["calcium-gluconate", "hyperkalemia", "1-2grams", "pediatric", "slow-IV"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Calcium Gluconate?",
      answer: "Contraindications include hypercalcemia, ventricular fibrillation, and concurrent digoxin toxicity (relative contraindication). Caution in patients with cardiac disease and renal impairment.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["calcium-gluconate", "contraindications", "hypercalcemia", "ventricular-fibrillation", "digoxin"]
    },
    {
      chapterNumber: 12,
      question: "What are the complications of Calcium Gluconate administration?",
      answer: "Complications include tissue necrosis if extravasated, cardiac arrhythmias with rapid administration, hypercalcemia, and potential precipitation if mixed with bicarbonate or phosphate solutions.",
      difficulty: "intermediate",
      category: "complications",
      tags: ["calcium-gluconate", "complications", "tissue-necrosis", "arrhythmias", "extravasation"]
    },

    // Dexamethasone
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Dexamethasone?",
      answer: "Dexamethasone is a synthetic corticosteroid that binds to glucocorticoid receptors, suppressing inflammatory response, stabilizing cell membranes, and reducing capillary permeability. It has potent anti-inflammatory and immunosuppressive effects.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["dexamethasone", "corticosteroid", "glucocorticoid", "anti-inflammatory", "immunosuppressive"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Dexamethasone in EMS?",
      answer: "Dexamethasone is indicated for severe asthma exacerbation, COPD exacerbation, croup, allergic reactions, cerebral edema, and as adjunctive therapy in anaphylaxis. It's particularly useful in pediatric croup.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["dexamethasone", "asthma", "COPD", "croup", "allergic-reactions", "cerebral-edema"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Dexamethasone for croup?",
      answer: "Pediatric croup: 0.15-0.6 mg/kg (maximum 10 mg) PO, IM, or IV. Adult asthma: 4-8 mg IV/IM. Cerebral edema: 4-6 mg IV every 6 hours. Single dose is often sufficient for croup.",
      difficulty: "basic",
      category: "dosing",
      tags: ["dexamethasone", "croup", "pediatric", "0.15-0.6mg/kg", "single-dose"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Dexamethasone?",
      answer: "Contraindications include systemic fungal infections, known hypersensitivity, and live virus vaccines. Relative contraindications include active infections, diabetes, hypertension, and peptic ulcer disease.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["dexamethasone", "contraindications", "fungal-infections", "hypersensitivity", "live-vaccines"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Dexamethasone?",
      answer: "Short-term side effects include hyperglycemia, hypertension, mood changes, and increased infection risk. Long-term effects include adrenal suppression, osteoporosis, and growth suppression in children.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["dexamethasone", "side-effects", "hyperglycemia", "hypertension", "adrenal-suppression"]
    },

    // Dextrose 50%
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Dextrose 50%?",
      answer: "Dextrose 50% provides immediate glucose for cellular metabolism, rapidly increasing blood glucose levels. It crosses the blood-brain barrier to provide glucose for brain metabolism and reverse hypoglycemic symptoms.",
      difficulty: "basic",
      category: "mechanism",
      tags: ["dextrose-50", "glucose", "metabolism", "blood-brain-barrier", "hypoglycemia"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Dextrose 50%?",
      answer: "Dextrose 50% is indicated for symptomatic hypoglycemia (blood glucose <60 mg/dL), altered mental status with suspected hypoglycemia, and as empirical treatment in coma of unknown etiology.",
      difficulty: "basic",
      category: "indications",
      tags: ["dextrose-50", "hypoglycemia", "altered-mental-status", "coma", "glucose-60"]
    },
    {
      chapterNumber: 12,
      question: "What is the standard dose of Dextrose 50%?",
      answer: "Adults: 25-50 mL (12.5-25 g) IV push over 1-2 minutes. Pediatric: Dextrose 25% at 2-4 mL/kg (0.5-1 g/kg) IV push. Recheck blood glucose after 10 minutes.",
      difficulty: "basic",
      category: "dosing",
      tags: ["dextrose-50", "25-50mL", "pediatric", "dextrose-25", "recheck-glucose"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Dextrose 50%?",
      answer: "Contraindications include intracranial hemorrhage (relative), severe dehydration, and known hypersensitivity. Caution in diabetic ketoacidosis where it may worsen hyperglycemia.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["dextrose-50", "contraindications", "intracranial-hemorrhage", "dehydration", "DKA"]
    },
    {
      chapterNumber: 12,
      question: "What are the complications of Dextrose 50% administration?",
      answer: "Complications include tissue necrosis if extravasated (hypertonic solution), phlebitis, hyperglycemia, and potential precipitation of Wernicke's encephalopathy if thiamine deficient.",
      difficulty: "intermediate",
      category: "complications",
      tags: ["dextrose-50", "complications", "tissue-necrosis", "phlebitis", "Wernicke's"]
    },

    // Diphenhydramine
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Diphenhydramine?",
      answer: "Diphenhydramine is a first-generation antihistamine that competitively blocks H1 histamine receptors, preventing histamine-mediated allergic reactions. It also has anticholinergic and sedative properties.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["diphenhydramine", "antihistamine", "H1-receptor", "histamine", "anticholinergic"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Diphenhydramine?",
      answer: "Diphenhydramine is indicated for allergic reactions, anaphylaxis (adjunctive therapy), extrapyramidal reactions, motion sickness, and as a sedative. It's commonly used with epinephrine in anaphylaxis.",
      difficulty: "basic",
      category: "indications",
      tags: ["diphenhydramine", "allergic-reactions", "anaphylaxis", "extrapyramidal", "sedative"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Diphenhydramine for allergic reactions?",
      answer: "Adults: 25-50 mg IV/IM/PO every 6-8 hours. Pediatric: 1-1.5 mg/kg IV/IM/PO every 6-8 hours, maximum 50 mg per dose. For severe reactions, IV route is preferred.",
      difficulty: "basic",
      category: "dosing",
      tags: ["diphenhydramine", "allergic-reactions", "25-50mg", "pediatric", "1-1.5mg/kg"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Diphenhydramine?",
      answer: "Contraindications include hypersensitivity to diphenhydramine, acute asthma attack, narrow-angle glaucoma, and concurrent MAO inhibitor use. Caution in elderly due to increased fall risk.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["diphenhydramine", "contraindications", "hypersensitivity", "asthma", "glaucoma", "MAO"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Diphenhydramine?",
      answer: "Side effects include sedation, dry mouth, blurred vision, urinary retention, constipation, confusion (especially in elderly), and paradoxical excitation in children. It has strong anticholinergic effects.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["diphenhydramine", "side-effects", "sedation", "dry-mouth", "confusion", "anticholinergic"]
    },

    // Dobutamine
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Dobutamine?",
      answer: "Dobutamine is a synthetic catecholamine that primarily stimulates beta-1 adrenergic receptors, increasing myocardial contractility and heart rate. It has minimal effect on peripheral vascular resistance.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["dobutamine", "beta-1", "catecholamine", "contractility", "heart-rate"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Dobutamine?",
      answer: "Dobutamine is indicated for cardiogenic shock, heart failure with reduced ejection fraction, and as an inotropic support in cardiac decompensation. It's used when increased contractility is needed.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["dobutamine", "cardiogenic-shock", "heart-failure", "inotropic", "contractility"]
    },
    {
      chapterNumber: 12,
      question: "What is the dosing range for Dobutamine?",
      answer: "Dobutamine is given as continuous IV infusion: 2.5-15 mcg/kg/min, titrated to effect. Start at 2.5 mcg/kg/min and increase by 2.5 mcg/kg/min every 5-10 minutes based on hemodynamic response.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["dobutamine", "continuous-infusion", "2.5-15mcg/kg/min", "titrated", "hemodynamic"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Dobutamine?",
      answer: "Contraindications include hypertrophic obstructive cardiomyopathy, uncorrected tachyarrhythmias, and hypersensitivity to dobutamine. Caution in acute MI and severe hypotension.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["dobutamine", "contraindications", "hypertrophic-cardiomyopathy", "tachyarrhythmias", "hypotension"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Dobutamine?",
      answer: "Side effects include tachycardia, arrhythmias, hypertension, chest pain, palpitations, and increased myocardial oxygen consumption. Monitor for ventricular ectopy and ischemia.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["dobutamine", "side-effects", "tachycardia", "arrhythmias", "chest-pain", "ischemia"]
    },

    // Dopamine
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Dopamine?",
      answer: "Dopamine has dose-dependent effects: low doses (2-5 mcg/kg/min) stimulate dopamine receptors causing renal vasodilation; moderate doses (5-10 mcg/kg/min) stimulate beta-1 receptors increasing contractility; high doses (>10 mcg/kg/min) stimulate alpha receptors causing vasoconstriction.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["dopamine", "dose-dependent", "dopamine-receptors", "beta-1", "alpha", "vasoconstriction"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Dopamine?",
      answer: "Dopamine is indicated for cardiogenic shock, severe heart failure, hypotension refractory to fluid resuscitation, and as second-line vasopressor after norepinephrine. It provides both inotropic and vasopressor effects.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["dopamine", "cardiogenic-shock", "heart-failure", "hypotension", "vasopressor"]
    },
    {
      chapterNumber: 12,
      question: "What are the dosing ranges for Dopamine?",
      answer: "Dopamine infusion ranges: 2-5 mcg/kg/min (renal dose), 5-10 mcg/kg/min (cardiac dose for contractility), 10-20 mcg/kg/min (vasopressor dose). Start low and titrate to effect.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["dopamine", "2-5mcg", "5-10mcg", "10-20mcg", "renal-cardiac-vasopressor"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Dopamine?",
      answer: "Contraindications include uncorrected tachyarrhythmias, ventricular fibrillation, hypertrophic obstructive cardiomyopathy, and pheochromocytoma. Caution with MAO inhibitors and tricyclic antidepressants.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["dopamine", "contraindications", "tachyarrhythmias", "ventricular-fibrillation", "pheochromocytoma"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Dopamine?",
      answer: "Side effects include tachycardia, arrhythmias, hypertension, increased myocardial oxygen consumption, nausea, vomiting, and tissue necrosis if extravasated. Monitor for ischemia and arrhythmias.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["dopamine", "side-effects", "tachycardia", "arrhythmias", "tissue-necrosis", "ischemia"]
    },

    // Epinephrine 1:1,000
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Epinephrine 1:1,000?",
      answer: "Epinephrine 1:1,000 is a potent alpha and beta adrenergic agonist. Alpha effects cause vasoconstriction and increased blood pressure; beta-1 effects increase heart rate and contractility; beta-2 effects cause bronchodilation and stabilize mast cells.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["epinephrine-1000", "alpha-beta", "vasoconstriction", "bronchodilation", "mast-cells"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Epinephrine 1:1,000?",
      answer: "Epinephrine 1:1,000 is indicated for anaphylaxis, severe allergic reactions, severe asthma unresponsive to other treatments, and cardiac arrest (as 1:10,000 dilution). It's first-line for anaphylaxis.",
      difficulty: "basic",
      category: "indications",
      tags: ["epinephrine-1000", "anaphylaxis", "allergic-reactions", "severe-asthma", "first-line"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Epinephrine 1:1,000 for anaphylaxis?",
      answer: "Adults: 0.3-0.5 mg (0.3-0.5 mL) IM in anterolateral thigh. Pediatric: 0.01 mg/kg (0.01 mL/kg) IM, maximum 0.3 mg. May repeat every 5-15 minutes if needed. Never give 1:1,000 IV.",
      difficulty: "basic",
      category: "dosing",
      tags: ["epinephrine-1000", "anaphylaxis", "0.3-0.5mg", "IM", "anterolateral-thigh", "never-IV"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Epinephrine 1:1,000?",
      answer: "There are no absolute contraindications for epinephrine in anaphylaxis. Relative contraindications include coronary artery disease, severe hypertension, and arrhythmias, but life-threatening anaphylaxis overrides these concerns.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["epinephrine-1000", "no-absolute-contraindications", "anaphylaxis", "coronary-artery-disease"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Epinephrine 1:1,000?",
      answer: "Side effects include tachycardia, arrhythmias, hypertension, anxiety, tremor, headache, and pulmonary edema. In overdose, can cause intracerebral hemorrhage and myocardial infarction.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["epinephrine-1000", "side-effects", "tachycardia", "arrhythmias", "anxiety", "pulmonary-edema"]
    },

    // Epinephrine 1:10,000
    {
      chapterNumber: 12,
      question: "What is the difference between Epinephrine 1:1,000 and 1:10,000?",
      answer: "Epinephrine 1:1,000 contains 1 mg/mL (for IM use), while 1:10,000 contains 0.1 mg/mL (for IV use). The 1:10,000 concentration is 10 times more dilute and safer for IV administration in cardiac arrest.",
      difficulty: "basic",
      category: "concentrations",
      tags: ["epinephrine-concentrations", "1:1000", "1:10000", "IM-vs-IV", "cardiac-arrest"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Epinephrine 1:10,000?",
      answer: "Epinephrine 1:10,000 is indicated for cardiac arrest (VF, VT, asystole, PEA), severe bradycardia unresponsive to atropine, and severe hypotension. It's given IV/IO during resuscitation.",
      difficulty: "basic",
      category: "indications",
      tags: ["epinephrine-10000", "cardiac-arrest", "VF", "VT", "asystole", "PEA", "bradycardia"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Epinephrine 1:10,000 for cardiac arrest?",
      answer: "Adults: 1 mg (10 mL of 1:10,000) IV/IO every 3-5 minutes during CPR. Pediatric: 0.01 mg/kg (0.1 mL/kg of 1:10,000) IV/IO every 3-5 minutes, maximum 1 mg per dose.",
      difficulty: "basic",
      category: "dosing",
      tags: ["epinephrine-10000", "cardiac-arrest", "1mg", "3-5minutes", "pediatric", "0.01mg/kg"]
    },
    {
      chapterNumber: 12,
      question: "What is the mechanism of Epinephrine in cardiac arrest?",
      answer: "In cardiac arrest, epinephrine's alpha-adrenergic effects increase coronary and cerebral perfusion pressure during CPR by increasing diastolic pressure and coronary blood flow, improving chances of ROSC.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["epinephrine-10000", "cardiac-arrest", "alpha-adrenergic", "perfusion-pressure", "ROSC"]
    },
    {
      chapterNumber: 12,
      question: "What are the complications of Epinephrine 1:10,000?",
      answer: "Complications include post-resuscitation hypertension, arrhythmias, reduced post-arrest neurologic outcomes, and if 1:1,000 is accidentally given IV, severe hypertension and arrhythmias can occur.",
      difficulty: "intermediate",
      category: "complications",
      tags: ["epinephrine-10000", "complications", "post-resuscitation", "hypertension", "neurologic-outcomes"]
    },

    // Fentanyl
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Fentanyl?",
      answer: "Fentanyl is a synthetic opioid that binds to mu-opioid receptors in the brain and spinal cord, blocking pain transmission and producing analgesia. It's 50-100 times more potent than morphine.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["fentanyl", "opioid", "mu-opioid-receptors", "analgesia", "potent"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Fentanyl?",
      answer: "Fentanyl is indicated for severe pain, procedural sedation, rapid sequence intubation, and as an adjunct to anesthesia. It's preferred over morphine for hemodynamically unstable patients.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["fentanyl", "severe-pain", "procedural-sedation", "RSI", "hemodynamically-unstable"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Fentanyl for pain management?",
      answer: "Adults: 1-2 mcg/kg IV/IM/IN, may repeat every 5-10 minutes. Pediatric: 1-2 mcg/kg IV/IM/IN, maximum 100 mcg per dose. Intranasal route useful when IV access difficult.",
      difficulty: "basic",
      category: "dosing",
      tags: ["fentanyl", "pain-management", "1-2mcg/kg", "intranasal", "pediatric"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Fentanyl?",
      answer: "Contraindications include hypersensitivity to fentanyl, severe respiratory depression, acute or severe asthma, and paralytic ileus. Caution in head injury and increased intracranial pressure.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["fentanyl", "contraindications", "respiratory-depression", "asthma", "head-injury", "ICP"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Fentanyl?",
      answer: "Side effects include respiratory depression, sedation, nausea, vomiting, constipation, muscle rigidity (especially with rapid IV push), and hypotension. Respiratory depression is the most serious concern.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["fentanyl", "side-effects", "respiratory-depression", "sedation", "muscle-rigidity", "hypotension"]
    },

    // Flumazenil
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Flumazenil?",
      answer: "Flumazenil is a competitive benzodiazepine receptor antagonist that reverses the effects of benzodiazepines by blocking their binding to GABA-A receptors, reversing sedation, respiratory depression, and muscle relaxation.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["flumazenil", "benzodiazepine-antagonist", "GABA-A", "competitive", "reversal"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Flumazenil?",
      answer: "Flumazenil is indicated for benzodiazepine overdose with respiratory depression, reversal of procedural sedation, and suspected benzodiazepine toxicity. It's diagnostic and therapeutic for benzodiazepine poisoning.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["flumazenil", "benzodiazepine-overdose", "respiratory-depression", "procedural-sedation", "diagnostic"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Flumazenil for benzodiazepine overdose?",
      answer: "Adults: 0.2 mg IV over 30 seconds, may repeat 0.3 mg, then 0.5 mg every minute to maximum 3 mg. Pediatric: 0.01 mg/kg IV over 15 seconds, may repeat every minute to maximum 1 mg.",
      difficulty: "basic",
      category: "dosing",
      tags: ["flumazenil", "benzodiazepine-overdose", "0.2mg", "pediatric", "0.01mg/kg", "maximum-3mg"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Flumazenil?",
      answer: "Contraindications include tricyclic antidepressant overdose, seizure disorders, chronic benzodiazepine use, and mixed drug overdose. Can precipitate seizures in these situations.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["flumazenil", "contraindications", "tricyclic-antidepressants", "seizure-disorders", "chronic-benzodiazepine"]
    },
    {
      chapterNumber: 12,
      question: "What are the dangers of Flumazenil administration?",
      answer: "Dangers include precipitating seizures, acute withdrawal symptoms, re-sedation as flumazenil wears off (shorter half-life than benzodiazepines), and masking co-intoxicants in mixed overdoses.",
      difficulty: "intermediate",
      category: "dangers",
      tags: ["flumazenil", "dangers", "seizures", "withdrawal", "re-sedation", "half-life"]
    },

    // Furosemide
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Furosemide?",
      answer: "Furosemide is a loop diuretic that inhibits the Na-K-2Cl co-transporter in the ascending limb of the loop of Henle, preventing sodium and chloride reabsorption, leading to increased urine production and decreased preload.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["furosemide", "loop-diuretic", "Na-K-2Cl", "loop-of-Henle", "preload"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Furosemide?",
      answer: "Furosemide is indicated for acute pulmonary edema, congestive heart failure, hypertensive emergencies, and fluid overload. It's commonly used in cardiogenic pulmonary edema.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["furosemide", "pulmonary-edema", "CHF", "hypertensive-emergency", "fluid-overload"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Furosemide for pulmonary edema?",
      answer: "Adults: 40-80 mg IV push, may repeat or double dose in 30 minutes if needed. If patient on chronic furosemide, give dose equal to or greater than daily dose. Monitor for hypotension.",
      difficulty: "basic",
      category: "dosing",
      tags: ["furosemide", "pulmonary-edema", "40-80mg", "IV-push", "chronic-furosemide", "hypotension"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Furosemide?",
      answer: "Contraindications include anuria, severe electrolyte depletion, severe dehydration, and hypersensitivity to sulfonamides. Caution in renal impairment and hearing loss.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["furosemide", "contraindications", "anuria", "electrolyte-depletion", "dehydration", "sulfonamides"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Furosemide?",
      answer: "Side effects include electrolyte imbalances (hypokalemia, hyponatremia), dehydration, hypotension, ototoxicity (especially with high doses), and renal impairment. Monitor electrolytes and fluid status.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["furosemide", "side-effects", "electrolyte-imbalances", "dehydration", "ototoxicity", "renal-impairment"]
    },

    // Glucagon
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Glucagon?",
      answer: "Glucagon activates adenylyl cyclase, increasing cAMP levels, which stimulates glycogenolysis and gluconeogenesis in the liver, raising blood glucose. It also has positive inotropic and chronotropic effects on the heart.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["glucagon", "adenylyl-cyclase", "cAMP", "glycogenolysis", "gluconeogenesis", "inotropic"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Glucagon?",
      answer: "Glucagon is indicated for severe hypoglycemia when IV access unavailable, beta-blocker overdose, calcium channel blocker overdose, and as alternative to dextrose in hypoglycemia.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["glucagon", "hypoglycemia", "beta-blocker-overdose", "calcium-channel-blocker", "no-IV-access"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Glucagon for hypoglycemia?",
      answer: "Adults: 1 mg IM/SC/IV, may repeat in 15 minutes if needed. Pediatric: 0.5 mg for weight <20 kg, 1 mg for weight ≥20 kg. Onset 5-15 minutes, duration 1-2 hours.",
      difficulty: "basic",
      category: "dosing",
      tags: ["glucagon", "hypoglycemia", "1mg", "pediatric", "0.5mg", "onset-5-15min"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Glucagon?",
      answer: "Contraindications include pheochromocytoma, insulinoma, and hypersensitivity to glucagon. Caution in starvation states where glycogen stores are depleted.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["glucagon", "contraindications", "pheochromocytoma", "insulinoma", "starvation", "glycogen-depleted"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Glucagon?",
      answer: "Side effects include nausea, vomiting, hypokalemia, hyperglycemia, and rarely allergic reactions. Nausea and vomiting are common, especially with higher doses.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["glucagon", "side-effects", "nausea", "vomiting", "hypokalemia", "hyperglycemia"]
    },

    // Haloperidol
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Haloperidol?",
      answer: "Haloperidol is a butyrophenone antipsychotic that blocks dopamine D2 receptors in the brain, particularly in the mesolimbic and mesocortical pathways, reducing psychotic symptoms and agitation.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["haloperidol", "butyrophenone", "dopamine-D2", "mesolimbic", "mesocortical", "antipsychotic"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Haloperidol?",
      answer: "Haloperidol is indicated for acute psychosis, severe agitation, combative behavior, and as adjunct in excited delirium. It's used for chemical restraint in violent patients.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["haloperidol", "acute-psychosis", "agitation", "combative", "excited-delirium", "chemical-restraint"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Haloperidol for agitation?",
      answer: "Adults: 5-10 mg IM/IV, may repeat every 30-60 minutes as needed. Elderly: 1-2 mg IM/IV. Pediatric: 0.05-0.15 mg/kg IM/IV. Monitor for QT prolongation with IV use.",
      difficulty: "basic",
      category: "dosing",
      tags: ["haloperidol", "agitation", "5-10mg", "elderly", "1-2mg", "pediatric", "QT-prolongation"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Haloperidol?",
      answer: "Contraindications include Parkinson's disease, severe CNS depression, coma, and hypersensitivity. Caution in QT prolongation, elderly patients, and those with cardiac disease.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["haloperidol", "contraindications", "Parkinson's", "CNS-depression", "coma", "QT-prolongation"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Haloperidol?",
      answer: "Side effects include extrapyramidal symptoms (dystonia, akathisia), tardive dyskinesia, neuroleptic malignant syndrome, QT prolongation, and sedation. Extrapyramidal effects are common.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["haloperidol", "side-effects", "extrapyramidal", "dystonia", "akathisia", "neuroleptic-malignant"]
    },

    // Ipratropium
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Ipratropium?",
      answer: "Ipratropium is an anticholinergic bronchodilator that blocks muscarinic receptors in the airways, preventing acetylcholine-mediated bronchoconstriction and reducing mucus secretion.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["ipratropium", "anticholinergic", "bronchodilator", "muscarinic", "acetylcholine", "mucus"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Ipratropium?",
      answer: "Ipratropium is indicated for COPD exacerbation, severe asthma (combined with albuterol), and bronchospasm. It's particularly effective in COPD and as adjunct to beta-2 agonists.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["ipratropium", "COPD", "severe-asthma", "bronchospasm", "beta-2-agonist", "adjunct"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Ipratropium for COPD exacerbation?",
      answer: "Adults: 0.5 mg (2.5 mL) via nebulizer, may repeat every 20 minutes for 3 doses, then every 2-4 hours. Often combined with albuterol in the same nebulizer.",
      difficulty: "basic",
      category: "dosing",
      tags: ["ipratropium", "COPD", "0.5mg", "nebulizer", "every-20min", "combined-albuterol"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Ipratropium?",
      answer: "Contraindications include hypersensitivity to ipratropium or atropine, narrow-angle glaucoma, and bladder neck obstruction. Caution in prostatic hypertrophy and urinary retention.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["ipratropium", "contraindications", "hypersensitivity", "narrow-angle-glaucoma", "bladder-neck-obstruction"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Ipratropium?",
      answer: "Side effects include dry mouth, cough, nausea, dizziness, and rarely paradoxical bronchospasm. Systemic anticholinergic effects are minimal due to poor absorption.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["ipratropium", "side-effects", "dry-mouth", "cough", "paradoxical-bronchospasm", "minimal-systemic"]
    },

    // Ketorolac
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Ketorolac?",
      answer: "Ketorolac is a non-steroidal anti-inflammatory drug (NSAID) that inhibits cyclooxygenase (COX) enzymes, reducing prostaglandin synthesis and providing potent anti-inflammatory and analgesic effects.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["ketorolac", "NSAID", "cyclooxygenase", "COX", "prostaglandin", "anti-inflammatory"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Ketorolac?",
      answer: "Ketorolac is indicated for moderate to severe pain, particularly post-operative pain, renal colic, and pain where opioids are contraindicated. It has morphine-equivalent analgesic potency.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["ketorolac", "moderate-severe-pain", "post-operative", "renal-colic", "morphine-equivalent"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Ketorolac for pain management?",
      answer: "Adults: 30-60 mg IM or 15-30 mg IV every 6 hours, maximum 5 days. Elderly (>65 years): 15 mg IM or IV every 6 hours. Not recommended in pediatric patients.",
      difficulty: "basic",
      category: "dosing",
      tags: ["ketorolac", "pain-management", "30-60mg-IM", "15-30mg-IV", "elderly", "maximum-5-days"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Ketorolac?",
      answer: "Contraindications include active bleeding, peptic ulcer disease, severe renal impairment, severe heart failure, and perioperative use with coronary artery bypass graft (CABG) surgery.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["ketorolac", "contraindications", "active-bleeding", "peptic-ulcer", "renal-impairment", "CABG"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Ketorolac?",
      answer: "Side effects include GI bleeding, renal impairment, increased bleeding time, cardiovascular events, and allergic reactions. Risk increases with duration of use and in elderly patients.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["ketorolac", "side-effects", "GI-bleeding", "renal-impairment", "bleeding-time", "cardiovascular"]
    },

    // Lidocaine
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Lidocaine?",
      answer: "Lidocaine is a Class IB antiarrhythmic that blocks voltage-gated sodium channels, stabilizing cardiac cell membranes and suppressing ventricular arrhythmias. It also provides local anesthesia by blocking nerve conduction.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["lidocaine", "class-IB", "sodium-channels", "membrane-stabilization", "ventricular-arrhythmias", "local-anesthesia"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Lidocaine?",
      answer: "Lidocaine is indicated for ventricular tachycardia, ventricular fibrillation, ventricular ectopy, and as local anesthesia for procedures. It's alternative to amiodarone in cardiac arrest.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["lidocaine", "ventricular-tachycardia", "ventricular-fibrillation", "ventricular-ectopy", "local-anesthesia"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Lidocaine for ventricular arrhythmias?",
      answer: "Adults: 1-1.5 mg/kg IV push, may repeat 0.5-0.75 mg/kg every 5-10 minutes to maximum 3 mg/kg. Maintenance infusion: 1-4 mg/min. Reduce dose in heart failure or liver disease.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["lidocaine", "ventricular-arrhythmias", "1-1.5mg/kg", "maintenance-infusion", "heart-failure", "liver-disease"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Lidocaine?",
      answer: "Contraindications include hypersensitivity to amide local anesthetics, severe heart block, severe bradycardia, and Stokes-Adams syndrome. Caution in heart failure and liver disease.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["lidocaine", "contraindications", "amide-anesthetics", "heart-block", "bradycardia", "Stokes-Adams"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Lidocaine?",
      answer: "Side effects include CNS toxicity (confusion, seizures), cardiovascular depression, hypotension, and allergic reactions. CNS effects occur before cardiovascular effects.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["lidocaine", "side-effects", "CNS-toxicity", "seizures", "cardiovascular-depression", "hypotension"]
    },

    // Lorazepam
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Lorazepam?",
      answer: "Lorazepam is a benzodiazepine that enhances GABA neurotransmission by increasing the frequency of chloride channel opening, producing anxiolysis, sedation, anticonvulsant effects, and muscle relaxation.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["lorazepam", "benzodiazepine", "GABA", "chloride-channel", "anxiolysis", "anticonvulsant"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Lorazepam?",
      answer: "Lorazepam is indicated for status epilepticus, seizures, severe anxiety, agitation, alcohol withdrawal, and premedication. It's first-line for status epilepticus.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["lorazepam", "status-epilepticus", "seizures", "anxiety", "agitation", "alcohol-withdrawal", "first-line"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Lorazepam for status epilepticus?",
      answer: "Adults: 0.1 mg/kg IV (usually 4-8 mg), may repeat in 5-10 minutes if seizures continue. Pediatric: 0.05-0.1 mg/kg IV/IM/rectal, may repeat once. Maximum single dose 4 mg.",
      difficulty: "basic",
      category: "dosing",
      tags: ["lorazepam", "status-epilepticus", "0.1mg/kg", "4-8mg", "pediatric", "maximum-4mg"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Lorazepam?",
      answer: "Contraindications include hypersensitivity to benzodiazepines, severe respiratory depression, acute narrow-angle glaucoma, and severe hepatic impairment. Caution in elderly and debilitated patients.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["lorazepam", "contraindications", "hypersensitivity", "respiratory-depression", "glaucoma", "hepatic-impairment"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Lorazepam?",
      answer: "Side effects include sedation, respiratory depression, amnesia, confusion, ataxia, and paradoxical agitation. Respiratory depression is most serious, especially with concurrent opioids.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["lorazepam", "side-effects", "sedation", "respiratory-depression", "amnesia", "paradoxical-agitation"]
    },

    // Magnesium Sulfate
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Magnesium Sulfate?",
      answer: "Magnesium sulfate acts as a calcium channel blocker, membrane stabilizer, and smooth muscle relaxant. It has anticonvulsant properties and can reverse digitalis-induced arrhythmias by normalizing cellular electrolyte balance.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["magnesium-sulfate", "calcium-channel-blocker", "membrane-stabilizer", "smooth-muscle-relaxant", "anticonvulsant"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Magnesium Sulfate?",
      answer: "Magnesium sulfate is indicated for eclampsia, pre-eclampsia, torsades de pointes, severe asthma, hypomagnesemia, and digitalis toxicity. It's first-line for eclampsia and torsades de pointes.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["magnesium-sulfate", "eclampsia", "pre-eclampsia", "torsades-de-pointes", "severe-asthma", "digitalis-toxicity"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Magnesium Sulfate for eclampsia?",
      answer: "Adults: 4-6 g IV over 5-10 minutes, then 1-2 g/hr infusion. For torsades de pointes: 2 g IV over 1-2 minutes, may repeat. Asthma: 2 g IV over 20 minutes.",
      difficulty: "basic",
      category: "dosing",
      tags: ["magnesium-sulfate", "eclampsia", "4-6g", "torsades", "2g", "asthma", "20-minutes"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Magnesium Sulfate?",
      answer: "Contraindications include heart block, severe renal impairment, myasthenia gravis, and hypermagnesemia. Caution in patients with neuromuscular disorders and respiratory depression.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["magnesium-sulfate", "contraindications", "heart-block", "renal-impairment", "myasthenia-gravis", "hypermagnesemia"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Magnesium Sulfate?",
      answer: "Side effects include flushing, hypotension, bradycardia, respiratory depression, decreased reflexes, and cardiac arrest with overdose. Monitor deep tendon reflexes as early warning sign.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["magnesium-sulfate", "side-effects", "flushing", "hypotension", "respiratory-depression", "deep-tendon-reflexes"]
    },

    // Methylprednisolone
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Methylprednisolone?",
      answer: "Methylprednisolone is a synthetic corticosteroid that binds to glucocorticoid receptors, suppressing inflammatory response, stabilizing lysosomal membranes, and reducing capillary permeability and immune system activity.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["methylprednisolone", "corticosteroid", "glucocorticoid-receptors", "anti-inflammatory", "immunosuppressive"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Methylprednisolone?",
      answer: "Methylprednisolone is indicated for severe asthma exacerbation, COPD exacerbation, allergic reactions, spinal cord injury, and inflammatory conditions. It's potent anti-inflammatory agent.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["methylprednisolone", "severe-asthma", "COPD", "allergic-reactions", "spinal-cord-injury", "inflammatory"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Methylprednisolone for severe asthma?",
      answer: "Adults: 125-250 mg IV every 6 hours for severe asthma. Pediatric: 1-2 mg/kg IV every 6 hours, maximum 125 mg per dose. Spinal cord injury: 30 mg/kg IV bolus, then 5.4 mg/kg/hr infusion.",
      difficulty: "basic",
      category: "dosing",
      tags: ["methylprednisolone", "severe-asthma", "125-250mg", "pediatric", "1-2mg/kg", "spinal-cord-injury"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Methylprednisolone?",
      answer: "Contraindications include systemic fungal infections, hypersensitivity to methylprednisolone, and live virus vaccines. Relative contraindications include diabetes, hypertension, and active infections.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["methylprednisolone", "contraindications", "fungal-infections", "hypersensitivity", "live-vaccines", "diabetes"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Methylprednisolone?",
      answer: "Side effects include hyperglycemia, hypertension, mood changes, increased infection risk, and with chronic use, adrenal suppression, osteoporosis, and growth retardation in children.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["methylprednisolone", "side-effects", "hyperglycemia", "hypertension", "mood-changes", "adrenal-suppression"]
    },

    // Morphine
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Morphine?",
      answer: "Morphine is an opioid agonist that binds to mu-opioid receptors in the brain, spinal cord, and peripheral tissues, inhibiting pain transmission and producing analgesia, sedation, and euphoria.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["morphine", "opioid-agonist", "mu-opioid-receptors", "pain-transmission", "analgesia", "sedation"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Morphine?",
      answer: "Morphine is indicated for severe pain, myocardial infarction, pulmonary edema, and palliative care. It's gold standard for severe pain management and reduces preload in heart failure.",
      difficulty: "basic",
      category: "indications",
      tags: ["morphine", "severe-pain", "myocardial-infarction", "pulmonary-edema", "palliative-care", "gold-standard"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Morphine for severe pain?",
      answer: "Adults: 2-10 mg IV every 5-15 minutes or 5-15 mg IM every 4 hours. Pediatric: 0.1-0.2 mg/kg IV/IM every 2-4 hours. Start with lower doses and titrate to effect.",
      difficulty: "basic",
      category: "dosing",
      tags: ["morphine", "severe-pain", "2-10mg-IV", "5-15mg-IM", "pediatric", "0.1-0.2mg/kg", "titrate"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Morphine?",
      answer: "Contraindications include hypersensitivity to morphine, severe respiratory depression, acute or severe asthma, and paralytic ileus. Caution in head injury and increased intracranial pressure.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["morphine", "contraindications", "hypersensitivity", "respiratory-depression", "severe-asthma", "head-injury"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Morphine?",
      answer: "Side effects include respiratory depression, sedation, nausea, vomiting, constipation, hypotension, and physical dependence. Respiratory depression is the most serious acute effect.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["morphine", "side-effects", "respiratory-depression", "sedation", "nausea", "constipation", "hypotension"]
    },

    // Naloxone
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Naloxone?",
      answer: "Naloxone is a competitive opioid receptor antagonist that displaces opioids from mu, kappa, and delta receptors, rapidly reversing opioid-induced respiratory depression, sedation, and analgesia.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["naloxone", "opioid-antagonist", "competitive", "mu-kappa-delta", "respiratory-depression", "reversal"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Naloxone?",
      answer: "Naloxone is indicated for opioid overdose with respiratory depression, suspected opioid intoxication, and reversal of opioid-induced sedation. It's diagnostic and therapeutic for opioid toxicity.",
      difficulty: "basic",
      category: "indications",
      tags: ["naloxone", "opioid-overdose", "respiratory-depression", "opioid-intoxication", "diagnostic", "therapeutic"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Naloxone for opioid overdose?",
      answer: "Adults: 0.4-2 mg IV/IM/SC/IN, may repeat every 2-3 minutes. Pediatric: 0.01 mg/kg IV/IM/SC/IN, may repeat. Intranasal: 4 mg (2 mg per nostril) for lay rescuers.",
      difficulty: "basic",
      category: "dosing",
      tags: ["naloxone", "opioid-overdose", "0.4-2mg", "pediatric", "0.01mg/kg", "intranasal", "4mg"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Naloxone?",
      answer: "There are no absolute contraindications for naloxone in life-threatening opioid overdose. Relative contraindications include hypersensitivity to naloxone and cardiovascular disease.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["naloxone", "no-absolute-contraindications", "life-threatening", "hypersensitivity", "cardiovascular-disease"]
    },
    {
      chapterNumber: 12,
      question: "What are the complications of Naloxone administration?",
      answer: "Complications include acute withdrawal syndrome, agitation, hypertension, tachycardia, pulmonary edema, and re-narcotization as naloxone wears off (shorter half-life than most opioids).",
      difficulty: "intermediate",
      category: "complications",
      tags: ["naloxone", "complications", "withdrawal-syndrome", "agitation", "pulmonary-edema", "re-narcotization"]
    },

    // Nitroglycerin
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Nitroglycerin?",
      answer: "Nitroglycerin is metabolized to nitric oxide, which activates guanylate cyclase, increasing cGMP levels, causing smooth muscle relaxation, venodilation (reducing preload), and coronary vasodilation.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["nitroglycerin", "nitric-oxide", "guanylate-cyclase", "cGMP", "venodilation", "preload", "coronary-vasodilation"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Nitroglycerin?",
      answer: "Nitroglycerin is indicated for angina pectoris, acute coronary syndrome, congestive heart failure, and hypertensive emergencies. It's first-line for angina and reduces cardiac workload.",
      difficulty: "basic",
      category: "indications",
      tags: ["nitroglycerin", "angina-pectoris", "acute-coronary-syndrome", "CHF", "hypertensive-emergency", "first-line"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Nitroglycerin for angina?",
      answer: "Sublingual: 0.3-0.4 mg every 5 minutes for 3 doses maximum. IV: 10-20 mcg/min, increase by 10-20 mcg/min every 3-5 minutes. Avoid if systolic BP <90 mmHg.",
      difficulty: "basic",
      category: "dosing",
      tags: ["nitroglycerin", "angina", "sublingual", "0.3-0.4mg", "IV", "10-20mcg/min", "systolic-BP-90"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Nitroglycerin?",
      answer: "Contraindications include hypotension (systolic <90 mmHg), right ventricular infarction, severe aortic stenosis, and concurrent use of phosphodiesterase inhibitors (sildenafil, tadalafil).",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["nitroglycerin", "contraindications", "hypotension", "right-ventricular-infarction", "aortic-stenosis", "phosphodiesterase-inhibitors"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Nitroglycerin?",
      answer: "Side effects include headache, hypotension, flushing, dizziness, and tolerance with prolonged use. Headache is common and often indicates therapeutic effect.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["nitroglycerin", "side-effects", "headache", "hypotension", "flushing", "tolerance", "therapeutic-effect"]
    },

    // Norepinephrine
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Norepinephrine?",
      answer: "Norepinephrine is a potent alpha-1 and alpha-2 adrenergic agonist with minimal beta activity, causing intense vasoconstriction, increased blood pressure, and increased systemic vascular resistance.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["norepinephrine", "alpha-1", "alpha-2", "vasoconstriction", "blood-pressure", "systemic-vascular-resistance"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Norepinephrine?",
      answer: "Norepinephrine is indicated for septic shock, distributive shock, severe hypotension unresponsive to fluid resuscitation, and as first-line vasopressor in septic shock per guidelines.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["norepinephrine", "septic-shock", "distributive-shock", "severe-hypotension", "first-line-vasopressor"]
    },
    {
      chapterNumber: 12,
      question: "What is the dosing range for Norepinephrine?",
      answer: "Norepinephrine infusion: 0.1-3 mcg/kg/min (8-30 mcg/min for 70 kg adult), titrated to maintain MAP >65 mmHg. Requires central venous access due to extravasation risk.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["norepinephrine", "0.1-3mcg/kg/min", "8-30mcg/min", "MAP-65", "central-venous-access", "extravasation"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Norepinephrine?",
      answer: "Contraindications include uncorrected hypovolemia, mesenteric or peripheral vascular thrombosis, and hypersensitivity. Correct volume depletion before starting vasopressors.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["norepinephrine", "contraindications", "uncorrected-hypovolemia", "vascular-thrombosis", "volume-depletion"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Norepinephrine?",
      answer: "Side effects include severe hypertension, arrhythmias, decreased renal and mesenteric perfusion, tissue necrosis if extravasated, and increased afterload with potential cardiac ischemia.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["norepinephrine", "side-effects", "hypertension", "arrhythmias", "decreased-perfusion", "tissue-necrosis", "cardiac-ischemia"]
    },

    // Ondansetron
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Ondansetron?",
      answer: "Ondansetron is a selective 5-HT3 receptor antagonist that blocks serotonin receptors in the chemoreceptor trigger zone and vagal afferents, preventing nausea and vomiting.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["ondansetron", "5-HT3-antagonist", "serotonin", "chemoreceptor-trigger-zone", "vagal-afferents", "antiemetic"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Ondansetron?",
      answer: "Ondansetron is indicated for nausea and vomiting from any cause, chemotherapy-induced nausea, post-operative nausea, and motion sickness. It's highly effective antiemetic.",
      difficulty: "basic",
      category: "indications",
      tags: ["ondansetron", "nausea", "vomiting", "chemotherapy-induced", "post-operative", "motion-sickness", "antiemetic"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Ondansetron for nausea?",
      answer: "Adults: 4-8 mg IV/IM/PO every 6-8 hours. Pediatric: 0.15 mg/kg IV/IM (4-11 years: 4 mg, >11 years: 8 mg). Maximum 16 mg per day due to QT prolongation risk.",
      difficulty: "basic",
      category: "dosing",
      tags: ["ondansetron", "nausea", "4-8mg", "pediatric", "0.15mg/kg", "maximum-16mg", "QT-prolongation"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Ondansetron?",
      answer: "Contraindications include hypersensitivity to ondansetron, congenital long QT syndrome, and concurrent use of QT-prolonging medications. Caution in electrolyte imbalances.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["ondansetron", "contraindications", "hypersensitivity", "long-QT-syndrome", "QT-prolonging", "electrolyte-imbalances"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Ondansetron?",
      answer: "Side effects include headache, constipation, QT prolongation, dizziness, and rarely serotonin syndrome with concurrent serotonergic medications. Generally well-tolerated.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["ondansetron", "side-effects", "headache", "constipation", "QT-prolongation", "serotonin-syndrome", "well-tolerated"]
    },

    // Oxygen
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Oxygen?",
      answer: "Oxygen increases the partial pressure of oxygen in the blood and tissues, improving oxygen delivery to hypoxic tissues and supporting cellular metabolism. It has no pharmacologic action but is essential for life.",
      difficulty: "basic",
      category: "mechanism",
      tags: ["oxygen", "partial-pressure", "oxygen-delivery", "hypoxic-tissues", "cellular-metabolism", "essential"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Oxygen therapy?",
      answer: "Oxygen is indicated for hypoxia (SpO2 <94%), respiratory distress, chest pain, shock, carbon monoxide poisoning, and any condition causing inadequate tissue oxygenation.",
      difficulty: "basic",
      category: "indications",
      tags: ["oxygen", "hypoxia", "SpO2-94", "respiratory-distress", "chest-pain", "shock", "carbon-monoxide"]
    },
    {
      chapterNumber: 12,
      question: "What are the delivery methods for Oxygen?",
      answer: "Nasal cannula: 1-6 L/min (24-44% FiO2), Simple mask: 6-10 L/min (35-60% FiO2), Non-rebreather mask: 10-15 L/min (60-100% FiO2), Bag-valve mask: 10-15 L/min (100% FiO2).",
      difficulty: "intermediate",
      category: "delivery-methods",
      tags: ["oxygen", "nasal-cannula", "simple-mask", "non-rebreather", "bag-valve-mask", "FiO2"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Oxygen?",
      answer: "There are no absolute contraindications for oxygen in emergency settings. Relative contraindications include COPD with CO2 retention, but never withhold oxygen in acute hypoxia.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["oxygen", "no-absolute-contraindications", "emergency-settings", "COPD", "CO2-retention", "acute-hypoxia"]
    },
    {
      chapterNumber: 12,
      question: "What are the complications of Oxygen therapy?",
      answer: "Complications include oxygen toxicity (prolonged high concentrations), absorption atelectasis, CO2 retention in COPD, and retinopathy of prematurity in premature infants.",
      difficulty: "intermediate",
      category: "complications",
      tags: ["oxygen", "complications", "oxygen-toxicity", "absorption-atelectasis", "CO2-retention", "retinopathy-prematurity"]
    },

    // Phenytoin
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Phenytoin?",
      answer: "Phenytoin blocks voltage-gated sodium channels in neurons, stabilizing neuronal membranes and preventing the spread of seizure activity. It has minimal effect on normal neuronal function.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["phenytoin", "voltage-gated-sodium-channels", "neuronal-membranes", "seizure-activity", "anticonvulsant"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Phenytoin?",
      answer: "Phenytoin is indicated for status epilepticus, seizure prophylaxis in head trauma, and maintenance therapy for epilepsy. It's second-line after benzodiazepines for status epilepticus.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["phenytoin", "status-epilepticus", "seizure-prophylaxis", "head-trauma", "epilepsy", "second-line"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Phenytoin for status epilepticus?",
      answer: "Adults: 15-20 mg/kg IV at rate ≤50 mg/min. Pediatric: 15-20 mg/kg IV at rate ≤1 mg/kg/min. Must dilute in normal saline; precipitates in dextrose solutions.",
      difficulty: "basic",
      category: "dosing",
      tags: ["phenytoin", "status-epilepticus", "15-20mg/kg", "50mg/min", "pediatric", "normal-saline", "precipitates-dextrose"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Phenytoin?",
      answer: "Contraindications include hypersensitivity to phenytoin, sinus bradycardia, second or third-degree AV block, and Stokes-Adams syndrome. Caution in cardiac conduction abnormalities.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["phenytoin", "contraindications", "hypersensitivity", "sinus-bradycardia", "AV-block", "Stokes-Adams"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Phenytoin?",
      answer: "Side effects include cardiac arrhythmias, hypotension, CNS depression, purple glove syndrome (IV extravasation), and with chronic use, gingival hyperplasia and hirsutism.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["phenytoin", "side-effects", "cardiac-arrhythmias", "hypotension", "purple-glove-syndrome", "gingival-hyperplasia"]
    },

    // Procainamide
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Procainamide?",
      answer: "Procainamide is a Class IA antiarrhythmic that blocks fast sodium channels, prolongs action potential duration and refractory period, and has anticholinergic properties.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["procainamide", "class-IA", "sodium-channels", "action-potential", "refractory-period", "anticholinergic"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Procainamide?",
      answer: "Procainamide is indicated for stable wide-complex tachycardia, atrial fibrillation with rapid ventricular response, and ventricular tachycardia. It's alternative to amiodarone for stable VT.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["procainamide", "wide-complex-tachycardia", "atrial-fibrillation", "ventricular-tachycardia", "alternative-amiodarone"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Procainamide for stable VT?",
      answer: "Adults: 100 mg IV every 5 minutes until arrhythmia suppressed, hypotension occurs, QRS widens >50%, or maximum 17 mg/kg given. Maintenance: 1-4 mg/min infusion.",
      difficulty: "advanced",
      category: "dosing",
      tags: ["procainamide", "stable-VT", "100mg", "every-5min", "QRS-widens-50", "maximum-17mg/kg", "maintenance-1-4mg/min"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Procainamide?",
      answer: "Contraindications include hypersensitivity to procainamide, complete heart block, lupus erythematosus, and torsades de pointes. Caution in renal or hepatic impairment.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["procainamide", "contraindications", "hypersensitivity", "complete-heart-block", "lupus", "torsades-de-pointes"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Procainamide?",
      answer: "Side effects include hypotension, QRS widening, torsades de pointes, drug-induced lupus (chronic use), and negative inotropic effects. Monitor ECG during administration.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["procainamide", "side-effects", "hypotension", "QRS-widening", "torsades", "drug-induced-lupus", "negative-inotropic"]
    },

    // Sodium Bicarbonate
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Sodium Bicarbonate?",
      answer: "Sodium bicarbonate acts as a buffer, neutralizing excess hydrogen ions and increasing blood pH and bicarbonate levels. It shifts potassium intracellularly and can reverse sodium channel blockade.",
      difficulty: "intermediate",
      category: "mechanism",
      tags: ["sodium-bicarbonate", "buffer", "hydrogen-ions", "pH", "potassium-shift", "sodium-channel-blockade"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Sodium Bicarbonate?",
      answer: "Sodium bicarbonate is indicated for severe metabolic acidosis, hyperkalemia, tricyclic antidepressant overdose, and urinary alkalinization. Limited use in cardiac arrest.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["sodium-bicarbonate", "metabolic-acidosis", "hyperkalemia", "tricyclic-overdose", "urinary-alkalinization", "cardiac-arrest"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Sodium Bicarbonate for severe acidosis?",
      answer: "Adults: 1-2 mEq/kg IV push, may repeat half dose every 10 minutes based on ABG. Pediatric: 1-2 mEq/kg IV push. For hyperkalemia: 1-2 mEq/kg IV push.",
      difficulty: "basic",
      category: "dosing",
      tags: ["sodium-bicarbonate", "severe-acidosis", "1-2mEq/kg", "pediatric", "hyperkalemia", "ABG"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Sodium Bicarbonate?",
      answer: "Contraindications include metabolic or respiratory alkalosis, severe pulmonary edema, and hypocalcemia. Caution in heart failure and sodium-restricted patients.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["sodium-bicarbonate", "contraindications", "alkalosis", "pulmonary-edema", "hypocalcemia", "heart-failure"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Sodium Bicarbonate?",
      answer: "Side effects include paradoxical acidosis (from CO2 production), hypernatremia, fluid overload, tissue necrosis if extravasated, and potential precipitation with calcium.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["sodium-bicarbonate", "side-effects", "paradoxical-acidosis", "hypernatremia", "fluid-overload", "tissue-necrosis"]
    },

    // Thiamine
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Thiamine?",
      answer: "Thiamine (Vitamin B1) is a cofactor for carbohydrate metabolism enzymes, particularly pyruvate dehydrogenase and α-ketoglutarate dehydrogenase, essential for glucose metabolism and ATP production.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["thiamine", "vitamin-B1", "cofactor", "carbohydrate-metabolism", "pyruvate-dehydrogenase", "ATP-production"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Thiamine?",
      answer: "Thiamine is indicated for suspected thiamine deficiency, chronic alcoholism, malnutrition, and before glucose administration in altered mental status to prevent Wernicke's encephalopathy.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["thiamine", "thiamine-deficiency", "chronic-alcoholism", "malnutrition", "glucose-administration", "Wernicke's-encephalopathy"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Thiamine for suspected deficiency?",
      answer: "Adults: 100-500 mg IV/IM, typically 100 mg IV/IM daily. Give before glucose in suspected alcoholics or malnourished patients. Pediatric: 10-25 mg IV/IM daily.",
      difficulty: "basic",
      category: "dosing",
      tags: ["thiamine", "suspected-deficiency", "100-500mg", "before-glucose", "alcoholics", "malnourished", "pediatric"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Thiamine?",
      answer: "There are no absolute contraindications for thiamine. Rare hypersensitivity reactions can occur, particularly with IV administration. Thiamine is generally very safe.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["thiamine", "no-absolute-contraindications", "hypersensitivity", "IV-administration", "generally-safe"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Thiamine?",
      answer: "Side effects are rare but may include allergic reactions, anaphylaxis (very rare), and local irritation at injection site. Thiamine is water-soluble and excess is excreted.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["thiamine", "side-effects", "rare", "allergic-reactions", "anaphylaxis", "local-irritation", "water-soluble"]
    },

    // Vasopressin
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Vasopressin?",
      answer: "Vasopressin acts on V1 receptors causing vasoconstriction and on V2 receptors increasing water reabsorption in kidneys. In cardiac arrest, it provides non-adrenergic vasoconstriction.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["vasopressin", "V1-receptors", "vasoconstriction", "V2-receptors", "water-reabsorption", "non-adrenergic"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Vasopressin?",
      answer: "Vasopressin is indicated for cardiac arrest (alternative to epinephrine), septic shock, and diabetes insipidus. It's used when catecholamine responsiveness is decreased.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["vasopressin", "cardiac-arrest", "alternative-epinephrine", "septic-shock", "diabetes-insipidus", "catecholamine-responsiveness"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Vasopressin for cardiac arrest?",
      answer: "Adults: 40 units IV/IO as one-time dose, can replace first or second dose of epinephrine. For septic shock: 0.01-0.04 units/min continuous infusion.",
      difficulty: "basic",
      category: "dosing",
      tags: ["vasopressin", "cardiac-arrest", "40-units", "one-time-dose", "replace-epinephrine", "septic-shock", "0.01-0.04units/min"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Vasopressin?",
      answer: "Contraindications include chronic nephritis, hypersensitivity to vasopressin, and coronary artery disease (relative). Caution in patients with vascular disease.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["vasopressin", "contraindications", "chronic-nephritis", "hypersensitivity", "coronary-artery-disease", "vascular-disease"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Vasopressin?",
      answer: "Side effects include severe vasoconstriction, decreased cardiac output, myocardial ischemia, peripheral ischemia, and water intoxication. Monitor for tissue perfusion.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["vasopressin", "side-effects", "severe-vasoconstriction", "decreased-cardiac-output", "myocardial-ischemia", "water-intoxication"]
    },

    // Verapamil
    {
      chapterNumber: 12,
      question: "What is the mechanism of action of Verapamil?",
      answer: "Verapamil is a calcium channel blocker that blocks L-type calcium channels, slowing conduction through the AV node, reducing heart rate, and decreasing myocardial contractility.",
      difficulty: "advanced",
      category: "mechanism",
      tags: ["verapamil", "calcium-channel-blocker", "L-type-calcium", "AV-node", "heart-rate", "myocardial-contractility"]
    },
    {
      chapterNumber: 12,
      question: "What are the indications for Verapamil?",
      answer: "Verapamil is indicated for supraventricular tachycardia, atrial fibrillation/flutter with rapid ventricular response, and hypertension. It's alternative to adenosine for SVT.",
      difficulty: "intermediate",
      category: "indications",
      tags: ["verapamil", "supraventricular-tachycardia", "atrial-fibrillation", "rapid-ventricular-response", "hypertension", "alternative-adenosine"]
    },
    {
      chapterNumber: 12,
      question: "What is the dose of Verapamil for SVT?",
      answer: "Adults: 2.5-5 mg IV over 2 minutes, may repeat 5-10 mg every 15-30 minutes to maximum 20 mg. Elderly: 2.5 mg IV over 2 minutes. Not recommended in pediatrics.",
      difficulty: "basic",
      category: "dosing",
      tags: ["verapamil", "SVT", "2.5-5mg", "over-2min", "repeat-5-10mg", "maximum-20mg", "elderly", "not-pediatrics"]
    },
    {
      chapterNumber: 12,
      question: "What are the contraindications for Verapamil?",
      answer: "Contraindications include hypotension, cardiogenic shock, severe heart failure, second or third-degree AV block, and concurrent beta-blocker use. Caution in Wolff-Parkinson-White syndrome.",
      difficulty: "intermediate",
      category: "contraindications",
      tags: ["verapamil", "contraindications", "hypotension", "cardiogenic-shock", "heart-failure", "AV-block", "beta-blocker"]
    },
    {
      chapterNumber: 12,
      question: "What are the side effects of Verapamil?",
      answer: "Side effects include hypotension, bradycardia, AV blocks, heart failure exacerbation, constipation, and dizziness. Hypotension is the most common acute side effect.",
      difficulty: "intermediate",
      category: "side-effects",
      tags: ["verapamil", "side-effects", "hypotension", "bradycardia", "AV-blocks", "heart-failure", "constipation"]
    }
  ];

  // Insert flashcards in batches
  console.log(`Inserting ${medicationFlashcards.length} medication flashcards...`);
  
  for (const flashcard of medicationFlashcards) {
    await db.insert(flashcards).values(flashcard);
  }

  console.log("Medication flashcard seeding completed successfully!");
}

// Auto-run if this file is executed directly
if (require.main === module) {
  seedMedicationFlashcards().catch(console.error);
}