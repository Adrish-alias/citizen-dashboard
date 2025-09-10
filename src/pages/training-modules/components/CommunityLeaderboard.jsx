import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityLeaderboard = () => {
  // Mock community leaderboard data
  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: "Sarah Johnson",
      address: "Green Valley District",
      ecoPoints: 2850,
      monthlyPoints: 450,
      avatar: null,
      badge: "Eco Champion",
      badgeColor: "text-yellow-500",
      change: "up"
    },
    {
      id: 2,
      rank: 2,
      name: "Michael Chen",
      address: "Riverside Gardens",
      ecoPoints: 2720,
      monthlyPoints: 380,
      avatar: null,
      badge: "Green Leader",
      badgeColor: "text-success",
      change: "up"
    },
    {
      id: 3,
      rank: 3,
      name: "Emily Rodriguez",
      address: "Sunset Heights",
      ecoPoints: 2650,
      monthlyPoints: 420,
      avatar: null,
      badge: "Waste Warrior",
      badgeColor: "text-primary",
      change: "down"
    },
    {
      id: 4,
      rank: 4,
      name: "David Thompson",
      address: "Pine Hill Community",
      ecoPoints: 2480,
      monthlyPoints: 290,
      avatar: null,
      badge: "Eco Advocate",
      badgeColor: "text-accent",
      change: "same"
    },
    {
      id: 5,
      rank: 5,
      name: "Lisa Park",
      address: "Cedar Grove",
      ecoPoints: 2350,
      monthlyPoints: 340,
      avatar: null,
      badge: "Green Guardian",
      badgeColor: "text-success",
      change: "up"
    },
    {
      id: 6,
      rank: 6,
      name: "Robert Martinez",
      address: "Oak Street",
      ecoPoints: 2180,
      monthlyPoints: 250,
      avatar: null,
      badge: "Eco Helper",
      badgeColor: "text-secondary",
      change: "down"
    },
    {
      id: 7,
      rank: 7,
      name: "Jennifer Lee",
      address: "Maple Avenue",
      ecoPoints: 2050,
      monthlyPoints: 280,
      avatar: null,
      badge: "Earth Friend",
      badgeColor: "text-primary",
      change: "up"
    },
    {
      id: 8,
      rank: 8,
      name: "John Smith", // Current user
      address: "Green Valley District",
      ecoPoints: 1950,
      monthlyPoints: 320,
      avatar: null,
      badge: "Rising Star",
      badgeColor: "text-accent",
      change: "up",
      isCurrentUser: true
    },
    {
      id: 9,
      rank: 9,
      name: "Amanda Wilson",
      address: "Birch Lane",
      ecoPoints: 1820,
      monthlyPoints: 180,
      avatar: null,
      badge: "Eco Starter",
      badgeColor: "text-muted-foreground",
      change: "down"
    },
    {
      id: 10,
      rank: 10,
      name: "Christopher Davis",
      address: "Elm Circle",
      ecoPoints: 1750,
      monthlyPoints: 200,
      avatar: null,
      badge: "Eco Starter",
      badgeColor: "text-muted-foreground",
      change: "same"
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Icon name="Crown" size={20} className="text-yellow-500" />;
      case 2:
        return <Icon name="Medal" size={20} className="text-gray-400" />;
      case 3:
        return <Icon name="Award" size={20} className="text-orange-500" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getChangeIcon = (change) => {
    switch (change) {
      case 'up':
        return <Icon name="TrendingUp" size={16} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={16} className="text-error" />;
      default:
        return <Icon name="Minus" size={16} className="text-muted-foreground" />;
    }
  };

  const topThree = leaderboardData?.slice(0, 3);
  const others = leaderboardData?.slice(3);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-accent/20 rounded-lg">
          <Icon name="Trophy" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Community Leaderboard</h2>
          <p className="text-sm text-muted-foreground">Top eco-warriors in your community</p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Top Performers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topThree?.map((user) => (
            <div key={user?.id} className={`relative p-4 rounded-lg border-2 ${
              user?.rank === 1 ? 'border-yellow-500/50 bg-yellow-50/10' :
              user?.rank === 2 ? 'border-gray-400/50 bg-gray-50/10': 'border-orange-500/50 bg-orange-50/10'
            }`}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {getRankIcon(user?.rank)}
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{user?.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{user?.address}</p>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-foreground">{user?.ecoPoints?.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">eco points</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${user?.badgeColor} bg-current/10`}>
                    {user?.badge}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Full Rankings</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {leaderboardData?.map((user) => (
            <div key={user?.id} className={`flex items-center space-x-4 p-3 rounded-lg border transition-colors ${
              user?.isCurrentUser 
                ? 'border-primary bg-primary/10 shadow-sm' 
                : 'border-border hover:bg-muted/30'
            }`}>
              <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
                {getRankIcon(user?.rank)}
              </div>
              
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-medium truncate ${
                    user?.isCurrentUser ? 'text-primary' : 'text-foreground'
                  }`}>
                    {user?.name}
                    {user?.isCurrentUser && <span className="text-xs ml-1">(You)</span>}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground truncate">{user?.address}</p>
                <div className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${user?.badgeColor} bg-current/10`}>
                  {user?.badge}
                </div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg font-bold text-foreground">
                    {user?.ecoPoints?.toLocaleString()}
                  </span>
                  {getChangeIcon(user?.change)}
                </div>
                <div className="text-xs text-muted-foreground">
                  +{user?.monthlyPoints} this month
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-foreground mb-1">24,350</div>
            <div className="text-sm text-muted-foreground">Total Community Points</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary mb-1">156</div>
            <div className="text-sm text-muted-foreground">Active Citizens</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-success mb-1">2,435</div>
            <div className="text-sm text-muted-foreground">Points This Month</div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Rankings update daily • Keep contributing to climb higher!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;