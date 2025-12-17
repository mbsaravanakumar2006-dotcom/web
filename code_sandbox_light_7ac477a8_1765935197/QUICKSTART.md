# Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will help you get the Currency Note Scanner application running quickly.

## Prerequisites

- A modern web browser (Chrome, Safari, Firefox, Edge)
- Camera permission (for camera scanning feature)
- HTTPS connection (required for camera access in production)

## Option 1: Local Development

### Step 1: Download the Project
Download or clone the project files to your computer.

### Step 2: Open in Browser
Simply open `index.html` in your web browser:

```bash
# Option A: Double-click index.html file

# Option B: Use a local server (recommended)
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (using npx)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

### Step 3: Access the Application
Open your browser and navigate to:
```
http://localhost:8000
```

### Step 4: Test the Application
1. Click "Scan Note"
2. Choose "Take Photo" or "Upload Photo"
3. Capture or select an image
4. Listen to the voice announcement

**Note**: Camera features may not work with `file://` protocol. Use a local server for full functionality.

## Option 2: Deploy to Production

### Deploy to Netlify (Recommended)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   cd project-folder
   netlify deploy --prod
   ```

3. **Follow prompts** and your site will be live!

### Deploy to GitHub Pages

1. **Create GitHub repository**
2. **Push code to repository**
3. **Enable GitHub Pages** in repository settings
4. **Access via**: `https://username.github.io/repository-name`

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd project-folder
   vercel
   ```

## Using the Application

### First Launch

1. **Welcome Screen**
   - You'll hear: "Welcome to Currency Note Scanner"
   - Large "Scan Note" button in the center
   
2. **Choose Capture Method**
   - Take Photo: Use device camera
   - Upload Photo: Select from gallery

### Scanning a Note

#### Using Camera
1. Click "Take Photo"
2. Allow camera permissions when prompted
3. Position the currency note within the frame
4. Click "Capture" button
5. Wait for analysis (2-3 seconds)
6. Listen to the result

#### Using Upload
1. Click "Upload Photo"
2. Select an image from your device
3. Wait for analysis
4. Listen to the result

### Understanding Results

✅ **Success** (Green border)
- Note identified with high confidence
- Denomination displayed in large text
- Voice announces: "This is [amount]"

⚠️ **Low Confidence** (Yellow border)
- Note detected but confidence is low
- Voice announces: "I'm not sure, please try again"
- Suggestion: Improve lighting and try again

⚠️ **Blurry Image** (Orange border)
- Image quality too low
- Voice announces: "Image unclear. Please retake"
- Suggestion: Hold camera steady and focus

❌ **Error** (Red border)
- Technical error occurred
- Voice provides guidance
- Suggestion: Try again or reload page

## Accessibility Features

### Screen Reader Users
- All elements have descriptive ARIA labels
- Live regions announce state changes
- Semantic HTML structure
- Full keyboard navigation

### Keyboard Navigation
- **Tab**: Move between elements
- **Enter/Space**: Activate buttons
- **Escape**: Cancel operations

### Voice Feedback
- Automatic announcements for all actions
- Clear, friendly language
- Helpful guidance at each step

## Troubleshooting

### Camera Not Working

**Issue**: "Camera access denied"

**Solutions**:
1. Check browser permissions
2. Ensure HTTPS (required for camera)
3. Try different browser
4. Use "Upload Photo" option instead

### Voice Not Working

**Issue**: No audio announcements

**Solutions**:
1. Check device volume
2. Enable browser audio
3. Try different browser
4. Visual text always displayed as fallback

### Slow Performance

**Issue**: Processing takes too long

**Solutions**:
1. Check internet connection (mock API uses delay)
2. Try smaller image files
3. Close other browser tabs
4. Clear browser cache

### Blurry Detection Issues

**Issue**: Clear images marked as blurry

**Solutions**:
1. Ensure good lighting
2. Hold camera steady
3. Focus on the note
4. Try closer/further distance
5. Clean camera lens

## Configuration

### Switch to Real Backend

Edit `js/api.js`:

```javascript
class CurrencyAPI {
    constructor() {
        // Set your backend URL
        this.endpoint = 'https://your-api.com/api/identify';
        
        // Disable mock responses
        this.useMockAPI = false;
    }
}
```

### Adjust Speech Settings

Edit `js/speech.js`:

```javascript
this.settings = {
    rate: 0.9,      // Speed: 0.1 to 2.0
    pitch: 1.0,     // Pitch: 0 to 2
    volume: 1.0,    // Volume: 0 to 1
    lang: 'en-US'   // Language code
};
```

### Customize Styling

Edit `css/style.css`:

```css
:root {
    --color-primary: #0066CC;     /* Change primary color */
    --font-size-base: 20px;       /* Change base font size */
    --button-height: 64px;        /* Change button height */
}
```

## Features Overview

### ✅ Implemented
- [x] Clean, accessible UI
- [x] Large buttons and high contrast
- [x] Camera capture
- [x] Image upload
- [x] Text-to-Speech feedback
- [x] ARIA labels for screen readers
- [x] Mobile-friendly design
- [x] Error handling with voice
- [x] Mock backend API
- [x] Responsive layout

### 🔄 Next Steps (See README.md)
- [ ] Real ML model integration
- [ ] Backend deployment
- [ ] Multi-currency support
- [ ] Scan history
- [ ] Offline mode

## File Structure

```
project/
├── index.html              # Main application
├── css/
│   └── style.css          # Styles and responsive design
├── js/
│   ├── main.js            # Core application logic
│   ├── speech.js          # Text-to-Speech module
│   └── api.js             # API communication
├── README.md              # Full documentation
├── QUICKSTART.md          # This file
├── BACKEND_GUIDE.md       # Backend implementation guide
└── ACCESSIBILITY.md       # Accessibility documentation
```

## Testing Checklist

Before deploying, test:

- [ ] Welcome screen loads correctly
- [ ] "Scan Note" button works
- [ ] Camera opens (on HTTPS)
- [ ] Upload works
- [ ] Image preview displays
- [ ] Voice announcements play
- [ ] Results display correctly
- [ ] Error messages work
- [ ] "Scan Again" resets properly
- [ ] Keyboard navigation works
- [ ] Mobile responsive
- [ ] Screen reader compatible

## Next Steps

1. **Test the application** thoroughly
2. **Read README.md** for complete documentation
3. **Check BACKEND_GUIDE.md** to implement real ML model
4. **Review ACCESSIBILITY.md** for accessibility guidelines
5. **Deploy to production** using steps above

## Support

For help:
- Review the full **README.md** for detailed information
- Check **BACKEND_GUIDE.md** for API integration
- Read **ACCESSIBILITY.md** for accessibility testing
- Consult browser console for error messages

## Demo Mode

The application includes a **mock API** that simulates:
- ✅ 80% success rate with random denominations
- ⚠️ 10% low confidence responses
- ⚠️ 10% blurry image detection

This allows you to test the full user experience without a backend!

## Important Notes

⚠️ **Camera requires HTTPS** in production (not needed for localhost)

⚠️ **Mock API is enabled** by default - switch to real backend when ready

⚠️ **Browser support**: Modern browsers only (last 2 versions)

✅ **No installation needed** - just open and use!

✅ **Fully accessible** - works with screen readers and keyboard

✅ **Mobile ready** - responsive design for all devices

---

**Ready to scan your first note? Open `index.html` and let's go! 🚀**
