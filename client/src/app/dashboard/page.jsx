'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import {
  MapPin,
  FileText,
  Clock,
  CheckCircle2,
  Sparkles,
  PlusCircle,
  Building2,
  ArrowRight,
  Edit3,
  Send,
  X,
  Loader2,
  AlertCircle,
  Eye,
  ChevronRight,
} from 'lucide-react';
import api from '../../lib/api';
import { AddLocationModal } from '../../components/locations/AddLocationModal';
import { QuickViewPostModal } from '../../components/posts/QuickViewPostModal';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [postsModalType, setPostsModalType] = useState(null);
  const [selectedPostForView, setSelectedPostForView] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/posts/stats');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handlePublishDraft = async (postId, e) => {
    e.stopPropagation();
    try {
      setActionLoadingId(postId);
      const res = await api.patch(`/posts/${postId}/publish`);
      if (res.data.success) {
        await fetchStats();
      }
    } catch (err) {
      console.error('Publish error:', err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const getFilteredModalPosts = () => {
    if (!stats?.recentPosts) return [];
    if (postsModalType === 'draft') {
      return stats.recentPosts.filter((p) => p.status === 'draft');
    }
    if (postsModalType === 'published') {
      return stats.recentPosts.filter((p) => p.status === 'published');
    }
    return stats.recentPosts;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-900 flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Top Banner / Welcome */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Welcome back, {user?.name || 'Local Business Owner'} 👋
                </h1>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage your Google Business Profile posts, optimize local SEO ranking, and track drafts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsAddLocationOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-blue-600" />
                <span>Add Business</span>
              </button>
              <Link
                href="/create-post"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-102"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create GBP Post with AI</span>
              </Link>
            </div>
          </div>

          {/* Stats Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* 1. Total Locations Card */}
            <div
              onClick={() => router.push('/locations')}
              className="cursor-pointer group p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Locations
                </span>
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {loading ? '...' : stats?.totalLocations || 0}
                </span>
                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                  Active GBP profiles
                </span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>View all locations</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. Total Posts Card */}
            <div
              onClick={() => setPostsModalType('all')}
              className="cursor-pointer group p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-indigo-400 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Posts
                </span>
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {loading ? '...' : stats?.totalPosts || 0}
                </span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                  Created posts
                </span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Click to open all</span>
                <Eye className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* 3. Draft Posts Card */}
            <div
              onClick={() => setPostsModalType('draft')}
              className="cursor-pointer group p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-amber-400 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Draft Posts
                </span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {loading ? '...' : stats?.draftPosts || 0}
                </span>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  Awaiting review
                </span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Edit & Publish Drafts</span>
                <Edit3 className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 4. Published Posts Card */}
            <div
              onClick={() => setPostsModalType('published')}
              className="cursor-pointer group p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-emerald-400 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Published Posts
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {loading ? '...' : stats?.publishedPosts || 0}
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Live on Google
                </span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>View published updates</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Quick Action Feature Banner Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box: Create New GBP Post with AI */}
            <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white shadow-lg space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold">Create High-Ranking GBP Post with AI</h3>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Generate 3 tailored post variations for any business location with Google-optimized CTAs, tone, and instant live preview.
                </p>
              </div>
              <Link
                href="/create-post"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all hover:scale-102"
              >
                <span>Launch AI Post Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Box: Add Business Location */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Add Business Location
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Register a new branch or franchise profile with category, address, and city to generate location-specific posts.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddLocationOpen(true)}
                className="self-start flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Add New Location</span>
              </button>
            </div>
          </div>

          {/* Recent Posts Showcase Table/Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Recent Google Business Profile Posts
                </h3>
                <p className="text-xs text-slate-500">
                  Quickly view, publish, or edit your most recently generated posts
                </p>
              </div>
              <Link
                href="/posts"
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                <span>View All Posts</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span>Loading posts...</span>
              </div>
            ) : !stats?.recentPosts || stats.recentPosts.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  No Posts Created Yet
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Generate your first AI-powered Google Business Profile post to boost your local SEO ranking.
                </p>
                <Link
                  href="/create-post"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Create First Post</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.recentPosts.map((post) => {
                  const locationObj =
                    typeof post.locationId === 'object' ? post.locationId : null;
                  return (
                    <div
                      key={post._id}
                      onClick={() => setSelectedPostForView(post)}
                      className="cursor-pointer group p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-850 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${post.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              }`}
                          >
                            {post.status}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {post.topic}
                        </h4>

                        <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {post.content}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium truncate max-w-[120px]">
                          📍 {locationObj?.city || 'Local'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {post.status === 'draft' && (
                            <button
                              type="button"
                              onClick={(e) => handlePublishDraft(post._id, e)}
                              disabled={actionLoadingId === post._id}
                              className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px] shadow-sm flex items-center gap-1"
                            >
                              {actionLoadingId === post._id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Send className="w-3 h-3" />
                              )}
                              <span>Publish</span>
                            </button>
                          )}
                          <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                            View & Preview →
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Modal When Clicking Total / Draft / Published Posts Card */}
      {postsModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white capitalize">
                    {postsModalType === 'all'
                      ? 'All Posts Overview'
                      : postsModalType === 'draft'
                        ? 'Draft Posts (Ready for Edit & Publish)'
                        : 'Published Posts (Live Updates)'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click any post to view details, live Google preview, or edit
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPostsModalType(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Post List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {getFilteredModalPosts().length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  No {postsModalType} posts found in recent items. Click "Create GBP Post" to generate one.
                </div>
              ) : (
                getFilteredModalPosts().map((post) => {
                  const locationObj =
                    typeof post.locationId === 'object' ? post.locationId : null;
                  return (
                    <div
                      key={post._id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-all bg-slate-50/50 dark:bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${post.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                              }`}
                          >
                            {post.status}
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {post.topic}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                          {post.content}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {locationObj?.businessName} • {locationObj?.city} • CTA: {post.ctaType}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {post.status === 'draft' && (
                          <button
                            type="button"
                            onClick={(e) => handlePublishDraft(post._id, e)}
                            disabled={actionLoadingId === post._id}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm"
                          >
                            {actionLoadingId === post._id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Send className="w-3 h-3" />
                            )}
                            <span>Publish Now</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setPostsModalType(null);
                            setSelectedPostForView(post);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Preview & Edit</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
              <Link
                href="/posts"
                onClick={() => setPostsModalType(null)}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Go to Dedicated All Posts Management Page →
              </Link>
              <button
                type="button"
                onClick={() => setPostsModalType(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
              >
                Close Box
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Location Modal */}
      <AddLocationModal
        isOpen={isAddLocationOpen}
        onClose={() => setIsAddLocationOpen(false)}
        onLocationAdded={() => {
          fetchStats();
        }}
      />

      {/* Quick View / Edit Post Modal */}
      <QuickViewPostModal
        isOpen={!!selectedPostForView}
        post={selectedPostForView}
        onClose={() => setSelectedPostForView(null)}
        onPostUpdated={() => {
          fetchStats();
          setSelectedPostForView(null);
        }}
        onPostDeleted={() => {
          fetchStats();
          setSelectedPostForView(null);
        }}
      />
    </ProtectedRoute>
  );
}
