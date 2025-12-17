/* ========================================
   MAIN APPLICATION LOGIC
   Currency Note Scanner
   ======================================== */

class CurrencyScanner {
    constructor() {
        // State
        this.currentScreen = 'welcomeScreen';
        this.capturedImage = null;
        this.cameraStream = null;
        
        // DOM Elements
        this.screens = {
            welcome: document.getElementById('welcomeScreen'),
            captureOptions: document.getElementById('captureOptionsScreen'),
            camera: document.getElementById('cameraScreen'),
            processing: document.getElementById('processingScreen'),
            results: document.getElementById('resultsScreen')
        };
        
        this.buttons = {
            scan: document.getElementById('scanButton'),
            camera: document.getElementById('cameraButton'),
            upload: document.getElementById('uploadButton'),
            capture: document.getElementById('captureButton'),
            cancelCamera: document.getElementById('cancelCameraButton'),
            backToWelcome: document.getElementById('backToWelcome'),
            scanAgain: document.getElementById('scanAgainButton')
        };
        
        this.elements = {
            fileInput: document.getElementById('fileInput'),
            cameraVideo: document.getElementById('cameraVideo'),
            captureCanvas: document.getElementById('captureCanvas'),
            previewImage: document.getElementById('previewImage'),
            denominationText: document.getElementById('denominationText'),
            resultMessage: document.getElementById('resultMessage'),
            errorMessage: document.getElementById('errorMessage')
        };
        
        this.resultCards = {
            success: document.getElementById('successResult'),
            lowConfidence: document.getElementById('lowConfidenceResult'),
            blurry: document.getElementById('blurryResult'),
            error: document.getElementById('errorResult')
        };
        
        // Initialize
        this.init();
    }
    
    init() {
        console.log('Initializing Currency Scanner...');
        this.setupEventListeners();
        this.showScreen('welcome');
        
        // Initial greeting
        setTimeout(() => {
            speechManager.speak('Welcome to Currency Note Scanner. Let me help you identify your currency notes.');
        }, 500);
    }
    
    setupEventListeners() {
        // Welcome screen
        this.buttons.scan.addEventListener('click', () => this.handleScanClick());
        
        // Capture options screen
        this.buttons.camera.addEventListener('click', () => this.handleCameraClick());
        this.buttons.upload.addEventListener('click', () => this.handleUploadClick());
        this.buttons.backToWelcome.addEventListener('click', () => this.handleBackToWelcome());
        
        // Camera screen
        this.buttons.capture.addEventListener('click', () => this.handleCaptureClick());
        this.buttons.cancelCamera.addEventListener('click', () => this.handleCancelCamera());
        
        // File input
        this.elements.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Results screen
        this.buttons.scanAgain.addEventListener('click', () => this.handleScanAgain());
    }
    
    showScreen(screenName) {
        // Hide all screens
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show requested screen
        const screen = this.screens[screenName];
        if (screen) {
            screen.classList.add('active');
            this.currentScreen = screenName;
            
            // Announce screen change to screen readers
            const screenTitles = {
                welcome: 'Welcome screen',
                captureOptions: 'Capture options screen',
                camera: 'Camera screen',
                processing: 'Processing your image',
                results: 'Results screen'
            };
            
            const announcement = screenTitles[screenName] || screenName;
            const alertElement = document.getElementById('alertContainer');
            if (alertElement) {
                alertElement.textContent = announcement;
            }
        }
    }
    
    handleScanClick() {
        speechManager.speak('Choose how you would like to scan the note');
        this.showScreen('captureOptions');
    }
    
    async handleCameraClick() {
        try {
            speechManager.speak('Opening camera. Please position the note within the frame.');
            
            // Request camera access
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use back camera on mobile
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            });
            
