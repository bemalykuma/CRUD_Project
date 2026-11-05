import { date, integer, pgTable, text } from "drizzle-orm/pg-core";

// ตารางนักศึกษา
export const students = pgTable("students", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  studentId: text("student_id").notNull().unique(), // รหัสประจำตัว
  firstName: text("first_name").notNull(), // ชื่อ
  lastName: text("last_name").notNull(), // นามสกุล
  birthDate: date("birth_date").notNull(), // วันเกิด (YYYY-MM-DD)
  gender: text("gender").notNull(), // เพศ
});

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;
