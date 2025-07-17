import { db } from './db';
import { studyNotes } from '../shared/schema';
export async function seedRemainingChapters() {
    const remainingChapters = [
        {
            chapterNumber: 34,
            title: "Obstetrics and Neonatal Care",
            content: `This chapter focuses on obstetrics and neonatal care, covering the anatomy and physiology of the female reproductive system during pregnancy. You will learn emergency treatment for childbirth, including the stages of labor and normal delivery. Complications of pregnancy and neonatal evaluations are also covered.

The female reproductive system includes several key organs. The ovaries are two glands containing thousands of follicles, each containing an egg. Ovulation happens about two weeks before menstruation, and the fertilized egg implants in the endometrium.

The placenta is a disc-shaped structure attached to the uterine wall that provides nourishment to the fetus. It keeps the woman's and fetus's circulation separate, though substances can pass between them. The umbilical cord connects the woman and fetus through the placenta, with the umbilical vein carrying oxygenated blood to the fetus's heart and the umbilical artery carrying deoxygenated blood to the placenta.

Normal physiological changes during pregnancy affect four major body systems: respiratory, cardiovascular, musculoskeletal, and reproductive. The respiratory system shows increased respiratory rates with decreased minute volumes. The cardiovascular system demonstrates overall blood volume increases up to 50%, heart rate increases up to 20%, and significantly increased cardiac output.

Common complications include gestational diabetes, hypertensive disorders, preeclampsia, and eclampsia. Eclampsia is characterized by seizures due to hypertension and requires immediate treatment including laying the patient on her side, maintaining airway, providing oxygen, and rapid transport. Bleeding complications include ectopic pregnancy, spontaneous abortion, abruptio placentae, and placenta previa.

Special considerations for trauma in pregnancy include recognizing two patients (woman and fetus), increased fall risk due to hormonal changes, blood volume changes that can mask shock, and vulnerability of the uterus to trauma. Seatbelt injuries and abruptio placentae are significant risks with trauma.

The stages of labor include the first stage (onset of labor to full cervical dilation), second stage (full dilation to delivery), and third stage (delivery to placental expulsion). Normal delivery involves proper positioning, controlling the head, checking for nuchal cord, and delivering the shoulders and body. Immediate newborn care includes drying, warming, positioning, suctioning, and stimulating if needed.

Neonatal assessment uses the APGAR score at 1 and 5 minutes, evaluating appearance, pulse, grimace, activity, and respiratory effort. Abnormal presentations include breech delivery, prolapsed cord, and multiple births. Postpartum hemorrhage is a serious complication requiring immediate intervention.`,
            keyPoints: [
                "Female reproductive anatomy and pregnancy physiology",
                "Placenta, umbilical cord, and amniotic sac functions",
                "Normal physiological changes during pregnancy",
                "Complications: gestational diabetes, hypertensive disorders, bleeding",
                "Eclampsia treatment: side position, airway, oxygen, transport",
                "Trauma considerations: two patients, fall risk, blood volume changes",
                "Three stages of labor and normal delivery process",
                "APGAR scoring system for neonatal assessment",
                "Abnormal presentations: breech, prolapsed cord, multiple births",
                "Postpartum hemorrhage recognition and management"
            ],
            learningObjectives: [
                "Describe the anatomy and physiology of the female reproductive system during pregnancy",
                "Explain normal physiological changes that occur during pregnancy",
                "Identify complications of pregnancy and their emergency management",
                "Outline the three stages of labor and normal delivery process",
                "Demonstrate proper neonatal assessment using the APGAR score",
                "Recognize abnormal presentations and emergency delivery situations",
                "Discuss special considerations for trauma in pregnant patients",
                "Explain postpartum complications and their management"
            ],
            tags: ["obstetrics", "neonatal", "pregnancy", "delivery", "APGAR", "complications", "trauma"],
            isCompleted: false
        },
        {
            chapterNumber: 35,
            title: "Pediatric Emergencies",
            content: `Treating children is different from treating adults. Children vary anatomically, physically, and emotionally from adults. Their illnesses and injuries differ based on age and development. Pediatrics is the specialized medical practice for young patients. Caring for children can be challenging due to their age and developmental level.

Communication and family support are crucial in pediatric care. Caring for a child means caring for both the patient and caregivers. Family members often need emotional support, and a calm parent helps the child remain calm. Different age groups require different communication approaches: infants benefit from caregiver holding during assessment, toddlers need simple words and calm voice, preschoolers require direct communication without lies, school-aged children should be talked to directly with simple explanations, and adolescents should be involved in their own care.

Growth and development stages include infancy (first year), toddler (1-3 years), preschool age (3-6 years), school age (6-12 years), and adolescence (13-18 years). Each stage has unique characteristics affecting assessment and care approaches.

Pediatric anatomy and physiology differences are significant. The respiratory system has smaller airway diameter, larger tongue relative to mouth size, funnel-shaped upper airway, and higher oxygen demand. The circulatory system shows variable pulse ranges with age and different compensation mechanisms. The nervous system is immature and less protected, with disproportionately larger head-to-body ratio.

Respiratory emergencies are common in children. Upper airway obstruction can be caused by croup, epiglottitis, or foreign body aspiration. Lower airway conditions include asthma, bronchiolitis, and pneumonia. Treatment focuses on positioning, oxygen delivery, and avoiding agitation.

Cardiopulmonary arrest in children is usually respiratory in origin. Shock in children compensates well initially but decompensates rapidly. Signs include tachycardia, altered mental status, and poor perfusion. Anaphylaxis requires immediate epinephrine administration and supportive care.

Neurologic emergencies include seizures, altered mental status, and head trauma. Febrile seizures are common and usually benign. Gastrointestinal emergencies involve dehydration, which is more serious in children due to higher surface area-to-body weight ratio.

Pediatric trauma considerations include different injury patterns, anatomical differences affecting assessment, and special equipment needs. Child abuse and neglect require recognition and proper reporting. SIDS (Sudden Infant Death Syndrome) and ALTE (Apparent Life-Threatening Events) are specialized pediatric conditions requiring specific approaches.`,
            keyPoints: [
                "Pediatric patients differ anatomically, physically, and emotionally from adults",
                "Age-specific communication strategies for different developmental stages",
                "Five growth and development stages: infancy through adolescence",
                "Respiratory system differences: smaller airways, higher oxygen demand",
                "Circulatory system: variable pulse ranges, different compensation mechanisms",
                "Respiratory emergencies: croup, epiglottitis, asthma, bronchiolitis",
                "Cardiopulmonary arrest usually respiratory in origin",
                "Dehydration more serious due to higher surface area-to-body weight ratio",
                "Child abuse recognition and mandatory reporting requirements",
                "SIDS and ALTE as specialized pediatric emergency conditions"
            ],
            learningObjectives: [
                "Describe age-specific approaches to pediatric patient assessment and care",
                "Explain anatomical and physiological differences between children and adults",
                "Identify common pediatric respiratory emergencies and their management",
                "Recognize signs of shock and cardiopulmonary arrest in children",
                "Discuss pediatric trauma considerations and injury patterns",
                "Explain the assessment and management of pediatric neurologic emergencies",
                "Describe signs of child abuse and neglect and reporting requirements",
                "Identify SIDS and ALTE presentations and appropriate responses"
            ],
            tags: ["pediatrics", "developmental stages", "respiratory emergencies", "child abuse", "SIDS", "trauma"],
            isCompleted: false
        },
        {
            chapterNumber: 36,
            title: "Geriatric Emergencies",
            content: `Geriatrics focuses on the assessment and treatment of disease in individuals aged 65 or older. The population aged 65 and older is projected to nearly double between 2012 and 2050. Caring for geriatric patients presents unique challenges due to chronic conditions, multiple medications, and the physiological changes of aging.

Communication with older adults requires understanding and patience. Always treat patients with respect and avoid ageism. Use their name or "sir" or "ma'am," speak slowly and distinctly, and give patients time to respond. Look directly at the patient at eye level in good lighting, and explain actions before performing them.

Leading causes of death in older adults include chronic lower respiratory disease, heart disease, cancer, stroke, Alzheimer's disease, and accidents/falls. Simple injuries can have severe consequences, such as rib fractures leading to pneumonia or hip fractures causing prolonged disability.

Age-related changes affect all body systems. The respiratory system shows weakened airway musculature, enlarged alveoli with decreased elasticity, and slower chemoreceptor response to hypoxia. Pneumonia is a leading cause of death from infection in older Americans. Pulmonary emboli are sudden blockages by venous clots with various risk factors.

Cardiovascular changes include heart hypertrophy, decreased cardiac output, and arteriosclerosis. Myocardial infarctions often present atypically or silently in older adults. Heart failure symptoms vary based on the affected side - right-sided failure shows body fluid backup, while left-sided failure causes lung fluid accumulation.

Neurologic changes include decreased brain weight, slower reflexes, and altered sleep patterns. Stroke is a leading cause of death and disability. Dementia, including Alzheimer's disease, affects memory, judgment, and behavior. Delirium is an acute, reversible condition often caused by illness or medications.

Gastrointestinal and renal changes include decreased gastric acid production, slower gastric emptying, and reduced kidney function. Endocrine changes affect glucose metabolism and temperature regulation. Immune system changes increase infection susceptibility.

Polypharmacy is common in older adults, leading to increased adverse drug reactions and interactions. Behavioral emergencies may result from dementia, delirium, or depression. Elder abuse and neglect are serious concerns requiring recognition and reporting.

The GEMS (Geriatric, Environmental, Medical, Social) triangle provides a framework for assessing older patients. Special considerations include medication effects, environmental hazards, and social support systems.`,
            keyPoints: [
                "Geriatric population (65+) projected to nearly double by 2050",
                "Communication requires patience, respect, and avoiding ageism",
                "Leading causes of death: respiratory disease, heart disease, cancer, stroke",
                "Age-related respiratory changes increase pneumonia and PE risk",
                "Cardiovascular changes: hypertrophy, decreased output, arteriosclerosis",
                "Myocardial infarctions often silent or atypical in older adults",
                "Neurologic changes: decreased brain weight, slower reflexes, dementia risk",
                "Polypharmacy increases adverse drug reactions and interactions",
                "Elder abuse and neglect recognition and reporting requirements",
                "GEMS triangle framework for geriatric assessment"
            ],
            learningObjectives: [
                "Describe the demographic trends and challenges of geriatric care",
                "Explain effective communication strategies for older adult patients",
                "Identify age-related changes in all major body systems",
                "Recognize atypical presentations of common conditions in older adults",
                "Discuss the impact of polypharmacy on geriatric patients",
                "Describe the assessment and management of geriatric emergencies",
                "Explain the GEMS triangle approach to geriatric assessment",
                "Identify signs of elder abuse and neglect and reporting procedures"
            ],
            tags: ["geriatrics", "aging", "polypharmacy", "elder abuse", "GEMS triangle", "atypical presentations"],
            isCompleted: false
        },
        {
            chapterNumber: 37,
            title: "Special Challenges",
            content: `This chapter discusses patients with special challenges in emergency care, covering the needs of patients with developmental, sensory, and physical disabilities. Understanding the unique anatomy and physiology of these patients is crucial. Special care is also needed for patients relying on medical technology.

Intellectual and developmental disabilities may impair physical ability, learning, language, or behavioral skills. Intellectual disability involves limitations in intellectual functioning and daily living skills, diagnosed before age 18. Autism spectrum disorder is characterized by deficiencies in social communication and repetitive behaviors. Patients may have abnormal sensory responses and require calm environments with minimal stimulation.

Down syndrome is a genetic chromosomal defect resulting in mild to severe intellectual impairment. Physical abnormalities include round head, flat occiput, and large protruding tongue. Intubation can be difficult due to anatomical differences, and approximately 15% have upper spine instability, placing them at increased trauma risk.

Sensory disabilities affect vision or hearing. Visual impairment management includes making yourself known, introducing your team, describing surroundings, and taking assistive devices during transport. Hearing impairment requires facing the patient for lip reading, lowering pitch rather than speaking louder, and considering alternative communication methods.

Physical disabilities include cerebral palsy, spina bifida, and paralysis. Cerebral palsy results from brain damage causing poorly controlled movement. Observe the airway closely, don't assume intellectual disability, and pad for comfort. Spina bifida involves incomplete spinal column closure with associated neurologic damage. Paralysis affects voluntary movement and may require specialized equipment.

Bariatric patients have excessive body fat, defined as 30% or more over ideal body weight. Associated health problems include diabetes, hypertension, heart disease, and stroke. Special considerations include planning for extra help, finding safe exit routes, coordinating lifts, and notifying receiving hospitals early.

Patients reliant on medical technology include those with tracheostomy tubes, mechanical ventilators, apnea monitors, and internal cardiac pacemakers. Tracheostomy tubes provide airway access but are prone to obstruction. Mechanical ventilators support breathing, while apnea monitors detect breathing cessation. Internal pacemakers regulate heart rhythm and may be affected by electromagnetic interference.

Gastrostomy tubes provide nutrition directly to the stomach, while colostomies and ileostomies create alternative waste elimination routes. Indwelling urinary catheters assist with urination. Each device requires specific care considerations and potential complications.

Home care patients may have complex medical needs requiring specialized equipment and medications. Family members often serve as primary caregivers and are valuable sources of information about the patient's condition and normal functioning.`,
            keyPoints: [
                "Intellectual disabilities: limitations in functioning and daily living skills",
                "Autism spectrum disorder: social communication deficits, sensory responses",
                "Down syndrome: genetic defect with intellectual impairment and physical abnormalities",
                "Visual impairment: make yourself known, describe surroundings, take assistive devices",
                "Hearing impairment: face patient, lower pitch, consider alternative communication",
                "Physical disabilities: cerebral palsy, spina bifida, paralysis considerations",
                "Bariatric patients: plan for extra help, coordinate lifts, notify hospitals",
                "Tracheostomy tubes: airway access, prone to obstruction, specialized care",
                "Medical technology: ventilators, pacemakers, feeding tubes, monitoring devices",
                "Home care patients: complex needs, family caregivers as information sources"
            ],
            learningObjectives: [
                "Describe the assessment and care of patients with intellectual and developmental disabilities",
                "Explain communication strategies for patients with sensory impairments",
                "Identify special considerations for patients with physical disabilities",
                "Discuss the challenges and techniques for caring for bariatric patients",
                "Describe the function and complications of common medical technology devices",
                "Explain the assessment and transport of patients with tracheostomies",
                "Identify the special needs of home care patients and their families",
                "Discuss safety considerations for patients with medical technology"
            ],
            tags: ["disabilities", "developmental", "sensory impairment", "bariatric", "medical technology", "home care"],
            isCompleted: false
        },
        {
            chapterNumber: 38,
            title: "Transport Operations",
            content: `Emergency medical transport aims to provide effective preparation for transport, safe emergency vehicle operations, appropriate transport decisions, and safe patient transfer techniques. EMTs play a vital role in each phase of an ambulance call.

Modern ambulances are designed based on NFPA 1917 standards and include a driver's compartment and patient compartment large enough for two EMTs and at least one supine patient. Equipment should be durable, standardized, and stored according to urgency and frequency of use. Life-threatening condition items are placed within easy reach.

An ambulance call has nine phases: preparation, dispatch, en route to scene, arrival and scene size-up, transfer of patient to ambulance, en route to receiving facility, arrival at receiving facility, en route to station, and post-run activities.

The preparation phase involves checking all equipment and supplies, daily inspections of the vehicle, and ensuring all safety systems work properly. The dispatch phase requires 24-hour accessibility and gathering complete information about the call including nature, location, and patient details.

En route to scene is often the most dangerous phase. Always fasten seat belts, review dispatcher information, and assign specific duties. Arrival at scene requires scene size-up, safety assessment, and proper ambulance positioning. Park 100 feet before or past a crash site, uphill and upwind of hazards.

Patient transfer involves securing the patient with at least three body straps and deceleration straps. En route to facility requires monitoring stable patients every 15 minutes and unstable patients every 5 minutes. Contact the receiving facility to inform them of arrival.

Safe emergency vehicle operations require proper driver characteristics including physical fitness, emotional stability, and knowledge of traffic laws. Use defensive driving techniques, maintain safe following distances, and exercise due regard for others. Sirens should be used judiciously as they may not be heard by other drivers.

Speed must be adjusted for conditions, vehicle size affects stopping distance and maneuverability, and road conditions significantly impact safety. Emergency vehicles have certain legal privileges but must still exercise due regard. Common hazards include intersection accidents, backing incidents, and multiple vehicle responses.

Driver fatigue and distractions are major safety concerns. Avoid cell phone use, eating, or other distracting activities while driving. Plan routes in advance and maintain situational awareness.

Air medical operations include helicopters and fixed-wing aircraft. Indications include time-critical transports, difficult access, and specialized care needs. Landing zone establishment requires a 100x100 foot area for helicopters, clear of obstacles and debris. Safety considerations include rotor wash, noise, and communication with flight crew.`,
            keyPoints: [
                "Nine phases of ambulance call from preparation to post-run activities",
                "Equipment stored by urgency and frequency of use",
                "Daily inspections include vehicle systems and medical equipment",
                "En route to scene is most dangerous phase - use seat belts always",
                "Proper positioning: 100 feet from crash, uphill/upwind of hazards",
                "Patient monitoring: stable every 15 minutes, unstable every 5 minutes",
                "Defensive driving: maintain safe distances, exercise due regard",
                "Siren use should be judicious - may not be heard by other drivers",
                "Speed, vehicle size, and road conditions affect emergency operations",
                "Air medical operations: helicopters need 100x100 foot landing zones"
            ],
            learningObjectives: [
                "Describe the nine phases of an ambulance call and key activities in each",
                "Explain proper ambulance equipment storage and daily inspection procedures",
                "Identify safe driving practices for emergency vehicle operations",
                "Discuss the proper use of emergency warning devices and due regard principles",
                "Describe factors affecting emergency vehicle safety and common hazards",
                "Explain patient monitoring and care during transport",
                "Identify indications for air medical transport and safety considerations",
                "Describe landing zone establishment and safety procedures for helicopters"
            ],
            tags: ["transport", "ambulance operations", "emergency driving", "air medical", "safety", "nine phases"],
            isCompleted: false
        },
        {
            chapterNumber: 39,
            title: "Vehicle Extrication and Special Rescue",
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
            keyPoints: [
                "Personal and team safety comes first, then patient care",
                "Vehicle safety systems become hazards: compressed bumpers, airbags",
                "Alternative fuel vehicles: disconnect batteries, avoid orange cables",
                "Airbag clearance distances: 5″ side, 10″ driver, 20″ passenger",
                "10 phases of extrication from preparation to termination",
                "Simple access: use doors/windows before breaking glass",
                "Complex access: requires special tools and trained personnel",
                "Emergency care: primary assessment, hemorrhage control, spinal stabilization",
                "Specialized rescues: confined space, trench, high-angle, water",
                "Know limitations - call for appropriate specialized teams"
            ],
            learningObjectives: [
                "Describe safety considerations and hazards in vehicle extrication",
                "Explain the roles and responsibilities of different agencies at rescue scenes",
                "Identify the 10 phases of vehicle extrication and key activities",
                "Discuss simple and complex access techniques for vehicle extrication",
                "Describe emergency care considerations for trapped patients",
                "Explain the principles of specialized rescue operations",
                "Identify when to call for specialized rescue teams",
                "Discuss the EMT's role in supporting rescue operations"
            ],
            tags: ["extrication", "vehicle rescue", "safety systems", "specialized rescue", "hazards", "access techniques"],
            isCompleted: false
        },
        {
            chapterNumber: 40,
            title: "Incident Management",
            content: `The National Incident Management System (NIMS) promotes efficient coordination of emergency incidents at all levels. The Incident Command System (ICS) is a component of NIMS designed to ensure responder and public safety, achieve incident management goals, and ensure efficient resource use.

Mass Casualty Incidents (MCIs) involve three or more patients or any situation placing great demand on equipment or personnel. Disasters are widespread events disrupting community functions and resources, threatening lives and property. Unlike MCIs, disasters can require responders for days, weeks, or months.

The Incident Commander (IC) is in charge of overall incident management. Large incidents may require unified command with multiple agencies. EMTs must know who the IC is, how to communicate, and where the command post is located. Command can be transferred to someone with more experience as incidents develop.

General staff includes command, finance, logistics, operations, and planning. Finance documents expenditures for reimbursement. Logistics is responsible for communications, facilities, food, water, fuel, and supplies. Operations manages tactical operations at large incidents. Planning solves problems and develops incident action plans.

Command staff includes the Public Information Officer (PIO), Safety Officer, and Liaison Officer. The Safety Officer monitors for hazards and can stop operations if rescuers are in danger. The PIO provides information to media and public. The Liaison Officer relays information between agencies.

Communication is critical for incident management. Integrated communications allow all agencies to communicate quickly using common terminology and clear text. Avoid 10-codes or signals on radio. Face-to-face communication helps limit radio traffic. Equipment must be reliable and durable with backups.

EMS response within ICS includes specific roles: Medical Branch Director supervises triage, treatment, and transport. Triage Supervisor counts and prioritizes patients. Treatment Supervisor locates treatment areas. Transportation Supervisor coordinates patient distribution. Staging Officer manages emergency vehicles.

Triage procedures prioritize patients based on severity and survivability. START (Simple Triage and Rapid Treatment) is used for patients over 8 years old. JumpSTART is used for pediatric patients. Triage categories include immediate (red), delayed (yellow), minor (green), and deceased (black).

START triage assesses respiratory status, perfusion, and mental status. Patients who can walk are minor. Non-ambulatory patients are assessed for breathing - if absent and positioning doesn't help, they are deceased. Respiratory rate over 30 or under 10 is immediate. Radial pulse absence or capillary refill over 2 seconds is immediate. Inability to follow simple commands is immediate.

Special considerations include hazardous materials incidents requiring specialized training and equipment. HAZMAT incidents involve nine classes of dangerous materials. Control zones include hot (exclusion), warm (contamination reduction), and cold (support) zones. Decontamination procedures are essential before patient treatment.`,
            keyPoints: [
                "NIMS provides framework for incident coordination at all levels",
                "MCIs involve 3+ patients or overwhelming resource demand",
                "Incident Commander oversees overall incident management",
                "General staff: command, finance, logistics, operations, planning",
                "Command staff: PIO, Safety Officer, Liaison Officer",
                "Communication using common terminology and clear text essential",
                "EMS roles: Medical Branch Director, Triage, Treatment, Transport supervisors",
                "START triage for adults, JumpSTART for pediatrics",
                "Triage categories: immediate (red), delayed (yellow), minor (green), deceased (black)",
                "HAZMAT incidents require specialized training and control zones"
            ],
            learningObjectives: [
                "Describe the components and purpose of NIMS and ICS",
                "Explain the roles and responsibilities within incident command structure",
                "Identify the key functions of general staff and command staff",
                "Discuss effective communication principles for incident management",
                "Describe the EMS branch structure and roles within ICS",
                "Explain START and JumpSTART triage procedures and categories",
                "Identify special considerations for mass casualty incidents",
                "Describe basic principles of hazardous materials incident management"
            ],
            tags: ["incident management", "ICS", "NIMS", "triage", "START", "JumpSTART", "HAZMAT", "MCI"],
            isCompleted: false
        },
        {
            chapterNumber: 41,
            title: "Terrorism and Disaster Management",
            content: `Terrorism involves violent or dangerous acts that violate law and intend to intimidate populations or influence government policy. International terrorism occurs primarily outside U.S. jurisdiction, while domestic terrorism occurs primarily within U.S. jurisdiction. EMTs must be prepared mentally and physically for possible terrorist events.

Types of terrorism include religious extremist groups, doomsday cults, extremist political groups, violent supremacy groups, cyber terrorists, and single-issue groups. An alarming trend is lone wolf terrorism - violence by a single actor pursuing political change linked to ideology without outside orders or support.

Active shooter events have prompted discussion of gun laws, mental health, and casualty treatment. The Hartford Consensus recommends a THREAT response plan: Threat suppression, Hemorrhage control, Rapid extrication, Assessment by medical providers, and Transport to definitive care. EMS crews may be equipped with ballistic vests and helmets.

Weapons of Mass Destruction (WMDs) are designed to cause mass death or damage to property and infrastructure. Acronyms BE-NICE (Biologic, Nuclear, Incendiary, Chemical, Explosive) or CBRNE (Chemical, Biologic, Radiologic, Nuclear, Explosive) help remember WMD types. Explosives have been the preferred WMD for terrorists due to relative ease of obtaining and creating.

Chemical agents include vesicants (blister agents), respiratory agents (choking agents), nerve agents, and metabolic agents (cyanides). Vesicants cause burn-like blisters and skin irritation. Respiratory agents damage lung tissue causing pulmonary edema. Nerve agents are extremely toxic and rapidly fatal, requiring DuoDote auto-injectors. Metabolic agents affect oxygen utilization.

Biological agents include bacteria, viruses, and toxins used as weapons. Dissemination methods include aerosol, food/water contamination, and infected vectors. Response includes recognizing unusual disease patterns, implementing isolation precautions, and decontamination procedures.

Radiological and nuclear terrorism involves radioactive materials or nuclear weapons. Radiological Dispersal Devices (RDDs) or "dirty bombs" combine conventional explosives with radioactive materials. Exposure can occur through inhalation, ingestion, or direct contact. Symptoms may be delayed and include nausea, vomiting, and skin burns.

Explosive and incendiary devices remain the most common terrorist weapons. Primary blast injuries result from pressure waves, secondary injuries from flying debris, tertiary injuries from being thrown, and quaternary injuries from burns and toxic exposures. Triage and treatment follow standard protocols with attention to multiple injury patterns.

EMT response principles include scene safety assessment, recognizing potential terrorist events, implementing appropriate PPE, establishing control zones, and coordinating with law enforcement. Secondary devices targeting responders are a concern. Decontamination procedures may be necessary before patient treatment.

Disaster management involves coordinating resources for widespread events. Public health considerations include disease surveillance, mass vaccination programs, mental health support, and infrastructure protection. Psychological effects of terrorism include acute stress reactions, PTSD, and community-wide anxiety requiring long-term support.`,
            keyPoints: [
                "Terrorism: violent acts to intimidate populations or influence government",
                "Types: international, domestic, lone wolf, active shooter events",
                "THREAT response: Threat suppression, Hemorrhage control, Rapid extrication, Assessment, Transport",
                "WMDs: BE-NICE or CBRNE - Biologic, Nuclear, Incendiary, Chemical, Explosive",
                "Chemical agents: vesicants, respiratory, nerve, metabolic agents",
                "Nerve agents require DuoDote auto-injectors for treatment",
                "Biological agents: bacteria, viruses, toxins with delayed symptoms",
                "Radiological devices: dirty bombs combining explosives with radioactive materials",
                "Blast injuries: primary (pressure), secondary (debris), tertiary (thrown), quaternary (burns)",
                "EMT response: scene safety, PPE, control zones, coordination with law enforcement"
            ],
            learningObjectives: [
                "Define terrorism and describe different types of terrorist threats",
                "Explain the THREAT response plan for active shooter events",
                "Identify the categories of weapons of mass destruction",
                "Describe the effects and treatment of chemical warfare agents",
                "Explain the characteristics and management of biological agents",
                "Discuss radiological and nuclear terrorism threats and response",
                "Identify the patterns of injuries from explosive devices",
                "Describe EMT response principles for suspected terrorist events"
            ],
            tags: ["terrorism", "WMD", "chemical agents", "biological agents", "radiological", "explosives", "disaster management"],
            isCompleted: false
        }
    ];
    console.log('Starting to seed remaining chapters...');
    for (const chapter of remainingChapters) {
        try {
            await db.insert(studyNotes).values(chapter);
            console.log(`✓ Added Chapter ${chapter.chapterNumber}: ${chapter.title}`);
        }
        catch (error) {
            console.error(`✗ Failed to add Chapter ${chapter.chapterNumber}:`, error);
        }
    }
    console.log('Finished seeding remaining chapters');
}
// Auto-execute when run directly
seedRemainingChapters()
    .then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
})
    .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});
