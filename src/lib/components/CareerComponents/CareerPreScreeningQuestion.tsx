import { useState } from "react";
import CustomDropdown from "./CustomDropdown";

const questionTypes = [
    {
        name: "Dropdown",
        icon: ''
    },
    {
        name: "Range",
        icon: ""
    },
];

export default function CareerPreScreeningQuestion({index, question, screeningInfo, setScreeningInfo}:any){
    const [optionInput, setOptionInput] = useState('')

    const handleChange = (type: string) => {
        const updatedQuestions = screeningInfo.preScreeningQuestions.map((q) =>
          q.category === question.category ? { ...q, questionType: type } : q
        );
      
        setScreeningInfo({
          ...screeningInfo,
          preScreeningQuestions: updatedQuestions,
        });
    };

    const handleAddOption = () => {
        //update question
        const updatedQuestion = {...question, options: [...question.options, optionInput]}
        //update question from screening info
        const updatedQuestions = screeningInfo.preScreeningQuestions.map((q) =>
            q.category === question.category ? updatedQuestion  : q
        );
        setScreeningInfo({
            ...screeningInfo,
            preScreeningQuestions: updatedQuestions,
        });
        // reset input
        setOptionInput('')
    };

    return (
        <div
        draggable
        key={index}
        style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'15px'}}>
            <i className="las la-grip-vertical" style={{fontSize:'25px', cursor: 'grab'}}></i>
            <div style={{backgroundColor:'white', border:'1px solid #e9ecef', width:'100%', borderRadius:'10px'}}>
                {/* header */}
                <header style={{padding: '15px', display: ' flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor:'#f8f9fa'}}>
                    {question?.question}
                    
                    <div style={{width:'30%'}}>
                        <CustomDropdown
                        onSelectSetting={(qt) => {
                            handleChange(qt)
                        }}
                        screeningSetting={question?.questionType||''}
                        settingList={questionTypes}
                        placeholder="Select question type"
                        />    
                    </div>
                </header>

                <footer style={{padding: '15px'}}>
                    {/* add option (for dropdown only) */}
                    {question.questionType=='Dropdown'
                    &&
                    <>
                        {/* options */}
                        {question.options.map((item, key)=>(
                            <div style={{display:'grid', gridTemplateColumns:'50px 1fr', height:'50px', borderRadius:'5px', border:'1px solid #e9ecef', marginBottom:'10px', color:'black'}}>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'center', borderRight:'1px solid #e9ecef'}}>{key+1}</div>
                                <div style={{display:'flex', alignItems:'center', paddingLeft:'15px'}}>{item}</div>
                            </div>
                        ))}


                        {/* option input */}
                        <input 
                        type="text" 
                        className="form-control"
                        value={optionInput}
                        name="option"
                        placeholder="Enter option here"
                        onChange={(e)=>setOptionInput(e.target.value)}/>

                        {/* add option btn */}
                        <button 
                        style={{backgroundColor:"transparent", border:'none',display: ' flex', alignItems: 'center', justifyContent: 'center', gap:'4px', outline:'none', cursor:'pointer', marginTop:'10px' }}
                        onClick={handleAddOption}>
                            <i className="las la-plus" style={{fontSize:'25px'}}></i>
                            Add option
                        </button>
                    </>
                    }
                    

                    <hr/>

                    <div style={{display:'flex', justifyContent:'end'}}>
                        <button style={{backgroundColor:"transparent", border:'1px solid red', borderRadius:'50px', color: 'red', display: ' flex', alignItems: 'center', justifyContent: 'center', gap:'4px', outline:'none', cursor:'pointer', padding:'5px 10px', fontWeight: '500'}}>
                            <i className="las la-trash" ></i>
                            Delete Question
                        </button>    
                    </div>
                    
                </footer>
            </div>
        </div>
    )
}