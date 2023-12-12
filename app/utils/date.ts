import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  format,
} from 'date-fns';
import { CalendarRange } from 'types';

export const generateCalendarDaysByDate = (date: Date): CalendarRange => {
  // Calculate the start and end of the active month
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);

  // Calculate the start of the first week (Monday) for the active month
  const startOfFirstWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

  const dates = eachDayOfInterval({
    start: startOfFirstWeek,
    end: lastDayOfMonth,
  });

  return dates.map((date) => {
    const isActive = date.getMonth() === firstDayOfMonth.getMonth();

    return {
      isActive,
      date,
      key: `${isActive}-${format(date, 'yyyy-MM-dd')}`,
    };
  });
};
