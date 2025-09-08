"use client";
import React, { useState } from "react";
import { validationSchema } from "@/utils/validations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";
import "react-toastify/dist/ReactToastify.css"; // Important: Add this import!

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
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

      // Send to the correct API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          formIdentifier: 'contact'
        }),
      });

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      resetForm();
      console.log("Email sent successfully!");
      toast.success("Form submitted successfully!");
      setShowConfetti(true);
      
      // Hide confetti after 2 seconds
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

  // Rest of your component stays the same...
  return (
    <>
  <div className="bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-10">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Formik<FormValues>
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        }}
        validationSchema={toFormikValidationSchema(validationSchema)}
        onSubmit={handleSubmit}
      >
        <Form className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          {/* First name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">
              First name
            </label>
            <div className="mt-1">
              <Field
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                className="block w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400"
              />
            </div>
            <ErrorMessage name="firstName" component="div" className="text-red-600 dark:text-red-400 text-sm mt-1" />
          </div>

          {/* Last name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last name
            </label>
            <div className="mt-1">
              <Field
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                className="block w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400"
              />
            </div>
            <ErrorMessage name="lastName" component="div" className="text-red-600 dark:text-red-400 text-sm mt-1" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="mt-1">
              <Field
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className="block w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400"
              />
            </div>
            <ErrorMessage name="email" component="div" className="text-red-600 dark:text-red-400 text-sm mt-1" />
          </div>

          {/* Phone (optional) */}
          <div>
            <div className="flex justify-between">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone
              </label>
              <span id="phone-optional" className="text-sm text-zinc-500 dark:text-zinc-400">
                Optional
              </span>
            </div>
            <div className="mt-1">
              <Field
                type="text"
                id="phone"
                name="phone"
                autoComplete="tel"
                aria-describedby="phone-optional"
                className="block w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400"
              />
            </div>
            <ErrorMessage name="phone" component="div" className="text-red-600 dark:text-red-400 text-sm mt-1" />
          </div>

          {/* Subject */}
          <div className="sm:col-span-2">
            <label htmlFor="subject" className="block text-sm font-medium">
              Subject
            </label>
            <div className="mt-1">
              <Field
                type="text"
                id="subject"
                name="subject"
                className="block w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400"
              />
            </div>
            <ErrorMessage name="subject" component="div" className="text-red-600 dark:text-red-400 text-sm mt-1" />
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <div className="mt-1">
              <Field
                as="textarea"
                id="message"
                name="message"
                rows={6}
                className="block w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400"
              />
            </div>
            <ErrorMessage name="message" component="div" className="text-red-600 dark:text-red-400 text-sm mt-1" />
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-45 rounded-md bg-green-500 px-4 py-3 text-black font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-100 dark:focus:ring-offset-zinc-950 disabled:opacity-70"
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

export default ContactForm;



