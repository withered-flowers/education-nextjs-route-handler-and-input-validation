// di sini kita akan menggunakan NextRequest dan NextResponse yang merupakan extend dari Request dan Response
import { NextRequest, NextResponse } from "next/server";

// ?? Step 6 - Mengimplementasikan `GET /api/users/:id` (1)
// import fungsi dari model user.ts
import { getUserById } from "@/db/models/user";

// Type definitions untuk Response yang akan dikembalikan
type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

// Karena di sini kita akan menerima parameter "id" dari URL
// Maka di sini kita akan menggunakan parameter kedua dari route handler
// yaitu berupa suatu Object params
export const GET =
  // ?? Step 6 - Mengimplementasikan `GET /api/users/:id` (2)
  // Menjadikan fungsi ini async
  async (
    // Di sini kita menggunakan _request karena kita tidak akan menggunakan argument ini sekarang
    _request: NextRequest,
    // Perhatikan di sini params dalam bentuk sebuah Object
    { params }: { params: { id: string } },
  ) => {
    const id = params.id;

    // ?? Step 6 - Mengimplementasikan `GET /api/users/:id` (3)
    // Kita akan mengambil data user dari database
    // dengan menggunakan fungsi getUserById
    const user = await getUserById(id);

    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 200,
      message: `Pong from GET /api/users/${id} !`,
      // ?? Step 6 - Mengimplementasikan `GET /api/users/:id` (4)
      // Mengembalikan data user yang sudah diambil dari database
      data: user,
    });
  };
