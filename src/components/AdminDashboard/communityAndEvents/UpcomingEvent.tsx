import CommonHeader from "@/common/header/CommonHeader";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import EventCard from "./EventCard";
const UpcomingEvents = [
  {
    id: "1",
    title: "Advanced Cardiology Seminar",
    progress: "78/100",
    date: "2024-02-15",
    time: "14:00",
    dateTime: "2024-02-15",
    status: "registered",
    iconColor: "bg-[#DBEAFE]",
    textColor: "text-[#1D4ED8]",
  },
  {
    id: "1",
    title: "Advanced Cardiology Seminar",
    progress: "78/100",
    date: "2024-02-15",
    time: "14:00",
    dateTime: "2024-02-15",
    status: "registered",
    iconColor: "bg-[#DBEAFE]",
    textColor: "text-[#1D4ED8]",
  },
];
const registrations = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    price: "$9.99",
    status: "registered",
    iconColor: "bg-[#DCFCE7]",
    textColor: "text-[#15803D]",
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@example.com",
    price: "$9.99",
    status: "registered",
    iconColor: "bg-[#DCFCE7]",
    textColor: "text-[#15803D]",
  },
];

const UpcomingEvent = () => {
  return (
    <div className=" grid grid-cols-1 xl:grid-cols-2 gap-6">
      <CommonBorderWrapper className=" flex flex-col gap-4">
        <CommonHeader className="sm:!mb-9">Upcoming Events</CommonHeader>
        {UpcomingEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </CommonBorderWrapper>
      <CommonBorderWrapper className=" flex flex-col gap-4">
        <CommonHeader className="sm:!mb-9">Recent Registrations</CommonHeader>
        {registrations.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </CommonBorderWrapper>
    </div>
  );
};

export default UpcomingEvent;
