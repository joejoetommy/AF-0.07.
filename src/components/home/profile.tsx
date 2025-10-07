'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TextRoll } from '@/components/core/text-roll';
import { Button } from '@/components/core/button';
import FooterSection from '@/components/core/footer';
import InformationPacks from '@/components/core/info';
import { Separator } from '@/components/core/separator';
import LabelIndicatorCarousel from '@/components/core/carousel';
// ProfileLinks  
import ProfileLinks from '@/components/home/links';
import { Skeleton } from '@/components/core/skeleton';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/core/dialog';


const profileData = {
  backgroundImage: '/images/N13.png', // must be inside /public
   backgroundTitle: '/title.jpg',
  profileImage: '/images/N10.png', // must be inside /public
  //    profileImage: '/cowprofile.jpg', 
  username: 'AgriForce',
  title: 'Developing the Agricultural workforce of tomorrow',
  mission:
    'Advancing the frontiers of artificial intelligence through ethical research and practical applications. Committed to making AI accessible and beneficial for all while ensuring responsible development.',
  bio: 'Agri Force is a dairy recruitment company specialising in connecting farmers to permanent staff. Our mission is to bridge the gap between dedicated dairy farmers and skilled professionals, providing seamless recruitment solutions that simplify the hiring process. We aim to empower busy employers by connecting them with proven and experienced dairy workers and farm managers who share a passion for dairy farming. Our commitment is to enhance operational efficiency in the dairy industry, ensuring that every farmer has the support they need tk thrive in an increasingly demanding environment. Together, we cultivate a community of excellence in the dairy industry.',
};

const Profile: React.FC = () => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  return (
    <div className="container mx-auto p-1">
   
      <div className="flex justify-center mb-8">
 
        <div className="relative h-64 w-full">
          {/* Background Image Skeleton */}
          {!backgroundLoaded && (
            <Skeleton className="absolute inset-0 rounded w-full h-full" />
          )}
          
          <Image
            src={profileData.backgroundImage}
            alt="Background Image"
            fill
            className={`rounded w-full h-full object-cover transition-opacity duration-500 ${
              backgroundLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            priority
            onLoad={() => setBackgroundLoaded(true)}
          />

<div className="absolute right-0 pr-6 transform bottom-[-64px] z-20"> 
  <div className="border-4 border-white rounded-full w-32 h-32 overflow-hidden relative">
    {/* Profile Image Skeleton */}
    {!profileLoaded && (
      <Skeleton className="absolute inset-0 rounded-full w-full h-full" />
    )}
    
    <Image
      src={profileData.profileImage}
      alt="Profile"
      width={128}
      height={128}
      className={`w-32 h-32 object-cover transition-opacity duration-500 ${
        profileLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      onLoad={() => setProfileLoaded(true)}
    />
  </div>
</div>



        </div>
      </div>

  
      <div className="relative w-full flex items-center">
        <div className="absolute left-2 pl-5 flex flex-col space-y-2">
          {/* <TextRoll className="text-xl font-bold pt-8 text-green-500 dark:text-white">
            {profileData.username}
          </TextRoll> */}
        </div>
      </div>

<div className="relative mt-1 px-1 sm:px-2 lg:px-3">
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gray-900/10" />

  <div className="relative mx-auto max-w-3xl flex flex-col items-center text-center py-1">
    <div className="relative w-full h-48 z-10"> 
      <Image
        src={profileData.backgroundTitle}
        alt="Background Image"
        fill
        className={`rounded object-contain transition-opacity duration-500 ${
          backgroundLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority
        onLoad={() => setBackgroundLoaded(true)}
      />
    </div>
  </div>
</div>


      <div className="mt-1 mb-1">
        <ProfileLinks />
      </div>

      <div className="mt-1 mb-1">
        <InformationPacks />
      </div>
      
      <div className="mt-8 mb-1">
        <LabelIndicatorCarousel />
      </div>

    
      <Separator/>
      <FooterSection />
    </div>
  );
};

export default Profile;