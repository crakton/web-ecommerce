// src/pages/admin/OrderView.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, CreditCard, MapPin, Clock, User } from 'lucide-react';
import api from '../../config/api';
import { Helmet } from "react-helmet";

const OrderView = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(orderId)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!order) {
    return <div className="flex justify-center items-center h-screen">Order not found</div>;
  }

  // Parse the address string to object
  const address = JSON.parse(order.address) 

  const statusSteps = [
    { id: 'Pending', icon: <Package size={20} />, label: 'Order Placed' },
    { id: 'Processing', icon: <Package size={20} />, label: 'Processing' },
    { id: 'Shipped', icon: <Truck size={20} />, label: 'Shipped' },
    { id: 'Delivered', icon: <CheckCircle size={20} />, label: 'Delivered' },
  ];

  const currentStatusIndex = statusSteps.findIndex(step => step.id === order.status);

  return (
    <div className="flex">
      <Helmet>
        <title>Order #{order.orderId} | Admin | Zang Global</title>
      </Helmet>
      {/* <Sidebar /> */}
      <div className="flex-1 p-8 ml-[5rem] lg:ml-64 min-h-screen">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary mb-6 hover:text-pink-700 transition"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Orders
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Order #{order.orderId}</h1>
              <p className="text-gray-500">Placed on {order.date} at {order.time}</p>
            </div>
            <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
              {order.status}
            </div>
          </div>

          {/* Order Status Timeline */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <div className="flex justify-between relative">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 
                    ${index <= currentStatusIndex ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step.icon}
                  </div>
                  <span className={`text-sm font-medium ${index <= currentStatusIndex ? 'text-pink-600' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 z-0">
                <div 
                  className="h-full bg-pink-600 transition-all duration-300" 
                  style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Customer Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="flex items-center text-lg font-semibold mb-3">
                <User size={18} className="mr-2 text-pink-600" /> Customer Information
              </h3>
              <p className="font-medium">{order.name}</p>
              <p className="text-gray-600">{order.email}</p>
            </div>

            {/* {/* Shipping Address */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="flex items-center text-lg font-semibold mb-3">
                <MapPin size={18} className="mr-2 text-pink-600" /> Shipping Address
              </h3>
              <p>{address.street}</p>
              <p>{address.city}, {address.state}</p>
              <p>Pincode: {address.pincode}</p>
              <p>Phone: {address.phone}</p>
            </div> 

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="flex items-center text-lg font-semibold mb-3">
                <Clock size={18} className="mr-2 text-pink-600" /> Order Summary
              </h3>
              <div className="flex justify-between py-1">
                <span>Order Date:</span>
                <span>{order.date}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Order Time:</span>
                <span>{order.time}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Status:</span>
                <span className="font-medium">{order.status}</span>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="flex items-center text-lg font-semibold mb-3">
                <CreditCard size={18} className="mr-2 text-pink-600" /> Payment Information
              </h3>
              <div className="flex justify-between py-1">
                <span>Method:</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Status:</span>
                <span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.paymentStatus}
                </span>
              </div>
              {order.paymentReference && (
                <div className="flex justify-between py-1">
                  <span>Reference:</span>
                  <span className="text-sm">{order.paymentReference}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.products.map((product) => (
                    <tr key={product.productId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.img && product.img.length > 0 && (
                            <img 
                              src={product.img[0]} 
                              alt={product.name} 
                              className="w-10 h-10 rounded-md object-cover mr-3"
                            />
                          )}
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">SKU: {product.productId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">₦ {product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₦ {product.price * product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Total */}
          <div className="flex justify-end">
            <div className="bg-gray-50 p-6 rounded-lg w-full md:w-1/2">
              <h3 className="text-lg font-semibold mb-4">Order Total</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₦ {order.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>₦ 0.00</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">₦ {order.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;