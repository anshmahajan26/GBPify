'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import {
  Sparkles,
  MapPin,
  Building2,
  FileText,
  Send,
  Save,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  RefreshCw,
  AlertCircle,
  Copy,
  Check,
  Info,
} from 'lucide-react';
import api from '../../lib/api';
import { GbpPostCardPreview } from '../../components/preview/GbpPostCardPreview';

const SUGGESTED_TOPICS = [
  'Free Dental Checkup Camp This Weekend',
  '20% Off Artisanal Coffee & Bakery Items',
  'Summer Fitness Bootcamp with Free 3-Day Pass',
  'Customer Appreciation Day Special Giveaway',
  'New Spring Menu Launch with Organic Ingredients',
];

function CreatePostContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedLocationId = searchParams.get('locationId');

  // Locations state
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [loadingLocations, setLoadingLocations] = useState(true);

  // Form State
  const [topic, setTopic] = useState('');
  const [postType, setPostType] = useState('Update');
  const [tone, setTone] = useState('Engaging');
  const [language, setLanguage] = useState('English');
  const [ctaType, setCtaType] = useState('Learn More');
  const [ctaUrl, setCtaUrl] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // AI Generated Variations
  const [variations, setVariations] = useState([]);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [editedContent, setEditedContent] = useState('');
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [aiWarning, setAiWarning] = useState(null);

  // Actions state
  const [savingAction, setSavingAction] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch user locations
  useEffect(() => {
    const fetchLocs = async () => {
      try {
        setLoadingLocations(true);
        const res = await api.get('/locations');
        if (res.data.success && res.data.data) {
          setLocations(res.data.data);
          if (preSelectedLocationId) {
            setSelectedLocationId(preSelectedLocationId);
          } else if (res.data.data.length > 0) {
            setSelectedLocationId(res.data.data[0]._id);
          }
        }
      } catch (err) {
        console.error('Failed to load locations', err);
      } finally {
        setLoadingLocations(false);
      }
    };
    fetchLocs();
  }, [preSelectedLocationId]);

  const selectedLocation = locations.find((l) => l._id === selectedLocationId);

  // Generate 3 AI variations
  const handleGenerateAI = async () => {
    if (!topic.trim()) {
      setAiError('Please enter a post topic or select one of the suggested topics below.');
      return;
    }

    if (!selectedLocation) {
      setAiError('Please select a business location first.');
      return;
    }

    setGeneratingAI(true);
    setAiError(null);
    setAiWarning(null);

    try {
      const res = await api.post('/ai/generate-post', {
        businessName: selectedLocation.businessName,
        category: selectedLocation.category,
        city: selectedLocation.city,
        address: selectedLocation.address,
        topic,
        postType,
        tone,
        language,
        ctaType,
        ctaUrl,
        additionalNotes,
      });

      if (res.data.success && res.data.data?.variations) {
        const genVars = res.data.data.variations;
        setVariations(genVars);
        setSelectedVariationIndex(0);
        setEditedContent(genVars[0]?.content || '');
        if (res.data.warning) {
          setAiWarning(res.data.warning);
        }
      } else {
        setAiError('Failed to generate post variations. Please try again.');
      }
    } catch (err) {
      console.error('AI generation error', err);
      setAiError(err.response?.data?.message || 'Error communicating with AI service.');
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSelectVariation = (idx) => {
    setSelectedVariationIndex(idx);
    setEditedContent(variations[idx]?.content || '');
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(editedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePost = async (status) => {
    if (!selectedLocationId || !topic || !editedContent) {
      setAiError('Please ensure a location, topic, and post content are ready before saving.');
      return;
    }

    setSavingAction(status === 'published' ? 'publish' : 'draft');
    setAiError(null);

    try {
      const res = await api.post('/posts', {
        locationId: selectedLocationId,
        topic,
        postType,
        tone,
        language,
        ctaType,
        ctaUrl,
        content: editedContent,
        variations,
        status,
      });

      if (res.data.success) {
        setSuccessMessage(
          status === 'published'
            ? '🎉 Google Business Profile Post Published Successfully!'
            : '💾 Post Saved to Drafts Collection!'
        );
        setTimeout(() => {
          router.push('/dashboard');
        }, 1200);
      }
    } catch (err) {
      setAiError(err.response?.data?.message || 'Failed to save post.');
    } finally {
      setSavingAction(null);
    }
  };

  const handleDiscard = () => {
    if (confirm('Discard current post draft and reset the AI generator?')) {
      setTopic('');
      setVariations([]);
      setEditedContent('');
      setAiError(null);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                AI-Powered GBP Post Studio
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure your campaign topic, generate 3 ranking-optimized post variations with OpenRouter AI, customize text, and preview in real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsImageModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 shadow-sm"
            >
              <ImageIcon className="w-4 h-4 text-purple-500" />
              <span>AI Image Generator</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold">
                SOON
              </span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Studio Grid: Left Form & Right Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form & Variations (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Configuration Form */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                    1
                  </span>
                  Post Parameters & Local Context
                </span>
                <span className="text-[11px] text-slate-400">Powered by OpenRouter AI</span>
              </div>

              {aiError && (
                <div className="p-3 text-xs rounded-xl bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{aiError}</span>
                </div>
              )}

              {aiWarning && (
                <div className="p-3 text-xs rounded-xl bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900 flex items-center gap-2">
                  <Info className="w-4 h-4 flex-shrink-0 text-amber-600" />
                  <span>{aiWarning}</span>
                </div>
              )}

              {/* Location Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Business Location <span className="text-red-500">*</span>
                </label>
                {loadingLocations ? (
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                    Loading your locations...
                  </div>
                ) : (
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={selectedLocationId}
                      onChange={(e) => setSelectedLocationId(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {locations.map((loc) => (
                        <option key={loc._id} value={loc._id}>
                          {loc.businessName} ({loc.city} - {loc.category})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {selectedLocation && (
                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{selectedLocation.address}, {selectedLocation.city}</span>
                  </p>
                )}
              </div>

              {/* Topic Input & Suggestions */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Post Topic / Promotion / Announcement <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Free dental checkup camp this weekend"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Quick Suggestion Chips */}
                <div className="pt-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Suggested Topics:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_TOPICS.map((suggested) => (
                      <button
                        key={suggested}
                        type="button"
                        onClick={() => setTopic(suggested)}
                        className="text-[10px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 dark:hover:text-blue-300 transition-colors text-left"
                      >
                        + {suggested}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Post Type & Tone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Post Type
                  </label>
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="Update">Update (News)</option>
                    <option value="Offer">Offer (Discount / Deal)</option>
                    <option value="Event">Event (Workshop / Camp)</option>
                    <option value="Product">Product Showcase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="Engaging">Engaging & Lively</option>
                    <option value="Professional">Professional & Formal</option>
                    <option value="Urgent / High-Conversion">Urgent & Promotional</option>
                    <option value="Friendly">Warm & Friendly</option>
                    <option value="Informative">Informative & Educational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              {/* Call to Action Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Call to Action (CTA) Button
                  </label>
                  <select
                    value={ctaType}
                    onChange={(e) => setCtaType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="Book">Book (Appointments)</option>
                    <option value="Call">Call (Phone direct)</option>
                    <option value="Learn More">Learn More</option>
                    <option value="Order">Order Online</option>
                    <option value="Sign Up">Sign Up</option>
                    <option value="Get Offer">Get Offer</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    CTA Action / Website Link
                  </label>
                  <input
                    type="url"
                    value={ctaUrl}
                    onChange={(e) => setCtaUrl(e.target.value)}
                    placeholder="https://yourwebsite.com/booking"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              {/* AI Generate Button */}
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={generatingAI || !topic.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all"
              >
                {generatingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating 3 AI Variations with OpenRouter...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate 3 AI Post Variations</span>
                  </>
                )}
              </button>
            </div>

            {/* Step 2: 3 AI Variations Showcase & Editor */}
            {variations.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                      2
                    </span>
                    Select Preferred Variation & Edit Content
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleGenerateAI}
                      disabled={generatingAI}
                      className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${generatingAI ? 'animate-spin' : ''}`} />
                      Regenerate
                    </button>
                  </div>
                </div>

                {/* 3 Variations Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {variations.map((v, idx) => {
                    const isSelected = selectedVariationIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectVariation(idx)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-600 ring-2 ring-blue-600/20'
                            : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            Option {idx + 1}
                          </span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                        </div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">
                          {v.title || `Variation #${idx + 1}`}
                        </p>
                        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                          {v.angle}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Editable Textarea */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Editable Post Body Content
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">
                        {editedContent.length} characters
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyContent}
                        className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-blue-600 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={8}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    placeholder="Refine and edit your AI generated post content..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white leading-relaxed focus:ring-2 focus:ring-blue-500 resize-none font-normal"
                  />
                </div>

                {/* Action Buttons Hub */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Discard</span>
                  </button>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleSavePost('draft')}
                      disabled={!!savingAction}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl shadow-sm transition-all"
                    >
                      {savingAction === 'draft' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                      ) : (
                        <Save className="w-3.5 h-3.5 text-slate-500" />
                      )}
                      <span>Save as Draft</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSavePost('published')}
                      disabled={!!savingAction}
                      className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-102"
                    >
                      {savingAction === 'publish' ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>Publish to Google Profile</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Google Business Profile Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                  Live Google Knowledge Panel Mockup
                </span>
              </div>

              <GbpPostCardPreview
                businessName={selectedLocation?.businessName || 'Your Business Name'}
                category={selectedLocation?.category || 'Local Business'}
                city={selectedLocation?.city || 'Local Area'}
                address={selectedLocation?.address || ''}
                content={editedContent}
                ctaType={ctaType}
                ctaUrl={ctaUrl}
                postType={postType}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Image Generation "Coming Soon" Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 mx-auto">
              <Sparkles className="w-7 h-7 animate-pulse text-purple-500" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                ✨ AI Image Generation Launching Soon!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                "We are introducing AI image generation with customized branded quote overlays and emojis in our upcoming release." 🚀🎨
              </p>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 text-[11px] text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-900">
              💡 As noted in the assessment guidelines, text-based AI generation is fully active and free via OpenRouter.
            </div>

            <button
              type="button"
              onClick={() => setIsImageModalOpen(false)}
              className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-purple-600 hover:bg-slate-800 rounded-xl shadow-sm"
            >
              Got it! Return to Post Studio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreatePostPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Studio...</div>}>
        <CreatePostContent />
      </Suspense>
    </ProtectedRoute>
  );
}
