export interface Feedback {
  id: number;
  mentorship: {
    firstName: string;
    lastName: string;
  };
  rating: number;
  comments: string;
  date: string;
}

export const feedbackTableData: Feedback[] = [
  {
    id: 1,
    mentorship: {
      firstName: "Dr. Smith",
      lastName: "Sarah Johnson",
    },
    rating: 5,
    comments:
      "Sarah is showing excellent progress in understanding cardiology.",
    date: "2025-09-12",
  },
  {
    id: 2,
    mentorship: {
      firstName: "Dr. Adams",
      lastName: "Liam Brown",
    },
    rating: 4,
    comments:
      "Liam is attentive and asks insightful questions during sessions.",
    date: "2025-09-15",
  },
  {
    id: 3,
    mentorship: {
      firstName: "Dr. Chen",
      lastName: "Emily Davis",
    },
    rating: 5,
    comments:
      "Emily consistently performs well in clinical reasoning exercises.",
    date: "2025-09-20",
  },
  {
    id: 4,
    mentorship: {
      firstName: "Dr. Patel",
      lastName: "Noah Martinez",
    },
    rating: 3,
    comments: "Noah needs to focus more on pharmacology, but shows potential.",
    date: "2025-09-22",
  },
  {
    id: 5,
    mentorship: {
      firstName: "Dr. Lee",
      lastName: "Isabella Thompson",
    },
    rating: 4,
    comments: "Isabella has improved her diagnostic skills significantly.",
    date: "2025-09-25",
  },
  {
    id: 6,
    mentorship: {
      firstName: "Dr. O'Connor",
      lastName: "James Taylor",
    },
    rating: 5,
    comments:
      "James demonstrates a great attitude and excellent clinical judgment.",
    date: "2025-09-28",
  },
  {
    id: 7,
    mentorship: {
      firstName: "Dr. Gupta",
      lastName: "Olivia Wilson",
    },
    rating: 4,
    comments:
      "Olivia participates actively and brings good energy to discussions.",
    date: "2025-09-30",
  },
  {
    id: 8,
    mentorship: {
      firstName: "Dr. Müller",
      lastName: "Benjamin Moore",
    },
    rating: 3,
    comments: "Benjamin needs more practice with case presentations.",
    date: "2025-10-01",
  },
  {
    id: 9,
    mentorship: {
      firstName: "Dr. Kim",
      lastName: "Charlotte Garcia",
    },
    rating: 5,
    comments: "Charlotte is a quick learner and adapts well to new topics.",
    date: "2025-10-03",
  },
  {
    id: 10,
    mentorship: {
      firstName: "Dr. Ahmed",
      lastName: "Daniel Clark",
    },
    rating: 4,
    comments: "Daniel is developing strong communication skills with patients.",
    date: "2025-10-04",
  },
];
