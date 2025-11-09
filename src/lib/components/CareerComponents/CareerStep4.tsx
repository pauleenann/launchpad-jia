import { useState } from "react";
import CareerStepAccordion from "./CareerStepAccordion";
import parse from 'html-react-parser'

export default function CareerStep4({careerDetails, screeningInfo, aiInterviewScreening, editStep}:any){
    const [isStep1Open, setIsStep1Open] = useState(true);
    const [isStep2Open, setIsStep2Open] = useState(true);
    const [isStep3Open, setIsStep3Open] = useState(true);

    return (
        <div style={{width:'80%', height:'100%', margin:"auto", padding:'20px 0'}}>
            {/* career details */}
            <CareerStepAccordion
            label={'Career Details'}
            isOpen={isStep1Open}
            setIsOpen={()=>setIsStep1Open(!isStep1Open)}
            edit={()=>editStep(1)}>
                {/* job title */}
                <section>
                    <p style={{margin:0, color:'black', fontWeight:'500'}}>Job Title</p>
                    <p style={{margin:0, fontWeight:'400'}}>{careerDetails.jobTitle||'N/A'}</p>
                    <hr style={{margin:'15px 0'}}/>
                </section>

                {/* employment type and  work arrangement */}
                <section style={{display:'grid', gridTemplateColumns:'35% 1fr'}}>
                    <div>
                        <p style={{margin:0, color:'black', fontWeight:'500'}}>Employment Type</p>
                        <p style={{margin:0, fontWeight:'400'}}>{careerDetails.employmentType||'N/A'}</p>
                        <hr style={{margin:'15px 0'}}/>    
                    </div>
                    <div>
                        <p style={{margin:0, color:'black', fontWeight:'500'}}>Work Arrangement</p>
                        <p style={{margin:0, fontWeight:'400'}}>{careerDetails.workSetup||'N/A'}</p>
                        <hr style={{margin:'15px 0'}}/>    
                    </div>
                </section>

                {/* country, province, city */}
                <section style={{display:'grid', gridTemplateColumns:'35% 35% 1fr'}}>
                    <div>
                        <p style={{margin:0, color:'black', fontWeight:'500'}}>Country</p>
                        <p style={{margin:0, fontWeight:'400'}}>{careerDetails.country||'N/A'}</p>
                        <hr style={{margin:'15px 0'}}/>    
                    </div>
                    <div>
                        <p style={{margin:0, color:'black', fontWeight:'500'}}>State / Province</p>
                        <p style={{margin:0, fontWeight:'400'}}>{careerDetails.province||'N/A'}</p>
                        <hr style={{margin:'15px 0'}}/>    
                    </div>
                    <div>
                        <p style={{margin:0, color:'black', fontWeight:'500'}}>City</p>
                        <p style={{margin:0, fontWeight:'400'}}>{careerDetails.city||'N/A'}</p>
                        <hr style={{margin:'15px 0'}}/>    
                    </div>
                </section>

                {/* job description */}
                <section>
                    <p style={{margin:0, color:'black', fontWeight:'500'}}>Job Description</p>
                    <p style={{margin:0, fontWeight:'400',}}>{parse(careerDetails.description)||'N/A'}</p>
                </section>
            </CareerStepAccordion>

            {/* cv review */}
            <CareerStepAccordion
            label={'CV Review & Pre-Screening Questions'}
            isOpen={isStep2Open}
            setIsOpen={()=>setIsStep2Open(!isStep2Open)}
            edit={()=>editStep(2)}>
                {/* job title */}
                <section>
                    <p style={{margin:0, color:'black', fontWeight:'500'}}>CV Screening</p>
                    <p style={{margin:0, fontWeight:'400'}}>
                        Automatically endorse candidates who are 
                        <span style={{backgroundColor:'#edf2fb', padding:'2px 8px', margin:'0 4px', border:'1px solid #90e0ef', color:'#0077b6', borderRadius:'20px', fontSize:'14px'}}>{screeningInfo.screeningSetting}</span>
                    </p>
                    <hr style={{margin:'15px 0'}}/>
                </section>

                {/* CV secret prompt */}
                <section>
                    <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                        <img src="/assets/sparkle.svg" alt="CV Secret Prompt" />
                        <p style={{margin:0, color:'black', fontWeight:'500'}}>CV Secret Prompt</p>    
                    </div>
                    
                    <p style={{margin:0, fontWeight:'400'}}>
                        <ul>
                            <li>{screeningInfo.cvSecretPrompt||'N/A'}</li>
                        </ul>
                    </p>
                    <hr style={{margin:'15px 0'}}/>
                </section>

                {/* prescreening questions */}
                <section>
                    <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                        <p style={{margin:0, color:'black', fontWeight:'500', }}>Pre-screening Questions</p> 
                        <span style={{margin:'0 3px', background:'#e9ecef', padding:'1px 8px', borderRadius:'20px', border: '1px solid #ced4da', fontSize:'14px'}}>{screeningInfo.preScreeningQuestions.length}</span>   
                    </div>

                    {screeningInfo.preScreeningQuestions.map((q,i)=>(
                        <div>
                            <p style={{margin:'0'}}>{`${i+1}. ${q.question}`}</p>
                            <ul>
                                {q?.options?.length>0?q.options.map((o,i)=>(
                                    <li>{o}</li>
                                )):<li>
                                    Preferred: {`${q.options?.minimumRange} - ${q.options?.maximumRange}`}
                                </li>}
                            </ul>
                        </div>
                    ))}
                </section>
            </CareerStepAccordion>

            {/* ai interview setup */}
            <CareerStepAccordion
            label={'AI Interview Setup'}
            isOpen={isStep3Open}
            setIsOpen={()=>setIsStep3Open(!isStep3Open)}
            edit={()=>editStep(3)}>
                {/* job title */}
                <section>
                    <p style={{margin:0, color:'black', fontWeight:'500'}}>AI Interview Screening</p>
                    <p style={{margin:0, fontWeight:'400'}}>
                        Automatically endorse candidates who are 
                        <span style={{backgroundColor:'#edf2fb', padding:'2px 8px', margin:'0 4px', border:'1px solid #90e0ef', color:'#0077b6', borderRadius:'20px', fontSize:'14px'}}>{aiInterviewScreening.aiScreeningSetting}</span>
                    </p>
                    <hr style={{margin:'15px 0'}}/>
                </section>

                <section>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <p style={{margin:0, color:'black', fontWeight:'500'}}>Require Video on Interview</p>
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            {aiInterviewScreening.requireVideo?'Yes':'No'}
                            {aiInterviewScreening.requireVideo
                            ?<div style={{width:'25px', height:'25px',padding:'5px', borderRadius:'100%', border:'1px solid #80ed99', fontSize:'10px',display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#c7f9cc', color:'#57cc99'}}>
                                <i className="las la-check"></i>
                            </div>
                            :<div style={{width:'25px', height:'25px',padding:'5px', borderRadius:'100%', border:'1px solid #f08080', fontSize:'10px',display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#fbc4ab', color:'#f08080'}}>
                                <i className="las la-check"></i>
                            </div>}
                        </div>
                    </div>
                    <hr style={{margin:'15px 0'}}/>
                </section>

                {/* interview questions */}
                <section>
                    <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                        <p style={{margin:0, color:'black', fontWeight:'500', }}>Interview Questions</p> 
                        <span style={{margin:'0 3px', background:'#e9ecef', padding:'1px 8px', borderRadius:'20px', border: '1px solid #ced4da', fontSize:'14px'}}>{aiInterviewScreening.questions.reduce((acc, curr)=>acc+curr.questions.length, 0)}</span>   
                    </div>

                    {aiInterviewScreening.questions.map((q, i) => (
                    <div key={q.id || i}> 
                        <p style={{ margin: 0, color:'black', fontWeight:'500',  }}>{`${q.id}. ${q.category}`}</p>
                        <ul>
                        {q.questions?.length>0&&q.questions.map((sq,i)=>(
                            <li>{sq.question}</li> 
                        ))}
                        </ul>
                    </div>
                    ))}
                </section>
            </CareerStepAccordion>
        </div>
    )
}