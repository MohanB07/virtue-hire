'use client';
import { motion } from "framer-motion";
import AddNewInterview from "./_components/AddNewInterview";

function Dashboard() {
    return (
        <div className='min-h-screen bg-gradient-to-br from-white to-[#f5f5ff] p-6 md:p-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='max-w-5xl mx-auto'
            >
                {/* Header section with enhanced animations */}
                <div className="relative mb-8">
                    <div className="absolute -left-3 top-1/2 w-1.5 h-12 bg-[#4845d2] rounded-full transform -translate-y-1/2
                        animate-pulse"/>
                    <div>
                        <h2 className='font-bold text-3xl bg-gradient-to-r from-[#4845d2] to-[#6461ff] bg-clip-text text-transparent
                            transform transition-all duration-300 hover:scale-102 hover:tracking-wider cursor-default'>
                            Dashboard
                        </h2>
                        <p className='text-gray-500 mt-1 text-sm font-light tracking-wide transition-all duration-300
                            hover:text-gray-700'>
                            Create and Start your AI Mockup Interview
                        </p>
                    </div>
                </div>

                 {/* Main content with enhanced styling */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
                    <motion.div
                        className='col-span-1'
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <AddNewInterview />
                    </motion.div>
                </div>

                {/* Decorative background elements */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-[#4845d2]/5 rounded-full blur-3xl"/>
                    <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-[#6461ff]/5 rounded-full blur-3xl"/>
                </div>
            </motion.div>
        </div>
    )
}

export default Dashboard