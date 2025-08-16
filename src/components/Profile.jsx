import { useUser } from '../context/UserContext';
import { useEffect } from 'react';

function Profile() {
  const { user, wasteHistory } = useUser();

  const wasteTypeBreakdown = [
    { type: 'Organic', count: 15, percentage: 33, color: '#4CAF50' },
    { type: 'Plastic', count: 12, percentage: 27, color: '#2196F3' },
    { type: 'E-Waste', count: 8, percentage: 18, color: '#FF9800' },
    { type: 'Hazardous', count: 5, percentage: 11, color: '#F44336' },
    { type: 'Other', count: 5, percentage: 11, color: '#9C27B0' }
  ];

  const recentAchievements = [
    { name: 'First Scan', date: '2024-01-10', icon: '🎯' },
    { name: 'Week Warrior', date: '2024-01-15', icon: '🔥' },
    { name: 'Plastic Master', date: '2024-01-12', icon: '🥤' }
  ];

  const upcomingGoals = [
    { name: 'Eco Champion', progress: 75, target: 1000, current: 750, icon: '🏆' },
    { name: 'Perfect Day', progress: 60, target: 100, current: 60, icon: '⭐' },
    { name: 'Recycling Pro', progress: 30, target: 100, current: 30, icon: '🍃' }
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
    <div className="space-y-6">
      {/* Header */}
      <div className="card slide-in-section">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">Level {user.level} • {user.streak} day streak</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stats-card slide-in-left">
          <div className="stats-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="stats-number">{user.points}</div>
          <div className="stats-label">Total Points</div>
        </div>
        
        <div className="stats-card slide-in-section">
          <div className="stats-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="stats-number">{user.totalWasteSegregated}</div>
          <div className="stats-label">Items Segregated</div>
        </div>
        
        <div className="stats-card slide-in-section">
          <div className="stats-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5V7C21 8.66 19.66 10 18 10H16V13H18C18.55 13 19 13.45 19 14V16C19 17.66 17.66 19 16 19H8C6.34 19 5 17.66 5 16V14C5 13.45 5.45 13 6 13H8V10H6C4.34 10 3 8.66 3 7V5C3 4.45 3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V8H6C5.45 8 5 7.55 5 7V6H7ZM19 6V7C19 7.55 18.55 8 18 8H17V6H19ZM8 10V13H16V10H8ZM6 15V16C6 16.55 6.45 17 7 17H17C17.55 17 18 16.55 18 16V15H6Z"/>
            </svg>
          </div>
          <div className="stats-number">{user.level}</div>
          <div className="stats-label">Current Level</div>
        </div>
        
        <div className="stats-card slide-in-right">
          <div className="stats-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 13 4 13 6C13 8 12 10 12 10C12 10 11 8 11 6C11 4 12 2 12 2ZM12 12C12 12 13 14 13 16C13 18 12 20 12 20C12 20 11 18 11 16C11 14 12 12 12 12Z"/>
            </svg>
          </div>
          <div className="stats-number">{user.streak}</div>
          <div className="stats-label">Day Streak</div>
        </div>
      </div>

      {/* Waste Type Breakdown */}
      <div className="card slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Waste Type Breakdown</h2>
        <div className="space-y-4">
          {wasteTypeBreakdown.map((waste, index) => (
            <div key={index} className={`flex items-center justify-between ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: waste.color }}
                ></div>
                <span className="font-medium text-gray-800">{waste.type}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${waste.percentage}%`, 
                      backgroundColor: waste.color 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {waste.count} ({waste.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {wasteHistory.slice(0, 5).map((activity, index) => (
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

      {/* Achievements */}
      <div className="card slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className={`text-center p-4 border border-green-200 rounded-lg bg-green-50 ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{achievement.name}</h3>
              <p className="text-sm text-gray-600">{achievement.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Goals */}
      <div className="card slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Goals</h2>
        <div className="space-y-4">
          {upcomingGoals.map((goal, index) => (
            <div key={index} className={`p-4 border border-gray-200 rounded-lg ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{goal.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{goal.name}</h3>
                    <p className="text-sm text-gray-600">{goal.current} / {goal.target}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="card slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Badges</h2>
        <div className="flex flex-wrap gap-3">
          {user.badges.map((badge, index) => (
            <div key={index} className={`px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full text-sm font-medium ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Environmental Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center slide-in-left">
            <div className="text-3xl font-bold text-green-600">2.3 kg</div>
            <div className="text-sm text-gray-600">CO2 Saved</div>
          </div>
          <div className="text-center slide-in-section">
            <div className="text-3xl font-bold text-blue-600">45</div>
            <div className="text-sm text-gray-600">Items Recycled</div>
          </div>
          <div className="text-center slide-in-right">
            <div className="text-3xl font-bold text-orange-600">12.5L</div>
            <div className="text-sm text-gray-600">Water Saved</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
