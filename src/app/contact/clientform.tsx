"use client";

import React, { useState } from "react";
import { clientValidationSchema } from "@/utils/clientValidations"; // Use the new validation
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";
import "react-toastify/dist/ReactToastify.css"; // Important: Add this import!

type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  postcode?: string;
  mobile: string;
  email: string;
  farmType: "Diary" | "Other";
  workerType: "Diary Farm assistant" | "Other";
  vacancyDescription?: string;
  hearAbout?: string;
  bestTime?: string;
};

const ClientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      resetForm,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetForm: () => void;
    }
  ) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          formIdentifier: 'client'
        }),
      });

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      resetForm();
      console.log("Client form submitted successfully!");
      toast.success("Client form submitted successfully!");
      setShowConfetti(true);
      
      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
      
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-black text-white min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Formik<FormValues>
            initialValues={{
              firstName: "",
              lastName: "",
              address: "",
              postcode: "",
              mobile: "",
              email: "",
              farmType: "Diary",
              workerType: "Diary Farm assistant",
              vacancyDescription: "",
              hearAbout: "",
              bestTime: "",
            }}
            validationSchema={toFormikValidationSchema(clientValidationSchema)}
            onSubmit={handleSubmit}
          >
            <Form className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              {/* First name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name *
                </label>
                <div className="mt-1">
                  <Field
                    id="firstName"
                    name="firstName"
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Surname */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Surname *
                </label>
                <div className="mt-1">
                  <Field
                    id="lastName"
                    name="lastName"
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium">
                  Address *
                </label>
                <div className="mt-1">
                  <Field
                    id="address"
                    name="address"
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Postcode / Eircode */}
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium">
                  Postcode / Eircode
                </label>
                <div className="mt-1">
                  <Field
                    id="postcode"
                    name="postcode"
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium">
                  Mobile *
                </label>
                <div className="mt-1">
                  <Field
                    id="mobile"
                    name="mobile"
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email *
                </label>
                <div className="mt-1">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Farm type */}
              <div>
                <label htmlFor="farmType" className="block text-sm font-medium">
                  Farm type
                </label>
                <div className="mt-1">
                  <Field
                    as="select"
                    id="farmType"
                    name="farmType"
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white focus:outline-none"
                  >
                    <option value="Diary">Dairy</option>
                    <option value="Other">Other</option>
                  </Field>
                </div>
                <ErrorMessage name="farmType" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Worker type */}
              <div>
                <label htmlFor="workerType" className="block text-sm font-medium">
                  Worker type
                </label>
                <div className="mt-1">
                  <Field
                    as="select"
                    id="workerType"
                    name="workerType"
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white focus:outline-none"
                  >
                    <option value="Diary Farm assistant">Dairy Farm Assistant</option>
                    <option value="Other">Other</option>
                  </Field>
                </div>
                <ErrorMessage name="workerType" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Vacancy Description */}
              <div className="sm:col-span-2">
                <label htmlFor="vacancyDescription" className="block text-sm font-medium">
                  Vacancy Description
                </label>
                <div className="mt-1">
                  <Field
                    as="textarea"
                    id="vacancyDescription"
                    name="vacancyDescription"
                    rows={6}
                    placeholder="Please describe the position you're looking to fill..."
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* How you heard */}
              <div>
                <label htmlFor="hearAbout" className="block text-sm font-medium">
                  How you heard about us
                </label>
                <div className="mt-1">
                  <Field
                    id="hearAbout"
                    name="hearAbout"
                    placeholder="e.g. Google, referral, etc."
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Best time to talk */}
              <div>
                <label htmlFor="bestTime" className="block text-sm font-medium">
                  Best time to talk
                </label>
                <div className="mt-1">
                  <Field
                    id="bestTime"
                    name="bestTime"
                    placeholder="e.g. Weekdays 9–11am"
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="sm:col-span-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 rounded-md bg-green-500 px-4 py-3 text-black font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-70"
                >
                  {isLoading ? "Sending..." : "Submit"}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 0}
          height={typeof window !== "undefined" ? window.innerHeight : 0}
          recycle={false}
          numberOfPieces={200}
        />
      )}
    </>
  );
};

export default ClientForm;

