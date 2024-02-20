import { differenceInDays, format, formatDistance, parseISO } from "date-fns";

export function formatDate(date: Date) {
  return format(date, "LLL dd yyyy", {});
}

export function formatTime(time: Date) {
  return format(time, "E, LLL dd yyyy, h:m bbb", {});
}

export function getTimeAfterCreatedAt(createdAt: Date) {
  const time = new Date().getTime() - new Date(createdAt).getTime();
  const days = Math.floor(time / (24 * 60 * 60 * 1000));
  const weeks = days > 7 ? Math.floor(days / 7) : 0;
  const months = days >= 30 ? Math.floor(days / 30) : 0;

  if (weeks > 0 && months <= 0) return `${weeks} weeks ago`;
  if (months > 0) return `${months} months ago`;

  return days ? `${days} days ago` : "To day";
}

export function getDistanceDates(date1: Date, date2: Date) {
  const formatDate = formatDistance(date1, date2).split(" ")[0];
  // const formatDate = formatDistance(date1, date2).split(" ")[0] + " night stay";

  return formatDate;
}

export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));
