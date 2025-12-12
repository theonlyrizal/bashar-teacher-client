import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 
        toast.success("Message sent successfully! We'll get back to you soon.");
        formRef.current.reset();
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
                <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-primary text-white p-10 rounded-2xl shadow-xl"
                >
                    <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <FaPhone className="text-2xl mt-1 opacity-80" />
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Phone</h3>
                                <p className="opacity-90">+880 1234 567 890</p>
                                <p className="opacity-90">+880 9876 543 210</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <FaEnvelope className="text-2xl mt-1 opacity-80" />
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Email</h3>
                                <p className="opacity-90">support@basharteacher.com</p>
                                <p className="opacity-90">info@basharteacher.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="text-2xl mt-1 opacity-80" />
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Office</h3>
                                <p className="opacity-90">
                                    House #12, Road #5, Dhanmondi<br />
                                    Dhaka-1209, Bangladesh
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-base-100 p-8 rounded-2xl shadow-lg border border-base-200"
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Your Name" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="Your Email" className="input input-bordered w-full" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Subject</span>
                            </label>
                            <input type="text" placeholder="Message Subject" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Message</span>
                            </label>
                            <textarea className="textarea textarea-bordered h-32" placeholder="Tell us how we can help..." required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-full text-lg">
                            <FaPaperPlane className="mr-2" /> Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
