# Student CRUD API (Assignment 1)

รหัสนักศึกษา: 67070148

API สำหรับ CRUD ข้อมูลนักศึกษา ใช้ Hono + Drizzle + PostgreSQL (อิงตัวอย่างที่ 2.2)

## ข้อมูลที่เก็บ

| Field | ความหมาย | ตัวอย่าง |
| --- | --- | --- |
| `studentId` | รหัสประจำตัว (ตัวเลข 8 หลัก ห้ามซ้ำ) | `"67070148"` |
| `firstName` | ชื่อ | `"Somchai"` |
| `lastName` | นามสกุล | `"Jaidee"` |
| `birthDate` | วันเกิด (YYYY-MM-DD) | `"2005-06-15"` |
| `gender` | เพศ (`male` / `female` / `other`) | `"male"` |

## วิธีรัน

```sh
npm install
copy .env.example .env      # แก้ DATABASE_URL ให้ชี้ไปที่ PostgreSQL ของเรา
npm run db:migrate          # สร้างตาราง students
npm run dev
```

เปิด <http://localhost:3000> จะเจอหน้าเว็บสำหรับเพิ่ม/แก้/ลบนักศึกษา

## Routes

| Method | Route | ทำอะไร |
| --- | --- | --- |
| `GET` | `/api/v1/students` | ดูนักศึกษาทั้งหมด |
| `GET` | `/api/v1/students/:id` | ดูนักศึกษา 1 คน |
| `POST` | `/api/v1/students` | เพิ่มนักศึกษา |
| `PATCH` | `/api/v1/students/:id` | แก้ไขนักศึกษา (ส่งมาแค่ field ที่จะแก้) |
| `DELETE` | `/api/v1/students/:id` | ลบนักศึกษา |

ตัวอย่าง:

```sh
curl -X POST http://localhost:3000/api/v1/students \
  -H "Content-Type: application/json" \
  -d '{"studentId":"67070148","firstName":"Somchai","lastName":"Jaidee","birthDate":"2005-06-15","gender":"male"}'
```

## Status code

- `200` สำเร็จ
- `201` เพิ่มข้อมูลสำเร็จ
- `400` ข้อมูลที่ส่งมาไม่ถูกต้อง
- `404` ไม่เจอนักศึกษา
- `409` รหัสนักศึกษาซ้ำ
