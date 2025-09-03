"use client";
import React, { useState } from "react";

import { validationSchema } from "@/utils/validations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";

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

      // Send email using your API route
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      resetForm();
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      toast.success("Form submitted successfully!");
      setShowConfetti(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-black text-white min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <h3 className="text-lg font-medium">Send us a message</h3> */}

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
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
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
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
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
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Phone (optional) */}
              <div>
                <div className="flex justify-between">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone
                  </label>
                  <span id="phone-optional" className="text-sm text-neutral-400">
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
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
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
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Message (no 500-char note, no limit) */}
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
                    className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <div className="sm:col-span-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-45 rounded-md bg-green-500 px-4 py-3 text-black font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-70"
                >
                  Submit
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
        />
      )}
    </>
  );
};

export default ContactForm;


// "use client";
// import React, { useState } from "react";

// import { validationSchema } from "@/utils/validations";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { toFormikValidationSchema } from "zod-formik-adapter";

// import { ToastContainer, toast } from "react-toastify";
// import Confetti from "react-confetti";

// type FormValues = {
//   name: string;
//   email: string;
//   message: string;
// };

// const ContactForm = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);

//   const handleSubmit = async (
//     values: FormValues,
//     {
//       setSubmitting,
//       resetForm,
//     }: {
//       setSubmitting: (isSubmitting: boolean) => void;
//       resetForm: () => void;
//     }
//   ) => {
//     try {
//       setIsLoading(true);
//       // Send email using Nodemailer
//       await fetch("/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       // Reset the form
//       resetForm();

//       // Show success message or redirect to a thank you page
//       console.log("Email sent successfully!");
//     } catch (error) {
//       // Handle error
//       console.error("Failed to send email:", error);
//     } finally {
//       setSubmitting(false);
//       toast.success("Form submitted successfully!");
//       setShowConfetti(true);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Formik
//         initialValues={{ name: "", email: "", message: "" }}
//         validationSchema={toFormikValidationSchema(validationSchema)}
//         onSubmit={handleSubmit}
//       >
//         <Form>
//           <div className="lg:w-1/2 md:w-2/3 mx-auto  pb-25">
//             <div className="flex flex-wrap -m-2">
//               <div className="p-2 w-1/2">
//                 <div className="relative">
//                   <label className="leading-7 text-sm text-gray-600">
//                     Name
//                   </label>
//                   <Field
//                     type="text"
//                     id="name"
//                     name="name"
//                     className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//                   />
//                   <ErrorMessage
//                     name="name"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//               </div>
//               <div className="p-2 w-1/2">
//                 <div className="relative">
//                   <label className="leading-7 text-sm text-gray-600">
//                     Email
//                   </label>
//                   <Field
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//                   />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//               </div>
//               <div className="p-2 w-full">
//                 <div className="relative">
//                   <label className="leading-7 text-sm text-gray-600">
//                     Message
//                   </label>
//                   <Field
//                     id="message"
//                     name="message"
//                     as="textarea"
//                     className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
//                   />
//                   <ErrorMessage
//                     name="message"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//               </div>
//               <div className="p-2 w-full">
//                 <button
//                   disabled={isLoading}
//                   className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
//                 >
//                   Button
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Form>
//       </Formik>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />

//       {showConfetti && (
//         <Confetti
//           width={window.innerWidth}
//           height={window.innerHeight}
//           recycle={false}
//         />
//       )}
//     </>
//   );
// };

// export default ContactForm;