interface CareerStepHolderProps {
    label: string;
    children: React.ReactNode;
    customHeader: React.ReactNode;
}

export default function CareerStepHolder({
    label,
    children,
    customHeader
}: CareerStepHolderProps) {
    return (
        <div style={{backgroundColor:'#f8f9fa', padding: '15px 10px', borderRadius:'15px', marginBottom:'20px'}}>
            <div style={{color: 'black', fontWeight:'500', marginLeft:'10px', marginBottom:'15px', display:'flex', alignItems:'center', gap:'5px'}}>
                {label=='Tips'&&<img src='/assets/tips.svg'/>}
                <span style={{fontSize: '18px', }}>{label}</span>
                {customHeader}
            </div>

            <div style={{width: '100%', backgroundColor:'white',border: '1px solid #e9ecef', borderRadius:'10px', padding: '20px'}}>
                {children}
            </div>
        </div>
    )
}