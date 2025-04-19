import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Shield, Home, Users, Building, Settings } from 'lucide-react';

const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Shield className="mr-2" /> Admin Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Properties</h2>
            <Building className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold">42</p>
          <p className="text-gray-500 text-sm">Total properties</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Users</h2>
            <Users className="text-green-600" />
          </div>
          <p className="text-3xl font-bold">189</p>
          <p className="text-gray-500 text-sm">Registered users</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Bookings</h2>
            <Home className="text-purple-600" />
          </div>
          <p className="text-3xl font-bold">63</p>
          <p className="text-gray-500 text-sm">Active bookings</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <Settings className="text-amber-600" />
          </div>
          <p className="text-3xl font-bold">$24,560</p>
          <p className="text-gray-500 text-sm">Monthly revenue</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b">
          <Link to="/admin" className="px-6 py-4 font-medium hover:bg-gray-50 border-b-2 border-blue-500">
            Overview
          </Link>
          <Link to="/admin/properties" className="px-6 py-4 font-medium hover:bg-gray-50">
            Properties
          </Link>
          <Link to="/admin/users" className="px-6 py-4 font-medium hover:bg-gray-50">
            Users
          </Link>
          <Link to="/admin/bookings" className="px-6 py-4 font-medium hover:bg-gray-50">
            Bookings
          </Link>
          <Link to="/admin/settings" className="px-6 py-4 font-medium hover:bg-gray-50">
            Settings
          </Link>
        </div>
        
        <div className="p-6">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/properties" element={<div>Properties Management</div>} />
            <Route path="/users" element={<div>Users Management</div>} />
            <Route path="/bookings" element={<div>Bookings Management</div>} />
            <Route path="/settings" element={<div>Admin Settings</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Placeholder component for the overview section
const AdminOverview = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="border-b pb-3">
            <p className="font-medium">New booking request #{item}</p>
            <p className="text-gray-600 text-sm">Property: Luxury Villa #{item}</p>
            <p className="text-gray-500 text-xs">2 hours ago</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;