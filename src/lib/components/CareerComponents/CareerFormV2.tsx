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
import CareerStep1 from "./CareerStep1";
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
    const [careerDetails, setCareerDetails] = useState({
        jobTitle: career?.jobTitle || "",
        description: career?.description || "",
        workSetup: career?.workSetup || "",
        workSetupRemarks: career?.workSetupRemarks || "",
        employmentType: career?.employmentType || "Full-Time",
        salaryNegotiable: career?.salaryNegotiable || true,
        minimumSalary: career?.minimumSalary || "",
        maximumSalary: career?.maximumSalary || "",
        country: career?.country || "Philippines",
        province: career?.province || "",
        city: career?.location || "",
        provinceList:[],
        cityList:[],
    });

  
    const [screeningSetting, setScreeningSetting] = useState(career?.screeningSetting || "Good Fit and above");
    const [requireVideo, setRequireVideo] = useState(career?.requireVideo || true);
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
    const [showSaveModal, setShowSaveModal] = useState("");
    const [isSavingCareer, setIsSavingCareer] = useState(false);
    const savingCareerRef = useRef(false);
    const [currentStep, setCurrentStep] = useState(1);

    const isFormValid = () => {
        return careerDetails.jobTitle?.trim().length > 0 && careerDetails.description?.trim().length > 0 && questions.some((q) => q.questions.length > 0) && careerDetails.workSetup?.trim().length > 0;
    }

    const updateCareer = async (status: string) => {
        if (Number(careerDetails.minimumSalary) && Number(careerDetails.maximumSalary) && Number(careerDetails.minimumSalary) > Number(careerDetails.maximumSalary)) {
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
            jobTitle: careerDetails.jobTitle,
            description: careerDetails.description,
            workSetup: careerDetails.workSetup,
            workSetupRemarks: careerDetails,
            questions,
            lastEditedBy: userInfoSlice,
            status,
            updatedAt: Date.now(),
            screeningSetting,
            requireVideo,
            salaryNegotiable: careerDetails,
            minimumSalary: isNaN(Number(careerDetails.minimumSalary)) ? null : Number(careerDetails.minimumSalary),
            maximumSalary: isNaN(Number(careerDetails.maximumSalary)) ? null : Number(careerDetails.maximumSalary),
            country: careerDetails.country,
            province: careerDetails.province,
            // Backwards compatibility
            location: careerDetails.city,
            employmentType: careerDetails.employmentType,
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
        if (Number(careerDetails.minimumSalary) && Number(careerDetails.maximumSalary) && Number(careerDetails.minimumSalary) > Number(careerDetails.maximumSalary)) {
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
            jobTitle: careerDetails.jobTitle,
            description: careerDetails.description,
            workSetup: careerDetails,
            workSetupRemarks: careerDetails.workSetupRemarks,
            questions,
            lastEditedBy: userInfoSlice,
            createdBy: userInfoSlice,
            screeningSetting,
            orgID,
            requireVideo,
            salaryNegotiable: careerDetails.salaryNegotiable,
            minimumSalary: isNaN(Number(careerDetails.minimumSalary)) ? null : Number(careerDetails.minimumSalary),
            maximumSalary: isNaN(Number(careerDetails.maximumSalary)) ? null : Number(careerDetails.maximumSalary),
            country: careerDetails.country,
            province: careerDetails.province,
            // Backwards compatibility
            location: careerDetails.city,
            status,
            employmentType: careerDetails.employmentType,
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
            const defaultProvince = philippineCitiesAndProvinces.provinces[0];
            const cities = philippineCitiesAndProvinces.cities.filter((city) => city.province === defaultProvince.key);

            setCareerDetails({...careerDetails, 
                provinceList: philippineCitiesAndProvinces.provinces,
                province: career?.province || defaultProvince.name,
                cityList: cities,
                city: career?.location || cities[0].name, 
            });
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
                  disabled={!isFormValid() || isSavingCareer}
                  style={{ width: "fit-content", background: "black", color: "#fff", border: "1px solid #E9EAEB", padding: "8px 16px", borderRadius: "60px", whiteSpace: "nowrap", display:'flex', alignItems:'center', gap:'8px', cursor: 'pointer'}}
                  onClick={() => {
                    // if(currentStep < 4){
                    //     setCurrentStep(currentStep + 1);
                    // }
                    console.log(careerDetails)
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
            <CareerStep1 
            careerDetails={careerDetails}
            setCareerDetails={setCareerDetails}/>
        )}
        

       
        
        

        
    </div>
    )
}