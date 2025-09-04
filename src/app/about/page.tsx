import React from 'react';
import { Separator } from '@/components/core/separator';
import FooterSection from '@/components/core/footer';
import InformationPacks from '@/components/core/infoabout';


const ExplorePage = () => {
  return (
    <div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 min-h-screen">
      <span className="px-8 pb-5 mt-10 font-bold text-3xl">About Us</span>
            <Separator/>



      <div className="mt-1 mb-1">
        <InformationPacks />
      </div>

                  <Separator/>
                  <FooterSection />
    </div>

  );
};

export default ExplorePage;
