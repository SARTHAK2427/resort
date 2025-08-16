import { useState, useRef } from 'react';
import { useUser } from '../context/UserContext';

function AIModel() {
  const { isAuthenticated, addWaste } = useUser();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedImage, setScannedImage] = useState(null);
  const [classification, setClassification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userSelection, setUserSelection] = useState('');
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const wasteTypes = [
    { type: 'organic', label: 'Organic/Biodegradable', icon: '🍃', color: '#4CAF50' },
    { type: 'plastic', label: 'Plastic/Non-Biodegradable', icon: '🥤', color: '#2196F3' },
    { type: 'e-waste', label: 'E-Waste', icon: '📱', color: '#FF9800' },
    { type: 'hazardous', label: 'Hazardous', icon: '⚠️', color: '#F44336' }
  ];

  const API_BASE_URL = 'http://localhost:5000/api';

  // Check backend health
  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return data.model_loaded;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  };

  // Convert image to base64
  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const base64Image = await imageToBase64(file);
      setScannedImage(base64Image);
      
      // Classify the image
      await classifyImage(base64Image);
    } catch (error) {
      setError('Error processing image: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      setError('Camera access denied: ' + error.message);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Capture photo from camera
  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0);

    // Convert to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    setScannedImage(base64Image);

    // Stop camera
    stopCamera();

    // Classify the image
    setIsLoading(true);
    await classifyImage(base64Image);
    setIsLoading(false);
  };

  // Classify image using Flask backend
  const classifyImage = async (base64Image) => {
    try {
      const response = await fetch(`${API_BASE_URL}/classify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setClassification(data.classification);
        setShowResult(false);
      } else {
        throw new Error(data.error || 'Classification failed');
      }
    } catch (error) {
      setError('Classification error: ' + error.message);
      // Fallback to simulation if backend is not available
      simulateClassification();
    }
  };

  // Fallback simulation
  const simulateClassification = () => {
    const wasteDatabase = [
      { name: 'Plastic Bottle', type: 'plastic', points: 15, icon: '🥤' },
      { name: 'Apple Core', type: 'organic', points: 10, icon: '🍎' },
      { name: 'Old Phone', type: 'e-waste', points: 25, icon: '📱' },
      { name: 'Battery', type: 'hazardous', points: 30, icon: '🔋' },
      { name: 'Paper', type: 'organic', points: 10, icon: '📄' },
      { name: 'Glass Bottle', type: 'plastic', points: 15, icon: '🍾' }
    ];

    const randomWaste = wasteDatabase[Math.floor(Math.random() * wasteDatabase.length)];
    const confidence = 0.7 + Math.random() * 0.3; // 70-100% confidence

    setClassification({
      predicted_class: randomWaste.name,
      waste_type: randomWaste.type,
      confidence: confidence,
      points: Math.floor(randomWaste.points * confidence),
      object_count: Math.floor(Math.random() * 3) + 1
    });
  };

  // Handle user selection
  const handleWasteSelection = (type) => {
    setUserSelection(type);
  };

  // Confirm classification
  const confirmClassification = () => {
    if (!classification || !userSelection) return;

    const isUserCorrect = userSelection === classification.waste_type;
    setIsCorrect(isUserCorrect);

    // Add waste to user's history with points
    addWaste({
      name: classification.predicted_class,
      type: classification.waste_type,
      points: isUserCorrect ? classification.points : 0,
      correct: isUserCorrect
    });

    setShowResult(true);
  };

  // Get waste type info
  const getWasteTypeInfo = (type) => {
    const info = {
      organic: {
        description: 'Biodegradable waste that can be composted',
        tips: 'Can be used for composting or organic fertilizer',
        disposal: 'Compost bin or organic waste collection'
      },
      plastic: {
        description: 'Non-biodegradable plastic materials',
        tips: 'Clean before recycling, check local recycling guidelines',
        disposal: 'Recycling bin or plastic waste collection'
      },
      'e-waste': {
        description: 'Electronic waste containing hazardous materials',
        tips: 'Never dispose in regular trash, contains valuable metals',
        disposal: 'E-waste collection centers or electronics stores'
      },
      hazardous: {
        description: 'Dangerous waste requiring special handling',
        tips: 'Never mix with regular waste, follow safety guidelines',
        disposal: 'Hazardous waste collection facilities'
      }
    };
    return info[type] || { description: 'Unknown waste type', tips: 'Contact local waste management', disposal: 'Check local guidelines' };
  };

  // Reset scan
  const resetScan = () => {
    setScannedImage(null);
    setClassification(null);
    setShowResult(false);
    setUserSelection('');
    setError(null);
    stopCamera();
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🤖 AI Waste Scanner</h1>
          <p className="text-gray-600">
            Advanced AI-powered waste classification using computer vision and machine learning.
          </p>
        </div>
        
        <div className="card bg-yellow-50 border border-yellow-200">
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🔐</div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Login Required</h2>
            <p className="text-gray-600">
              Please log in to access the AI Waste Scanner and start earning points for proper waste segregation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-800 mb-2"> AI Waste Scanner</h1>
        <p className="text-gray-600 mb-4">
          Advanced AI-powered waste classification using computer vision and machine learning. 
          Upload an image or use your camera to classify waste and earn points!
        </p>
        
        {/* Backend Status */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-2">Backend Status</h3>
          <p className="text-sm text-gray-600">
            Model: MobileNetV2-based waste classification
          </p>
          <p className="text-sm text-gray-600">
            Classes: Biodegradable, Non-Biodegradable, E-Waste, Pharmaceutical, Hazardous
          </p>
        </div>
      </div>

      {/* Upload/Camera Section */}
      {!scannedImage && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📸 Capture or Upload Image</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="font-semibold text-gray-800 mb-2">Upload Image</h3>
              <p className="text-gray-600 mb-4">Select an image file from your device</p>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Choose File'}
              </button>
            </div>

            {/* Camera Capture */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">📷</div>
              <h3 className="font-semibold text-gray-800 mb-2">Use Camera</h3>
              <p className="text-gray-600 mb-4">Take a photo with your camera</p>
              
              {!stream ? (
                <button
                  onClick={startCamera}
                  className="btn btn-outline"
                  disabled={isLoading}
                >
                  Start Camera
                </button>
              ) : (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={capturePhoto}
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : 'Capture Photo'}
                    </button>
                    <button
                      onClick={stopCamera}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hidden canvas for camera capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="card bg-red-50 border border-red-200">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="card">
          <div className="text-center py-8">
            <div className="text-4xl mb-4 animate-pulse">🤖</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">AI is Analyzing...</h2>
            <p className="text-gray-600">Processing your image with our waste classification model</p>
          </div>
        </div>
      )}

      {/* Classification Result */}
      {classification && !showResult && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🔍 AI Classification Result</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Display */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Scanned Image</h3>
              <img
                src={scannedImage}
                alt="Scanned waste"
                className="w-full rounded-lg border"
              />
            </div>

            {/* AI Result */}
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-800 mb-2">AI Prediction</h3>
                <div className="space-y-2">
                  <p><strong>Class:</strong> {classification.predicted_class}</p>
                  <p><strong>Type:</strong> {classification.waste_type}</p>
                  <p><strong>Confidence:</strong> {(classification.confidence * 100).toFixed(1)}%</p>
                  <p><strong>Objects Detected:</strong> {classification.object_count}</p>
                  <p><strong>Potential Points:</strong> {classification.points}</p>
                </div>
              </div>

              {/* User Confirmation */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Confirm Classification</h3>
                <p className="text-gray-600 mb-3">Select the correct waste type:</p>
                
                <div className="grid grid-cols-2 gap-2">
                  {wasteTypes.map((waste) => (
                    <button
                      key={waste.type}
                      onClick={() => handleWasteSelection(waste.type)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        userSelection === waste.type
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{waste.icon}</div>
                      <div className="text-sm font-medium">{waste.label}</div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={confirmClassification}
                    disabled={!userSelection}
                    className="btn btn-primary"
                  >
                    Confirm & Earn Points
                  </button>
                  <button
                    onClick={resetScan}
                    className="btn btn-outline"
                  >
                    Scan Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result Feedback */}
      {showResult && (
        <div className="card">
          <div className="text-center py-8">
            <div className={`text-6xl mb-4 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {isCorrect ? '✅' : '❌'}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isCorrect ? 'Correct Classification!' : 'Incorrect Classification'}
            </h2>
            <p className="text-gray-600 mb-4">
              {isCorrect 
                ? `You earned ${classification.points} points for proper waste segregation!`
                : 'The AI classified it as ' + classification.waste_type + '. Better luck next time!'
              }
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Waste Type Information</h3>
              {(() => {
                const info = getWasteTypeInfo(classification.waste_type);
                return (
                  <div className="text-left space-y-2">
                    <p><strong>Description:</strong> {info.description}</p>
                    <p><strong>Tips:</strong> {info.tips}</p>
                    <p><strong>Disposal:</strong> {info.disposal}</p>
                  </div>
                );
              })()}
            </div>

            <button
              onClick={resetScan}
              className="btn btn-primary"
            >
              Scan Another Item
            </button>
          </div>
        </div>
      )}

      {/* Waste Classification Guide */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Waste Classification Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wasteTypes.map((waste) => {
            const info = getWasteTypeInfo(waste.type);
            return (
              <div key={waste.type} className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{waste.icon}</span>
                  <h3 className="font-semibold text-gray-800">{waste.label}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">{info.description}</p>
                <p className="text-gray-600 text-sm"><strong>Disposal:</strong> {info.disposal}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pro Tips */}
      <div className="card bg-blue-50 border border-blue-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">💡 Pro Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">For Better Results:</h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Ensure good lighting when taking photos</li>
              <li>• Keep the waste item clearly visible</li>
              <li>• Avoid shadows and reflections</li>
              <li>• Clean items before scanning for better accuracy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Points System:</h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Organic: 10 points</li>
              <li>• Plastic: 15 points</li>
              <li>• E-Waste: 25 points</li>
              <li>• Hazardous: 30 points</li>
              <li>• Points multiplied by AI confidence</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIModel;
