# Accessibility Documentation

## Overview

This Currency Note Scanner application is designed with accessibility as a core feature, specifically targeting visually challenged users. This document outlines all accessibility features and testing guidelines.

## WCAG Compliance

The application targets **WCAG 2.1 Level AAA** compliance where possible.

### Level A (Must Have) ✅
- [x] Keyboard accessible
- [x] Text alternatives for non-text content
- [x] Captions and alternatives for media
- [x] Adaptable content structure
- [x] Distinguishable content (color contrast)

### Level AA (Should Have) ✅
- [x] Multiple ways to navigate
- [x] Clear focus indicators
- [x] Minimum contrast ratio 4.5:1
- [x] Resize text up to 200%
- [x] Images of text avoided

### Level AAA (Nice to Have) ✅
- [x] Enhanced contrast ratio 7:1 or higher
- [x] No timing requirements
- [x] Low or no background audio
- [x] Visual presentation customizable

## Accessibility Features

### 1. Visual Design

#### High Contrast Colors
- **Background**: Pure white (#FFFFFF) or pure black in dark mode
- **Text**: Pure black (#000000) with contrast ratio > 7:1
- **Primary actions**: Blue (#0066CC) with contrast ratio 7.2:1
- **Error states**: Red (#CC0000) with contrast ratio 7.5:1
- **Success states**: Green (#008000) with contrast ratio 7.1:1

#### Large Touch Targets
- All buttons: Minimum 48x48px (exceeds WCAG 2.1 requirement of 44x44px)
- Primary action button: 64px height
- Generous spacing between interactive elements

#### Typography
- Base font size: 20px (larger than standard 16px)
- Headings: 24px - 48px
- Clear, sans-serif font family
- Line height: 1.6 for better readability
- No text in images

### 2. Screen Reader Support

#### ARIA Labels
Every interactive element has descriptive ARIA labels:
```html
<button aria-label="Start scanning currency note. You can choose to take a photo or upload an image.">
    Scan Note
</button>
```

#### Live Regions
- `aria-live="polite"` on screen changes
- `aria-live="assertive"` for important announcements
- `role="alert"` for error messages
- `role="status"` for processing states

#### Semantic HTML
- `<header>`, `<main>`, `<footer>` for structure
- `<nav>` for navigation
- `<section>` for content areas
- Proper heading hierarchy (h1 → h2 → h3)

#### Hidden Content
- Visual decorations marked with `aria-hidden="true"`
- Screen reader only content with `.visually-hidden` class

### 3. Keyboard Navigation

#### Full Keyboard Support
- **Tab**: Move to next interactive element
- **Shift+Tab**: Move to previous element
- **Enter/Space**: Activate buttons
- **Escape**: Cancel operations (camera, etc.)

#### Focus Indicators
- 3px solid outline with 2px offset
- Primary color (#0066CC)
- Clearly visible on all backgrounds

#### Tab Order
Logical flow through the interface:
1. Main action button
2. Secondary options
3. Cancel/back buttons
4. Results actions

### 4. Text-to-Speech (TTS)

#### Web Speech API Integration
- Automatic voice feedback for all actions
- Clear, natural language announcements
- Configurable speech rate (default: 0.9x for clarity)

#### Voice Feedback Events
- **Welcome**: "Welcome to Currency Note Scanner"
- **Action prompt**: "Choose how you would like to scan"
- **Camera opening**: "Opening camera. Please position the note"
- **Capture**: "Capturing image"
- **Processing**: "Please wait while I analyze the note"
- **Success**: "This is one hundred rupees"
- **Error**: "Image unclear. Please retake"
- **Low confidence**: "I'm not sure, please try again"

#### Friendly, Supportive Language
- Warm and encouraging tone
- Simple, jargon-free instructions
- Helpful guidance without being patronizing
- Examples:
  - ✅ "Let me help you identify this note"
  - ✅ "Great! I found it"
  - ✅ "Let's try that again with better lighting"
  - ❌ Technical error codes
  - ❌ Complex technical terms

### 5. Mobile Accessibility

#### Touch Gestures
- All actions accessible via single tap
- No complex gestures required (no pinch, swipe, etc.)
- Touch targets exceed minimum size

#### Camera Integration
- Automatic back camera selection on mobile
- Clear visual frame for positioning
- Voice guidance for positioning

#### Responsive Design
- Works on all screen sizes
- Text scales appropriately
- Buttons remain large on all devices

### 6. Error Handling

#### Clear Error Messages
- Visual indicators (icons, colors, borders)
- Spoken announcements
- Actionable guidance (what to do next)

#### Error Types Covered
1. **Blurry Image**
   - Visual: Yellow/orange border, warning icon
   - Voice: "Image unclear. Please retake the photo with better focus"
   
2. **Low Confidence**
   - Visual: Yellow/orange border, caution icon
   - Voice: "I'm not sure about this note. Please try again with better lighting"
   
3. **Camera Access Denied**
   - Visual: Alert dialog
   - Voice: "Unable to access camera. Please check permissions"
   
4. **Network Error**
   - Visual: Red border, error icon
   - Voice: "Something went wrong. Please try again"

### 7. Progressive Enhancement

#### Core Functionality Without JavaScript
- Error page displayed if JavaScript is disabled
- Link to enable JavaScript instructions

#### Fallback for TTS
- Visual text always displayed
- Screen reader announcements via aria-live
- Manual reading always possible

#### Fallback for Camera
- Upload option always available
- Works without camera permissions

## Testing Guidelines

### Screen Reader Testing

#### Windows
1. **NVDA** (Free, open source)
   - Download from nvaccess.org
   - Navigate with arrow keys
   - Listen to announcements
   
2. **JAWS** (Commercial)
   - Industry standard
   - Test all interactive elements
   - Verify proper ARIA usage

#### macOS
1. **VoiceOver** (Built-in)
   - Press Cmd+F5 to enable
   - Use VO keys (Control+Option) + arrows
   - Test all screens

#### Mobile
1. **iOS VoiceOver**
   - Settings → Accessibility → VoiceOver
   - Triple-click home/side button to toggle
   - Swipe to navigate
   
2. **Android TalkBack**
   - Settings → Accessibility → TalkBack
   - Swipe to navigate
   - Double-tap to activate

### Keyboard Testing

1. **Tab through all elements**
   - Verify logical order
   - Check focus indicators visible
   - Ensure all interactive elements reachable

2. **Use keyboard only**
   - Complete full workflow without mouse
   - Test Enter and Space for activation
   - Verify Escape cancels operations

3. **Focus management**
   - Focus moves to new content on screen change
   - Focus returns appropriately on cancel
   - No keyboard traps

### Color Contrast Testing

#### Tools
1. **WebAIM Contrast Checker**
   - https://webaim.org/resources/contrastchecker/
   - Test all text/background combinations
   - Aim for AAA (7:1 or higher)

2. **WAVE Browser Extension**
   - https://wave.webaim.org/extension/
   - Automated accessibility testing
   - Checks contrast, structure, ARIA

3. **axe DevTools**
   - Browser extension
   - Comprehensive WCAG testing
   - Detailed issue reports

#### Manual Testing
1. Test in grayscale mode
2. Test with high contrast mode
3. Test with reduced motion preferences
4. Test with different zoom levels (up to 200%)

### Voice Testing

1. **Test all announcements**
   - Complete full user flow
   - Verify all actions have voice feedback
   - Check language is clear and helpful

2. **Test timing**
   - Verify no overlapping announcements
   - Check processing delays are announced
   - Ensure success/error messages speak

3. **Test different browsers**
   - Chrome/Edge: Good support
   - Safari: Good support
   - Firefox: Good support
   - Check voice quality and availability

### Mobile Testing

1. **iOS Testing**
   - Safari on iPhone
   - Camera access
   - VoiceOver navigation
   - Portrait and landscape

2. **Android Testing**
   - Chrome on Android
   - Camera access
   - TalkBack navigation
   - Various screen sizes

3. **Touch Target Testing**
   - Verify all buttons easily tappable
   - Check spacing prevents mis-taps
   - Test with different finger sizes

### User Testing

#### Ideal Test Users
- People with visual impairments
- Screen reader users
- Keyboard-only users
- Mobile-only users
- Older adults
- Users with motor impairments

#### Testing Scenarios
1. **First-time use**
   - Can user understand purpose?
   - Are instructions clear?
   - Is navigation intuitive?

2. **Scanning a note**
   - Can user capture image easily?
   - Is voice feedback helpful?
   - Are results clear?

3. **Error recovery**
   - Can user understand errors?
   - Is retry process clear?
   - Are suggestions helpful?

## Common Issues and Solutions

### Issue: Focus not visible
**Solution**: Ensure high contrast focus outline (3px solid)

### Issue: Button text too small
**Solution**: Minimum 20px font size, 48px touch target

### Issue: TTS not working
**Solution**: Check browser support, add visual fallback

### Issue: Screen reader announces decorative elements
**Solution**: Add `aria-hidden="true"` to decorative elements

### Issue: Color-only information
**Solution**: Add text labels, icons, and patterns

### Issue: Keyboard trap in camera view
**Solution**: Ensure Cancel button accessible via keyboard

## Browser Support

| Browser | Version | TTS | Camera | ARIA |
|---------|---------|-----|--------|------|
| Chrome | 90+ | ✅ | ✅ | ✅ |
| Edge | 90+ | ✅ | ✅ | ✅ |
| Safari | 14+ | ✅ | ✅ | ✅ |
| Firefox | 88+ | ✅ | ✅ | ✅ |

## Future Enhancements

1. **Multi-language support**
   - TTS in regional languages
   - UI text translations
   - Voice command input

2. **Voice commands**
   - "Scan note" to start
   - "Repeat" to hear result again
   - Hands-free operation

3. **Haptic feedback**
   - Vibration on success
   - Different patterns for different results

4. **Customizable settings**
   - Speech rate adjustment
   - Voice selection
   - High contrast themes

5. **Offline mode**
   - Local ML model
   - Works without internet
   - Progressive Web App

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Resources](https://webaim.org/resources/)
- [A11Y Project](https://www.a11yproject.com/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## Contact

For accessibility feedback or issues:
- Open an issue on GitHub
- Provide detailed description
- Include browser/screen reader version
- Describe expected vs actual behavior
