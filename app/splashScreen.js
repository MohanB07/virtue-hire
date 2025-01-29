"use client";
import { useEffect } from "react";

function SplashScreen({ onFinish }) {
    useEffect(() => {
        // Automatically trigger onFinish after 2 seconds
        const timer = setTimeout(() => {
            onFinish();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    // ... existing code ...

    const styles = {
        container: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fade-out 2s ease-in-out forwards",
        },
        logo: {
            animation: "scale-up 1.5s ease-in-out",
            filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))",
            transform: "scale(0)",
            animationFillMode: "forwards",
        }
    };

    const animationStyles = `
        @keyframes fade-out {
            0% {
                opacity: 1;
                backdrop-filter: blur(0px);
            }
            80% {
                opacity: 1;
                backdrop-filter: blur(0px);
            }
            100% {
                opacity: 0;
                backdrop-filter: blur(8px);
            }
        }

        @keyframes scale-up {
            0% {
                transform: scale(0) rotate(-10deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.2) rotate(5deg);
                opacity: 0.5;
            }
            80% {
                transform: scale(0.9) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
            }
            70% {
                box-shadow: 0 0 0 30px rgba(255, 255, 255, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            }
        }
    `;

    return (
        <>
            <style>{animationStyles}</style>
            <div style={styles.container}>
                <img 
                    src="./tempLogo.svg" 
                    width={100} 
                    height={200} 
                    style={styles.logo}
                    alt="Logo"
                />
            </div>
        </>
    );

}

export default SplashScreen;
