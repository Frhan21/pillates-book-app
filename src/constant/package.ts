interface Package {
  id: string;
  name: string;
  description: string;
  duration: string;
  features: string[];
  fixedPrice: number;
  popular: boolean;
}

export const packages: Package[] = [
  {
    id: "single-session",
    name: "Single Session",
    description: "Perfect for trying pilates",
    duration: "60 minutes",
    features: [
      "Full session with instructor",
      "All equipment included",
      "Access to locker room",
    ],
    fixedPrice: 35000,
    popular: false,
  },
  {
    id: "class-pack-5",
    name: "Class Pack (5 Sessions)",
    description: "Great value, valid for 3 months",
    duration: "60 minutes each",
    features: [
      "5 sessions included",
      "All equipment provided",
      "Flexible scheduling",
      "Save $35 total",
    ],
    fixedPrice: 135000,
    popular: false,
  },
  {
    id: "monthly-unlimited",
    name: "Monthly Unlimited",
    description: "Best value for regular practice",
    duration: "Unlimited access",
    features: [
      "Unlimited sessions",
      "Priority booking",
      "Guest passes included",
      "Member benefits",
    ],
    fixedPrice: 119000,
    popular: true,
  },
];
