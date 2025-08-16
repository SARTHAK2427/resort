import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

function Leaderboard() {
  const { leaderboard, user } = useUser();
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all-time');

  const filters = [
    { id: 'all', label: 'All Users', icon: '👥' },
    { id: 'top-10', label: 'Top 10', icon: '🏆' },
    { id: 'newcomers', label: 'Newcomers', icon: '🆕' },
    { id: 'streak', label: 'Streak Masters', icon: '🔥' }
  ];

  const timeFilters = [
    { id: 'all-time', label: 'All Time', icon: '📅' },
    { id: 'this-month', label: 'This Month', icon: '📆' },
    { id: 'this-week', label: 'This Week', icon: '📊' },
    { id: 'today', label: 'Today', icon: '☀️' }
  ];

  const achievements = [
    { name: 'First Scan', description: 'Complete your first waste scan', icon: '🎯', unlocked: true },
    { name: 'Week Warrior', description: 'Scan waste for 7 consecutive days', icon: '🔥', unlocked: true },
    { name: 'Plastic Master', description: 'Correctly classify 50 plastic items', icon: '🥤', unlocked: true },
    { name: 'Eco Champion', description: 'Reach 1000 total points', icon: '🏆', unlocked: false },
    { name: 'Perfect Day', description: 'Get 100% accuracy in a day', icon: '⭐', unlocked: false },
    { name: 'Recycling Pro', description: 'Classify 100 organic items', icon: '🍃', unlocked: false },
    { name: 'Hazardous Hero', description: 'Correctly handle 10 hazardous items', icon: '⚠️', unlocked: false },
    { name: 'Community Leader', description: 'Help 10 other users', icon: '🤝', unlocked: false }
  ];

  const userStats = leaderboard.find(entry => entry.id === user.id) || { 
    points: user.points, 
    wasteSegregated: user.totalWasteSegregated, 
    streak: user.streak, 
    achievements: user.badges 
  };

  const getCurrentUserRank = () => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.points - a.points);
    const userIndex = sortedLeaderboard.findIndex(entry => entry.id === user.id);
    return userIndex !== -1 ? userIndex + 1 : 'N/A';
  };

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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Leaderboard</h1>
        <p className="text-gray-600">
          Compete with the community and track your progress in waste segregation. 
          Climb the ranks by scanning more waste and maintaining streaks!
        </p>
      </div>

      {/* Leaderboard Stats - Compact */}
      <div className="leaderboard-stats slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="leaderboard-stat slide-in-left">
            <div className="text-2xl font-bold text-green-600">{userStats.points}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
          <div className="leaderboard-stat slide-in-section">
            <div className="text-2xl font-bold text-blue-600">{userStats.wasteSegregated}</div>
            <div className="text-sm text-gray-600">Items Segregated</div>
          </div>
          <div className="leaderboard-stat slide-in-section">
            <div className="text-2xl font-bold text-orange-600">{userStats.streak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="leaderboard-stat slide-in-right">
            <div className="text-2xl font-bold text-purple-600">#{getCurrentUserRank()}</div>
            <div className="text-sm text-gray-600">Current Rank</div>
          </div>
        </div>
      </div>

      {/* Filters - Compact */}
      <div className="card slide-in-section">
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Filter by Category:</h3>
            <div className="filter-buttons">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                >
                  <span className="mr-2">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Time Period:</h3>
            <div className="filter-buttons">
              {timeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setTimeFilter(filter.id)}
                  className={`filter-btn ${timeFilter === filter.id ? 'active' : ''}`}
                >
                  <span className="mr-2">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers - Compact */}
      <div className="card slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Top Performers</h2>
        <div className="space-y-2">
          {leaderboard.slice(0, 8).map((user, index) => (
            <div key={index} className={`leaderboard-item ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
              <div className="leaderboard-rank">#{index + 1}</div>
              <div className="leaderboard-user">
                <div className="leaderboard-avatar">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.achievements.length} achievements</div>
                </div>
              </div>
              <div className="leaderboard-stats">
                <div className="text-right">
                  <div className="font-bold text-green-600">{user.points}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-blue-600">{user.wasteSegregated}</div>
                  <div className="text-xs text-gray-500">items</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-orange-600">{user.streak}</div>
                  <div className="text-xs text-gray-500">streak</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements - Compact */}
      <div className="card slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Available Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((achievement, index) => (
            <div key={index} className={`text-center p-3 border rounded-lg ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'} ${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{achievement.name}</h3>
              <p className="text-xs text-gray-600">{achievement.description}</p>
              {achievement.unlocked && (
                <div className="mt-2">
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Unlocked</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips for Improvement - Compact */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Tips to Improve Your Ranking</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Daily Habits:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Scan waste items daily to maintain streaks</li>
              <li>• Focus on accuracy over quantity</li>
              <li>• Learn from incorrect classifications</li>
              <li>• Share your progress with friends</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Point Strategies:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• E-waste items give more points (25 pts)</li>
              <li>• Hazardous waste is highest (30 pts)</li>
              <li>• Maintain daily streaks for bonuses</li>
              <li>• Complete weekly challenges</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Community Stats - Compact */}
      <div className="card slide-in-section">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Community Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center slide-in-left">
            <div className="text-3xl font-bold text-green-600">15,420</div>
            <div className="text-sm text-gray-600">Total Items Segregated</div>
          </div>
          <div className="text-center slide-in-section">
            <div className="text-3xl font-bold text-blue-600">2,847</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="text-center slide-in-right">
            <div className="text-3xl font-bold text-orange-600">89%</div>
            <div className="text-sm text-gray-600">Average Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
