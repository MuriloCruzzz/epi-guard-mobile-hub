
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ initialRating = 0, onChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  
  const handleClick = (value: number) => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {[1, 2, 3].map((star) => (
        <Star
          key={star}
          size={40}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          fill={(hover || rating) >= star ? '#0078D7' : 'none'}
          stroke="#0078D7"
          className="cursor-pointer"
        />
      ))}
    </div>
  );
};

export default StarRating;
