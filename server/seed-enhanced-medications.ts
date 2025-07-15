import { db } from "./db";
import { medications } from "@shared/schema";

export async function seedEnhancedMedications() {
  console.log("🚀 Seeding enhanced medications database...");

  // Clear existing medications
  await db.delete(medications);

  // Add comprehensive EMS medication database with scope-based organization
  const emsmedications = [
    // EMT-Basic Scope
    {
      name: "Oxygen",
      scope: "EMT-B",
      indications: ["Hypoxia", "Respiratory distress", "Chest pain", "Shock"],
      contraindications: ["None in emergency settings"],
      adultDose: "2-6 L/min via nasal cannula; 10-15 L/min via non-rebreather mask",
      pediatricDose: "1-4 L/min via nasal cannula; 10-15 L/min via mask, adjusted for size",
      route: "Inhalation",
      category: "respiratory",
      notes: "Adjust flow based on SpO2; monitor for CO2 retention in COPD"
    },
    {
      name: "Aspirin",
      scope: "EMT-B",
      indications: ["Suspected myocardial infarction", "Chest pain suggestive of ACS"],
      contraindications: ["Allergy to aspirin", "Active bleeding", "Recent GI bleed", "Hemorrhagic stroke"],
      adultDose: "160-325 mg (2-4 chewable 81 mg tablets), chewed",
      pediatricDose: "Not typically used in pediatrics for EMS",
      route: "PO",
      category: "cardiac",
      notes: "Confirm no recent anticoagulant use; chew for faster absorption"
    },
    {
      name: "Epinephrine (1:1,000)",
      scope: "EMT-B",
      indications: ["Anaphylaxis", "Severe allergic reaction"],
      contraindications: ["None in life-threatening anaphylaxis"],
      adultDose: "0.3 mg IM (0.3 mL of 1:1,000) in anterolateral thigh",
      pediatricDose: "0.15 mg IM (0.15 mL of 1:1,000) for <30 kg; 0.3 mg for ≥30 kg",
      route: "IM",
      category: "cardiac",
      notes: "Use auto-injector or draw from vial; may repeat every 5-15 min if needed"
    },
    {
      name: "Albuterol",
      scope: "EMT-B",
      indications: ["Asthma", "COPD exacerbation", "Bronchospasm", "Wheezing"],
      contraindications: ["Allergy to albuterol", "Tachycardia >180 bpm"],
      adultDose: "2.5 mg (3 mL) via nebulizer, may repeat every 5-10 min",
      pediatricDose: "1.25-2.5 mg via nebulizer, based on weight",
      route: "Nebulized/MDI",
      category: "respiratory",
      notes: "Monitor heart rate; combine with ipratropium if available"
    },
    {
      name: "Oral Glucose",
      scope: "EMT-B",
      indications: ["Hypoglycemia (blood glucose <60 mg/dL) in conscious patients"],
      contraindications: ["Unconscious patient", "Inability to swallow"],
      adultDose: "15-30 g oral gel or tablets",
      pediatricDose: "7.5-15 g for children, adjusted for age/weight",
      route: "PO",
      category: "neurological",
      notes: "Recheck glucose after 10 min; repeat if needed"
    },
    {
      name: "Naloxone",
      scope: "EMT-B",
      indications: ["Opioid overdose (respiratory depression, unresponsiveness)"],
      contraindications: ["Allergy to naloxone (rare)"],
      adultDose: "0.4-2 mg IN or IM; may repeat every 2-3 min up to 10 mg",
      pediatricDose: "0.1 mg/kg IN or IM, max 2 mg per dose",
      route: "IV/IM/IN",
      category: "neurological",
      notes: "Monitor for withdrawal symptoms; ensure airway support"
    },
    {
      name: "Nitroglycerin",
      scope: "EMT-B",
      indications: ["Chest pain due to suspected myocardial infarction", "Angina"],
      contraindications: ["Hypotension (SBP <100 mmHg)", "Recent PDE-5 inhibitor use", "Allergy"],
      adultDose: "0.4 mg SL every 5 min up to 3 doses if SBP >100 mmHg",
      pediatricDose: "Not typically used in pediatrics for EMS",
      route: "SL/Spray",
      category: "cardiac",
      notes: "Requires medical direction in some protocols; check BP before each dose"
    },
    
    // AEMT Scope
    {
      name: "Glucagon",
      scope: "AEMT",
      indications: ["Hypoglycemia (no IV access)", "Beta-blocker/calcium channel blocker overdose"],
      contraindications: ["Allergy to glucagon", "Pheochromocytoma", "Insulinoma"],
      adultDose: "1 mg IM or IN; may repeat after 15 min",
      pediatricDose: "0.5 mg IM or IN for <25 kg; 1 mg for ≥25 kg",
      route: "IM/IN",
      category: "neurological",
      notes: "May cause nausea/vomiting; use dextrose if IV access available"
    },
    {
      name: "Dextrose 50%",
      scope: "AEMT",
      indications: ["Hypoglycemia (blood glucose <60 mg/dL)", "Unresponsive with unknown cause"],
      contraindications: ["Suspected stroke", "Increased intracranial pressure"],
      adultDose: "25 g D50 IV (50 mL of 50% solution); D10 10 g (100 mL) bolus",
      pediatricDose: "0.5-1 g/kg D10 IV (5-10 mL/kg of 10% solution)",
      route: "IV",
      category: "neurological",
      notes: "Recheck glucose after 5 min; avoid in stroke-like symptoms"
    },
    {
      name: "Ondansetron",
      scope: "AEMT",
      indications: ["Nausea/vomiting", "Risk of aspiration"],
      contraindications: ["Allergy", "Prolonged QT interval"],
      adultDose: "4-8 mg IV or IM; 4 mg ODT",
      pediatricDose: "0.1 mg/kg IV or IM, max 4 mg",
      route: "IV/IM/PO",
      category: "gastrointestinal",
      notes: "Monitor ECG for QT prolongation with repeat doses"
    },
    {
      name: "Ipratropium Bromide",
      scope: "AEMT",
      indications: ["Asthma", "COPD exacerbation", "Bronchospasm"],
      contraindications: ["Allergy to ipratropium or atropine", "Soy/pea allergy"],
      adultDose: "0.5 mg via nebulizer, often combined with albuterol",
      pediatricDose: "0.25-0.5 mg via nebulizer, based on weight",
      route: "Nebulized",
      category: "respiratory",
      notes: "Use with albuterol for synergistic effect"
    },
    
    // Paramedic Scope
    {
      name: "Morphine",
      scope: "Paramedic",
      indications: ["Severe pain", "Pulmonary edema"],
      contraindications: ["Allergy", "Hypotension (SBP <90 mmHg)", "Respiratory depression"],
      adultDose: "2-10 mg IV or IM, titrated to effect every 5-10 min",
      pediatricDose: "0.1-0.2 mg/kg IV or IM, max 5 mg per dose",
      route: "IV/IM",
      category: "analgesic",
      notes: "Monitor respiratory rate and BP; have naloxone available"
    },
    {
      name: "Fentanyl",
      scope: "Paramedic",
      indications: ["Severe pain", "Trauma", "Burns"],
      contraindications: ["Allergy", "Hypotension (SBP <90 mmHg)", "Respiratory depression"],
      adultDose: "50-100 mcg IV or IN, may repeat every 5-10 min",
      pediatricDose: "1-2 mcg/kg IV or IN, max 50 mcg per dose",
      route: "IV/IN",
      category: "analgesic",
      notes: "Preferred over morphine in hypotensive patients; monitor respiratory status"
    },
    {
      name: "Midazolam (Versed)",
      scope: "Paramedic",
      indications: ["Seizures", "Sedation for procedures", "Agitation"],
      contraindications: ["Allergy", "Severe respiratory depression", "Hypotension"],
      adultDose: "2-5 mg IV or IM; 5-10 mg IN; titrated for seizures",
      pediatricDose: "0.1-0.2 mg/kg IV or IM; 0.2-0.3 mg/kg IN, max 5 mg",
      route: "IV/IM/IN",
      category: "neurological",
      notes: "Monitor for respiratory depression; flumazenil as reversal agent"
    },
    {
      name: "Tranexamic Acid (TXA)",
      scope: "Paramedic",
      indications: ["Severe traumatic hemorrhage", "Postpartum hemorrhage"],
      contraindications: ["Allergy", "Thromboembolic history", ">3 hours from injury"],
      adultDose: "1 g IV over 10 min, followed by 1 g over 8 hours",
      pediatricDose: "15 mg/kg IV, max 1 g",
      route: "IV",
      category: "hematological",
      notes: "Administer early in trauma; monitor for thrombosis"
    },
    {
      name: "Activated Charcoal",
      scope: "Paramedic",
      indications: ["Oral poisoning", "Drug overdose (within 1-2 hours)"],
      contraindications: ["Altered mental status", "Risk of aspiration", "Caustic ingestion"],
      adultDose: "50-100 g PO or via NG tube",
      pediatricDose: "1 g/kg PO, max 50 g",
      route: "PO/NG",
      category: "toxicology",
      notes: "Most effective within 1 hour; not for heavy metals or corrosives"
    },
    {
      name: "Hydrocortisone",
      scope: "Paramedic",
      indications: ["Adrenal insufficiency", "Anaphylaxis (adjunct)"],
      contraindications: ["Allergy", "Systemic fungal infection"],
      adultDose: "100 mg IV or IM",
      pediatricDose: "2 mg/kg IV or IM, max 100 mg",
      route: "IV/IM",
      category: "hormonal",
      notes: "Use patient's own supply if available; monitor glucose"
    },
    {
      name: "Ibuprofen",
      scope: "Paramedic",
      indications: ["Mild to moderate pain", "Fever with discomfort"],
      contraindications: ["Allergy", "Renal impairment", "GI bleed history", "Pregnancy (3rd trimester)"],
      adultDose: "400-800 mg PO every 6-8 hours, max 3.2 g/day",
      pediatricDose: "10 mg/kg PO every 6-8 hours, max 40 mg/kg/day",
      route: "PO",
      category: "analgesic",
      notes: "Use with caution in elderly; monitor for GI irritation"
    },
    {
      name: "Acetylcysteine",
      scope: "Paramedic",
      indications: ["Acetaminophen overdose"],
      contraindications: ["Allergy", "Severe asthma exacerbation"],
      adultDose: "150 mg/kg IV over 60 min (loading dose), followed by maintenance",
      pediatricDose: "Same as adult, weight-based",
      route: "IV",
      category: "toxicology",
      notes: "Administer within 8 hours of overdose; coordinate with poison control"
    },
    {
      name: "Misoprostol",
      scope: "Paramedic",
      indications: ["Postpartum hemorrhage", "Miscarriage with life-threatening bleeding"],
      contraindications: ["Allergy", "Fetus present in uterus", "Hypertension in pre-eclampsia"],
      adultDose: "600-800 mcg sublingual or rectal",
      pediatricDose: "Not applicable",
      route: "SL/Rectal",
      category: "obstetric",
      notes: "First-line for PPH in pre-eclampsia; do not use pre-delivery"
    },
    {
      name: "Magnesium Sulfate",
      scope: "Paramedic",
      indications: ["Severe asthma/bronchospasm", "Seizures in pregnancy (eclampsia)", "Torsades de pointes"],
      contraindications: ["Renal failure", "Heart block", "Respiratory depression"],
      adultDose: "2 g IV over 10 min for asthma; 4-6 g IV loading dose for eclampsia",
      pediatricDose: "25-50 mg/kg IV over 10-20 min, max 2 g",
      route: "IV/IM",
      category: "neurological",
      notes: "Monitor for respiratory depression; have calcium gluconate available"
    },
    {
      name: "Calcium Gluconate",
      scope: "Paramedic",
      indications: ["Hypocalcemia", "Magnesium toxicity", "Calcium channel blocker overdose"],
      contraindications: ["Hypercalcemia", "Digitalis toxicity"],
      adultDose: "1-2 g (10-20 mL of 10% solution) IV slowly",
      pediatricDose: "100-200 mg/kg IV slowly, max 2 g",
      route: "IV",
      category: "electrolyte",
      notes: "Do not mix with sodium bicarbonate; monitor for extravasation"
    },
    {
      name: "Adenosine",
      scope: "Paramedic",
      indications: ["Supraventricular tachycardia (SVT)", "Narrow complex tachycardia"],
      contraindications: ["2nd/3rd degree AV block", "Sick sinus syndrome", "Asthma/COPD"],
      adultDose: "6 mg IV push followed by 12 mg if needed",
      pediatricDose: "0.1 mg/kg IV push, max 6 mg; second dose 0.2 mg/kg, max 12 mg",
      route: "IV",
      category: "cardiac",
      notes: "Give rapidly through large bore IV; warn patient of impending doom feeling"
    },
    {
      name: "Amiodarone",
      scope: "Paramedic",
      indications: ["Ventricular fibrillation", "Ventricular tachycardia", "Atrial fibrillation"],
      contraindications: ["Bradycardia", "Heart block", "Hypotension"],
      adultDose: "300 mg IV for VF/VT, then 150 mg; 15 mg/min infusion for stable VT",
      pediatricDose: "5 mg/kg IV for VF/VT, may repeat once",
      route: "IV",
      category: "cardiac",
      notes: "Monitor for hypotension; may cause phlebitis"
    },
    {
      name: "Lidocaine",
      scope: "Paramedic",
      indications: ["Ventricular arrhythmias", "Local anesthesia"],
      contraindications: ["Heart block", "Severe bradycardia", "Allergy to amide anesthetics"],
      adultDose: "1-1.5 mg/kg IV bolus, then 1-4 mg/min infusion",
      pediatricDose: "1 mg/kg IV bolus, then 20-50 mcg/kg/min infusion",
      route: "IV",
      category: "cardiac",
      notes: "Monitor for CNS toxicity; reduce dose in liver disease"
    },
    {
      name: "Atropine",
      scope: "Paramedic",
      indications: ["Bradycardia", "Organophosphate poisoning", "Bronchospasm"],
      contraindications: ["Tachycardia", "Glaucoma", "Myasthenia gravis"],
      adultDose: "0.5-1 mg IV every 3-5 min for bradycardia; 2-5 mg for poisoning",
      pediatricDose: "0.02 mg/kg IV, min 0.1 mg, max 0.5 mg in children",
      route: "IV/IM",
      category: "cardiac",
      notes: "May cause paradoxical bradycardia at low doses"
    },
    {
      name: "Dopamine",
      scope: "Paramedic",
      indications: ["Cardiogenic shock", "Hypotension", "Bradycardia"],
      contraindications: ["Pheochromocytoma", "Ventricular fibrillation", "Hypovolemia"],
      adultDose: "2-20 mcg/kg/min IV infusion, titrated to effect",
      pediatricDose: "2-20 mcg/kg/min IV infusion, titrated to effect",
      route: "IV",
      category: "cardiac",
      notes: "Use central line if possible; monitor for extravasation"
    },
    {
      name: "Norepinephrine",
      scope: "Paramedic",
      indications: ["Severe hypotension", "Septic shock", "Cardiogenic shock"],
      contraindications: ["Hypovolemia", "Mesenteric/peripheral vascular thrombosis"],
      adultDose: "0.5-30 mcg/min IV infusion, titrated to effect",
      pediatricDose: "0.05-2 mcg/kg/min IV infusion, titrated to effect",
      route: "IV",
      category: "cardiac",
      notes: "Preferably through central line; monitor for extravasation"
    },
    {
      name: "Epinephrine (1:10,000)",
      scope: "Paramedic",
      indications: ["Cardiac arrest", "Severe anaphylaxis", "Severe bronchospasm"],
      contraindications: ["None in cardiac arrest"],
      adultDose: "1 mg IV every 3-5 min during CPR; 0.1-0.5 mg IV for anaphylaxis",
      pediatricDose: "0.01 mg/kg IV every 3-5 min during CPR, max 1 mg",
      route: "IV",
      category: "cardiac",
      notes: "Use 1:10,000 concentration for IV; may cause coronary ischemia"
    },
    {
      name: "Sodium Bicarbonate",
      scope: "Paramedic",
      indications: ["Metabolic acidosis", "Tricyclic antidepressant overdose", "Hyperkalemia"],
      contraindications: ["Metabolic alkalosis", "Respiratory acidosis", "Hypokalemia"],
      adultDose: "1 mEq/kg IV initially, then 0.5 mEq/kg every 10 min",
      pediatricDose: "1 mEq/kg IV initially, then 0.5 mEq/kg every 10 min",
      route: "IV",
      category: "electrolyte",
      notes: "Monitor ABGs; can cause hypernatremia and paradoxical acidosis"
    },
    {
      name: "Flumazenil",
      scope: "Paramedic",
      indications: ["Benzodiazepine overdose", "Reversal of conscious sedation"],
      contraindications: ["Seizure disorders", "Chronic benzodiazepine use", "Unknown drug ingestion"],
      adultDose: "0.2 mg IV, may repeat every 1 min to total of 1 mg",
      pediatricDose: "0.01 mg/kg IV, may repeat every 1 min to total of 0.05 mg/kg",
      route: "IV",
      category: "neurological",
      notes: "May precipitate seizures in chronic users; short half-life"
    },
    {
      name: "Furosemide",
      scope: "Paramedic",
      indications: ["Pulmonary edema", "Congestive heart failure", "Hypertensive emergency"],
      contraindications: ["Anuria", "Hypovolemia", "Hypotension"],
      adultDose: "40-80 mg IV, may repeat or increase dose",
      pediatricDose: "1-2 mg/kg IV, max 40 mg",
      route: "IV/IM",
      category: "diuretic",
      notes: "Monitor for hypotension and electrolyte imbalance"
    },
    {
      name: "Mannitol",
      scope: "Paramedic",
      indications: ["Increased intracranial pressure", "Cerebral edema"],
      contraindications: ["Intracranial bleeding", "Pulmonary edema", "Renal failure"],
      adultDose: "0.5-2 g/kg IV over 15-30 min",
      pediatricDose: "0.5-1 g/kg IV over 15-30 min",
      route: "IV",
      category: "neurological",
      notes: "Use inline filter; monitor for rebound increase in ICP"
    },
    {
      name: "Dexamethasone",
      scope: "Paramedic",
      indications: ["Cerebral edema", "Severe asthma", "Allergic reactions"],
      contraindications: ["Systemic fungal infection", "Live virus vaccines"],
      adultDose: "4-8 mg IV for cerebral edema; 0.5-9 mg IV for other indications",
      pediatricDose: "0.15-0.3 mg/kg IV, max 10 mg",
      route: "IV/IM",
      category: "anti-inflammatory",
      notes: "Longer duration than hydrocortisone; monitor blood glucose"
    },
    {
      name: "Ketamine",
      scope: "Paramedic",
      indications: ["Dissociative anesthesia", "Severe agitation", "Refractory pain"],
      contraindications: ["Schizophrenia", "Increased intracranial pressure", "Severe hypertension"],
      adultDose: "1-2 mg/kg IV or 4-5 mg/kg IM",
      pediatricDose: "1-2 mg/kg IV or 4-5 mg/kg IM",
      route: "IV/IM",
      category: "anesthetic",
      notes: "Preserve airway reflexes; may cause emergence reactions"
    },
    {
      name: "Lorazepam",
      scope: "Paramedic",
      indications: ["Status epilepticus", "Severe agitation", "Alcohol withdrawal"],
      contraindications: ["Respiratory depression", "Coma", "Acute angle-closure glaucoma"],
      adultDose: "2-4 mg IV or IM, may repeat every 10-15 min",
      pediatricDose: "0.05-0.1 mg/kg IV or IM, max 4 mg",
      route: "IV/IM",
      category: "neurological",
      notes: "Longer half-life than midazolam; monitor respiratory status"
    },
    {
      name: "Phenytoin",
      scope: "Paramedic",
      indications: ["Status epilepticus", "Seizure prophylaxis"],
      contraindications: ["Heart block", "Bradycardia", "Hypotension"],
      adultDose: "15-20 mg/kg IV at 25-50 mg/min",
      pediatricDose: "15-20 mg/kg IV at 1-3 mg/kg/min",
      route: "IV",
      category: "neurological",
      notes: "Monitor ECG; may cause purple glove syndrome"
    },
    {
      name: "Diazepam",
      scope: "Paramedic",
      indications: ["Status epilepticus", "Severe anxiety", "Muscle spasms"],
      contraindications: ["Respiratory depression", "Coma", "Myasthenia gravis"],
      adultDose: "5-10 mg IV or rectal, may repeat every 5-10 min",
      pediatricDose: "0.2-0.5 mg/kg IV or rectal, max 10 mg",
      route: "IV/Rectal",
      category: "neurological",
      notes: "Highly protein bound; may cause phlebitis"
    }
  ];

  for (const medication of emsmedications) {
    await db.insert(medications).values(medication);
  }

  console.log(`✅ Seeded ${emsmedications.length} enhanced medications`);
}

if (import.meta.main) {
  await seedEnhancedMedications();
  process.exit(0);
}