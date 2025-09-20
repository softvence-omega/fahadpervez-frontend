import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // ✅ use ShadCN badge, not lucide
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
        return "bg-red";
      case "Workshop":
        return "bg-green";
      case "Conference":
        return "bg-purple";
      case "Telemedicine":
        return "bg-blue";
      case "Health Summit":
        return "bg-indigo";
      default:
        return "bg-gray";
    }
  };

const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({
  event,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Badge
            className={`text-xs ${getTypeColor(
              event.type
            )} !text-white !bg-opacity-90`}
          >
            {event.type}
          </Badge>

          <div className="text-sm text-muted-foreground">{event.date}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 p-4">
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
      </CardContent>
    </Card>
  );
};

export default UpcomingEventsCard;
