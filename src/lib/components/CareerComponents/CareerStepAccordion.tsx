export default function CareerStepAccordion({label, isOpen, setIsOpen, edit, children}:any){
    return (
        <div style={{width:'100%', backgroundColor:"#f8f9fa", borderRadius:"10px", padding:'10px 20px', marginBottom:'10px'}}>
            {/* header */}
            <header style={{width:'100%', height:'50px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:"center", gap:'10px'}}>
                    {!isOpen&&<i style={{cursor:'pointer'}} onClick={setIsOpen} className="las la-angle-down"></i>}
                    {isOpen&&<i style={{cursor:'pointer'}} onClick={setIsOpen} className="las la-angle-up"></i>}
                    <span style={{color:'black', fontWeight:'500', fontSize:'18px'}}>{label}</span>
                </div>

                {/* edit */}
                <button 
                style={{height:'30px', width:'30px', borderRadius:'100%', backgroundColor:'white', border:'1px solid gray', outline:'0', cursor:'pointer'}}
                onClick={edit}>
                    <i className="las la-pen"></i>
                </button>
            </header>

            {isOpen&&
            <section style={{backgroundColor:'white', padding:'25px', borderRadius:"10px", border:'1px solid #e9ecef', marginTop:'10px'}}>
                {children}
            </section>}
        </div>
    )
}