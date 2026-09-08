export interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
  createdAt?: string;
}

export interface Location {
  _id: string;
  userId: string;
  businessName: string;
  address: string;
  city: string;
  category: string;
  phone?: string;
  website?: string;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostVariation {
  id?: number | string;
  title: string;
  angle: string;
  content: string;
  suggestedHashtags?: string[];
}

export type PostType = 'Update' | 'Offer' | 'Event' | 'Product';
export type CtaType = 'Book' | 'Call' | 'Learn More' | 'Order' | 'Sign Up' | 'Get Offer' | 'None';
export type PostStatus = 'draft' | 'published';

export interface Post {
  _id: string;
  userId: string;
  locationId: Location | string;
  topic: string;
  postType: PostType;
  tone: string;
  language: string;
  ctaType: CtaType;
  ctaUrl?: string;
  content: string;
  variations?: PostVariation[];
  status: PostStatus;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardStats {
  totalLocations: number;
  totalPosts: number;
  draftPosts: number;
  publishedPosts: number;
  recentPosts: Post[];
}

export interface GeneratePostRequest {
  businessName: string;
  category?: string;
  city?: string;
  address?: string;
  topic: string;
  postType?: PostType;
  tone?: string;
  language?: string;
  ctaType?: CtaType;
  ctaUrl?: string;
  additionalNotes?: string;
}

export interface GeneratePostResponse {
  success: boolean;
  source?: string;
  model?: string;
  warning?: string;
  data: {
    variations: PostVariation[];
  };
}
