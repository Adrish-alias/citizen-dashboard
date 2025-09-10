import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [recentFeedbacks, setRecentFeedbacks] = useState([]); // New state for recent feedbacks
  const [feedbackFilter, setFeedbackFilter] = useState('All'); // New state for feedback filter

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      id: Date.now(), // Unique ID for the feedback
      type: feedbackType,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };
    setRecentFeedbacks((prevFeedbacks) => [newFeedback, ...prevFeedbacks].slice(0, 5));
    console.log('Feedback Submitted:', newFeedback);
    // Here you would typically send this data to an API
    // For now, we'll just clear the form and show a success message
    setFeedbackType('Suggestion');
    setSubject('');
    setMessage('');
    setIsSubmitted(true);
    // Optionally, hide the success message after a few seconds
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        {location.pathname !== '/feedback' && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Citizen User!
            </h1>
            <p className="text-muted-foreground">
              Track your environmental impact and continue making a difference in your community.
            </p>
          </div>
        )}

        {/* Notification Banner */}
        {location.pathname !== '/feedback' && (
          <NotificationBanner />
        )}

        {/* Metrics Grid */}
        {location.pathname !== '/feedback' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                unit={metric?.unit}
                icon={metric?.icon}
                color={metric?.color}
                progress={metric?.progress}
                trend={metric?.trend}
                onClick={metric?.onClick}
              />
            ))}
          </div>
        )}

        {/* Household Card - Full width */}
        {location.pathname !== '/feedback' && (
          <div className="mb-8">
            <HouseholdCard />
          </div>
        )}

        {/* Contribution Chart - Full width */}
        {location.pathname !== '/feedback' && (
          <div className="mb-8">
            <ContributionChart />
          </div>
        )}

        {/* Activity Feed - Full width */}
        {location.pathname !== '/feedback' && (
          <div className="mb-8">
            <ActivityFeed />
          </div>
        )}

        {/* Recent Collections - Full width */}
        {location.pathname !== '/feedback' && (
          <div className="mb-8">
            <RecentCollections />
          </div>
        )}

        {/* Feedback Section */}
        {location.pathname === '/feedback' && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Submit Feedback</h2>
            <p className="text-muted-foreground mb-6">We appreciate your thoughts and suggestions to improve our platform.</p>
            
            {isSubmitted ? (
              <div className="bg-success/10 text-success border border-success/20 rounded-md p-4 flex items-center justify-between mb-8">
                <span>Thank you for your feedback!</span>
                <button onClick={() => setIsSubmitted(false)} className="text-success-foreground hover:text-success focus:outline-none">
                  &times;
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="feedbackType" className="block text-sm font-medium text-foreground mb-1">Type of Feedback</label>
                  <select
                  id="feedbackType"
                  className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
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
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Briefly describe your feedback"
                  className="w-full p-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Provide detailed feedback here..."
                  className="w-full p-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                Submit Feedback
              </button>
            </form>
          )}

          {/* Recent Feedbacks Section */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">Recent Feedbacks</h3>
              <select
                value={feedbackFilter}
                onChange={(e) => setFeedbackFilter(e.target.value)}
                className="p-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
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
              <p className="text-muted-foreground">No recent feedbacks to display.</p>
            ) : (
              <div className="space-y-4">
                {filteredFeedbacks.map((feedback) => (
                  <div key={feedback.id} className="bg-muted/30 p-4 rounded-md border border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-primary">{feedback.type}</span>
                      <span className="text-xs text-muted-foreground">{new Date(feedback.timestamp).toLocaleString()}</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{feedback.subject}</h4>
                    <p className="text-sm text-muted-foreground">{feedback.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
        )}

        {/* Environmental Impact Summary */}
        {location.pathname !== '/feedback' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Environmental Impact Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                <div className="text-2xl font-bold text-success mb-1">2.3 tons</div>
                <div className="text-sm text-muted-foreground">CO₂ Emissions Prevented</div>
              </div>
              
              <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary mb-1">89%</div>
                <div className="text-sm text-muted-foreground">Proper Segregation Rate</div>
              </div>
              
              <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                <div className="text-2xl font-bold text-accent mb-1">15</div>
                <div className="text-sm text-muted-foreground">Community Reports Submitted</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Your contributions have helped make your community cleaner and more sustainable. 
                Keep up the great work!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardOverview;