import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

function Rewards() {
  const { user, redeemReward } = useUser();
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleSections, setVisibleSections] = useState([]);

  const filterOptions = [
    { id: 'all', label: 'All Rewards', icon: '🎁' },
    { id: 'discounts', label: 'Discounts', icon: '💰' },
    { id: 'products', label: 'Eco Products', icon: '🌱' },
    { id: 'donations', label: 'Donations', icon: '❤️' },
    { id: 'experiences', label: 'Experiences', icon: '🎯' }
  ];

  const rewards = [
    {
      id: 1,
      name: 'Eco-Friendly Water Bottle',
      category: 'products',
      points: 200,
      originalPrice: '$25',
      discountPrice: 'Free',
      description: 'Reusable stainless steel water bottle',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: '20% Off Organic Store',
      category: 'discounts',
      points: 150,
      originalPrice: '$50',
      discountPrice: '$40',
      description: 'Discount voucher for organic products',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Tree Planting Donation',
      category: 'donations',
      points: 100,
      originalPrice: '$10',
      discountPrice: 'Free',
      description: 'Plant a tree in your name',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Bamboo Toothbrush Set',
      category: 'products',
      points: 120,
      originalPrice: '$15',
      discountPrice: 'Free',
      description: 'Set of 4 biodegradable toothbrushes',
      image: 'https://images.unsplash.com/photo-1559591935-c6cc0c1d0c0c?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: '30% Off Recycling Center',
      category: 'discounts',
      points: 180,
      originalPrice: '$100',
      discountPrice: '$70',
      description: 'Discount on recycling services',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Ocean Cleanup Donation',
      category: 'donations',
      points: 250,
      originalPrice: '$25',
      discountPrice: 'Free',
      description: 'Support ocean cleanup initiatives',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      name: 'Eco Workshop Experience',
      category: 'experiences',
      points: 300,
      originalPrice: '$50',
      discountPrice: 'Free',
      description: 'Learn sustainable living practices',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'Solar Panel Discount',
      category: 'discounts',
      points: 500,
      originalPrice: '$2000',
      discountPrice: '$1800',
      description: '15% off solar panel installation',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop'
    }
  ];

  const filteredRewards = activeFilter === 'all' ? rewards : rewards.filter(reward => reward.category === activeFilter);
  const canAfford = (points) => user.points >= points;

  // Intersection Observer for slide-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.slide-in-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleRedeem = (reward) => {
    if (!canAfford(reward.points)) {
      alert('Not enough points! You need ' + reward.points + ' points to redeem this reward.');
      return;
    }

    redeemReward(reward.points);
    alert(`Successfully redeemed ${reward.name}! ${reward.points} points deducted.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card slide-in-section" id="header">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Rewards Center</h1>
        <p className="text-gray-600">
          Redeem your hard-earned points for eco-friendly products, discounts, and donations. 
          Make your environmental impact count!
        </p>
      </div>

      {/* User Points Status */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 slide-in-section" id="points-status">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your Points Balance</h2>
            <p className="text-gray-600">Keep scanning waste to earn more points!</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">{user.points}</div>
            <div className="text-sm text-gray-600">Available Points</div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="card slide-in-section" id="filters">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Rewards</h3>
        <div className="rewards-filter">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`reward-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            >
              <span className="mr-2">{filter.icon}</span>{filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="card slide-in-section" id="rewards-grid">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {activeFilter === 'all' ? 'All Available Rewards' : `${filterOptions.find(f => f.id === activeFilter)?.label}`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward, index) => (
            <div 
              key={reward.id} 
              className={`border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 slide-in-section ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}
              id={`reward-${reward.id}`}
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{reward.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm">
                  <span className="text-gray-500 line-through">{reward.originalPrice}</span>
                  <span className="text-green-600 font-semibold ml-2">{reward.discountPrice}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-yellow-600">{reward.points}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
              
              <button
                onClick={() => handleRedeem(reward)}
                disabled={!canAfford(reward.points)}
                className={`w-full btn ${canAfford(reward.points) ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
              >
                {canAfford(reward.points) ? 'Redeem Now' : 'Not Enough Points'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* How to Earn More Points */}
      <div className="card bg-blue-50 border border-blue-200 slide-in-section" id="earn-points">
        <h2 className="text-xl font-bold text-gray-800 mb-4">How to Earn More Points</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Daily Activities:</h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Scan waste items daily (10-30 points each)</li>
              <li>• Maintain daily streaks (bonus points)</li>
              <li>• Complete weekly challenges</li>
              <li>• Share achievements with friends</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Point Values:</h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li>• Organic waste: 10 points</li>
              <li>• Plastic/Non-biodegradable: 15 points</li>
              <li>• E-Waste: 25 points</li>
              <li>• Hazardous waste: 30 points</li>
              <li>• Streak bonuses: +5 points per day</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reward Categories Info */}
      <div className="card slide-in-section" id="categories">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Reward Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">🎁</div>
            <h3 className="font-semibold text-gray-800 mb-1">Products</h3>
            <p className="text-sm text-gray-600">Eco-friendly items and sustainable products</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-800 mb-1">Discounts</h3>
            <p className="text-sm text-gray-600">Save money on green services and products</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">❤️</div>
            <h3 className="font-semibold text-gray-800 mb-1">Donations</h3>
            <p className="text-sm text-gray-600">Support environmental causes and initiatives</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-1">Experiences</h3>
            <p className="text-sm text-gray-600">Learn and participate in eco-activities</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rewards;
