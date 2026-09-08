'use client';

import React, { useState } from 'react';
import {
  X,
  FileText,
  Sparkles,
  Send,
  Save,
  Trash2,
  Copy,
  Check,
  Building2,
  Calendar,
  Tag,
  Loader2,
} from 'lucide-react';
import { Post, Location } from '../../types';
import { GbpPostCardPreview } from '../preview/GbpPostCardPreview';
import api from '../../lib/api';

interface QuickViewPostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onPostUpdated: (updatedPost: Post) => void;
  onPostDeleted: (postId: string) => void;
}

export const QuickViewPostModal: React.FC<QuickViewPostModalProps> = ({
  post,
  isOpen,
  onClose,
  onPostUpdated,
  onPostDeleted,
}) => {
  if (!isOpen || !post) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
  const [topic, setTopic] = useState(post.topic);
  const [ctaType, setCtaType] = useState(post.ctaType);
  const [ctaUrl, setCtaUrl] = useState(post.ctaUrl || '');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const locationObj = typeof post.locationId === 'object' ? (post.locationId as Location) : null;
  const businessName = locationObj?.businessName || 'Your Business Location';
  const category = locationObj?.category || 'Local Business';
  const city = locationObj?.city || 'Local';
  const address = locationObj?.address || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const res = await api.put(`/posts/${post._id}`, {
        topic,
        content,
        ctaType,
        ctaUrl,
      });

      if (res.data.success && res.data.data) {
        onPostUpdated(res.data.data);
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Failed to update post', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishNow = async () => {
    setLoading(true);
    try {
      const res = await api.patch(`/posts/${post._id}/publish`);
      if (res.data.success && res.data.data) {
        onPostUpdated(res.data.data);
      }
    } catch (err) {
      console.error('Failed to publish post', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this Google Business Profile post?')) {
      setLoading(true);
      try {
        const res = await api.delete(`/posts/${post._id}`);
        if (res.data.success) {
          onPostDeleted(post._id);
          onClose();
        }
      } catch (err) {
        console.error('Failed to delete post', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                  {post.topic}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                    post.status === 'published'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {post.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {businessName} • {city}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body - Split View */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Col: Details & Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {isEditing ? 'Editing Post Details' : 'Post Overview'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-2 py-1 rounded-md"
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Post'}
                </button>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Post Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Call to Action (CTA)
                  </label>
                  <select
                    value={ctaType}
                    onChange={(e) => setCtaType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="Book">Book</option>
                    <option value="Call">Call</option>
                    <option value="Learn More">Learn More</option>
                    <option value="Order">Order</option>
                    <option value="Sign Up">Sign Up</option>
                    <option value="Get Offer">Get Offer</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    CTA Target URL
                  </label>
                  <input
                    type="url"
                    value={ctaUrl}
                    onChange={(e) => setCtaUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Post Content
                  </label>
                  <textarea
                    rows={7}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white leading-relaxed resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Edits
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                  {content}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-slate-400 block mb-0.5">Post Type</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {post.postType}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-slate-400 block mb-0.5">Tone & Language</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {post.tone} • {post.language}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-slate-400 block mb-0.5">Selected CTA</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {ctaType}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-slate-400 block mb-0.5">Created At</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Google Profile Preview */}
          <div>
            <GbpPostCardPreview
              businessName={businessName}
              category={category}
              city={city}
              address={address}
              content={content}
              ctaType={ctaType}
              ctaUrl={ctaUrl}
              postType={post.postType}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Post
          </button>

          <div className="flex items-center gap-2.5">
            {post.status === 'draft' && (
              <button
                type="button"
                onClick={handlePublishNow}
                disabled={loading}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm shadow-emerald-500/20"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Publish to Profile
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
