import CommonHeader from "@/common/header/CommonHeader";
import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { BsDot } from "react-icons/bs";

// Define the interface for a single event
export interface Event {
  id: string;
  title?: string;
  name?: string;
  progress?: string;
  date?: string;
  time?: string;
  status: "registered" | string;
  dateTime?: string;
  price?: string;
  email?: string;
  iconColor?: string;
  textColor?: string;
}

// Props for EventCard
interface EventCardProps {
  event: Event;
}

// Reusable EventCard component
const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white p-5  flex justify-between border border-border rounded-xl">
      <div className="flex gap-5 items-center">
        <div
          className={`${event.iconColor} w-15 h-15 flex items-center justify-center rounded-full`}
        >
          <span className={` ${event.textColor} `}>
            <HiOutlineVideoCamera size={24} />
          </span>
        </div>
        <div className="">
          <CommonHeader className="!font-normal">{event.title}</CommonHeader>
          <CommonHeader className="!font-normal">{event.name}</CommonHeader>
          <CommonHeader className="!font-normal">{event.email}</CommonHeader>

          {event.dateTime && (
            <div className="flex ">
              <CommonHeader className="!font-normal">
                {event.dateTime}
              </CommonHeader>
              <span>
                <BsDot size={20} />
              </span>
              <CommonHeader className="!font-normal">{event.time}</CommonHeader>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <CommonHeader>{event.progress}</CommonHeader>
        <CommonHeader>{event.price}</CommonHeader>
        <CommonHeader>{event.status}</CommonHeader>
      </div>
    </div>
  );
};

export default EventCard;
