export const learningPaths = [
    {
        id: 'airway-mastery',
        name: 'Airway Mastery',
        description: 'Master airway assessment and management techniques for all age groups',
        difficulty: 'intermediate',
        estimatedTime: '2-3 hours',
        prerequisites: ['basic-assessment'],
        badge: {
            name: 'Airway Expert',
            icon: '🫁',
            color: '#3B82F6'
        },
        modules: [
            {
                id: 'respiratory-anatomy',
                name: 'Respiratory System Anatomy',
                type: 'anatomy',
                completed: false,
                points: 100
            },
            {
                id: 'airway-reference',
                name: 'Airway Management Reference',
                type: 'reference',
                completed: false,
                points: 75
            },
            {
                id: 'pediatric-airway',
                name: 'Pediatric Respiratory Distress',
                type: 'scenario',
                completed: false,
                points: 150
            },
            {
                id: 'asthma-simulation',
                name: 'Asthma Exacerbation Simulation',
                type: 'simulation',
                completed: false,
                points: 200
            }
        ]
    },
    {
        id: 'cardiac-expert',
        name: 'Cardiac Emergency Expert',
        description: 'Comprehensive training in cardiac emergency recognition and treatment',
        difficulty: 'advanced',
        estimatedTime: '3-4 hours',
        prerequisites: ['basic-assessment', 'airway-mastery'],
        badge: {
            name: 'Cardiac Expert',
            icon: '❤️',
            color: '#EF4444'
        },
        modules: [
            {
                id: 'cardiac-anatomy',
                name: 'Cardiovascular System',
                type: 'anatomy',
                completed: false,
                points: 100
            },
            {
                id: 'adult-cpr-reference',
                name: 'Adult CPR Reference',
                type: 'reference',
                completed: false,
                points: 75
            },
            {
                id: 'cardiac-arrest-scenario',
                name: 'Adult Cardiac Arrest',
                type: 'scenario',
                completed: false,
                points: 200
            },
            {
                id: 'chest-pain-simulation',
                name: 'Chest Pain Assessment',
                type: 'simulation',
                completed: false,
                points: 200
            }
        ]
    },
    {
        id: 'trauma-specialist',
        name: 'Trauma Specialist',
        description: 'Advanced trauma assessment and management for multiple injury patients',
        difficulty: 'advanced',
        estimatedTime: '4-5 hours',
        prerequisites: ['basic-assessment', 'airway-mastery'],
        badge: {
            name: 'Trauma Specialist',
            icon: '🩹',
            color: '#F59E0B'
        },
        modules: [
            {
                id: 'musculoskeletal-anatomy',
                name: 'Musculoskeletal System',
                type: 'anatomy',
                completed: false,
                points: 100
            },
            {
                id: 'trauma-assessment-scenario',
                name: 'Trauma Assessment',
                type: 'scenario',
                completed: false,
                points: 200
            },
            {
                id: 'multi-trauma-simulation',
                name: 'Multi-System Trauma',
                type: 'simulation',
                completed: false,
                points: 250
            }
        ]
    },
    {
        id: 'pediatric-specialist',
        name: 'Pediatric Specialist',
        description: 'Specialized training for pediatric emergency care and assessment',
        difficulty: 'intermediate',
        estimatedTime: '3-4 hours',
        prerequisites: ['basic-assessment'],
        badge: {
            name: 'Pediatric Specialist',
            icon: '👶',
            color: '#8B5CF6'
        },
        modules: [
            {
                id: 'pediatric-cpr-reference',
                name: 'Pediatric CPR Reference',
                type: 'reference',
                completed: false,
                points: 75
            },
            {
                id: 'pediatric-respiratory-scenario',
                name: 'Pediatric Respiratory Distress',
                type: 'scenario',
                completed: false,
                points: 150
            },
            {
                id: 'febrile-seizure-simulation',
                name: 'Pediatric Febrile Seizure',
                type: 'simulation',
                completed: false,
                points: 200
            }
        ]
    },
    {
        id: 'basic-assessment',
        name: 'Basic Assessment',
        description: 'Foundation skills for patient assessment and basic life support',
        difficulty: 'beginner',
        estimatedTime: '1-2 hours',
        prerequisites: [],
        badge: {
            name: 'Assessment Foundation',
            icon: '📋',
            color: '#10B981'
        },
        modules: [
            {
                id: 'first-aid-reference',
                name: 'First Aid Reference Guide',
                type: 'reference',
                completed: false,
                points: 50
            },
            {
                id: 'basic-scenarios',
                name: 'Basic Emergency Scenarios',
                type: 'scenario',
                completed: false,
                points: 100
            }
        ]
    }
];
export const availableBadges = [
    {
        id: 'first-scenario',
        name: 'First Scenario',
        description: 'Complete your first interactive scenario',
        icon: '🎯',
        color: '#3B82F6',
        earned: false
    },
    {
        id: 'simulation-master',
        name: 'Simulation Master',
        description: 'Complete 5 patient simulations with 80% or higher',
        icon: '🏆',
        color: '#F59E0B',
        earned: false
    },
    {
        id: 'anatomy-explorer',
        name: 'Anatomy Explorer',
        description: 'Complete all anatomy system quizzes',
        icon: '🧠',
        color: '#8B5CF6',
        earned: false
    },
    {
        id: 'quick-thinker',
        name: 'Quick Thinker',
        description: 'Complete 3 scenarios in under 2 minutes each',
        icon: '⚡',
        color: '#EF4444',
        earned: false
    },
    {
        id: 'perfect-score',
        name: 'Perfect Score',
        description: 'Achieve 100% on any learning module',
        icon: '🌟',
        color: '#10B981',
        earned: false
    }
];
export const getUserProgress = () => {
    // In a real app, this would fetch from database
    return {
        totalPoints: 850,
        completedModules: 12,
        earnedBadges: 3,
        currentLevel: 'Intermediate',
        pathsCompleted: 1
    };
};
