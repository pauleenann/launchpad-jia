import { useState } from "react";
import CareerStepAccordion from "./CareerStepAccordion";

export default function CareerStep4({careerDetails, screeningInfo, aiInterviewScreening}:any){
    const [isStep1Open, setIsStep1Open] = useState(false);
    const [isStep2Open, setIsStep2Open] = useState(false)

    return (
        <div style={{width:'80%', height:'100%', margin:"auto", padding:'20px 0'}}>
            {/* career details */}
            <CareerStepAccordion
            label={'Career Details'}
            isOpen={isStep1Open}
            setIsOpen={()=>setIsStep1Open(!isStep1Open)}>
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
                    <p style={{margin:0, fontWeight:'400'}}>{careerDetails.jobTitle||'N/A'}</p>
                </section>
            </CareerStepAccordion>

            {/* cv review */}
            <CareerStepAccordion
            label={'CV Review & Pre-Screening Questions'}
            isOpen={isStep2Open}
            setIsOpen={()=>setIsStep2Open(!isStep2Open)}>
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
                            <p style={{margin:'0'}}>{`${i+1} ${q.question}`}</p>
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
        </div>
    )
}