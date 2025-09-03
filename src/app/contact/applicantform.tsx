"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";

type WorkItem = {
  startDate: string;
  endDate: string;
  company: string; // Farmer / Company
  farmDescription: string;
  roleDescription: string;
};

type FormValues = {
  formType: "A" | "B";
  // Common
  firstName: string;
  lastName: string;
  // Option A
  cvFile: File | null;
  // Option B
  address: string;
  postcode: string;
  mobile: string;
  email: string;
  hearAbout?: string;
  idealJob?: string;
  qualifications?: string;
  drivingLicence?: "yes" | "no";
  appliedBefore?: "yes" | "no";
  otherInfo?: string;
  workHistory: WorkItem[];
  cvFileB: File | null; // separate field to keep Formik simple
};

// ---- Dynamic Zod validation ----
const schemaA = z.object({
  formType: z.literal("A"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Surname is required"),
  cvFile: z.any().refine((f) => f instanceof File, "Please attach your CV"),
  // Unused B fields still exist in the form values; make them permissive:
  address: z.string().optional(),
  postcode: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().optional(),
  hearAbout: z.string().optional(),
  idealJob: z.string().optional(),
  qualifications: z.string().optional(),
  drivingLicence: z.enum(["yes", "no"]).optional(),
  appliedBefore: z.enum(["yes", "no"]).optional(),
  otherInfo: z.string().optional(),
  workHistory: z
    .array(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        company: z.string().optional(),
        farmDescription: z.string().optional(),
        roleDescription: z.string().optional(),
      })
    )
    .optional()
    .default([]),
  cvFileB: z.any().optional(),
});

