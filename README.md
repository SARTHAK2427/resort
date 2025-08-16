# 🏖️ Resort - AI-Powered Waste Management Platform

A comprehensive waste management platform that combines cutting-edge AI technology with sustainable practices to revolutionize waste segregation and environmental conservation.

## 🚀 Features

### Core Features
- **AI-Powered Waste Classification**: Advanced computer vision model for automatic waste classification
- **Gamification System**: Points, levels, badges, and leaderboards to motivate users
- **Professional Services**: On-site waste management solutions for businesses
- **Rewards Center**: Redeem points for eco-friendly products, discounts, and donations
- **User Authentication**: Secure login/logout system with persistent data
- **Real-time Analytics**: Track progress, streaks, and environmental impact

### AI Model Integration
- **TensorFlow Backend**: Flask API with MobileNetV2-based classification model
- **5 Waste Categories**: Biodegradable, Non-Biodegradable, E-Waste, Pharmaceutical, Hazardous
- **Object Detection**: Automatic object counting and analysis
- **Confidence Scoring**: AI confidence-based point calculation
- **Fallback System**: Graceful degradation when backend is unavailable

### Technical Features
- **Modern UI/UX**: Clean, professional design with nature-inspired color palette
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Live point tracking and leaderboard updates
- **Data Persistence**: Local storage for user progress and authentication
- **Cross-platform**: Web-based platform accessible from any device
- **Parallax Scrolling**: Smooth scrollable sections with parallax effects
- **Mobile Menu**: Neat hamburger menu for mobile navigation

## 🛠️ Technology Stack

### Frontend
- **React 19**: Latest React with modern hooks and features
- **Vite**: Fast build tool and development server
- **React Router**: Client-side navigation
- **Context API**: Global state management
- **Custom CSS**: Utility-first styling with responsive design and parallax effects

### Backend
- **Flask**: Python web framework for API
- **TensorFlow**: Machine learning framework
- **OpenCV**: Computer vision and image processing
- **MobileNetV2**: Pre-trained CNN for feature extraction
- **CORS**: Cross-origin resource sharing

### AI Model
- **Architecture**: MobileNetV2 with custom classification head
- **Input**: 224x224x3 RGB images
- **Output**: 5-class waste classification
- **Training**: Data augmentation, transfer learning, early stopping

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- pip (Python package manager)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Resort
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

4. **Add your AI model**
   - Place your `garbage_tf_model.h5` file in `backend/models/`
   - The model should be trained on the 5 waste categories

