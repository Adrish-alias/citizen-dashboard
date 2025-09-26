import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RewardCard = ({ item, onRedeem, onWishlist, userPoints, isWishlisted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canRedeem = userPoints >= item?.points && item?.available;

  return (
    <div 
      className="bg-card rounded-lg border border-border overflow-hidden transition-all duration-200 hover:shadow-elevation-2 hover:scale-micro hover-lift tap-shrink fade-in-fast"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          src={item?.image}
          alt={item?.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {item?.badge && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              {item?.badge}
            </span>
          )}
          {!item?.available && (
            <span className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onWishlist(item)}
          className={`absolute top-3 right-3 bg-white/90 hover:bg-white transition-all duration-200 w-8 h-8 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          iconName={isWishlisted ? "Heart" : "Heart"}
          iconSize={16}
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={isWishlisted ? "text-error fill-current" : "text-muted-foreground"} 
          />
        </Button>

        {/* Quick View Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-200">
            <Button
              variant="secondary"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              className="bg-white text-foreground hover:bg-gray-100"
            >
              Quick View
            </Button>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-sm leading-tight">{item?.name}</h3>
          <div className="flex items-center space-x-1 ml-2">
            <Icon name="Coins" size={14} className="text-accent flex-shrink-0" />
            <span className="text-sm font-bold text-foreground">{item?.points?.toLocaleString()}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item?.description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Icon 
              name={item?.available ? "CheckCircle" : "XCircle"} 
              size={12} 
              className={item?.available ? "text-success" : "text-error"} 
            />
            <span className={`text-xs ${item?.available ? "text-success" : "text-error"}`}>
              {item?.available ? `${item?.stock} left` : "Unavailable"}
            </span>
          </div>
          
          {item?.sustainability && (
            <div className="flex items-center space-x-1">
              <Icon name="Leaf" size={12} className="text-primary" />
              <span className="text-xs text-primary font-medium">Eco-Friendly</span>
            </div>
          )}
        </div>

        <Button
          variant={canRedeem ? "default" : "outline"}
          size="sm"
          disabled={!canRedeem}
          onClick={() => onRedeem(item)}
          iconName="Gift"
          iconPosition="left"
          iconSize={14}
          fullWidth
          className="text-xs"
        >
          {!item?.available ? "Out of Stock" :
           userPoints < item?.points ? "Need More Points" : "Redeem"}
        </Button>
      </div>
    </div>
  );
};

export default RewardCard;