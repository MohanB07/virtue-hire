"use client";
import { useState } from "react";
import SplashScreen from "../SplashScreen";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
    const [showSplash, setShowSplash] = useState(true);

    const handleSplashFinish = () => {
        setShowSplash(false);
    };

    return (
        <>
            {showSplash ? (
                <SplashScreen onFinish={handleSplashFinish} />
            ) : (
                <div>
                    <Header />
                    <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
                </div>
            )}
        </>
    );
}

export default DashboardLayout;
