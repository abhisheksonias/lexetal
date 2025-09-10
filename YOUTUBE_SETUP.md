# YouTube API Setup Guide

## Overview
This guide will help you set up the YouTube API integration for the dynamic resources page.

## Step 1: Get YouTube API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project (or select existing)**
   - Click "Select a project" → "New Project"
   - Name your project (e.g., "Lexetal YouTube Integration")
   - Click "Create"

3. **Enable YouTube Data API v3**
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"

4. **Create API Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated API key

## Step 2: Get Your YouTube Channel ID

1. **Find Your Channel ID**
   - Go to your YouTube channel
   - Look at the URL: `https://www.youtube.com/channel/YOUR_CHANNEL_ID`
   - Or go to YouTube Studio → Settings → Channel → Advanced settings

2. **Alternative Method**
   - Go to https://commentpicker.com/youtube-channel-id.php
   - Enter your YouTube channel URL
   - Get your Channel ID

## Step 3: Configure the System

1. **Update YouTube Configuration**
   - Open `data/youtube-config.json`
   - Replace the placeholder values:

```json
{
  "channelId": "YOUR_ACTUAL_CHANNEL_ID",
  "apiKey": "YOUR_ACTUAL_API_KEY",
  "playlistId": "UU_YOUR_UPLOADS_PLAYLIST_ID",
  "maxResults": 6,
  "videoSettings": {
    "showFeatured": true,
    "featuredVideoIndex": 0,
    "gridLayout": true,
    "autoPlay": false,
    "showThumbnails": true,
    "showDuration": true,
    "showViews": true,
    "showPublishDate": true
  }
}
```

2. **Replace the original resources.html**
   - Rename `resources.html` to `resources-backup.html`
   - Rename `resources-dynamic.html` to `resources.html`

## Step 4: Test the Integration

1. **Open the Resources Page**
   - Navigate to your website's resources page
   - Check if YouTube videos are loading

2. **Check Browser Console**
   - Press F12 → Console tab
   - Look for any error messages
   - Videos should load automatically

## Step 5: Customize Video Display

### Video Settings Options:
- `maxResults`: Number of videos to fetch (default: 6)
- `showFeatured`: Show the latest video as featured (true/false)
- `featuredVideoIndex`: Which video to feature (0 = latest)
- `gridLayout`: Use grid layout for videos (true/false)
- `autoPlay`: Auto-play videos (true/false)
- `showThumbnails`: Show video thumbnails (true/false)
- `showDuration`: Show video duration (true/false)
- `showViews`: Show view count (true/false)
- `showPublishDate`: Show publish date (true/false)

## Troubleshooting

### Common Issues:

1. **"YouTube API request failed"**
   - Check if API key is correct
   - Verify YouTube Data API v3 is enabled
   - Check if API key has proper permissions

2. **"Channel not found"**
   - Verify channel ID is correct
   - Make sure the channel is public
   - Check if channel has uploaded videos

3. **Videos not loading**
   - Check browser console for errors
   - Verify network connection
   - Check if API quota is exceeded

4. **Fallback videos showing**
   - This means the API call failed
   - Check API key and channel ID
   - Verify API is enabled in Google Cloud Console

### API Quota Limits:
- YouTube Data API v3 has daily quota limits
- Default quota: 10,000 units per day
- Each search request costs 100 units
- Monitor usage in Google Cloud Console

## Security Notes

1. **API Key Security**
   - Never commit API keys to public repositories
   - Consider using environment variables
   - Restrict API key to specific domains if possible

2. **Rate Limiting**
   - The system includes error handling for rate limits
   - Videos are cached to reduce API calls
   - Consider implementing server-side caching for production

## Advanced Configuration

### Custom Video Filtering:
You can modify the API request in `js/resources-dynamic.js` to filter videos by:
- Date range
- Video duration
- Video category
- Search keywords

### Caching Strategy:
For better performance, consider implementing:
- Local storage caching
- Server-side caching
- CDN integration

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all configuration values are correct
3. Test with a simple API call first
4. Check Google Cloud Console for quota and usage

## Next Steps

Once YouTube integration is working:
1. Add more blog content to `data/blogs.json`
2. Customize the video display settings
3. Implement additional features like video categories
4. Add analytics tracking for video views
