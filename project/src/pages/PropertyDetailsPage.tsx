import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  User, 
  Wifi, 
  Droplets, 
  Fan, 
  Car, 
  Utensils, 
  Bath, 
  Tv, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Share2, 
  Star, 
  Phone, 
  MessageCircle, 
  Heart 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Property, Review, User as UserType } from '../lib/supabase';
import PropertyCard from '../components/property/PropertyCard';

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState('details');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Icons for facilities
  const facilityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi size={18} />,
    'Water': <Droplets size={18} />,
    'AC': <Fan size={18} />,
    'Parking': <Car size={18} />,
    'Kitchen': <Utensils size={18} />,
    'Private Bathroom': <Bath size={18} />,
    'Shared Bathroom': <Bath size={18} />,
    'TV': <Tv size={18} />,
    'Laundry': <Droplets size={18} />,
    'Furniture': <Home size={18} />
  };

  // Mock data for demonstration
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call to get property details
    setTimeout(() => {
      // In a real app, fetch from Supabase here
      const mockProperty: Property = {
        id: id || '1',
        title: 'Kost Putri Harmoni',
        description: 'Kost putri nyaman dengan fasilitas lengkap, lokasi strategis dekat kampus dan pusat kota. Lingkungan aman dan tenang, cocok untuk mahasiswa dan pekerja. Kamar bersih dengan pencahayaan alami yang baik.\n\nDisediakan fasilitas AC, WiFi cepat, kamar mandi dalam, serta lemari dan meja belajar. Area umum berupa ruang tamu dan dapur bersama yang bisa digunakan bersama penghuni lain.\n\nDikelola langsung oleh pemilik yang tinggal dekat kost untuk memastikan kenyamanan dan keamanan penghuni.',
        address: 'Jl. Harmoni No. 123',
        city: 'Jakarta Pusat',
        price: 1500000,
        rental_period: 'monthly',
        property_type: 'female',
        room_size: '3x4 m',
        image_urls: [
          'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
          'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg',
          'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg',
          'https://images.pexels.com/photos/2029694/pexels-photo-2029694.jpeg',
        ],
        facilities: ['AC', 'WiFi', 'Private Bathroom', 'Furniture', 'Laundry', 'Kitchen', 'Parking'],
        latitude: -6.170024,
        longitude: 106.830285,
        owner_id: 'owner1',
        created_at: '2023-01-15',
        available: true,
        is_verified: true,
        rating: 4.8,
      };

      // Mock reviews
      const mockReviews: Review[] = [
        {
          id: '1',
          property_id: id || '1',
          tenant_id: 'user1',
          rating: 5,
          comment: 'Kamar sangat bersih dan nyaman. Lokasi strategis, dekat dengan kampus dan mall. Owner ramah dan responsif. Sangat recommended!',
          created_at: '2023-05-20',
          user: {
            id: 'user1',
            email: 'user1@example.com',
            full_name: 'Sinta Dewi',
            avatar_url: null,
            role: 'tenant',
            created_at: '2023-01-01'
          }
        },
        {
          id: '2',
          property_id: id || '1',
          tenant_id: 'user2',
          rating: 4,
          comment: 'Fasilitas lengkap, lingkungan aman. WiFi cepat. Kamar mandi bersih. Cuma agak berisik kalau malam karena dekat jalan raya.',
          created_at: '2023-04-15',
          user: {
            id: 'user2',
            email: 'user2@example.com',
            full_name: 'Rahma Putri',
            avatar_url: null,
            role: 'tenant',
            created_at: '2023-01-05'
          }
        },
        {
          id: '3',
          property_id: id || '1',
          tenant_id: 'user3',
          rating: 5,
          comment: 'Pemilik kost sangat helpfull, ketika ada masalah langsung ditangani. Fasilitas sesuai dengan yang dijanjikan. Lokasi strategis.',
          created_at: '2023-03-10',
          user: {
            id: 'user3',
            email: 'user3@example.com',
            full_name: 'Anisa Rahmawati',
            avatar_url: null,
            role: 'tenant',
            created_at: '2023-01-10'
          }
        }
      ];

      // Mock similar properties
      const mockSimilarProperties: Property[] = [
        {
          id: '2',
          title: 'Kost Putri Melati',
          description: 'Kost putri bersih dan nyaman di area Menteng.',
          address: 'Jl. Menteng Raya No. 45',
          city: 'Jakarta Pusat',
          price: 1700000,
          rental_period: 'monthly',
          property_type: 'female',
          room_size: '3x3.5 m',
          image_urls: [
            'https://images.pexels.com/photos/2029731/pexels-photo-2029731.jpeg',
            'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg',
          ],
          facilities: ['AC', 'WiFi', 'Private Bathroom', 'Laundry'],
          latitude: -6.196009,
          longitude: 106.830993,
          owner_id: 'owner2',
          created_at: '2023-02-05',
          available: true,
          is_verified: true,
          rating: 4.7,
        },
        {
          id: '3',
          title: 'Kost Putri Dahlia',
          description: 'Kost eksklusif khusus putri dengan area taman.',
          address: 'Jl. Cikini Raya No. 10',
          city: 'Jakarta Pusat',
          price: 1800000,
          rental_period: 'monthly',
          property_type: 'female',
          room_size: '3.5x4 m',
          image_urls: [
            'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
            'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
          ],
          facilities: ['AC', 'WiFi', 'Private Bathroom', 'TV', 'Furniture'],
          latitude: -6.193028,
          longitude: 106.842900,
          owner_id: 'owner3',
          created_at: '2023-01-25',
          available: true,
          is_verified: true,
          rating: 4.9,
        }
      ];

      setProperty(mockProperty);
      setReviews(mockReviews);
      setSimilarProperties(mockSimilarProperties);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleNextImage = () => {
    if (property) {
      setActiveImage((prev) => (prev === property.image_urls.length - 1 ? 0 : prev + 1));
    }
  };

  const handlePrevImage = () => {
    if (property) {
      setActiveImage((prev) => (prev === 0 ? property.image_urls.length - 1 : prev - 1));
    }
  };

  const handleSaveProperty = () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { redirectTo: `/properties/${id}` } });
      return;
    }
    
    setIsSaved(!isSaved);
    // In a real app, would call Supabase to save/unsave
  };

  const handleBookNow = () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { redirectTo: `/booking/${id}` } });
      return;
    }
    
    navigate(`/booking/${id}`);
  };

  const handleContactOwner = () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { redirectTo: `/properties/${id}` } });
      return;
    }
    
    // In a real app, would open chat or contact form
    alert('Contact functionality would open here');
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
        <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Link to="/search" className="btn-primary">
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-100 pb-12">
      {/* Breadcrumbs */}
      <div className="container-custom py-4">
        <div className="flex items-center text-sm text-dark-500 dark:text-light-400">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/search" className="hover:text-primary-600 dark:hover:text-primary-400">Search</Link>
          <span className="mx-2">/</span>
          <span className="text-dark-800 dark:text-white">{property.title}</span>
        </div>
      </div>
      
      {/* Image Gallery */}
      <div className="relative h-[40vh] md:h-[60vh] bg-dark-200">
        <img 
          src={property.image_urls[activeImage]} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
        
        {property.image_urls.length > 1 && (
          <>
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center transition-opacity hover:bg-black/70"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center transition-opacity hover:bg-black/70"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {property.image_urls.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-2 h-2 rounded-full ${activeImage === index ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="container-custom mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    property.property_type === 'female' ? 'bg-pink-500' :
                    property.property_type === 'male' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {property.property_type === 'female' ? 'Putri' : 
                     property.property_type === 'male' ? 'Putra' : 'Campur'}
                  </span>
                  {property.is_verified && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-success-500 text-white">
                      Verified
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center gap-1 text-dark-500 dark:text-light-400 mb-4">
                  <MapPin size={16} />
                  <span>{property.address}, {property.city}</span>
                </div>
              </div>
              
              <button 
                onClick={handleSaveProperty}
                className={`p-2 rounded-full ${
                  isSaved 
                    ? 'bg-error-100 dark:bg-error-900 text-error-600 dark:text-error-300' 
                    : 'bg-light-200 dark:bg-dark-300 text-dark-500 dark:text-light-400'
                }`}
              >
                <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-light-300 dark:border-dark-300 mt-6 mb-6">
              <div className="flex">
                <button
                  onClick={() => setSelectedTab('details')}
                  className={`py-2 px-4 font-medium text-sm border-b-2 ${
                    selectedTab === 'details'
                      ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500'
                      : 'border-transparent text-dark-500 dark:text-light-400'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setSelectedTab('facilities')}
                  className={`py-2 px-4 font-medium text-sm border-b-2 ${
                    selectedTab === 'facilities'
                      ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500'
                      : 'border-transparent text-dark-500 dark:text-light-400'
                  }`}
                >
                  Facilities
                </button>
                <button
                  onClick={() => setSelectedTab('location')}
                  className={`py-2 px-4 font-medium text-sm border-b-2 ${
                    selectedTab === 'location'
                      ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500'
                      : 'border-transparent text-dark-500 dark:text-light-400'
                  }`}
                >
                  Location
                </button>
                <button
                  onClick={() => setSelectedTab('reviews')}
                  className={`py-2 px-4 font-medium text-sm border-b-2 ${
                    selectedTab === 'reviews'
                      ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500'
                      : 'border-transparent text-dark-500 dark:text-light-400'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="mb-8">
              {selectedTab === 'details' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">About this property</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 mb-6">
                    <div>
                      <p className="text-dark-500 dark:text-light-400 text-sm">Room Size</p>
                      <p className="font-medium">{property.room_size}</p>
                    </div>
                    <div>
                      <p className="text-dark-500 dark:text-light-400 text-sm">Property Type</p>
                      <p className="font-medium">
                        {property.property_type === 'female' ? 'Putri' : 
                         property.property_type === 'male' ? 'Putra' : 'Campur'}
                      </p>
                    </div>
                    <div>
                      <p className="text-dark-500 dark:text-light-400 text-sm">Availability</p>
                      <p className="font-medium">
                        {property.available ? 'Available' : 'Not Available'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="whitespace-pre-line text-dark-700 dark:text-light-300 leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                </div>
              )}
              
              {selectedTab === 'facilities' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-light-200 dark:bg-dark-300 rounded-lg">
                        <div className="text-primary-600 dark:text-primary-400">
                          {facilityIcons[facility] || <Home size={18} />}
                        </div>
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTab === 'location' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Location</h3>
                  <div className="h-80 rounded-lg overflow-hidden mb-4">
                    <MapContainer 
                      center={[property.latitude, property.longitude]} 
                      zoom={15} 
                      scrollWheelZoom={false}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[property.latitude, property.longitude]} />
                    </MapContainer>
                  </div>
                  <p className="text-dark-700 dark:text-light-300">
                    {property.address}, {property.city}
                  </p>
                </div>
              )}
              
              {selectedTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Reviews</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-warning-500">
                        <Star size={20} fill="currentColor" />
                        <span className="text-lg font-bold">{property.rating}</span>
                      </div>
                      <span className="text-dark-500 dark:text-light-400">({reviews.length} reviews)</span>
                    </div>
                  </div>
                  
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-light-300 dark:border-dark-300 pb-6 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                                {review.user?.full_name?.[0] || <User size={16} />}
                              </div>
                              <div>
                                <p className="font-medium">{review.user?.full_name}</p>
                                <p className="text-sm text-dark-500 dark:text-light-400">
                                  {new Date(review.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-warning-500">
                              <Star size={14} fill="currentColor" />
                              <span className="font-medium">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-dark-700 dark:text-light-300 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-dark-500 dark:text-light-400 py-4">
                      No reviews yet for this property.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Price Card */}
            <div className="bg-white dark:bg-dark-200 rounded-lg shadow-soft p-6 mb-6 sticky top-20">
              <div className="mb-4">
                <p className="text-2xl font-bold text-primary-600">
                  Rp {property.price.toLocaleString('id-ID')}
                  <span className="text-sm font-normal text-dark-500 dark:text-light-400">
                    /{property.rental_period === 'monthly' ? 'month' : 
                      property.rental_period === 'yearly' ? 'year' : 'day'}
                  </span>
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Calendar size={16} className="text-dark-500 dark:text-light-400" />
                  <span className="text-sm text-dark-500 dark:text-light-400">
                    {property.available ? 'Available Now' : 'Not Available'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <button 
                  onClick={handleBookNow}
                  className="btn-primary w-full flex items-center justify-center"
                  disabled={!property.available}
                >
                  Book Now
                </button>
                <button 
                  onClick={handleContactOwner}
                  className="btn-outline w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Contact Owner
                </button>
                <a 
                  href="tel:+6281234567890"
                  className="btn w-full flex items-center justify-center gap-2 bg-light-200 dark:bg-dark-300 hover:bg-light-300 dark:hover:bg-dark-400 text-dark-800 dark:text-white transition-colors"
                >
                  <Phone size={18} />
                  Call Owner
                </a>
              </div>
              
              <div className="bg-light-200 dark:bg-dark-300 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Share this property</h4>
                <div className="flex gap-3">
                  <button className="p-2 rounded-full bg-light-300 dark:bg-dark-400 hover:bg-light-400 dark:hover:bg-dark-500 transition-colors">
                    <Share2 size={18} />
                  </button>
                  {/* Add more share buttons as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailsPage;