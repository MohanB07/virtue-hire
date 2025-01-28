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
                className="p-8 border rounded-lg bg-white/5 backdrop-blur-sm
                hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-300
                border-gray-800/10 shadow-lg"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="text-lg text-center font-semibold">+ Add New</h2>
            </div>

            {/* Dialog Component */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                {/* Form Inside the Dialog */}
                <form onSubmit={onSubmit} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl mt-5">
                    <div className="space-y-4">
                        {/* Title */}
                        <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Tell me more about Job and Interview
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-xs">
                            Add details about job position, your skills, and years of experience
                        </p>

                        {/* Form Fields */}
                        <div className="space-y-3">
                            {/* Job Position Input */}
                            <div className="space-y-2">
                                <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700">
                                    Job Position / Role name
                                </label>
                                <input
                                    type="text"
                                    id="jobPosition"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                    placeholder="Enter job position"
                                    required
                                    onChange={(e) => setJobPosition(e.target.value)}
                                />
                            </div>

                            {/* Job Description Input */}
                            <div className="space-y-2">
                                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                                    Job Description / Tech Stack (short)
                                </label>
                                <input
                                    type="text"
                                    id="jobDescription"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                    placeholder="Enter job description or tech stack"
                                    required
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>

                            {/* Years of Experience Input */}
                            <div className="space-y-2">
                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                                    No of Years Experience
                                </label>
                                <input
                                    type="number"
                                    id="experience"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                    placeholder="Enter years of experience"
                                    required
                                    onChange={(e) => setJobExperience(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                className="px-6 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 font-medium"
                                onClick={() => setOpenDialog(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                                disabled={loading}
                            >
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
