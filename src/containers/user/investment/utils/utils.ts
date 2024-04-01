import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export const formatDays = (days) => {
  const remainder10 = days % 10;
  const remainder100 = days % 100;

  if (remainder100 >= 11 && remainder100 <= 19) {
    return 'дней';
  } else if (remainder10 === 1) {
    return 'день';
  } else if (remainder10 >= 2 && remainder10 <= 4) {
    return 'дня';
  } else {
    return 'дней';
  }
};

export const formatHours = (hours) => {
  const remainder10 = hours % 10;
  const remainder100 = hours % 100;

  if (remainder100 >= 11 && remainder100 <= 19) {
    return 'часов';
  } else if (remainder10 === 1) {
    return 'час';
  } else if (remainder10 >= 2 && remainder10 <= 4) {
    return 'часа';
  } else {
    return 'часов';
  }
};

export const formatMinutes = (minutes) => {
  const remainder10 = minutes % 10;
  const remainder100 = minutes % 100;

  if (remainder100 >= 11 && remainder100 <= 19) {
    return 'минут';
  } else if (remainder10 === 1) {
    return 'минута';
  } else if (remainder10 >= 2 && remainder10 <= 4) {
    return 'минуты';
  } else {
    return 'минут';
  }
};

export const getTimeRemaining = (targetDate) => {
  const currentDate = dayjs.tz(new Date(), 'DD-MM-YYYY HH:mm:ss', 'Europe/Moscow');
  const timeDiff = dayjs.duration(targetDate.diff(currentDate));
  const days = timeDiff.days();
  const hours = timeDiff.hours();
  const minutes = timeDiff.minutes();
  const seconds = timeDiff.seconds();
  return { days, hours, minutes, seconds };
};
