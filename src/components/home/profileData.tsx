// This would be profile number 6 when added
// profiledata.ts - Updated data management file
import { profileData as exampleProfiles } from '@/components/home/data';

// Constant xpub
export const xpub = "02f31c1bf421e450a248d01856986f1a781c7e02ff9a8c4d4797b7db4f64384b50";

// Profile data interface matching your components
export interface ProfileData {
  backgroundImage: string;
  profileImage: string;
  Profile: {
    username: string;
    title: string;
    mision: string; // keeping your spelling
  };
  xpub?: string;
}

// Extended profile data with number
export interface NumberedProfileData extends ProfileData {
  number: number;
}

// Storage key for localStorage (in real app, use a database)
const PROFILE_STORAGE_KEY = 'userProfiles';
const CURRENT_PROFILE_KEY = 'currentProfileNumber';

// In-memory storage for demo (replace with actual storage in production)
let profilesCache: NumberedProfileData[] | null = null;
let currentProfileCache: number | null = null;

// Initialize profiles if not exists
const initializeProfiles = (): NumberedProfileData[] => {
  if (profilesCache) return profilesCache;
  
  // For demo, initialize with example profiles
  const initialProfiles: NumberedProfileData[] = exampleProfiles.map(profile => ({
    number: profile.number,
    backgroundImage: profile.backgroundImage,
    profileImage: profile.profileImage,
    Profile: {
      username: profile.username,
      title: profile.title,
      mision: profile.mission // mapping mission to mision
    },
    xpub: xpub
  }));
  
  profilesCache = initialProfiles;
  return initialProfiles;
};

// Get all profiles
export const getAllProfiles = (): NumberedProfileData[] => {
  return initializeProfiles();
};

// Get current profile number
export const getCurrentProfileNumber = (): number => {
  if (currentProfileCache !== null) return currentProfileCache;
  currentProfileCache = 1;
  return currentProfileCache;
};

// Set current profile number
export const setCurrentProfileNumber = (number: number): void => {
  currentProfileCache = number;
};

// Get current profile data
export const getProfileData = (): ProfileData => {
  const profiles = getAllProfiles();
  const currentNumber = getCurrentProfileNumber();
  const profile = profiles.find(p => p.number === currentNumber);
  
  if (!profile) {
    // Return first profile or default if not found
    return profiles[0] || {
      backgroundImage: '#FF6B6B',
      profileImage: '#4ECDC4',
      Profile: {
        username: 'DefaultUser',
        title: 'Default Title',
        mision: 'Default mission'
      },
      xpub: xpub
    };
  }
  
  // Return without the number field to match ProfileData interface
  const { number, ...profileWithoutNumber } = profile;
  return profileWithoutNumber;
};

// Update profile data (updates existing or creates new)
export const updateProfileData = (data: ProfileData): number => {
  const profiles = getAllProfiles();
  const currentNumber = getCurrentProfileNumber();
  
  // Find if we're updating an existing profile
  const existingIndex = profiles.findIndex(p => p.number === currentNumber);
  
  if (existingIndex !== -1) {
    // Update existing profile
    profiles[existingIndex] = {
      ...data,
      number: currentNumber,
      xpub: xpub
    };
  } else {
    // Create new profile with next number
    const nextNumber = Math.max(...profiles.map(p => p.number), 0) + 1;
    profiles.push({
      ...data,
      number: nextNumber,
      xpub: xpub
    });
    setCurrentProfileNumber(nextNumber);
    profilesCache = profiles;
    return nextNumber;
  }
  
  profilesCache = profiles;
  return currentNumber;
};

// Create a completely new profile (always creates new, never updates)
// export const createNewProfile = (data: ProfileData): number => {
//   const profiles = getAllProfiles();
//   const nextNumber = Math.max(...profiles.map(p => p.number), 0) + 1;
  
//   profiles.push({
//     ...data,
//     number: nextNumber,
//     xpub: xpub
//   });
  
//   setCurrentProfileNumber(nextNumber);
//   profilesCache = profiles;
//   return nextNumber;
// };

// Switch to a different profile
// export const switchToProfile = (number: number): boolean => {
//   const profiles = getAllProfiles();
//   const profile = profiles.find(p => p.number === number);
  
//   if (profile) {
//     setCurrentProfileNumber(number);
//     return true;
//   }
//   return false;
// };

// Delete a profile
// export const deleteProfile = (number: number): boolean => {
//   const profiles = getAllProfiles();
//   const filteredProfiles = profiles.filter(p => p.number !== number);
  
//   if (filteredProfiles.length < profiles.length) {
//     profilesCache = filteredProfiles;
    
//     // If we deleted the current profile, switch to another
//     if (getCurrentProfileNumber() === number && filteredProfiles.length > 0) {
//       setCurrentProfileNumber(filteredProfiles[0].number);
//     }
    
//     return true;
//   }
//   return false;
// };

// Get profile by number
// export const getProfileByNumber = (number: number): NumberedProfileData | null => {
//   const profiles = getAllProfiles();
//   return profiles.find(p => p.number === number) || null;
// };





