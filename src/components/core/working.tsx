"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";
import "react-toastify/dist/ReactToastify.css"; // ADD THIS IMPORT!

// ... rest of your ApplicantForm component code remains the same

// Also update the handleSubmit function to handle errors better:
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
    fd.append("formIdentifier", "applicant");
    fd.append("formType", values.formType);
    fd.append("firstName", values.firstName);
    fd.append("lastName", values.lastName);

    if (values.formType === "A") {
      if (values.cvFile) {
        fd.append("cvFile", values.cvFile);
        console.log("Attaching CV file:", values.cvFile.name);
      }
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
      if (values.cvFileB) {
        fd.append("cvFile", values.cvFileB);
        console.log("Attaching CV file:", values.cvFileB.name);
      }
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      body: fd, // let the browser set Content-Type with boundary
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Form submitted successfully:", data);

    resetForm();
    toast.success("Application submitted successfully!");
    setShowConfetti(true);
    
    // Hide confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
  } catch (error) {
    console.error("Failed to send:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
    setIsLoading(false);
  }
};