import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { students, type NewStudent } from "../db/schema.js";

// ดึงนักศึกษาทั้งหมด
export async function getStudents() {
  return db.select().from(students).orderBy(students.id);
}

// ดึงนักศึกษาตาม id
export async function getStudentById(id: number) {
  const [student] = await db.select().from(students).where(eq(students.id, id));
  return student;
}

// เช็คว่ารหัสนักศึกษานี้มีแล้วหรือยัง
export async function getStudentByStudentId(studentId: string) {
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.studentId, studentId));
  return student;
}

// เพิ่มนักศึกษา
export async function createStudent(data: NewStudent) {
  const [student] = await db.insert(students).values(data).returning();
  return student;
}

// แก้ไขนักศึกษา
export async function updateStudent(id: number, data: Partial<NewStudent>) {
  const [student] = await db
    .update(students)
    .set(data)
    .where(eq(students.id, id))
    .returning();
  return student;
}

// ลบนักศึกษา
export async function deleteStudent(id: number) {
  const [student] = await db
    .delete(students)
    .where(eq(students.id, id))
    .returning();
  return student;
}
