import CareerStepHolder from "./CareerStepHolder"
import CustomDropdown from "./CustomDropdown"
import InterviewQuestionGeneratorV3 from "./InterviewQuestionGeneratorV3";

const screeningSettingList = [
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
const tips = [
    {
        tip: 'Add a Secret Prompt',
        description: 'to fine-tune how Jia scores and evaluates the interview responses.'
    },
    {
        tip: 'Use “Generate Questions”',
        description: 'to quickly create tailored interview questions, then refine or mix them with your own for balanced results.'
    }
]

export default function CareerStep3({
    aiInterviewScreening, 
    setAiInterviewScreening, 
    jobTitle, 
    description
}:any){
    return (
        <div style={{display:'grid', gridTemplateColumns:'1fr 30%', gap:'20px', marginTop:'30px'}}>
            {/* form */}
            <div>
                {/* AI Interview Settings */}
                <CareerStepHolder
                label="1. AI Interview Settings"
                customHeader={''}>
                    {/* ai interview screening */}
                    <p style={{color:'#2a2a2a', fontWeight:'500', margin:'0'}}>AI Interview Screening</p>
                    <span>Jia automatically endorses candidates who meet the chosen criteria.</span>
                    <div style={{width: '50%', marginTop:'10px'}}>
                        <CustomDropdown
                        onSelectSetting={(setting) => {
                            setAiInterviewScreening({...aiInterviewScreening, aiScreeningSetting: setting})
                        }}
                        screeningSetting={aiInterviewScreening.aiScreeningSetting}
                        settingList={screeningSettingList}
                        />    
                    </div>

                    <hr style={{margin:'20px 0'}}/>

                    {/* require video */}
                    <p style={{color:'#2a2a2a', fontWeight:'500', margin:'0'}}>Require Video on Interview</p>
                    <span>Require candidates to keep their camera on. Recordings will appear on their analysis page.</span>
                    <div style={{ display: "flex", flexDirection: "row",justifyContent: "space-between", alignItems:'center', gap: 8, marginTop:'10px' }}>
                          <div style={{ display: "flex", alignItems:'center', flexDirection: "row", gap: 8 }}>
                              <i className="la la-video" style={{ color: "#414651", fontSize: 20 }}></i>
                              <span>Require Video Interview</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <label className="switch" style={{margin:'0'}}>
                                <input type="checkbox" checked={aiInterviewScreening.requireVideo} onChange={() => setAiInterviewScreening({...aiInterviewScreening, requireVideo: !aiInterviewScreening.requireVideo})} />
                                <span className="slider round"></span>
                            </label>
                            <span>{aiInterviewScreening.requireVideo ? "Yes" : "No"}</span>
                        </div>
                    </div>
                </CareerStepHolder>

                {/* ai interview questions */}
                <InterviewQuestionGeneratorV3 
                questions={aiInterviewScreening.questions} 
                setQuestions={(questions) => setAiInterviewScreening({...aiInterviewScreening, questions:questions})} 
                jobTitle={jobTitle} 
                description={description} />   
                
            </div>

            {/* tips */}
            <div>
                <CareerStepHolder
                label={'Tips'}
                customHeader={''}>
                    {tips.map(t=>(
                        <p style={{fontWeight:'400'}}><strong style={{color:'#2a2a2a'}}>{t.tip}</strong> {t.description}</p>    
                    ))}
                </CareerStepHolder>
            </div>
        </div>
    )
}