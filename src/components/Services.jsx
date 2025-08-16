import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Services() {
  const plans = [
    {
      type: 'Free Plan',
      title: 'Individual & Household',
      price: '$0',
      period: '/month',
      description: 'Perfect for individuals and small households',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
      features: [
        'AI Waste Scanner (5 scans/day)',
        'Basic waste classification',
        'Points tracking & rewards',
        'Educational resources',
        'Community leaderboard access',
        'Email support'
      ],
      limitations: [
        'Limited daily scans',
        'Basic reporting',
        'No premium support',
        'No custom branding'
      ],
      buttonText: 'Get Started Free',
      popular: false,
      color: 'from-green-400 to-green-600'
    },
    {
      type: 'Premium Plan',
      title: 'Business & Corporate',
      price: '$29',
      period: '/month',
      description: 'Advanced features for businesses and organizations',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
      features: [
        'Unlimited AI Waste Scanner',
        'Advanced analytics & reporting',
        'Custom waste categories',
        'Priority support',
        'API access',
        'White-label solutions',
        'Compliance reporting',
        'Team management'
      ],
      limitations: [
        'Requires commitment',
        'Setup time needed'
      ],
      buttonText: 'Start Premium Trial',
      popular: true,
      color: 'from-blue-400 to-purple-600'
    }
  ];

  const serviceCategories = [
    {
      title: 'Household Services',
      subtitle: 'For Individuals & Families',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
      description: 'Convenient waste management solutions for everyday households',
      services: [
        {
          name: 'Curbside Pickup',
          description: 'Scheduled waste collection from your doorstep',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
          features: ['Weekly/bi-weekly pickup', 'Multiple waste types', 'Flexible scheduling', 'Mobile app tracking']
        },
        {
          name: 'Waste Bins & Containers',
          description: 'Professional waste storage solutions',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
          features: ['Color-coded bins', 'Weather-resistant', 'Easy cleaning', 'Locking mechanisms']
        },
        {
          name: 'Educational Programs',
          description: 'Learn proper waste segregation techniques',
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop',
          features: ['Online tutorials', 'Interactive workshops', 'Family activities', 'Progress tracking']
        }
      ]
    },
    {
      title: 'Construction Services',
      subtitle: 'For Construction Companies',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
      description: 'Comprehensive waste management for construction sites and projects',
      services: [
        {
          name: 'On-Site Waste Management',
          description: 'Professional waste handling at construction sites',
          image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=200&fit=crop',
          features: ['24/7 site monitoring', 'Hazardous waste handling', 'Compliance documentation', 'Real-time reporting']
        },
        {
          name: 'Construction Waste Bins',
          description: 'Heavy-duty containers for construction materials',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
          features: ['Large capacity bins', 'Crane loading capability', 'Weather protection', 'Security features']
        },
        {
          name: 'Material Recovery',
          description: 'Recycling and reusing construction materials',
          image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop',
          features: ['Metal recycling', 'Concrete crushing', 'Wood processing', 'Revenue generation']
        }
      ]
    },
    {
      title: 'Corporate Solutions',
      subtitle: 'For Businesses & Organizations',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop',
      description: 'Professional waste management with branding and compliance',
      services: [
        {
          name: 'Branded Waste Solutions',
          description: 'Custom-branded waste containers and systems',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
          features: ['Company logo integration', 'Custom color schemes', 'Professional appearance', 'Brand consistency']
        },
        {
          name: 'Corporate Compliance',
          description: 'Ensure regulatory compliance and reporting',
          image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop',
          features: ['Regulatory reporting', 'Audit preparation', 'Compliance monitoring', 'Documentation management']
        },
        {
          name: 'Sustainability Consulting',
          description: 'Expert guidance on waste reduction strategies',
          image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
          features: ['Waste audit services', 'Reduction strategies', 'Sustainability goals', 'Performance tracking']
        }
      ]
    }
  ];

  const wasteTypes = [
    {
      type: 'Organic',
      description: 'Biodegradable waste like food scraps, garden waste',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop',
      color: '#4CAF50'
    },
    {
      type: 'Plastic',
      description: 'Recyclable plastics, bottles, containers',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop',
      color: '#2196F3'
    },
    {
      type: 'Paper',
      description: 'Cardboard, newspapers, office paper',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      color: '#FF9800'
    },
    {
      type: 'E-Waste',
      description: 'Electronic devices, batteries, cables',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
      color: '#9C27B0'
    },
    {
      type: 'Hazardous',
      description: 'Chemicals, medical waste, toxic materials',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop',
      color: '#F44336'
    },
    {
      type: 'Metal',
      description: 'Aluminum, steel, copper scrap',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&h=200&fit=crop',
      color: '#607D8B'
    }
  ];

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

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1 className="slide-in-section">Professional Waste Management Services</h1>
          <p className="slide-in-section">
            Comprehensive waste segregation and management solutions for individuals, households, construction companies, and businesses. 
            Choose the plan that fits your needs.
          </p>
          <div className="flex justify-center space-x-4 slide-in-section">
            <Link to="/ai-model" className="btn btn-primary">Get Started</Link>
            <Link to="/case-studies" className="btn btn-outline">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title slide-in-section">Choose Your Plan</h2>
          <p className="section-subtitle slide-in-section">
            Select the perfect plan for your waste management needs
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'featured' : ''} ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="relative mb-6">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${plan.color} opacity-20 rounded-lg`}></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                <div className="price">
                  {plan.price}<span className="price-period">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {plan.limitations && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <button className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`section ${categoryIndex % 2 === 0 ? '' : 'bg-gray-50'}`}>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={categoryIndex % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{category.title}</h2>
                <h3 className="text-xl text-gray-600 mb-4">{category.subtitle}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                
                <div className="space-y-4">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{service.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={categoryIndex % 2 === 0 ? 'slide-in-right' : 'slide-in-left'}>
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Waste Types Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title slide-in-section">Waste Types We Handle</h2>
          <p className="section-subtitle slide-in-section">
            Comprehensive management of all waste categories with specialized handling
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wasteTypes.map((waste, index) => (
              <div key={index} className={`card overflow-hidden ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
                <div className="relative">
                  <img
                    src={waste.image}
                    alt={waste.type}
                    className="w-full h-48 object-cover"
                  />
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{ backgroundColor: waste.color }}
                  ></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{waste.type}</h3>
                  <p className="text-gray-600 text-sm">{waste.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title slide-in-section">Ready to Transform Your Waste Management?</h2>
          <p className="cta-description slide-in-section">
            Join leading organizations that trust our professional waste management services. 
            Start your journey towards sustainable waste practices today.
          </p>
          <div className="flex justify-center space-x-4 slide-in-section">
            <Link to="/ai-model" className="btn btn-outline">Try AI Scanner</Link>
            <Link to="/case-studies" className="btn btn-primary">View Case Studies</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
