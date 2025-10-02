export interface OverviewData {
  id: number;
  plan: string | "Free" | "Standard" | "Premium" | "Elite";
  pricing: string;
  subscribers: number;
  revenue: string;
  isAvailable: boolean;
}

export const overviewData: OverviewData[] = [
  {
    id: 1,
    plan: "Free",
    pricing: "$0",
    subscribers: 1200,
    revenue: "$0",
    isAvailable: true,
  },
  {
    id: 2,
    plan: "Standard",
    pricing: "$20",
    subscribers: 850,
    revenue: "$17,000",
    isAvailable: true,
  },
  {
    id: 3,
    plan: "Premium",
    pricing: "$50",
    subscribers: 640,
    revenue: "$32,000",
    isAvailable: true,
  },
  {
    id: 4,
    plan: "Elite",
    pricing: "$99",
    subscribers: 420,
    revenue: "$41,580",
    isAvailable: true,
  },
  {
    id: 5,
    plan: "Free",
    pricing: "$0",
    subscribers: 900,
    revenue: "$0",
    isAvailable: false,
  },
  {
    id: 6,
    plan: "Standard",
    pricing: "$25",
    subscribers: 500,
    revenue: "$12,500",
    isAvailable: true,
  },
  {
    id: 7,
    plan: "Premium",
    pricing: "$60",
    subscribers: 300,
    revenue: "$18,000",
    isAvailable: false,
  },
  {
    id: 8,
    plan: "Elite",
    pricing: "$120",
    subscribers: 150,
    revenue: "$18,000",
    isAvailable: true,
  },
  {
    id: 9,
    plan: "Standard",
    pricing: "$30",
    subscribers: 750,
    revenue: "$22,500",
    isAvailable: true,
  },
  {
    id: 10,
    plan: "Premium",
    pricing: "$70",
    subscribers: 220,
    revenue: "$15,400",
    isAvailable: false,
  },
];

export interface SubscriptionData {
  id: number;
  user: string;
  plan: "Standard" | "Elite";
  status: "Active" | "Deactive";
  nextBilling: string; // date
  revenue: string;
}

export const subscriptionData: SubscriptionData[] = [
  {
    id: 1,
    user: "John Doe",
    plan: "Standard",
    status: "Active",
    nextBilling: "2025-10-15",
    revenue: "$120",
  },
  {
    id: 2,
    user: "Jane Smith",
    plan: "Elite",
    status: "Active",
    nextBilling: "2025-11-01",
    revenue: "$250",
  },
  {
    id: 3,
    user: "Michael Johnson",
    plan: "Standard",
    status: "Deactive",
    nextBilling: "2025-09-25",
    revenue: "$0",
  },
  {
    id: 4,
    user: "Emily Davis",
    plan: "Elite",
    status: "Active",
    nextBilling: "2025-10-20",
    revenue: "$300",
  },
  {
    id: 5,
    user: "Chris Brown",
    plan: "Standard",
    status: "Active",
    nextBilling: "2025-10-12",
    revenue: "$150",
  },
  {
    id: 6,
    user: "Sophia Wilson",
    plan: "Elite",
    status: "Active",
    nextBilling: "2025-11-05",
    revenue: "$280",
  },
  {
    id: 7,
    user: "David Miller",
    plan: "Standard",
    status: "Deactive",
    nextBilling: "2025-08-30",
    revenue: "$0",
  },
  {
    id: 8,
    user: "Olivia Garcia",
    plan: "Elite",
    status: "Active",
    nextBilling: "2025-10-18",
    revenue: "$260",
  },
  {
    id: 9,
    user: "James Martinez",
    plan: "Standard",
    status: "Active",
    nextBilling: "2025-10-22",
    revenue: "$140",
  },
  {
    id: 10,
    user: "Isabella Taylor",
    plan: "Elite",
    status: "Deactive",
    nextBilling: "2025-09-10",
    revenue: "$0",
  },
];
