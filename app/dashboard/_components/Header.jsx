"use client"
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


function Header() {
    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, []);

    return (
        <div className='relative flex p-1 items-center justify-between border-b border-[#4845d2]/10 sticky top-0 z-50 shadow-lg overflow-hidden bg-black/90'>
            {/* Glossy Animation Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-[#4845d2]/10 to-black animate-gradient"></div>
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(72,69,210,0.1)_0%,_transparent_60%)] animate-pulse-slow"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_rgba(72,69,210,0.15)_0%,_transparent_50%)] animate-ripple"></div>
                </div>
                <div className="absolute inset-0 backdrop-blur-sm"></div>
            </div>

             {/* Logo Section */}
             <div className="flex items-center gap-3 relative z-10 ">
                <div className="group p-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 transition-all duration-500 shadow-lg hover:shadow-indigo-500/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <img
                        src={'./tempLogo.svg'}
                        alt="logo"
                        width={32}
                        height={42}
                        className="hover:scale-110 transition-all duration-300 hover:rotate-3 cursor-pointer" />
                </div>
                <span className="font-semibold text-white text-lg hidden sm:block hover:text-[#4845d2] transition-colors duration-300">
                    VirtueHire
                </span>
            </div>

            <nav className='hidden md:block relative'>
                <ul className='flex gap-8'>
                    {[
                        { path: '/dashboard', label: 'Dashboard' },
                        { path: '/dashboard/questions', label: 'Practice' },
                        { path: '/dashboard/about', label: 'About' },
                        { path: '/dashboard/how', label: 'How it works' },
                    ].map((item) => (
                        <li
                            key={item.path}
                            className={`px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer
                                relative overflow-hidden group
                                ${path === item.path
                                    ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-600/20'
                                    : 'text-gray-300 hover:text-indigo-600'}`}
                        >
                            {item.label}
                            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 transform transition-transform duration-300 
                                ${path === item.path ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'}`}>
                            </span>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex items-center gap-4 relative">
                <div className="p-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-600/20 transition-all duration-300 transform hover:scale-110">
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "h-9 w-9 hover:scale-105 transition-transform duration-300",
                            }
                        }} />
                </div>
            </div>
        </div>
    );
};

// Add these styles to your globals.css or create a new style tag in your Header component
const styles = `
@keyframes wave {
    0%, 100% {
        transform: translateY(0) translateX(0);
    }
    25% {
        transform: translateY(-10px) translateX(10px);
    }
    50% {
        transform: translateY(0) translateX(20px);
    }
    75% {
        transform: translateY(10px) translateX(10px);
    }
}

@keyframes galaxy {
    0%, 100% {
        opacity: 0.3;
    }
    50% {
        opacity: 0.5;
    }
}

.animate-wave {
    animation: wave 20s ease-in-out infinite;
}

.animate-galaxy {
    animation: galaxy 10s ease-in-out infinite;
}
`;

// Add style tag to the component
Header.styles = <style>{styles}</style>;

export default Header