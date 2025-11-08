export default function CareerStepLabel({ 
    label,
    step,
    currentStep,
    errors = 0 // number of errors
}) {
    const hasErrors = step === currentStep && errors > 0;

    // Determine progress width and gradient
    const isDoneStep = step < currentStep;
    const progressWidth = isDoneStep || (step === currentStep && !hasErrors) ? '100%' : '0%';
    const progressBackground = isDoneStep
        ? 'linear-gradient(to right, #f08080, #cdb4db, #bde0fe)' // gradient for done steps
        : ''

    return (
        <div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                {/* circle */}
                {hasErrors ? (
                    <i style={{ color: 'red', fontSize: '20px' }} className="las la-exclamation-triangle"></i>
                ) : 
                isDoneStep && !hasErrors?
                    <img src="/assets/check.svg" alt="Done" />
                : (
                    <span style={{
                        border: step <= currentStep ? '1px solid black' : '1px solid #e9ecef',
                        padding: '5px',
                        borderRadius: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{
                            backgroundColor: step <= currentStep ? 'black' : '#e9ecef',
                            width: '5px',
                            height: '5px',
                            borderRadius: '100%'
                        }}></span>
                    </span>
                )}

                {/* progress bar */}
                {step<4?<div style={{
                    width: '100%',
                    height: '5px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: progressWidth,
                        height: '100%',
                        background: progressBackground,
                        transition: 'width 0.3s ease-in-out'
                    }}></div>
                </div>:''}
                
            </div>

            {/* label */}
            <p style={{ fontWeight: '500', color: step <= currentStep ? 'black' : '#6c757d' }}>{label}</p>
        </div>
    )
}
