import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Loader2 } from 'lucide-react';
import { getSavedProperties } from '../../lib/firebase/firestore';
import { PropertyCard } from '../PropertyCard';
import { useAuth } from '../../hooks/useAuth';
import { Property } from '../../types';

export const SavedProperties = () => {
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSaved = async () => {
      if (user) {
        setLoading(true);
        const saved = await getSavedProperties(user.uid);
        // Cast the result to Property[] assuming firestore returns matching shape or close enough
        setSavedProperties(saved as Property[]);
        setLoading(false);
      }
    };
    loadSaved();
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-brand animate-spin mb-4" />
        <p className="text-gray-500">Loading saved properties...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Saved Properties</h1>

      {savedProperties.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-gray-400" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Saved Properties Yet</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Start exploring our property listings and save your favorites to view them here.
          </p>
          <Link
            to="/property-listings"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand/90 transition-colors"
          >
            <Search size={20} />
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProperties;