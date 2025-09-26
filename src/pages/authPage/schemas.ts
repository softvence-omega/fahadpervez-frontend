// src/lib/schemas.ts
import { z } from "zod";

/**
 * Profile setup:
 * Use a discriminated union to require different fields depending on the role.
 */
const studentSchema = z.object({
  role: z.literal("student"),
  subRole: z.string().min(1, "Please select student type"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  university: z.string().min(1, "University/School is required"),
  academicYear: z.string().min(1, "Academic year is required"),
});

const professionalSchema = z.object({
  role: z.literal("professional"),
  subRole: z.string().min(1, "Please select professional type"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  hospital: z.string().min(1, "Hospital/Institute is required"),
  postgraduateYear: z.string().min(1, "Postgraduate year is required"),
  experience: z.string().min(1, "Years of experience is required"),
});

const mentorSchema = z.object({
  role: z.literal("mentor"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  mentorField: z.string().min(1, "Field of expertise is required"),
});

export const profileSetupSchema = z.discriminatedUnion("role", [
  studentSchema,
  professionalSchema,
  mentorSchema,
]);

export const preparingForSchema = z.object({
  exams: z.array(z.string()).min(1, "Select at least one exam/goal"),
});

export const preferencesSchema = z.object({
  subjectPreference: z.string().min(1, "Subject preference is required"),
  systemPreference: z.string().min(1, "System preference is required"),
  topic: z.string().min(1, "Topic is required"),
  subTopic: z.string().min(1, "Sub-topic is required"),
});

export const uploadProfileSchema = z.object({
  photo: z.string().min(1, "Profile photo is required (data URL)"),
  bio: z.string().min(1, "Bio is required").max(300, "Bio max 300 characters"),
});

export const multiStepSchema = z.object({
  profile: profileSetupSchema,
  preparing: preparingForSchema,
  preferences: preferencesSchema,
  upload: uploadProfileSchema,
});

export type ProfileSetupData = z.infer<typeof profileSetupSchema>;
export type PreparingForData = z.infer<typeof preparingForSchema>;
export type PreferencesData = z.infer<typeof preferencesSchema>;
export type UploadProfileData = z.infer<typeof uploadProfileSchema>;
export type MultiStepFormData = z.infer<typeof multiStepSchema>;
