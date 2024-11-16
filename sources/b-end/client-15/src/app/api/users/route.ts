// Di sini kita akan mengimport NextResponse
// Untuk penjelasannya ada di bawah yah !
import { NextResponse } from "next/server";

// ?? Step 3 - Mengimplementasikan `GET /api/users` (1)
// Import fungsi dan type yang diperlukan dari `db/models/user.ts`
import { getUsers } from "@/db/models/user";

// ?? Step 4 - Mengimplementasikan `POST /api/users` (1)
// Import fungsi diperlukan dari `db/models/user.ts`
import { createUser } from "@/db/models/user";

// ?? Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input (1)
// Mengimport z dari package zod untuk validasi
import { z } from "zod";

// Type definitions untuk Response yang akan dikembalikan
// Asumsi dari data yang dikembalikan:
// (Dibuat menjadi umum agar bisa digunakan di berbagai Response)
/*
  statusCode: number; <--- harus selalu ada statusCode
  message?: string; <--- optional
  data?: T; <--- optoinal dan berupa Generic Type
  error?: string; <--- optional
*/
type MyResponse<T> = {
	statusCode: number;
	message?: string;
	data?: T;
	error?: string;
};

// ?? Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input (2)
// Membuat schema untuk validasi input dari client
/*
	Harapan dari input client adalah:

	{
		"username": string, required;
		"email": string, required, email;
		"password": string, required, min 6 karakter;
		"super_admin": boolean, optional;
		"original_name": string, optional;
	}
*/
const UserInputSchema = z
	// Awalnya adalah sebuah object
	.object({
		// Key "username" harus ada dan bertipe string
		// Bila tidak ada, maka akan error
		username: z.string(),
		// Key "email" harus ada dan bertipe string dan harus berformat email
		// Bila bukan email, kita akan berikan error message "Email tidak valid"
		email: z.string().email({
			message: "Email tidak valid",
		}),
		// Key "password" harus ada dan bertipe string dan minimal 6 karakter
		// Bila bukan string, kita akan berikan error message "Password harus berupa string"
		// Bila kurang dari 6 karakter, kita akan berikan error message "Password minimal 6 karakter"
		password: z
			.string({
				message: "Password harus berupa string",
			})
			.min(6, {
				message: "Password minimal 6 karakter",
			}),
		// Key "super_admin" adalah optional dan bertipe boolean
		// Bila bukan boolean, kita akan berikan error message "Super Admin harus berupa boolean"
		super_admin: z
			.boolean({
				message: "Super Admin harus berupa boolean",
			})
			.optional(),
		// Key "original_name" adalah optional dan bertipe string
		// Bila bukan string, kita akan berikan error message "Original Name harus berupa string"
		original_name: z
			.string({
				message: "Original Name harus berupa string",
			})
			.optional(),
	});

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
	// ?? Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input (3)
	// Membungkus logic dalam try-catch
	try {
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

		// ?? Step 4 - Mengimplementasikan `POST /api/users` (3)
		// Di sini kita akan mengambil data yang dikirimkan oleh client
		// Asumsi: data yang dikirimkan oleh client adalah JSON
		// Perhatikan bahwa tipe data ini akan selalu menjadi "any"
		const data = await request.json();

		// ?? Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input (4)
		// Sebelum data akan digunakan, kita akan melakukan validasi terlebih dahulu
		// Di sini kita akan menggunakan fungsi safeParse() dari zod
		const parsedData = UserInputSchema.safeParse(data);

		// parsedData akan mengembalikan object dengan tipe data berikut:
		/*
      {
        success: boolean;
        data: unknown;
        error: z.ZodError | null;
      }
    */

		// Sehingga di sini kita akan melakukan pengecekan terlebih dahulu
		if (!parsedData.success) {
			// Kita akan throw error yang merupakan ZodError
			throw parsedData.error;
		}

		// Bila tidak ingin melakukan asumsi, maka kita bisa mengeceknya berdasarkan header "Content-Type"
		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
		// const contentType = request.headers.get("Content-Type");
		// if (contentType !== "application/json") { ... }

		// Di sini kita akan menggunakan fungsi createUser() yang sudah kita buat sebelumnya
		// const user = await createUser(data);

		// ?? Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input (5)
		// Di sini kita akan mengirimkan parsedData, bukan data
		const user = await createUser(parsedData.data);

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
	} catch (err) {
		// ?? Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input (6)
		// Perhatikan tipe data dari err adalah unknown dan kita akan menangkap error dari zod yang merupakan ZodError
		// Sehingga di sini kita harus melakukan pengecekan terlebih dahulu
		if (err instanceof z.ZodError) {
			console.log(err);

			// Di sini kita akan mengambil path dan message dari error yang terjadi
			// path = key dari object yang tidak sesuai dengan schema
			// message = pesan error yang terjadi
			const errPath = err.issues[0].path[0];
			const errMessage = err.issues[0].message;

			// Di sini kita akan mengembalikan NextResponse dengan status 400
			// karena client mengirimkan data yang tidak sesuai dengan schema yang kita buat
			return NextResponse.json<MyResponse<never>>(
				// Data yang akan dikirimkan ke client
				{
					statusCode: 400,
					error: `${errPath} - ${errMessage}`,
				},
				{
					status: 400,
				},
			);
		}

		// Di sini kita akan mengembalikan NextResponse dengan status 500
		// karena terjadi error yang tidak terduga
		return NextResponse.json<MyResponse<never>>(
			{
				statusCode: 500,
				message: "Internal Server Error !",
			},
			{
				status: 500,
			},
		);
	}
};
