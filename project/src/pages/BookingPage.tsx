import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, CreditCard, ChevronRight, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Property } from '../lib/supabase';
import { format, addDays, addMonths, addYears } from 'date-fns';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank' | 'ewallet' | 'qris';
  icon: string;
}

const BookingPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState<Date>(addDays(new Date(), 1));
  const [duration, setDuration] = useState(1);
  const [durationUnit, setDurationUnit] = useState<'daily' | 'monthly' | 'yearly'>('monthly');
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // Mock payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'bca',
      name: 'BCA Virtual Account',
      type: 'bank',
      icon: 'https://play-lh.googleusercontent.com/zQ7qUjsDnYxkEMDfEIaAASEI9BySPw-HkWEDFgABUBrLyCaT-HZ0xRWdawAa9wLl6rE=w240-h480-rw'
    },
    {
      id: 'mandiri',
      name: 'Mandiri Virtual Account',
      type: 'bank',
      icon: 'https://play-lh.googleusercontent.com/Oxt3AdPvNCkOQYu_6HBmjzKQZhJFGQ4s_GrNUGWYbJmYITAUO3YuGk0TLCKbEONF_Q=w240-h480-rw'
    },
    {
      id: 'gopay',
      name: 'GoPay',
      type: 'ewallet',
      icon: 'https://play-lh.googleusercontent.com/kDzXydb6ZU7AxCKRfU3xuGjYOi7ZPr9FYOiKZcciLy_t4C37Qo9MFMmL6x_g9Bts55A=w240-h480-rw'
    },
    {
      id: 'ovo',
      name: 'OVO',
      type: 'ewallet',
      icon: 'https://play-lh.googleusercontent.com/98XQv2ybAJAOnDz_BSxbMLCNy9Muu74QQn7Fhkx0nEjtuxQvd3GmJSCR_eW4S1PPZw=w240-h480-rw'
    },
    {
      id: 'dana',
      name: 'DANA',
      type: 'ewallet',
      icon: 'https://play-lh.googleusercontent.com/T1_WHAGs5WZePQnQZs3hR70N_mVdKblp43tkEVKmspIUQKB0YMfI8DlwzZfbCF3kQQ=w240-h480-rw'
    },
    {
      id: 'qris',
      name: 'QRIS',
      type: 'qris',
      icon: 'https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr=w240-h480-rw'
    }
  ];

  // Load property data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call to get property details
    setTimeout(() => {
      // In a real app, fetch from Supabase here
      const mockProperty: Property = {
        id: propertyId || '1',
        title: 'Kost Putri Harmoni',
        description: 'Kost putri nyaman dengan fasilitas lengkap, lokasi strategis dekat kampus dan pusat kota.',
        address: 'Jl. Harmoni No. 123',
        city: 'Jakarta Pusat',
        price: 1500000,
        rental_period: 'monthly',
        property_type: 'female',
        room_size: '3x4 m',
        image_urls: [
          'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
          'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
        ],
        facilities: ['AC', 'WiFi', 'Private Bathroom', 'Furniture'],
        latitude: -6.170024,
        longitude: 106.830285,
        owner_id: 'owner1',
        created_at: '2023-01-15',
        available: true,
        is_verified: true,
        rating: 4.8,
      };

      setProperty(mockProperty);
      setDurationUnit(mockProperty.rental_period);
      calculateTotalPrice(mockProperty.price, duration, mockProperty.rental_period);
      setLoading(false);
    }, 1000);
  }, [propertyId]);

  // Calculate total price whenever duration changes
  useEffect(() => {
    if (property) {
      calculateTotalPrice(property.price, duration, durationUnit);
    }
  }, [duration, durationUnit, property]);

  const calculateTotalPrice = (basePrice: number, dur: number, unit: string) => {
    let total = basePrice * dur;
    
    // Apply discounts for longer durations
    if (unit === 'monthly' && dur >= 6) {
      total = total * 0.95; // 5% discount for 6+ months
    } else if (unit === 'yearly' && dur >= 1) {
      total = total * 0.9; // 10% discount for yearly
    }
    
    setTotalPrice(total);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setDuration(value);
    }
  };

  const handleDurationUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDurationUnit(e.target.value as 'daily' | 'monthly' | 'yearly');
  };

  const getEndDate = () => {
    if (durationUnit === 'daily') {
      return addDays(checkInDate, duration);
    } else if (durationUnit === 'monthly') {
      return addMonths(checkInDate, duration);
    } else {
      return addYears(checkInDate, duration);
    }
  };

  const handleContinueToPayment = () => {
    setBookingStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSelection = (paymentId: string) => {
    setSelectedPaymentMethod(paymentId);
  };

  const handleSubmitBooking = () => {
    // In a real app, this would call Supabase to create the booking
    // and then integrate with payment gateway
    setBookingStep(3);
    window.scrollTo(0, 0);
    
    // Simulate payment processing delay
    setTimeout(() => {
      // In a real app, this would be handled by a webhook from the payment gateway
      setBookingStep(4);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="container-custom py-12 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Property not found</h2>
        <p className="mb-6">The property you're trying to book doesn't exist or has been removed.</p>
        <Link to="/search" className="btn-primary">
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-100 py-8">
      <div className="container-custom">
        {/* Booking Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className={`flex flex-col items-center ${bookingStep >= 1 ? 'text-primary-600 dark:text-primary-500' : 'text-dark-400 dark:text-dark-500'}`}>
              <div className={`w-8 h-8 rounded-full ${bookingStep >= 1 ? 'bg-primary-600 dark:bg-primary-500 text-white' : 'bg-light-300 dark:bg-dark-300 text-dark-500 dark:text-light-400'} flex items-center justify-center mb-2`}>
                1
              </div>
              <span className="text-sm">Details</span>
            </div>
            <div className={`flex-grow border-t-2 ${bookingStep >= 2 ? 'border-primary-600 dark:border-primary-500' : 'border-light-300 dark:border-dark-300'} mx-4`}></div>
            <div className={`flex flex-col items-center ${bookingStep >= 2 ? 'text-primary-600 dark:text-primary-500' : 'text-dark-400 dark:text-dark-500'}`}>
              <div className={`w-8 h-8 rounded-full ${bookingStep >= 2 ? 'bg-primary-600 dark:bg-primary-500 text-white' : 'bg-light-300 dark:bg-dark-300 text-dark-500 dark:text-light-400'} flex items-center justify-center mb-2`}>
                2
              </div>
              <span className="text-sm">Payment</span>
            </div>
            <div className={`flex-grow border-t-2 ${bookingStep >= 3 ? 'border-primary-600 dark:border-primary-500' : 'border-light-300 dark:border-dark-300'} mx-4`}></div>
            <div className={`flex flex-col items-center ${bookingStep >= 3 ? 'text-primary-600 dark:text-primary-500' : 'text-dark-400 dark:text-dark-500'}`}>
              <div className={`w-8 h-8 rounded-full ${bookingStep >= 3 ? 'bg-primary-600 dark:bg-primary-500 text-white' : 'bg-light-300 dark:bg-dark-300 text-dark-500 dark:text-light-400'} flex items-center justify-center mb-2`}>
                3
              </div>
              <span className="text-sm">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Content */}
          <div className="lg:col-span-2">
            {bookingStep === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-dark-200 rounded-lg shadow-soft p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-500 dark:text-light-400 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        className="input" 
                        value={profile?.full_name || ''} 
                        readOnly 
                      />
                    </div>
                    <div>
                      <label className="block text-dark-500 dark:text-light-400 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        className="input" 
                        value={user?.email || ''} 
                        readOnly 
                      />
                    </div>
                    <div>
                      <label className="block text-dark-500 dark:text-light-400 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        className="input" 
                        placeholder="Your phone number" 
                        required 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Booking Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-500 dark:text-light-400 mb-2">Check-in Date</label>
                      <input 
                        type="date" 
                        className="input" 
                        value={format(checkInDate, 'yyyy-MM-dd')}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        onChange={(e) => setCheckInDate(new Date(e.target.value))}
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-dark-500 dark:text-light-400 mb-2">Duration</label>
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          className="input w-1/3" 
                          min="1" 
                          value={duration}
                          onChange={handleDurationChange}
                          required 
                        />
                        <select 
                          className="input w-2/3"
                          value={durationUnit}
                          onChange={handleDurationUnitChange}
                        >
                          <option value="daily">Days</option>
                          <option value="monthly">Months</option>
                          <option value="yearly">Years</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-dark-500 dark:text-light-400 mb-2">End Date</label>
                      <input 
                        type="date" 
                        className="input" 
                        value={format(getEndDate(), 'yyyy-MM-dd')}
                        readOnly 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Notes (Optional)</h3>
                  <textarea 
                    className="input h-24" 
                    placeholder="Any special requirements or questions for the owner"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={handleContinueToPayment}
                    className="btn-primary"
                  >
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}
            
            {bookingStep === 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-dark-200 rounded-lg shadow-soft p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                
                <div className="mb-6">
                  <div className="bg-light-200 dark:bg-dark-300 p-4 rounded-lg flex items-start gap-3">
                    <Info size={20} className="text-primary-600 flex-shrink-0 mt-1" />
                    <p className="text-dark-700 dark:text-light-300 text-sm">
                      Your booking will be confirmed once payment is received. You can cancel your booking for free up to 48 hours before your check-in date.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="border-b border-light-300 dark:border-dark-300 pb-2 mb-1">
                      <h4 className="font-medium mb-2">Bank Transfer</h4>
                    </div>
                    {paymentMethods.filter(m => m.type === 'bank').map(method => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentSelection(method.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          selectedPaymentMethod === method.id 
                            ? 'border-primary-600 dark:border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-light-300 dark:border-dark-300'
                        }`}
                      >
                        <img src={method.icon} alt={method.name} className="w-8 h-8 rounded" />
                        <span>{method.name}</span>
                        {selectedPaymentMethod === method.id && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-primary-600 dark:bg-primary-500"></div>
                        )}
                      </button>
                    ))}
                    
                    <div className="border-b border-light-300 dark:border-dark-300 pb-2 mb-1 mt-4">
                      <h4 className="font-medium mb-2">E-Wallet</h4>
                    </div>
                    {paymentMethods.filter(m => m.type === 'ewallet').map(method => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentSelection(method.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          selectedPaymentMethod === method.id 
                            ? 'border-primary-600 dark:border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-light-300 dark:border-dark-300'
                        }`}
                      >
                        <img src={method.icon} alt={method.name} className="w-8 h-8 rounded" />
                        <span>{method.name}</span>
                        {selectedPaymentMethod === method.id && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-primary-600 dark:bg-primary-500"></div>
                        )}
                      </button>
                    ))}
                    
                    <div className="border-b border-light-300 dark:border-dark-300 pb-2 mb-1 mt-4">
                      <h4 className="font-medium mb-2">QRIS</h4>
                    </div>
                    {paymentMethods.filter(m => m.type === 'qris').map(method => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentSelection(method.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          selectedPaymentMethod === method.id 
                            ? 'border-primary-600 dark:border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-light-300 dark:border-dark-300'
                        }`}
                      >
                        <img src={method.icon} alt={method.name} className="w-8 h-8 rounded" />
                        <span>{method.name}</span>
                        {selectedPaymentMethod === method.id && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-primary-600 dark:bg-primary-500"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => setBookingStep(1)}
                    className="btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleSubmitBooking}
                    className="btn-primary"
                    disabled={!selectedPaymentMethod}
                  >
                    Pay Now
                  </button>
                </div>
              </motion.div>
            )}
            
            {bookingStep === 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-dark-200 rounded-lg shadow-soft p-6 text-center"
              >
                <div className="max-w-md mx-auto">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto mb-6"></div>
                  <h2 className="text-2xl font-bold mb-4">Processing Payment</h2>
                  <p className="text-dark-500 dark:text-light-400 mb-6">
                    Please wait while we process your payment. This may take a few moments.
                  </p>
                  <div className="bg-light-200 dark:bg-dark-300 p-4 rounded-lg">
                    <p className="text-sm text-dark-700 dark:text-light-300">
                      Do not close or refresh this page until the payment is complete.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {bookingStep === 4 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-dark-200 rounded-lg shadow-soft p-6 text-center"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-success-100 dark:bg-success-900 text-success-600 dark:text-success-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
                  <p className="text-dark-500 dark:text-light-400 mb-6">
                    Your booking has been successfully confirmed. A confirmation email has been sent to your email address.
                  </p>
                  <div className="bg-light-200 dark:bg-dark-300 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-2">Booking Details</h3>
                    <div className="flex justify-between mb-1">
                      <span className="text-dark-500 dark:text-light-400">Booking ID:</span>
                      <span>BK12345678</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-dark-500 dark:text-light-400">Check-in Date:</span>
                      <span>{format(checkInDate, 'dd MMM yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-500 dark:text-light-400">Duration:</span>
                      <span>{duration} {durationUnit.replace(/ly$/, '')}{duration > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link to="/profile" className="btn-primary">
                      View My Bookings
                    </Link>
                    <Link to="/" className="btn-outline">
                      Back to Home
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-200 rounded-lg shadow-soft p-6 sticky top-20">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              
              <div className="flex items-start gap-3 pb-4 border-b border-light-300 dark:border-dark-300 mb-4">
                <img 
                  src={property.image_urls[0]} 
                  alt={property.title} 
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium">{property.title}</h4>
                  <div className="flex items-center text-sm text-dark-500 dark:text-light-400 mt-1">
                    <MapPin size={14} className="mr-1" />
                    <span className="line-clamp-1">{property.address}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-dark-500 dark:text-light-400">Check-in Date</span>
                  <span>{format(checkInDate, 'dd MMM yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-500 dark:text-light-400">Duration</span>
                  <span>{duration} {durationUnit.replace(/ly$/, '')}{duration > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-500 dark:text-light-400">End Date</span>
                  <span>{format(getEndDate(), 'dd MMM yyyy')}</span>
                </div>
              </div>
              
              <div className="border-t border-light-300 dark:border-dark-300 pt-3 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-dark-500 dark:text-light-400">Base Price</span>
                  <span>Rp {property.price.toLocaleString('id-ID')} × {duration}</span>
                </div>
                {((durationUnit === 'monthly' && duration >= 6) || (durationUnit === 'yearly' && duration >= 1)) && (
                  <div className="flex justify-between mb-2 text-success-600 dark:text-success-400">
                    <span>Discount</span>
                    <span>
                      {durationUnit === 'monthly' && duration >= 6 ? '5%' : '10%'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
              
              {bookingStep < 3 && (
                <div className="bg-light-200 dark:bg-dark-300 p-3 rounded text-sm">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <p>Payment is required to confirm your booking. Cancellation is free up to 48 hours before check-in.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;