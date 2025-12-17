# Currency Note Scanner - Accessible Web Application

## 📋 Project Overview

An accessibility-first web application designed for visually challenged users to scan and identify currency notes with audio feedback. The app captures or uploads images of currency notes and provides spoken denomination information.

## ✅ Currently Completed Features

### Frontend Features
1. **Accessible UI Design**
   - High contrast colors (WCAG AAA compliant)
   - Large, touch-friendly buttons (minimum 48x48px)
   - Full ARIA label support for screen readers
   - Mobile-friendly responsive layout

2. **Image Capture Options**
   - Camera capture using device camera
   - File upload for existing images
   - Visual preview of captured/uploaded image

3. **Text-to-Speech Integration**
   - Web Speech API implementation
   - Automatic audio announcement of results
   - Voice feedback for errors and guidance

4. **Error Handling**
   - Low confidence detection feedback
   - Blurry image detection with retry option
   - Clear visual and audio error messages

5. **User Flow**
   - Single "Scan Note" main action button
   - Clear instructions at each step
   - Visual and audio feedback throughout

### Backend API Structure
- Mock API endpoint: `/api/identify`
- Accepts: POST with base64 encoded image
- Returns: JSON with denomination, currency, confidence, and message

## 🌐 Functional Entry URIs

### Main Application
- **Path**: `/index.html`
- **Description**: Main application interface

### API Endpoint (Mock Implementation)
- **Endpoint**: `POST /api/identify`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "image": "data:image/jpeg;base64,..."
  }
  ```
- **Response Body**:
  ```json
  {
    "denomination": "100",
    "currency_code": "INR",
    "confidence": 0.95,
    "orientation_note": "correct",
    "message": "This is 100 rupees"
  }
  ```

## 🔧 Data Models

### API Response Structure
```javascript
{
  denomination: string,      // e.g., "100", "500"
  currency_code: string,      // e.g., "INR", "USD"
  confidence: number,         // 0.0 to 1.0
  orientation_note: string,   // "correct", "rotated", "upside_down"
  message: string            // Human-readable message
}
```

## 🚧 Features Not Yet Implemented

1. **Real Backend Integration**
   - Currently using mock API responses
   - Needs integration with actual ML model for currency recognition
   - Backend server deployment (Node.js/Python)

2. **Advanced ML Features**
   - Real-time currency note recognition
   - Multi-currency support
   - Counterfeit detection
   - Image quality assessment algorithm

3. **Additional Features**
   - History of scanned notes
   - Multiple language support
   - Offline mode capability
   - Settings for speech rate and voice selection

4. **Security Enhancements**
   - API authentication
   - Rate limiting
   - Image validation and sanitization

## 🎯 Recommended Next Steps

1. **Backend Development** (Priority: High)
   - Set up Node.js/Python backend server
   - Integrate ML model for currency recognition
   - Implement image quality validation
   - Deploy to production server

2. **ML Model Integration** (Priority: High)
   - Train or integrate pre-trained currency recognition model
   - Implement confidence scoring
   - Add blur detection algorithm
   - Test with various currency denominations

3. **Testing & Optimization** (Priority: Medium)
   - Test with actual screen readers (NVDA, JAWS, VoiceOver)
   - User testing with visually challenged users
   - Performance optimization for mobile devices
   - Cross-browser compatibility testing

4. **Feature Enhancements** (Priority: Low)
   - Add scan history feature
   - Implement user preferences storage
   - Add support for multiple currencies
   - Create tutorial/onboarding flow

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic structure with accessibility features
- **CSS3**: High contrast design, responsive layout
- **JavaScript (ES6+)**: Camera API, File API, Web Speech API
- **Web APIs Used**:
  - MediaDevices API (camera access)
  - Web Speech API (text-to-speech)
  - FileReader API (image upload)
  - Canvas API (image processing)

### Backend (Structure Provided)
- **Endpoint**: REST API
- **Format**: JSON
- **Method**: POST
- **Ready for**: Node.js, Python Flask/FastAPI, or any backend framework

## 📱 Browser Compatibility

- Chrome/Edge: Full support
- Safari: Full support (iOS 11+)
- Firefox: Full support
- Opera: Full support

**Note**: Camera access requires HTTPS in production.

## ♿ Accessibility Features

- WCAG AAA compliant color contrast
- Full keyboard navigation support
- Screen reader optimized with ARIA labels
- Large touch targets (minimum 48x48px)
- Voice feedback for all actions
- Clear error messages with audio

## 🎨 UI Tone Guidelines

The application uses:
- Warm, friendly, supportive language
- Simple and clear instructions
- Caring guide approach
- No technical jargon
- Encouraging feedback messages

Example messages:
- "Let me help you identify this note"
- "Great! I found it"
- "Let's try that again with better lighting"

## 📄 Project Files

### Main Application
- `index.html` - Main application interface
- `css/style.css` - Styles and responsive design
- `js/main.js` - Core application logic
- `js/speech.js` - Text-to-Speech module
- `js/api.js` - API communication and mock responses

### Documentation
- `README.md` - This file - complete project documentation
- `QUICKSTART.md` - Quick start guide for immediate use
- `BACKEND_GUIDE.md` - Backend API implementation guide with code examples
- `ACCESSIBILITY.md` - Comprehensive accessibility documentation and testing

## 🚀 Getting Started

### Quick Start (5 Minutes)
1. **Open `index.html`** in a web browser (or use a local server)
2. **Click "Scan Note"** to begin
3. **Choose capture method** (camera or upload)
4. **Scan a note** and hear the result!

📖 **See [QUICKSTART.md](QUICKSTART.md)** for detailed setup instructions and deployment options.

### For Backend Integration
🔧 **See [BACKEND_GUIDE.md](BACKEND_GUIDE.md)** for:
- Complete API specification
- Node.js and Python implementation examples
- ML model integration guidance
- Deployment instructions

### For Accessibility Testing
♿ **See [ACCESSIBILITY.md](ACCESSIBILITY.md)** for:
- WCAG compliance details
- Screen reader testing guidelines
- Browser compatibility testing
- User testing scenarios

## 📝 License

This project is designed for accessibility and can be freely used and modified.
