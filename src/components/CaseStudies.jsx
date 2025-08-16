import { useEffect } from 'react';

function CaseStudies() {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="card slide-in-section">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Case Studies</h1>
        <p className="text-gray-600">
          Real-world examples of successful waste management implementations and their environmental impact.
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="card slide-in-section">
        <div className="text-center py-12">
          <div className="text-6xl mb-4 slide-in-section">📝</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 slide-in-section">Case Studies Coming Soon</h2>
          <p className="text-gray-600 mb-6 slide-in-section">
            This section will showcase real-world examples of our waste management solutions in action.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg max-w-2xl mx-auto slide-in-section">
            <h3 className="font-semibold text-gray-800 mb-3">What to expect:</h3>
            <ul className="text-gray-600 space-y-2 text-left">
              <li className="slide-in-left">• Success stories from businesses and organizations</li>
              <li className="slide-in-section">• Before and after waste management comparisons</li>
              <li className="slide-in-section">• Environmental impact measurements</li>
              <li className="slide-in-section">• Cost savings and efficiency improvements</li>
              <li className="slide-in-right">• Customer testimonials and feedback</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Template Structure */}
      <div className="card slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Case Study Template Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="slide-in-left">
            <h3 className="font-semibold text-gray-800 mb-3">Business Overview</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Company background and industry</li>
              <li>• Previous waste management challenges</li>
              <li>• Goals and objectives</li>
              <li>• Implementation timeline</li>
            </ul>
          </div>
          <div className="slide-in-right">
            <h3 className="font-semibold text-gray-800 mb-3">Solution Implementation</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Services provided by Resort</li>
              <li>• Technology and processes used</li>
              <li>• Staff training and engagement</li>
              <li>• Integration with existing systems</li>
            </ul>
          </div>
          <div className="slide-in-left">
            <h3 className="font-semibold text-gray-800 mb-3">Results & Impact</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Waste reduction percentages</li>
              <li>• Cost savings achieved</li>
              <li>• Environmental impact metrics</li>
              <li>• Compliance improvements</li>
            </ul>
          </div>
          <div className="slide-in-right">
            <h3 className="font-semibold text-gray-800 mb-3">Customer Testimonial</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Key decision maker quotes</li>
              <li>• Employee feedback</li>
              <li>• Long-term benefits</li>
              <li>• Recommendations for others</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 slide-in-section">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4 slide-in-section">Ready to Share Your Success Story?</h2>
          <p className="text-gray-600 mb-6 slide-in-section">
            If you've implemented successful waste management solutions, we'd love to feature your case study here.
          </p>
          <button className="btn btn-primary slide-in-section">
            Contact Us to Share Your Story
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaseStudies;