const schemaB = z.object({
  formType: z.literal("B"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Surname is required"),
  address: z.string().min(1, "Address is required"),
  postcode: z.string().optional(),
  mobile: z.string().min(1, "Mobile is required"),
  email: z.string().email("Enter a valid email"),
  hearAbout: z.string().optional(),
  idealJob: z.string().optional(),
  qualifications: z.string().optional(),
  drivingLicence: z.enum(["yes", "no"], {
    required_error: "Please select yes or no",
  }),
  appliedBefore: z.enum(["yes", "no"], {
    required_error: "Please select yes or no",
  }),
  otherInfo: z.string().optional(),
  workHistory: z.array(
    z.object({
      startDate: z.string().min(1, "Start date required"),
      endDate: z.string().optional(),
      company: z.string().min(1, "Farmer / Company required"),
      farmDescription: z.string().optional(),
      roleDescription: z.string().optional(),
    })
  ),
  // CV in Option B is optional (not starred)
  cvFileB: z.any().optional(),
  // Unused A field:
  cvFile: z.any().optional(),
});

const ApplicantForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formType, setFormType] = useState<"A" | "B">("A");

  const initialValues: FormValues = {
    formType,
    firstName: "",
    lastName: "",
    cvFile: null,
    address: "",
    postcode: "",
    mobile: "",
    email: "",
    hearAbout: "",
    idealJob: "",
    qualifications: "",
    drivingLicence: undefined,
    appliedBefore: undefined,
    otherInfo: "",
    workHistory: [],
    cvFileB: null,
  };

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

      // Build FormData (supports files)
      const fd = new FormData();
      fd.append("formType", values.formType);
      fd.append("firstName", values.firstName);
      fd.append("lastName", values.lastName);

      if (values.formType === "A") {
        if (values.cvFile) fd.append("cvFile", values.cvFile);
      } else {
        fd.append("address", values.address);
        fd.append("postcode", values.postcode || "");
        fd.append("mobile", values.mobile);
        fd.append("email", values.email);
        fd.append("hearAbout", values.hearAbout || "");
        fd.append("idealJob", values.idealJob || "");
        fd.append("qualifications", values.qualifications || "");
        fd.append("drivingLicence", values.drivingLicence || "");
        fd.append("appliedBefore", values.appliedBefore || "");
        fd.append("otherInfo", values.otherInfo || "");
        fd.append("workHistory", JSON.stringify(values.workHistory || []));
        if (values.cvFileB) fd.append("cvFile", values.cvFileB);
      }

      await fetch("/api/contact", {
        method: "POST",
        body: fd, // let the browser set Content-Type with boundary
      });

      resetForm();
      toast.success("Form submitted successfully!");
      setShowConfetti(true);
    } catch (error) {
      console.error("Failed to send:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  const activeSchema = formType === "A" ? schemaA : schemaB;

  return (
    <>
      <div className="bg-black text-white min-h-screen py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Toggle */}
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setFormType("A")}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                formType === "A"
                  ? "bg-teal-600 text-white"
                  : "bg-neutral-900 text-neutral-300"
              }`}
            >
              Option A (Quick Apply)
            </button>
            <button
              type="button"
              onClick={() => setFormType("B")}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                formType === "B"
                  ? "bg-teal-600 text-white"
                  : "bg-neutral-900 text-neutral-300"
              }`}
            >
              Option B (Full Application)
            </button>
          </div>

          <Formik<FormValues>
            enableReinitialize
            initialValues={{ ...initialValues, formType }}
            validationSchema={toFormikValidationSchema(activeSchema)}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                {/* Common: First + Last */}
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

                {/* Option A UI */}
                {values.formType === "A" && (
                  <>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium">Applicant CV *</label>
                      <div className="mt-2">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={(e) => setFieldValue("cvFile", e.currentTarget.files?.[0] ?? null)}
                          className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white focus:outline-none"
                        />
                      </div>
                      <ErrorMessage name="cvFile" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </>
                )}

                {/* Option B UI */}
                {values.formType === "B" && (
                  <>
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium">
                        Address *
                      </label>
                      <div className="mt-1">
                        <Field
                          id="address"
                          name="address"
                          className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white focus:outline-none"
                        />
                      </div>
                      <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="postcode" className="block text-sm font-medium">
                        Postcode / Eircode
                      </label>
                      <div className="mt-1">
                        <Field
                          id="postcode"
                          name="postcode"
                          className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="mobile" className="block text-sm font-medium">
                        Mobile *
                      </label>
                      <div className="mt-1">
                        <Field
                          id="mobile"
                          name="mobile"
                          className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white focus:outline-none"
                        />
                      </div>
                      <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Email *
                      </label>
                      <div className="mt-1">
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white focus:outline-none"
                        />
                      </div>
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="hearAbout" className="block text-sm font-medium">
                        How did you hear about us
                      </label>
                      <div className="mt-1">
                        <Field
                          id="hearAbout"
                          name="hearAbout"
                          className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="idealJob" className="block text-sm font-medium">
                        Describe what type of job you think would be ideal for you
                      </label>
                      <div className="mt-1">
                        <Field
                          as="textarea"
                          id="idealJob"
                          name="idealJob"
                          rows={4}
                          className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="qualifications" className="block text-sm font-medium">
                        Certificates / courses / qualifications (title &amp; dates)
                      </label>
                      <div className="mt-1">
                        <Field
                          as="textarea"
                          id="qualifications"
                          name="qualifications"
                          rows={4}
                          className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="block text-sm font-medium">
                        Do you hold a full driving licence?
                      </span>
                      <div className="mt-2 flex gap-4">
                        <label className="inline-flex items-center gap-2">
                          <Field type="radio" name="drivingLicence" value="yes" />
                          <span>Yes</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                          <Field type="radio" name="drivingLicence" value="no" />
                          <span>No</span>
                        </label>
                      </div>
                      <ErrorMessage name="drivingLicence" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <span className="block text-sm font-medium">
                        Have you ever applied to Farm Solutions previously?
                      </span>
                      <div className="mt-2 flex gap-4">
                        <label className="inline-flex items-center gap-2">
                          <Field type="radio" name="appliedBefore" value="yes" />
                          <span>Yes</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                          <Field type="radio" name="appliedBefore" value="no" />
                          <span>No</span>
                        </label>
                      </div>
                      <ErrorMessage name="appliedBefore" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="otherInfo" className="block text-sm font-medium">
                        Any other information you wish to add
                      </label>
                      <div className="mt-1">
                        <Field
                          as="textarea"
                          id="otherInfo"
                          name="otherInfo"
                          rows={4}
                          className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Work History with FieldArray */}
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Work History</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue("workHistory", [
                              ...values.workHistory,
                              {
                                startDate: "",
                                endDate: "",
                                company: "",
                                farmDescription: "",
                                roleDescription: "",
                              },
                            ])
                          }
                          className="rounded-md bg-neutral-900 px-3 py-1 text-sm hover:bg-neutral-800"
                        >
                          Add new
                        </button>
                      </div>

                      <FieldArray name="workHistory">
                        {({ remove }) => (
                          <div className="mt-3 space-y-6">
                            {values.workHistory.map((_, idx) => (
                              <div
                                key={idx}
                                className="rounded-lg border border-neutral-800 p-4"
                              >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                  <div>
                                    <label className="block text-sm">Start Date</label>
                                    <Field
                                      name={`workHistory.${idx}.startDate`}
                                      type="date"
                                      className="mt-1 block w-full rounded-md border border-neutral-800 bg-black px-3 py-2 text-white"
                                    />
                                    <ErrorMessage
                                      name={`workHistory.${idx}.startDate`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm">End Date</label>
                                    <Field
                                      name={`workHistory.${idx}.endDate`}
                                      type="date"
                                      className="mt-1 block w-full rounded-md border border-neutral-800 bg-black px-3 py-2 text-white"
                                    />
                                  </div>
                                  <div className="sm:col-span-2">
                                    <label className="block text-sm">Farmer / Company</label>
                                    <Field
                                      name={`workHistory.${idx}.company`}
                                      className="mt-1 block w-full rounded-md border border-neutral-800 bg-black px-3 py-2 text-white"
                                    />
                                    <ErrorMessage
                                      name={`workHistory.${idx}.company`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                  <div className="sm:col-span-2">
                                    <label className="block text-sm">Farm Description</label>
                                    <Field
                                      as="textarea"
                                      rows={3}
                                      name={`workHistory.${idx}.farmDescription`}
                                      className="mt-1 block w-full rounded-md border border-neutral-800 bg-black px-3 py-2 text-white"
                                    />
                                  </div>
                                  <div className="sm:col-span-2">
                                    <label className="block text-sm">Description of your role</label>
                                    <Field
                                      as="textarea"
                                      rows={3}
                                      name={`workHistory.${idx}.roleDescription`}
                                      className="mt-1 block w-full rounded-md border border-neutral-800 bg-black px-3 py-2 text-white"
                                    />
                                  </div>
                                </div>

                                <div className="mt-3 flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => remove(idx)}
                                    className="rounded-md bg-neutral-900 px-3 py-1 text-sm hover:bg-neutral-800"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium">Applicant CV</label>
                      <div className="mt-2">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={(e) => setFieldValue("cvFileB", e.currentTarget.files?.[0] ?? null)}
                          className="block w-full rounded-md border border-neutral-800 bg-black px-4 py-3 text-white"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Submit */}
                <div className="sm:col-span-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 w-16 rounded-md bg-green-500 px-4 py-3 text-black font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-70"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
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

export default ApplicantForm;
