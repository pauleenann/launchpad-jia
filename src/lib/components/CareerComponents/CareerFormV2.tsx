"use client"

import { useEffect, useRef, useState } from "react";
import InterviewQuestionGeneratorV2 from "./InterviewQuestionGeneratorV2";
import RichTextEditor from "@/lib/components/CareerComponents/RichTextEditor";
import CustomDropdown from "@/lib/components/CareerComponents/CustomDropdown";
import philippineCitiesAndProvinces from "../../../../public/philippines-locations.json";
import { candidateActionToast, errorToast } from "@/lib/Utils";
import { useAppContext } from "@/lib/context/AppContext";
import axios from "axios";
import CareerActionModal from "./CareerActionModal";
import FullScreenLoadingAnimation from "./FullScreenLoadingAnimation";
import CareerStepLabel from "./CareerStepLabel";
import CareerStepHolder from "./CareerStepHolder";
// Setting List icons
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
const stepLabels = [
    {
        step:1,
        label:'Career Details'
    },
    {
        step:2,
        label:'CV Review & Pre-screening'
    },
    {
        step:3,
        label:'AI Interview Setup'
    },{
        step:4,
        label:'Review Career'
    }
]

export default function CareerFormV2({ career, formType, setShowEditModal }: { career?: any, formType: string, setShowEditModal?: (show: boolean) => void }) {
    const { user, orgID } = useAppContext();
    const [jobTitle, setJobTitle] = useState(career?.jobTitle || "");
    const [description, setDescription] = useState(career?.description || "");
    const [workSetup, setWorkSetup] = useState(career?.workSetup || "");
    const [workSetupRemarks, setWorkSetupRemarks] = useState(career?.workSetupRemarks || "");
    const [screeningSetting, setScreeningSetting] = useState(career?.screeningSetting || "Good Fit and above");
    const [employmentType, setEmploymentType] = useState(career?.employmentType || "Full-Time");
    const [requireVideo, setRequireVideo] = useState(career?.requireVideo || true);
    const [salaryNegotiable, setSalaryNegotiable] = useState(career?.salaryNegotiable || true);
    const [minimumSalary, setMinimumSalary] = useState(career?.minimumSalary || "");
    const [maximumSalary, setMaximumSalary] = useState(career?.maximumSalary || "");
    const [questions, setQuestions] = useState(career?.questions || [
      {
        id: 1,
        category: "CV Validation / Experience",
        questionCountToAsk: null,
        questions: [],
      },
      {
        id: 2,
        category: "Technical",
        questionCountToAsk: null,
        questions: [],
      },
      {
        id: 3,
        category: "Behavioral",
        questionCountToAsk: null,
        questions: [],
      },
      {
        id: 4,
        category: "Analytical",
        questionCountToAsk: null,
        questions: [],
      },
      {
        id: 5,
        category: "Others",
        questionCountToAsk: null,
        questions: [],
      },
    ]);
    const [country, setCountry] = useState(career?.country || "Philippines");
    const [province, setProvince] = useState(career?.province ||"");
    const [city, setCity] = useState(career?.location || "");
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [showSaveModal, setShowSaveModal] = useState("");
    const [isSavingCareer, setIsSavingCareer] = useState(false);
    const savingCareerRef = useRef(false);
    const [currentStep, setCurrentStep] = useState(1);

    const isFormValid = () => {
        return jobTitle?.trim().length > 0 && description?.trim().length > 0 && questions.some((q) => q.questions.length > 0) && workSetup?.trim().length > 0;
    }

    const updateCareer = async (status: string) => {
        if (Number(minimumSalary) && Number(maximumSalary) && Number(minimumSalary) > Number(maximumSalary)) {
            errorToast("Minimum salary cannot be greater than maximum salary", 1300);
            return;
        }
        let userInfoSlice = {
            image: user.image,
            name: user.name,
            email: user.email,
        };
        const updatedCareer = {
            _id: career._id,
            jobTitle,
            description,
            workSetup,
            workSetupRemarks,
            questions,
            lastEditedBy: userInfoSlice,
            status,
            updatedAt: Date.now(),
            screeningSetting,
            requireVideo,
            salaryNegotiable,
            minimumSalary: isNaN(Number(minimumSalary)) ? null : Number(minimumSalary),
            maximumSalary: isNaN(Number(maximumSalary)) ? null : Number(maximumSalary),
            country,
            province,
            // Backwards compatibility
            location: city,
            employmentType,
        }
        try {
            setIsSavingCareer(true);
            const response = await axios.post("/api/update-career", updatedCareer);
            if (response.status === 200) {
                candidateActionToast(
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, marginLeft: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#181D27" }}>Career updated</span>
                    </div>,
                    1300,
                <i className="la la-check-circle" style={{ color: "#039855", fontSize: 32 }}></i>)
                setTimeout(() => {
                    window.location.href = `/recruiter-dashboard/careers/manage/${career._id}`;
                }, 1300);
            }
        } catch (error) {
            console.error(error);
            errorToast("Failed to update career", 1300);
        } finally {
            setIsSavingCareer(false);
        }
    }
  
    const confirmSaveCareer = (status: string) => {
        if (Number(minimumSalary) && Number(maximumSalary) && Number(minimumSalary) > Number(maximumSalary)) {
        errorToast("Minimum salary cannot be greater than maximum salary", 1300);
        return;
        }

        setShowSaveModal(status);
    }

    const saveCareer = async (status: string) => {
        setShowSaveModal("");
        if (!status) {
          return;
        }

        if (!savingCareerRef.current) {
        setIsSavingCareer(true);
        savingCareerRef.current = true;
        let userInfoSlice = {
            image: user.image,
            name: user.name,
            email: user.email,
        };
        const career = {
            jobTitle,
            description,
            workSetup,
            workSetupRemarks,
            questions,
            lastEditedBy: userInfoSlice,
            createdBy: userInfoSlice,
            screeningSetting,
            orgID,
            requireVideo,
            salaryNegotiable,
            minimumSalary: isNaN(Number(minimumSalary)) ? null : Number(minimumSalary),
            maximumSalary: isNaN(Number(maximumSalary)) ? null : Number(maximumSalary),
            country,
            province,
            // Backwards compatibility
            location: city,
            status,
            employmentType,
        }

        console.log(career)

        try {
            
            const response = await axios.post("/api/add-career", career);
            if (response.status === 200) {
            candidateActionToast(
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, marginLeft: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#181D27" }}>Career added {status === "active" ? "and published" : ""}</span>
                </div>,
                1300, 
            <i className="la la-check-circle" style={{ color: "#039855", fontSize: 32 }}></i>)
            setTimeout(() => {
                window.location.href = `/recruiter-dashboard/careers`;
            }, 1300);
            }
        } catch (error) {
            errorToast("Failed to add career", 1300);
        } finally {
            savingCareerRef.current = false;
            setIsSavingCareer(false);
        }
      }
    }

    useEffect(() => {
        const parseProvinces = () => {
          setProvinceList(philippineCitiesAndProvinces.provinces);
          const defaultProvince = philippineCitiesAndProvinces.provinces[0];
          if (!career?.province) {
            setProvince(defaultProvince.name);
          }
          const cities = philippineCitiesAndProvinces.cities.filter((city) => city.province === defaultProvince.key);
          setCityList(cities);
          if (!career?.location) {
            setCity(cities[0].name);
          }
        }
        parseProvinces();
      },[career])

    return (
        <div className="col">
        {formType === "add" ? (<div style={{ marginBottom: "35px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 550, color: "#111827" }}>Add new career</h1>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                  <button
                  disabled={!isFormValid() || isSavingCareer}
                   style={{ width: "fit-content", color: "#414651", background: "#fff", border: "1px solid #D5D7DA", padding: "8px 16px", borderRadius: "60px", cursor: !isFormValid() || isSavingCareer ? "not-allowed" : "pointer", whiteSpace: "nowrap" }} onClick={() => {
                    confirmSaveCareer("inactive");
                      }}>
                          Save as Unpublished
                  </button>
                  <button 
                  style={{ width: "fit-content", background: "black", color: "#fff", border: "1px solid #E9EAEB", padding: "8px 16px", borderRadius: "60px", whiteSpace: "nowrap", display:'flex', alignItems:'center', gap:'8px', cursor: 'pointer'}}
                  onClick={() => {
                    if(currentStep < 4){
                        setCurrentStep(currentStep + 1);
                    }
                  }}>
                    Save and Continue
                    <i className="las la-arrow-right" style={{fontSize:'20px'}}></i>
                  </button>
                </div>
        </div>) : (
            <div style={{ marginBottom: "35px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 550, color: "#111827" }}>Edit Career Details</h1>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                <button
                 style={{ width: "fit-content", color: "#414651", background: "#fff", border: "1px solid #D5D7DA", padding: "8px 16px", borderRadius: "60px", cursor: "pointer", whiteSpace: "nowrap" }} onClick={() => {
                  setShowEditModal?.(false);
                    }}>
                        Cancel
                </button>
                <button
                  disabled={!isFormValid() || isSavingCareer}
                   style={{ width: "fit-content", color: "#414651", background: "#fff", border: "1px solid #D5D7DA", padding: "8px 16px", borderRadius: "60px", cursor: !isFormValid() || isSavingCareer ? "not-allowed" : "pointer", whiteSpace: "nowrap" }} onClick={() => {
                    updateCareer("inactive");
                    }}>
                          Save Changes as Unpublished
                  </button>
                  <button 
                  disabled={!isFormValid() || isSavingCareer}
                  style={{ width: "fit-content", background: !isFormValid() || isSavingCareer ? "#D5D7DA" : "black", color: "#fff", border: "1px solid #E9EAEB", padding: "8px 16px", borderRadius: "60px", cursor: !isFormValid() || isSavingCareer ? "not-allowed" : "pointer", whiteSpace: "nowrap"}} onClick={() => {
                    updateCareer("active");
                  }}>
                    <i className="la la-check-circle" style={{ color: "#fff", fontSize: 20, marginRight: 8 }}></i>
                      Save Changes as Published
                  </button>
              </div>
       </div>
        )}

        {/* progress bar */}
        <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto 200px', gap: '20px'}}>
            {stepLabels.map((step, index) => (
                <CareerStepLabel 
                key={index} 
                label={step.label}
                step={step.step} 
                currentStep={currentStep}/>
            ))}    
        </div>

        <hr style={{margin: '10px 0'}}/>

        {/* forms */}
        {currentStep === 1 && (
            <div style={{display:'grid', gridTemplateColumns:'1fr 30%', gap:'20px', marginTop:'30px'}}>
                {/* form */}
                <div>
                    {/* Career info */}
                    <CareerStepHolder 
                    label="1. Career Information">
                        {/* basic information */}
                        <p style={{color:'black', fontWeight:'500', margin:'2px'}}>Basic Information</p>
                        <span>Job Title</span>
                        <input
                        value={jobTitle}
                        className="form-control"
                        placeholder="Enter job title"
                        onChange={(e) => {
                            setJobTitle(e.target.value || "");
                        }}
                        ></input>
    
                        {/* work setting */}
                        <p style={{color:'black', fontWeight:'500', margin:'2px', marginTop:'20px'}}>Work Setting</p>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                            <div>
                                <span>Employment Type</span>
                                <CustomDropdown
                                onSelectSetting={(employmentType) => {
                                    setEmploymentType(employmentType);
                                }}
                                screeningSetting={employmentType}
                                settingList={employmentTypeOptions}
                                placeholder="Select Employment Type"
                                />
                            </div>
    
                            <div>
                                <span>Arrangement</span>
                                <CustomDropdown
                                onSelectSetting={(setting) => {
                                    setWorkSetup(setting);
                                }}
                                screeningSetting={workSetup}
                                settingList={workSetupOptions}
                                placeholder="Select Work Setup"
                                />
                            </div>
                        </div>
    
                        {/* location */}
                        <p style={{color:'black', fontWeight:'500', margin:'2px', marginTop:'20px'}}>Location</p>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'20px'}}>
                            {/* country */}
                            <div>
                                <span>Country</span>
                                <CustomDropdown
                                onSelectSetting={(setting) => {
                                    setCountry(setting);
                                }}
                                screeningSetting={country}
                                settingList={[]}
                                placeholder="Select Country"
                                />
                            </div>

                            {/* state and province */}
                            <div>
                                <span>State / Province</span>
                                <CustomDropdown
                                onSelectSetting={(province) => {
                                    setProvince(province);
                                    const provinceObj = provinceList.find((p) => p.name === province);
                                    const cities = philippineCitiesAndProvinces.cities.filter((city) => city.province === provinceObj.key);
                                    setCityList(cities);
                                    setCity(cities[0].name);
                                }}
                                screeningSetting={province}
                                settingList={provinceList}
                                placeholder="Select State / Province"
                                />
                            </div>

                            {/* city */}
                            <div>
                                <span>City</span>
                                <CustomDropdown
                                onSelectSetting={(city) => {
                                    setCity(city);
                                }}
                                screeningSetting={city}
                                settingList={cityList}
                                placeholder="Select City"
                                />
                            </div>
                        </div>
    
                        {/* salary */}
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",marginTop:'20px' }}>
                          <span style={{fontSize: 16, color: "#181D27", fontWeight: 700}}>Salary</span>

                          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 8, minWidth: "130px" }}>
                              <label className="switch">
                                  <input type="checkbox" checked={salaryNegotiable} onChange={() => setSalaryNegotiable(!salaryNegotiable)} />
                                  <span className="slider round"></span>
                              </label>
                              <span>{salaryNegotiable ? "Negotiable" : "Fixed"}</span>
                          </div>
                        </div>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                            {/* minimum salary */}
                           <div>
                            <span>Minimum Salary</span>
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
                                    className="form-control"
                                    style={{ paddingLeft: "28px" }}
                                    placeholder="0"
                                    min={0}
                                    value={minimumSalary}
                                    onChange={(e) => {
                                        setMinimumSalary(e.target.value || "");
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
                                    className="form-control"
                                    style={{ paddingLeft: "28px" }}
                                    placeholder="0"
                                    min={0}
                                    value={maximumSalary}
                                    onChange={(e) => {
                                    setMaximumSalary(e.target.value || "");
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
                            </div>
                            
                        </div>
    
    
                    </CareerStepHolder>
    
                    {/* job description */}
                    <CareerStepHolder 
                    label="2. Job Description">
                        {/* react quill */}
                        <RichTextEditor setText={setDescription} text={description} />
                    </CareerStepHolder>
                </div>
    
                {/* tips */}
                <div>
                    <CareerStepHolder
                    label={'Tips'}>
                        <p style={{fontWeight:'500'}}><strong style={{color:'black'}}>Use clear, standard job titles</strong> for better searchability (e.g., “Software Engineer” instead of “Code Ninja” or “Tech Rockstar”).</p>
                        <p style={{fontWeight:'500'}}><strong style={{color:'black'}}>Avoid abbreviations</strong> or internal role codes that applicants may not understand (e.g., use “QA Engineer” instead of “QE II” or “QA-TL”).</p>
                        <p style={{fontWeight:'500'}}><strong style={{color:'black'}}>Keep it concise</strong> – job titles should be no more than a few words (2–4 max), avoiding fluff or marketing terms.</p>
                    </CareerStepHolder>
                </div>
    
            </div>
        )}
        

       
        
        

        
    </div>
    )
}