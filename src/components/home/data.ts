
// Profile data type definition
export interface ProfileData {
  number: number;
  backgroundImage: string;
  profileImage: string;
  username: string; // max 20 characters
  title: string; // max 40 characters
  mission: string; // max 250 characters
  addedDate: string;
}

// Example profile data
export const profileData: ProfileData[] = [
  {
    number: 1,
    backgroundImage: "#FF6B6B", // Coral red
    profileImage: "#4ECDC4", // Turquoise
    username: "CryptoExplorer",
    title: "Blockchain Innovation PioneerInno",
    mission: "Dedicated to exploring cutting-edge blockchain technologies and fostering decentralized solutions for a more transparent future. Building bridges between traditional finance and the crypto ecosystem.",
    addedDate: "2023-06-12T08:00:00Z"
  },
  
];

// Function to add new profile data
export function addProfileData(newProfile: Omit<ProfileData, 'number'>): ProfileData {
  const nextNumber = profileData.length + 1;
  const profileWithNumber = {
    ...newProfile,
    number: nextNumber
  };
  profileData.push(profileWithNumber);
  return profileWithNumber;
}

// Validation functions
export function validateUsername(username: string): boolean {
  return username.length <= 20;
}

export function validateTitle(title: string): boolean {
  return title.length <= 40;
}

export function validateMission(mission: string): boolean {
  return mission.length <= 250;
}

