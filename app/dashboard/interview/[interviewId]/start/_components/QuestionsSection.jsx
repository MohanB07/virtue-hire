import { Lightbulb, Volume2 } from "lucide-react";
import { useEffect } from "react";

function QuestionsSection({ mockInterviewQuestions, activeQuestionIndex }) {

    const textToSpeech = (text) => {
        if('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry, Your browser does not support this feature.')
        }
    }

    useEffect(() => {
        console.log("from start page")
        console.log("from q sec : " + mockInterviewQuestions)
    },[])

    
    return mockInterviewQuestions&&(
        <div className="p-5 border rounded-lg my-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {mockInterviewQuestions && mockInterviewQuestions.map((question, index) => (
                    <h2 key={index} className={`p-2 bg-secondary rounded-full
                    text-sm font-semibold md:text-sm text-center cursor-pointer
                    ${activeQuestionIndex==index&&'bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-white'}`}> Question #{index+1} </h2>
                ))}

            </div>
            <h2 className="my-5 text-lg font-bold md:text-lg"> {mockInterviewQuestions[activeQuestionIndex]?.question} </h2>
            <Volume2
            className="cursor-pointer rounded-lg border-black"
            onClick={() => {
                if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel(); // Stop TTS if it's already playing
                } else {
                textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question);
                }
            }}
            />
            <div className="border rounded-lg p-5 bg-blue-100 mt-20">
                <h2 className="flex gap-2 items-center text-primary">
                    <Lightbulb />
                    <strong className="text-md"> NOTE: </strong>
                </h2>
                <h2 className="text-md text-justify text-primary my-2">
                    {process.env.NEXT_PUBLIC_QUESTION_NOTE}
                </h2>
            </div>
        </div>
    )
}

export default QuestionsSection