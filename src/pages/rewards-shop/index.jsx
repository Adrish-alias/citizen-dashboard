import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// framer-motion removed to eliminate page transition animations
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PointsBalance from './components/PointsBalance';
import CategoryFilter from './components/CategoryFilter';
import SortOptions from './components/SortOptions';
import RewardCard from './components/RewardCard';
import RedemptionModal from './components/RedemptionModal';
import RedemptionHistory from './components/RedemptionHistory';
import { usePoints } from '../../context/PointsContext';

const RewardsShop = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const { availablePoints, setAvailablePoints } = usePoints();

  // Mock categories
  const categories = [
    { id: 'all', name: 'All Items', icon: 'Grid3X3' },
    { id: 'reusable', name: 'Reusable Products', icon: 'Recycle' },
    { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
    { id: 'experiences', name: 'Experiences', icon: 'MapPin' },
    { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
    { id: 'home', name: 'Home & Garden', icon: 'Home' }
  ];

  // Mock reward items
  const rewardItems = [
    {
      id: 'reward-1',
      name: 'Stainless Steel Lunch Box',
      description: 'Durable, leak-proof lunch container made from recycled stainless steel',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      points: 450,
      available: true,
      stock: 32,
      category: 'reusable',
      sustainability: true,
      requiresAddress: true,
      popularity: 95
    },
    {
      id: 'reward-2',
      name: 'Amazon Gift Card - $25',
      description: 'Digital gift card for online shopping, delivered instantly to your email',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      points: 2000,
      available: true,
      stock: 100,
      category: 'gift-cards',
      sustainability: false,
      requiresAddress: false,
      popularity: 88
    },
    {
      id: 'reward-3',
      name: 'Organic Cotton Tote Bag',
      description: 'Eco-friendly shopping bag made from 100% organic cotton',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      points: 300,
      available: true,
      stock: 45,
      category: 'reusable',
      sustainability: true,
      requiresAddress: true,
      popularity: 92
    },
    {
      id: 'reward-4',
      name: 'Local Farm Tour Experience',
      description: 'Guided tour of sustainable farming practices with lunch included',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',
      points: 1200,
      available: true,
      stock: 12,
      category: 'experiences',
      sustainability: true,
      requiresAddress: false,
      popularity: 78
    },
    {
      id: 'reward-5',
      name: 'Solar Power Bank',
      description: 'Portable solar charger with 10,000mAh capacity for outdoor adventures',
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop',
      points: 1800,
      available: true,
      stock: 18,
      category: 'electronics',
      sustainability: true,
      requiresAddress: true,
      popularity: 85
    },
    {
      id: 'reward-6',
      name: 'Compost Bin Starter Kit',
      description: 'Complete home composting solution with bin, starter mix, and guide',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      points: 950,
      available: false,
      stock: 0,
      category: 'home',
      sustainability: true,
      requiresAddress: true,
      popularity: 90
    },
    {
      id: 'reward-7',
      name: 'Starbucks Gift Card - $15',
      description: 'Enjoy your favorite coffee with this digital gift card',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
      points: 1200,
      available: true,
      stock: 75,
      category: 'gift-cards',
      sustainability: false,
      requiresAddress: false,
      popularity: 94
    },
    {
      id: 'reward-8',
      name: 'LED Plant Growing Light',
      description: 'Energy-efficient LED light for indoor herb and vegetable growing',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      points: 2200,
      available: true,
      stock: 9,
      category: 'home',
      sustainability: true,
      requiresAddress: true,
      popularity: 76
    }
  ];

  // Mock redemption history
  const redemptionHistory = [
    {
      id: 'redemption-1',
      item: {
        name: 'Bamboo Utensil Set',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
      },
      pointsUsed: 350,
      redeemedAt: '2025-01-05T10:30:00Z',
      status: 'delivered',
      trackingNumber: 'GT123456789'
    },
    {
      id: 'redemption-2',
      item: {
        name: 'Target Gift Card - $20',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop'
      },
      pointsUsed: 1600,
      redeemedAt: '2025-01-03T14:15:00Z',
      status: 'shipped',
      trackingNumber: 'GT987654321',
      estimatedDelivery: '2025-01-10T00:00:00Z'
    },
    {
      id: 'redemption-3',
      item: {
        name: 'Recycling Workshop',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
      },
      pointsUsed: 800,
      redeemedAt: '2024-12-28T09:00:00Z',
      status: 'processing'
    }
  ];

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = rewardItems;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(item => item?.category === activeCategory);
    }

    // Sort items
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'points-asc':
          return a?.points - b?.points;
        case 'points-desc':
          return b?.points - a?.points;
        case 'popularity':
          return b?.popularity - a?.popularity;
        case 'newest':
          return new Date(b.createdAt || '2025-01-01') - new Date(a.createdAt || '2025-01-01');
        case 'name':
          return a?.name?.localeCompare(b?.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeCategory, sortBy]);

  // Calculate item counts per category
  const itemCounts = useMemo(() => {
    const counts = { all: rewardItems?.length };
    categories?.forEach(category => {
      if (category?.id !== 'all') {
        counts[category.id] = rewardItems?.filter(item => item?.category === category?.id)?.length;
      }
    });
    return counts;
  }, []);

  const handleRedeem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleConfirmRedemption = (item, deliveryAddress) => {
    // Simulate redemption process
    console.log('Redeeming item:', item?.name, 'Address:', deliveryAddress);
    setIsModalOpen(false);
    setSelectedItem(null);
    
    // Show success message (in real app, this would update user points and add to history)
    if (availablePoints >= item?.points) {
      setAvailablePoints(prevPoints => prevPoints - item?.points);
      alert(`Successfully redeemed ${item?.name}! Your new balance is ${availablePoints - item?.points} points. Check your redemption history for updates.`);
    } else {
      alert("Not enough points to redeem this item.");
    }
  };

  const handleWishlist = (item) => {
    setWishlist(prev => {
      const isWishlisted = prev?.some(w => w?.id === item?.id);
      if (isWishlisted) {
        return prev?.filter(w => w?.id !== item?.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const isWishlisted = (itemId) => {
    return wishlist?.some(w => w?.id === itemId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pb-20 lg:pb-8 mobile-safe-area">
        {/* Page Header */}
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0"
        >
          <div className="text-center sm:text-left">
            <h1 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2"
            >
              🎁 Rewards Shop
            </h1>
            <p 
              className="text-gray-600 text-sm sm:text-base leading-relaxed"
            >
              Redeem your points for eco-friendly rewards and experiences
            </p>
          </div>
          
          <div 
            className="flex items-center justify-center sm:justify-end space-x-3"
          >
            <Button
              variant={showHistory ? "default" : "outline"}
              onClick={() => setShowHistory(!showHistory)}
              iconName="History"
              iconPosition="left"
              className="hidden sm:flex"
            >
              {showHistory ? "Hide History" : "View History"}
            </Button>
          </div>
        </div>

        {/* Points Balance */}
        <div>
          <PointsBalance points={availablePoints} className="mb-6 sm:mb-8" />
        </div>

        {/* Show History or Shop */}
        {showHistory ? (
          <div>
            <RedemptionHistory 
              redemptions={redemptionHistory}
              className="mb-6 sm:mb-8"
            />
          </div>
        ) : (
          <>
            {/* Filters and Sort */}
            <div 
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 sm:mb-8"
            >
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                itemCounts={itemCounts}
              />
              
              <SortOptions
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* Results Summary */}
            <div 
              className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-2 sm:space-y-0"
            >
              <p className="text-sm text-gray-600 text-center sm:text-left">
                Showing {filteredAndSortedItems?.length} of {rewardItems?.length} rewards
                {activeCategory !== 'all' && (
                  <span className="ml-1">
                    in {categories?.find(c => c?.id === activeCategory)?.name}
                  </span>
                )}
              </p>
              
              {wishlist?.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Heart"
                  iconPosition="left"
                  className="text-red-600 mx-auto sm:mx-0"
                >
                  Wishlist ({wishlist?.length})
                </Button>
              )}
            </div>

            {/* Rewards Grid */}
            {filteredAndSortedItems?.length > 0 ? (
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
              >
                {filteredAndSortedItems?.map((item, index) => (
                  <div
                    key={item?.id}
                  >
                    <RewardCard
                      item={item}
                      onRedeem={handleRedeem}
                      onWishlist={handleWishlist}
                      userPoints={availablePoints}
                      isWishlisted={isWishlisted(item?.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div 
                className="text-center py-12"
              >
                <div>
                  <Icon name="Package" size={64} className="text-gray-400 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No rewards found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or check back later for new items.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveCategory('all')}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div 
          className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border border-gray-200/60 rounded-2xl p-6 sm:p-8 text-center shadow-mobile-card"
        >
          <div>
            <Icon name="Target" size={48} className="text-green-600 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">💡 Need More Points?</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Complete training modules, report waste issues, and participate in community activities to earn more points!
          </p>
          <div 
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              variant="default"
              onClick={() => navigate('/training-modules')}
              iconName="BookOpen"
              iconPosition="left"
              className="gradient-primary"
            >
              Start Learning
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/report-waste-issues')}
              iconName="AlertTriangle"
              iconPosition="left"
            >
              Report Issues
            </Button>
          </div>
        </div>
      </main>
      {/* Redemption Modal */}
      <RedemptionModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={handleConfirmRedemption}
        userPoints={availablePoints}
      />
    </div>
  );
};

export default RewardsShop;