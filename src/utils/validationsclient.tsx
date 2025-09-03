import { z } from "zod"

export const validationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName:  z.string().min(1, "Surname is required"),
  address:   z.string().min(1, "Address is required"),
  postcode:  z.string().optional(),
  mobile:    z.string().min(1, "Mobile is required"),
  email:     z.string().email("Enter a valid email"),
  farmType:  z.enum(["Diary", "Other"]),
  workerType:z.enum(["Diary Farm assistant", "Other"]),
  vacancyDescription: z.string().optional(),
  hearAbout: z.string().optional(),
  bestTime:  z.string().optional(),
  // keep these optional if your API expects them in the shape:
  subject:   z.string().optional(),
  message:   z.string().optional(),
});
