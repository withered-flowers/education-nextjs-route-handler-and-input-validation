# Education NextJS - Route Handler & Input Validation

## Table of Content

- [Disclaimer](#disclaimer)
- [Scope Pembelajaran](#scope-pembelajaran)
- [Demo](#demo)
  - [Step 0a - Membuat Collection pada Atlas](#step-0a---membuat-collection-pada-atlas)
  - [Step 0b - Membuat Konfigurasi Driver MongoDB](#step-0b---membuat-konfigurasi-driver-mongodb)
  - [Step 1 - Membuat Kerangka Route Handler `/api/users`](#step-1---membuat-kerangka-route-handler-apiusers)
  - [Step 2 - Membuat Kerangka Route Handler `/api/users/:id`](#step-2---membuat-kerangka-route-handler-apiusersid)
  - [Step 3 - Mengimplementasikan `GET /api/users`](#step-3---mengimplementasikan-get-apiusers)
  - [Step 4 - Mengimplementasikan `POST /api/users`](#step-4---mengimplementasikan-post-apiusers)
  - [Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input](#step-5---mengimplementasikan-zod-sebagai-validasi-input)
  - [Step 6 - Mengimplementasikan `GET /api/users/:id`](#step-6---mengimplementasikan-get-apiusersid)
- [References](#references)

## Disclaimer

- Pembelajaran ini menggunakan kode dari pembelajaran sebelumnya yang sudah dimodifikasi sedikit yah. Jadi jangan kaget bila starter code-nya berbeda dengan end code pada pembelajaran sebelumnya
- Pembelajaran ini belum sampai tahap melakukan `Authentication`, hanya baru sampai membuat kerangkanya saja.
- Pada pembelajaran ini kita akan menggunakan `MongoDB` sebagai databasenya. Untuk itu, kita akan menggunakan `MongoDB Atlas` sebagai layanan database yang akan kita gunakan.

  Pastikan sudah memiliki akun terlebih dahulu di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Scope Pembelajaran

- Route Handler
- Zod (Schema Validation)

## Demo

Sampai pada titik ini kita sudah menggunakan NextJS pada sisi "FrontEnd" untuk melakukan fetching data dan memutasikan data.

Pada pembelajaran kali ini kita akan menggunakan NextJS pada sisi "BackEnd" untuk membuat API sederhana sampai dengan membuat kerangka untuk melakukan `Authentication` nantinya dengan NextJS yah.

### Step 0a - Membuat Collection pada Atlas

Pada langkah ini kita akan membuat Collection pada MongoDB Atlas dan melakukan seeding data pada collection tersebut secara manual (manual entry via Atlas)

1. Membuka browser dan menuju ke [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
1. Login ke akun MongoDB Atlas dan membuka Project yang akan digunakan
1. Pilih database yang digunakan kemudian pilih `Browse Collections`
1. Pilih `+ Create Database` (bila sudah memiliki database) atau `Add My Own Data` (bila belum memiliki database)
1. Ketik database name `pengembangan`
1. Ketik collection name `Users`
1. Pada kolom `Additional Preferences`, akan kita kosongkan
1. Tekan tombol `create`

   ![01.png](./assets/01.png)

1. Pada halaman collection `Users` yang sudah dibuat, pilih `INSERT DOCUMENT`
1. Pada modal `Insert Document ini`, pilih `VIEW` yang berbentuk `{}`, kemudian masukkan data di bawah ini pada kolom tersebut

   ```json
   [
     {
       "_id": { "$oid": "655b16efb33bbc4838928d5a" },
       "username": "developer",
       "email": "developer@mail.com",
       "password": "$2a$10$3oBIQBujHQ61vLHn.Nxk..h9SS29vYihvE9CqrPi6yTxFYm1uixgm"
     },
     {
       "_id": { "$oid": "655b17c3aef0d8a5d9d180d9" },
       "username": "admin",
       "email": "admin@mail.com",
       "password": "$2a$10$6OhSE/SgQQPWLe3VFtnNZuZcpu4x445yJm5cgdVZxfb6AYpCKtdkC",
       "superadmin": true
     },
     {
       "_id": { "$oid": "655b17fc36dce13753b7efda" },
       "username": "other",
       "email": "other@mail.com",
       "password": "$2a$10$6SA9Z5J8aD0QyuQSfFBC4uMb2JIfHnpJHKN75V0q0zIELlxWQzK9W",
       "original_name": "Just Another"
     }
   ]
   ```

1. Tekan tombol `Insert`

   ![02.png](./assets/02.png)

Sampai pada tahap ini, kita sudah berhasil untuk memasukkan data yang dimiliki ke dalam Atlas yah.

### Step 0b - Membuat Konfigurasi Driver MongoDB

Pada langkah ini kita akan membuat konfigurasi awal untuk menggunakan driver mongodb agar dapat terkoneksi dengan Atlas via package `mongodb`.

Adapun langkah-langkahnya adalah sebagai berikut:

1. Membuka [halaman utama Atlas](https://cloud.mongodb.com/)
1. Menekan tombol `Connect` kemudian memilih `Drivers`
1. Pada langkah `3. Add your connection string into your application code`, akan diberikan sebuah string yang diawali dengan `mongo+srv`, tekan tombol copy
1. Kembali pada halaman project pada VSCode, membuat sebuah file baru dengan nama `.env` pada root folder (`sources/a-start/client/.env`)
1. Membuat sebuah key baru dengan nama `MONGODB_CONNECTION_STRING="<isikan_dengan_string_yang_dicopy_tadi>"` (**perhatikan bahwa ada double quote pada string tersebut**)
1. Membuat sebuah key baru dengan nama `MONGODB_DB_NAME=pengembangan`
1. Menginstall package `mongodb` dengan perintah `npm install mongodb`
1. Menginstall package `bcrypt` dengan perintah `npm install bcryptjs`
1. Menginstall type definition `bcrypt` dengan perintah `npm install -D @types/bcryptjs`
1. Membuat folder baru pada `src` dengan nama `db` (`/src/db`)
1. Membuat folder baru pada `src/db` dengan nama `config` dan `models` (`/src/db/config` dan `/src/db/models`)
1. Membuat file baru dengan nama `index.ts` pada folder `config` (`src/config/index.ts`) dan menuliskan kode sebagai berikut:

   ```ts
   import { MongoClient } from "mongodb";

   const connectionString = process.env.MONGODB_CONNECTION_STRING;

   // Memastikan bahwa connectionString sudah ada value-nya
   if (!connectionString) {
     throw new Error("MONGODB_CONNECTION_STRING is not defined");
   }

   // Tipe data dari client adalah MongoClient
   let client: MongoClient;

   // Fungsi ini akan mengembalikan client yang sudah terkoneksi dengan MongoDB
   // Hanya boleh ada 1 instance client (Singleton)
   export const getMongoClientInstance = async () => {
     if (!client) {
       client = await MongoClient.connect(connectionString);
       await client.connect();
     }

     return client;
   };
   ```

1. Membuat sebuah file baru dengan nama `user.ts` pada folder `models` (`src/models/user.ts`) dan menuliskan kode sebagai berikut:

   ```ts
   import { Db, ObjectId } from "mongodb";
   import { getMongoClientInstance } from "../config";
   import { hashText } from "../utils/hash";

   // Mendefinisikan type dari UserModel
   export type UserModel = {
     _id: ObjectId;
     username: string;
     email: string;
     password: string;
     // Perhatikan di sini menggunakan ? (optional)
     // Karena tidak semua data yang ada di dalam collection memiliki field ini
     superadmin?: boolean;
     original_name?: string;
   };

   // Mendefinisikan type dari UserModelCreateInput yang tidak menggunakan _id
   export type UserModelCreateInput = Omit<UserModel, "_id">;

   // constant value
   const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
   const COLLECTION_USER = "Users";

   // Model CRUD
   export const getDb = async () => {
     const client = await getMongoClientInstance();
     const db: Db = client.db(DATABASE_NAME);

     return db;
   };

   export const getUsers = async () => {
     const db = await getDb();

     // Di sini kita akan mendefinisikan type dari users
     // Karena kembalian dari toArray() adalah array `WithId<Document>[]`
     // kita akan type casting menjadi UserModel[] dengan menggunakan "as"
     const users = (await db
       .collection(COLLECTION_USER)
       .find({})
       // Exclude kolom password
       // (For the sake of security...)
       .project({ password: 0 })
       .toArray()) as UserModel[];

     return users;
   };

   export const createUser = async (user: UserModelCreateInput) => {
     // Kita akan memodifikasi user yang baru
     // karena butuh untuk meng-hash password
     // (For the sake of security...)
     const modifiedUser: UserModelCreateInput = {
       ...user,
       password: hashText(user.password),
     };

     const db = await getDb();
     const result = await db
       .collection(COLLECTION_USER)
       .insertOne(modifiedUser);

     return result;
   };

   export const findUserByEmail = async (email: string) => {
     const db = await getDb();

     const user = (await db
       .collection(COLLECTION_USER)
       .findOne({ email: email })) as UserModel;

     return user;
   };
   ```

Sampai pada tahap ini artinya kita sudah siap untuk membuat sisi "BackEnd" dari NextJS yang cukup sederhana yah !

### Step 1 - Membuat Kerangka Route Handler `/api/users`

Pada langkah ini kita akan mencoba untuk membuat kerangka untuk route `/api/users`, yaitu:

- `GET /api/users` untuk mendapatkan semua data user
- `POST /api/users` untuk membuat user baru

Untuk bisa membuat `endpoint` seperti ini, kita akan menggunakan `Route Handlers` yang sudah disediakan oleh NextJS.

`Route Handlers` didefinisikan di dalam NextJS dalam file bernama `route.js` atau `route.ts` yang berada di dalam folder `app`, dan di dalam file tersebut kita bisa mendefinisikan `endpoint` yang akan kita buat via fungsi dengan nama HTTP method yang diinginkan dalam `CAPSLOCK` a.k.a `GET`, `POST`, `PUT`, `DELETE`, dan lain-lain.

```ts
// GET /api/nama_resource/route.ts
export const GET = () => {
  // Do some magic here
};

// POST /api/nama_resource/route.ts
export const POST = () => {
  // Do some magic here
};
```

> Bagi yang menggunakan `pages` untuk membuat `endpoint`, maka pembelajaran ini bukan yang paling tepat untuk Anda yah...

Adapun langkah-langkah pembuatannya adalah sebagai berikut:

1. Membuat sebuah folder baru pada folder `app` dengan nama `api` (`src/app/api`)
1. Membuat sebuah folder baru di dalam `api` dengan nama `users` (`src/app/api/users`)
1. Membuat sebuah file baru dengan nama `route.ts` (`src/app/api/users/route.ts`) dan memasukkan kode sebagai berikut:

   ```ts
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
       }
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
       }
     );
   };
   ```

1. Menjalankan aplikasi dengan perintah `npm run dev`
1. Membuka HTTP REST Client yang bisa digunakan seperti [Postman](https://www.postman.com/) atau [Insomnia](https://insomnia.rest/) atau [VSCode REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) dan cobalah untuk menembak pada endpoint berikut:

   - `GET http://localhost:3000/api/users`
   - `POST http://localhost:3000/api/users`

   Dan lihatlah hasilnya, apakah sesuai dengan json yang dibuat?

### Step 2 - Membuat Kerangka Route Handler `/api/users/:id`

Pada langkah ini kita akan mencoba untuk membuat kerangka untuk route `/api/users/:id`, yaitu:

- `GET /api/users/:id` untuk mendapatkan data user berdasarkan id

Adapun langkah-langkah pembuatannya adalah sebagai berikut:

1. Membuat sebuah folder baru pada folder `users` dengan nama `[id]` (`src/app/api/users/[id]`)
1. Membuat sebuah file baru dengan nama `route.ts` (`src/app/api/users/[id]/route.ts`) dan menuliskan kode sebagai berikut:

   ```ts
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
     { params }: { params: { id: string } }
   ) => {
     const id = params.id;

     return NextResponse.json<MyResponse<unknown>>({
       statusCode: 200,
       message: `Pong from GET /api/users/${id} !`,
     });
   };
   ```

1. Membuka HTTP Rest Client dan menembak ke endpoint `GET http://localhost:3000/api/users/123` dan lihatlah hasilnya

   Apakah sesuai dengan json yang dibuat?

### Step 3 - Mengimplementasikan `GET /api/users`

Pada langkah ini kita akan mencoba untuk mengimplementasikan endpoint `GET /api/users` dengan benar.

Endpoint ini akan mengembalikan data user yang ada di dalam collection `Users` yang ada di dalam database `pengembangan` dalam MongoDB Atlas yang sudah kita buat sebelumnya.

Adapun langkah-langkah pembuatannya adalah sebagai berikut:

1. Membuka kembali file `route.ts` dalam folder `users` (`/src/app/api/users/route.ts`)
1. Memodifikasi file menjadi seperti berikut:

   ```ts
   import { NextResponse } from "next/server";

   // ?? Step 3 - Mengimplementasikan `GET /api/users` (1)
   // Import fungsi dan type yang diperlukan dari `db/models/user.ts`
   import { getUsers } from "@/db/models/user";

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

     return Response.json(
       {
         statusCode: 200,
         message: "Pong from GET /api/users !",
         // ?? Step 3 - Mengimplementasikan `GET /api/users` (3)
         // Di sini kita akan mengirimkan data users
         data: users,
       },

       {
         status: 200,
       }
     );
   };

   // POST /api/users
   export const POST = async () => {
     return NextResponse.json<MyResponse<never>>(
       {
         statusCode: 201,
         message: "Pong from POST /api/users !",
       },
       {
         status: 201,
       }
     );
   };
   ```

1. Membuka HTTP Rest Client dan menembak ke endpoint `GET http://localhost:3000/api/users/` dan lihatlah hasilnya.

   Apakah sekarang sudah mendapatkan data kembalian dari Atlas?

### Step 4 - Mengimplementasikan `POST /api/users`

Pada langkah ini kita akan mencoba untuk mengimplementasikan endpoint `POST /api/users` dengan benar.

Endpoint ini akan menerima input berupa JSON yang berisi data user yang akan dibuat dan akan menyimpan data tersebut ke dalam collection `Users` yang ada di dalam database `pengembangan` dalam MongoDB Atlas yang sudah kita buat sebelumnya.

Adapun langkah-langkah pembuatannya adalah sebagai berikut:

1. Membuka kembali file `route.ts` dalam folder `users` (`/src/app/api/users/route.ts`)
1. Memodifikasi file menjadi seperti berikut:

   ```ts
   import { NextResponse } from "next/server";

   import { getUsers } from "@/db/models/user";

   // ?? Step 4 - Mengimplementasikan `POST /api/users` (1)
   // Import fungsi diperlukan dari `db/models/user.ts`
   import { createUser } from "@/db/models/user";

   type MyResponse<T> = {
     statusCode: number;
     message?: string;
     data?: T;
     error?: string;
   };

   // GET /api/users
   export const GET = async () => {
     const users = await getUsers();

     return Response.json(
       {
         statusCode: 200,
         message: "Pong from GET /api/users !",
         data: users,
       },

       {
         status: 200,
       }
     );
   };

   // POST /api/users
   // ?? Step 4 - Mengimplementasikan `POST /api/users` (2)
   // Menambahkan parameter request: Request pada POST
   export const POST = async (request: Request) => {
     // ?? Step 4 - Mengimplementasikan `POST /api/users` (3)
     // Di sini kita akan mengambil data yang dikirimkan oleh client
     // Asumsi: data yang dikirimkan oleh client adalah JSON
     // Perhatikan bahwa tipe data ini akan selalu menjadi "any"
     const data = await request.json();

     // Bila tidak ingin melakukan asumsi, maka kita bisa mengeceknya berdasarkan header "Content-Type"
     // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
     // const contentType = request.headers.get("Content-Type");
     // if (contentType !== "application/json") { ... }

     // Di sini kita akan menggunakan fungsi createUser() yang sudah kita buat sebelumnya
     const user = await createUser(data);

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
       {
         status: 201,
       }
     );
   };
   ```

1. Membuka HTTP Rest Client dan menembak ke endpoint `POST http://localhost:3000/api/users/` dengan body berupa JSON sebagai berikut:

   ```json
   {
     "email": "john@doe.com",
     "password": "123456"
   }
   ```

1. Lihatlah hasilnya, apakah akan memberikan data berupa `acknowledged: true` dan `insertedId: "xxxxx"` ? dan cek juga Apakah data tersebut sudah masuk ke dalam Atlas?

   Ya sampai pada tahap ini kita sudah berhasil untuk mengimplementasikan POST untuk membuat user baru yah !

   Tapi sampai di sini ada masalah:

   - `Mengapa email dan password saja tetap bisa masuk yah?`
   - `Padahal kan model kita mengharuskan menerima email, username, dan password?`
   - `Kok jadi beda begini, nanti bisa bahaya donk?`

   Karena sampai pada tahap ini, kita belum melakukan validasi terhadap input yang diberikan oleh client !

   Sayangnya untuk mem-validasi input-an yang diberikan oleh client, NextJS tidak menyediakan built-in function untuk melakukan validasi, sehingga kita harus menggunakan package lain untuk melakukan validasi.

   Untuk itu kita akan menggunakan `zod` sebagai package untuk melakukan validasi input-an dari client.

### Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input

Pada langkah ini kita akan mencoba untuk menggunakan package bernama `zod` untuk melakukan validasi terhadap suatu schema / input-an yang kita terima dari client.

`zod`, dikutip dari situs resminya, adalah:

> TypeScript-first schema validation with static type inference

TL;DR: `zod` adalah suatu validasi schema yang memang typescript friendly.

Adapun langkah-langkah pembuatannya adalah sebagai berikut:

1. Menginstall package `zod` dengan perintah `npm install zod`
1. Membuka file `route.ts` pada folder `users` (`/src/app/api/users/route.ts`) dan memodifikasi filenya menjadi sebagai berikut:

   ```ts
   import { NextResponse } from "next/server";

   import { getUsers } from "@/db/models/user";

   import { createUser } from "@/db/models/user";

   // ?? Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input (1)
   // Mengimport z dari package zod untuk validasi
   import { z } from "zod";

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
   const userInputSchema = z
     // Awalnya adalah sebuah object
     .object({
       // Key "username" harus ada dan bertipe string
       username: z.string(),
       // Key "email" harus ada dan bertipe string dan harus berformat email
       email: z.string().email(),
       // Key "password" harus ada dan bertipe string dan minimal 6 karakter
       password: z.string().min(6),
       // Key "super_admin" adalah optional dan bertipe boolean
       super_admin: z.boolean().optional(),
       // Key "original_name" adalah optional dan bertipe string
       original_name: z.string().optional(),
     });

   // GET /api/users
   export const GET = async () => {
     const users = await getUsers();

     return Response.json(
       {
         statusCode: 200,
         message: "Pong from GET /api/users !",
         data: users,
       },
       {
         status: 200,
       }
     );
   };

   // POST /api/users
   export const POST = async (request: Request) => {
     // ?? Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input (3)
     // Membungkus logic dalam try-catch
     try {
       const data = await request.json();

       // ?? Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input (4)
       // Sebelum data akan digunakan, kita akan melakukan validasi terlebih dahulu
       // Di sini kita akan menggunakan fungsi safeParse() dari zod
       const parsedData = userInputSchema.safeParse(data);

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

       // ?? Step 5 - Mengimplementasikan `zod` Sebagai Validasi Input (5)
       // Di sini kita akan mengirimkan parsedData, bukan data
       const user = await createUser(parsedData.data);

       return NextResponse.json<MyResponse<unknown>>(
         {
           statusCode: 201,
           message: "Pong from POST /api/users !",
           data: user,
         },
         {
           status: 201,
         }
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
           }
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
         }
       );
     }
   };
   ```

1. Membuka HTTP Rest Client dan menembak ke endpoint `POST http://localhost:3000/api/users/` dengan body berupa JSON sebagai berikut:

   ```json
   {
     "email": "johndoe@mail.com",
     "password": "123456"
   }
   ```

   Dan coba lihat hasilnya, apakah sudah "dimarahi" oleh `zod`?

Pada tahapan ini kita sudah berhasil menggunakan `zod` sebagai validasi input yang diterima oleh client yah.

Sebenarnya implementasi dari `zod` ini tidak hanya sekedar untuk validasi saja, tapi sampai dengan mendapatkan tipe data dari inputan tersebut (yang sebelumnya `any`, bisa menjadi tipe data sesuai schema yang dibuat.).

Hal ini sangat bagus karena kita bisa memiliki tipe data yang dibutuhkan dalam aplikasi.

### Step 6 - Mengimplementasikan `GET /api/users/:id`

Pada langkah ini kita akan mencoba untuk mengimplementasikan endpoint `GET /api/users/:id` dengan benar.

Endpoint ini akan mengembalikan data user yang ada di dalam collection `Users` yang ada di dalam database `pengembangan` dalam MongoDB Atlas yang sudah kita buat sebelumnya berdasarkan `id` yang diberikan oleh client.

Adapun langkah-langkah pembuatannya adalah sebagai berikut:

## References

- https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- https://nextjs.org/docs/pages/api-reference/functions/next-server#nextrequest
- https://nextjs.org/docs/pages/api-reference/functions/next-server#nextresponse
