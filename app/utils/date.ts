import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  format,
} from 'date-fns';
import { CalendarRange } from 'types';

export const generateCalendarDaysByDate = (date: Date): CalendarRange => {
  const { start, end } = getRange(date);

  const dates = eachDayOfInterval({
    start,
    end,
  });

  const days = dates.map((date) => {
    const isActive = date.getMonth() === end.getMonth();
    const key = format(date, 'yyyy-MM-dd');

    return {
      isActive,
      date,
      key,
      propKey: `${+isActive}-${key}`,
    };
  });

  return {
    days,
    start,
    end,
  };
};

export function getRange(date: Date): { start: Date; end: Date } {
  // Calculate the start and end of the active month
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);

  // Calculate the start of the first week (Monday) for the active month
  const startOfFirstWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

  return {
    start: startOfFirstWeek,
    end: lastDayOfMonth,
  };
}
