import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home, Building, Calendar, Users, DollarSign } from 'lucide-react';

const OwnerDashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Building className="mr-2" /> Owner Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Properties</h2>
            <Home className="text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">5</p>
          <p className="text-gray-500 text-sm">Your listings</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Bookings</h2>
            <Calendar className="text-emerald-600" />
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-gray-500 text-sm">Active bookings</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <DollarSign className="text-amber-600" />
          </div>
          <p className="text-3xl font-bold">$3,450</p>
          <p className="text-gray-500 text-sm">This month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <Users className="text-rose-600" />
          </div>
          <p className="text-3xl font-bold">4.8</p>
          <p className="text-gray-500 text-sm">Average rating</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b">
          <Link to="/owner" className="px-6 py-4 font-medium hover:bg-gray-50 border-b-2 border-indigo-500">
            Overview
          </Link>
          <Link to="/owner/properties" className="px-6 py-4 font-medium hover:bg-gray-50">
            My Properties
          </Link>
          <Link to="/owner/bookings" className="px-6 py-4 font-medium hover:bg-gray-50">
            Bookings
          </Link>
          <Link to="/owner/reviews" className="px-6 py-4 font-medium hover:bg-gray-50">
            Reviews
          </Link>
          <Link to="/owner/earnings" className="px-6 py-4 font-medium hover:bg-gray-50">
            Earnings
          </Link>
        </div>
        
        <div className="p-6">
          <Routes>
            <Route path="/" element={<OwnerOverview />} />
            <Route path="/properties" element={<div>My Properties Management</div>} />
            <Route path="/bookings" element={<div>Bookings Management</div>} />
            <Route path="/reviews" element={<div>Reviews Management</div>} />
            <Route path="/earnings" element={<div>Earnings Dashboard</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Placeholder component for the overview section
const OwnerOverview = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border-b pb-3">
            <p className="font-medium">Booking #{item}</p>
            <p className="text-gray-600 text-sm">Property: Beach House #{item}</p>
            <p className="text-gray-500 text-xs">Check-in: June 1{item}, 2025</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerDashboardPage;