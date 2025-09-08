import React from 'react';
import { Separator } from '@/components/core/separator';
import FooterSection from '@/components/core/footer';
import ApplicantForm from "@/app/contact/applicantform";




const ExplorePage = () => {
  return (

                <div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 min-h-screen">
                  <span className="px-8  pb-5 mt-10 font-bold text-3xl">Apply as a Candidate</span>
                          <Separator/>
                        <div className="">
                        <ApplicantForm  />
                        </div>
                  <Separator/>
                  <FooterSection />
                </div>

  );
};

export default ExplorePage;
