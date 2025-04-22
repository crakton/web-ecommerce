// src/pages/admin/Orders.jsx
import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown, Eye, MoreHorizontal } from 'lucide-react';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
import { useAdminAuth } from '../../context/Admin';

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Processing': 'bg-blue-100 text-blue-800',
  'Shipped': 'bg-green-100 text-green-800',
  'Delivered': 'bg-purple-100 text-purple-800',
  'Cancelled': 'bg-red-100 text-red-800'
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });
  const { admin } = useAdminAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/admin/orders');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = React.useMemo(() => {
    if (!Array.isArray(orders)) return [];
    
    let sortableOrders = [...orders];
    if (sortConfig.key !== null) {
      sortableOrders.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (!isNaN(aValue) && !isNaN(bValue)) {
          return sortConfig.direction === 'ascending' 
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();

        if (aString < bString) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aString > bString) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  const filteredOrders = React.useMemo(() => {
    return sortedOrders.filter(order => {
      const searchLower = searchQuery.toLowerCase();
      const orderId = order.orderId?.toString().toLowerCase() || '';
      const customerName = order.name?.toLowerCase() || '';
      const customerEmail = order.email?.toLowerCase() || '';
      
      return (
        orderId.includes(searchLower) || 
        customerName.includes(searchLower) ||
        customerEmail.includes(searchLower)
      );
    });
  }, [sortedOrders, searchQuery]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading orders...</div>;
  }

  return (
    <div className="flex">
      <Helmet>
        <title>Orders | Admin | Zang Global</title>
      </Helmet>
      {/* <Sidebar /> */}
      <div className="flex-1 p-8 ml-[5rem] lg:ml-64 min-h-screen">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('orderId')}
                    >
                      <div className="flex items-center">
                        Order ID
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Customer
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('price')}
                    >
                      <div className="flex items-center">
                        Amount
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        <ArrowUpDown size={14} className="ml-1" />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-pink-600">#{order.orderId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(order.createdAt)}</div>
                          <div className="text-xs text-gray-500">{order.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{order.name}</div>
                              <div className="text-sm text-gray-500">{order.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₦{order.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => navigate(`/admin/orders/${order.orderId}`)}
                            className="text-pink-600 hover:text-pink-900 mr-4"
                          >
                            <Eye size={18} className="inline mr-1" /> View
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;