// Di sini kita akan mengimport NextResponse
// Untuk penjelasannya ada di bawah yah !
import { NextResponse } from "next/server";

// Type definitions untuk Response yang akan dikembalikan
type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

// GET /api/users
export const GET = async () => {
  // Di sini yang akan dikembalikan adalah Response dari Web API
  // (Standard Web API: Request untuk mendapatkan data dan Request untuk mengirimkan data)
  // https://developer.mozilla.org/en-US/docs/Web/API/Request
  // https://developer.mozilla.org/en-US/docs/Web/API/Response
  return Response.json(
    // Data yang akan dikirimkan ke client
    {
      statusCode: 200,
      message: "Pong from GET /api/users !",
    },
    // Object informasi tambahan (status code, headers, dll)
    {
      // Default status adalah 200
      status: 200,
    },
  );
};

// POST /api/users
export const POST = async () => {
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
  return NextResponse.json<MyResponse<never>>(
    // Data yang akan dikirimkan ke client
    {
      statusCode: 201,
      message: "Pong from POST /api/users !",
    },
    // Object informasi tambahan (status code, headers, dll)
    {
      // Karena di sini menggunakan non-default status (bukan 200)
      // maka di sini kita menuliskan status: 201
      status: 201,
    },
  );
};
