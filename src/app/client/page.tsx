"use client"

import React, { useState } from 'react';
import { Separator } from '@/components/core/separator';
import ClientForm from "@/app/contact/clientform";
import FooterSection from '@/components/core/footer';
import InformationPacks from '@/components/core/infoclient';

const NotificationsPage = () => {

    return (

            <div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 min-h-screen">
              <span className="px-8  pb-5 mt-10 font-bold text-3xl">Client application</span>
                      <Separator/>
                      <InformationPacks/>
                    <div className="">
                   <ClientForm />
                    </div>
              <Separator/>
              <FooterSection />
            </div>
    );
};

export default NotificationsPage;
