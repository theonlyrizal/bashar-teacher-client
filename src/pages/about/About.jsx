import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl font-bold text-primary mb-4">About Bashar Teacher</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Connecting students with the best tutors across Bangladesh. We are dedicated to making quality education accessible to everyone.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt="Our Mission"
                        className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-gray-600 mb-4 text-lg">
                        At Bashar Teacher, we believe that personalized learning is the key to academic success. Our platform serves as a bridge between ambitious students and experienced tutors.
                    </p>
                    <p className="text-gray-600 text-lg">
                        We strive to provide a safe, transparent, and efficient environment where knowledge sharing flourishes. Whether you're looking to master a new subject or share your expertise, we're here to support your journey.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-base-200 rounded-xl p-8 py-12"
            >
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-base-100 rounded-lg shadow-md">
                        <div className="text-primary text-5xl mb-4 text-center mx-auto w-fit">
                            <i className="fa-solid fa-check-circle"></i> {/* Using font awesome if available, or just emojis */}
                            🎯
                        </div>
                        <h3 className="text-xl font-bold mb-2">Verified Tutors</h3>
                        <p className="text-gray-500">
                            Every tutor on our platform undergoes a strict verification process to ensure quality and safety.
                        </p>
                    </div>
                    <div className="text-center p-6 bg-base-100 rounded-lg shadow-md">
                        <div className="text-primary text-5xl mb-4 text-center mx-auto w-fit">
                            🚀
                        </div>
                        <h3 className="text-xl font-bold mb-2">Easy Connections</h3>
                        <p className="text-gray-500">
                            Find the perfect tutor in minutes with our advanced search and filtering system.
                        </p>
                    </div>
                    <div className="text-center p-6 bg-base-100 rounded-lg shadow-md">
                        <div className="text-primary text-5xl mb-4 text-center mx-auto w-fit">
                            💳
                        </div>
                        <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                        <p className="text-gray-500">
                            Our integrated payment system ensures that your transactions are safe and hassle-free.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
