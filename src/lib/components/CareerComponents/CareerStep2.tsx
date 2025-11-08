import { useEffect } from "react";
import CareerPreScreeningQuestion from "./CareerPreScreeningQuestion";
import CareerStepHolder from "./CareerStepHolder";
import CustomDropdown from "./CustomDropdown";

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
const suggestedQuestions = [
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

export default function CareerStep2({screeningInfo, setScreeningInfo}):any{
    const isSuggestedQuestionAdded = (category: string )=>{
        return screeningInfo.preScreeningQuestions.some(s=>s.category==category)
    }

    useEffect(()=>{
        console.log(screeningInfo)
    },[screeningInfo])
    return (
        <div style={{display:'grid', gridTemplateColumns:'1fr 30%', gap:'20px', marginTop:'30px'}}>
            {/* form */}
            <div>
                {/* CV Review Settings */}
                <CareerStepHolder
                label="1. CV Review Settings"
                customHeader={''}>
                    {/* cv screening */}
                    <p style={{color:'#2a2a2a', fontWeight:'500', margin:'0'}}>CV Screening</p>
                    <span>Jia automatically endorses candidates who meet the chosen criteria.</span>
                    <div style={{width: '50%', marginTop:'10px'}}>
                        <CustomDropdown
                        onSelectSetting={(setting) => {
                            setScreeningInfo({...screeningInfo, screeningSetting: setting})
                        }}
                        screeningSetting={screeningInfo.screeningSetting}
                        settingList={screeningSettingList}
                        />    
                    </div>

                    <hr/>

                    {/* cv secret prompt */}
                    <div style={{display:'flex', alignItems:'center', gap: '4px'}}>
                        <img src="/assets/sparkle.svg" alt="" />
                        <p style={{color:'#2a2a2a', fontWeight:'500', margin:'0'}}>CV Secret Prompt <span style={{color:'gray', fontWeight:'400'}}>(optional)</span></p>  
                        <i className="las la-question-circle"></i>
                    </div>
                    <span>Secret Prompts give you extra control over Jia’s evaluation style, complementing her accurate assessment of requirements from the job description.</span>
                    <textarea
                    className="form-control"
                    style={{ width: '100%', padding:'15px' ,marginTop:'10px'}}
                    placeholder="Enter a secret prompt (e.g. Give higher fit scores to candidates who participate in hackathons or competitions.)"
                    name=""
                    id=""
                    ></textarea>
                </CareerStepHolder>

                {/* Pre-screening questions */}
                <CareerStepHolder
                label={''}
                customHeader={<div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems: 'center'}}>
                    <div style={{display:'flex', alignItems: 'center', gap:'5px'}}>
                        <p style={{fontSize: '18px', color: '#2a2a2a', fontWeight:'500',margin:0}}>2. Pre-Screening Questions</p>  
                        <p style={{margin:0, color:'gray', fontSize: '18px'}}>(optional)</p>
                        <div style={{margin:'0 3px', background:'#e9ecef', padding:'1px 10px', borderRadius:'20px', border: '1px solid #ced4da'}}>{screeningInfo.preScreeningQuestions.length}</div>
                    </div>
                    
                    <button 
                    style={{ width: "fit-content", background: "black", color: "#fff", border: "1px solid #E9EAEB", padding: "8px 16px", borderRadius: "60px", whiteSpace: "nowrap", display:'flex', alignItems:'center', gap:'8px', cursor: 'pointer'}}
                    onClick={()=>{
                        setScreeningInfo({...screeningInfo, preScreeningQuestions:[
                            ...screeningInfo.preScreeningQuestions,
                            {
                                category:'',
                                question:'',
                                options:[],
                                range:[],
                                questionType: 'Dropdown'

                            }
                        ]})
                    }}>
                        <i className="las la-plus"></i>
                        Add custom
                    </button>
                </div>}>
                        {/* children */}
                        {screeningInfo.preScreeningQuestions.length>0?
                        screeningInfo.preScreeningQuestions.map((q,i)=>(
                            <CareerPreScreeningQuestion
                            index={i}
                            question={q}
                            screeningInfo={screeningInfo}
                            setScreeningInfo={setScreeningInfo}/>
                        ))
                        :<span >No pre-screening questions added yet</span>}
                       
                        <hr style={{margin:'20px 0'}}/>
                        <p style={{color:'#2a2a2a', fontWeight:'500', margin:'0', fontSize: '18px'}}>Suggested  Pre-screening Questions:</p>
                        {/* suggested qs */}
                        {suggestedQuestions.map((suggestion, index)=>(
                            <div key={index} style={{display: 'flex', alignItems:'center', justifyContent:'space-between', marginTop:'10px'}}>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <span style={{margin:'0', padding:'0', fontWeight:'500', color:isSuggestedQuestionAdded(suggestion.category)?'#adb5bd':'#2a2a2a'}}>{suggestion.category}</span>
                                    <span style={{margin:'0', padding:'0', color:isSuggestedQuestionAdded(suggestion.category)?'#ced4da':''}}>{suggestion.question}</span>
                                </div>
                                {/* add suggested question */}
                                <button 
                                disabled={isSuggestedQuestionAdded(suggestion.category)}
                                onClick={()=>{
                                    setScreeningInfo({...screeningInfo, 
                                        preScreeningQuestions: [...screeningInfo.preScreeningQuestions, {...suggestion,
                                        options:[],
                                        range:[], 
                                        questionType:'Dropdown'}]
                                    })
                                }}
                                style={{padding: '5px 15px', border:'1px solid gray', borderRadius:'20px', background:'white'}}>
                                    Add
                                </button>
                            </div>
                        ))}
                </CareerStepHolder>
            </div>

            {/* steps */}
            <div>
                <CareerStepHolder
                label={'Tips'}
                customHeader={''}>
                    <p style={{fontWeight:'400'}}><strong style={{color:'#2a2a2a'}}>Add a Secret Prompt</strong> to fine-tune how Jia scores and evaluates submitted CVs..</p>
                    <p style={{fontWeight:'400'}}><strong style={{color:'#2a2a2a'}}>Add Pre-Screening Questions</strong> to collect key details such as notice period, work setup, or salary expectations to guide your review and candidate discussions.</p>
                </CareerStepHolder>
            </div>
        </div>
    )
}