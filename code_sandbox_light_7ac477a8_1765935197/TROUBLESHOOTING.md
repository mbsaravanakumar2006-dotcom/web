# Troubleshooting Guide

Common issues and solutions for the Currency Note Scanner application.

## 🎥 Camera Issues

### Issue: Camera Not Working / "Camera access denied"

**Possible Causes:**
1. Camera permissions not granted
2. Using `file://` protocol (not HTTPS)
3. Camera already in use by another application
4. Browser doesn't support camera API

**Solutions:**

**Solution 1: Grant Camera Permissions**
- **Chrome/Edge**: Click lock icon in address bar → Site settings → Camera → Allow
- **Firefox**: Click lock icon → Connection → More information → Permissions → Camera → Allow
- **Safari**: Safari menu → Settings for This Website → Camera → Allow

**Solution 2: Use Local Server (Not file://)**
```bash
# Instead of opening index.html directly, use:
python -m http.server 8000
# Then open: http://localhost:8000
```

**Solution 3: Close Other Camera Applications**
- Close Zoom, Skype, Teams, or other video apps
- Restart browser
- Try again

**Solution 4: Use Different Browser**
- Try Chrome, Safari, or Edge
- Ensure browser is up to date

**Solution 5: Use Upload Instead**
- Click "Upload Photo" option
- Works without camera permissions

### Issue: Camera Shows Black Screen

**Solutions:**
1. Check if camera is covered
2. Try external camera if available
3. Restart browser
4. Check system camera settings
5. Update camera drivers (Windows)

### Issue: Wrong Camera (Selfie Instead of Back Camera)

**Solutions:**
1. On mobile, the app should automatically use back camera
2. In code (`js/main.js`), verify `facingMode: 'environment'`
3. Some devices may not have back camera
4. Use upload option as alternative

## 🔊 Audio / Text-to-Speech Issues

### Issue: No Voice Announcements

**Possible Causes:**
1. System volume muted
2. Browser audio blocked
3. Text-to-Speech not supported
4. Audio permissions denied

**Solutions:**

**Solution 1: Check Volume**
- Increase system volume
- Check browser isn't muted
- Check audio output device

**Solution 2: Enable Browser Audio**
- **Chrome**: Click lock icon → Sound → Allow
- Check browser isn't in silent mode
- Unmute browser tab

**Solution 3: Check Browser Support**
- TTS supported in Chrome, Safari, Edge, Firefox
- Update browser to latest version
- Try different browser

**Solution 4: Verify Web Speech API**
- Open browser console (F12)
- Type: `'speechSynthesis' in window`
- Should return `true`

**Solution 5: Use Visual Text**
- All voice messages also displayed as text
- Application remains fully functional without audio

### Issue: Voice is Robotic or Unclear

**Solutions:**
1. Wait for voices to load (first launch may take time)
2. Better voices may install over time
3. In `js/speech.js`, adjust `rate: 0.9` (slower = clearer)
4. Different browsers have different voices
5. Try Chrome for best voice quality

### Issue: Voice Announcements Overlap

**Solutions:**
1. App should cancel previous speech automatically
2. If issue persists, reload page
3. Check console for errors
4. Report issue with browser/device info

## 📱 Mobile Issues

### Issue: App Not Responsive on Mobile

**Solutions:**
1. Rotate device (try portrait and landscape)
2. Zoom out if zoomed in
3. Clear browser cache
4. Try different mobile browser
5. Check `<meta name="viewport">` tag present

### Issue: Buttons Too Small on Mobile

**Solutions:**
1. Use zoom (pinch to zoom)
2. Check browser text size settings
3. Buttons should be 48px minimum (check CSS)
4. Try landscape orientation

### Issue: Upload Doesn't Open Gallery

**Solutions:**
1. Grant storage/photos permission to browser
2. Use "Take Photo" option instead
3. Try different browser
4. Update mobile OS

## 🖥️ Display Issues

### Issue: Text Too Small / Hard to Read

**Solutions:**
1. Use browser zoom (Ctrl/Cmd + Plus)
2. Increase browser font size in settings
3. Use browser reading mode
4. Text should be minimum 20px (check CSS)

### Issue: Poor Color Contrast

**Solutions:**
1. Check display brightness
2. Disable night mode/blue light filter temporarily
3. Use browser high contrast mode
4. Contact developer if contrast insufficient (should be 7:1+)

### Issue: Layout Broken / Elements Overlapping

**Solutions:**
1. Clear browser cache: Ctrl/Cmd + Shift + Delete
2. Hard refresh: Ctrl/Cmd + Shift + R
3. Check browser console for CSS errors
4. Try different browser
5. Check screen resolution

## 🌐 Connection / API Issues

### Issue: "Failed to connect to server"

**Note:** With mock API, this shouldn't happen. If using real backend:

**Solutions:**
1. Check internet connection
2. Verify backend URL in `js/api.js`
3. Check backend server is running
4. Check CORS headers on backend
5. Check browser console for network errors

### Issue: Processing Takes Too Long

**With Mock API:**
- Mock delay is 2 seconds (intentional)
- To reduce: Edit `mockDelay` in `js/api.js`

**With Real Backend:**
- Check network speed
- Check backend response time
- Optimize ML model inference
- Add loading indicators

### Issue: Always Getting "Low Confidence" Results

**With Mock API:**
- Random responses (10% low confidence is normal)
- Try multiple times

**With Real Backend:**
- ML model needs better training
- Improve image quality
- Check lighting conditions
- Adjust confidence threshold in backend

## ⌨️ Keyboard Navigation Issues

### Issue: Can't Navigate with Keyboard

**Solutions:**
1. Click on page first to focus
2. Use Tab key to move between elements
3. Use Enter/Space to activate
4. Use Escape to cancel
5. Check no keyboard trap exists

### Issue: Focus Indicator Not Visible

**Solutions:**
1. Check browser has focus styles enabled
2. Blue outline should be visible (3px)
3. Try different background
4. Check CSS for `:focus` styles

## 🐛 JavaScript Errors

### Issue: App Not Working / White Screen

**Solutions:**

**Solution 1: Check Console**
1. Press F12 to open Developer Tools
2. Go to Console tab
3. Look for red error messages
4. Report errors with details

**Solution 2: Check JavaScript Enabled**
1. Ensure JavaScript is enabled in browser
2. Check no browser extensions blocking JS
3. Try incognito/private mode

**Solution 3: Clear Cache**
1. Clear browser cache completely
2. Hard refresh (Ctrl/Cmd + Shift + R)
3. Try again

**Solution 4: Check File Paths**
1. Verify all files in correct locations:
   - `css/style.css`
   - `js/main.js`
   - `js/speech.js`
   - `js/api.js`
2. Check file names match exactly (case-sensitive)

### Issue: "speechManager is not defined"

**Solutions:**
1. Check `js/speech.js` loaded before `js/main.js`
2. Check file path is correct
3. Check no JavaScript errors in console
4. Verify `<script>` tags order in HTML

### Issue: "currencyAPI is not defined"

**Solutions:**
1. Check `js/api.js` loaded before `js/main.js`
2. Check file path is correct
3. Verify `<script>` tags order in HTML

## 📸 Image Processing Issues

### Issue: Image Preview Not Showing

**Solutions:**
1. Check image format (JPEG, PNG, WebP)
2. Check file size (< 10MB recommended)
3. Try different image
4. Check browser console for errors

### Issue: "Image unclear" for Clear Photos

**With Mock API:**
- 10% chance of blur detection (random)
- Try multiple times
- Normal behavior for demo

**With Real Backend:**
- Adjust blur detection threshold
- Check image preprocessing
- Verify blur detection algorithm

## 🔒 Permission Issues

### Issue: Permission Popup Doesn't Appear

**Solutions:**
1. Check browser hasn't permanently blocked permissions
2. Reset site permissions in browser settings
3. Clear browser data for site
4. Try different browser

### Issue: Permission Granted but Still Not Working

**Solutions:**
1. Restart browser
2. Check system settings (OS level permissions)
3. Try different browser
4. Check no antivirus blocking

## 🚀 Deployment Issues

### Issue: Works Locally but Not on Server

**Solutions:**
1. Ensure HTTPS (required for camera)
2. Check all file paths are relative
3. Verify CORS headers if using separate backend
4. Check server MIME types for JS/CSS
5. Check no 404 errors in network tab

### Issue: Netlify/Vercel Deploy Failed

**Solutions:**
1. Check build settings (should be none for static site)
2. Verify publish directory is root (`.`)
3. Check no file name conflicts
4. Verify all files committed to repository
5. Check deployment logs for errors

## 📊 Performance Issues

### Issue: App is Slow / Laggy

**Solutions:**
1. Close other browser tabs
2. Clear browser cache
3. Disable browser extensions
4. Try different browser
5. Check device specifications
6. Reduce image size before upload

### Issue: High Battery Drain on Mobile

**Solutions:**
1. Camera uses battery (normal)
2. Close app when not in use
3. Use upload instead of camera when possible
4. Reduce screen brightness

## 🔍 Debugging Tips

### General Debugging Steps

1. **Open Developer Console** (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests
   - Check Elements tab for DOM issues

2. **Test in Incognito/Private Mode**
   - Eliminates extension conflicts
   - Fresh browser state
   - Clean cache

3. **Try Different Browser**
   - Chrome/Edge (best support)
   - Safari (iOS)
   - Firefox

4. **Check Browser Version**
   - Update to latest version
   - Check minimum requirements

5. **Test on Different Device**
   - Isolate hardware vs software issues
   - Test desktop vs mobile

## 📝 Reporting Issues

When reporting issues, include:

1. **Browser**: Name and version
2. **Device**: Desktop/Mobile, OS version
3. **Screen size**: Resolution
4. **Steps to reproduce**: Exact steps
5. **Expected behavior**: What should happen
6. **Actual behavior**: What actually happens
7. **Console errors**: Any error messages
8. **Screenshots**: If applicable

## 🆘 Still Need Help?

1. Review **README.md** for complete documentation
2. Check **ACCESSIBILITY.md** for accessibility issues
3. Review **BACKEND_GUIDE.md** for API integration
4. Search existing issues on GitHub
5. Create new issue with details above

## ✅ Quick Fixes Summary

| Issue | Quick Fix |
|-------|-----------|
| Camera not working | Use localhost, not file:// |
| No voice | Check volume, try different browser |
| Mobile layout issues | Clear cache, try landscape |
| Permission denied | Reset site permissions |
| JavaScript errors | Check file paths, clear cache |
| Slow performance | Close other tabs, reduce image size |
| Can't navigate | Use Tab key, click page first |
| API errors | Check mock API enabled in js/api.js |

## 🎯 Most Common Issues

1. **Camera not working**: Use localhost HTTP server
2. **No audio**: Check system volume and browser audio
3. **Mobile responsive**: Clear cache and hard refresh
4. **White screen**: Check console for JavaScript errors
5. **Permissions**: Reset browser permissions for site

---

**Remember**: With mock API enabled, the app should work without any backend setup!
