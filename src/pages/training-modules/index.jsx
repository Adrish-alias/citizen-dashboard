import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ModuleCard from './components/ModuleCard';
import ProgressSummary from './components/ProgressSummary';
import ModuleModal from './components/ModuleModal';
import AchievementBadge from './components/AchievementBadge';
import RecentActivity from './components/RecentActivity';
import CommunityLeaderboard from './components/CommunityLeaderboard';
import { usePoints } from '../../context/PointsContext';

const TrainingModules = () => {
  const navigate = useNavigate();
  const { setAvailablePoints, setPointsEarnedThisMonth } = usePoints();
  const [selectedModule, setSelectedModule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modules, setModules] = useState([]);
  const [progressStats, setProgressStats] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Initialize mock data
    const mockModules = [
      {
        id: 1,
        title: "Waste Segregation Basics",
        description: "Learn the fundamentals of proper waste segregation including organic, recyclable, and hazardous waste categories. Master the color-coding system and understand why proper segregation is crucial for environmental protection.",
        duration: "45 min",
        lessons: 8,
        points: 150,
        progress: 100,
        status: "completed",
        icon: "Recycle",
        iconBg: "bg-success/20",
        iconColor: "text-success",
        category: "Fundamentals"
      },
      {
        id: 2,
        title: "Home Composting Guide",
        description: "Discover how to transform kitchen scraps and garden waste into nutrient-rich compost. Learn about different composting methods, troubleshooting common issues, and maintaining optimal conditions for decomposition.",
        duration: "60 min",
        lessons: 12,
        points: 200,
        progress: 65,
        status: "in-progress",
        icon: "Leaf",
        iconBg: "bg-primary/20",
        iconColor: "text-primary",
        category: "Advanced"
      },
      {
        id: 3,
        title: "Recycling Best Practices",
        description: "Master the art of effective recycling by understanding material types, preparation methods, and local recycling guidelines. Learn to identify recyclable items and avoid contamination that reduces recycling efficiency.",
        duration: "50 min",
        lessons: 10,
        points: 175,
        progress: 0,
        status: "not-started",
        icon: "RotateCcw",
        iconBg: "bg-accent/20",
        iconColor: "text-accent",
        category: "Fundamentals"
      },
      {
        id: 4,
        title: "Hazardous Waste Management",
        description: "Learn safe handling and disposal methods for hazardous household items including batteries, electronics, chemicals, and medical waste. Understand legal requirements and find proper disposal facilities.",
        duration: "40 min",
        lessons: 7,
        points: 125,
        progress: 0,
        status: "not-started",
        icon: "AlertTriangle",
        iconBg: "bg-error/20",
        iconColor: "text-error",
        category: "Safety"
      },
      {
        id: 5,
        title: "Community Waste Reduction",
        description: "Explore strategies for reducing waste at the community level through sharing programs, bulk buying, and collaborative initiatives. Learn to organize neighborhood waste reduction campaigns and measure impact.",
        duration: "55 min",
        lessons: 9,
        points: 180,
        progress: 0,
        status: "not-started",
        icon: "Users",
        iconBg: "bg-secondary/20",
        iconColor: "text-secondary",
        category: "Community"
      },
      {
        id: 6,
        title: "Zero Waste Lifestyle",
        description: "Transition to a zero waste lifestyle with practical tips for reducing consumption, reusing materials, and making sustainable choices. Learn about zero waste principles and create your personal action plan.",
        duration: "70 min",
        lessons: 15,
        points: 250,
        progress: 0,
        status: "not-started",
        icon: "Target",
        iconBg: "bg-warning/20",
        iconColor: "text-warning",
        category: "Lifestyle"
      }
    ];

    const mockProgressStats = {
      totalModules: mockModules?.length,
      completedModules: mockModules?.filter(m => m?.status === 'completed')?.length,
      inProgressModules: mockModules?.filter(m => m?.status === 'in-progress')?.length,
      totalPoints: 150,
      estimatedTime: "4h 30m"
    };

    const mockAchievements = [
      {
        id: 1,
        title: "First Steps",
        description: "Complete your first module",
        icon: "Award",
        bgColor: "bg-success/20",
        iconColor: "text-success",
        points: 50,
        unlocked: true
      },
      {
        id: 2,
        title: "Knowledge Seeker",
        description: "Complete 3 modules",
        icon: "BookOpen",
        bgColor: "bg-primary/20",
        iconColor: "text-primary",
        points: 100,
        unlocked: false
      },
      {
        id: 3,
        title: "Eco Expert",
        description: "Complete all modules",
        icon: "Star",
        bgColor: "bg-accent/20",
        iconColor: "text-accent",
        points: 200,
        unlocked: false
      },
      {
        id: 4,
        title: "Quiz Master",
        description: "Pass all quizzes with 90%+",
        icon: "Trophy",
        bgColor: "bg-warning/20",
        iconColor: "text-warning",
        points: 150,
        unlocked: false
      }
    ];

    const mockRecentActivities = [
      {
        id: 1,
        type: "completed",
        title: "Completed Waste Segregation Basics",
        description: "Finished all 8 lessons and passed the final quiz",
        points: 150,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        id: 2,
        type: "badge_earned",
        title: "Earned \'First Steps\' Badge",
        description: "Unlocked for completing your first training module",
        points: 50,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        id: 3,
        type: "started",
        title: "Started Home Composting Guide",
        description: "Began learning about composting techniques",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        id: 4,
        type: "quiz_passed",
        title: "Passed Segregation Quiz",
        description: "Scored 95% on the waste segregation assessment",
        points: 25,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      }
    ];

    setModules(mockModules);
    setProgressStats(mockProgressStats);
    setAchievements(mockAchievements);
    setRecentActivities(mockRecentActivities);
  }, []);

  const handleStartModule = (module) => {
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  const handleCompleteModule = (module) => {
    // Update module progress
    setModules(prevModules =>
      prevModules?.map(m =>
        m?.id === module.id
          ? { ...m, progress: 100, status: 'completed' }
          : m
      )
    );

    // Update progress stats
    setProgressStats(prevStats => ({
      ...prevStats,
      completedModules: prevStats?.completedModules + 1,
      inProgressModules: Math.max(0, prevStats?.inProgressModules - 1),
      totalPoints: prevStats?.totalPoints + module.points
    }));

    setAvailablePoints(prevPoints => prevPoints + module.points);
    setPointsEarnedThisMonth(prevPoints => prevPoints + module.points);
    // Add activity
    const newActivity = {
      id: Date.now(),
      type: "completed",
      title: `Completed ${module.title}`,
      description: `Finished all ${module.lessons} lessons and earned ${module.points} points`,
      points: module.points,
      timestamp: new Date()
    };

    setRecentActivities(prev => [newActivity, ...prev?.slice(0, 9)]);

    setIsModalOpen(false);
    setSelectedModule(null);
  };

  const categorizedModules = modules?.reduce((acc, module) => {
    if (!acc?.[module.category]) {
      acc[module.category] = [];
    }
    acc?.[module.category]?.push(module);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Training Modules</h1>
            <p className="text-muted-foreground">
              Master waste management techniques through interactive learning modules
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard-overview')}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Progress Summary */}
        <ProgressSummary stats={progressStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Module Categories */}
            {Object.entries(categorizedModules)?.map(([category, categoryModules]) => (
              <div key={category}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-xl font-semibold text-foreground">{category}</h2>
                  <div className="flex-1 h-px bg-border" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryModules?.map((module) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      onStartModule={handleStartModule}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard-overview')}
                  iconName="BarChart3"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  View Progress Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/rewards-shop')}
                  iconName="Gift"
                  iconPosition="left"
                  iconSize={16}
                  className="justify-start"
                >
                  Redeem Learning Points
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievement Badges */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Icon name="Award" size={24} className="text-accent" />
                <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {achievements?.map((badge) => (
                  <AchievementBadge
                    key={badge?.id}
                    badge={badge}
                    isUnlocked={badge?.unlocked}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <RecentActivity activities={recentActivities} />

            {/* Learning Tips */}
            <div className="bg-gradient-to-br from-primary/10 to-success/10 border border-primary/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Lightbulb" size={24} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Learning Tips</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Complete modules in order for the best learning experience</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Take notes during lessons to reinforce learning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Apply what you learn in your daily waste management</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Share knowledge with family and neighbors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Community Leaderboard - Full width at the end */}
        <div className="mt-8">
          <CommunityLeaderboard />
        </div>
      </main>
      {/* Module Modal */}
      <ModuleModal
        module={selectedModule}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedModule(null);
        }}
        onComplete={handleCompleteModule}
      />
    </div>
  );
};

export default TrainingModules;