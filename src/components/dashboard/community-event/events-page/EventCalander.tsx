"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

const EventCalendar = () => {
  const [events] = useState([
    {
      id: "1",
      title: "Team Meeting",
      start: "2025-09-21T10:00:00",
      url: "https://meet.google.com",
      backgroundColor: "#cbd5f5", // light blue
    },
    {
      id: "2",
      title: "Health Summit",
      start: "2025-09-23T14:00:00",
      url: "https://healthsummit.com",
      backgroundColor: "#bbf7d0", // light green
    },
    {
      id: "3",
      title: "Telemedicine Checkup",
      start: "2025-09-25T09:00:00",
      url: "https://telemedicine.com",
      backgroundColor: "#f3e8ff", // light purple
    },
    {
      id: "4",
      title: "Product Demo",
      start: "2025-09-28T16:00:00",
      url: "https://zoom.com",
      backgroundColor: "#fde68a", // light yellow
    },
  ]);

  return (
    <div className="bg-white px-8 py-6 border border-gray-200 rounded-lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="500px"
        headerToolbar={{
          left: "prev next today",
          center: "title",
          right: "dayGridMonth dayGridWeek",
        }}
        eventContent={(eventInfo) => (
          <div className="text-xs leading-tight rounded bg-blue-200">
            <strong className="font-medium text-wrap">{eventInfo.event.title}</strong>
            <div>
              {new Date(eventInfo.event.start!).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            {eventInfo.event.url && (
              <a
                href={eventInfo.event.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                URL
              </a>
            )}
          </div>
        )}
      />
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
