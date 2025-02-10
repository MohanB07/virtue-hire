"use client"
import { Mic, StopCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from "react-webcam";
import { toast } from "sonner";
import Button from "../../../../../../@/components/ui/button";

function RecordAnswerSection() {
    const [userAnswer, setUserAnswer] = useState('');

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        // Clear previous answer when results change
        if (results.length) {
            setUserAnswer(results[results.length - 1]?.transcript);  // Only store the latest result to prevent appending
        }
    }, [results]);

    const SaveUserAnswer = () => {
        if(isRecording) {
            setUserAnswer('');
            stopSpeechToText()

            if(userAnswer?.length<10) {
                toast('Error while saving your answer, Please record again')
                return;
            }

            const feedbackPrompt = "Question:"

        } else {
            setUserAnswer('');
            startSpeechToText()
        }
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
                <Image src={'/lg.png'} width={200} height={200} alt="webCam"
                    className="absolute" />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }} />
            </div>
            <Button className=" !bg-gray-100 px-4 py-2 my-10 text-black"
            onClick={SaveUserAnswer}>
                {isRecording?
                <h2 className="text-red-600 flex gap-2">
                    <StopCircle />Stop Recording
                </h2>
                :
                <h2 className="text-[#4845d2] flex gap-2 items-center">
                    <Mic />'Record Answer'
                </h2>
                
                }</Button>
            <Button onClick={() => {console.log(userAnswer)}}> Show ans </Button>
        </div>
    );
};

export default RecordAnswerSection