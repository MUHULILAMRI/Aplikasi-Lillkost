import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Filter, X, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PropertyCard from '../components/property/PropertyCard';
import { Property } from '../lib/supabase';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  
  // Filter states
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [rentalPeriod, setRentalPeriod] = useState<string>('');
  
  // Sample data for demonstration
  const mockProperties: Property[] = [
    {
      id: '1',
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
    },
    {
      id: '2',
      title: 'Kost Putra Sejahtera',
      description: 'Kost putra dengan lingkungan yang tenang dan aman. Cocok untuk mahasiswa dan pekerja.',
      address: 'Jl. Makmur No. 45',
      city: 'Bandung',
      price: 1200000,
      rental_period: 'monthly',
      property_type: 'male',
      room_size: '3x3 m',
      image_urls: [
        'https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg',
        'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg',
      ],
      facilities: ['WiFi', 'Shared Kitchen', 'Parking'],
      latitude: -6.914744,
      longitude: 107.609810,
      owner_id: 'owner2',
      created_at: '2023-02-10',
      available: true,
      is_verified: true,
      rating: 4.5,
    },
    {
      id: '3',
      title: 'Kost Exclusive Menteng',
      description: 'Kost eksklusif dengan konsep co-living modern, lokasi premium di pusat kota.',
      address: 'Jl. Menteng Raya No. 10',
      city: 'Jakarta Pusat',
      price: 2500000,
      rental_period: 'monthly',
      property_type: 'mixed',
      room_size: '4x5 m',
      image_urls: [
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
        'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg',
      ],
      facilities: ['AC', 'WiFi', 'Private Bathroom', 'TV', 'Laundry'],
      latitude: -6.196009,
      longitude: 106.830993,
      owner_id: 'owner3',
      created_at: '2023-03-05',
      available: true,
      is_verified: true,
      rating: 4.9,
    },
    {
      id: '4',
      title: 'Kost Bersama Tebet',
      description: 'Kost dengan harga terjangkau, fasilitas lengkap, dekat dengan stasiun MRT.',
      address: 'Jl. Tebet Barat No. 77',
      city: 'Jakarta Selatan',
      price: 1800000,
      rental_period: 'monthly',
      property_type: 'mixed',
      room_size: '3.5x4 m',
      image_urls: [
        'https://images.pexels.com/photos/2029694/pexels-photo-2029694.jpeg',
        'https://images.pexels.com/photos/2029731/pexels-photo-2029731.jpeg',
      ],
      facilities: ['AC', 'WiFi', 'Shared Bathroom', 'Furniture'],
      latitude: -6.226631,
      longitude: 106.844513,
      owner_id: 'owner4',
      created_at: '2023-04-20',
      available: true,
      is_verified: true,
      rating: 4.6,
    },
    {
      id: '5',
      title: 'Kost Putri Benhil',
      description: 'Kost putri dengan harga ekonomis namun tetap nyaman, lokasi strategis.',
      address: 'Jl. Benhil Raya No. 23',
      city: 'Jakarta Pusat',
      price: 1300000,
      rental_period: 'monthly',
      property_type: 'female',
      room_size: '3x3 m',
      image_urls: [
        'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
        'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg',
      ],
      facilities: ['WiFi', 'Shared Bathroom', 'Kitchen Access'],
      latitude: -6.212080,
      longitude: 106.809198,
      owner_id: 'owner5',
      created_at: '2023-05-15',
      available: true,
      is_verified: true,
      rating: 4.4,
    }
  ];
  
  // Load properties
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    // In a real app, you would fetch from Supabase here
    setTimeout(() => {
      // Apply filters based on search params
      let filteredProperties = [...mockProperties];
      
      const locationParam = searchParams.get('location');
      if (locationParam) {
        filteredProperties = filteredProperties.filter(property => 
          property.city.toLowerCase().includes(locationParam.toLowerCase()) ||
          property.address.toLowerCase().includes(locationParam.toLowerCase())
        );
      }
      
      setProperties(filteredProperties);
      setLoading(false);
    }, 1000);
  }, [searchParams]);
  
  const applyFilters = () => {
    // Update search params based on filters
    const params = new URLSearchParams();
    
    if (location) params.set('location', location);
    
    if (propertyType.length > 0) {
      params.set('type', propertyType.join(','));
    }
    
    if (facilities.length > 0) {
      params.set('facilities', facilities.join(','));
    }
    
    if (rentalPeriod) {
      params.set('period', rentalPeriod);
    }
    
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    
    setSearchParams(params);
    setShowFilters(false);
  };
  
  const resetFilters = () => {
    setLocation('');
    setPriceRange([0, 5000000]);
    setPropertyType([]);
    setFacilities([]);
    setRentalPeriod('');
    setSearchParams({});
  };
  
  const togglePropertyType = (type: string) => {
    if (propertyType.includes(type)) {
      setPropertyType(propertyType.filter(t => t !== type));
    } else {
      setPropertyType([...propertyType, type]);
    }
  };
  
  const toggleFacility = (facility: string) => {
    if (facilities.includes(facility)) {
      setFacilities(facilities.filter(f => f !== facility));
    } else {
      setFacilities([...facilities, facility]);
    }
  };
  
  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-100 pb-12">
      {/* Search Header */}
      <div className="bg-white dark:bg-dark-200 shadow-sm py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search by city, area, or address..."
                className="input pl-12"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center justify-center"
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
            
            <button 
              onClick={() => applyFilters()}
              className="btn-primary flex items-center justify-center"
            >
              <Search size={18} className="mr-2" />
              Search
            </button>
          </div>
          
          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4 bg-light-200 dark:bg-dark-300 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="text-dark-500 dark:text-light-400 hover:text-dark-800 dark:hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range (IDR)</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min="0"
                        step="100000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="input text-sm"
                        placeholder="Min"
                      />
                      <span>to</span>
                      <input
                        type="number"
                        min="0"
                        step="100000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="input text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Type</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => togglePropertyType('male')}
                        className={`px-3 py-1 rounded-full text-sm ${
                          propertyType.includes('male')
                            ? 'bg-blue-500 text-white'
                            : 'bg-light-300 dark:bg-dark-400 text-dark-500 dark:text-light-400'
                        }`}
                      >
                        Putra
                      </button>
                      <button
                        onClick={() => togglePropertyType('female')}
                        className={`px-3 py-1 rounded-full text-sm ${
                          propertyType.includes('female')
                            ? 'bg-pink-500 text-white'
                            : 'bg-light-300 dark:bg-dark-400 text-dark-500 dark:text-light-400'
                        }`}
                      >
                        Putri
                      </button>
                      <button
                        onClick={() => togglePropertyType('mixed')}
                        className={`px-3 py-1 rounded-full text-sm ${
                          propertyType.includes('mixed')
                            ? 'bg-purple-500 text-white'
                            : 'bg-light-300 dark:bg-dark-400 text-dark-500 dark:text-light-400'
                        }`}
                      >
                        Campur
                      </button>
                    </div>
                  </div>
                  
                  {/* Rental Period */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Rental Period</label>
                    <select
                      className="input"
                      value={rentalPeriod}
                      onChange={(e) => setRentalPeriod(e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="daily">Daily</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  
                  {/* Facilities */}
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-2">Facilities</label>
                    <div className="flex flex-wrap gap-2">
                      {['AC', 'WiFi', 'Private Bathroom', 'Shared Bathroom', 'Kitchen', 'Parking', 'Laundry', 'TV', 'Furniture'].map((facility) => (
                        <button
                          key={facility}
                          onClick={() => toggleFacility(facility)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            facilities.includes(facility)
                              ? 'bg-primary-500 text-white'
                              : 'bg-light-300 dark:bg-dark-400 text-dark-500 dark:text-light-400'
                          }`}
                        >
                          {facility}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 mt-6">
                  <button 
                    onClick={resetFilters}
                    className="btn-outline py-1"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={applyFilters}
                    className="btn-primary py-1"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="container-custom mt-6">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold">
              {loading ? 'Searching...' : `${properties.length} properties found`}
            </h1>
            {location && (
              <p className="text-dark-500 dark:text-light-400 text-sm">
                in {location}
              </p>
            )}
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowMap(!showMap)}
              className={`btn ${showMap ? 'btn-primary' : 'btn-outline'} py-1`}
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
            
            <div className="relative">
              <button className="btn-outline py-1 flex items-center">
                Sort By <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Map View */}
        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '400px', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 rounded-lg overflow-hidden shadow-soft"
            >
              <MapContainer 
                center={[-6.2, 106.8]} 
                zoom={12} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {properties.map((property) => (
                  <Marker key={property.id} position={[property.latitude, property.longitude]}>
                    <Popup>
                      <div className="p-1">
                        <h3 className="font-semibold text-sm">{property.title}</h3>
                        <p className="text-xs">{property.address}</p>
                        <p className="font-medium text-xs mt-1">Rp {property.price.toLocaleString('id-ID')}/month</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          // Results Grid
          properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            // No Results
            <div className="text-center py-12 bg-light-200 dark:bg-dark-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-dark-500 dark:text-light-400 mb-4">
                Try adjusting your search filters to find more results.
              </p>
              <button 
                onClick={resetFilters}
                className="btn-primary"
              >
                Reset Filters
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;