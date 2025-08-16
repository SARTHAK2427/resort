import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';

function Dashboard() {
  const { user, wasteHistory } = useUser();
  
  const stats = [
    { label: 'Total Points', value: user.points, icon: 'star' },
    { label: 'Items Segregated', value: user.totalWasteSegregated, icon: 'recycle' },
    { label: 'Current Level', value: user.level, icon: 'trophy' },
    { label: 'Day Streak', value: user.streak, icon: 'flame' }
  ];

  const services = [
    { 
      title: 'AI Waste Scanner', 
      icon: 'brain',
      path: '/ai-model', 
      features: ['Instant classification', 'Educational feedback', 'Points system'] 
    },
    { 
      title: 'Professional Services', 
      icon: 'building',
      path: '/services', 
      features: ['On-site management', 'Branded solutions', 'Compliance support'] 
    },
    { 
      title: 'Rewards Center', 
      icon: 'gift',
      path: '/rewards', 
      features: ['Eco-friendly products', 'Discount vouchers', 'Charity donations'] 
    },
    { 
      title: 'Case Studies', 
      icon: 'chart',
      path: '/case-studies', 
      features: ['Success stories', 'Impact metrics', 'Best practices'] 
    }
  ];

  const wasteTypes = [
    { type: 'organic', label: 'Organic', description: 'Biodegradable waste', color: '#4CAF50' },
    { type: 'plastic', label: 'Plastic', description: 'Recyclable materials', color: '#2196F3' },
    { type: 'e-waste', label: 'E-Waste', description: 'Electronic devices', color: '#FF9800' },
    { type: 'hazardous', label: 'Hazardous', description: 'Dangerous materials', color: '#F44336' }
  ];

  const recentActivity = wasteHistory.slice(0, 3);

  // Intersection Observer for slide-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.slide-in-section, .slide-in-left, .slide-in-right');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      star: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      recycle: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      trophy: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5V7C21 8.66 19.66 10 18 10H16V13H18C18.55 13 19 13.45 19 14V16C19 17.66 17.66 19 16 19H8C6.34 19 5 17.66 5 16V14C5 13.45 5.45 13 6 13H8V10H6C4.34 10 3 8.66 3 7V5C3 4.45 3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V8H6C5.45 8 5 7.55 5 7V6H7ZM19 6V7C19 7.55 18.55 8 18 8H17V6H19ZM8 10V13H16V10H8ZM6 15V16C6 16.55 6.45 17 7 17H17C17.55 17 18 16.55 18 16V15H6Z"/>
        </svg>
      ),
      flame: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 13 4 13 6C13 8 12 10 12 10C12 10 11 8 11 6C11 4 12 2 12 2ZM12 12C12 12 13 14 13 16C13 18 12 20 12 20C12 20 11 18 11 16C11 14 12 12 12 12Z"/>
        </svg>
      ),
      brain: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      building: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"/>
        </svg>
      ),
      gift: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
        </svg>
      ),
      chart: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      )
    };
    return icons[iconName] || icons.star;
  };

  return (
    <div className="parallax-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Resort</h1>
          <p>Advanced AI-powered waste management platform combining technology with sustainability</p>
          <div className="hero-buttons">
            <Link to="/ai-model" className="btn btn-primary">Start Scanning</Link>
            <Link to="/services" className="btn btn-outline">Explore Services</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title slide-in-section">Our Services</h2>
          <p className="section-subtitle slide-in-section">
            Comprehensive waste management solutions powered by cutting-edge AI technology
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className={`service-card ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
                <div className="service-icon">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={service.path} className="btn btn-outline w-full">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Waste Segregation Section */}
      <section className="section bg-waste-organic">
        <div className="container">
          <h2 className="section-title slide-in-section">Why Waste Segregation Matters</h2>
          <p className="section-subtitle slide-in-section">
            Proper waste management is crucial for environmental sustainability and resource conservation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center slide-in-left">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Environmental Protection</h3>
              <p className="text-white text-opacity-90">Reduces landfill waste and prevents environmental pollution</p>
            </div>
            
            <div className="text-center slide-in-section">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Resource Recovery</h3>
              <p className="text-white text-opacity-90">Maximizes recycling and recovers valuable materials</p>
            </div>
            
            <div className="text-center slide-in-right">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cost Efficiency</h3>
              <p className="text-white text-opacity-90">Lowers disposal costs and generates revenue from recycling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Waste Types Section */}
      <section className="section bg-waste-plastic">
        <div className="container">
          <h2 className="section-title slide-in-section">Waste Types We Handle</h2>
          <p className="section-subtitle slide-in-section">
            Comprehensive classification and management of all waste categories
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wasteTypes.map((waste, index) => (
              <div key={index} className={`card text-center ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: waste.color + '20' }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: waste.color }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{waste.label}</h3>
                <p className="text-gray-600">{waste.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Progress Section */}
      <section className="section bg-waste-ewaste">
        <div className="container">
          <h2 className="section-title slide-in-section">Your Progress</h2>
          <p className="section-subtitle slide-in-section">
            Track your waste segregation journey and achievements
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className={`stats-card ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
                <div className="stats-icon">
                  {getIcon(stat.icon)}
                </div>
                <div className="stats-number">{stat.value}</div>
                <div className="stats-label">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="card slide-in-section">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#4CAF50">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{activity.name}</p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${activity.correct ? 'badge-success' : 'badge-danger'}`}>
                      {activity.correct ? 'Correct' : 'Incorrect'}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">+{activity.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title slide-in-section">Ready to Start Your Waste Management Journey?</h2>
          <p className="cta-description slide-in-section">
            Join thousands of users who are already making a difference through proper waste segregation. 
            Start scanning, earn points, and contribute to a sustainable future.
          </p>
          <div className="flex justify-center space-x-4 slide-in-section">
            <Link to="/ai-model" className="btn btn-outline">Start Scanning</Link>
            <Link to="/services" className="btn btn-primary">Explore Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
