import { eachDayOfInterval, subMonths, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format } from 'date-fns';

export const generateCalendarDaysByDate = (date) => {
   // Calculate the start and end of the active month
   const firstDayOfMonth = startOfMonth(date);
   const lastDayOfMonth = endOfMonth(date);
 
   // Calculate the start of the first week (Monday) for the active month
   const startOfFirstWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

   const dates = eachDayOfInterval({
       start: startOfFirstWeek,
       end: lastDayOfMonth,
   })

   return dates.map((date) => {
        const isActive = date.getMonth() === firstDayOfMonth.getMonth();

        return {
            isActive,
            date,
            key: `${isActive}-${format(date, 'yyyy-MM-dd')}`,
        }
   });
 
//    // Calculate the start of the first day to be included in the list
//    const startOfList = subMonths(startOfFirstWeek, 1); // Subtract one month to include previous month's days
 
//    // Calculate the end of the last day to be included in the list
//    const endOfList = addMonths(lastDayOfMonth, 1); // Add one month to include next month's days
 
//    const days = [];
//    let currentDate = startOfList;
 
//    // Generate 35 days for the list
//    for (let i = 0; i < 35; i++) {
//     const isActive = currentDate >= firstDayOfMonth && currentDate <= lastDayOfMonth;
//      days.push({
//        day: new Date(currentDate.getTime()),
//        key: `${isActive}-${format(currentDate, 'yyyy-MM-dd')}`,
//        isActive,
//      });
 
//      currentDate = addDays(currentDate, 1);
//    }
 
//    return days;
  };
