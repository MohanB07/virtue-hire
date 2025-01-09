"use client"
import { useEffect } from "react";
import { MockInterview } from "../../../../utils/schema";

function Interview({params}) {

    useEffect(() => {
        console.log("from interview" + params.interviewId);
        GetIntervirewDetails();
    }, [])

    const GetIntervirewDetails = async () => {
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))

        console.log(result)
    }

    return (
        <div>Interview</div>
    )
}

export default Interview