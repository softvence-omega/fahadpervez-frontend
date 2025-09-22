import { Button } from "@/components/ui/button";
import React from "react";

interface Event {
  id: string;
  title: string;
  type:
    | "PLAB Prep"
    | "Workshop"
    | "Conference"
    | "Telemedicine"
    | "Health Summit";
  date: string;
  description: string;
  price: string;
  status: "Free" | "Paid";
}

interface UpcomingEventsCardProps {
  event: Event;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "PLAB Prep":
      return "bg-red-200 text-red-800";
    case "Workshop":
      return "bg-green-200 text-green-800";
    case "Conference":
      return "bg-purple-200 text-purple-800";
    case "Telemedicine":
      return "bg-blue-200 text-blue-800";
    case "Health Summit":
      return "bg-indigo-200 text-indigo-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({ event }) => {
  return (
    <div className="hover:shadow-md transition-shadow border border-gray-200 p-4 md:p-6 rounded-xl">
      <div className="pb-2">
        <div className="flex items-start justify-between">
          <p
            className={`text-sm px-2 py-1 rounded-full ${getTypeColor(
              event.type
            )}`}
          >
            {event.type}
          </p>

          <div className="text-sm text-muted-foreground">{event.date}</div>
        </div>
      </div>
      <div className="space-y-2 pt-4">
        <h3 className="font-semibold line-clamp-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className={`font-bold ${
              event.status === "Free" ? "text-green-600" : "text-blue-600"
            }`}
          >
            {event.price}
          </span>
          <Button variant="default" size="sm">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventsCard;
