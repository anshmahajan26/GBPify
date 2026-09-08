import Post from '../models/Post.js';
import Location from '../models/Location.js';

// @desc    Get all posts for authenticated user with search & filter
// @route   GET /api/posts
export const getPosts = async (req, res) => {
  try {
    const { status, search, locationId } = req.query;

    const query = { userId: req.user._id };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (locationId && locationId !== 'all') {
      query.locationId = locationId;
    }

    if (search && search.trim() !== '') {
      query.$or = [
        { topic: { $regex: search.trim(), $options: 'i' } },
        { content: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const posts = await Post.find(query)
      .populate('locationId', 'businessName address city category phone website')
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching posts' });
  }
};

// @desc    Get dashboard metrics & recent posts
// @route   GET /api/posts/stats
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [totalLocations, totalPosts, draftPosts, publishedPosts, recentPosts] = await Promise.all([
      Location.countDocuments({ userId }),
      Post.countDocuments({ userId }),
      Post.countDocuments({ userId, status: 'draft' }),
      Post.countDocuments({ userId, status: 'published' }),
      Post.find({ userId })
        .populate('locationId', 'businessName address city category')
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    return res.json({
      success: true,
      data: {
        totalLocations,
        totalPosts,
        draftPosts,
        publishedPosts,
        recentPosts,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching dashboard stats' });
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, userId: req.user._id }).populate(
      'locationId',
      'businessName address city category phone website'
    );

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    return res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching post' });
  }
};

// @desc    Create / Save GBP Post (Draft or Published)
// @route   POST /api/posts
export const createPost = async (req, res) => {
  try {
    const {
      locationId,
      topic,
      postType = 'Update',
      tone = 'Engaging',
      language = 'English',
      ctaType = 'Learn More',
      ctaUrl = '',
      content,
      variations = [],
      status = 'draft',
    } = req.body;

    if (!locationId || !topic || !content) {
      return res.status(400).json({
        success: false,
        message: 'Location, topic, and post content are required.',
      });
    }

    // Verify location belongs to user
    const location = await Location.findOne({ _id: locationId, userId: req.user._id });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Invalid location selected' });
    }

    const newPost = await Post.create({
      userId: req.user._id,
      locationId,
      topic,
      postType,
      tone,
      language,
      ctaType,
      ctaUrl,
      content,
      variations,
      status: status === 'published' ? 'published' : 'draft',
      publishedAt: status === 'published' ? new Date() : null,
    });

    const populatedPost = await Post.findById(newPost._id).populate(
      'locationId',
      'businessName address city category phone website'
    );

    return res.status(201).json({
      success: true,
      message: status === 'published' ? 'Post published successfully!' : 'Post saved to drafts!',
      data: populatedPost,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error creating post' });
  }
};

// @desc    Update an existing post
// @route   PUT /api/posts/:id
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, userId: req.user._id });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const { topic, content, ctaType, ctaUrl, postType, tone, language, status } = req.body;

    if (topic) post.topic = topic;
    if (content) post.content = content;
    if (ctaType) post.ctaType = ctaType;
    if (ctaUrl !== undefined) post.ctaUrl = ctaUrl;
    if (postType) post.postType = postType;
    if (tone) post.tone = tone;
    if (language) post.language = language;

    if (status && status !== post.status) {
      post.status = status;
      if (status === 'published' && !post.publishedAt) {
        post.publishedAt = new Date();
      }
    }

    await post.save();

    const updatedPost = await Post.findById(post._id).populate(
      'locationId',
      'businessName address city category phone website'
    );

    return res.json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ success: false, message: 'Server error updating post' });
  }
};

// @desc    Publish a draft post
// @route   PATCH /api/posts/:id/publish
export const publishPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, userId: req.user._id });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    post.status = 'published';
    post.publishedAt = new Date();
    await post.save();

    const updatedPost = await Post.findById(post._id).populate(
      'locationId',
      'businessName address city category phone website'
    );

    return res.json({
      success: true,
      message: 'Post successfully published!',
      data: updatedPost,
    });
  } catch (error) {
    console.error('Error publishing post:', error);
    return res.status(500).json({ success: false, message: 'Server error publishing post' });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    return res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting post' });
  }
};
