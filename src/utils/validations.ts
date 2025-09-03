import { z } from "zod";

export const validationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

// import { z } from "zod"

// export const validationSchema = z.object({
//   name: z.string({
//     required_error: "Name is required.",
//   }),
//   email: z
//     .string({
//       required_error: "Email is required.",
//     })
//     .email(),
//   message: z.string({
//     required_error: "Message is required.",
//   }),
// });