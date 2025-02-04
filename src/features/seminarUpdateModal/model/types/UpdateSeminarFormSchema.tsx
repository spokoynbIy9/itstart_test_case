import { z } from "zod";

export const updateSeminarFormSchema = z.object({
  title: z.string().min(8, { message: "Минимум 8 символов" }),
  description: z.string().min(8, { message: "Минимум 8 символов" }),
  date: z.string(),
  time: z.string(),
  photo: z.string(),
});

export type UpdateSeminarFormSchema = z.infer<typeof updateSeminarFormSchema>;
