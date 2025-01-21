// di sini kita akan menggunakan NextRequest dan NextResponse
// yang merupakan extend dari Request dan Response
import { type NextRequest, NextResponse } from "next/server";

// ?? Step 6 - Mengimplementasikan `GET /api/users/:id` (1)
// import fungsi dari model user.ts
import { getUserById } from "@/db/models/user";

// Type definitions untuk Response yang akan dikembalikan
// sama dengan yang ada di file api/users/route.ts
// ? Bisa dibuat menjadi file tersendiri dan di-export !
type MyResponse<T> = {
	statusCode: number;
	message?: string;
	data?: T;
	error?: string;
};

// Karena di sini kita akan menerima parameter "id" dari URL
// Maka di sini kita akan menggunakan parameter kedua dari route handler
// yaitu berupa suatu Promise<Object params>
export const GET = async (
	// Di sini kita menggunakan _request karena kita tidak akan menggunakan
	// argument ini sekarang
	_request: NextRequest,
	// Perhatikan di sini params dalam bentuk sebuah Promise<Object>
	{ params }: { params: Promise<{ id: string }> },
) => {
	// Karena params adalah sebuah Promise,
	// maka kita harus menunggu hasil dari Promise tersebut
	const { id } = await params;

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
