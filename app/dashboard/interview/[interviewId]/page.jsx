"use client";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Button from "../../../../@/components/ui/button";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";

const Toaster = ({ message, show, onClose }) => {
    if (!show) return null;
    return (
        <div className="fixed bottom-5 right-5 p-4 bg-red-500 text-white rounded-md shadow-lg">
            {message}
            <button className="ml-2 font-bold" onClick={onClose}>
                ✖
            </button>
        </div>
    );
};

export function Interview() {
    const params = useParams();
    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (params?.interviewId) {
            GetInterviewDetails(params.interviewId);
        } else {
            console.error("No interview ID found in params");
        }
    }, [params]);

    const GetInterviewDetails = async (id) => {
        try {
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, id));
            setInterviewData(result[0]);
            console.log("DB Results:", result);
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };

    const handleStartInterview = () => {
        if (!webCamEnabled) {
            setShowToast(true);
        }
    };

    return (
        <div className="my-10">
            <h2 className="font-bold text-2xl -mt-4">Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col my-5 gap-5">
                    <div className="flex flex-col p-5 rounded-lg border gap-5">
                        <h2 className="mt-2 text-lg">
                            <strong>Job Role/Job Position: </strong>
                            {interviewData?.jobPosition || "Loading..."}
                        </h2>
                        <h2 className="mt-2 text-lg">
                            <strong>Job Description/Tech Stack: </strong>
                            {interviewData?.jobDesc || "Loading..."}
                        </h2>
                        <h2 className="mt-2 text-lg">
                            <strong>Years of Experience: </strong>
                            {interviewData?.jobExperience || "Loading..."}
                        </h2>
                    </div>
                    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                        <h2 className="flex gap-2 items-center text-yellow-500"> <Lightbulb /><strong>Information</strong> </h2>
                        <h2 className="mt-3 text-yellow-500 -px-4"> {process.env.NEXT_PUBLIC_INFORMATION} </h2>
                    </div>
                </div>
                <div>
                    {webCamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{ height: 300, width: 300 }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                            <Button
                                className=" !bg-gray-400 hover:bg-black hover:text-white w-full px-32 py-2 whitespace-nowrap"
                                onClick={() => setWebCamEnabled(true)}
                            >
                                Enable Web Cam and Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-end mt-4">
                {webCamEnabled ? (
                    <Link href={'/dashboard/interview/' + params?.interviewId + '/start'}>
                        <Button className=" bg-[#4845d2] px-6 py-2">Start Interview</Button>
                    </Link>
                ) : (
                    <Button className=" bg-[#4845d2] px-6 py-2" onClick={handleStartInterview}>
                        Start Interview
                    </Button>
                )}
            </div>

            <Toaster
                message="Please enable your webcam and microphone before starting the interview."
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}

export default Interview;
