import React from 'react';
import Button from '../../../components/ui/Button';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, itemCounts }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category?.id)}
            iconName={category?.icon}
            iconPosition="left"
            iconSize={16}
            className="transition-micro hover:scale-micro"
          >
            {category?.name}
            <span className="ml-2 text-xs opacity-75">
              ({itemCounts?.[category?.id] || 0})
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;