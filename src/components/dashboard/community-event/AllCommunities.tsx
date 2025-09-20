import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../gamified-learning/types";
import EventPage from "./EventPage";
import StudyGroupPage from "./study-group-page/StudyGroupPage";
import SocialFeedPage from "./SocialFeedPage";
import MentorshipPage from "./MentorshipPage";
import ForumsPage from "./ForumsPage";

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

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  date: string;
}

interface Mentor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  rating: number;
}

interface ForumThread {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastPost: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Community & Event", link: "/dashboard/community-event" },
  { name: "All Communities", link: "/dashboard/all-communities" },
];

const MedicalEventsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Event");
  const [activeEventFilter, setActiveEventFilter] = useState("All Event");
  const [isLoading, setIsLoading] = useState(true);

  const tabs = ["Event", "Study Group", "Social Feed", "Mentorship", "Forums"];

  const eventFilters = ["All Event", "Registered Event"];

  // Dynamic data fetching simulation
  const [events, setEvents] = useState<Event[]>([]);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [threads, setThreads] = useState<ForumThread[]>([]);

  React.useEffect(() => {
    // Simulate API calls for dynamic data
    const fetchData = async () => {
      setIsLoading(true);
      // Mock delay for API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dynamic events (removed calendar-specific events, now just upcoming/featured)
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
        {
          id: "3",
          title: "Free Suturing Workshop",
          type: "Workshop",
          date: "July 10, 2025",
          description: "Learn basic surgical techniques online",
          price: "Free",
          status: "Free",
          startTime: "10:00",
          endTime: "12:00",
          color: "bg-green-500",
        },
        {
          id: "4",
          title: "Global Student Conference",
          type: "Conference",
          date: "Aug 15, 2025",
          description: "Network with students worldwide",
          price: "$25",
          status: "Paid",
          startTime: "09:00",
          endTime: "17:00",
          color: "bg-purple-500",
        },
        {
          id: "5",
          title: "Global Student Network Summit",
          type: "Conference",
          date: "Aug 20, 2025",
          description: "Network with medical professionals",
          price: "$50",
          status: "Paid",
          startTime: "08:00",
          endTime: "18:00",
          color: "bg-indigo-500",
        },
      ]);

      // Dynamic study groups
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

      // Dynamic posts
      setPosts([
        {
          id: "1",
          title: "Just crushed my mock exam!",
          content: "Sharing my study tips for everyone...",
          author: "John Doe",
          likes: 23,
          comments: 5,
          date: "Sep 14, 2025",
        },
        {
          id: "2",
          title: "Best resources for anatomy?",
          content: "Looking for recommendations...",
          author: "Jane Smith",
          likes: 15,
          comments: 8,
          date: "Sep 13, 2025",
        },
      ]);

      // Dynamic mentors
      setMentors([
        {
          id: "1",
          name: "Dr. Maria Estevez",
          specialty: "Internal Medicine",
          experience: "10+ years at NYU",
          availability: "Wednesdays 2-4 PM",
          rating: 4.9,
        },
        {
          id: "2",
          name: "Dr. Raj Patel",
          specialty: "Surgery",
          experience: "15 years in residency training",
          availability: "Fridays 10 AM-12 PM",
          rating: 4.8,
        },
      ]);

      // Dynamic forum threads
      setThreads([
        {
          id: "1",
          title: "How to balance study and clinical rotations?",
          author: "StudentMD2026",
          replies: 12,
          views: 156,
          lastPost: "2 hours ago",
        },
        {
          id: "2",
          title: "Recommended books for PLAB 2",
          author: "FutureDoc",
          replies: 7,
          views: 89,
          lastPost: "1 day ago",
        },
      ]);

      setIsLoading(false);
    };

    fetchData();
  }, []);

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

  return (
    <div className="my-6 md:my-10">
      {/* Header */}

      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div>
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 bg-card ">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Tab Contents */}
        <Tabs value={activeTab}>
          <TabsContent value="Event" className="space-y-6">
            <EventPage
              events={events}
              activeEventFilter={activeEventFilter}
              setActiveEventFilter={setActiveEventFilter}
              eventFilters={eventFilters}
              isLoading={isLoading}
              getTypeColor={getTypeColor}
            />
          </TabsContent>
          <TabsContent value="Study Group" className="space-y-6">
            <StudyGroupPage studyGroups={studyGroups} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="Social Feed" className="space-y-6">
            <SocialFeedPage posts={posts} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="Mentorship" className="space-y-6">
            <MentorshipPage mentors={mentors} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="Forums" className="space-y-6">
            <ForumsPage threads={threads} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MedicalEventsDashboard;
