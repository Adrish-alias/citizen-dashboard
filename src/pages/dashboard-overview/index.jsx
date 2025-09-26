import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import ContributionChart from './components/ContributionChart';
import NotificationBanner from './components/NotificationBanner';
import HouseholdCard from './components/HouseholdCard';
import RecentCollections from './components/RecentCollections';
import { usePoints } from '../../context/PointsContext';
import { useLocation } from 'react-router-dom';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const { availablePoints, pointsEarnedThisMonth } = usePoints();
  const location = useLocation();

  const [feedbackType, setFeedbackType] = useState('Suggestion');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [feedbackFilter, setFeedbackFilter] = useState('All');

  // Load feedbacks from localStorage on mount
  useEffect(() => {
    const storedFeedbacks = localStorage.getItem('recentFeedbacks');
    if (storedFeedbacks) {
      setRecentFeedbacks(JSON.parse(storedFeedbacks));
    }
  }, []);

  // Save feedbacks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recentFeedbacks', JSON.stringify(recentFeedbacks));
  }, [recentFeedbacks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      id: Date.now(),
      type: feedbackType,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };
    const updatedFeedbacks = [newFeedback, ...recentFeedbacks].slice(0, 5);
    setRecentFeedbacks(updatedFeedbacks);
    setFeedbackType('Suggestion');
    setSubject('');
    setMessage('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const metrics = [
    {
      title: 'Total Waste Contributed',
      value: '127.5',
      unit: 'kg',
      icon: 'Recycle',
      color: 'bg-success',
      trend: { direction: 'up', value: 12 },
      onClick: () => navigate('/report-waste-issues')
    },
    {
      title: 'Points Earned This Month',
      value: pointsEarnedThisMonth?.toLocaleString(),
      unit: 'pts',
      icon: 'Star',
      color: 'bg-accent',
      trend: { direction: 'up', value: 8 },
      onClick: () => navigate('/rewards-shop')
    },
    {
      title: 'Badges Unlocked',
      value: '7',
      unit: 'badges',
      icon: 'Award',
      color: 'bg-primary',
      trend: { direction: 'up', value: 2 },
      onClick: () => navigate('/training-modules')
    },
    {
      title: 'Training Progress',
      value: '75',
      unit: '%',
      icon: 'BookOpen',
      color: 'bg-secondary',
      progress: 75,
      onClick: () => navigate('/training-modules')
    }
  ];

  const filteredFeedbacks = recentFeedbacks.filter(feedback => {
    if (feedbackFilter === 'All') return true;
    return feedback.type === feedbackFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pb-20 lg:pb-8 mobile-safe-area">
        {/* Welcome Section */}
        {location.pathname !== '/feedback' && (
          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-center sm:text-left">
              <motion.h1 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2 sm:mb-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Welcome back, Citizen User! 
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto sm:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                Track your environmental impact and continue making a difference in your community.
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Notification Banner */}
        {location.pathname !== '/feedback' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mb-6"
          >
            <NotificationBanner />
          </motion.div>
        )}

        {/* Metrics Grid */}
        {location.pathname !== '/feedback' && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {metrics?.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.6 + (index * 0.1), 
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <MetricCard
                  title={metric?.title}
                  value={metric?.value}
                  unit={metric?.unit}
                  icon={metric?.icon}
                  color={metric?.color}
                  progress={metric?.progress}
                  trend={metric?.trend}
                  onClick={metric?.onClick}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Household Card - Full width */}
        {location.pathname !== '/feedback' && (
          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <HouseholdCard />
          </motion.div>
        )}

        {/* Contribution Chart - Full width */}
        {location.pathname !== '/feedback' && (
          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <ContributionChart />
          </motion.div>
        )}

        {/* Activity Feed - Full width */}
        {location.pathname !== '/feedback' && (
          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <ActivityFeed />
          </motion.div>
        )}

        {/* Recent Collections - Full width */}
        {location.pathname !== '/feedback' && (
          <motion.div 
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <RecentCollections />
          </motion.div>
        )}

        {/* Feedback Section */}
        {location.pathname === '/feedback' && (
          <motion.div 
            className="gradient-card border border-gray-200/60 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-mobile-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit Feedback</h2>
            <p className="text-gray-600 mb-6">We appreciate your thoughts and suggestions to improve our platform.</p>
            
            {isSubmitted ? (
              <div className="bg-green-50 text-green-700 border border-green-200 rounded-md p-4 flex items-center justify-between mb-8">
                <span>Thank you for your feedback!</span>
                <button onClick={() => setIsSubmitted(false)} className="text-green-700 hover:text-green-800 focus:outline-none">
                  &times;
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-900 mb-1">Type of Feedback</label>
                  <select
                    id="feedbackType"
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                  >
                    <option>Suggestion</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>Collection Issue</option>
                    <option>Vehicle Complaint</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Briefly describe your feedback"
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Provide detailed feedback here..."
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit Feedback
                </button>
              </form>
            )}

            {/* Recent Feedbacks Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Recent Feedbacks</h3>
                <select
                  value={feedbackFilter}
                  onChange={(e) => setFeedbackFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Types</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Collection Issue">Collection Issue</option>
                  <option value="Vehicle Complaint">Vehicle Complaint</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {filteredFeedbacks.length === 0 ? (
                <p className="text-gray-600">No recent feedbacks to display.</p>
              ) : (
                <div className="space-y-4">
                  {filteredFeedbacks.map((feedback) => (
                    <div key={feedback.id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-blue-600">{feedback.type}</span>
                        <span className="text-xs text-gray-500">{new Date(feedback.timestamp).toLocaleString()}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feedback.subject}</h4>
                      <p className="text-sm text-gray-600">{feedback.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Environmental Impact Summary */}
        {location.pathname !== '/feedback' && (
          <motion.div 
            className="gradient-card border border-gray-200/60 rounded-2xl p-6 sm:p-8 shadow-mobile-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <motion.h2 
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
            >
              🌱 Environmental Impact Summary
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <motion.div 
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200/60 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">2.3 tons</div>
                <div className="text-xs sm:text-sm text-green-600 font-medium">CO₂ Emissions Prevented</div>
              </motion.div>
              
              <motion.div 
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200/60 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-blue-700 mb-2">89%</div>
                <div className="text-xs sm:text-sm text-blue-600 font-medium">Proper Segregation Rate</div>
              </motion.div>
              
              <motion.div 
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border border-amber-200/60 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-amber-700 mb-2">15</div>
                <div className="text-xs sm:text-sm text-amber-600 font-medium">Community Reports Submitted</div>
              </motion.div>
            </div>

            <motion.div 
              className="mt-6 sm:mt-8 pt-6 border-t border-gray-200 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.5 }}
            >
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Your contributions have helped make your community cleaner and more sustainable. 
                <span className="font-semibold text-green-600">Keep up the great work!</span> 🎉
              </p>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default DashboardOverview;