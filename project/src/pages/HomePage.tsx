import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Clock, Star, MapPin, Filter, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?location=${encodeURIComponent(searchQuery)}`);
  };

  const features = [
    {
      icon: <Search className="w-8 h-8 text-primary-600" />,
      title: 'Easy Search',
      description: 'Find your perfect kost based on location, price, and facilities with our advanced filtering system.'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: 'Verified Listings',
      description: 'All properties are verified by our team to ensure quality and accuracy of information.'
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: 'Quick Booking',
      description: 'Book your kost instantly with our easy online booking and payment system.'
    }
  ];

  // Featured properties (simulated for demo)
  const featuredProperties = [
    {
      id: '1',
      title: 'Kost Putri Harmoni',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      price: 1500000,
      type: 'female',
      location: 'Jl. Harmoni No. 123, Jakarta Pusat',
      rating: 4.8,
      facilities: ['AC', 'WiFi', 'Private Bathroom']
    },
    {
      id: '2',
      title: 'Kost Putra Sejahtera',
      image: 'https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      price: 1200000,
      type: 'male',
      location: 'Jl. Makmur No. 45, Bandung',
      rating: 4.5,
      facilities: ['WiFi', 'Shared Kitchen', 'Parking']
    },
    {
      id: '3',
      title: 'Kost Exclusive Menteng',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      price: 2500000,
      type: 'mixed',
      location: 'Menteng, Jakarta Pusat',
      rating: 4.9,
      facilities: ['AC', 'WiFi', 'Private Bathroom', 'TV']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-dark-100 to-transparent opacity-80 z-10"></div>
          <img 
            src="https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Kost with LILL KOST
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Search, book, and manage your boarding house experience all in one place.
              Get exclusive deals and verified properties.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
                  <input
                    type="text"
                    placeholder="Search by city, area, or address..."
                    className="w-full pl-12 pr-4 py-4 rounded-lg border-0 focus:ring-2 focus:ring-primary-600 text-dark-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-6 py-4 font-medium transition-colors flex items-center justify-center"
                >
                  <Search className="mr-2" size={20} />
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-dark-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LILL KOST?</h2>
            <p className="text-dark-500 dark:text-light-400 max-w-2xl mx-auto">
              We make finding and booking your perfect kost simple, secure, and hassle-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-light-100 dark:bg-dark-200 p-8 rounded-xl shadow-soft hover:shadow-soft-lg transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-dark-500 dark:text-light-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-light-200 dark:bg-dark-200">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <Link 
              to="/search" 
              className="text-primary-600 dark:text-primary-500 font-medium flex items-center hover:underline"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white ${
                    property.type === 'female' ? 'bg-pink-500' :
                    property.type === 'male' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {property.type === 'female' ? 'Putri' : 
                     property.type === 'male' ? 'Putra' : 'Campur'}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
                    <div className="flex items-center gap-1 text-warning-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-dark-500 dark:text-light-400 text-sm mt-2 mb-3">
                    <MapPin size={14} />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.facilities.map((facility, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-light-300 dark:bg-dark-300 px-2 py-1 rounded-full"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-primary-600">
                        Rp {property.price.toLocaleString('id-ID')}
                      </p>
                      <p className="text-xs text-dark-500 dark:text-light-400">per month</p>
                    </div>
                    <Link 
                      to={`/properties/${property.id}`} 
                      className="btn-outline py-1"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800 dark:bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Are You a Property Owner?</h2>
              <p className="text-primary-100 mb-6">
                List your property on LILL KOST and reach thousands of potential tenants.
                Our platform provides tools to help you manage bookings, payments, and communication.
              </p>
              <Link 
                to="/register" 
                className="inline-flex items-center px-6 py-3 bg-white text-primary-800 rounded-lg font-medium hover:bg-primary-100 transition-colors"
              >
                Register as Owner
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-primary-700 p-8 rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-4">Benefits for Property Owners</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary-500 flex-shrink-0 mt-1"></div>
                  <span>Reach more potential tenants with verified profiles</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary-500 flex-shrink-0 mt-1"></div>
                  <span>Manage your properties and bookings efficiently</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary-500 flex-shrink-0 mt-1"></div>
                  <span>Secure payment system with multiple options</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary-500 flex-shrink-0 mt-1"></div>
                  <span>Analytics and insights to optimize your listings</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;