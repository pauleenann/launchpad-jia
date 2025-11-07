export default function CareerStepLabel({ 
    label,
    step,
    currentStep
 }) {
    return (
        <div >
            <div style={{display:'flex', gap:'10px', alignItems:'center', marginBottom:'8px'}}>
                {/* circle */}
                <span style={{border: step<=currentStep?'1px solid black':'1px solid #e9ecef', padding:'5px', borderRadius: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <span style={{backgroundColor: step<=currentStep?'black':'#e9ecef', width:'5px', height:'5px', borderRadius:'100%'}}></span>
                </span>

                {/* progress bar */}
                <div style={{width:'100%', height:'5px', backgroundColor:'#e9ecef', borderRadius:'10px', display: label=='Review Career'?'none':'block'
                }}></div>
            </div>

            {/* label */}
            <p style={{fontWeight:'500', color:step<=currentStep?'black':''}}>{label}</p>
        </div>
    )
}