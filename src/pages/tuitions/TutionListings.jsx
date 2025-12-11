import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import { TuitionContext } from '../../context/TuitionContext/TuitionContext';
import { CLASSES, SUBJECTS, DIVISIONS } from '../../utils/constants';

const TuitionsListing = () => {
  const { fetchTuitions } = useContext(TuitionContext);
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    class: '',
    subject: '',
    location: ''
  });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    loadTuitions();
  }, [pagination.page, search, filters, sortBy, sortOrder]);

  const loadTuitions = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search,
        sortBy,
        sortOrder,
        ...filters
      };

      const data = await fetchTuitions(params);

      if (data.tuitions) {
        setTuitions(data.tuitions);
        setPagination({
            ...pagination,
            ...data.pagination
        });
      }
    } catch (error) {
      console.error('Error fetching tuitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPagination({ ...pagination, page: 1 });
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
    setPagination({ ...pagination, page: 1 });
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
    setPagination({ ...pagination, page: 1 });
  };

  const clearFilters = () => {
    setSearch('');
    setFilters({ class: '', subject: '', location: '' });
    setSortBy('createdAt');
    setSortOrder('desc');
    setPagination({ ...pagination, page: 1 });
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Browse Available Tuitions</h1>
          <p className="text-gray-600">Find the perfect tuition opportunity that matches your expertise</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-base-100 rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by subject or location..."
                  className="input input-bordered w-full pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaFilter /> Filter by Class
                </span>
              </label>
              <select
                name="class"
                className="select select-bordered w-full"
                value={filters.class}
                onChange={handleFilterChange}
              >
                <option value="">All Classes</option>
                {CLASSES.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaFilter /> Filter by Subject
                </span>
              </label>
              <select
                name="subject"
                className="select select-bordered w-full"
                value={filters.subject}
                onChange={handleFilterChange}
              >
                <option value="">All Subjects</option>
                {SUBJECTS.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaFilter /> Filter by Location
                </span>
              </label>
              <select
                name="location"
                className="select select-bordered w-full"
                value={filters.location}
                onChange={handleFilterChange}
              >
                <option value="">All Locations</option>
                {DIVISIONS.map(division => (
                  <option key={division} value={division}>{division}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium flex items-center gap-2">
              <FaSort /> Sort by:
            </span>
            <button
              onClick={() => handleSortChange('createdAt')}
              className={`btn btn-sm ${sortBy === 'createdAt' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Date {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('budget')}
              className={`btn btn-sm ${sortBy === 'budget' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Budget {sortBy === 'budget' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={clearFilters}
              className="btn btn-sm btn-outline ml-auto"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-4 text-gray-600">
            Showing {tuitions.length} of {pagination.total} tuitions
          </div>
        )}

        {/* Tuitions Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : tuitions.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {tuitions.map((tuition, index) => (
                <motion.div
                  key={tuition._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="card-body">
                    <div className="flex justify-between items-start">
                      <h2 className="card-title text-primary">{tuition.subject}</h2>
                      <div className="badge badge-secondary">{tuition.class}</div>
                    </div>
                    
                    <div className="space-y-2 text-sm mt-4">
                      <p>
                        <strong>Location:</strong> {tuition.location}
                      </p>
                      <p>
                        <strong>Budget:</strong> <span className="text-success font-semibold">৳{tuition.budget}/month</span>
                      </p>
                      <p>
                        <strong>Schedule:</strong> {tuition.schedule}
                      </p>
                      <p>
                        <strong>Duration:</strong> {tuition.duration}
                      </p>
                    </div>

                    {tuition.requirements && (
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                        {tuition.requirements}
                      </p>
                    )}

                    <div className="card-actions justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img 
                              src={tuition.studentId?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'} 
                              alt={tuition.studentId?.name}
                            />
                          </div>
                        </div>
                        <span className="text-xs text-gray-600">{tuition.studentId?.name}</span>
                      </div>
                      <Link 
                        to={`/tuitions/${tuition._id}`} 
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center">
                <div className="join">
                  <button
                    onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                    disabled={pagination.page === 1}
                    className="join-item btn"
                  >
                    «
                  </button>
                  
                  {[...Array(pagination.pages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setPagination({ ...pagination, page: index + 1 })}
                      className={`join-item btn ${pagination.page === index + 1 ? 'btn-active' : ''}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                    disabled={pagination.page === pagination.pages}
                    className="join-item btn"
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-base-100 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">No Tuitions Found</h3>
            <p className="text-gray-600 mb-6">
              {search || filters.class || filters.subject || filters.location
                ? 'Try adjusting your filters to find more results'
                : 'No tuitions available at the moment'}
            </p>
            {(search || filters.class || filters.subject || filters.location) && (
              <button onClick={clearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TuitionsListing;
