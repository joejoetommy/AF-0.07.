'use client';

import React from 'react';
import Image from 'next/image';
import { TextRoll } from '@/components/core/text-roll';
import { Button } from '@/components/core/button';
import FooterSection from '@/components/core/footer';
import InformationPacks from '@/components/core/info';
import { Separator } from '@/components/core/separator';
import LabelIndicatorCarousel from '@/components/core/carousel';
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
  backgroundImage: '/cow.jpg', // must be inside /public
  profileImage: '/cowprofile.jpg', // must be inside /public
  username: 'AgriForce',
  title: 'Developing the Agricultural workforce of tomorrow',
  mission:
    'Advancing the frontiers of artificial intelligence through ethical research and practical applications. Committed to making AI accessible and beneficial for all while ensuring responsible development.',
  bio: 'Building the agricultural workforce of tomorrow through innovative training, sustainable practices, and community engagement. Empowering farmers with the skills and knowledge to thrive in a rapidly evolving industry.',
};

const Profile: React.FC = () => {
  return (
    <div className="container mx-auto p-1">
   
      <div className="flex justify-center mb-8">
 
        <div className="relative h-64 w-full">
          <Image
            src={profileData.backgroundImage}
            alt="Background Image"
            fill
            className="rounded w-full h-full object-cover"
            priority
          />

          <div className="absolute right-0 pr-6 transform bottom-[-64px]">
            <div className="border-4 border-white rounded-full w-32 h-32 overflow-hidden">
              <Image
                src={profileData.profileImage}
                alt="Profile"
                width={128}
                height={128}
                className="w-32 h-32 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

  
      <div className="relative w-full flex items-center">
        <div className="absolute left-2 pl-5 flex flex-col space-y-2">
          <TextRoll className="text-xl font-bold pt-8 text-green-500 dark:text-white">
            {profileData.username}
          </TextRoll>
        </div>
      </div>

      <div className="relative mt-8 px-6 sm:px-12 lg:px-16">
     
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gray-900/10" />

        <div className="relative mx-auto max-w-3xl flex flex-col items-center text-center py-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <TextRoll>Long-term thinking</TextRoll>
          </h2>
          <p className="mt-3 text-xl text-white">{profileData.bio}</p>

          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className="mt-6 px-10 py-2" variant="outline">
                  Our Story
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-black sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Agri-Force</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <p className="mt-1 text-xl text-white">{profileData.bio}</p>
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Exit</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>


      <div className="mt-8 mb-1">
        <LabelIndicatorCarousel />
      </div>


      <div className="mt-1 mb-1">
        <InformationPacks />
      </div>

    
      <Separator/>
      <FooterSection />
    </div>
  );
};

export default Profile;

