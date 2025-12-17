# Testing Checklist

Use this checklist to verify the Currency Note Scanner application works correctly.

## ✅ Pre-Testing Setup

- [ ] Open the application in a modern browser (Chrome, Safari, Firefox, Edge)
- [ ] Ensure device has a working camera (for camera testing)
- [ ] Enable browser microphone/speaker for TTS testing
- [ ] Have a currency note ready for scanning (or use a test image)

## 🧪 Functional Testing

### Welcome Screen
- [ ] Welcome screen displays on load
- [ ] "Currency Note Scanner" title visible
- [ ] Currency icon displays
- [ ] "Scan Note" button is large and visible
- [ ] Button text is readable
- [ ] Hear welcome message: "Welcome to Currency Note Scanner..."

### Navigation
- [ ] Click "Scan Note" button
- [ ] Navigate to capture options screen
- [ ] Two options visible: "Take Photo" and "Upload Photo"
- [ ] "Back" button visible and working
- [ ] Hear: "Choose how you would like to scan the note"

### Camera Test (if camera available)
- [ ] Click "Take Photo" button
- [ ] Browser requests camera permission
- [ ] Camera view appears after permission granted
- [ ] Live video feed visible
- [ ] Yellow frame overlay visible
- [ ] "Capture" button visible and large
- [ ] "Cancel" button visible
- [ ] Hear: "Opening camera. Please position the note..."
- [ ] Click "Capture" button
- [ ] Camera stops and image is captured
- [ ] Hear: "Capturing image"
- [ ] Processing screen appears
- [ ] Hear: "Please wait while I analyze the note"
- [ ] Results screen appears after ~2 seconds

### Upload Test
- [ ] Click "Upload Photo" button
- [ ] File picker dialog opens
- [ ] Select an image file
- [ ] Hear: "Image selected. Processing..."
- [ ] Processing screen appears
- [ ] Results screen appears after ~2 seconds

### Results Screen - Success (80% chance with mock API)
- [ ] Preview image displays
- [ ] Green-bordered success card visible
- [ ] Large denomination text displayed (e.g., "100 INR")
- [ ] Message text displayed (e.g., "This is one hundred rupees")
- [ ] Checkmark icon visible
- [ ] "Scan Again" button visible
- [ ] Hear denomination message spoken aloud

### Results Screen - Low Confidence (10% chance)
- [ ] Preview image displays
- [ ] Yellow/orange bordered warning card visible
- [ ] Warning icon visible
- [ ] "Not Sure" title displayed
- [ ] Message: "I'm not sure, please try again..."
- [ ] "Scan Again" button visible
- [ ] Hear: "I'm not sure about this note..."

### Results Screen - Blurry Image (10% chance)
- [ ] Preview image displays
- [ ] Orange/yellow bordered error card visible
- [ ] Warning icon visible
- [ ] "Image Unclear" title displayed
- [ ] Message: "The image is blurry..."
- [ ] "Scan Again" button visible
- [ ] Hear: "Image unclear. Please retake..."

### "Scan Again" Functionality
- [ ] Click "Scan Again" button
- [ ] Return to capture options screen
- [ ] Can capture/upload another image
- [ ] Process repeats correctly

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators clearly visible (blue outline)
- [ ] Enter/Space activates buttons
- [ ] Tab order is logical
- [ ] No keyboard traps
- [ ] Escape cancels camera view

### Text-to-Speech
- [ ] All screen changes announced
- [ ] Button actions provide voice feedback
- [ ] Results are spoken aloud
- [ ] Error messages are spoken
- [ ] Voice is clear and understandable
- [ ] Volume is appropriate

### Visual Accessibility
- [ ] High contrast colors throughout
- [ ] Text is large and readable
- [ ] Buttons are large (easy to tap/click)
- [ ] Icons enhance understanding
- [ ] Colors have sufficient contrast
- [ ] Works in browser zoom (up to 200%)

### Screen Reader Testing (Optional but Recommended)
- [ ] Enable screen reader (NVDA/JAWS/VoiceOver)
- [ ] Navigate entire application
- [ ] All elements properly announced
- [ ] ARIA labels read correctly
- [ ] Live regions announce changes
- [ ] Images have alt text

## 📱 Mobile Testing

### Mobile Browser
- [ ] Open on mobile device
- [ ] Responsive layout works
- [ ] Buttons large enough to tap easily
- [ ] Text readable without zoom
- [ ] Camera works on mobile
- [ ] Back camera used by default (not selfie)
- [ ] Upload works from gallery
- [ ] Portrait orientation works
- [ ] Landscape orientation works

### Touch Interactions
- [ ] Single tap activates buttons
- [ ] No accidental taps on nearby elements
- [ ] Visual feedback on touch
- [ ] Smooth scrolling

## 🎨 Visual Testing

### Different Screen Sizes
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Small mobile (320x568)

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Opera (latest)

### Dark Mode (if system supports)
- [ ] Dark mode colors applied
- [ ] Text still readable
- [ ] Contrast maintained

## 🔧 Technical Testing

### Console Errors
- [ ] Open browser developer console (F12)
- [ ] No JavaScript errors
- [ ] No CSS errors
- [ ] API calls log correctly
- [ ] TTS logs visible

### Performance
- [ ] Page loads quickly
- [ ] Smooth transitions between screens
- [ ] Camera starts quickly
- [ ] Image processing completes in ~2 seconds
- [ ] No lag or freezing

### Browser Permissions
- [ ] Camera permission requested
- [ ] Permission can be denied (upload still works)
- [ ] Permission can be granted
- [ ] Works after permission granted

## 📊 Test Results Summary

### Pass Criteria
- ✅ All core functionality working
- ✅ No critical errors
- ✅ Accessibility features working
- ✅ Voice feedback present
- ✅ Mobile responsive

### Issues Found
Document any issues below:

1. **Issue**: 
   - **Severity**: (Critical/High/Medium/Low)
   - **Steps to Reproduce**: 
   - **Expected**: 
   - **Actual**: 

2. **Issue**: 
   - **Severity**: 
   - **Steps to Reproduce**: 
   - **Expected**: 
   - **Actual**: 

## 🎯 Testing Notes

### Browser Used:
- Browser name and version: 

### Device Used:
- Device type: (Desktop/Laptop/Mobile/Tablet)
- Operating System: 
- Screen size: 

### Date Tested:
- Date: 

### Tester Name:
- Name: 

### Overall Result:
- [ ] ✅ All tests passed
- [ ] ⚠️ Minor issues found (specify above)
- [ ] ❌ Critical issues found (specify above)

### Additional Comments:
```
(Add any additional observations or suggestions)
```

---

## 🚀 Quick Test (30 seconds)

For a quick verification, just check:
1. [ ] Welcome screen loads
2. [ ] "Scan Note" button works
3. [ ] Can choose camera or upload
4. [ ] Processing shows after capture/upload
5. [ ] Results display with voice announcement
6. [ ] "Scan Again" works

If all 6 items work, core functionality is confirmed! ✅
