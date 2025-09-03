'use client';
import React from 'react';
import Image from 'next/image';
import { TextRoll } from '@/components/core/text-roll';
import { Label } from "@/components/core/label"
import { Input } from "@/components/core/input"
import { Button } from "@/components/core/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/core/dialog"

// Static data placed directly inside the component file
const profileData = {
  backgroundImage: '/cow.jpg',       // must be inside /public    border-borde
  profileImage: '/cowprofile.jpg',   // must be inside /public
  username: 'AgriForce',
  title: 'Developing the Agricultural workforce of tomorrow',
  mission:
    'Advancing the frontiers of artificial intelligence through ethical research and practical applications. Committed to making AI accessible and beneficial for all while ensuring responsible development.',
    bio: 'Building the agricultural workforce of tomorrow through innovative training, sustainable practices, and community engagement. Empowering farmers with the skills and knowledge to thrive in a rapidly evolving industry.'

};

const Profile: React.FC = () => {
  return (
    <div className="container mx-auto p-1">
      {/* Background + Profile Image */}
      <div className="flex justify-center mb-">
        <div className="relative h-64 w-full">
          <Image
            src={profileData.backgroundImage}
            alt="Background Image"
            fill
            className="rounded w-full h-full object-cover"
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

      {/* Username + Title */}
      <div className="relative w-full flex items-center">
        <div className="absolute pl-5 left-2 flex flex-col space-y-2">
          <p className="text-xxl text-black font-bold cursor-pointer">
            {profileData.username}
          </p>
          {/* <p className="text-xl font-bold pt-2">{profileData.title}</p> */}
              <TextRoll className='text-xl font-bold pt-2 text-black dark:text-white'>
      {profileData.title}
    </TextRoll>
        </div>
      </div>

      {/* Mission */}
      <div className="w-full pt-12">
        <div className="flex w-full mt-4">
          <div className="flex-1 flex justify-center items-center p-3">
            <div className="flex items-center space-x-3 mb-2">
              <p className="text-md line-clamp-4 overflow-hidden">
              
              </p>
              <div className='max-w-96'>
            <p className=''>
              <strong className='font-medium'>
             
              </strong>{' '}
                  {/* {profileData.bio} */}
            </p>
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary section */}
      <div className="relative bg-transparent pr-32 pl-32 px-6 sm:py-40 sm:px-12 lg:px-16">
      <div className="absolute inset-0 overflow-hidden">
        {/* <img
          src="https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg"
          alt=""
          className="w-full h-full object-center object-cover"
        /> */}
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
      <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"><TextRoll>Long-term thinking</TextRoll></h2>
        <p className="mt-3 text-xl text-white">
 {profileData.bio}
        </p>
        {/* <a
          href="#"
          className="mt-8 w-full block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
        >
          Read our story
        </a> */}
         <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
      </div>
    </div>
    </div>
  );
};

export default Profile;
