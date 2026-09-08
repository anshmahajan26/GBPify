import axios from 'axios';

// Smart fallback generator for instant demo or when API key is missing/rate-limited
const generateSmartFallbackVariations = ({
  businessName,
  category,
  city,
  topic,
  postType,
  tone,
  ctaType,
  language = 'English',
}) => {
  const ctaPhrase =
    ctaType === 'Book'
      ? 'Book your slot today!'
      : ctaType === 'Call'
      ? 'Call us now to speak with our team.'
      : ctaType === 'Get Offer'
      ? 'Claim your exclusive offer before spots fill up!'
      : ctaType === 'Sign Up'
      ? 'Sign up in seconds.'
      : ctaType === 'Order'
      ? 'Place your order online today.'
      : ctaType === 'Learn More'
      ? 'Click below to learn more.'
      : '';

  return [
    {
      id: 1,
      title: `✨ Exciting News from ${businessName} in ${city}!`,
      angle: 'Engaging & Community-Focused',
      content: `Looking for top-tier ${category.toLowerCase()} in ${city}? We're excited to announce: ${topic}!\n\nAt ${businessName}, our dedicated team is passionate about delivering exceptional care and quality to our local community. Whether you're visiting us for the first time or a long-time client, we are here to support you.\n\n📍 Visit us at ${city}\n${ctaPhrase ? `👉 ${ctaPhrase}` : ''}`,
      suggestedHashtags: [`#${city.replace(/\s+/g, '')}`, `#${category.replace(/[^a-zA-Z]/g, '')}`, '#LocalBusiness', '#GoogleBusinessProfile'],
    },
    {
      id: 2,
      title: `🔥 Limited-Time Opportunity: ${topic}`,
      angle: 'Promotional & High-Conversion',
      content: `Don't miss out on what's happening at ${businessName}!\n\nSpecial Highlight: ${topic}.\n\nWhy choose ${businessName} in ${city}?\n✔️ Experienced professionals\n✔️ Welcoming, client-first atmosphere\n✔️ Verified 5-star local service\n\nTake advantage of this today. ${ctaPhrase}`,
      suggestedHashtags: [`#${category.replace(/[^a-zA-Z]/g, '')}`, '#SpecialOffer', `#${city.replace(/\s+/g, '')}Deals`, '#TopRated'],
    },
    {
      id: 3,
      title: `💡 Your Local Guide to ${category} by ${businessName}`,
      angle: 'Educational & Local SEO Authority',
      content: `Did you know? Staying ahead with your ${category.toLowerCase()} needs can make all the difference. That's why we're featuring: ${topic}.\n\nServing the greater ${city} area, ${businessName} is committed to transparent, reliable, and expert service every single day.\n\nHave questions or ready to get started? ${ctaPhrase}`,
      suggestedHashtags: [`#${city.replace(/\s+/g, '')}Services`, `#${category.replace(/[^a-zA-Z]/g, '')}Tips`, '#LocalExperts', '#BusinessUpdate'],
    },
  ];
};

// @desc    Generate 3 AI GBP Post Variations via OpenRouter API
// @route   POST /api/ai/generate-post
export const generateGbpPost = async (req, res) => {
  try {
    const {
      businessName,
      category,
      city,
      address,
      topic,
      postType = 'Update',
      tone = 'Engaging',
      language = 'English',
      ctaType = 'Learn More',
      ctaUrl = '',
      additionalNotes = '',
    } = req.body;

    if (!topic || !businessName) {
      return res.status(400).json({
        success: false,
        message: 'Topic and Business Name are required for AI generation.',
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct:free';

    // If no API key configured, use smart AI templates seamlessly
    if (!apiKey || apiKey.trim() === '' || apiKey === 'your_openrouter_api_key_here') {
      console.log('ℹ️ OpenRouter API Key not set. Serving high-quality algorithmic variations.');
      const variations = generateSmartFallbackVariations({
        businessName,
        category: category || 'Local Business',
        city: city || 'Local Area',
        topic,
        postType,
        tone,
        ctaType,
        language,
      });

      return res.json({
        success: true,
        source: 'smart-template-engine',
        data: {
          variations,
        },
      });
    }

    // Prepare system & user prompt for OpenRouter AI
    const systemPrompt = `You are an elite Google Business Profile (GBP) Local SEO Copywriter. 
Your goal is to write captivating, high-ranking, and high-converting GBP posts that rank on Google Search and Maps.
Rules:
1. Always generate exactly 3 distinct post variations formatted strictly as valid JSON.
2. Tone must match the requested tone: "${tone}".
3. Language must be: "${language}".
4. Post type: "${postType}".
5. Ensure content is optimized for Google Business Profile (100 to 250 words each), includes emojis appropriately, local context keywords, and smoothly references the CTA "${ctaType}".
6. Output MUST strictly be valid JSON matching this schema:
{
  "variations": [
    {
      "id": 1,
      "title": "Headline 1",
      "angle": "Engaging & Community-Focused",
      "content": "Full post text here...",
      "suggestedHashtags": ["#tag1", "#tag2"]
    },
    {
      "id": 2,
      "title": "Headline 2",
      "angle": "Promotional & High-Conversion",
      "content": "Full post text here...",
      "suggestedHashtags": ["#tag1", "#tag2"]
    },
    {
      "id": 3,
      "title": "Headline 3",
      "angle": "Educational & Local SEO Authority",
      "content": "Full post text here...",
      "suggestedHashtags": ["#tag1", "#tag2"]
    }
  ]
}
DO NOT wrap in markdown backticks if possible, return pure JSON.`;

    const userPrompt = `Generate 3 GBP post variations with the following details:
- Business Name: ${businessName}
- Category: ${category || 'Local Service'}
- Location: ${address ? `${address}, ` : ''}${city || 'Our City'}
- Post Topic / Promotion: ${topic}
- Post Type: ${postType}
- Tone: ${tone}
- Language: ${language}
- Call to Action (CTA): ${ctaType} ${ctaUrl ? `(${ctaUrl})` : ''}
${additionalNotes ? `- Additional Instructions: ${additionalNotes}` : ''}`;

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.CLIENT_URL || 'http://localhost:3000',
            'X-Title': 'AI GBP Post Manager',
          },
          timeout: 25000,
        }
      );

      const rawContent = response.data?.choices?.[0]?.message?.content?.trim();
      let parsedData;

      try {
        // Remove markdown backticks if present
        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        } else {
          parsedData = JSON.parse(rawContent);
        }
      } catch (parseError) {
        console.warn('Failed to parse AI response as JSON, falling back to structured fallback:', parseError);
        parsedData = {
          variations: generateSmartFallbackVariations({
            businessName,
            category: category || 'Local Business',
            city: city || 'Local Area',
            topic,
            postType,
            tone,
            ctaType,
            language,
          }),
        };
      }

      return res.json({
        success: true,
        source: 'openrouter-ai',
        model: model,
        data: parsedData,
      });
    } catch (apiError) {
      console.error('OpenRouter API call failed:', apiError.response?.data || apiError.message);
      // Graceful fallback so user is never blocked during demo or transient network errors
      const fallbackVariations = generateSmartFallbackVariations({
        businessName,
        category: category || 'Local Business',
        city: city || 'Local Area',
        topic,
        postType,
        tone,
        ctaType,
        language,
      });

      return res.json({
        success: true,
        source: 'fallback-on-api-error',
        warning: 'AI API unavailable or rate limited. Generated using smart local SEO template engine.',
        data: {
          variations: fallbackVariations,
        },
      });
    }
  } catch (error) {
    console.error('AI Controller error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during AI post generation',
    });
  }
};
