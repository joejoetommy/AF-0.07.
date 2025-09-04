'use client';

import React from 'react';
import Link from 'next/link';
import useNavigation from '@/hook/use-navigation';
import useScrollingEffect from '@/hook/use-scroll';
import { Icon } from '@iconify/react';

const BottomNav = () => {
  const scrollDirection = useScrollingEffect();
  const navClass = scrollDirection === 'up' ? '' : 'opacity-25 duration-500';

  const {
    isHomeActive,
    isExploreActive,
    isNotificationsActive,
    isMessagesActive,
  } = useNavigation();

  const Dot = () => (
    <span className="h-2 w-2 rounded-full bg-green-500 absolute -top-0.5 right-[3px]" />
  );

  return (
    <div
      className={`fixed bottom-0 w-full py-4 z-10 bg-zinc-100 dark:bg-zinc-950 border-t dark:border-zinc-800 border-zinc-200 shadow-lg sm:hidden ${navClass}`}
    >
      <div className="flex flex-row justify-around items-center bg-transparent w-full">

        <Link href="/" className="flex items-center relative" aria-current={isHomeActive ? 'page' : undefined}>
          {isHomeActive ? (
            <Icon icon="mingcute:home-5-fill" width="32" height="32" />
          ) : (
            <Icon icon="mingcute:home-5-line" width="32" height="32" />
          )}
          {isHomeActive && <Dot />}
        </Link>

        <Link href="/about" className="flex items-center relative" aria-current={isExploreActive ? 'page' : undefined}>
          {isExploreActive ? (
            <Icon icon="uil:search" width="32" height="32" className="stroke-current stroke-5" />
          ) : (
            <Icon icon="uil:search" width="32" height="32" />
          )}
          {isExploreActive && <Dot />}
        </Link>

        <Link href="/apply" className="flex items-center relative" aria-current={isNotificationsActive ? 'page' : undefined}>
          {isNotificationsActive ? (
            <Icon icon="ph:plus-fill" width="32" height="32" />
          ) : (
            <Icon icon="rivet-icons:plus" width="32" height="32" />
          )}
          {isNotificationsActive && <Dot />}
        </Link>

        <Link href="/contact" className="flex items-center relative" aria-current={isMessagesActive ? 'page' : undefined}>
          {isMessagesActive ? (
            <Icon icon="ic:baseline-email" width="32" height="32" />
          ) : (
            <Icon icon="ic:outline-email" width="32" height="32" />
          )}
          {isMessagesActive && <Dot />}
        </Link>

      </div>
    </div>
  );
};

export default BottomNav;

