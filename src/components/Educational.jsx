import { useState } from 'react';

function Educational() {
  const [activeTab, setActiveTab] = useState('guides');
  const [completedModules, setCompletedModules] = useState([]);

  const tabs = [
    { id: 'guides', name: 'Waste Guides', icon: '📚' },
    { id: 'tips', name: 'Daily Tips', icon: '💡' },
    { id: 'modules', name: 'Learning Modules', icon: '🎥' }
  ];

  const wasteGuides = [
    {
      id: 1,
      title: 'Plastic Waste Guide',
      description: 'Learn how to properly identify and recycle plastic items',
      icon: '🥤',
      color: 'border-blue-200 bg-blue-50',
      content: [
        'Look for recycling symbols (1-7) on plastic items',
        'Clean containers before recycling',
        'Remove caps and labels when possible',
        'Check local recycling guidelines',
        'Avoid recycling plastic bags in curbside bins'
      ]
    },
    {
      id: 2,
      title: 'Organic Waste Guide',
      description: 'Understanding composting and organic waste management',
      icon: '🍃',
      color: 'border-green-200 bg-green-50',
      content: [
        'Fruit and vegetable scraps can be composted',
        'Coffee grounds and tea bags are great for compost',
        'Avoid meat and dairy in home composting',
        'Use yard waste like leaves and grass clippings',
        'Composting reduces methane emissions from landfills'
      ]
    },
    {
      id: 3,
      title: 'E-Waste Guide',
      description: 'Proper disposal of electronic waste and batteries',
      icon: '📱',
      color: 'border-yellow-200 bg-yellow-50',
      content: [
        'Never throw electronics in regular trash',
        'Find local e-waste recycling centers',
        'Remove batteries before disposal',
        'Donate working electronics when possible',
        'E-waste contains valuable materials that can be recovered'
      ]
    },
    {
      id: 4,
      title: 'Hazardous Waste Guide',
      description: 'Safe handling and disposal of hazardous materials',
      icon: '⚠️',
      color: 'border-red-200 bg-red-50',
      content: [
        'Chemicals, paints, and medicines are hazardous waste',
        'Never pour chemicals down drains',
        'Use local hazardous waste collection programs',
        'Keep hazardous materials in original containers',
        'Follow safety guidelines for handling'
      ]
    }
  ];

  const dailyTips = [
    {
      id: 1,
      tip: 'Start your day by sorting waste into proper bins',
      category: 'Habit',
      icon: '🌅'
    },
    {
      id: 2,
      tip: 'Use reusable water bottles instead of disposable ones',
      category: 'Plastic Reduction',
      icon: '💧'
    },
    {
      id: 3,
      tip: 'Compost your coffee grounds and tea bags',
      category: 'Organic',
      icon: '☕'
    },
    {
      id: 4,
      tip: 'Bring your own shopping bags to reduce plastic waste',
      category: 'Shopping',
      icon: '🛍️'
    },
    {
      id: 5,
      tip: 'Repair electronics instead of replacing them',
      category: 'E-Waste',
      icon: '🔧'
    },
    {
      id: 6,
      tip: 'Use beeswax wraps instead of plastic wrap',
      category: 'Kitchen',
      icon: '🍯'
    },
    {
      id: 7,
      tip: 'Donate old clothes instead of throwing them away',
      category: 'Textiles',
      icon: '👕'
    },
    {
      id: 8,
      tip: 'Choose products with minimal packaging',
      category: 'Shopping',
      icon: '📦'
    }
  ];

  const learningModules = [
    {
      id: 1,
      title: 'Waste Segregation Basics',
      description: 'Learn the fundamentals of proper waste classification',
      duration: '10 min',
      difficulty: 'Beginner',
      icon: '🎯',
      completed: completedModules.includes(1)
    },
    {
      id: 2,
      title: 'Plastic Recycling Deep Dive',
      description: 'Advanced guide to plastic waste management',
      duration: '15 min',
      difficulty: 'Intermediate',
      icon: '🥤',
      completed: completedModules.includes(2)
    },
    {
      id: 3,
      title: 'Composting at Home',
      description: 'Step-by-step guide to home composting',
      duration: '20 min',
      difficulty: 'Beginner',
      icon: '🍃',
      completed: completedModules.includes(3)
    },
    {
      id: 4,
      title: 'E-Waste Management',
      description: 'Understanding electronic waste and proper disposal',
      duration: '12 min',
      difficulty: 'Intermediate',
      icon: '📱',
      completed: completedModules.includes(4)
    }
  ];

  const markModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'guides':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wasteGuides.map((guide) => (
              <div key={guide.id} className={`card ${guide.color}`}>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{guide.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {guide.content.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-600 mt-0.5 flex-shrink-0">✅</span>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'tips':
        return (
          <div className="space-y-4">
            <div className="card bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">💡</span>
                <h3 className="text-lg font-semibold text-gray-800">Today's Tip</h3>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{dailyTips[0].icon}</span>
                <div>
                  <p className="font-medium text-gray-800">{dailyTips[0].tip}</p>
                  <span className="text-sm text-gray-600">{dailyTips[0].category}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dailyTips.slice(1).map((tip) => (
                <div key={tip.id} className="card">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <p className="font-medium text-gray-800 mb-1">{tip.tip}</p>
                      <span className="text-sm text-gray-600">{tip.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'modules':
        return (
          <div className="space-y-6">
            <div className="card bg-blue-50 border border-blue-200">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">🎥</span>
                <h3 className="font-semibold text-blue-800">Learning Progress</h3>
              </div>
              <p className="text-sm text-blue-700">
                {completedModules.length} of {learningModules.length} modules completed
              </p>
              <div className="progress-bar mt-3">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(completedModules.length / learningModules.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningModules.map((module) => (
                <div key={module.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{module.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    {module.completed && (
                      <span className="text-green-600">✅</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{module.duration}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{module.difficulty}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => markModuleComplete(module.id)}
                    className={`w-full btn ${
                      module.completed ? 'btn-secondary' : 'btn-primary'
                    }`}
                  >
                    {module.completed ? 'Completed' : 'Start Module'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Learn & Educate</h1>
            <p className="text-gray-600">Expand your knowledge about waste management and sustainability</p>
          </div>
          <div className="text-center">
            <div className="text-2xl">📚</div>
            <p className="text-sm text-gray-600">Education</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>

        {renderContent()}
      </div>

      {/* Environmental Impact */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Environmental Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">🍃</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">47</div>
            <div className="text-sm text-gray-600">Items Segregated</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">♻️</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">23.5kg</div>
            <div className="text-sm text-gray-600">Waste Diverted</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">⚠️</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">12.3kg</div>
            <div className="text-sm text-gray-600">CO2 Saved</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Ready to Make a Difference?</h3>
          <p className="text-blue-700 mb-4">
            Start scanning waste and earn points while learning about proper waste management.
          </p>
          <button className="btn btn-primary">
            Start Scanning
            <span className="ml-2">➡️</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Educational;
