import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaStar, FaMapMarkerAlt, FaChalkboardTeacher, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TutorContext } from '../../context/TutorContext/TutorContext';

const Tutors = () => {
    const { tutors, loading, fetchTutors } = useContext(TutorContext);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTutors();
    }, []);

    const filteredTutors = tutors.filter(tutor => 
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tutor.location && tutor.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl font-bold text-primary mb-4">Find Your Perfect Tutor</h1>
                <p className="text-base-content/70 text-lg mb-8">Browse our community of expert tutors ready to help you succeed.</p>

                {/* Search Bar */}
                <div className="max-w-md mx-auto relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                    <input
                        type="text"
                        placeholder="Search by name or location..."
                        className="input input-bordered w-full pl-12 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </motion.div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTutors.length > 0 ? (
                        filteredTutors.map((tutor, index) => (
                            <motion.div
                                key={tutor._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-200"
                            >
                                <figure className="px-6 pt-8">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={tutor.photoURL} alt={tutor.name} />
                                        </div>
                                    </div>
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title text-2xl">{tutor.name}</h2>
                                    <div className="badge badge-secondary badge-outline mt-1 mb-2">Tutor</div>
                                    
                                    <div className="w-full space-y-2 mt-2">
                                        <div className="flex items-center justify-center gap-2 text-base-content/70">
                                            <FaMapMarkerAlt className="text-primary" />
                                            <span>{tutor.location || 'Location not set'}</span>
                                        </div>
                                    </div>

                                    <div className="card-actions mt-6 w-full">
                                        <Link to={`/tutors/${tutor._id}`} className="btn btn-primary w-full">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <FaChalkboardTeacher className="mx-auto text-6xl text-base-content/20 mb-4" />
                            <h3 className="text-xl font-bold text-base-content/50">No tutors found matching your search.</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Tutors;
