export default function CareerStepHolder({
    label,
    children
}) {
    return (
        <div style={{backgroundColor:'#f8f9fa', padding: '15px 10px', borderRadius:'15px', marginBottom:'20px'}}>
            <p style={{color: 'black', fontWeight:'500', fontSize: '18px', marginLeft:'10px'}}>{label}</p>

            <div style={{width: '100%', backgroundColor:'white',border: '1px solid #e9ecef', borderRadius:'10px', padding: '20px'}}>
                {children}
            </div>
        </div>
    )
}