import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Location is required'],
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true,
    },
    postType: {
      type: String,
      enum: ['Update', 'Offer', 'Event', 'Product'],
      default: 'Update',
    },
    tone: {
      type: String,
      default: 'Engaging',
    },
    language: {
      type: String,
      default: 'English',
    },
    ctaType: {
      type: String,
      enum: ['Book', 'Call', 'Learn More', 'Order', 'Sign Up', 'Get Offer', 'None'],
      default: 'Learn More',
    },
    ctaUrl: {
      type: String,
      trim: true,
      default: '',
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
    },
    variations: [
      {
        title: { type: String, default: '' },
        content: { type: String, required: true },
        angle: { type: String, default: '' },
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Post', postSchema);
