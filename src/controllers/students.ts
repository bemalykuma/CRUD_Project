import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  studentCreateSchema,
  studentIdParamsSchema,
  studentUpdateSchema,
} from "../schemas/students.js";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudentByStudentId,
  getStudents,
  updateStudent,
} from "../services/students.js";

export const studentsController = new Hono();

// READ: GET /api/v1/students
studentsController.get("/", async (c) => {
  const students = await getStudents();
  return c.json(students);
});

// READ: GET /api/v1/students/:id
studentsController.get("/:id", zValidator("param", studentIdParamsSchema), async (c) => {
  const { id } = c.req.valid("param");
  const student = await getStudentById(id);

  if (!student) {
    return c.json({ error: "Student not found" }, 404);
  }

  return c.json(student);
});

// CREATE: POST /api/v1/students
studentsController.post("/", zValidator("json", studentCreateSchema), async (c) => {
  const data = c.req.valid("json");

  if (await getStudentByStudentId(data.studentId)) {
    return c.json({ error: "Student ID already exists" }, 409);
  }

  const student = await createStudent(data);
  return c.json(student, 201);
});

// UPDATE: PATCH /api/v1/students/:id
studentsController.patch(
  "/:id",
  zValidator("param", studentIdParamsSchema),
  zValidator("json", studentUpdateSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");

    if (data.studentId) {
      const sameId = await getStudentByStudentId(data.studentId);
      if (sameId && sameId.id !== id) {
        return c.json({ error: "Student ID already exists" }, 409);
      }
    }

    const student = await updateStudent(id, data);

    if (!student) {
      return c.json({ error: "Student not found" }, 404);
    }

    return c.json(student);
  },
);

// DELETE: DELETE /api/v1/students/:id
studentsController.delete("/:id", zValidator("param", studentIdParamsSchema), async (c) => {
  const { id } = c.req.valid("param");
  const student = await deleteStudent(id);

  if (!student) {
    return c.json({ error: "Student not found" }, 404);
  }

  return c.json({ message: "Deleted", student });
});
