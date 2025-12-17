/* ========================================
   API MODULE
   Backend Communication & Mock Responses
   ======================================== */

class CurrencyAPI {
    constructor() {
        // Backend endpoint - replace with actual URL in production
        this.endpoint = '/api/identify';
        
        // Use mock responses for development/demo
        this.useMockAPI = true;
        
        // Mock response delay (milliseconds)
        this.mockDelay = 2000;
    }
    
    /**
     * Send image to backend for identification
     * @param {string} imageData - Base64 encoded image data
     * @returns {Promise} API response
     */
    async identifyNote(imageData) {
        if (this.useMockAPI) {
            return this.getMockResponse(imageData);
        }
        
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: imageData
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return this.validateResponse(data);
            
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Failed to connect to the server. Please try again.');
        }
    }
    
    /**
     * Validate API response structure
     * @param {Object} data - Response data
     * @returns {Object} Validated response
     */
    validateResponse(data) {
        const required = ['denomination', 'currency_code', 'confidence', 'message'];
        
        for (const field of required) {
            if (!(field in data)) {
                throw new Error(`Invalid API response: missing ${field}`);
            }
        }
        
        return {
            denomination: String(data.denomination),
            currency_code: String(data.currency_code),
            confidence: Number(data.confidence),
            orientation_note: data.orientation_note || 'correct',
            message: String(data.message),
            isBlurry: data.isBlurry || false
        };
    }
    
    /**
     * Generate mock API response for development
     * @param {string} imageData - Base64 encoded image
     * @returns {Promise} Mock response
     */
    getMockResponse(imageData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate different scenarios randomly
                const scenario = Math.random();
                
                if (scenario < 0.1) {
                    // 10% chance: Blurry image
                    resolve({
                        denomination: null,
                        currency_code: null,
                        confidence: 0,
                        orientation_note: 'unclear',
                        message: 'Image unclear. Please retake.',
                        isBlurry: true
                    });
                } else if (scenario < 0.2) {
                    // 10% chance: Low confidence
                    resolve({
                        denomination: '100',
                        currency_code: 'INR',
                        confidence: 0.45,
                        orientation_note: 'correct',
                        message: "I'm not sure, please try again.",
                        isBlurry: false
                    });
                } else {
                    // 80% chance: Successful recognition
                    const denominations = [
                        { value: '10', currency: 'INR', name: 'ten rupees' },
                        { value: '20', currency: 'INR', name: 'twenty rupees' },
                        { value: '50', currency: 'INR', name: 'fifty rupees' },
                        { value: '100', currency: 'INR', name: 'one hundred rupees' },
                        { value: '200', currency: 'INR', name: 'two hundred rupees' },
                        { value: '500', currency: 'INR', name: 'five hundred rupees' },
                        { value: '2000', currency: 'INR', name: 'two thousand rupees' }
                    ];
                    
                    const note = denominations[Math.floor(Math.random() * denominations.length)];
                    const confidence = 0.85 + (Math.random() * 0.15); // 0.85 to 1.0
                    
                    resolve({
                        denomination: note.value,
                        currency_code: note.currency,
                        confidence: confidence,
                        orientation_note: 'correct',
                        message: `This is ${note.name}`,
                        isBlurry: false
                    });
                }
            }, this.mockDelay);
        });
    }
    
    /**
     * Check if image is likely to be blurry (simple heuristic)
     * @param {string} imageData - Base64 encoded image
     * @returns {Promise<boolean>} True if image might be blurry
     */
    async checkImageQuality(imageData) {
        // This is a placeholder for actual blur detection
        // In production, you would implement proper image analysis
        // For now, we'll rely on the backend to detect blur
        return false;
    }
}

// Mock backend endpoint documentation
const API_DOCUMENTATION = {
    endpoint: '/api/identify',
    method: 'POST',
    description: 'Identify currency note from image',
    
    request: {
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            image: 'string (base64 encoded image with data URI prefix)'
        },
        example: {
            image: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
        }
    },
    
    response: {
        success: {
            denomination: 'string (e.g., "100", "500")',
            currency_code: 'string (e.g., "INR", "USD")',
            confidence: 'number (0.0 to 1.0)',
            orientation_note: 'string (e.g., "correct", "rotated", "upside_down")',
            message: 'string (human-readable message)',
            isBlurry: 'boolean (optional, indicates image quality issue)'
        },
        examples: {
            highConfidence: {
                denomination: '100',
                currency_code: 'INR',
                confidence: 0.95,
                orientation_note: 'correct',
                message: 'This is one hundred rupees',
                isBlurry: false
            },
            lowConfidence: {
                denomination: '100',
                currency_code: 'INR',
                confidence: 0.45,
                orientation_note: 'correct',
                message: "I'm not sure, please try again.",
                isBlurry: false
            },
            blurryImage: {
                denomination: null,
                currency_code: null,
                confidence: 0,
                orientation_note: 'unclear',
                message: 'Image unclear. Please retake.',
                isBlurry: true
            }
        }
    },
    
    errorHandling: {
        statusCodes: {
            200: 'Success',
            400: 'Bad Request (invalid image data)',
            500: 'Internal Server Error',
            503: 'Service Unavailable'
        },
        clientHandling: 'Show user-friendly error message and allow retry'
    },
    
    confidenceThreshold: {
        high: 0.7,
        description: 'Responses with confidence < 0.7 should trigger "not sure" feedback'
    }
};

// Create global instance
const currencyAPI = new CurrencyAPI();

// Export for use in other modules
window.currencyAPI = currencyAPI;
window.API_DOCUMENTATION = API_DOCUMENTATION;

// Log API documentation in console for developers
console.log('Currency API Documentation:', API_DOCUMENTATION);
