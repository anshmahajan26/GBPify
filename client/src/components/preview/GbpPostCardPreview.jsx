'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Share2,
  ExternalLink,
  Phone,
  Calendar,
  Sparkles,
  Smartphone,
  Monitor,
  Eye,
} from 'lucide-react';

export const GbpPostCardPreview = ({
  businessName = 'Apex Dental Care & Implant Center',
  category = 'Dental Clinic',
  city = 'New York',
  address = '452 Downtown Plaza',
  content,
  ctaType = 'Learn More',
  ctaUrl,
  postType = 'Update',
  date = 'Just now',
}) => {
  const [viewMode, setViewMode] = useState('mobile');

  const getCtaButtonText = () => {
    switch (ctaType) {
      case 'Book':
        return 'Book Appointment';
      case 'Call':
        return 'Call Business';
      case 'Order':
        return 'Order Online';
      case 'Sign Up':
        return 'Sign Up Now';
      case 'Get Offer':
        return 'Redeem Offer';
      case 'Learn More':
        return 'Learn More';
      case 'None':
      default:
        return null;
    }
  };

  const ctaButtonText = getCtaButtonText();

  return (
    <div className="w-full space-y-3">
      {/* View Mode Toggle Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Live Google Profile Preview
          </span>
        </div>
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
              viewMode === 'mobile'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
              viewMode === 'desktop'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop Search</span>
          </button>
        </div>
      </div>

      {/* Preview Mock Frame */}
      <div className="flex justify-center p-3 sm:p-4 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all">
        <div
          className={`w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden transition-all duration-300 ${
            viewMode === 'mobile' ? 'max-w-sm' : 'max-w-lg'
          }`}
        >
          {/* Google Search simulated header */}
          <div className="bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-blue-600">G</span>
              <span className="text-red-500">o</span>
              <span className="text-amber-500">o</span>
              <span className="text-blue-600">g</span>
              <span className="text-emerald-500">l</span>
              <span className="text-red-500">e</span>
              <span className="text-slate-400 ml-1">• Updates from Business</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold text-[10px]">
              {postType}
            </span>
          </div>

          {/* Business Meta Card */}
          <div className="p-4 space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
                {businessName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {businessName}
                  </h4>
                  <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {category} • {city}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{date}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="text-xs text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed font-normal bg-slate-50/70 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800/80">
              {content || (
                <span className="text-slate-400 italic">
                  Generate or type your Google Business Profile post content to see the live preview here...
                </span>
              )}
            </div>

            {/* Action CTA Button */}
            {ctaButtonText && (
              <div className="pt-1">
                <a
                  href={ctaUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!ctaUrl) e.preventDefault();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-md shadow-blue-500/20 transition-all hover:shadow-blue-500/30 text-center"
                >
                  {ctaType === 'Call' && <Phone className="w-3.5 h-3.5" />}
                  {ctaType === 'Book' && <Calendar className="w-3.5 h-3.5" />}
                  {(ctaType === 'Learn More' || ctaType === 'Get Offer' || ctaType === 'Order' || ctaType === 'Sign Up') && (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                  <span>{ctaButtonText}</span>
                </a>
              </div>
            )}

            {/* Post Interaction bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Verified Google Post
              </span>
              <button
                type="button"
                className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