            this.cameraStream = stream;
            this.elements.cameraVideo.srcObject = stream;
            this.showScreen('camera');
            
        } catch (error) {
            console.error('Camera access error:', error);
            speechManager.speak('Unable to access camera. Please check permissions and try again.');
            alert('Camera access denied. Please allow camera permissions to use this feature.');
        }
    }
    
    handleUploadClick() {
        speechManager.speak('Please select an image from your gallery');
        this.elements.fileInput.click();
    }
    
    handleBackToWelcome() {
        speechManager.speak('Going back');
        this.showScreen('welcome');
    }
    
    handleCaptureClick() {
        speechManager.speak('Capturing image');
        
        // Get video dimensions
        const video = this.elements.cameraVideo;
        const canvas = this.elements.captureCanvas;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to base64
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        this.capturedImage = imageData;
        
        // Stop camera
        this.stopCamera();
        
        // Process image
        this.processImage(imageData);
    }
    
    handleCancelCamera() {
        speechManager.speak('Camera cancelled');
        this.stopCamera();
        this.showScreen('captureOptions');
    }
    
    handleFileSelect(event) {
        const file = event.target.files[0];
        
        if (!file) {
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            speechManager.speak('Please select a valid image file');
            alert('Please select a valid image file');
            return;
        }
        
        speechManager.speak('Image selected. Processing...');
        
        // Read file as base64
        const reader = new FileReader();
        reader.onload = (e) => {
            this.capturedImage = e.target.result;
            this.processImage(e.target.result);
        };
        reader.onerror = () => {
            speechManager.speak('Error reading file. Please try again.');
            alert('Error reading file. Please try again.');
        };
        reader.readAsDataURL(file);
    }
    
    async processImage(imageData) {
        try {
            // Show processing screen
            this.showScreen('processing');
            speechManager.speak('Please wait while I analyze the note');
            
            // Call API
            const result = await currencyAPI.identifyNote(imageData);
            
            // Show results
            this.showResults(result, imageData);
            
        } catch (error) {
            console.error('Processing error:', error);
            this.showError(error.message || 'An error occurred. Please try again.');
        }
    }
    
    showResults(result, imageData) {
        // Set preview image
        this.elements.previewImage.src = imageData;
        
        // Hide all result cards
        Object.values(this.resultCards).forEach(card => {
            card.hidden = true;
        });
        
        // Determine which result to show
        if (result.isBlurry) {
            // Blurry image
            this.resultCards.blurry.hidden = false;
            this.showScreen('results');
            speechManager.speak('Image unclear. Please retake the photo with better focus.');
            
        } else if (result.confidence < 0.7) {
            // Low confidence
            this.resultCards.lowConfidence.hidden = false;
            this.showScreen('results');
            speechManager.speak("I'm not sure about this note. Please try again with better lighting and focus.");
            
        } else {
            // Success
            this.resultCards.success.hidden = false;
            this.elements.denominationText.textContent = `${result.denomination} ${result.currency_code}`;
            this.elements.resultMessage.textContent = result.message;
            this.showScreen('results');
            
            // Speak result
            setTimeout(() => {
                speechManager.speak(result.message);
            }, 500);
        }
    }
    
    showError(message) {
        // Set preview image if available
        if (this.capturedImage) {
            this.elements.previewImage.src = this.capturedImage;
        }
        
        // Hide all result cards
        Object.values(this.resultCards).forEach(card => {
            card.hidden = true;
        });
        
        // Show error card
        this.resultCards.error.hidden = false;
        this.elements.errorMessage.textContent = message;
        
        this.showScreen('results');
        speechManager.speak('Something went wrong. Please try again.');
    }
    
    handleScanAgain() {
        speechManager.speak('Starting new scan');
        this.capturedImage = null;
        this.showScreen('captureOptions');
    }
    
    stopCamera() {
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach(track => track.stop());
            this.cameraStream = null;
            this.elements.cameraVideo.srcObject = null;
        }
    }
    
    cleanup() {
        this.stopCamera();
        speechManager.cancel();
    }
}

// Initialize app when DOM is ready
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new CurrencyScanner();
    });
} else {
    app = new CurrencyScanner();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (app) {
        app.cleanup();
    }
});

// Handle visibility change (pause/resume when tab is hidden/visible)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (app && app.cameraStream) {
            app.stopCamera();
        }
        speechManager.pause();
    }
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Log app initialization
console.log('Currency Note Scanner - Accessible Web Application');
console.log('Version: 1.0.0');
console.log('Text-to-Speech:', speechManager.isSupported ? 'Enabled' : 'Not Supported');
console.log('Camera API:', 'mediaDevices' in navigator ? 'Supported' : 'Not Supported');
