// Time format function for feed
import dayjs from 'dayjs';

export default function formatTime(date: string): string {
  const postDate = dayjs(date);
  const now = dayjs();

  const diffInMinutes = now.diff(postDate, 'minute');
  const diffInHours = now.diff(postDate, 'hour');
  const diffInDays = now.diff(postDate, 'day');
  const diffInWeeks = now.diff(postDate, 'week');

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks}w`;
  } else {
    return postDate.format('YYYY-MM-DD');
  }
}