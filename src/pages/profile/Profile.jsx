import { useState, useEffect, useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FaUserEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';

const Profile = () => {
  const { user, loading: authLoading, updateUserProfile } = useAuth(); // Added updateUserProfile
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e, field) => {
     // Simple comma separated handling
     const val = e.target.value;
     setFormData({
         ...formData,
         [field]: val.split(',').map(item => item.trim())
     });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Filter out sensitive or unchangeable fields
      const { _id, email, role, password, ...updateData } = formData;
      
      await updateUserProfile(updateData);
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary h-32 relative">
             <div className="absolute -bottom-16 left-8">
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-32 ring ring-base-100 ring-offset-2">
                        {formData.photoURL ? (
                            <img src={formData.photoURL} alt="Profile" />
                        ) : (
                             <span className="text-3xl">{formData.name?.[0]}</span>
                        )}
                    </div>
                </div>
             </div>
             <div className="absolute top-4 right-4 text-primary-content">
                 {!isEditing ? (
                     <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-ghost bg-white/20 hover:bg-white/30 text-white gap-2">
                         <FaUserEdit /> Edit Profile
                     </button>
                 ) : (
                     <div className="flex gap-2">
                        <button onClick={handleSubmit} className="btn btn-sm btn-success text-white gap-2" disabled={loading}>
                            <FaSave /> Save
                        </button>
                        <button onClick={() => { setIsEditing(false); setFormData(user); }} className="btn btn-sm btn-error text-white gap-2" disabled={loading}>
                            <FaTimes /> Cancel
                        </button>
                     </div>
                 )}
             </div>
        </div>

        <div className="mt-20 px-8 pb-8">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <div className="badge badge-primary mt-2">{user.role}</div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="mt-8">
                <fieldset className="fieldset border border-base-300 p-6 rounded-xl bg-base-100/50 shadow-lg">
                    <legend className="px-2 font-bold text-gray-500 text-xl">Personal Information</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Common Fields */}
                        <div className="form-control">
                            <label className="label font-semibold">Full Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name || ''} 
                                onChange={handleChange} 
                                className={`input input-bordered w-full ${!isEditing && 'input-ghost pl-0 border-none px-0'}`} 
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold">Email</label>
                            <input 
                                type="email" 
                                value={user.email} 
                                className="input input-bordered w-full input-disabled bg-base-200/50" 
                                disabled 
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold">Phone</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                value={formData.phone || ''} 
                                onChange={handleChange} 
                                className={`input input-bordered w-full ${!isEditing && 'input-ghost pl-0 border-none px-0'}`}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold">Photo URL</label>
                            <input 
                                type="text" 
                                name="photoURL" 
                                value={formData.photoURL || ''} 
                                onChange={handleChange} 
                                className={`input input-bordered w-full ${!isEditing && 'input-ghost pl-0 border-none px-0'}`}
                                disabled={!isEditing}
                            />
                        </div>

                        {/* Student Specific Fields */}
                        {user.role === 'Student' && (
                            <>
                                <div className="form-control">
                                    <label className="label font-semibold">School / Institution</label>
                                    <input 
                                        type="text" 
                                        name="school" 
                                        value={formData.school || ''} 
                                        onChange={handleChange} 
                                        className={`input input-bordered w-full ${!isEditing && 'input-ghost pl-0 border-none px-0'}`}
                                        disabled={!isEditing}
                                        placeholder={isEditing ? "e.g. Dhaka City College" : ""}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Class / Year</label>
                                    <input 
                                        type="text" 
                                        name="class" 
                                        value={formData.class || ''} 
                                        onChange={handleChange} 
                                        className={`input input-bordered w-full ${!isEditing && 'input-ghost pl-0 border-none px-0'}`}
                                        disabled={!isEditing}
                                        placeholder={isEditing ? "e.g. HSC 2nd Year" : ""}
                                    />
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label font-semibold">Bio</label>
                                    <textarea 
                                        name="bio" 
                                        value={formData.bio || ''} 
                                        onChange={handleChange} 
                                        className={`textarea textarea-bordered h-24 w-full ${!isEditing && 'textarea-ghost pl-0 border-none resize-none px-0'}`}
                                        disabled={!isEditing}
                                        placeholder={isEditing ? "Tell us a bit about yourself..." : ""}
                                    ></textarea>
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label font-semibold">Address</label>
                                    <input 
                                        type="text" 
                                        name="address" 
                                        value={formData.address || ''} 
                                        onChange={handleChange} 
                                        className={`input input-bordered w-full ${!isEditing && 'input-ghost pl-0 border-none px-0'}`}
                                        disabled={!isEditing}
                                        placeholder={isEditing ? "Your full address" : ""}
                                    />
                                </div>
                            </>
                        )}

                        {/* Tutor Specific Fields */}
                        {user.role === 'Tutor' && (
                            <>
                                <div className="form-control">
                                    <label className="label font-semibold">Location (Area)</label>
                                    <input 
                                        type="text" 
                                        name="location" 
                                        value={formData.location || ''} 
                                        onChange={handleChange} 
                                        className={`input input-bordered w-full ${!isEditing && 'input-ghost pl-0 border-none px-0'}`}
                                        disabled={!isEditing}
                                        placeholder={isEditing ? "e.g. Dhanmondi, Dhaka" : ""}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Expected Salary</label>
                                    <input 
                                        type="number" 
                                        name="expectedSalary" 
                                        value={formData.expectedSalary || ''} 
                                        onChange={handleChange} 
                                        className={`input input-bordered w-full ${!isEditing && 'input-ghost pl-0 border-none px-0'}`}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label font-semibold">About Me</label>
                                    <textarea 
                                        name="about" 
                                        value={formData.about || ''} 
                                        onChange={handleChange} 
                                        className={`textarea textarea-bordered h-24 w-full ${!isEditing && 'textarea-ghost pl-0 border-none resize-none px-0'}`}
                                        disabled={!isEditing}
                                        placeholder={isEditing ? "Describe your teaching style and experience..." : ""}
                                    ></textarea>
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label font-semibold">Experience</label>
                                    <textarea 
                                        name="experience" 
                                        value={formData.experience || ''} 
                                        onChange={handleChange} 
                                        className={`textarea textarea-bordered h-20 w-full ${!isEditing && 'textarea-ghost pl-0 border-none resize-none px-0'}`}
                                        disabled={!isEditing}
                                        placeholder={isEditing ? "Detail your teaching experience..." : ""}
                                    ></textarea>
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label font-semibold">Qualifications (Comma separated)</label>
                                    <input 
                                        type="text" 
                                        name="qualifications" 
                                        value={Array.isArray(formData.qualifications) ? formData.qualifications.join(', ') : formData.qualifications || ''} 
                                        onChange={(e) => handleArrayChange(e, 'qualifications')} 
                                        className={`input input-bordered w-full ${!isEditing && 'input-ghost pl-0 border-none px-0'}`}
                                        disabled={!isEditing}
                                        placeholder={isEditing ? "e.g. BSc in CSF, MSc in Math" : ""}
                                    />
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label font-semibold">Skills (Comma separated)</label>
                                    <input 
                                        type="text" 
                                        name="skills" 
                                        value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills || ''} 
                                        onChange={(e) => handleArrayChange(e, 'skills')} 
                                        className={`input input-bordered w-full ${!isEditing && 'input-ghost pl-0 border-none px-0'}`}
                                        disabled={!isEditing}
                                        placeholder={isEditing ? "e.g. Math, Physics, English" : ""}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </fieldset>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
