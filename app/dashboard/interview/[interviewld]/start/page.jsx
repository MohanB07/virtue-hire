"use client"
import { eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
function StartInterview() {
    const params = useParams();
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails(params?.interviewId);
    }, [])

    const GetInterviewDetails = async (id) => {
            try {
                const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, id));

                const jsonMockResponse = JSON.parse(result[0].jsonMockResp)
                setMockInterviewQuestions(jsonMockResponse.interviewQuestions || jsonMockResponse.interview_questions);
                console.log("Mock JSON response : ", jsonMockResponse);
                setInterviewData(result[0]);
            } catch (error) {
                console.error("Error fetching interview details:", error);
            }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Questions */}
            <QuestionsSection
            mockInterviewQuestions={mockInterviewQuestions}
            activeQuestionIndex={activeQuestionIndex}
            />

            {/* Video/Audio Recording */}
            <RecordAnswerSection
            mockInterviewQuestions={mockInterviewQuestions}
            activeQuestionIndex={activeQuestionIndex}
            />

            </div>
        </div>
    )
}

export default StartInterview