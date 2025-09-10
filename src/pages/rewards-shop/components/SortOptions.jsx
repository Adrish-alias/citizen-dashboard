import React from 'react';
import Select from '../../../components/ui/Select';

const SortOptions = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'points-asc', label: 'Points: Low to High' },
    { value: 'points-desc', label: 'Points: High to Low' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'name', label: 'Name A-Z' }
  ];

  return (
    <div className="flex items-center space-x-4">
      <Select
        label="Sort by"
        options={sortOptions}
        value={sortBy}
        onChange={onSortChange}
        className="w-48"
      />
    </div>
  );
};

export default SortOptions;