5. **Start the platform**
   
   **Windows:**
   ```bash
   start.bat
   ```
   
   **Unix/Linux/Mac:**
   ```bash
   chmod +x start.sh
   ./start.sh
   ```
   
   **Manual start:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   python app.py
   
   # Terminal 2 - Frontend
   npm run dev
   ```

6. **Access the platform**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🎯 How It Works

### AI Waste Classification
1. **Image Capture**: Users upload images or use camera
2. **AI Processing**: Flask backend processes image with TensorFlow model
3. **Classification**: Model predicts waste type with confidence score
4. **User Confirmation**: Users verify AI classification
5. **Points Award**: Points calculated based on waste type and confidence
6. **Learning**: System provides educational feedback

### Points System
- **Organic Waste**: 10 points
- **Plastic/Non-Biodegradable**: 15 points
- **E-Waste**: 25 points
- **Hazardous Waste**: 30 points
- **Confidence Multiplier**: Points × AI confidence (0-1)

### Gamification Features
- **Level System**: Users level up based on total points
- **Daily Streaks**: Consecutive days of waste segregation
- **Badges**: Achievement badges for milestones
- **Leaderboard**: Community ranking and competition
- **Rewards**: Redeem points for real-world benefits

## 📁 Project Structure

```
Resort/
├── src/
│   ├── components/          # React components
│   │   ├── AIModel.jsx     # AI waste scanner
│   │   ├── Dashboard.jsx   # Home page with parallax
│   │   ├── Leaderboard.jsx # Community rankings
│   │   ├── Navbar.jsx      # Navigation with mobile menu
│   │   ├── Profile.jsx     # User profile
│   │   ├── Rewards.jsx     # Rewards center
│   │   ├── Services.jsx    # Professional services
│   │   └── CaseStudies.jsx # Success stories
│   ├── context/
│   │   └── UserContext.jsx # Global state management
│   ├── App.jsx             # Main app component
│   └── index.css           # Global styles with parallax
├── backend/
│   ├── app.py              # Flask API server
│   ├── models/             # AI model directory
│   │   └── garbage_tf_model.h5
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend documentation
├── package.json            # Node.js dependencies
├── start.bat              # Windows startup script
├── start.sh               # Unix startup script
└── README.md              # This file
```

## 🔧 API Endpoints

### POST /api/classify
Classify waste image and return results
```json
{
  "success": true,
  "classification": {
    "predicted_class": "Plastic Bottle",
    "waste_type": "plastic",
    "confidence": 0.95,
    "points": 14,
    "object_count": 1
  }
}
```

### GET /api/health
Check backend status and model availability

### GET /api/info
Get model information and capabilities

## 🎨 Design Features

### Color Palette
- **Primary**: Green (#4CAF50) - Nature and sustainability
- **Secondary**: Blue (#2196F3) - Trust and technology
- **Accent**: Yellow (#FFEB3B) - Rewards and achievements
- **Background**: Light beige (#F5F5DC) - Clean and approachable

### UI Components
- **Professional Layout**: Clean, corporate-style design
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: Focus states and keyboard navigation
- **Loading States**: Visual feedback for AI processing
- **Parallax Scrolling**: Smooth scrollable sections with depth
- **Mobile Menu**: Hamburger menu with smooth animations

### Navigation
- **Fixed Header**: Sticky navigation with scroll effects
- **Mobile Menu**: Full-screen overlay menu for mobile devices
- **Smooth Scrolling**: Parallax effects and smooth transitions
- **Active States**: Visual feedback for current page

## 🚀 Future Enhancements

### Planned Features
- **Real-time Notifications**: Push notifications for achievements
- **Social Features**: Share achievements and compete with friends
- **Advanced Analytics**: Detailed waste tracking and insights
- **Mobile App**: Native iOS and Android applications
- **IoT Integration**: Smart bins and sensors
- **Blockchain Rewards**: Decentralized reward system

### AI Improvements
- **Multi-language Support**: Classification in multiple languages
- **Video Processing**: Real-time video classification
- **Advanced Object Detection**: YOLO-based waste detection
- **Transfer Learning**: Continuous model improvement
- **Edge Computing**: On-device classification

## 🌍 Environmental Impact

### Waste Management Benefits
- **Reduced Landfill**: Proper segregation reduces landfill waste
- **Increased Recycling**: Higher recycling rates through education
- **Resource Conservation**: Better resource recovery and reuse
- **Community Awareness**: Educational impact on waste habits
- **Data Insights**: Analytics for waste management planning

### Carbon Footprint Reduction
- **Plastic Recycling**: Reduces plastic production emissions
- **Organic Composting**: Reduces methane emissions from landfills
- **E-Waste Recovery**: Prevents toxic waste and recovers valuable materials
- **Hazardous Waste**: Proper disposal prevents environmental contamination

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow React and Python best practices
2. **Testing**: Add tests for new features
3. **Documentation**: Update docs for API changes
4. **Performance**: Optimize for speed and efficiency
5. **Accessibility**: Ensure inclusive design

### AI Model Contributions
1. **Data Quality**: Provide high-quality training data
2. **Model Improvements**: Suggest architecture enhancements
3. **Performance**: Optimize inference speed and accuracy
4. **New Classes**: Add support for additional waste types

## 📄 License

This project is part of the Resort platform. All rights reserved.

## 🙏 Acknowledgments

- **TensorFlow Team**: For the powerful ML framework
- **OpenCV Community**: For computer vision capabilities
- **React Team**: For the amazing frontend framework
- **Environmental Organizations**: For waste management insights
- **Open Source Community**: For inspiration and tools

## 📞 Support

For technical support or questions:
- **Documentation**: Check the backend README for API details
- **Issues**: Report bugs through the project repository
- **Features**: Suggest new features and improvements
- **AI Model**: Contact for model training and optimization

---

**Resort** - Revolutionizing waste management through AI and sustainability! 🏖️♻️
