import { z } from "zod";
import { positiveIdSchema } from "./common.js";

export const studentIdParamsSchema = z.strictObject({
  id: positiveIdSchema,
});

export const studentCreateSchema = z.strictObject({
  studentId: z.string().regex(/^\d{8}$/, "รหัสนักศึกษาต้องเป็นตัวเลข 8 หลัก"),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  birthDate: z.iso.date(), // เช่น "2005-06-15"
  gender: z.enum(["male", "female", "other"]),
});

// ตอนแก้ไข ส่งมาแค่บาง field ก็ได้
export const studentUpdateSchema = studentCreateSchema.partial();
