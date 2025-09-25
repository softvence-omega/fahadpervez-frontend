import { useState } from "react";
import CalendarHeader from "./calanderComponents/CalendarHeader";
import WeekDays from "./calanderComponents/WeekDays";
import CalendarDay from "./calanderComponents/CalendarDay";
import { Event, DayObj } from "./calanderComponents/types";

const EventCalendar = () => {
  const today = new Date();
  today.setHours(0,0,0,0);

  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  
  const [events] = useState<Event[]>([
    { id: "1", title: "Team Meeting", start: "2025-09-21T10:00:00", url: "https://meet.google.com", backgroundColor: "#cbd5f5" },
    { id: "2", title: "Health Summit", start: "2025-09-23T14:00:00", url: "https://healthsummit.com", backgroundColor: "#bbf7d0" },
    { id: "3", title: "Telemedicine Checkup", start: "2025-09-25T09:00:00", url: "https://telemedicine.com", backgroundColor: "#f3e8ff" },
    { id: "4", title: "Product Demo", start: "2025-09-28T16:00:00", url: "https://zoom.com", backgroundColor: "#fde68a" },
    { id: "5", title: "Conference Call", start: "2025-10-15T11:00:00", url: "https://teams.microsoft.com", backgroundColor: "#fed7aa" },
    { id: "6", title: "Workshop", start: "2025-10-20T13:00:00", url: "https://workshop.com", backgroundColor: "#ddd6fe" },
  ]);

  const getDaysInMonth = (date: Date): DayObj[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days: DayObj[] = [];
    const adjustedStartingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = adjustedStartingDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false, isPrevMonth: true, date: new Date(year, month - 1, prevMonthDays - i) });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true, isPrevMonth: false, date: new Date(year, month, day) });
    }

    let nextMonthDay = 1;
    while (days.length < 42) {
      days.push({ day: nextMonthDay, isCurrentMonth: false, isPrevMonth: false, date: new Date(year, month + 1, nextMonthDay) });
      nextMonthDay++;
    }

    return days;
  };

  const isToday = (dayObj: DayObj) => dayObj.date.toDateString() === today.toDateString();

  const getWeekNumber = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const goToPreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const goToToday = () => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white px-8 py-6 border border-gray-200 rounded-lg w-full">
      <div className="rounded-lg overflow-hidden bg-white">
        <CalendarHeader
          currentDate={currentDate}
          goToPreviousMonth={goToPreviousMonth}
          goToNextMonth={goToNextMonth}
          goToToday={goToToday}
        />
        <WeekDays />
        <div className="grid grid-cols-7 bg-white">
          {days.map((dayObj, index) => (
            <CalendarDay
              key={index}
              dayObj={dayObj}
              events={events}
              isToday={isToday}
              getWeekNumber={getWeekNumber}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;



// import { useState } from "react";

// const EventCalendar = () => {
//   const [currentDate] = useState(new Date(2025, 7, 1)); // August 2025

//   const events = [
//     {
//       id: "1",
//       title: "Telemedicine",
//       date: 28, // July 28 (previous month)
//       time: "10:00am",
//       color: "bg-cyan-200",
//       url: "URL",
//     },
//     {
//       id: "2",
//       title: "Health Summit",
//       date: 5,
//       time: "10:00am",
//       color: "bg-cyan-200",
//       url: "URL",
//     },
//     {
//       id: "3",
//       title: "Telemedicine",
//       date: 9,
//       time: "10:00am",
//       color: "bg-purple-200",
//       url: "URL",
//     },
//   ];

//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const getDaysInMonth = (date: Date) => {
//     return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//   };

//   const getFirstDayOfMonth = (date: Date) => {
//     const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//     return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
//   };

//   const getPreviousMonthDays = (date: Date) => {
//     const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 0);
//     return prevMonth.getDate();
//   };

//   const renderCalendarDays = () => {
//     const daysInMonth = getDaysInMonth(currentDate);
//     const firstDay = getFirstDayOfMonth(currentDate);
//     const prevMonthDays = getPreviousMonthDays(currentDate);
//     const days = [];

//     // Previous month days
//     for (let i = firstDay - 1; i >= 0; i--) {
//       const day = prevMonthDays - i;
//       const dayEvents = events.filter(
//         (event) => event.date === day && event.id === "1"
//       ); // Only July events
//       days.push(
//         <div
//           key={`prev-${day}`}
//           className="h-24 border-r border-b border-gray-200 p-1 text-gray-400 text-sm relative"
//         >
//           <span className="absolute top-1 left-2">{day}</span>
//           {dayEvents.map((event) => (
//             <div
//               key={event.id}
//               className={`${event.color} rounded text-xs p-1 mt-4 text-gray-700`}
//             >
//               <div className="font-medium">{event.title}</div>
//               <div>{event.time}</div>
//               <div className="text-blue-600 underline">{event.url}</div>
//             </div>
//           ))}
//         </div>
//       );
//     }

//     // Current month days
//     for (let day = 1; day <= daysInMonth; day++) {
//       const dayEvents = events.filter(
//         (event) => event.date === day && event.id !== "1"
//       );
//       days.push(
//         <div
//           key={day}
//           className="h-24 border-r border-b border-gray-200 p-1 text-sm relative"
//         >
//           <span className="absolute top-1 left-2 font-medium">{day}</span>
//           {dayEvents.map((event) => (
//             <div
//               key={event.id}
//               className={`${event.color} rounded text-xs p-1 mt-4 text-gray-700`}
//             >
//               <div className="font-medium">{event.title}</div>
//               <div>{event.time}</div>
//               <div className="text-blue-600 underline">{event.url}</div>
//             </div>
//           ))}
//         </div>
//       );
//     }

//     // Next month days to fill the grid
//     const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
//     const remainingCells = totalCells - (firstDay + daysInMonth);

//     for (let day = 1; day <= remainingCells; day++) {
//       days.push(
//         <div
//           key={`next-${day}`}
//           className="h-24 border-r border-b border-gray-200 p-1 text-gray-400 text-sm relative"
//         >
//           <span className="absolute top-1 left-2">{day}</span>
//         </div>
//       );
//     }

//     return days;
//   };

//   const getWeekNumbers = () => {
//     const firstDay = getFirstDayOfMonth(currentDate);
//     const daysInMonth = getDaysInMonth(currentDate);
//     const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
//     const weeks = totalCells / 7;

//     return Array.from({ length: weeks }, (_, i) => 31 + i); // Starting from week 31
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">
//           {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//         </h1>
//       </div>

//       {/* Calendar Grid */}
//       <div className="grid grid-cols-8 border-l border-t border-gray-200">
//         {/* Week numbers column header */}
//         <div className="h-10 border-r border-b border-gray-200"></div>

//         {/* Day headers */}
//         {dayNames.map((day) => (
//           <div
//             key={day}
//             className="h-10 border-r border-b border-gray-200 flex items-center justify-center text-sm font-medium text-gray-600"
//           >
//             {day}
//           </div>
//         ))}

//         {/* Week rows */}
//         {getWeekNumbers().map((weekNum, weekIndex) => (
//           <div key={weekNum} className="contents">
//             {/* Week number */}
//             <div className="h-24 border-r border-b border-gray-200 flex items-center justify-center text-xs text-gray-400 bg-gray-50">
//               {weekNum}
//             </div>

//             {/* Days for this week */}
//             {renderCalendarDays().slice(weekIndex * 7, (weekIndex + 1) * 7)}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventCalendar;
