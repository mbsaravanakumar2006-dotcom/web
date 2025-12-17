/* ========================================
   TEXT-TO-SPEECH MODULE
   Web Speech API Implementation
   ======================================== */

class SpeechManager {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.isSupported = 'speechSynthesis' in window;
        this.isSpeaking = false;
        this.queue = [];
        
        // Default voice settings
        this.settings = {
            rate: 0.9,      // Slightly slower for clarity
            pitch: 1.0,     // Normal pitch
            volume: 1.0,    // Full volume
            lang: 'en-US'   // Default language
        };
        
        if (!this.isSupported) {
            console.warn('Text-to-Speech is not supported in this browser');
        }
    }
    
    /**
     * Speak text with optional callback
     * @param {string} text - Text to speak
     * @param {Function} onEnd - Optional callback when speech ends
     */
    speak(text, onEnd = null) {
        if (!this.isSupported || !text) {
            console.warn('Cannot speak:', text);
            if (onEnd) onEnd();
            return;
        }
        
        // Cancel any ongoing speech
        this.cancel();
        
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Apply settings
        utterance.rate = this.settings.rate;
        utterance.pitch = this.settings.pitch;
        utterance.volume = this.settings.volume;
        utterance.lang = this.settings.lang;
        
        // Event handlers
        utterance.onstart = () => {
            this.isSpeaking = true;
            console.log('Speech started:', text);
        };
        
        utterance.onend = () => {
            this.isSpeaking = false;
            console.log('Speech ended');
            if (onEnd) onEnd();
        };
        
        utterance.onerror = (event) => {
            console.error('Speech error:', event.error);
            this.isSpeaking = false;
            if (onEnd) onEnd();
        };
        
        // Speak
        this.synthesis.speak(utterance);
    }
    
    /**
     * Speak multiple texts in sequence
     * @param {Array} texts - Array of text strings to speak
     * @param {Function} onComplete - Optional callback when all speech completes
     */
    speakSequence(texts, onComplete = null) {
        if (!this.isSupported || !texts || texts.length === 0) {
            if (onComplete) onComplete();
            return;
        }
        
        let index = 0;
        
        const speakNext = () => {
            if (index < texts.length) {
                this.speak(texts[index], () => {
                    index++;
                    // Small delay between utterances
                    setTimeout(speakNext, 300);
                });
            } else {
                if (onComplete) onComplete();
            }
        };
        
        speakNext();
    }
    
    /**
     * Cancel current speech
     */
    cancel() {
        if (this.synthesis.speaking) {
            this.synthesis.cancel();
        }
        this.isSpeaking = false;
    }
    
    /**
     * Pause current speech
     */
    pause() {
        if (this.synthesis.speaking) {
            this.synthesis.pause();
        }
    }
    
    /**
     * Resume paused speech
     */
    resume() {
        if (this.synthesis.paused) {
            this.synthesis.resume();
        }
    }
    
    /**
     * Update speech settings
     * @param {Object} newSettings - New settings to apply
     */
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
    }
    
    /**
     * Get available voices
     * @returns {Array} Array of available voices
     */
    getVoices() {
        return this.synthesis.getVoices();
    }
    
    /**
     * Set voice by name or language
     * @param {string} voiceName - Name or language code of the voice
     */
    setVoice(voiceName) {
        const voices = this.getVoices();
        const voice = voices.find(v => 
            v.name === voiceName || v.lang === voiceName
        );
        
        if (voice) {
            this.settings.voice = voice;
        }
    }
    
    /**
     * Announce to screen readers and speak
     * @param {string} text - Text to announce
     * @param {string} elementId - ID of alert container
     */
    announceAndSpeak(text, elementId = 'alertContainer') {
        // Update screen reader alert
        const alertElement = document.getElementById(elementId);
        if (alertElement) {
            alertElement.textContent = text;
        }
        
        // Speak the text
        this.speak(text);
    }
}

// Create global instance
const speechManager = new SpeechManager();

// Wait for voices to be loaded (some browsers load them asynchronously)
if (speechManager.isSupported) {
    window.speechSynthesis.onvoiceschanged = () => {
        const voices = speechManager.getVoices();
        console.log('Voices loaded:', voices.length);
        
        // Try to set a clear English voice
        const preferredVoices = ['Google US English', 'Microsoft David', 'Alex'];
        for (const voiceName of preferredVoices) {
            const voice = voices.find(v => v.name.includes(voiceName));
            if (voice) {
                speechManager.settings.voice = voice;
                break;
            }
        }
    };
}

// Export for use in other modules
window.speechManager = speechManager;
