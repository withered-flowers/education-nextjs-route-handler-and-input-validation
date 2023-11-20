// di sini kita akan menggunakan NextRequest dan NextResponse yang merupakan extend dari Request dan Response
import { NextRequest, NextResponse } from "next/server";

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
export const GET = (
  // Di sini kita menggunakan _request karena kita tidak akan menggunakan argument ini sekarang
  _request: NextRequest,
  // Perhatikan di sini params dalam bentuk sebuah Object
  { params }: { params: { id: string } },
) => {
  const id = params.id;

  return NextResponse.json<MyResponse<unknown>>({
    statusCode: 200,
    message: `Pong from GET /api/users/${id} !`,
  });
};
