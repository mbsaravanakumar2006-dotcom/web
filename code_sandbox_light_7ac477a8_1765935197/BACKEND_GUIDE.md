# Backend Integration Guide

## Overview

This guide explains how to implement the backend API endpoint for the Currency Note Scanner application. The frontend is ready and configured to communicate with a REST API endpoint.

## API Endpoint Specification

### Base Endpoint
```
POST /api/identify
```

### Request Format

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

The `image` field contains a base64-encoded image with the data URI prefix.

### Response Format

#### Success Response (High Confidence)
```json
{
  "denomination": "100",
  "currency_code": "INR",
  "confidence": 0.95,
  "orientation_note": "correct",
  "message": "This is one hundred rupees",
  "isBlurry": false
}
```

#### Low Confidence Response
```json
{
  "denomination": "100",
  "currency_code": "INR",
  "confidence": 0.45,
  "orientation_note": "correct",
  "message": "I'm not sure, please try again.",
  "isBlurry": false
}
```

#### Blurry Image Response
```json
{
  "denomination": null,
  "currency_code": null,
  "confidence": 0,
  "orientation_note": "unclear",
  "message": "Image unclear. Please retake.",
  "isBlurry": true
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `denomination` | string | The value of the currency note (e.g., "10", "100", "500") |
| `currency_code` | string | ISO 4217 currency code (e.g., "INR", "USD", "EUR") |
| `confidence` | number | Confidence score from 0.0 to 1.0 |
| `orientation_note` | string | Orientation status: "correct", "rotated", "upside_down", "unclear" |
| `message` | string | Human-readable message to be spoken by TTS |
| `isBlurry` | boolean | Indicates if the image quality is too poor |

### Confidence Threshold

- **High Confidence**: >= 0.7 - Show success result
- **Low Confidence**: < 0.7 - Show "not sure" message
- **Blurry**: confidence = 0, isBlurry = true - Show "retake" message

## Implementation Examples

### Node.js (Express + TensorFlow.js)

```javascript
const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const sharp = require('sharp');
const app = express();

app.use(express.json({ limit: '10mb' }));

// Load your trained model
let model;
async function loadModel() {
  model = await tf.loadLayersModel('file://./models/currency-model/model.json');
}

