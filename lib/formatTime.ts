// Time format function for feed
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export default function formatTime(date: string): string {
  dayjs.extend(utc)
  const postDate = dayjs.utc(date);
  const now = dayjs.utc();

  const diffInMinutes = now.diff(postDate, 'minute');
  

  if (diffInMinutes < 1) {
    return `just now`; 
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInMinutes < 1440) { 
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}h`; 
  } else if (diffInMinutes < 10080) { 
    const diffInDays = Math.floor(diffInMinutes / 1440);
    return `${diffInDays}d`;
  } else if (diffInMinutes < 40320) { 
    const diffInWeeks = Math.floor(diffInMinutes / 10080);
    return `${diffInWeeks}w`;
  } else {
    return postDate.format('YYYY-MM-DD'); 
  }
}