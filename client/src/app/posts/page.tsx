'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import {
  FileText,
  Search,
  Filter,
  PlusCircle,
  Sparkles,
  MapPin,
  Calendar,
  Send,
  Edit3,
  Trash2,
  Eye,
  Loader2,
  Building2,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import api from '../../lib/api';
import { Post, Location, PostStatus } from '../../types';
import { QuickViewPostModal } from '../../components/posts/QuickViewPostModal';

export default function PostsManagementPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  // Modals & action states
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);

  const fetchLocations = async () => {
    try {
      const res = await api.get('/locations');
      if (res.data.success) {
        setLocations(res.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (locationFilter !== 'all') params.locationId = locationFilter;
      if (search.trim()) params.search = search.trim();

      const res = await api.get('/posts', { params });
      if (res.data.success) {
        setPosts(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch posts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [statusFilter, locationFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  const handlePublishPost = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setPublishingId(postId);
      const res = await api.patch(`/posts/${postId}/publish`);
      if (res.data.success) {
        setPosts((prev) =>
          prev.map((p) => (p._id === postId ? { ...p, status: 'published', publishedAt: new Date().toISOString() } : p))
        );
      }
    } catch (err) {
      console.error('Failed to publish', err);
    } finally {
      setPublishingId(null);
    }
  };

  const handleDeletePost = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this Google Business Profile post?')) {
      try {
        const res = await api.delete(`/posts/${postId}`);
        if (res.data.success) {
          setPosts((prev) => prev.filter((p) => p._id !== postId));
        }
      } catch (err) {
        console.error('Delete post failed', err);
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600">
                  <FileText className="w-4 h-4" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  All Google Business Profile Posts
                </h1>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Search, filter by status, inspect live Google search previews, and edit or publish drafts.
              </p>
            </div>

            <Link
              href="/create-post"
              className="self-start md:self-auto flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-102"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create New AI Post</span>
            </Link>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="w-full md:w-96 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search posts by topic or content..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white rounded-xl"
                >
                  Search
                </button>
              </form>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-stretch md:self-auto">
                <button
                  type="button"
                  onClick={() => setStatusFilter('all')}
                  className={`flex-1 md:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    statusFilter === 'all'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  All Posts
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('draft')}
                  className={`flex-1 md:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    statusFilter === 'draft'
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  Drafts
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('published')}
                  className={`flex-1 md:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    statusFilter === 'published'
                      ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  Published
                </button>
              </div>

              {/* Location Filter Dropdown */}
              <div className="w-full md:w-64">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                >
                  <option value="all">All Business Locations</option>
                  {locations.map((loc) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.businessName} ({loc.city})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Posts Grid List */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span>Loading Google Business Profile posts...</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="py-16 text-center space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  No Posts Found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {search || statusFilter !== 'all' || locationFilter !== 'all'
                    ? 'No posts matched the current filter criteria. Try resetting your search or filters.'
                    : 'You have not created any Google Business Profile posts yet.'}
                </p>
              </div>
              <Link
                href="/create-post"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Your First Post with AI</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const locationObj =
                  typeof post.locationId === 'object' ? (post.locationId as Location) : null;
                return (
                  <div
                    key={post._id}
                    onClick={() => setSelectedPost(post)}
                    className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl hover:border-blue-500/50 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            post.status === 'published'
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

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {post.topic}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="truncate max-w-[140px] font-medium">
                          📍 {locationObj?.businessName || 'Business Location'}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 font-semibold text-[10px]">
                          CTA: {post.ctaType}
                        </span>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={(e) => handleDeletePost(post._id, e)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2">
                          {post.status === 'draft' && (
                            <button
                              type="button"
                              onClick={(e) => handlePublishPost(post._id, e)}
                              disabled={publishingId === post._id}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm"
                            >
                              {publishingId === post._id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Send className="w-3 h-3" />
                              )}
                              <span>Publish</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setSelectedPost(post)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 hover:bg-blue-100 font-semibold text-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick View / Edit / Google Preview Modal */}
      <QuickViewPostModal
        isOpen={!!selectedPost}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onPostUpdated={(updated) => {
          setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
          setSelectedPost(null);
        }}
        onPostDeleted={(deletedId) => {
          setPosts((prev) => prev.filter((p) => p._id !== deletedId));
          setSelectedPost(null);
        }}
      />
    </ProtectedRoute>
  );
}
