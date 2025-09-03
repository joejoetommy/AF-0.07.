"use client"

import React, { useState } from 'react';
import { Separator } from '@/components/core/separator';
import ContactForm from "@/app/contact/form";
import ApplicantForm from "@/app/contact/applicantform";

 const tabComponents = {
    Wallet:  <ApplicantForm  />,
    WalletApp: <ContactForm  />,

  };



const NotificationsPage = () => {

   const [activeTab, setActiveTab] = useState<TabType>('WalletApp');
  return (
    <div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 min-h-screen">
      <span className="px-8 mt-10  pb-5 font-bold text-3xl">Apply</span>
                   <Separator/>

                    <div className="flex w-full">
                      <button
                        onClick={() => setActiveTab('Wallet')}
                        className={`flex-1 py-4 hover:bg-white/10 transition-colors relative ${
                          activeTab === 'Wallet' ? 'font-bold' : 'text-gray-500'
                        }`}
                      >
                        For Candidate's 
                        {activeTab === 'Wallet' && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-full"></div>
                        )}
                      </button>


                      <button
                        onClick={() => setActiveTab('WalletApp')}
                        className={`flex-1 py-4 hover:bg-white/10 transition-colors relative ${
                          activeTab === 'WalletApp' ? 'font-bold' : 'text-gray-500'
                        }`}
                      >
                        For Client's
                        {activeTab === 'WalletApp' && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-full"></div>
                        )}
                      </button>
   
                    </div>


                  <div className="flex flex-1 h-screen overflow-y-auto">
                    {tabComponents[activeTab] || null}
                  </div>





    </div>
  );
};

export default NotificationsPage;
