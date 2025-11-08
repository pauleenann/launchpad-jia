import { useState } from "react";
import CustomDropdown from "./CustomDropdown";

const questionTypes = [
    { name: "Short Answer", icon: '' },
    { name: "Long Answer", icon: '' },
    { name: "Dropdown", icon: '' },
    { name: "Checkboxes", icon: '' },
    { name: "Range", icon: "" },
];

export default function CareerPreScreeningQuestion({ index, question, screeningInfo, setScreeningInfo }: any) {
    const [isQuestionDisabled, setIsQuestionDisabled] = useState(true);
    const [questionValue, setQuestionValue] = useState(question?.question || '');

    // handle change for dropdown
    const handleChange = (type: string) => {
        const updatedQuestions = screeningInfo.preScreeningQuestions.map((q) =>
            q.category === question.category ? { ...q, questionType: type } : q
        );
        setScreeningInfo({ ...screeningInfo, preScreeningQuestions: updatedQuestions });
    };

    // save question text
    const saveQuestion = () => {
        const updatedQuestions = screeningInfo.preScreeningQuestions.map((q) =>
            q.category === question.category ? { ...q, question: questionValue } : q
        );
        setScreeningInfo({ ...screeningInfo, preScreeningQuestions: updatedQuestions });
        setIsQuestionDisabled(true);
    };

    // add option
    const handleAddOption = () => {
        const updatedQuestion = { ...question, options: [...question.options, ''] };
        const updatedQuestions = screeningInfo.preScreeningQuestions.map((q) =>
            q.category === question.category ? updatedQuestion : q
        );
        setScreeningInfo({ ...screeningInfo, preScreeningQuestions: updatedQuestions });
    };

    // delete question
    const handleDeleteQuestion = () => {
        const updatedQuestions = screeningInfo.preScreeningQuestions.filter((q) => q.category != question.category);
        setScreeningInfo({ ...screeningInfo, preScreeningQuestions: updatedQuestions });
    };

    // delete option by index
    const handleDeleteOption = (index: number) => {
        const updatedOptions = question.options.filter((_, i) => i != index);
        const updatedQuestion = { ...question, options: updatedOptions };
        const updatedQuestions = screeningInfo.preScreeningQuestions.map((q) =>
            q.category === question.category ? updatedQuestion : q
        );
        setScreeningInfo({ ...screeningInfo, preScreeningQuestions: updatedQuestions });
    };

    // update option text by index
    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = question.options.map((opt, i) => (i === index ? value : opt));
        const updatedQuestion = { ...question, options: updatedOptions };
        const updatedQuestions = screeningInfo.preScreeningQuestions.map((q) =>
            q.category === question.category ? updatedQuestion : q
        );
        setScreeningInfo({ ...screeningInfo, preScreeningQuestions: updatedQuestions });
    };

    return (
        <div draggable key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <i className="las la-grip-vertical" style={{ fontSize: '25px', cursor: 'grab' }}></i>
            <div style={{ backgroundColor: 'white', border: '1px solid #e9ecef', width: '100%', borderRadius: '10px' }}>
                {/* header */}
                <header style={{ padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '5px', backgroundColor: '#f8f9fa' }}>
                    <input
                        readOnly={isQuestionDisabled}
                        style={{
                            padding: '15px',
                            width: '100%',
                            height: '45px',
                            borderRadius: '5px',
                            border: 'none',
                            outline: 'none',
                            background: isQuestionDisabled ? '#f8f9fa' : 'white',
                            boxShadow: !isQuestionDisabled ? '0px 2px 2px rgba(0, 0, 0, 0.11)' : 'none',
                            cursor: isQuestionDisabled ? 'pointer' : 'text'
                        }}
                        type="text"
                        value={questionValue}
                        placeholder="Write your question..."
                        onClick={() => setIsQuestionDisabled(false)}
                        onChange={(e) => setQuestionValue(e.target.value)}
                        onBlur={saveQuestion}
                        onKeyDown={(e) => { if (e.key === 'Enter') saveQuestion(); }}
                    />

                    <div style={{ width: '50%' }}>
                        <CustomDropdown
                            onSelectSetting={handleChange}
                            screeningSetting={question?.questionType || ''}
                            settingList={questionTypes}
                            placeholder="Select question type"
                        />
                    </div>
                </header>

                <footer style={{ padding: '15px' }}>
                    {question.questionType == 'Dropdown' && (
                        <>
                            {question.options.map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', marginBottom: '10px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr', height: '50px', borderRadius: '5px', border: '1px solid #e9ecef', color: 'black', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #e9ecef' }}>{index + 1}</div>
                                        <input
                                            type="text"
                                            value={item}
                                            style={{ width: '100%', border: 'none', outline: 'none', padding: '0 15px' }}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                        />
                                    </div>

                                    <button
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '35px', width: '35px', borderRadius: '100%', border: '1px solid #e9ecef', backgroundColor: 'white' }}
                                        onClick={() => handleDeleteOption(index)}
                                    >
                                        <i className="las la-times"></i>
                                    </button>
                                </div>
                            ))}

                            <button
                                style={{ backgroundColor: "transparent", border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', outline: 'none', cursor: 'pointer', marginTop: '10px' }}
                                onClick={handleAddOption}
                            >
                                <i className="las la-plus" style={{ fontSize: '25px' }}></i>
                                Add option
                            </button>
                        </>
                    )}

                    <hr />

                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <button
                            style={{ backgroundColor: "transparent", border: '1px solid red', borderRadius: '50px', color: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', outline: 'none', cursor: 'pointer', padding: '5px 10px', fontWeight: '500' }}
                            onClick={handleDeleteQuestion}
                        >
                            <i className="las la-trash"></i>
                            Delete Question
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}
