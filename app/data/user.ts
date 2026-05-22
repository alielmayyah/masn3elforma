export interface User {
  id: string;
  membershipId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  age: number;
  height: number;
  currentWeight: number;
  goal: "muscle_gain" | "fat_loss" | "maintenance" | "recomposition";
  activityLevel: "beginner" | "intermediate" | "advanced";
  membershipType: "monthly" | "3_months" | "6_months" | "yearly";
  startDate: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  coach: string;
  profileImage: string;
  notes: string;
  inbodyId: string;
}

export const users: User[] = [
  {
    id: "18020",
    membershipId: "GYM2025001",
    firstName: "Ahmed",
    lastName: "Hassan",
    fullName: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    phone: "+20 101 234 5678",
    gender: "male",
    age: 26,
    height: 177,
    currentWeight: 90.4,
    goal: "muscle_gain",
    activityLevel: "intermediate",
    membershipType: "yearly",
    startDate: "2023-01-01",
    emergencyContact: {
      name: "Mohamed Hassan",
      phone: "+20 109 876 5432",
      relation: "Brother",
    },
    coach: "Capt. Mahmoud",
    profileImage: "",
    notes:
      "Focused on lean muscle gain and body recomposition. Consistent attendance and nutrition tracking.",
    inbodyId: "inbody_usr_001",
  },
  {
    id: "24301",
    membershipId: "GYM2025002",
    firstName: "Sara",
    lastName: "Khaled",
    fullName: "Sara Khaled",
    email: "sara.khaled@example.com",
    phone: "+20 102 345 6789",
    gender: "female",
    age: 29,
    height: 163,
    currentWeight: 62.1,
    goal: "fat_loss",
    activityLevel: "advanced",
    membershipType: "6_months",
    startDate: "2024-03-01",
    emergencyContact: {
      name: "Khaled Nasser",
      phone: "+20 111 222 3344",
      relation: "Father",
    },
    coach: "Coach Dina",
    profileImage: "",
    notes: "Targeting fat loss with cardio and strength training blend.",
    inbodyId: "inbody_usr_002",
  },
];

export const getUserById = (id: string): User | null => {
  return users.find((u) => u.id === id) ?? null;
};
