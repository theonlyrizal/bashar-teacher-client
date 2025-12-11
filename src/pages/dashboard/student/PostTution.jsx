import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CLASSES, SUBJECTS, DIVISIONS } from '../../../utils/constants';
import SectionBody from '../../../components/shared/SectionBody';
import { TuitionContext } from '../../../context/TuitionContext/TuitionContext';

const PostTuition = () => {
  const navigate = useNavigate();
  const { postTuition } = useContext(TuitionContext);

  const [formData, setFormData] = useState({
    subject: [], 
    class: '',
    location: '',
    budget: '',
    schedule: [], 
    durationNum: '',
    durationUnit: 'Months',
    requirements: '',
    contactInfo: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const WEEK_DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Auto-resize textarea logic
  const handleTextareaChange = (e) => {
    const target = e.target;
    target.style.height = 'auto'; // Reset height
    target.style.height = `${target.scrollHeight}px`; // Set to scroll height
    setFormData({ ...formData, requirements: target.value });
  };

  const handleDayToggle = (day) => {
    setFormData(prev => {
      const currentDays = prev.schedule;
      if (currentDays.includes(day)) {
        return { ...prev, schedule: currentDays.filter(d => d !== day) };
      } else {
        return { ...prev, schedule: [...currentDays, day] };
      }
    });
  };

  // Logic for selecting multiple subjects
  const handleSubjectSelect = (e) => {
    const selected = e.target.value;
    if (selected && !formData.subject.includes(selected)) {
      setFormData(prev => ({
        ...prev,
        subject: [...prev.subject, selected]
      }));
    }
    // Reset selection to default
    e.target.value = "";
  };

  const removeSubject = (subjectToRemove) => {
    setFormData(prev => ({
      ...prev,
      subject: prev.subject.filter(s => s !== subjectToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (formData.subject.length === 0) {
        toast.error('Please select at least one subject');
        setSubmitting(false);
        return;
    }

    if (formData.schedule.length === 0) {
        toast.error('Please select at least one day');
        setSubmitting(false);
        return;
    }

    try {
      // Format payload
      const payload = {
          ...formData,
          subject: formData.subject.join(', '), // Send as string e.g. "Math, Physics"
          schedule: formData.schedule.join(', '),
          duration: `${formData.durationNum} ${formData.durationUnit}`
      };
      
      delete payload.durationNum;
      delete payload.durationUnit;

      const result = await postTuition(payload);
      
      if (result.success) {
        navigate('/dashboard/student/my-tuitions');
      }
    } catch (error) {
      // Handled in context
    } finally {
      setSubmitting(false);
    }
  };

  // Glassmorphism classes ONLY for the main container
  const glassCardClass = "backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl rounded-3xl p-8";
  
  // Standard inputs (Glassmorphism removed as requested)
  const inputClass = "input input-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";
  const selectClass = "select select-bordered w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <SectionBody>
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-10">
          
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-4xl ${glassCardClass}`}
        >
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Find Your Perfect Tutor
                </h1>
                <p className="text-gray-600 mt-2 font-medium">
                    Create a tuition post and connect with qualified educators
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Title (Full Width) */}
                <div className="form-control">
                    <label className="label font-bold text-gray-700">Tuition Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        className={inputClass} 
                        placeholder="e.g., Need Math Tutor for Class 10" 
                        value={formData.title || ''} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* 2. Basic Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Multi-Select Subject */}
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Subjects</label>
                        <select 
                            className={selectClass} 
                            onChange={handleSubjectSelect} 
                            defaultValue=""
                        >
                            <option value="" disabled>Select Subjects (Pick multiple)</option>
                            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <div className="flex flex-wrap gap-2 mt-2">
                             {formData.subject.map(s => (
                                 <div key={s} className="badge badge-primary badge-lg gap-2 text-white p-3">
                                     {s}
                                     <svg onClick={() => removeSubject(s)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current cursor-pointer hover:text-red-200"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                 </div>
                             ))}
                        </div>
                        {formData.subject.length === 0 && <span className="text-xs text-error mt-1 ml-1">Select at least one subject</span>}
                    </div>

                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Class/Grade</label>
                        <select name="class" className={selectClass} value={formData.class} onChange={handleChange} required>
                            <option value="">Select Class</option>
                            {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* 3. Location & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="form-control">
                        <label className="label font-bold text-gray-700">Location</label>
                        <select name="location" className={selectClass} value={formData.location} onChange={handleChange} required>
                            <option value="">Select Division</option>
                            {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Budget (Monthly)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">৳</span>
                            <input 
                                type="number" 
                                name="budget" 
                                className={`${inputClass} pl-8`} 
                                placeholder="5000" 
                                value={formData.budget} 
                                onChange={handleChange} 
                                required 
                                min="0" 
                            />
                        </div>
                    </div>
                </div>

                {/* 4. Schedule & Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Days Selection */}
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Days per Week</label>
                        <div className="flex flex-wrap gap-2 p-3 bg-white/30 rounded-xl border border-white/40">
                            {WEEK_DAYS.map(day => (
                                <label key={day} className="cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="hidden peer"
                                        checked={formData.schedule.includes(day)}
                                        onChange={() => handleDayToggle(day)}
                                    />
                                    <div className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 border border-transparent 
                                        peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-lg
                                        bg-white/50 text-gray-600 hover:bg-white/80">
                                        {day}
                                    </div>
                                </label>
                            ))}
                        </div>
                        {formData.schedule.length === 0 && <span className="text-xs text-error mt-1 ml-1">Select at least one day</span>}
                    </div>

                    {/* Duration Selection */}
                    <div className="form-control">
                        <label className="label font-bold text-gray-700">Duration</label>
                        <div className="flex gap-2">
                             <input 
                                type="number" 
                                name="durationNum"
                                className={`${inputClass} flex-1`}
                                placeholder="Num" 
                                value={formData.durationNum} 
                                onChange={handleChange}
                                required
                                min="1"
                             />
                             <select 
                                name="durationUnit" 
                                className={`${selectClass} flex-1`}
                                value={formData.durationUnit} 
                                onChange={handleChange}
                             >
                                 <option value="Months">Months</option>
                                 <option value="Years">Years</option>
                             </select>
                        </div>
                    </div>
                </div>

                {/* 5. Requirements & Contact */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control md:col-span-2">
                        <label className="label font-bold text-gray-700">Additional Requirements</label>
                        <textarea 
                            name="requirements" 
                            className={`textarea textarea-bordered w-full overflow-hidden resize-none min-h-[3rem] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary`} 
                            placeholder="Describe any specific requirements..."
                            value={formData.requirements} 
                            onChange={handleTextareaChange} 
                            rows={1}
                        />
                    </div>

                    <div className="form-control md:col-span-2">
                        <label className="label font-bold text-gray-700">Contact Number</label>
                         <input 
                            type="tel" 
                            name="contactInfo" 
                            className={inputClass} 
                            placeholder="01XXXXXXXXX" 
                            value={formData.contactInfo} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4">
                     <button 
                        type="button" 
                        onClick={() => navigate('/dashboard/student')}
                        className="btn btn-ghost hover:bg-white/30"
                     >
                        Cancel
                     </button>
                     <button 
                        type="submit" 
                        className="btn btn-primary px-8 rounded-full shadow-lg shadow-primary/30"
                        disabled={submitting}
                     >
                        {submitting ? <span className="loading loading-spinner"></span> : 'Post Tuition Now'}
                     </button>
                </div>

            </form>
        </motion.div>
      </div>
    </SectionBody>
  );
};

export default PostTuition;
