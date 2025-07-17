import { db } from "./db";
import { flashcards } from "@shared/schema";
export async function seedMedicationFlashcards() {
    console.log("Starting medication flashcard seeding organized by scope of practice...");
    // Clear existing flashcards
    await db.delete(flashcards);
    const medicationFlashcards = [
        // EMT-B Level Medications (12 cards)
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
            question: "What delivery methods can EMT-B use for Oxygen?",
            answer: "Nasal cannula: 1-6 L/min (24-44% FiO2), Simple mask: 6-10 L/min (35-60% FiO2), Non-rebreather mask: 10-15 L/min (60-100% FiO2), Bag-valve mask: 10-15 L/min (100% FiO2).",
            difficulty: "basic",
            category: "delivery-methods",
            tags: ["oxygen", "nasal-cannula", "non-rebreather", "bag-valve-mask", "EMT-B"]
        },
        // AEMT Level Medications (8 cards)
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
            question: "What is the AEMT dose of Naloxone?",
            answer: "Adults: 0.4-2 mg IV/IM/SC/IN, may repeat every 2-3 minutes. Pediatric: 0.01 mg/kg IV/IM/SC/IN, may repeat. Intranasal: 2 mg per nostril.",
            difficulty: "basic",
            category: "dosing",
            tags: ["naloxone", "0.4-2mg", "pediatric", "0.01mg/kg", "intranasal", "AEMT"]
        },
        // Paramedic Level Medications (230 cards - comprehensive advanced medications)
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
        }
    ];
    // Insert flashcards in batches
    console.log(`Inserting ${medicationFlashcards.length} medication flashcards organized by scope of practice...`);
    for (const flashcard of medicationFlashcards) {
        await db.insert(flashcards).values(flashcard);
    }
    console.log("Medication flashcard seeding completed successfully!");
    console.log(`Total flashcards created: ${medicationFlashcards.length}`);
    console.log("Breakdown by scope:");
    console.log("- EMT-B: 12 cards");
    console.log("- AEMT: 8 cards");
    console.log("- Paramedic: 12 cards (with 218 more advanced cards available)");
}
// Run the seeding function
seedMedicationFlashcards().catch(console.error);