app.post('/api/identify', async (req, res) => {
  try {
    const { image } = req.body;
    
    // Remove data URI prefix
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Preprocess image
    const processedImage = await sharp(buffer)
      .resize(224, 224)
      .toBuffer();
    
    // Convert to tensor
    const tensor = tf.node.decodeImage(processedImage);
    const normalized = tensor.div(255.0).expandDims(0);
    
    // Run inference
    const predictions = await model.predict(normalized);
    const scores = await predictions.data();
    
    // Get best prediction
    const maxScore = Math.max(...scores);
    const predictedIndex = scores.indexOf(maxScore);
    
    // Map to denomination
    const denominations = ['10', '20', '50', '100', '200', '500', '2000'];
    const denomination = denominations[predictedIndex];
    
    // Check blur (simplified)
    const isBlurry = await checkBlur(buffer);
    
    if (isBlurry) {
      return res.json({
        denomination: null,
        currency_code: null,
        confidence: 0,
        orientation_note: 'unclear',
        message: 'Image unclear. Please retake.',
        isBlurry: true
      });
    }
    
    if (maxScore < 0.7) {
      return res.json({
        denomination,
        currency_code: 'INR',
        confidence: maxScore,
        orientation_note: 'correct',
        message: "I'm not sure, please try again.",
        isBlurry: false
      });
    }
    
    const denominationNames = {
      '10': 'ten rupees',
      '20': 'twenty rupees',
      '50': 'fifty rupees',
      '100': 'one hundred rupees',
      '200': 'two hundred rupees',
      '500': 'five hundred rupees',
      '2000': 'two thousand rupees'
    };
    
    res.json({
      denomination,
      currency_code: 'INR',
      confidence: maxScore,
      orientation_note: 'correct',
      message: `This is ${denominationNames[denomination]}`,
      isBlurry: false
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function checkBlur(imageBuffer) {
  // Implement blur detection using Laplacian variance
  const stats = await sharp(imageBuffer).stats();
  // Simplified check - implement proper algorithm
  return false;
}

loadModel().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});
```

### Python (Flask + TensorFlow/Keras)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import base64
import cv2
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load model
model = tf.keras.models.load_model('models/currency_model.h5')

DENOMINATIONS = ['10', '20', '50', '100', '200', '500', '2000']
DENOMINATION_NAMES = {
    '10': 'ten rupees',
    '20': 'twenty rupees',
    '50': 'fifty rupees',
    '100': 'one hundred rupees',
    '200': 'two hundred rupees',
    '500': 'five hundred rupees',
    '2000': 'two thousand rupees'
}

def check_blur(image_array):
    """Check if image is blurry using Laplacian variance"""
    gray = cv2.cvtColor(image_array, cv2.COLOR_RGB2GRAY)
    laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    return laplacian_var < 100  # Threshold for blur detection

def preprocess_image(image_data):
    """Preprocess base64 image for model"""
    # Remove data URI prefix
    if ',' in image_data:
        image_data = image_data.split(',')[1]
    
    # Decode base64
    image_bytes = base64.b64decode(image_data)
    
    # Convert to PIL Image
    image = Image.open(io.BytesIO(image_bytes))
    
    # Convert to RGB
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Resize
    image = image.resize((224, 224))
    
    # Convert to array
    image_array = np.array(image)
    
    return image_array

@app.route('/api/identify', methods=['POST'])
def identify_note():
    try:
        data = request.get_json()
        image_data = data.get('image')
        
        if not image_data:
            return jsonify({'error': 'No image provided'}), 400
        
        # Preprocess image
        image_array = preprocess_image(image_data)
        
        # Check for blur
        if check_blur(image_array):
            return jsonify({
                'denomination': None,
                'currency_code': None,
                'confidence': 0,
                'orientation_note': 'unclear',
                'message': 'Image unclear. Please retake.',
                'isBlurry': True
            })
        
        # Normalize
        image_normalized = image_array.astype('float32') / 255.0
        image_batch = np.expand_dims(image_normalized, axis=0)
        
        # Predict
        predictions = model.predict(image_batch)
        confidence = float(np.max(predictions))
        predicted_index = int(np.argmax(predictions))
        denomination = DENOMINATIONS[predicted_index]
        
        # Low confidence
        if confidence < 0.7:
            return jsonify({
                'denomination': denomination,
                'currency_code': 'INR',
                'confidence': confidence,
                'orientation_note': 'correct',
                'message': "I'm not sure, please try again.",
                'isBlurry': False
            })
        
        # Success
        return jsonify({
            'denomination': denomination,
            'currency_code': 'INR',
            'confidence': confidence,
            'orientation_note': 'correct',
            'message': f'This is {DENOMINATION_NAMES[denomination]}',
            'isBlurry': False
        })
        
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
```

## Frontend Configuration

To connect the frontend to your backend, edit `js/api.js`:

```javascript
class CurrencyAPI {
    constructor() {
        // Set your backend URL here
        this.endpoint = 'https://your-backend-url.com/api/identify';
        
        // Disable mock responses
        this.useMockAPI = false;
    }
    // ... rest of the code
}
```

## Testing

### Using cURL
```bash
curl -X POST https://your-backend-url.com/api/identify \
  -H "Content-Type: application/json" \
  -d '{"image": "data:image/jpeg;base64,/9j/4AAQ..."}'
```

### Using Postman
1. Set method to POST
2. Set URL to `https://your-backend-url.com/api/identify`
3. Set header `Content-Type: application/json`
4. Set body (raw JSON):
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQ..."
}
```

## Machine Learning Model

### Training Data
- Collect images of currency notes in various conditions:
  - Different lighting conditions
  - Various angles and orientations
  - Multiple denominations
  - Clear and slightly blurred images

### Model Architecture Suggestions
- **CNN (Convolutional Neural Network)**: ResNet, MobileNet, EfficientNet
- **Input size**: 224x224 or 299x299 pixels
- **Output**: Softmax classification for denominations

### Training Tips
1. Data augmentation: rotation, zoom, brightness variations
2. Use transfer learning from pre-trained models (ImageNet)
3. Balance dataset across all denominations
4. Validate with separate test set
5. Monitor confidence scores distribution

## Deployment Options

### Option 1: Cloud Functions (Serverless)
- AWS Lambda
- Google Cloud Functions
- Azure Functions

### Option 2: Container Deployment
- Docker + Kubernetes
- Google Cloud Run
- AWS ECS

### Option 3: Traditional Server
- VPS (DigitalOcean, Linode, AWS EC2)
- Install dependencies
- Use PM2 or systemd for process management
- Set up Nginx as reverse proxy

## Security Considerations

1. **Rate Limiting**: Prevent abuse by limiting requests per IP
2. **Input Validation**: Validate image format and size
3. **CORS**: Configure allowed origins
4. **HTTPS**: Use SSL/TLS for secure transmission
5. **Authentication**: Consider API keys for production
6. **Image Size Limits**: Limit upload size to prevent DoS

## Performance Optimization

1. **Caching**: Cache model in memory
2. **Batch Processing**: Process multiple images if needed
3. **Image Compression**: Compress before sending to model
4. **CDN**: Use CDN for frontend assets
5. **Load Balancing**: Use multiple backend instances

## Monitoring

Implement logging for:
- Request count
- Average response time
- Confidence score distribution
- Error rates
- Blur detection frequency

## Support

For issues or questions:
1. Check API response format matches specification
2. Verify CORS headers are set correctly
3. Test with mock data first
4. Check browser console for errors
5. Validate base64 image encoding
