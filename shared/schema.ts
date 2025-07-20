import { z } from "zod";

// This schema can be shared between backend and frontend.
export const insertStudyNotesSchema = z.object({
  chapterNumber: z.number().min(1).max(41),
  title: z.string().min(1),
  content: z.string().min(1),
  bookTitle: z.string().default("Emergency Care and Transportation of the Sick and Injured 12th Edition").optional(),
  tags: z.array(z.string()).optional(),
  keyPoints: z.array(z.string()).optional(),
  objectives: z.array(z.string()).optional(),
  isCompleted: z.boolean().optional(),
});

export type StudyNote = {
  id: number;
  chapterNumber: number;
  title: string;
  content: string;
  bookTitle?: string;
  tags?: string[];
  keyPoints?: string[];
  objectives?: string[];
  isCompleted?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};
