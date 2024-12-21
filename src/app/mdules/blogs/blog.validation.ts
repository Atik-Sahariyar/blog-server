import { z } from "zod";

// Zod schema for blog creation validation
export const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    isPublished: z.boolean().optional().default(true),
  }),
});

// Zod schema for blog update validation
export const updateBlogValidationSchema = z.object({
    body: z.object({
      title: z.string().min(10, "Title must be at least 1 character long").optional(),
      content: z.string().min(15, "Content must be at least 1 character long").optional(),
      isPublished: z.boolean().optional(),
    }),
  });
  