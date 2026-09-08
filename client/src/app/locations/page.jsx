'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import {
  MapPin,
  Building2,
  Tag,
  Phone,
  Globe,
  PlusCircle,
  Sparkles,
  Trash2,
  ArrowRight,
  Search,
  Loader2,
} from 'lucide-react';
import api from '../../lib/api';
import { AddLocationModal } from '../../components/locations/AddLocationModal';

export default function LocationsPage() {
  const router = useRouter();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const res = await api.get('/locations');
      if (res.data.success) {
        setLocations(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch locations', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDeleteLocation = async (id, name, e) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to remove ${name}?`)) {
      try {
        setDeletingId(id);
        const res = await api.delete(`/locations/${id}`);
        if (res.data.success) {
          setLocations((prev) => prev.filter((loc) => loc._id !== id));
        }
      } catch (err) {
        console.error('Failed to delete location', err);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filteredLocations = locations.filter((loc) => {
    const q = searchQuery.toLowerCase();
    return (
      loc.businessName.toLowerCase().includes(q) ||
      loc.category.toLowerCase().includes(q) ||
      loc.city.toLowerCase().includes(q) ||
      loc.address.toLowerCase().includes(q)
    );
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Google Business Profile Locations
                </h1>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage your store branches, clinics, and service areas. Select any card to generate AI posts for that location.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="self-start md:self-auto flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-102"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Location</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-md">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by business name, city, or category..."
              className="w-full text-xs bg-transparent focus:outline-none text-slate-800 dark:text-slate-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Locations Grid */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span>Loading business locations...</span>
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="py-16 text-center space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  No Locations Found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {searchQuery
                    ? `No location matched "${searchQuery}". Try a different term.`
                    : 'Add your first business location or franchise branch to begin generating AI posts.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Business Location</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((loc) => (
                <div
                  key={loc._id}
                  onClick={() => router.push(`/create-post?locationId=${loc._id}`)}
                  className="group relative cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-5"
                >
                  {/* Top Meta */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                        {loc.businessName.charAt(0)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          {loc.category}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteLocation(loc._id, loc.businessName, e)}
                          disabled={deletingId === loc._id}
                          className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          title="Delete Location"
                        >
                          {deletingId === loc._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {loc.businessName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{loc.address}, {loc.city}</span>
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                      {loc.phone && (
                        <p className="flex items-center gap-1.5 text-[11px]">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{loc.phone}</span>
                        </p>
                      )}
                      {loc.website && (
                        <p className="flex items-center gap-1.5 text-[11px] text-blue-600 truncate">
                          <Globe className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{loc.website}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Create AI Post for this Location
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Location Modal */}
      <AddLocationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onLocationAdded={(newLoc) => {
          setLocations((prev) => [newLoc, ...prev]);
        }}
      />
    </ProtectedRoute>
  );
}
