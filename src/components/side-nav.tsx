'use client';

import React from 'react';


import Image from 'next/image';
import Link from 'next/link';

import useNavigation from '@/hook/use-navigation';
import { Icon } from '@iconify/react';

const SideNav = () => {
  const {
    isHomeActive,
    isExploreActive,
    isNotificationsActive,
    isMessagesActive,
  } = useNavigation();

  return (
    <div className="flex-col space-y-4 items-center py-8 hidden sm:flex border-r border-zinc-700 h-full  w-[120px] md:w-[250px] md:items-start fixed">
      <Link
        href="/"
        className="flex bg-white/10 flex-row space-x-1 items-center hover:bg-white/30 p-4 rounded-full duration-200"
      >
                <Image
          src="/cow_contour_traced_fitted.svg"
          alt="AgriForce Logo"
          width={65}
          height={65}
          priority
          className='bg-grey-100 pr-2'
        />
              <span
          className={`

            relative text-2xl pt-2 hidden md:inline-block font-bold
            after:content-[''] after:absolute after:left-0 after:-bottom-[2px]
            after:h-[3px] after:w-full after:bg-green-600
          `}
        >
          A<span className="relative z-10">g</span>riForce
        </span>
      </Link>


      <Link
        href="/"
        className={`flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10 ${
          isHomeActive ? 'border-2 border-green-600' : ''
        }`}
      >
        {isHomeActive ? (
          <Icon icon="mingcute:home-5-fill" width="38" height="38" />
        ) : (
          <Icon icon="mingcute:home-5-line" width="38" height="38" />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isHomeActive ? 'font-bold' : ''
          }`}
        >
          Home
        </span>
        {/* <span className='h-2 w-2 rounded-full bg-sky-500 absolute top-3 right-[16px] md:right-[100px]'></span> */}
      </Link>
      <Link
        href="/about"
        className={`flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10 ${
          isExploreActive ? 'border-2 border-green-600' : ''
        }`}
      >
        {isExploreActive ? (
          <Icon
            icon="uil:search"
            width="38"
            height="38"
            className="stroke-current stroke-5"
          />
        ) : (
          <Icon icon="uil:search" width="38" height="38" />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isExploreActive ? 'font-bold' : ''
          }`}
        >
          About
        </span>
      </Link>
      <Link
        href="/apply"
        className={`flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10 ${
          isNotificationsActive ? 'border-2 border-green-600' : ''
        }`}
      >
        {isNotificationsActive ? (
          <Icon icon="ph:plus-fill" width="38" height="38" />
        ) : (
          <Icon icon="rivet-icons:plus" width="38" height="38" />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isNotificationsActive ? 'font-bold' : ''
          }`}
        >
            Apply
        </span>
      </Link>
      <Link
        href="/contact"
        className={`flex flex-row space-x-4 items-center px-4 py-3 rounded-full duration-200 hover:bg-white/10 ${
          isMessagesActive ? 'border-2 border-green-600' : ''
        }`}
      >
        {isMessagesActive ? (
          <Icon icon="ic:baseline-email" width="38" height="38" />
        ) : (
          <Icon icon="ic:outline-email" width="38" height="38" />
        )}
        <span
          className={`text-2xl pt-2 hidden md:flex ${
            isMessagesActive ? 'font-bold' : ''
          }`}
        >
          Contact
        </span>
      </Link>
    </div>
  );
};

export default SideNav;
