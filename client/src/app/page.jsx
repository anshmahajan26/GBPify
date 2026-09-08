'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  TrendingUp,
  FileText,
  Eye,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { GbpPostCardPreview } from '../components/preview/GbpPostCardPreview';

const SAMPLE_DEMOS = [
  {
    topic: 'Free Dental Checkup Camp This Weekend',
    businessName: 'Apex Dental Care & Implant Center',
    category: 'Dental Clinic',
    city: 'New York, NY',
    content: `🦷 Celebrate Healthy Smiles at Apex Dental Care!\n\nThis Saturday & Sunday only, join us for our Community Oral Wellness Camp. Receive a complimentary oral exam, cavity screening, and 1-on-1 consultation with Dr. Alexander Wright.\n\n✔️ State-of-the-art 3D Digital Imaging\n✔️ Zero-wait appointments\n✔️ Special family packages available\n\nSpots fill quickly! Click 'Book' below to secure your complimentary consultation today.`,
    ctaType: 'Book',
  },
  {
    topic: 'Artisan Pour-Over Weekend: 20% OFF Single-Origin',
    businessName: 'Urban Artisan Roast Coffee',
    category: 'Coffee Shop & Bakery',
    city: 'San Francisco, CA',
    content: `☕ Special Weekend Treat in San Francisco!\n\nJoin us this weekend at Urban Artisan Roast Coffee and enjoy 20% OFF all signature single-origin pour-overs paired with freshly baked almond croissants.\n\n✔️ Freshly roasted Ethiopian & Colombian beans\n✔️ Cozy ambiance & high-speed Wi-Fi\n\nShow this post at checkout or click 'Get Offer' to claim your digital voucher!`,
    ctaType: 'Get Offer',
  },
  {
    topic: 'New High-Intensity Hyrox Training Class Launch',
    businessName: 'Pulse Fitness & Recovery Club',
    category: 'Fitness Center & Gym',
    city: 'Los Angeles, CA',
    content: `💪 Level Up Your Strength & Endurance in LA!\n\nIntroducing our brand new Hyrox & Functional Athletic Training circuit at Pulse Fitness. Designed for all fitness levels to build functional power, burn fat, and boost cardiovascular stamina.\n\n✔️ Certified Olympic coaches\n✔️ Cryotherapy recovery lounge access\n✔️ First session completely free for locals\n\nReady to transform? Tap 'Sign Up' below!`,
    ctaType: 'Sign Up',
  },
];

export default function LandingPage() {
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);

  const activeDemo = SAMPLE_DEMOS[activeDemoIndex];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/30 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>AI-Powered Google Business Profile Post Generator & Manager</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Rank #1 on Google Maps with{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                High-Converting AI Posts
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Supercharge your local SEO. Automatically generate 3 high-impact post variations for any business location, preview live Google Search & Maps layouts, and manage multi-location profiles in one centralized dashboard.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <Link
                href="/register"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/login"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm shadow-sm transition-all"
              >
                <span>Sign In to Dashboard</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Google API Key Needed for Test
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 3 AI Variations per Topic
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Draft & Instant Publish Engine
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo Preview Section */}
      <section className="py-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              See How AI Posts Appear on Google
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select a sample local business scenario to see instant AI variations and real-time Google search formatting.
            </p>
          </div>

          {/* Sample Selectors */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            {SAMPLE_DEMOS.map((demo, idx) => (
              <button
                key={demo.topic}
                onClick={() => setActiveDemoIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  activeDemoIndex === idx
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-600/30'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${activeDemoIndex === idx ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{demo.category}</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">({demo.city})</span>
              </button>
            ))}
          </div>

          {/* Interactive Preview Container */}
          <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold">
                  Topic: {activeDemo.topic}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Local SEO Optimized for {activeDemo.businessName}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Generated with local geographic cues, relevant hashtags, and actionable Call to Action buttons designed to convert casual searchers into foot traffic and leads.
                </p>

                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Formatted for maximum Google 3-Pack visibility</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Includes high-converting CTA: <strong>{activeDemo.ctaType}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Fully customizable before publishing or saving as draft</span>
                  </div>
                </div>

                <div className="pt-3">
                  <Link
                    href="/create-post"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Create your custom post with AI</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Preview Component */}
              <div>
                <GbpPostCardPreview
                  businessName={activeDemo.businessName}
                  category={activeDemo.category}
                  city={activeDemo.city}
                  content={activeDemo.content}
                  ctaType={activeDemo.ctaType}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Engineered for Local SEO Dominance
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Everything you need to scale Google Business Profile management across single or multi-franchise locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                3 AI Post Variations
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Receive 3 distinct post angles per topic: Community & Engaging, Promotional & High-Conversion, and Educational Authority. Select your favorite and customize in one click.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Multi-Location Management
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Add and manage unlimited business locations and franchise stores. Create location-tailored posts with automated address and city geo-tagging.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950 flex items-center justify-center text-cyan-600">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Live Google Profile Preview
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                View pixel-perfect previews replicating Google Search and Google Maps knowledge panels across mobile and desktop devices before publishing.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                7 Conversion CTA Actions
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Equip your posts with direct customer action buttons: Book Appointments, Call Directly, Redeem Special Offers, Order Online, and Learn More.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Drafts & Post Management Hub
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Organize all draft and published posts with lightning-fast search, filter tabs, direct edit modals, and instant publishing toggles.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                OpenRouter AI Security
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enterprise-grade security. API keys are kept safe on the backend, with zero frontend exposure and smart fallback resiliency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-tr from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Dominate Google Local Rankings?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Create high-ranking Google Business Profile posts in under 30 seconds. Start managing your locations today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-xl transition-all hover:scale-105"
            >
              Get Started for Free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white border border-blue-400/40 font-semibold text-sm transition-all text-center"
            >
              Sign In to Existing Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
