import CareerStepHolder from "./CareerStepHolder";
import CustomDropdown from "./CustomDropdown";
import philippineCitiesAndProvinces from "../../../../public/philippines-locations.json";
import RichTextEditor from "./RichTextEditor";

const workSetupOptions = [
    {
        name: "Fully Remote",
    },
    {
        name: "Onsite",
    },
    {
        name: "Hybrid",
    },
];
const employmentTypeOptions = [
    {
        name: "Full-Time",
    },
    {
        name: "Part-Time",
    },
];

export default function CareerStep1({careerDetails, setCareerDetails, errors}:any){
    const {
        jobTitle,
        description,
        workSetup,
        workSetupRemarks,
        employmentType,
        salaryNegotiable,
        minimumSalary,
        maximumSalary,
        country,
        province,
        city,
        provinceList,
        cityList,
    } = careerDetails;
    
    return (
        <div style={{display:'grid', gridTemplateColumns:'1fr 30%', gap:'20px', marginTop:'30px'}}>
            {/* form */}
            <div>
                {/* Career info */}
                <CareerStepHolder 
                label="1. Career Information"
                customHeader={''}>
                    {/* basic information */}
                    <p style={{color:'#2a2a2a', fontWeight:'500', margin:'2px'}}>Basic Information</p>
                    <span>Job Title</span>
                    <input
                    value={jobTitle}
                    className={`form-control ${errors.jobTitle&&'error-input'}`}
                    placeholder="Enter job title"
                    onChange={(e) => {
                        setCareerDetails({...careerDetails, jobTitle: e.target.value || ""});
                    }}
                    ></input>
                    <p className="error">{errors?.jobTitle&&errors.jobTitle}</p>


                    {/* work setting */}
                    <p style={{color:'#2a2a2a', fontWeight:'500', margin:'2px', marginTop:'20px'}}>Work Setting</p>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                        <div>
                            <span>Employment Type</span>
                            <CustomDropdown
                            onSelectSetting={(employmentType) => {
                                setCareerDetails({...careerDetails, employmentType: employmentType});
                            }}
                            screeningSetting={employmentType}
                            settingList={employmentTypeOptions}
                            placeholder="Select Employment Type"
                            error={errors?.employmentType||''}
                            />
                            <p className="error">{errors?.employmentType&&errors.employmentType}</p>
                        </div>

                        <div>
                            <span>Arrangement</span>
                            <CustomDropdown
                            onSelectSetting={(setting) => {
                                setCareerDetails({...careerDetails, workSetup: setting});
                            }}
                            screeningSetting={workSetup}
                            settingList={workSetupOptions}
                            placeholder="Select Work Setup"
                            error={errors.workSetup||''}
                            />
                            <p className="error">{errors?.workSetup&&errors.workSetup}</p>
                        </div>
                    </div>

                    {/* location */}
                    <p style={{color:'#2a2a2a', fontWeight:'500', margin:'2px', marginTop:'20px'}}>Location</p>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'20px'}}>
                        {/* country */}
                        <div>
                            <span>Country</span>
                            <CustomDropdown
                            onSelectSetting={(setting) => {
                                setCareerDetails({...careerDetails, country: setting});
                            }}
                            screeningSetting={country}
                            settingList={[]}
                            placeholder="Select Country"
                            error={errors.country||''}/>
                            <p className="error">{errors?.country&&errors.country}</p>
                        </div>

                        {/* state and province */}
                        <div>
                            <span>State / Province</span>
                            <CustomDropdown
                            onSelectSetting={(province) => {
                                setCareerDetails({...careerDetails, province: province});
                                const provinceObj = provinceList.find((p) => p.name === province);
                                const cities = philippineCitiesAndProvinces.cities.filter((city) => city.province === provinceObj.key);
                                setCareerDetails({...careerDetails, 
                                cityList: cities, 
                                city: cities[0].name});
                            }}
                            screeningSetting={province}
                            settingList={provinceList}
                            placeholder="Select State / Province"
                            error={errors.province&&''}/>
                            <p className="error">{errors?.province&&errors.province}</p>
                        </div>

                        {/* city */}
                        <div>
                            <span>City</span>
                            <CustomDropdown
                            onSelectSetting={(city) => {
                                setCareerDetails({...careerDetails, city: city});
                            }}
                            screeningSetting={city}
                            settingList={cityList}
                            placeholder="Select City"
                            />
                            <p className="error">{errors?.city&&errors.city}</p>
                        </div>
                    </div>

                    {/* salary */}
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",marginTop:'20px' }}>
                        <span style={{fontSize: 16, color: "#181D27", fontWeight: 700}}>Salary</span>

                        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 8, minWidth: "130px" }}>
                            <label className="switch">
                                <input type="checkbox" checked={salaryNegotiable} onChange={() => setCareerDetails({...careerDetails, salaryNegotiable: !salaryNegotiable})} />
                                <span className="slider round"></span>
                            </label>
                            <span>{salaryNegotiable ? "Negotiable" : "Fixed"}</span>
                        </div>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                        {/* minimum salary */}
                        <div>
                        <span>Minimum Salary</span>
                            <div 
                            style={{ position: "relative" }}>
                                <span
                                style={{
                                    position: "absolute",
                                    left: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#6c757d",
                                    fontSize: "16px",
                                    pointerEvents: "none",
                                }}
                                >
                                P
                                </span>
                                <input
                                type="number"
                                className={`form-control ${errors.minimumSalary&&'error-input'}`}
                                style={{ paddingLeft: "28px" }}
                                placeholder="0"
                                min={0}
                                value={minimumSalary}
                                onChange={(e) => {
                                    setCareerDetails({...careerDetails, minimumSalary: e.target.value || ""});
                                }}
                                />
                            <span style={{
                                position: "absolute",
                                right: "30px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#6c757d",
                                fontSize: "16px",
                                pointerEvents: "none",
                            }}>
                                PHP
                            </span>
                            </div>
                            <p className="error">{errors?.minimumSalary&&errors.minimumSalary}</p>
                        </div>
                        
                        {/* maximum salary */}
                        <div>
                            <span>Maximum Salary</span>
                            <div style={{ position: "relative" }}>
                            <span
                                style={{
                                    position: "absolute",
                                    left: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#6c757d",
                                    fontSize: "16px",
                                    pointerEvents: "none",
                                }}
                                >
                                P
                                </span>
                            <input
                                type="number"
                                className={`form-control ${errors.maximumSalary&&'error-input'}`}
                                style={{ paddingLeft: "28px" }}
                                placeholder="0"
                                min={0}
                                value={maximumSalary}
                                onChange={(e) => {
                                setCareerDetails({...careerDetails, maximumSalary: e.target.value || ""});
                                }}
                            ></input>
                            <span style={{
                                position: "absolute",
                                right: "30px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#6c757d",
                                fontSize: "16px",
                                pointerEvents: "none",
                            }}>
                                PHP
                            </span>
                            </div>
                            <p className="error">{errors?.maximumSalary&&errors.maximumSalary}</p>
                        </div>
                    </div>
                </CareerStepHolder>

                {/* job description */}
                <CareerStepHolder 
                label="2. Job Description"
                customHeader={''}>
                    {/* react quill */}
                    <RichTextEditor 
                    setText={(data)=>setCareerDetails({...careerDetails, description: data})} 
                    text={description} 
                    error={errors.description||''}/>
                    <p className="error">{errors?.description&&errors.description}</p>
                </CareerStepHolder>
            </div>

            {/* tips */}
            <div>
                <CareerStepHolder
                label={'Tips'}
                customHeader={''}>
                    <p style={{fontWeight:'400'}}><strong style={{color:'#2a2a2a'}}>Use clear, standard job titles</strong> for better searchability (e.g., “Software Engineer” instead of “Code Ninja” or “Tech Rockstar”).</p>
                    <p style={{fontWeight:'400'}}><strong style={{color:'#2a2a2a'}}>Avoid abbreviations</strong> or internal role codes that applicants may not understand (e.g., use “QA Engineer” instead of “QE II” or “QA-TL”).</p>
                    <p style={{fontWeight:'400'}}><strong style={{color:'#2a2a2a'}}>Keep it concise</strong> – job titles should be no more than a few words (2–4 max), avoiding fluff or marketing terms.</p>
                </CareerStepHolder>
            </div>

        </div>
    )
}