export interface OverviewTable {
  id: number;
  mentorName: string;
  studentNames: string;
  totalSessions: number;
  totalRevenue: string;
  nextSession: string;
}

export const overviewTableData: OverviewTable[] = [
  {
    id: 1,
    mentorName: "Alice Johnson",
    studentNames: "Alex Chen, Michael Brown, Emily Davis, 3+More",
    totalSessions: 20,
    totalRevenue: "1000$",
    nextSession: "2025-09-12",
  },
  {
    id: 2,
    mentorName: "James Smith",
    studentNames: "Sophia Lee, Ethan Kim, Ava Thompson, 2+More",
    totalSessions: 15,
    totalRevenue: "850$",
    nextSession: "2025-10-08",
  },
  {
    id: 3,
    mentorName: "Maria Garcia",
    studentNames: "Olivia Wilson, Jack Miller, Mia Anderson, 4+More",
    totalSessions: 25,
    totalRevenue: "1250$",
    nextSession: "2025-10-15",
  },
  {
    id: 4,
    mentorName: "Robert Davis",
    studentNames: "Lucas Martinez, Emma Taylor, Liam Moore, 1+More",
    totalSessions: 10,
    totalRevenue: "500$",
    nextSession: "2025-10-20",
  },
  {
    id: 5,
    mentorName: "Emily Thompson",
    studentNames: "Noah White, Isabella Martin, Mason Hall, 3+More",
    totalSessions: 30,
    totalRevenue: "1500$",
    nextSession: "2025-10-05",
  },
  {
    id: 6,
    mentorName: "Daniel Lee",
    studentNames: "Charlotte Harris, Benjamin Young, 2+More",
    totalSessions: 18,
    totalRevenue: "900$",
    nextSession: "2025-10-12",
  },
  {
    id: 7,
    mentorName: "Olivia Martinez",
    studentNames: "James Walker, Harper Allen, Ella King, 2+More",
    totalSessions: 22,
    totalRevenue: "1100$",
    nextSession: "2025-09-30",
  },
  {
    id: 8,
    mentorName: "William Taylor",
    studentNames: "Amelia Scott, Elijah Wright, 5+More",
    totalSessions: 35,
    totalRevenue: "1750$",
    nextSession: "2025-10-25",
  },
  {
    id: 9,
    mentorName: "Isabella Wilson",
    studentNames: "Logan Adams, Grace Nelson, Chloe Baker",
    totalSessions: 12,
    totalRevenue: "600$",
    nextSession: "2025-10-18",
  },
  {
    id: 10,
    mentorName: "Liam Harris",
    studentNames: "Zoe Rivera, Jacob Campbell, Lily Mitchell, 1+More",
    totalSessions: 28,
    totalRevenue: "1400$",
    nextSession: "2025-10-11",
  },
];
