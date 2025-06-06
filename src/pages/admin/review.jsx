import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/sidebar';
import { ArrowUpDown } from 'lucide-react';
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/api';

const Reviews = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({}); // Store users by ID
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [reviewsResponse, usersResponse] = await Promise.all([
          api.get('/reviews'),
          api.get('/users') // Assuming you have an endpoint to get all users
        ]);
        
        setReviews(reviewsResponse.data.reviews);
        
        // Create a users map by ID
        const usersMap = {};
        usersResponse.data.forEach(user => {
          usersMap[user._id] = user;
        });
        setUsers(usersMap);
        
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedReviews = React.useMemo(() => {
    let sortableReviews = [...reviews];
    if (sortConfig.key !== null) {
      sortableReviews.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableReviews;
  }, [reviews, sortConfig]);

  const filteredReviews = sortedReviews.filter(review => 
    review.productId?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.review?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (users[review.userId]?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <Helmet>
        <title>Reviews | Admin | Zang Global</title>
      </Helmet>
      <Sidebar />
      <div className="flex-1 p-8 ml-[5rem] lg:ml-64 bg-pink-50 min-h-screen">
        <div className="mb-6 flex justify-between items-center">
          <div className="relative">
            <div className={`flex items-center ${isSearchExpanded ? 'w-full md:w-64' : 'w-10 md:w-64'} transition-all duration-300`}>
              <button 
                className="md:hidden absolute left-2 z-10"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search by product ID, review, or user..."
                className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 ${
                  isSearchExpanded ? 'w-full opacity-100' : 'w-0 md:w-full opacity-0 md:opacity-100'
                } transition-all duration-300`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-pink-100">
              <tr>
                <th onClick={() => handleSort('productId')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Product ID
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th onClick={() => handleSort('rating')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Rating
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  User
                </th>
                <th onClick={() => handleSort('review')} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer">
                  <div className="flex items-center">
                    Review
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <tr key={review._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {review.productId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {review.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {users[review.userId]?.name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {review.review}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reviews;