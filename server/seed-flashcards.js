import { db } from './db';
import { flashcards } from '../shared/schema';
// Comprehensive flashcard data for all 41 chapters
const flashcardData = [
    // Chapter 1: EMS Systems
    {
        chapterNumber: 1,
        cards: [
            {
                question: "What are the four levels of EMS certification according to the National EMS Scope of Practice Model?",
                answer: "Emergency Medical Responder (EMR), Emergency Medical Technician (EMT), Advanced Emergency Medical Technician (AEMT), and Paramedic",
                difficulty: "medium",
                category: "EMS Systems",
                tags: ["certification", "scope of practice", "levels"]
            },
            {
                question: "Define the difference between online and offline medical direction.",
                answer: "Online medical direction is real-time communication with a physician during patient care. Offline medical direction includes protocols, training, and standing orders that guide care without direct physician communication.",
                difficulty: "medium",
                category: "Medical Direction",
                tags: ["medical direction", "protocols", "physician oversight"]
            },
            {
                question: "What is the primary purpose of the Emergency Medical Services (EMS) system?",
                answer: "To provide emergency medical care and transportation to patients who are acutely ill or injured, bridging the gap between basic first aid and definitive hospital care.",
                difficulty: "easy",
                category: "EMS Systems",
                tags: ["purpose", "emergency care", "transportation"]
            },
            {
                question: "List the 14 components of an EMS system according to the EMS Agenda for the Future.",
                answer: "Integration of health services, EMS research, legislation and regulation, system finance, human resources, medical direction, education systems, public education, prevention, public access, communication systems, clinical care, information systems, and evaluation.",
                difficulty: "hard",
                category: "EMS Systems",
                tags: ["EMS Agenda", "components", "system structure"]
            },
            {
                question: "What is the significance of the Emergency Medical Services Systems Act of 1973?",
                answer: "It provided federal funding for EMS system development and established 15 required components for EMS systems, marking the beginning of organized EMS development in the United States.",
                difficulty: "medium",
                category: "EMS History",
                tags: ["legislation", "1973", "federal funding"]
            },
            {
                question: "Describe the role of the National Registry of Emergency Medical Technicians (NREMT).",
                answer: "NREMT provides national certification for EMTs and paramedics through standardized testing and maintains a national registry of certified personnel to ensure consistent standards across states.",
                difficulty: "medium",
                category: "Certification",
                tags: ["NREMT", "certification", "national standards"]
            },
            {
                question: "What is the difference between certification and licensure in EMS?",
                answer: "Certification is recognition of competency by a professional organization (like NREMT), while licensure is legal authorization to practice granted by a state or government agency.",
                difficulty: "medium",
                category: "Certification",
                tags: ["certification", "licensure", "legal authorization"]
            },
            {
                question: "Define quality improvement (QI) in EMS and its key components.",
                answer: "QI is a systematic approach to identify and correct deficiencies in patient care. Key components include data collection, analysis, feedback, education, and implementing corrective actions.",
                difficulty: "medium",
                category: "Quality Improvement",
                tags: ["quality improvement", "data analysis", "patient care"]
            },
            {
                question: "What is the purpose of EMS research and evidence-based practice?",
                answer: "To validate current practices, identify best practices, improve patient outcomes, and advance the EMS profession through scientific evidence and data-driven decision making.",
                difficulty: "medium",
                category: "Research",
                tags: ["research", "evidence-based practice", "patient outcomes"]
            },
            {
                question: "Describe the concept of 'system status management' in EMS.",
                answer: "A deployment strategy that positions ambulances based on anticipated call volume and response time requirements, optimizing resource allocation and response times.",
                difficulty: "hard",
                category: "System Management",
                tags: ["deployment", "response times", "resource allocation"]
            },
            {
                question: "What role does public education play in EMS systems?",
                answer: "Public education prevents injuries and illnesses, teaches bystander CPR and first aid, promotes proper use of EMS services, and creates awareness of injury prevention strategies.",
                difficulty: "easy",
                category: "Public Education",
                tags: ["prevention", "public education", "injury prevention"]
            },
            {
                question: "Define the term 'scope of practice' in EMS.",
                answer: "The range of duties and skills that an EMS provider is legally authorized and trained to perform, as defined by state regulations and medical direction.",
                difficulty: "easy",
                category: "Scope of Practice",
                tags: ["scope of practice", "legal authorization", "skills"]
            },
            {
                question: "What is the purpose of EMS protocols and standing orders?",
                answer: "Protocols provide step-by-step procedures for patient care, while standing orders allow EMTs to perform certain interventions without direct physician contact, ensuring consistent and appropriate care.",
                difficulty: "medium",
                category: "Protocols",
                tags: ["protocols", "standing orders", "patient care"]
            },
            {
                question: "Explain the concept of 'span of control' in EMS management.",
                answer: "The number of subordinates that a supervisor can effectively manage, typically 3-7 personnel, ensuring effective communication and coordination during emergency operations.",
                difficulty: "hard",
                category: "Management",
                tags: ["span of control", "supervision", "management"]
            },
            {
                question: "What is the significance of the National EMS Education Standards?",
                answer: "They provide standardized competencies and learning objectives for EMS education programs, ensuring consistent training quality and preparing providers for national certification.",
                difficulty: "medium",
                category: "Education",
                tags: ["education standards", "competencies", "training"]
            },
            {
                question: "Define 'medical oversight' and its two main categories.",
                answer: "Medical oversight is physician supervision of EMS care. The two categories are prospective (education and protocol development) and retrospective (quality improvement and case review).",
                difficulty: "medium",
                category: "Medical Oversight",
                tags: ["medical oversight", "physician supervision", "quality improvement"]
            },
            {
                question: "What is the purpose of EMS system integration with other healthcare providers?",
                answer: "To ensure seamless patient care transitions, reduce duplication of services, improve communication, and create a comprehensive healthcare network.",
                difficulty: "medium",
                category: "System Integration",
                tags: ["integration", "healthcare network", "patient care"]
            },
            {
                question: "Describe the role of emergency medical dispatch (EMD) in EMS systems.",
                answer: "EMD provides systematic call processing, priority dispatch, pre-arrival instructions to callers, and resource allocation based on call severity and nature.",
                difficulty: "medium",
                category: "Dispatch",
                tags: ["EMD", "dispatch", "priority dispatch"]
            },
            {
                question: "What is the purpose of EMS system evaluation and performance measurement?",
                answer: "To assess system effectiveness, identify improvement opportunities, measure compliance with standards, and demonstrate accountability to stakeholders.",
                difficulty: "medium",
                category: "Evaluation",
                tags: ["evaluation", "performance measurement", "accountability"]
            },
            {
                question: "Define 'tiered response' in EMS systems.",
                answer: "A system where different levels of care providers respond based on call severity, with basic life support units for routine calls and advanced life support for critical emergencies.",
                difficulty: "medium",
                category: "Response Systems",
                tags: ["tiered response", "BLS", "ALS"]
            },
            {
                question: "What is the significance of the Institute of Medicine's 'Emergency Medical Services: At the Crossroads' report?",
                answer: "It identified critical issues in EMS systems including fragmentation, lack of coordination, funding challenges, and the need for improved integration with healthcare systems.",
                difficulty: "hard",
                category: "EMS History",
                tags: ["IOM report", "crossroads", "system issues"]
            },
            {
                question: "Describe the concept of 'regionalization' in EMS.",
                answer: "Organizing EMS services on a regional basis to improve efficiency, reduce costs, standardize protocols, and ensure appropriate resource allocation across geographic areas.",
                difficulty: "medium",
                category: "Regionalization",
                tags: ["regionalization", "efficiency", "resource allocation"]
            },
            {
                question: "What role does technology play in modern EMS systems?",
                answer: "Technology improves communication, enables real-time data collection, supports clinical decision-making, enhances navigation and dispatching, and facilitates quality improvement efforts.",
                difficulty: "medium",
                category: "Technology",
                tags: ["technology", "communication", "data collection"]
            },
            {
                question: "Define the term 'primary service area' (PSA) in EMS.",
                answer: "The geographic area for which an EMS agency has primary responsibility for emergency response, typically defined by boundaries and response time requirements.",
                difficulty: "easy",
                category: "Service Areas",
                tags: ["primary service area", "geographic boundaries", "response"]
            },
            {
                question: "What is the purpose of mutual aid agreements in EMS?",
                answer: "To provide assistance during large-scale emergencies or when local resources are overwhelmed, ensuring continuous coverage and appropriate resource allocation.",
                difficulty: "easy",
                category: "Mutual Aid",
                tags: ["mutual aid", "emergency response", "resource sharing"]
            }
        ]
    },
    // Chapter 2: Workforce Safety and Wellness
    {
        chapterNumber: 2,
        cards: [
            {
                question: "What are the five stages of grief according to Elisabeth Kübler-Ross?",
                answer: "Denial, Anger, Bargaining, Depression, and Acceptance",
                difficulty: "medium",
                category: "Grief and Loss",
                tags: ["grief", "Kübler-Ross", "stages"]
            },
            {
                question: "Define Critical Incident Stress Management (CISM) and its components.",
                answer: "CISM is a comprehensive program designed to help emergency responders cope with traumatic events. Components include defusing, debriefing, one-on-one support, and follow-up services.",
                difficulty: "medium",
                category: "Stress Management",
                tags: ["CISM", "stress management", "trauma"]
            },
            {
                question: "What is the difference between stress and distress?",
                answer: "Stress is a normal physiological response to challenging situations that can be positive or negative. Distress is negative stress that overwhelms coping mechanisms and leads to physical or emotional problems.",
                difficulty: "medium",
                category: "Stress Response",
                tags: ["stress", "distress", "coping"]
            },
            {
                question: "List the warning signs of excessive stress in EMS providers.",
                answer: "Irritability, difficulty sleeping, loss of appetite, anxiety, depression, increased alcohol or drug use, physical symptoms (headaches, stomach problems), and relationship problems.",
                difficulty: "medium",
                category: "Stress Recognition",
                tags: ["stress signs", "warning signs", "physical symptoms"]
            },
            {
                question: "What is Post-Traumatic Stress Disorder (PTSD) and its key symptoms?",
                answer: "PTSD is a mental health condition triggered by experiencing or witnessing a traumatic event. Key symptoms include re-experiencing the event, avoidance behaviors, negative mood changes, and hyperarousal.",
                difficulty: "medium",
                category: "PTSD",
                tags: ["PTSD", "trauma", "symptoms"]
            },
            {
                question: "Describe the concept of 'wellness' in EMS and its components.",
                answer: "Wellness is a state of complete physical, mental, and social well-being. Components include physical fitness, proper nutrition, adequate sleep, stress management, and maintaining healthy relationships.",
                difficulty: "easy",
                category: "Wellness",
                tags: ["wellness", "physical fitness", "mental health"]
            },
            {
                question: "What is the purpose of Employee Assistance Programs (EAP) in EMS?",
                answer: "EAPs provide confidential counseling, referral services, and support for personal and work-related problems, helping employees maintain their mental health and job performance.",
                difficulty: "easy",
                category: "Employee Support",
                tags: ["EAP", "counseling", "support services"]
            },
            {
                question: "Define 'cumulative stress' and its impact on EMS providers.",
                answer: "Cumulative stress is the buildup of stress over time from repeated exposure to traumatic events and job pressures, leading to burnout, compassion fatigue, and decreased job performance.",
                difficulty: "medium",
                category: "Cumulative Stress",
                tags: ["cumulative stress", "burnout", "compassion fatigue"]
            },
            {
                question: "What are the physical effects of chronic stress on the body?",
                answer: "Chronic stress can cause cardiovascular disease, immune system suppression, digestive problems, sleep disorders, headaches, muscle tension, and increased risk of infections.",
                difficulty: "medium",
                category: "Physical Health",
                tags: ["chronic stress", "physical effects", "health impacts"]
            },
            {
                question: "Describe effective stress management techniques for EMS providers.",
                answer: "Regular exercise, adequate sleep, healthy diet, relaxation techniques, social support, professional counseling, hobbies, and maintaining work-life balance.",
                difficulty: "easy",
                category: "Stress Management",
                tags: ["stress management", "coping strategies", "self-care"]
            },
            {
                question: "What is the difference between a critical incident and a traumatic event?",
                answer: "A critical incident is any event that causes significant emotional distress and may overwhelm normal coping mechanisms. A traumatic event is a specific type of critical incident that involves threat to life or serious injury.",
                difficulty: "medium",
                category: "Critical Incidents",
                tags: ["critical incident", "traumatic event", "definitions"]
            },
            {
                question: "Define 'resilience' in the context of EMS work.",
                answer: "Resilience is the ability to adapt and bounce back from adversity, trauma, or significant stress while maintaining psychological well-being and job performance.",
                difficulty: "easy",
                category: "Resilience",
                tags: ["resilience", "adaptation", "psychological well-being"]
            },
            {
                question: "What is the purpose of peer support programs in EMS?",
                answer: "Peer support programs provide trained personnel who can offer emotional support, practical assistance, and referrals to colleagues experiencing stress or traumatic events.",
                difficulty: "easy",
                category: "Peer Support",
                tags: ["peer support", "emotional support", "referrals"]
            },
            {
                question: "Describe the physiological 'fight or flight' response.",
                answer: "The body's automatic response to perceived threats, involving release of stress hormones (adrenaline, cortisol), increased heart rate, elevated blood pressure, and enhanced alertness.",
                difficulty: "medium",
                category: "Stress Response",
                tags: ["fight or flight", "stress hormones", "physiological response"]
            },
            {
                question: "What factors contribute to job satisfaction in EMS?",
                answer: "Meaningful work, adequate compensation, supportive supervision, opportunities for advancement, work-life balance, proper equipment, and recognition for contributions.",
                difficulty: "easy",
                category: "Job Satisfaction",
                tags: ["job satisfaction", "work environment", "motivation"]
            },
            {
                question: "Define 'compassion fatigue' and its symptoms.",
                answer: "Compassion fatigue is emotional exhaustion resulting from caring for patients in distress. Symptoms include emotional numbness, cynicism, decreased empathy, and reduced job satisfaction.",
                difficulty: "medium",
                category: "Compassion Fatigue",
                tags: ["compassion fatigue", "emotional exhaustion", "empathy"]
            },
            {
                question: "What is the importance of sleep hygiene for EMS providers?",
                answer: "Good sleep hygiene improves alertness, decision-making, immune function, and emotional regulation while reducing the risk of accidents and health problems.",
                difficulty: "easy",
                category: "Sleep Hygiene",
                tags: ["sleep hygiene", "alertness", "health"]
            },
            {
                question: "Describe the concept of 'moral injury' in EMS.",
                answer: "Moral injury occurs when providers witness or participate in acts that violate their moral beliefs, leading to guilt, shame, and psychological distress.",
                difficulty: "hard",
                category: "Moral Injury",
                tags: ["moral injury", "moral beliefs", "psychological distress"]
            },
            {
                question: "What role does physical fitness play in EMS provider wellness?",
                answer: "Physical fitness improves job performance, reduces injury risk, enhances stress management, boosts immune function, and contributes to overall well-being.",
                difficulty: "easy",
                category: "Physical Fitness",
                tags: ["physical fitness", "job performance", "injury prevention"]
            },
            {
                question: "Define 'secondary traumatic stress' and its causes.",
                answer: "Secondary traumatic stress is emotional duress experienced by persons as a result of exposure to trauma of others, caused by hearing about or witnessing traumatic events.",
                difficulty: "medium",
                category: "Secondary Trauma",
                tags: ["secondary trauma", "emotional duress", "exposure"]
            },
            {
                question: "What is the significance of work-life balance for EMS providers?",
                answer: "Work-life balance helps prevent burnout, maintains relationships, promotes mental health, improves job performance, and ensures long-term career sustainability.",
                difficulty: "easy",
                category: "Work-Life Balance",
                tags: ["work-life balance", "burnout prevention", "relationships"]
            },
            {
                question: "Describe the impact of shift work on EMS provider health.",
                answer: "Shift work can cause sleep disorders, digestive problems, cardiovascular issues, mood disturbances, and increased risk of accidents and injuries.",
                difficulty: "medium",
                category: "Shift Work",
                tags: ["shift work", "sleep disorders", "health impacts"]
            },
            {
                question: "What is the purpose of debriefing after critical incidents?",
                answer: "Debriefing allows providers to process emotions, share experiences, receive support, identify lessons learned, and prevent long-term psychological effects.",
                difficulty: "easy",
                category: "Debriefing",
                tags: ["debriefing", "emotional processing", "support"]
            },
            {
                question: "Define 'burnout' and its three main components.",
                answer: "Burnout is a state of emotional, physical, and mental exhaustion. The three components are emotional exhaustion, depersonalization, and reduced personal accomplishment.",
                difficulty: "medium",
                category: "Burnout",
                tags: ["burnout", "exhaustion", "depersonalization"]
            },
            {
                question: "What strategies can EMS organizations implement to promote provider wellness?",
                answer: "Wellness programs, EAPs, peer support, adequate staffing, proper equipment, training, recognition programs, and creating a supportive work environment.",
                difficulty: "medium",
                category: "Organizational Wellness",
                tags: ["organizational wellness", "wellness programs", "support"]
            }
        ]
    },
    // Chapter 34: Obstetrics and Neonatal Care
    {
        chapterNumber: 34,
        cards: [
            {
                question: "What are the three stages of labor and their key characteristics?",
                answer: "First stage: onset of labor to full cervical dilation (10cm). Second stage: full dilation to delivery of baby. Third stage: delivery of baby to expulsion of placenta.",
                difficulty: "medium",
                category: "Labor and Delivery",
                tags: ["labor stages", "cervical dilation", "delivery"]
            },
            {
                question: "Define the APGAR scoring system and its five components.",
                answer: "APGAR assesses newborn condition at 1 and 5 minutes. Components: Appearance (skin color), Pulse (heart rate), Grimace (reflex irritability), Activity (muscle tone), Respiratory effort. Each scored 0-2.",
                difficulty: "medium",
                category: "Neonatal Assessment",
                tags: ["APGAR", "newborn assessment", "scoring"]
            },
            {
                question: "What is eclampsia and how should it be managed?",
                answer: "Eclampsia is seizures caused by severe hypertension in pregnancy. Management: position patient on left side, maintain airway, provide oxygen, suction if vomiting, rapid transport, call for ALS.",
                difficulty: "hard",
                category: "Pregnancy Complications",
                tags: ["eclampsia", "seizures", "hypertension"]
            },
            {
                question: "Describe the normal physiological changes in the cardiovascular system during pregnancy.",
                answer: "Blood volume increases up to 50%, heart rate increases up to 20%, cardiac output significantly increases, and speed of blood clotting increases.",
                difficulty: "medium",
                category: "Pregnancy Physiology",
                tags: ["cardiovascular changes", "blood volume", "cardiac output"]
            },
            {
                question: "What is supine hypotensive syndrome and how is it prevented?",
                answer: "Supine hypotensive syndrome occurs when the uterus compresses the aorta and vena cava in supine position. Prevention: transport pregnant patients on their left side.",
                difficulty: "medium",
                category: "Positioning",
                tags: ["supine hypotensive syndrome", "positioning", "compression"]
            },
            {
                question: "Define abruptio placentae and its risk factors.",
                answer: "Abruptio placentae is premature separation of the placenta from the uterine wall. Risk factors include hypertension, trauma, cocaine use, and previous history.",
                difficulty: "hard",
                category: "Pregnancy Complications",
                tags: ["abruptio placentae", "placental separation", "risk factors"]
            },
            {
                question: "What is the difference between placenta previa and abruptio placentae?",
                answer: "Placenta previa: placenta covers the cervical opening, typically painless bleeding. Abruptio placentae: placenta separates from uterine wall, often with severe abdominal pain and bleeding.",
                difficulty: "hard",
                category: "Pregnancy Complications",
                tags: ["placenta previa", "abruptio placentae", "bleeding"]
            },
            {
                question: "Describe the proper steps for normal delivery.",
                answer: "1. Control delivery of head 2. Check for nuchal cord 3. Suction mouth then nose 4. Deliver anterior shoulder 5. Deliver posterior shoulder 6. Support body during delivery 7. Clamp and cut cord",
                difficulty: "medium",
                category: "Normal Delivery",
                tags: ["delivery steps", "normal delivery", "cord clamping"]
            },
            {
                question: "What are the signs of imminent delivery?",
                answer: "Crowning (baby's head visible), strong regular contractions 2-3 minutes apart, mother feels urge to push, rupture of membranes, and mother states baby is coming.",
                difficulty: "easy",
                category: "Imminent Delivery",
                tags: ["crowning", "contractions", "delivery signs"]
            },
            {
                question: "Define gestational diabetes and its implications.",
                answer: "Gestational diabetes is diabetes that develops during the second half of pregnancy. It increases risk of large babies, delivery complications, and usually resolves after delivery.",
                difficulty: "medium",
                category: "Pregnancy Complications",
                tags: ["gestational diabetes", "blood sugar", "complications"]
            },
            {
                question: "What is a prolapsed umbilical cord and how should it be managed?",
                answer: "Prolapsed cord occurs when the umbilical cord presents before the baby. Management: position mother in knee-chest position, do not push cord back, keep cord moist, rapid transport.",
                difficulty: "hard",
                category: "Delivery Complications",
                tags: ["prolapsed cord", "emergency delivery", "positioning"]
            },
            {
                question: "Describe the immediate care of a newborn after delivery.",
                answer: "1. Dry and warm the baby 2. Position airway and suction if needed 3. Stimulate breathing 4. Assess breathing and heart rate 5. Provide warmth 6. APGAR scoring",
                difficulty: "medium",
                category: "Newborn Care",
                tags: ["newborn care", "drying", "warming"]
            },
            {
                question: "What is an ectopic pregnancy and its typical presentation?",
                answer: "Ectopic pregnancy occurs when fertilized egg implants outside the uterus (usually fallopian tube). Presentation: sudden severe abdominal pain, vaginal bleeding, and signs of shock.",
                difficulty: "medium",
                category: "Pregnancy Complications",
                tags: ["ectopic pregnancy", "abdominal pain", "bleeding"]
            },
            {
                question: "Define preeclampsia and its warning signs.",
                answer: "Preeclampsia is high blood pressure with systemic effects after 20 weeks. Signs: severe hypertension, persistent headache, visual disturbances, swelling, upper abdominal pain, anxiety.",
                difficulty: "medium",
                category: "Hypertensive Disorders",
                tags: ["preeclampsia", "hypertension", "warning signs"]
            },
            {
                question: "What is a breech presentation and its management?",
                answer: "Breech presentation is when baby's buttocks or feet present first. Management: do not pull on baby, support body as it delivers, allow head to deliver naturally, rapid transport.",
                difficulty: "hard",
                category: "Abnormal Presentations",
                tags: ["breech presentation", "delivery complications", "management"]
            },
            {
                question: "Describe the functions of the placenta during pregnancy.",
                answer: "The placenta provides oxygen and nutrients to fetus, removes waste products, produces hormones, and acts as a barrier while allowing exchange of substances between maternal and fetal circulation.",
                difficulty: "medium",
                category: "Pregnancy Anatomy",
                tags: ["placenta", "oxygen exchange", "nutrients"]
            },
            {
                question: "What is postpartum hemorrhage and its management?",
                answer: "Postpartum hemorrhage is excessive bleeding after delivery (>500ml). Management: uterine massage, position patient flat, control bleeding, IV fluids, rapid transport.",
                difficulty: "hard",
                category: "Postpartum Complications",
                tags: ["postpartum hemorrhage", "uterine massage", "bleeding control"]
            },
            {
                question: "Define spontaneous abortion and its types.",
                answer: "Spontaneous abortion is pregnancy loss before 20 weeks. Types include threatened, inevitable, incomplete, complete, and missed abortion. Management focuses on supportive care and transport.",
                difficulty: "medium",
                category: "Pregnancy Loss",
                tags: ["spontaneous abortion", "miscarriage", "types"]
            },
            {
                question: "What are the special considerations for trauma in pregnant patients?",
                answer: "Consider two patients (mother and fetus), increased fall risk, blood volume changes mask shock, fetal distress before maternal signs, vulnerability of uterus to trauma.",
                difficulty: "medium",
                category: "Pregnancy Trauma",
                tags: ["trauma", "two patients", "blood volume"]
            },
            {
                question: "Describe the umbilical cord and its components.",
                answer: "The umbilical cord contains two arteries (carry deoxygenated blood to placenta) and one vein (carries oxygenated blood to fetus), surrounded by Wharton's jelly for protection.",
                difficulty: "medium",
                category: "Pregnancy Anatomy",
                tags: ["umbilical cord", "arteries", "vein"]
            },
            {
                question: "What is the significance of fetal movement and its assessment?",
                answer: "Fetal movement indicates fetal well-being. Decreased movement may indicate fetal distress. Normal is 10 movements in 2 hours. Mother should monitor and report changes.",
                difficulty: "easy",
                category: "Fetal Assessment",
                tags: ["fetal movement", "fetal well-being", "assessment"]
            },
            {
                question: "Define multiple births and their delivery considerations.",
                answer: "Multiple births involve two or more babies. Considerations: anticipate complications, prepare for multiple resuscitations, deliver one baby at a time, clamp each cord separately.",
                difficulty: "hard",
                category: "Multiple Births",
                tags: ["multiple births", "twins", "delivery complications"]
            },
            {
                question: "What is the role of the amniotic sac and fluid?",
                answer: "The amniotic sac contains amniotic fluid (500-1000ml) that protects and cushions the fetus, maintains temperature, and allows fetal movement and development.",
                difficulty: "easy",
                category: "Pregnancy Anatomy",
                tags: ["amniotic sac", "amniotic fluid", "fetal protection"]
            },
            {
                question: "Describe the management of a newborn with meconium staining.",
                answer: "Meconium indicates fetal distress. If thick meconium and baby is not vigorous, suction trachea before stimulation. If thin meconium or vigorous baby, routine care.",
                difficulty: "hard",
                category: "Newborn Complications",
                tags: ["meconium", "fetal distress", "suctioning"]
            },
            {
                question: "What factors increase the risk of complications during pregnancy?",
                answer: "Advanced maternal age, multiple pregnancies, previous pregnancy complications, chronic medical conditions, substance abuse, inadequate prenatal care, and trauma.",
                difficulty: "medium",
                category: "Risk Factors",
                tags: ["risk factors", "complications", "maternal age"]
            }
        ]
    },
    // Chapter 35: Pediatric Emergencies
    {
        chapterNumber: 35,
        cards: [
            {
                question: "What are the five developmental stages of childhood and their age ranges?",
                answer: "Infancy (0-1 year), Toddler (1-3 years), Preschool (3-6 years), School age (6-12 years), Adolescence (13-18 years)",
                difficulty: "easy",
                category: "Developmental Stages",
                tags: ["developmental stages", "age ranges", "childhood"]
            },
            {
                question: "Describe the key anatomical differences in the pediatric respiratory system.",
                answer: "Smaller airway diameter, larger tongue relative to mouth, funnel-shaped upper airway, nose breathing, higher oxygen demand, diaphragmatic breathing, and less developed chest wall musculature.",
                difficulty: "medium",
                category: "Pediatric Anatomy",
                tags: ["respiratory system", "airway", "breathing"]
            },
            {
                question: "What are the normal vital sign ranges for a 2-year-old child?",
                answer: "Heart rate: 80-130 bpm, Respiratory rate: 20-30 breaths/min, Blood pressure: 80-100 systolic, Temperature: 98.6°F (37°C)",
                difficulty: "medium",
                category: "Vital Signs",
                tags: ["vital signs", "toddler", "normal ranges"]
            },
            {
                question: "Define the pediatric assessment triangle and its components.",
                answer: "The pediatric assessment triangle evaluates: Appearance (muscle tone, interactiveness, consolability, look/gaze, speech/cry), Work of breathing, and Circulation to skin.",
                difficulty: "medium",
                category: "Assessment",
                tags: ["assessment triangle", "appearance", "breathing"]
            },
            {
                question: "What is croup and how does it present?",
                answer: "Croup is viral upper airway inflammation causing characteristic barking cough, stridor, and respiratory distress. Often worse at night and improves with cool air.",
                difficulty: "medium",
                category: "Respiratory Emergencies",
                tags: ["croup", "barking cough", "stridor"]
            },
            {
                question: "Describe the management of suspected epiglottitis in children.",
                answer: "Keep child calm and comfortable, allow position of comfort, high-flow oxygen, avoid agitation, no oral examination, rapid transport, prepare for airway emergency.",
                difficulty: "hard",
                category: "Respiratory Emergencies",
                tags: ["epiglottitis", "airway emergency", "management"]
            },
            {
                question: "What are the signs of decompensated shock in children?",
                answer: "Hypotension, altered mental status, weak or absent pulses, delayed capillary refill >2 seconds, mottled skin, and decreased urine output.",
                difficulty: "hard",
                category: "Shock",
                tags: ["decompensated shock", "hypotension", "altered mental status"]
            },
            {
                question: "Define febrile seizures and their characteristics.",
                answer: "Febrile seizures occur in children 6 months to 6 years with fever. Usually brief (<15 minutes), generalized, and rarely cause permanent damage. Most common type of pediatric seizure.",
                difficulty: "medium",
                category: "Seizures",
                tags: ["febrile seizures", "fever", "generalized"]
            },
            {
                question: "What is bronchiolitis and its typical presentation?",
                answer: "Bronchiolitis is viral infection of small airways, most common in infants <2 years. Presents with wheezing, cough, rhinorrhea, and respiratory distress. Often caused by RSV.",
                difficulty: "medium",
                category: "Respiratory Emergencies",
                tags: ["bronchiolitis", "RSV", "wheezing"]
            },
            {
                question: "Describe the appropriate communication strategies for school-age children.",
                answer: "Talk directly to the child, provide simple explanations, allow them to ask questions, explain procedures, use age-appropriate language, and respect their modesty.",
                difficulty: "easy",
                category: "Communication",
                tags: ["communication", "school age", "explanations"]
            },
            {
                question: "What are the signs and symptoms of child abuse?",
                answer: "Unexplained injuries, inconsistent history, delayed seeking care, fear of parents, withdrawal, inappropriate behavior, poor hygiene, and injuries in various stages of healing.",
                difficulty: "medium",
                category: "Child Abuse",
                tags: ["child abuse", "signs", "injuries"]
            },
            {
                question: "Define SIDS and its risk factors.",
                answer: "Sudden Infant Death Syndrome is unexplained death of apparently healthy infant <1 year. Risk factors: prone sleeping, smoke exposure, overheating, prematurity, and male gender.",
                difficulty: "medium",
                category: "SIDS",
                tags: ["SIDS", "sudden death", "risk factors"]
            },
            {
                question: "What is the management of pediatric anaphylaxis?",
                answer: "Immediate epinephrine administration, airway management, high-flow oxygen, IV fluids, positioning, and rapid transport. Dose: 0.01 mg/kg up to 0.3 mg IM.",
                difficulty: "hard",
                category: "Anaphylaxis",
                tags: ["anaphylaxis", "epinephrine", "dose"]
            },
            {
                question: "Describe the JumpSTART triage system for pediatric patients.",
                answer: "JumpSTART modifies START for children: able to walk = minor, not walking assess breathing, if no breathing give 5 rescue breaths, then reassess. Evaluates breathing, circulation, and neurologic status.",
                difficulty: "hard",
                category: "Triage",
                tags: ["JumpSTART", "pediatric triage", "rescue breaths"]
            },
            {
                question: "What are the key differences in pediatric circulatory system?",
                answer: "Higher heart rates, smaller blood volume, better compensation for blood loss initially, rapid decompensation when overwhelmed, and different normal BP ranges by age.",
                difficulty: "medium",
                category: "Circulatory System",
                tags: ["circulation", "heart rate", "blood volume"]
            },
            {
                question: "Define apparent life-threatening events (ALTE) and their characteristics.",
                answer: "ALTE is an episode that frightens caregiver, characterized by apnea, color change, muscle tone change, or choking/gagging in previously healthy infant.",
                difficulty: "medium",
                category: "ALTE",
                tags: ["ALTE", "apnea", "color change"]
            },
            {
                question: "What is the appropriate bag-mask ventilation technique for infants?",
                answer: "Use appropriate-sized mask, seal over nose and mouth, ventilate 20 breaths/min, watch for chest rise, avoid excessive pressure, and maintain head in neutral position.",
                difficulty: "medium",
                category: "Airway Management",
                tags: ["bag-mask ventilation", "infant", "technique"]
            },
            {
                question: "Describe the signs of respiratory distress in children.",
                answer: "Increased work of breathing, nasal flaring, grunting, retractions, tripod positioning, decreased air entry, cyanosis, and altered mental status.",
                difficulty: "easy",
                category: "Respiratory Distress",
                tags: ["respiratory distress", "retractions", "nasal flaring"]
            },
            {
                question: "What are the causes of pediatric cardiopulmonary arrest?",
                answer: "Usually respiratory in origin: airway obstruction, respiratory failure, shock, trauma, drowning, poisoning, and SIDS. Cardiac causes are less common than in adults.",
                difficulty: "medium",
                category: "Cardiac Arrest",
                tags: ["cardiopulmonary arrest", "respiratory", "causes"]
            },
            {
                question: "Define the management of pediatric seizures.",
                answer: "Ensure safety, position on side, maintain airway, provide oxygen, don't restrain, note duration and characteristics, check glucose if able, and transport.",
                difficulty: "medium",
                category: "Seizures",
                tags: ["seizure management", "safety", "positioning"]
            },
            {
                question: "What is the significance of fontanelles in infant assessment?",
                answer: "Fontanelles are soft spots in infant skull. Bulging may indicate increased intracranial pressure, while sunken may indicate dehydration. Normal closure: anterior 12-18 months, posterior 6-8 months.",
                difficulty: "medium",
                category: "Infant Assessment",
                tags: ["fontanelles", "intracranial pressure", "dehydration"]
            },
            {
                question: "Describe the approach to communicating with adolescents.",
                answer: "Treat with respect, allow privacy, involve in decision-making, be honest, maintain confidentiality when appropriate, and address their concerns directly.",
                difficulty: "easy",
                category: "Communication",
                tags: ["adolescent", "communication", "privacy"]
            },
            {
                question: "What are the special considerations for pediatric medication dosing?",
                answer: "Weight-based dosing, smaller volumes, different concentrations, careful calculation, double-check doses, and consider routes (IO, rectal) if IV access difficult.",
                difficulty: "medium",
                category: "Medication",
                tags: ["pediatric dosing", "weight-based", "calculations"]
            },
            {
                question: "Define gastroenteritis and its complications in children.",
                answer: "Gastroenteritis is inflammation of stomach and intestines causing vomiting and diarrhea. Complications include dehydration, electrolyte imbalances, and shock.",
                difficulty: "easy",
                category: "Gastrointestinal",
                tags: ["gastroenteritis", "dehydration", "vomiting"]
            },
            {
                question: "What is the proper technique for obtaining pediatric vital signs?",
                answer: "Use age-appropriate equipment, obtain respirations first (before disturbing child), use appropriate BP cuff size, palpate pulse appropriate for age, and consider normal ranges.",
                difficulty: "medium",
                category: "Vital Signs",
                tags: ["vital signs", "technique", "age-appropriate"]
            }
        ]
    },
    // Chapter 36: Geriatric Emergencies
    {
        chapterNumber: 36,
        cards: [
            {
                question: "What is the GEMS diamond and its four components?",
                answer: "GEMS stands for Geriatric patients, Environmental assessment, Medical assessment, and Social assessment. It's a framework for comprehensive geriatric patient evaluation.",
                difficulty: "medium",
                category: "Assessment Framework",
                tags: ["GEMS", "geriatric assessment", "framework"]
            },
            {
                question: "Describe the age-related changes in the cardiovascular system.",
                answer: "Heart hypertrophy, decreased cardiac output, arteriosclerosis, stiff blood vessels, higher systolic BP, valve degeneration, and electrical conduction system changes.",
                difficulty: "medium",
                category: "Cardiovascular Changes",
                tags: ["cardiovascular", "aging", "cardiac output"]
            },
            {
                question: "What are the atypical presentations of myocardial infarction in older adults?",
                answer: "Silent MI (no chest pain), epigastric pain, nausea/vomiting, weakness, dizziness, syncope, confusion, and shortness of breath without chest pain.",
                difficulty: "hard",
                category: "Atypical Presentations",
                tags: ["myocardial infarction", "atypical", "silent MI"]
            },
            {
                question: "Define polypharmacy and its implications for geriatric patients.",
                answer: "Polypharmacy is the use of multiple medications (typically 5+ drugs). Implications include increased adverse drug reactions, drug interactions, and compliance issues.",
                difficulty: "medium",
                category: "Polypharmacy",
                tags: ["polypharmacy", "drug interactions", "adverse reactions"]
            },
            {
                question: "What are the age-related changes in the respiratory system?",
                answer: "Weakened airway muscles, enlarged alveoli, decreased elasticity, slower chemoreceptor response, decreased cough and gag reflexes, and increased infection risk.",
                difficulty: "medium",
                category: "Respiratory Changes",
                tags: ["respiratory", "aging", "alveoli"]
            },
            {
                question: "Describe the difference between delirium and dementia.",
                answer: "Delirium: acute, reversible confusion with fluctuating level of consciousness. Dementia: chronic, progressive cognitive decline with memory loss and impaired judgment.",
                difficulty: "hard",
                category: "Cognitive Changes",
                tags: ["delirium", "dementia", "confusion"]
            },
            {
                question: "What is orthostatic hypotension and its significance in older adults?",
                answer: "Orthostatic hypotension is a drop in BP >20 systolic or >10 diastolic upon standing. Increases fall risk and may indicate dehydration or medication effects.",
                difficulty: "medium",
                category: "Orthostatic Hypotension",
                tags: ["orthostatic hypotension", "falls", "blood pressure"]
            },
            {
                question: "Define the leading causes of death in older adults.",
                answer: "Heart disease, cancer, chronic lower respiratory disease, stroke, Alzheimer's disease, diabetes, accidents/falls, influenza/pneumonia, and kidney disease.",
                difficulty: "easy",
                category: "Leading Causes",
                tags: ["leading causes", "death", "statistics"]
            },
            {
                question: "What are the risk factors for falls in older adults?",
                answer: "Medication effects, vision problems, balance issues, muscle weakness, environmental hazards, previous falls, chronic conditions, and cognitive impairment.",
                difficulty: "easy",
                category: "Falls",
                tags: ["falls", "risk factors", "prevention"]
            },
            {
                question: "Describe the age-related changes in the nervous system.",
                answer: "Decreased brain weight, slower reflexes, altered sleep patterns, decreased neurotransmitters, slower processing speed, and increased stroke risk.",
                difficulty: "medium",
                category: "Nervous System",
                tags: ["nervous system", "aging", "brain changes"]
            },
            {
                question: "What is the significance of hip fractures in older adults?",
                answer: "Hip fractures often result from low-energy falls, have high morbidity and mortality, may prevent return to previous function, and increase risk of complications.",
                difficulty: "medium",
                category: "Hip Fractures",
                tags: ["hip fractures", "mortality", "complications"]
            },
            {
                question: "Define elder abuse and its types.",
                answer: "Elder abuse is mistreatment of older adults. Types include physical, emotional, sexual, financial, and neglect. Also includes self-neglect and abandonment.",
                difficulty: "medium",
                category: "Elder Abuse",
                tags: ["elder abuse", "types", "mistreatment"]
            },
            {
                question: "What are the signs of elder abuse?",
                answer: "Unexplained injuries, poor hygiene, malnutrition, dehydration, fear of caregiver, inappropriate clothing, bedsores, and financial exploitation signs.",
                difficulty: "medium",
                category: "Elder Abuse",
                tags: ["elder abuse", "signs", "recognition"]
            },
            {
                question: "Describe the age-related changes in the gastrointestinal system.",
                answer: "Decreased gastric acid production, slower gastric emptying, decreased liver function, reduced metabolism, and increased constipation risk.",
                difficulty: "medium",
                category: "Gastrointestinal",
                tags: ["gastrointestinal", "aging", "metabolism"]
            },
            {
                question: "What is the proper communication approach for older adults?",
                answer: "Speak slowly and clearly, face the patient, use good lighting, avoid shouting, allow time to respond, explain procedures, and treat with respect.",
                difficulty: "easy",
                category: "Communication",
                tags: ["communication", "respect", "clarity"]
            },
            {
                question: "Define the age-related changes in the endocrine system.",
                answer: "Decreased insulin sensitivity, altered glucose metabolism, reduced thyroid function, and decreased temperature regulation ability.",
                difficulty: "medium",
                category: "Endocrine Changes",
                tags: ["endocrine", "insulin", "glucose"]
            },
            {
                question: "What are the complications of chronic conditions in older adults?",
                answer: "Multiple comorbidities, polypharmacy, functional decline, increased healthcare utilization, and complex medication regimens.",
                difficulty: "medium",
                category: "Chronic Conditions",
                tags: ["chronic conditions", "comorbidities", "complications"]
            },
            {
                question: "Describe the age-related changes in the immune system.",
                answer: "Decreased immune response, increased infection susceptibility, slower wound healing, reduced vaccine effectiveness, and increased autoimmune disease risk.",
                difficulty: "medium",
                category: "Immune System",
                tags: ["immune system", "infections", "healing"]
            },
            {
                question: "What is the significance of medication compliance in older adults?",
                answer: "Poor compliance leads to treatment failure, worsened conditions, hospitalizations, and increased mortality. Factors include cost, complexity, and cognitive issues.",
                difficulty: "medium",
                category: "Medication Compliance",
                tags: ["compliance", "medication", "barriers"]
            },
            {
                question: "Define the concept of frailty in older adults.",
                answer: "Frailty is a state of decreased physiologic reserve and increased vulnerability to stressors, leading to increased risk of adverse outcomes.",
                difficulty: "hard",
                category: "Frailty",
                tags: ["frailty", "vulnerability", "physiologic reserve"]
            },
            {
                question: "What are the environmental factors that affect older adults?",
                answer: "Temperature extremes, medication storage, home safety hazards, accessibility issues, social isolation, and financial constraints.",
                difficulty: "easy",
                category: "Environmental Factors",
                tags: ["environment", "safety", "temperature"]
            },
            {
                question: "Describe the approach to pain assessment in older adults.",
                answer: "Use appropriate pain scales, consider cognitive status, observe behavioral cues, ask about pain regularly, and don't assume pain is normal with aging.",
                difficulty: "medium",
                category: "Pain Assessment",
                tags: ["pain assessment", "pain scales", "behavioral cues"]
            },
            {
                question: "What is the impact of social isolation on older adults?",
                answer: "Social isolation increases depression, cognitive decline, poor self-care, delayed help-seeking, and increased mortality risk.",
                difficulty: "medium",
                category: "Social Isolation",
                tags: ["social isolation", "depression", "mortality"]
            },
            {
                question: "Define the age-related changes in the musculoskeletal system.",
                answer: "Decreased muscle mass, bone density loss, joint stiffness, reduced flexibility, increased fracture risk, and slower mobility.",
                difficulty: "easy",
                category: "Musculoskeletal",
                tags: ["musculoskeletal", "bone density", "mobility"]
            },
            {
                question: "What are the special considerations for medication administration in older adults?",
                answer: "Start with lower doses, monitor for adverse effects, consider drug interactions, assess compliance, and adjust for renal/hepatic function.",
                difficulty: "medium",
                category: "Medication Administration",
                tags: ["medication", "dosing", "adverse effects"]
            }
        ]
    },
    // Chapter 37: Special Challenges
    {
        chapterNumber: 37,
        cards: [
            {
                question: "What are the key considerations when caring for patients with autism spectrum disorder?",
                answer: "Keep environment calm, minimize stimulation, use simple phrases, allow extra processing time, demonstrate on trusted person, and maintain routine when possible.",
                difficulty: "medium",
                category: "Developmental Disabilities",
                tags: ["autism", "sensory", "communication"]
            },
            {
                question: "Describe the special airway considerations for patients with Down syndrome.",
                answer: "Large protruding tongue, small oral cavity, increased difficulty with intubation, may need jaw thrust or nasopharyngeal airway, and 15% have upper spine instability.",
                difficulty: "hard",
                category: "Down Syndrome",
                tags: ["Down syndrome", "airway", "intubation"]
            },
            {
                question: "What are the communication strategies for patients with hearing impairment?",
                answer: "Face the patient, use good lighting, don't exaggerate lip movements, lower pitch instead of speaking louder, consider ASL or writing, and assist with hearing aids.",
                difficulty: "medium",
                category: "Hearing Impairment",
                tags: ["hearing impairment", "communication", "lip reading"]
            },
            {
                question: "Define the special considerations for bariatric patients.",
                answer: "Plan for extra help, find safe exit routes, coordinate lifts, avoid single-limb lifting, look for pressure points, position for breathing, and notify receiving hospital.",
                difficulty: "medium",
                category: "Bariatric Patients",
                tags: ["bariatric", "lifting", "safety"]
            },
            {
                question: "What is a tracheostomy and its potential complications?",
                answer: "Tracheostomy is surgical airway opening in the neck. Complications include obstruction by mucus, dislodgement, infection, and bleeding around the stoma.",
                difficulty: "medium",
                category: "Medical Technology",
                tags: ["tracheostomy", "airway", "complications"]
            },
            {
                question: "Describe the care considerations for patients with cerebral palsy.",
                answer: "Observe airway closely, don't assume intellectual disability, pad for comfort, never force extremities, take assistive devices, and prepare for seizures.",
                difficulty: "medium",
                category: "Physical Disabilities",
                tags: ["cerebral palsy", "airway", "positioning"]
            },
            {
                question: "What are the communication strategies for patients with visual impairment?",
                answer: "Announce yourself, describe surroundings, identify noises, guide with light touch, take canes/walkers, allow service animals, and communicate obstacles.",
                difficulty: "easy",
                category: "Visual Impairment",
                tags: ["visual impairment", "guidance", "service animals"]
            },
            {
                question: "Define spina bifida and its associated conditions.",
                answer: "Spina bifida is incomplete spinal column closure causing neurologic damage. Associated conditions include hydrocephalus, lower extremity paralysis, and bowel/bladder dysfunction.",
                difficulty: "medium",
                category: "Spina Bifida",
                tags: ["spina bifida", "hydrocephalus", "paralysis"]
            },
            {
                question: "What are the special considerations for patients with mechanical ventilators?",
                answer: "Understand ventilator settings, have backup power, know alarm meanings, maintain circuit integrity, and prepare for transport ventilator or bag-valve ventilation.",
                difficulty: "hard",
                category: "Mechanical Ventilation",
                tags: ["ventilator", "settings", "backup"]
            },
            {
                question: "Describe the care of patients with gastrostomy tubes.",
                answer: "Gastrostomy tubes provide nutrition directly to stomach. Complications include dislodgement, blockage, infection, and leakage. Don't replace if dislodged.",
                difficulty: "medium",
                category: "Feeding Tubes",
                tags: ["gastrostomy", "nutrition", "complications"]
            },
            {
                question: "What is the proper approach to patients with colostomy or ileostomy?",
                answer: "Understand it's normal for patient, check bag security, assess stoma color, be aware of fluid/electrolyte issues, and maintain patient dignity.",
                difficulty: "medium",
                category: "Ostomies",
                tags: ["colostomy", "ileostomy", "dignity"]
            },
            {
                question: "Define the characteristics of intellectual disability.",
                answer: "Intellectual disability involves limitations in intellectual functioning and adaptive behavior, diagnosed before age 18. Patients are susceptible to same diseases as others.",
                difficulty: "easy",
                category: "Intellectual Disability",
                tags: ["intellectual disability", "adaptive behavior", "limitations"]
            },
            {
                question: "What are the considerations for patients with implanted cardiac devices?",
                answer: "Understand device type, be aware of electromagnetic interference, know signs of malfunction, avoid magnets, and consider device interrogation needs.",
                difficulty: "hard",
                category: "Cardiac Devices",
                tags: ["pacemaker", "electromagnetic", "malfunction"]
            },
            {
                question: "Describe the management of patients with paralysis.",
                answer: "Ask caregivers about best transfer methods, be aware of specialized equipment, watch for swallowing difficulties, maintain dignity, and prevent pressure sores.",
                difficulty: "medium",
                category: "Paralysis",
                tags: ["paralysis", "transfer", "pressure sores"]
            },
            {
                question: "What are the special considerations for patients with apnea monitors?",
                answer: "Apnea monitors detect breathing cessation. Understand alarm meanings, know battery life, maintain electrode contact, and be prepared for respiratory emergency.",
                difficulty: "medium",
                category: "Apnea Monitors",
                tags: ["apnea monitor", "breathing", "alarms"]
            },
            {
                question: "Define the challenges of caring for home care patients.",
                answer: "Home care patients may have complex medical needs, multiple devices, medication regimens, and family caregivers who are valuable information sources.",
                difficulty: "easy",
                category: "Home Care",
                tags: ["home care", "complex needs", "family caregivers"]
            },
            {
                question: "What is the proper technique for suctioning a tracheostomy?",
                answer: "Use sterile technique, pre-oxygenate, insert catheter without suction, apply suction while withdrawing, limit to 10-15 seconds, and allow recovery time.",
                difficulty: "hard",
                category: "Tracheostomy Care",
                tags: ["tracheostomy", "suctioning", "sterile technique"]
            },
            {
                question: "Describe the assessment of patients with chronic pain.",
                answer: "Understand pain is subjective, use appropriate pain scales, consider functional impact, be aware of medication tolerance, and avoid judgment.",
                difficulty: "medium",
                category: "Chronic Pain",
                tags: ["chronic pain", "assessment", "subjective"]
            },
            {
                question: "What are the considerations for patients with medication pumps?",
                answer: "Understand pump function, know medication being delivered, be aware of battery life, avoid interfering with settings, and transport pump with patient.",
                difficulty: "hard",
                category: "Medication Pumps",
                tags: ["medication pump", "function", "battery"]
            },
            {
                question: "Define the approach to patients with developmental delays.",
                answer: "Use age-appropriate communication, allow extra time, involve caregivers, explain procedures simply, and maintain patience and respect.",
                difficulty: "easy",
                category: "Developmental Delays",
                tags: ["developmental delays", "communication", "patience"]
            },
            {
                question: "What are the special considerations for patients with COPD on home oxygen?",
                answer: "Understand oxygen dependence, know flow rates, be aware of fire hazards, check equipment function, and maintain oxygen during transport.",
                difficulty: "medium",
                category: "Home Oxygen",
                tags: ["home oxygen", "COPD", "fire hazards"]
            },
            {
                question: "Describe the management of patients with central venous access devices.",
                answer: "Understand device type, use sterile technique, be aware of infection risk, know signs of complications, and avoid blood pressure cuffs on access arm.",
                difficulty: "hard",
                category: "Venous Access",
                tags: ["central venous", "sterile technique", "infection"]
            },
            {
                question: "What is the proper approach to patients with mental health conditions?",
                answer: "Treat with respect, use non-judgmental approach, ensure safety, communicate clearly, involve patient in decisions, and be aware of medication effects.",
                difficulty: "medium",
                category: "Mental Health",
                tags: ["mental health", "respect", "non-judgmental"]
            },
            {
                question: "Define the challenges of caring for technology-dependent patients.",
                answer: "Technology-dependent patients rely on devices for basic functions. Challenges include device failure, power issues, caregiver stress, and complex medical needs.",
                difficulty: "medium",
                category: "Technology Dependence",
                tags: ["technology dependent", "device failure", "complex needs"]
            },
            {
                question: "What are the considerations for patients with speech impairments?",
                answer: "Allow extra time, use alternative communication methods, don't assume cognitive impairment, involve caregivers, and maintain patience and respect.",
                difficulty: "easy",
                category: "Speech Impairments",
                tags: ["speech impairment", "communication", "alternative methods"]
            }
        ]
    },
    // Chapter 38: Transport Operations
    {
        chapterNumber: 38,
        cards: [
            {
                question: "What are the nine phases of an ambulance call?",
                answer: "1. Preparation 2. Dispatch 3. En route to scene 4. Arrival at scene 5. Patient transfer 6. En route to facility 7. Arrival at facility 8. En route to station 9. Post-run",
                difficulty: "medium",
                category: "Ambulance Operations",
                tags: ["nine phases", "ambulance call", "operations"]
            },
            {
                question: "Describe the proper ambulance positioning at a crash scene.",
                answer: "Park 100 feet before or past the crash, create a barrier, park uphill and upwind of hazards, don't park alongside scene, and leave warning lights on.",
                difficulty: "medium",
                category: "Scene Safety",
                tags: ["positioning", "crash scene", "safety"]
            },
            {
                question: "What are the key components of daily ambulance inspection?",
                answer: "Check fuel, oil, fluids, tires, lights, communication equipment, medical supplies, safety equipment, and test all systems for proper function.",
                difficulty: "easy",
                category: "Vehicle Inspection",
                tags: ["daily inspection", "maintenance", "equipment"]
            },
            {
                question: "Define the proper patient monitoring frequencies during transport.",
                answer: "Monitor stable patients every 15 minutes, unstable patients every 5 minutes, and continuously observe critical patients with ongoing reassessment.",
                difficulty: "medium",
                category: "Patient Monitoring",
                tags: ["monitoring", "frequency", "assessment"]
            },
            {
                question: "What are the characteristics of safe emergency vehicle operation?",
                answer: "Exercise due regard, maintain situational awareness, use defensive driving, adjust speed for conditions, and prioritize safety over speed.",
                difficulty: "medium",
                category: "Emergency Driving",
                tags: ["due regard", "defensive driving", "safety"]
            },
            {
                question: "Describe the proper use of emergency warning devices.",
                answer: "Use sirens judiciously, be aware they may not be heard, use visual warnings appropriately, and understand that warnings don't guarantee right of way.",
                difficulty: "medium",
                category: "Warning Devices",
                tags: ["sirens", "warnings", "right of way"]
            },
            {
                question: "What factors affect ambulance stopping distance?",
                answer: "Vehicle weight, speed, road conditions, weather, tire condition, brake condition, and driver reaction time all affect stopping distance.",
                difficulty: "medium",
                category: "Vehicle Dynamics",
                tags: ["stopping distance", "factors", "safety"]
            },
            {
                question: "Define the concept of 'due regard' in emergency vehicle operations.",
                answer: "Due regard means driving with consideration for safety of all road users while exercising emergency vehicle privileges, not driving recklessly despite emergency status.",
                difficulty: "hard",
                category: "Legal Concepts",
                tags: ["due regard", "legal", "safety"]
            },
            {
                question: "What are the indications for air medical transport?",
                answer: "Time-critical patients, inaccessible locations, need for specialized care, traffic/distance factors, and clinical conditions requiring rapid transport to appropriate facility.",
                difficulty: "medium",
                category: "Air Medical",
                tags: ["air medical", "indications", "transport"]
            },
            {
                question: "Describe the requirements for helicopter landing zones.",
                answer: "100x100 foot area, firm level surface, clear of obstacles, minimal slope, no debris, and consider wind direction and rotor wash effects.",
                difficulty: "hard",
                category: "Landing Zones",
                tags: ["helicopter", "landing zone", "requirements"]
            },
            {
                question: "What are the common hazards in emergency vehicle operations?",
                answer: "Intersection accidents, backing incidents, multiple vehicle responses, driver fatigue, distractions, weather conditions, and excessive speed.",
                difficulty: "easy",
                category: "Hazards",
                tags: ["hazards", "accidents", "safety"]
            },
            {
                question: "Define the proper patient securing techniques during transport.",
                answer: "Use at least three body straps, apply deceleration straps over shoulders, secure patient to stretcher, secure stretcher to ambulance, and ensure all are properly fastened.",
                difficulty: "medium",
                category: "Patient Security",
                tags: ["patient securing", "straps", "transport"]
            },
            {
                question: "What is the purpose of staging in multi-unit responses?",
                answer: "Staging prevents scene congestion, maintains resource availability, provides organized response, and ensures units are available when needed.",
                difficulty: "easy",
                category: "Staging",
                tags: ["staging", "multi-unit", "organization"]
            },
            {
                question: "Describe the communication requirements during transport.",
                answer: "Notify dispatch of departure, provide patient update to receiving facility, maintain radio contact, and report any changes in patient condition.",
                difficulty: "easy",
                category: "Communication",
                tags: ["communication", "transport", "radio"]
            },
            {
                question: "What are the factors that affect ambulance response times?",
                answer: "Traffic conditions, distance, weather, road conditions, time of day, vehicle availability, and dispatch efficiency all affect response times.",
                difficulty: "easy",
                category: "Response Times",
                tags: ["response times", "factors", "efficiency"]
            },
            {
                question: "Define the concept of 'defensive driving' in EMS.",
                answer: "Defensive driving involves anticipating hazards, maintaining safe following distances, scanning for threats, and adjusting driving to conditions and traffic.",
                difficulty: "medium",
                category: "Defensive Driving",
                tags: ["defensive driving", "anticipation", "safety"]
            },
            {
                question: "What are the post-run activities for ambulance operations?",
                answer: "Restock supplies, clean and disinfect equipment, fuel vehicle, complete documentation, report problems, and prepare for next call.",
                difficulty: "easy",
                category: "Post-Run",
                tags: ["post-run", "restocking", "cleaning"]
            },
            {
                question: "Describe the proper approach to intersections during emergency response.",
                answer: "Come to complete stop, ensure all traffic has yielded, proceed with caution, make eye contact with drivers, and use visual and audible warnings.",
                difficulty: "medium",
                category: "Intersection Safety",
                tags: ["intersections", "emergency response", "safety"]
            },
            {
                question: "What is the significance of ambulance design standards?",
                answer: "Standards ensure safety, functionality, equipment compatibility, and consistent design across manufacturers while meeting operational requirements.",
                difficulty: "medium",
                category: "Design Standards",
                tags: ["design standards", "safety", "functionality"]
            },
            {
                question: "Define the role of GPS and navigation systems in EMS.",
                answer: "GPS provides routing assistance, reduces response times, helps with unfamiliar locations, and should be supplemented with traditional map knowledge.",
                difficulty: "easy",
                category: "Navigation",
                tags: ["GPS", "navigation", "routing"]
            },
            {
                question: "What are the considerations for ambulance operations in adverse weather?",
                answer: "Reduce speed, increase following distance, use appropriate warnings, check tire conditions, avoid sudden maneuvers, and consider alternate routes.",
                difficulty: "medium",
                category: "Weather Operations",
                tags: ["weather", "adverse conditions", "safety"]
            },
            {
                question: "Describe the proper technique for backing an ambulance.",
                answer: "Use spotter when possible, check mirrors continuously, go slowly, use warning devices, and avoid backing when possible by planning ahead.",
                difficulty: "medium",
                category: "Backing Safety",
                tags: ["backing", "spotter", "safety"]
            },
            {
                question: "What is the purpose of jump kits in ambulance operations?",
                answer: "Jump kits contain essential equipment for first 5 minutes of patient care, allowing rapid deployment and initial treatment while additional equipment is retrieved.",
                difficulty: "easy",
                category: "Jump Kits",
                tags: ["jump kit", "equipment", "rapid deployment"]
            },
            {
                question: "Define the safety considerations for air medical operations.",
                answer: "Rotor wash hazards, approach/departure routes, communication with flight crew, landing zone security, and understanding aircraft limitations.",
                difficulty: "hard",
                category: "Air Medical Safety",
                tags: ["air medical", "rotor wash", "safety"]
            },
            {
                question: "What are the principles of safe patient compartment operations?",
                answer: "Secure all equipment, use seat belts, maintain communication with driver, avoid standing during transport, and ensure patient is properly secured.",
                difficulty: "medium",
                category: "Patient Compartment",
                tags: ["patient compartment", "safety", "equipment"]
            }
        ]
    },
    // Chapter 39: Vehicle Extrication and Special Rescue
    {
        chapterNumber: 39,
        cards: [
            {
                question: "What are the 10 phases of vehicle extrication?",
                answer: "1. Preparation 2. En route 3. Arrival and size-up 4. Hazard control 5. Support operations 6. Gaining access 7. Emergency care 8. Patient removal 9. Transfer 10. Termination",
                difficulty: "hard",
                category: "Extrication Phases",
                tags: ["10 phases", "extrication", "process"]
            },
            {
                question: "Describe the safety considerations for vehicle airbags.",
                answer: "Maintain clearance distances: 5 inches for side-impact, 10 inches for driver-side, 20 inches for passenger-side. Non-deployed airbags may inflate spontaneously.",
                difficulty: "medium",
                category: "Airbag Safety",
                tags: ["airbags", "clearance", "safety"]
            },
            {
                question: "What are the hazards associated with alternative fuel vehicles?",
                answer: "High voltage systems, different battery locations, toxic fumes, fire/explosion risk, and need to disconnect power sources. Avoid orange high-voltage cables.",
                difficulty: "hard",
                category: "Alternative Fuels",
                tags: ["hybrid vehicles", "high voltage", "hazards"]
            },
            {
                question: "Define the difference between simple and complex access.",
                answer: "Simple access: trying to reach patient without tools, using doors/windows. Complex access: requires special tools, cutting equipment, and trained personnel.",
                difficulty: "medium",
                category: "Access Techniques",
                tags: ["simple access", "complex access", "tools"]
            },
            {
                question: "What is the primary role of EMS providers during extrication?",
                answer: "Provide emergency medical care, prevent further injury, assess patient condition, assist with immobilization, and coordinate with rescue team for patient removal.",
                difficulty: "easy",
                category: "EMS Role",
                tags: ["EMS role", "medical care", "coordination"]
            },
            {
                question: "Describe the hazards of compressed shock-absorbing bumpers.",
                answer: "Compressed bumpers may release suddenly with significant force, causing injury. Approach vehicles from the side to avoid being in the path of potential release.",
                difficulty: "medium",
                category: "Vehicle Hazards",
                tags: ["bumpers", "compressed", "approach"]
            },
            {
                question: "What are the key principles of scene safety during extrication?",
                answer: "Personal safety first, scene stabilization, hazard identification and control, proper PPE use, and coordination with other agencies.",
                difficulty: "easy",
                category: "Scene Safety",
                tags: ["scene safety", "PPE", "coordination"]
            },
            {
                question: "Define entrapment and its implications for patient care.",
                answer: "Entrapment occurs when patient is caught with no way out or has body part trapped. Requires prolonged care, emotional support, and specialized rescue techniques.",
                difficulty: "medium",
                category: "Entrapment",
                tags: ["entrapment", "patient care", "rescue"]
            },
            {
                question: "What is the purpose of vehicle stabilization during extrication?",
                answer: "Prevent vehicle movement, protect rescuers and patients, create stable work platform, and ensure safety during cutting operations.",
                difficulty: "easy",
                category: "Vehicle Stabilization",
                tags: ["stabilization", "safety", "work platform"]
            },
            {
                question: "Describe the considerations for rapid extrication.",
                answer: "Used for life-threatening situations, requires experienced personnel, can be done in under one minute, but may increase risk of spinal injury.",
                difficulty: "hard",
                category: "Rapid Extrication",
                tags: ["rapid extrication", "life-threatening", "spinal injury"]
            },
            {
                question: "What are the types of specialized rescue operations?",
                answer: "Technical rescue, confined space, trench rescue, high-angle rescue, water rescue, wilderness rescue, and tactical EMS operations.",
                difficulty: "medium",
                category: "Specialized Rescue",
                tags: ["specialized rescue", "types", "technical"]
            },
            {
                question: "Define the concept of 'creating space' in vehicle extrication.",
                answer: "Creating space involves removing or displacing vehicle components to provide access to patient and room for medical care and removal.",
                difficulty: "medium",
                category: "Creating Space",
                tags: ["creating space", "access", "removal"]
            },
            {
                question: "What are the considerations for patient care during extrication?",
                answer: "Maintain spinal immobilization, protect from debris, provide emotional support, monitor vital signs, and coordinate with rescue team.",
                difficulty: "medium",
                category: "Patient Care",
                tags: ["patient care", "spinal immobilization", "monitoring"]
            },
            {
                question: "Describe the role of incident command in extrication operations.",
                answer: "Coordinates multiple agencies, assigns roles, ensures safety, manages resources, and provides overall direction for complex operations.",
                difficulty: "medium",
                category: "Incident Command",
                tags: ["incident command", "coordination", "safety"]
            },
            {
                question: "What is the significance of glass removal in vehicle extrication?",
                answer: "Glass removal provides access, prevents injury from sharp edges, allows tool operation, and must be done safely to protect patient and rescuers.",
                difficulty: "medium",
                category: "Glass Removal",
                tags: ["glass removal", "access", "safety"]
            },
            {
                question: "Define the concept of 'disentanglement' in extrication.",
                answer: "Disentanglement is the process of freeing a patient from wreckage by removing or moving the vehicle components around the patient.",
                difficulty: "medium",
                category: "Disentanglement",
                tags: ["disentanglement", "freeing patient", "vehicle components"]
            },
            {
                question: "What are the psychological considerations for trapped patients?",
                answer: "Provide reassurance, explain procedures, maintain communication, protect from sights/sounds of rescue, and provide emotional support.",
                difficulty: "easy",
                category: "Psychological Support",
                tags: ["psychological", "reassurance", "communication"]
            },
            {
                question: "Describe the energy management principles in vehicle extrication.",
                answer: "Identify stored energy sources, safely release energy, prevent energy buildup, and understand potential energy hazards in damaged vehicles.",
                difficulty: "hard",
                category: "Energy Management",
                tags: ["energy management", "stored energy", "hazards"]
            },
            {
                question: "What is the purpose of medical monitoring during extrication?",
                answer: "Continuously assess patient condition, detect changes, provide interventions, and communicate with rescue team about patient status.",
                difficulty: "easy",
                category: "Medical Monitoring",
                tags: ["medical monitoring", "assessment", "interventions"]
            },
            {
                question: "Define the concept of 'tool selection' in extrication operations.",
                answer: "Tool selection involves choosing appropriate equipment based on vehicle type, entrapment situation, available space, and safety considerations.",
                difficulty: "medium",
                category: "Tool Selection",
                tags: ["tool selection", "equipment", "safety"]
            },
            {
                question: "What are the considerations for multiple patient extrications?",
                answer: "Triage patients, prioritize removal order, coordinate multiple teams, ensure adequate resources, and maintain organization.",
                difficulty: "hard",
                category: "Multiple Patients",
                tags: ["multiple patients", "triage", "coordination"]
            },
            {
                question: "Describe the role of fire suppression in extrication operations.",
                answer: "Fire suppression prevents ignition, controls existing fires, provides safety for rescuers, and may require foam or special agents.",
                difficulty: "medium",
                category: "Fire Suppression",
                tags: ["fire suppression", "safety", "ignition"]
            },
            {
                question: "What is the significance of scene documentation in extrication?",
                answer: "Documentation records procedures, identifies lessons learned, supports legal proceedings, and improves future operations.",
                difficulty: "easy",
                category: "Documentation",
                tags: ["documentation", "lessons learned", "legal"]
            },
            {
                question: "Define the concept of 'tactical patience' in rescue operations.",
                answer: "Tactical patience involves taking time to plan safely, not rushing operations, considering all options, and prioritizing safety over speed.",
                difficulty: "hard",
                category: "Tactical Patience",
                tags: ["tactical patience", "planning", "safety"]
            },
            {
                question: "What are the termination activities in extrication operations?",
                answer: "Equipment cleanup, scene restoration, debriefing, equipment inspection, documentation completion, and return to service.",
                difficulty: "easy",
                category: "Termination",
                tags: ["termination", "cleanup", "debriefing"]
            }
        ]
    },
    // Chapter 40: Incident Management
    {
        chapterNumber: 40,
        cards: [
            {
                question: "What is the Incident Command System (ICS) and its purpose?",
                answer: "ICS is a standardized management system designed to ensure responder safety, achieve incident objectives, and ensure efficient use of resources during emergency incidents.",
                difficulty: "medium",
                category: "Incident Command",
                tags: ["ICS", "management system", "standardized"]
            },
            {
                question: "Define the five major functional areas of ICS.",
                answer: "Command, Operations, Planning, Logistics, and Finance/Administration. Each area has specific responsibilities for incident management.",
                difficulty: "medium",
                category: "ICS Structure",
                tags: ["functional areas", "command", "operations"]
            },
            {
                question: "What is the START triage system and its categories?",
                answer: "START (Simple Triage and Rapid Treatment) uses four categories: Immediate (red), Delayed (yellow), Minor (green), and Deceased (black).",
                difficulty: "medium",
                category: "START Triage",
                tags: ["START", "triage", "categories"]
            },
            {
                question: "Describe the JumpSTART triage system for pediatric patients.",
                answer: "JumpSTART modifies START for children: assess walking ability, breathing, provide 5 rescue breaths if no breathing, then reassess pulse and neurologic status.",
                difficulty: "hard",
                category: "JumpSTART",
                tags: ["JumpSTART", "pediatric", "rescue breaths"]
            },
            {
                question: "What are the key components of the EMS branch in ICS?",
                answer: "Medical Branch Director, Triage Supervisor, Treatment Supervisor, Transportation Supervisor, and potentially Staging Officer and Rehabilitation Unit.",
                difficulty: "medium",
                category: "EMS Branch",
                tags: ["EMS branch", "supervisors", "triage"]
            },
            {
                question: "Define Mass Casualty Incident (MCI) and its characteristics.",
                answer: "MCI is any incident involving three or more patients or overwhelming local resources. Characteristics include multiple patients, resource strain, and need for triage.",
                difficulty: "easy",
                category: "MCI",
                tags: ["mass casualty", "multiple patients", "resources"]
            },
            {
                question: "What is the purpose of the Incident Action Plan (IAP)?",
                answer: "IAP provides clear objectives, strategies, tactics, and resource assignments for incident management, ensuring coordinated response efforts.",
                difficulty: "medium",
                category: "Incident Action Plan",
                tags: ["IAP", "objectives", "coordination"]
            },
            {
                question: "Describe the role of the Safety Officer in ICS.",
                answer: "Safety Officer monitors scene for hazards, can stop operations if safety concerns arise, and ensures responder safety throughout the incident.",
                difficulty: "easy",
                category: "Safety Officer",
                tags: ["safety officer", "hazards", "responder safety"]
            },
            {
                question: "What are the HAZMAT control zones and their purposes?",
                answer: "Hot zone (exclusion): contaminated area. Warm zone (contamination reduction): decontamination area. Cold zone (support): clean area for command and staging.",
                difficulty: "hard",
                category: "HAZMAT Zones",
                tags: ["HAZMAT", "control zones", "decontamination"]
            },
            {
                question: "Define the concept of 'span of control' in ICS.",
                answer: "Span of control is the number of subordinates one supervisor can effectively manage, typically 3-7 personnel, ensuring effective communication and coordination.",
                difficulty: "medium",
                category: "Span of Control",
                tags: ["span of control", "supervision", "communication"]
            },
            {
                question: "What is the purpose of staging in incident management?",
                answer: "Staging provides organized location for resources, prevents scene congestion, maintains resource availability, and allows for organized deployment.",
                difficulty: "easy",
                category: "Staging",
                tags: ["staging", "resources", "organization"]
            },
            {
                question: "Describe the triage decision-making process in START.",
                answer: "1. Walking? (Minor) 2. Breathing? (If no, deceased) 3. Respiratory rate >30 or <10? (Immediate) 4. Radial pulse/cap refill? (Immediate if absent) 5. Mental status? (Immediate if impaired)",
                difficulty: "hard",
                category: "START Process",
                tags: ["START process", "decision making", "triage"]
            },
            {
                question: "What is the role of the Public Information Officer (PIO)?",
                answer: "PIO provides information to media and public, coordinates public information releases, and manages media relations during incidents.",
                difficulty: "easy",
                category: "Public Information",
                tags: ["PIO", "media", "public information"]
            },
            {
                question: "Define unified command and when it's used.",
                answer: "Unified command is used when multiple agencies with different jurisdictions or responsibilities respond to the same incident, sharing command authority.",
                difficulty: "medium",
                category: "Unified Command",
                tags: ["unified command", "multiple agencies", "jurisdictions"]
            },
            {
                question: "What are the principles of effective incident communication?",
                answer: "Use common terminology, clear text (no codes), integrated communications, reliable equipment, and face-to-face communication when possible.",
                difficulty: "medium",
                category: "Communication",
                tags: ["communication", "common terminology", "clear text"]
            },
            {
                question: "Describe the concept of 'tactical patience' in incident management.",
                answer: "Tactical patience involves taking time to assess situations, plan responses, and avoid rushing into dangerous situations that could worsen outcomes.",
                difficulty: "hard",
                category: "Tactical Patience",
                tags: ["tactical patience", "assessment", "planning"]
            },
            {
                question: "What is the purpose of resource tracking in ICS?",
                answer: "Resource tracking ensures accountability, enables cost calculation, facilitates resource allocation, and supports demobilization planning.",
                difficulty: "medium",
                category: "Resource Tracking",
                tags: ["resource tracking", "accountability", "allocation"]
            },
            {
                question: "Define the treatment area organization in MCIs.",
                answer: "Treatment area is organized by priority: immediate (red), delayed (yellow), minor (green), and deceased (black) areas with appropriate staffing.",
                difficulty: "medium",
                category: "Treatment Area",
                tags: ["treatment area", "organization", "priorities"]
            },
            {
                question: "What are the considerations for hospital destination decisions?",
                answer: "Patient condition, hospital capabilities, transport time, hospital capacity, and avoiding overwhelming single facilities.",
                difficulty: "medium",
                category: "Hospital Destination",
                tags: ["hospital destination", "capabilities", "capacity"]
            },
            {
                question: "Describe the role of the Logistics Section in ICS.",
                answer: "Logistics provides facilities, transportation, communications, supplies, equipment maintenance, fueling, feeding, and medical care for responders.",
                difficulty: "medium",
                category: "Logistics",
                tags: ["logistics", "supplies", "equipment"]
            },
            {
                question: "What is the purpose of demobilization in incident management?",
                answer: "Demobilization ensures orderly release of resources, proper documentation, cost tracking, and safe return to normal operations.",
                difficulty: "easy",
                category: "Demobilization",
                tags: ["demobilization", "resources", "documentation"]
            },
            {
                question: "Define the concept of 'freelancing' and why it's problematic.",
                answer: "Freelancing is working outside the ICS structure without coordination. It's problematic because it creates safety risks, wastes resources, and disrupts coordination.",
                difficulty: "medium",
                category: "Freelancing",
                tags: ["freelancing", "coordination", "safety risks"]
            },
            {
                question: "What are the key elements of effective triage?",
                answer: "Rapid assessment, appropriate categorization, clear marking, continuous reassessment, and moving patients to appropriate treatment areas.",
                difficulty: "easy",
                category: "Triage Elements",
                tags: ["triage", "assessment", "categorization"]
            },
            {
                question: "Describe the role of the Incident Commander.",
                answer: "Incident Commander has overall responsibility for incident management, makes key decisions, ensures safety, and coordinates all response activities.",
                difficulty: "easy",
                category: "Incident Commander",
                tags: ["incident commander", "responsibility", "coordination"]
            },
            {
                question: "What is the significance of interoperability in incident management?",
                answer: "Interoperability ensures different agencies can communicate and work together effectively, sharing information and resources seamlessly.",
                difficulty: "medium",
                category: "Interoperability",
                tags: ["interoperability", "communication", "agencies"]
            }
        ]
    },
    // Chapter 41: Terrorism and Disaster Management
    {
        chapterNumber: 41,
        cards: [
            {
                question: "What does the acronym CBRNE stand for in terrorism contexts?",
                answer: "Chemical, Biological, Radiological, Nuclear, and Explosive - the five main categories of weapons of mass destruction (WMDs).",
                difficulty: "medium",
                category: "WMD Categories",
                tags: ["CBRNE", "WMD", "terrorism"]
            },
            {
                question: "Define the THREAT response acronym for active shooter events.",
                answer: "Threat suppression, Hemorrhage control, Rapid extrication, Assessment by medical providers, and Transport to definitive care.",
                difficulty: "medium",
                category: "Active Shooter",
                tags: ["THREAT", "active shooter", "response"]
            },
            {
                question: "What are the four types of chemical agents used in terrorism?",
                answer: "Vesicants (blister agents), Respiratory agents (choking agents), Nerve agents, and Metabolic agents (cyanides).",
                difficulty: "hard",
                category: "Chemical Agents",
                tags: ["chemical agents", "vesicants", "nerve agents"]
            },
            {
                question: "Describe the treatment for nerve agent exposure.",
                answer: "Provide oxygen and ventilatory support, use DuoDote auto-injector containing atropine and pralidoxime chloride, and provide supportive care.",
                difficulty: "hard",
                category: "Nerve Agent Treatment",
                tags: ["nerve agent", "DuoDote", "atropine"]
            },
            {
                question: "What is a 'dirty bomb' and its primary hazard?",
                answer: "A dirty bomb is a radiological dispersal device (RDD) that combines conventional explosives with radioactive materials, creating contamination rather than nuclear explosion.",
                difficulty: "medium",
                category: "Radiological Weapons",
                tags: ["dirty bomb", "RDD", "contamination"]
            },
            {
                question: "Define the four categories of blast injuries.",
                answer: "Primary (pressure wave), Secondary (flying debris), Tertiary (being thrown), and Quaternary (burns, toxic inhalation, crush injuries).",
                difficulty: "hard",
                category: "Blast Injuries",
                tags: ["blast injuries", "primary", "secondary"]
            },
            {
                question: "What are the signs and symptoms of vesicant (blister agent) exposure?",
                answer: "Burn-like blisters, skin irritation and reddening, intense pain, gray skin discoloration, eye irritation, and respiratory symptoms if inhaled.",
                difficulty: "medium",
                category: "Vesicant Exposure",
                tags: ["vesicants", "blisters", "skin irritation"]
            },
            {
                question: "Describe the characteristics of lone wolf terrorism.",
                answer: "Violence by a single actor pursuing political change, linked to ideology, without orders or support from outside sources, and difficult to predict.",
                difficulty: "medium",
                category: "Lone Wolf",
                tags: ["lone wolf", "single actor", "ideology"]
            },
            {
                question: "What is the difference between international and domestic terrorism?",
                answer: "International terrorism occurs primarily outside U.S. jurisdiction; domestic terrorism occurs primarily within U.S. jurisdiction.",
                difficulty: "easy",
                category: "Terrorism Types",
                tags: ["international", "domestic", "jurisdiction"]
            },
            {
                question: "Define the concept of 'secondary devices' in terrorism.",
                answer: "Secondary devices are explosive devices placed to target emergency responders arriving at the scene of an initial incident.",
                difficulty: "medium",
                category: "Secondary Devices",
                tags: ["secondary devices", "responders", "explosives"]
            },
            {
                question: "What are the routes of exposure for biological agents?",
                answer: "Inhalation (aerosol), ingestion (food/water contamination), and vector-borne (infected insects or animals).",
                difficulty: "medium",
                category: "Biological Agents",
                tags: ["biological agents", "exposure routes", "aerosol"]
            },
            {
                question: "Describe the management of patients exposed to choking agents.",
                answer: "Remove from contaminated atmosphere, provide aggressive airway and breathing support, position for comfort with head elevated, and consider CPAP.",
                difficulty: "hard",
                category: "Choking Agents",
                tags: ["choking agents", "airway support", "CPAP"]
            },
            {
                question: "What is the significance of the dissemination method for biological agents?",
                answer: "Dissemination method determines exposure route, number of casualties, detection difficulty, and required response measures.",
                difficulty: "medium",
                category: "Biological Dissemination",
                tags: ["dissemination", "exposure", "casualties"]
            },
            {
                question: "Define the concept of 'surge capacity' in disaster management.",
                answer: "Surge capacity is the healthcare system's ability to expand services and accommodate increased patient volume during emergencies.",
                difficulty: "medium",
                category: "Surge Capacity",
                tags: ["surge capacity", "healthcare system", "expansion"]
            },
            {
                question: "What are the psychological effects of terrorism on communities?",
                answer: "Acute stress reactions, PTSD, community-wide anxiety, social disruption, and long-term mental health impacts requiring support services.",
                difficulty: "medium",
                category: "Psychological Effects",
                tags: ["psychological effects", "PTSD", "community"]
            },
            {
                question: "Describe the decontamination principles for chemical agent exposure.",
                answer: "Remove patient from exposure, remove contaminated clothing, wash with soap and water, avoid spreading contamination, and use appropriate PPE.",
                difficulty: "medium",
                category: "Decontamination",
                tags: ["decontamination", "chemical exposure", "PPE"]
            },
            {
                question: "What is the role of public health in terrorism response?",
                answer: "Disease surveillance, mass vaccination programs, epidemiological investigation, mental health support, and infrastructure protection.",
                difficulty: "medium",
                category: "Public Health",
                tags: ["public health", "surveillance", "vaccination"]
            },
            {
                question: "Define the concept of 'weapons of mass destruction' (WMD).",
                answer: "WMDs are designed to cause mass casualties, massive property damage, or infrastructure destruction, specifically targeting large numbers of people.",
                difficulty: "easy",
                category: "WMD Definition",
                tags: ["WMD", "mass casualties", "destruction"]
            },
            {
                question: "What are the signs of radiation exposure?",
                answer: "Nausea, vomiting, fatigue, skin burns, hair loss, and symptoms may be delayed. Severity depends on dose and duration of exposure.",
                difficulty: "medium",
                category: "Radiation Exposure",
                tags: ["radiation", "symptoms", "delayed"]
            },
            {
                question: "Describe the management of metabolic agent (cyanide) poisoning.",
                answer: "Remove contaminated clothing, decontaminate patient, provide high-flow oxygen, support ventilation, and consider antidotes if available.",
                difficulty: "hard",
                category: "Metabolic Agents",
                tags: ["cyanide", "poisoning", "antidotes"]
            },
            {
                question: "What is the importance of scene safety in suspected terrorism events?",
                answer: "Scene safety is paramount due to secondary devices, ongoing threats, hazardous materials, and potential for responder targeting.",
                difficulty: "easy",
                category: "Scene Safety",
                tags: ["scene safety", "secondary devices", "hazards"]
            },
            {
                question: "Define the concept of 'all-hazards approach' in emergency management.",
                answer: "All-hazards approach uses common capabilities and resources to respond to various types of emergencies, regardless of cause.",
                difficulty: "medium",
                category: "All-Hazards",
                tags: ["all-hazards", "common capabilities", "resources"]
            },
            {
                question: "What are the indicators of potential biological agent release?",
                answer: "Unusual disease patterns, rapid onset of symptoms, multiple casualties with similar symptoms, and unusual epidemiological findings.",
                difficulty: "hard",
                category: "Biological Indicators",
                tags: ["biological agents", "disease patterns", "symptoms"]
            },
            {
                question: "Describe the role of intelligence in terrorism prevention.",
                answer: "Intelligence provides threat assessment, early warning, pattern recognition, and information sharing to prevent and respond to terrorist activities.",
                difficulty: "medium",
                category: "Intelligence",
                tags: ["intelligence", "threat assessment", "prevention"]
            },
            {
                question: "What is the significance of critical infrastructure protection?",
                answer: "Critical infrastructure (bridges, airports, utilities) is essential for society's functioning and may be targeted by terrorists to maximize disruption.",
                difficulty: "medium",
                category: "Infrastructure Protection",
                tags: ["critical infrastructure", "protection", "disruption"]
            }
        ]
    }
];
export async function seedAllFlashcards() {
    console.log('Starting comprehensive flashcard seeding for all 41 chapters...');
    let totalCards = 0;
    for (const chapter of flashcardData) {
        console.log(`\nSeeding Chapter ${chapter.chapterNumber} flashcards...`);
        for (const card of chapter.cards) {
            try {
                const flashcard = {
                    chapterNumber: chapter.chapterNumber,
                    question: card.question,
                    answer: card.answer,
                    difficulty: card.difficulty,
                    category: card.category,
                    tags: card.tags,
                    timesCorrect: 0,
                    timesIncorrect: 0,
                    lastReviewed: null,
                    nextReview: null
                };
                await db.insert(flashcards).values(flashcard);
                totalCards++;
            }
            catch (error) {
                console.error(`✗ Failed to add flashcard:`, error);
            }
        }
        console.log(`✓ Added ${chapter.cards.length} flashcards for Chapter ${chapter.chapterNumber}`);
    }
    console.log(`\nFlashcard seeding completed! Total cards added: ${totalCards}`);
}
// Auto-execute when run directly
seedAllFlashcards()
    .then(() => {
    console.log('All flashcard seeding completed successfully');
    process.exit(0);
})
    .catch((error) => {
    console.error('Flashcard seeding failed:', error);
    process.exit(1);
});
