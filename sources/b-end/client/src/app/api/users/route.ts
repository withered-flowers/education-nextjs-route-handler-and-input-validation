// Di sini kita akan mengimport NextResponse
// Untuk penjelasannya ada di bawah yah !
import { NextResponse } from "next/server";

// ?? Step 3 - Mengimplementasikan `GET /api/users` (1)
// Import fungsi yang diperlukan dari `db/models/user.ts`
import { getUsers } from "@/db/models/user";

// ?? Step 4 - Mengimplementasikan `POST /api/users` (1)
// Import fungsi diperlukan dari `db/models/user.ts`
import { createUser } from "@/db/models/user";

// Type definitions untuk Response yang akan dikembalikan
type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

// GET /api/users
export const GET = async () => {
  // ?? Step 3 - Mengimplementasikan `GET /api/users` (2)
  // Di sini kita akan menggunakan fungsi getUsers() yang sudah kita buat sebelumnya
  const users = await getUsers();

  // Di sini yang akan dikembalikan adalah Response dari Web API
  // (Standard Web API: Request untuk mendapatkan data dan Request untuk mengirimkan data)
  // https://developer.mozilla.org/en-US/docs/Web/API/Request
  // https://developer.mozilla.org/en-US/docs/Web/API/Response
  return Response.json(
    // Data yang akan dikirimkan ke client
    {
      statusCode: 200,
      message: "Pong from GET /api/users !",
      // ?? Step 3 - Mengimplementasikan `GET /api/users` (3)
      // Di sini kita akan mengirimkan data users
      data: users,
    },
    // Object informasi tambahan (status code, headers, dll)
    {
      // Default status adalah 200
      status: 200,
    },
  );
};

// POST /api/users
// ?? Step 4 - Mengimplementasikan `POST /api/users` (2)
// Menambahkan parameter request: Request pada POST
export const POST = async (request: Request) => {
  // ?? Step 4 - Mengimplementasikan `POST /api/users` (3)
  // Di sini kita akan mengambil data yang dikirimkan oleh client
  // Asumsi: data yang dikirimkan oleh client adalah JSON
  const data = await request.json();

  // Bila tidak ingin melakukan asumsi, maka kita bisa mengeceknya berdasarkan header "Content-Type"
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
  // const contentType = request.headers.get("Content-Type");
  // if (contentType !== "application/json") { ... }

  // Di sini kita akan menggunakan fungsi createUser() yang sudah kita buat sebelumnya
  const user = await createUser(data);

  // Di sini kita akan menggunakan NextResponse yang merupakan extend dari Response
  // Keuntungan dengan menggunakan NextResponse adalah kita bisa menuliskan kembalian dari Response dengan lebih presisi dengan Generic Type dan memiliki beberapa method yang tidak ada di Response.
  // https://nextjs.org/docs/pages/api-reference/functions/next-server#nextresponse
  // Misalnya di sini kita menuliskan bahwa Response yang akan dikembalikan adalah MyResponse yang mana memiliki Generic Type never (tidak ada data yang dikembalikan) untuk key "data"

  /*
    {
      statusCode: number; <--- harus selalu ada statusCode
      message?: string; <--- bisa ada "message" bisa tidak
      data?: never; <--- menjadi tidak ada "data" yang dikembalikan
      error?: string; <--- bisa ada "error" bisa tidak
    }
  */
  // ?? Step 4 - Mengimplementasikan `POST /api/users` (4)
  // Mengubah tipe kembalian menjadi unknown
  return NextResponse.json<MyResponse<unknown>>(
    // Data yang akan dikirimkan ke client
    {
      statusCode: 201,
      message: "Pong from POST /api/users !",
      // ?? Step 4 - Mengimplementasikan `POST /api/users` (5)
      // Di sini kita akan mengirimkan data user
      data: user,
    },
    // Object informasi tambahan (status code, headers, dll)
    {
      // Karena di sini menggunakan non-default status (bukan 200)
      // maka di sini kita menuliskan status: 201
      status: 201,
    },
  );
};
