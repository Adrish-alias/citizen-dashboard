import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedItems = ({ items, onRedeem, userPoints }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items?.length) % items?.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!items || items?.length === 0) {
    return null;
  }

  const currentItem = items?.[currentIndex];

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="bg-gradient-to-r from-accent/10 to-warning/10 px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={20} className="text-accent" />
          <h2 className="text-lg font-semibold text-foreground">Featured Rewards</h2>
          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
            Limited Time
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="flex overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items?.map((item, index) => (
              <div key={item?.id} className="w-full flex-shrink-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 relative">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    {item?.badge && (
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {item?.badge}
                      </div>
                    )}
                  </div>
                  <div className="lg:w-1/2 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{item?.name}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{item?.description}</p>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="Coins" size={20} className="text-accent" />
                        <span className="text-xl font-bold text-foreground">{item?.points?.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">points</span>
                      </div>
                      {item?.originalPoints && (
                        <span className="text-sm text-muted-foreground line-through">
                          {item?.originalPoints?.toLocaleString()} points
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 mb-6">
                      <Icon 
                        name={item?.available ? "CheckCircle" : "XCircle"} 
                        size={16} 
                        className={item?.available ? "text-success" : "text-error"} 
                      />
                      <span className={`text-sm font-medium ${item?.available ? "text-success" : "text-error"}`}>
                        {item?.available ? `${item?.stock} available` : "Out of stock"}
                      </span>
                    </div>

                    <Button
                      variant={userPoints >= item?.points && item?.available ? "default" : "outline"}
                      disabled={userPoints < item?.points || !item?.available}
                      onClick={() => onRedeem(item)}
                      iconName="Gift"
                      iconPosition="left"
                      className="w-full lg:w-auto"
                    >
                      {userPoints < item?.points ? "Insufficient Points" : !item?.available ?"Out of Stock" : "Redeem Now"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {items?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-elevation-1 w-10 h-10"
              iconName="ChevronLeft"
              iconSize={20}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-elevation-1 w-10 h-10"
              iconName="ChevronRight"
              iconSize={20}
            />
          </>
        )}

        {/* Dots Indicator */}
        {items?.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {items?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-primary' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedItems;