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

    // Inline styles for animation and container
    const styles = {
        container: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "#4845d2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999, // Ensure it's above everything else
            animation: "fade-out 2s ease-in-out forwards",
        },
    };

    // Inject CSS animation directly
    const animationStyles = `
        @keyframes fade-out {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    `;

    return (
        <>
            {/* Inject animation styles */}
            <style>{animationStyles}</style>
            <div style={styles.container}>
                <img src="./tempLogo.svg" width={100} height={200} />
            </div>
        </>
    );
}

export default SplashScreen;
