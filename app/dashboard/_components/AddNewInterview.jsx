"use client";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Dialog from "../../../@/components/ui/dialog";
import { chatSession } from "../../../utils/GeminiAIModel";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDescription, setJobDescription] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const {user} = useUser();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDescription, jobExperience);

        const InputPrompt = "Job Position : "+jobPosition+",  Job Description : "+jobDescription+", Job Experience : "+jobExperience+", depending on this information provide "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions with answers in json format"
        
        const result = await chatSession.sendMessage(InputPrompt);

        const MockJsonResponse = (result.response.text()).replace('```json', '').replace('```', '');

        // console.log(JSON.parse(MockJsonResponse));
        setJsonResponse(MockJsonResponse);

        if(MockJsonResponse){
            const response = await db.insert(MockInterview)
            .values({
                mockId: uuidv4(),
                jsonMockResp: MockJsonResponse,
                jobPosition: jobPosition,
                jobDesc: jobDescription,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            }).returning({mockId: MockInterview.mockId});

            console.log("Inserted ID : " + response)

            if(response){
                setOpenDialog(false);
                router.push('/dashboard/interview/'+response[0]?.mockId)
            }

        } else {
            console.log("ERROR");
        }
        

        setLoading(false);
    }

    return (
        <div>
        {/* Add New Button */}
        <div
            className="p-10 border rounded-lg bg-secondary
            hover:scale-105 hover:shadow-md cursor-pointer transition-all"
            onClick={() => setOpenDialog(true)}
        >
            <h2 className="text-lg text-center">+ Add New</h2>
        </div>

        {/* Dialog Component */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            {/* Form Inside the Dialog */}
            <form onSubmit={onSubmit}>
            <div style={dialogStyles.formContainer}>
            {/* Title */}
            <h3 style={dialogStyles.title}>Tell me more about Job and Interview</h3>

            {/* Description */}
            <p style={dialogStyles.description}>
                Add details about job position, your skills, and years of experience
            </p>

            {/* Job Position Input */}
            <label htmlFor="jobPosition" style={dialogStyles.inputLabel}>
                Job Position / Role name
            </label>
            <input
                type="text"
                id="jobPosition"
                style={dialogStyles.inputField}
                placeholder="Enter job position"
                required
                onChange={(e) => setJobPosition(e.target.value)}
            />

            {/* Job Description Input */}
            <label htmlFor="jobDescription" style={dialogStyles.inputLabel}>
                Job Description / Tech Stack (short)
            </label>
            <input
                type="text"
                id="jobDescription"
                style={dialogStyles.inputField}
                placeholder="Enter job description or tech stack"
                required
                onChange={(e) => setJobDescription(e.target.value)}
            />

            {/* Years of Experience Input */}
            <label htmlFor="experience" style={dialogStyles.inputLabel}>
                No of Years Experience
            </label>
            <input
                type="number"
                id="experience"
                style={dialogStyles.inputField}
                placeholder="Enter years of experience"
                required
                onChange={(e) => setJobExperience(e.target.value)}
            />

            {/* Buttons */}
            <div style={dialogStyles.buttonsContainer}>
                <button
                    type="button"
                    style={dialogStyles.cancelButton}
                    onClick={() => setOpenDialog(false)}
                >
                    Cancel
                </button>
                <button type="submit" style={dialogStyles.startButton} disabled={loading}>
                    {loading ? (
                    <div className="flex items-center">
                        <LoaderCircle className="animate-spin mr-2" size={16} />
                        Generating
                        </div>
                        ) : (
                        'Start Interview'
                    )}
                </button>
            </div>
            </div>
        </form>
        </Dialog>
        </div>
    );
    }

    // Custom Styles for Form and Dialog Content
    const dialogStyles = {
    formContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "flex-start",
    },
    title: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    description: {
        fontSize: "1rem",
        marginBottom: "5px",
    },
    inputLabel: {
        fontSize: "0.8rem",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    inputField: {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        marginBottom: "10px",
    },
    cancelButton: {
        padding: "5px 20px",
        backgroundColor: "#e5e5e5",
        border: "1px solid black",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
    },
    startButton: {
        padding: "5px 20px",
        width: "50%",
        backgroundColor: "#4845d2",
        border: "none",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        width: "100%",
    },
    };

export default AddNewInterview;
