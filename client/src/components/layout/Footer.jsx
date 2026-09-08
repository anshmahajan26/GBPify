import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Zap, Globe, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">
                PostMaker<span className="text-blue-600">GBP</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              AI-driven Google Business Profile Post creation and management platform. Optimize your local search presence, boost 3-pack map rankings, and convert local searchers into loyal customers.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> OpenRouter AI
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Multi-Location Ready
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-500" /> Local SEO Engine
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-blue-600 transition-colors">
                  Business Locations
                </Link>
              </li>
              <li>
                <Link href="/create-post" className="hover:text-blue-600 transition-colors">
                  AI Post Studio
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-blue-600 transition-colors">
                  Post Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Guidelines / Assessment details */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>✨ 3 AI Post Variations per Prompt</li>
              <li>📍 Google Maps / Search Live Preview</li>
              <li>📝 Draft & Instant Publish Engine</li>
              <li>🎯 7 Optimized CTA Conversions</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} PostMakerGBP. Built for Google Business Profile Local SEO.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Next.js, Express & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};
