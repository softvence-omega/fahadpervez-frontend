import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../gamified-learning/types";
import EventPage from "./EventPage";
import StudyGroupPage from "./study-group-page/StudyGroupPage";
import SocialFeedPage from "./SocialFeedPage";
import MentorshipPage from "./MentorshipPage";
import ForumsPage from "./ForumsPage";
import MessagesPage from "./messages/MessagesPage";

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
  time?: string;
  description: string;
  price: string;
  status: "Free" | "Paid";
  featured?: boolean;
  startTime: string;
  endTime: string;
  color: string;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  subject: string;
  leader: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Community & Event", link: "/dashboard/community-event" },
  { name: "All Communities", link: "/dashboard/all-communities" },
];

const MedicalEventsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("event");
  const [activeEventFilter, setActiveEventFilter] = useState("All Event");
  const [isLoading, setIsLoading] = useState(true);

  const [events, setEvents] = useState<Event[]>([]);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEvents([
        {
          id: "1",
          title: "Free Webinar: How to Prepare for USMLE Step 1 in 3 Months",
          type: "PLAB Prep",
          date: "June 15, 2025",
          time: "5:00 PM GMT",
          description: "Dr. Maria Estevez - Internal Medicine, NYU",
          price: "Free",
          status: "Free",
          featured: true,
          startTime: "17:00",
          endTime: "18:30",
          color: "bg-blue-500",
        },
        {
          id: "2",
          title: "PLAB 1 Crash Webinar",
          type: "PLAB Prep",
          date: "June 20, 2025",
          description: "Intensive review session covering high-yield topics",
          price: "Free",
          status: "Free",
          startTime: "14:00",
          endTime: "16:00",
          color: "bg-red-500",
        },
      ]);

      setStudyGroups([
        {
          id: "1",
          name: "USMLE Step 1 Warriors",
          description: "Focused group for high-yield review",
          members: 45,
          subject: "USMLE Step 1",
          leader: "Dr. Alex Johnson",
        },
        {
          id: "2",
          name: "PLAB Prep Squad",
          description: "Daily practice questions and discussions",
          members: 32,
          subject: "PLAB 1",
          leader: "Sarah Lee",
        },
      ]);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PLAB Prep":
        return "bg-red-500";
      case "Workshop":
        return "bg-green-500";
      case "Conference":
        return "bg-purple-500";
      case "Telemedicine":
        return "bg-blue-500";
      case "Health Summit":
        return "bg-indigo-500";
      default:
        return "bg-gray-500";
    }
  };

  // ✅ Dynamic Tabs config
  const tabs = [
    { value: "social-feed", label: "Social Feed", content: <SocialFeedPage /> },
    {
      value: "event",
      label: "Events",
      content: (
        <EventPage
          events={events}
          activeEventFilter={activeEventFilter}
          setActiveEventFilter={setActiveEventFilter}
          eventFilters={["All Event", "Registered Event"]}
          isLoading={isLoading}
          getTypeColor={getTypeColor}
        />
      ),
    },
    {
      value: "study-group",
      label: "Study Groups",
      content: (
        <StudyGroupPage studyGroups={studyGroups} isLoading={isLoading} />
      ),
    },
    { value: "forums", label: "Forums", content: <ForumsPage /> },
    { value: "message", label: "Messages", content: <MessagesPage /> },
  ];

  return (
    <div className="my-6 md:my-10">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8 h-auto"
      >
        {/* ✅ Dynamic Tab List */}
        <TabsList className="grid w-full grid-cols-5 gap-2 bg-card rounded-lg p-1 h-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-md px-3 py-2 text-sm font-medium transition-all
                data-[state=active]:bg-blue-600 data-[state=active]:text-white
                hover:bg-blue-50"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ✅ Dynamic Tab Content */}
        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="mt-6 space-y-6"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MedicalEventsDashboard;
