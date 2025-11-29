import { Button } from "@/components/ui/button";
import { Clock, Video } from "lucide-react";

// interface Event {
//   id: string;
//   title: string;
//   type:
//     | "PLAB Prep"
//     | "Workshop"
//     | "Conference"
//     | "Telemedicine"
//     | "Health Summit";
//   date: string;
//   time?: string;
//   description: string;
//   price: string;
//   status: "Free" | "Paid";
//   featured?: boolean;
//   startTime: string;
//   endTime: string;
//   color: string;
//   speakerName?: string; // optional for now
//   speakerRole?: string;
//   speakerImage?: string;
//   platform?: string;
// }

// types/event.api.ts

export interface IEvent {
  _id: string;
  eventTitle: string;
  eventType: string; // "Webinar" | others from backend
  eventFormat: string; // "Online" | "Offline"
  category: string;
  description: string;
  eventData?: string;
  startTime: string; // ISO string
  eventDuration: string; // "2 hours"
  instructor: string;
  eventPrice: number;
  meetingDetails?: string;
  status: string; // "Up-Coming"
  totalRegistrations: number;
  createdAt: string;
  updatedAt: string;
}

// const getTypeColor = (type: Event["type"]) => {
//   switch (type) {
//     case "PLAB Prep":
//       return "bg-red-100 text-red-600";
//     case "Workshop":
//       return "bg-green-100 text-green-600";
//     case "Conference":
//       return "bg-purple-100 text-purple-600";
//     case "Telemedicine":
//       return "bg-blue-100 text-blue-600";
//     case "Health Summit":
//       return "bg-indigo-100 text-indigo-600";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// };

const UpcomingEventsCard = ({ event }: { event: IEvent }) => {
  console.log(" event: ", event);

  const start = new Date(event.startTime);
  const date = start.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = start.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // ${getTypeColor(event.eventType)}

  return (
    <div className="hover:shadow-md transition-shadow border border-gray-200 p-4 rounded-xl bg-white flex flex-col justify-between">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-2">
        <span
            className={`px-2 py-1 rounded-full text-xs font-medium bg-[#FEE2E2] text-[#B91C1C]`}  
        >
          {event.eventType}
        </span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2">{event.eventTitle}</h3>

      {/* Speaker Info */}
      <div className="flex items-center gap-2 mb-3">
        <img
          src={"/image/avatar.jpg"}
          alt={"instructor image"}
          className="w-10 h-10 rounded-full object-cover"
        />
        {/* <img
          src={event.speakerImage || "/image/avatar.jpg"}
          alt={event.speakerName}
          className="w-10 h-10 rounded-full object-cover"
        /> */}
        <div>
          <p className="text-md font-medium text-gray-800">
            {event.instructor}
          </p>
          <p className="text-xs text-gray-500">{event.category}</p>
        </div>
      </div>

      {/* Time & Platform */}
      <div className="mb-1.5 border-t pt-2 border-gray-200">
        <div className="flex items-center gap-4 text-[.8rem] text-gray-600">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {time}
          </span>
          <span className="flex items-center gap-1">
            <Video size={14} /> {event.eventData}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[.75rem] text-gray-500 mb-3">{event.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <Button
          variant="link"
          size="sm"
          className="text-blue-600 px-0 hover:scale-110 transition-transform"
        >
          Register
        </Button>
        <span
          className={`text-sm font-medium ${
            event.status === "Free" ? "text-purple-600" : "text-blue-600"
          }`}
        >
          {event.eventPrice}
        </span>
      </div>
    </div>
  );
};

export default UpcomingEventsCard;
