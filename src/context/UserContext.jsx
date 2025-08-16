import { createContext, useReducer, useContext, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: {
    id: 1,
    name: 'Eco Warrior',
    avatar: '🌱',
    points: 1250,
    level: 3,
    streak: 7,
    totalWasteSegregated: 45,
    badges: ['First Scan', 'Week Warrior', 'Plastic Master'],
    email: '',
    password: ''
  },
  wasteHistory: [
    { id: 1, name: 'Plastic Bottle', type: 'plastic', points: 15, date: '2024-01-15', correct: true },
    { id: 2, name: 'Apple Core', type: 'organic', points: 10, date: '2024-01-14', correct: true },
    { id: 3, name: 'Old Phone', type: 'e-waste', points: 25, date: '2024-01-13', correct: true },
    { id: 4, name: 'Battery', type: 'hazardous', points: 30, date: '2024-01-12', correct: false },
    { id: 5, name: 'Paper', type: 'organic', points: 10, date: '2024-01-11', correct: true }
  ],
  leaderboard: [
    { id: 1, name: 'Sarah Green', points: 2850, wasteSegregated: 89, streak: 15, achievements: ['Master Recycler', 'Perfect Week', 'Eco Champion'] },
    { id: 2, name: 'Mike Eco', points: 2670, wasteSegregated: 76, streak: 12, achievements: ['Week Warrior', 'Plastic Master', 'Green Thumb'] },
    { id: 3, name: 'Lisa Waste', points: 2450, wasteSegregated: 67, streak: 10, achievements: ['First Scan', 'Perfect Day', 'Recycling Pro'] },
    { id: 4, name: 'John Clean', points: 2230, wasteSegregated: 58, streak: 8, achievements: ['Week Warrior', 'Organic Expert'] },
    { id: 5, name: 'Emma Sort', points: 2010, wasteSegregated: 52, streak: 7, achievements: ['First Scan', 'Perfect Day'] },
    { id: 6, name: 'David Recycle', points: 1890, wasteSegregated: 48, streak: 6, achievements: ['Week Warrior'] },
    { id: 7, name: 'Anna Green', points: 1670, wasteSegregated: 43, streak: 5, achievements: ['First Scan'] },
    { id: 8, name: 'Tom Waste', points: 1450, wasteSegregated: 38, streak: 4, achievements: ['Perfect Day'] },
    { id: 9, name: 'Maria Sort', points: 1230, wasteSegregated: 32, streak: 3, achievements: ['First Scan'] },
    { id: 10, name: 'Carl Eco', points: 1010, wasteSegregated: 26, streak: 2, achievements: [] }
  ]
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: { ...state.user, email: action.payload.email, password: action.payload.password } };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: { ...state.user, email: '', password: '' } };
    case 'ADD_WASTE':
      const updatedPoints = state.user.points + (action.payload.correct ? action.payload.points : 0);
      const updatedWasteCount = state.user.totalWasteSegregated + 1;
      return {
        ...state,
        user: {
          ...state.user,
          points: updatedPoints,
          totalWasteSegregated: updatedWasteCount,
          level: Math.floor(updatedPoints / 500) + 1
        },
        wasteHistory: [{ id: Date.now(), name: action.payload.name, type: action.payload.type, points: action.payload.points, date: new Date().toISOString().split('T')[0], correct: action.payload.correct }, ...state.wasteHistory]
      };
    case 'REDEEM_REWARD':
      const newPoints = state.user.points - action.payload.points;
      return {
        ...state,
        user: {
          ...state.user,
          points: Math.max(0, newPoints) // Ensure points don't go below 0
        }
      };
    case 'UPDATE_STREAK':
      return {
        ...state,
        user: {
          ...state.user,
          streak: action.payload.streak
        }
      };
    case 'ADD_BADGE':
      return {
        ...state,
        user: {
          ...state.user,
          badges: [...state.user.badges, action.payload.badge]
        }
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const savedUser = localStorage.getItem('ecorewards_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      dispatch({ type: 'LOGIN', payload: userData });
    }
  }, []);

  useEffect(() => {
    if (state.isAuthenticated) {
      localStorage.setItem('ecorewards_user', JSON.stringify({ email: state.user.email, password: state.user.password }));
    } else {
      localStorage.removeItem('ecorewards_user');
    }
  }, [state.isAuthenticated, state.user.email, state.user.password]);

  const login = (email, password) => {
    dispatch({ type: 'LOGIN', payload: { email, password } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addWaste = (wasteData) => {
    dispatch({ type: 'ADD_WASTE', payload: wasteData });
  };

  const redeemReward = (points) => {
    dispatch({ type: 'REDEEM_REWARD', payload: { points } });
  };

  const updateStreak = (newStreak) => {
    dispatch({ type: 'UPDATE_STREAK', payload: { streak: newStreak } });
  };

  const addBadge = (badgeName) => {
    dispatch({ type: 'ADD_BADGE', payload: { badge: badgeName } });
  };

  const value = { ...state, login, logout, addWaste, redeemReward, updateStreak, addBadge };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

