import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../../lib/supabase';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('id-ID');
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'daily': return 'day';
      case 'monthly': return 'month';
      case 'yearly': return 'year';
      default: return 'month';
    }
  };

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'male': return 'Putra';
      case 'female': return 'Putri';
      case 'mixed': return 'Campur';
      default: return type;
    }
  };

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case 'male': return 'bg-blue-500';
      case 'female': return 'bg-pink-500';
      case 'mixed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img 
          src={property.image_urls[0]} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white ${getPropertyTypeColor(property.property_type)}`}>
          {getPropertyTypeLabel(property.property_type)}
        </div>
        {property.is_verified && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-success-500 text-white">
            Verified
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
          {property.rating && (
            <div className="flex items-center gap-1 text-warning-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-medium">{property.rating}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-dark-500 dark:text-light-400 text-sm mt-2 mb-3">
          <MapPin size={14} />
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.facilities.slice(0, 3).map((facility, i) => (
            <span 
              key={i} 
              className="text-xs bg-light-300 dark:bg-dark-300 px-2 py-1 rounded-full"
            >
              {facility}
            </span>
          ))}
          {property.facilities.length > 3 && (
            <span className="text-xs bg-light-300 dark:bg-dark-300 px-2 py-1 rounded-full">
              +{property.facilities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-bold text-primary-600">
              Rp {formatPrice(property.price)}
            </p>
            <p className="text-xs text-dark-500 dark:text-light-400">
              per {getPeriodLabel(property.rental_period)}
            </p>
          </div>
          <Link 
            to={`/properties/${property.id}`} 
            className="btn-outline py-1 px-3 flex items-center gap-1"
          >
            Details
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;