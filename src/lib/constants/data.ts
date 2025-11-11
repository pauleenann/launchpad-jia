export const stepLabels = [
    {
        step:1,
        label:'Career Details'
    },
    {
        step:2,
        label:'CV Review & Pre-screening'
    },
    {
        step:3,
        label:'AI Interview Setup'
    },{
        step:4,
        label:'Review Career'
    }
]
export const defaultQuestions = [
    {
      id: 1,
      category: "CV Validation / Experience",
      questionCountToAsk: null,
      questions: [],
    },
    {
      id: 2,
      category: "Technical",
      questionCountToAsk: null,
      questions: [],
    },
    {
      id: 3,
      category: "Behavioral",
      questionCountToAsk: null,
      questions: [],
    },
    {
      id: 4,
      category: "Analytical",
      questionCountToAsk: null,
      questions: [],
    },
    {
      id: 5,
      category: "Others",
      questionCountToAsk: null,
      questions: [],
    },
]
export const workSetupOptions = [
    {
        name: "Fully Remote",
    },
    {
        name: "Onsite",
    },
    {
        name: "Hybrid",
    },
];
export const employmentTypeOptions = [
    {
        name: "Full-Time",
    },
    {
        name: "Part-Time",
    },
];
export const careerStep1Tips = [
    {
        tip: 'Use clear, standard job titles',
        description: 'for better searchability (e.g., “Software Engineer” instead of “Code Ninja” or “Tech Rockstar”).'
    },
    {
        tip: 'Avoid abbreviations',
        description: 'or internal role codes that applicants may not understand (e.g., use “QA Engineer” instead of “QE II” or “QA-TL”).'
    },
    {
        tip: 'Keep it concise',
        description: '– job titles should be no more than a few words (2–4 max), avoiding fluff or marketing terms.'
    }
]
export const screeningSettingList = [
    {
        name: "Good Fit and above",
        icon: "la la-check",
    },
    {
        name: "Only Strong Fit",
        icon: "la la-check-double",
    },
    {
        name: "No Automatic Promotion",
        icon: "la la-times",
    },
];
export const suggestedQuestions = [
    {
        category: 'Notice Period',
        question: 'How long is your notice period?'
    },
    {
        category: 'Work Setup',
        question: 'How often are you willing to report to the office each week?'
    },
    {
        category: 'Asking Salary',
        question: 'How much is your expected salary?'
    },
]
export const careerStep2Tips = [
    {
        tip: 'Add a Secret Prompt',
        description: 'to fine-tune how Jia scores and evaluates submitted CVs..'
    },
    {
        tip: 'Add Pre-Screening Questions',
        description: 'to collect key details such as notice period, work setup, or salary expectations to guide your review and candidate discussions.'
    }
]
export const careerStep3Tips = [
    {
        tip: 'Add a Secret Prompt',
        description: 'to fine-tune how Jia scores and evaluates the interview responses.'
    },
    {
        tip: 'Use “Generate Questions”',
        description: 'to quickly create tailored interview questions, then refine or mix them with your own for balanced results.'
    }
]
export const emptyCareerDetails = {
    jobTitle: "",
    description: "",
    workSetup: "",
    workSetupRemarks:  "",
    employmentType: "Full-Time",
    salaryNegotiable: true,
    minimumSalary:  "",
    maximumSalary:  "",
    country: "Philippines",
    province: "",
    city: "",
    provinceList:[],
    cityList:[],
}
export const emptyScreeningInfo = {
    screeningSetting: "Good Fit and above",
    cvSecretPrompt: '',
    preScreeningQuestions: []
};
export const emptyAiInfo = {
    aiScreeningSetting: "Good Fit and above",
    requireVideo: true,
    questions: defaultQuestions
}