import React, { useEffect, useState } from 'react';

interface TimeAgoPillProps {
  startTime: Date | string;
}

const formatElapsedTime = (startTime: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);

  const seconds = diffInSeconds % 60;
  const minutes = Math.floor(diffInSeconds / 60) % 60;
  const hours = Math.floor(diffInSeconds / 3600) % 24;
  const days = Math.floor(diffInSeconds / 86400);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
};

const TimeAgoPill: React.FC<TimeAgoPillProps> = ({ startTime }) => {
  const [, setTick] = useState(0);
  const startDate = typeof startTime === 'string' ? new Date(startTime) : startTime;

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(tick => tick + 1);
    }, 30000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div >
      {formatElapsedTime(startDate)}
    </div>
  );
};

export default TimeAgoPill;
