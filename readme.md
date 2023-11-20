# Education NextJS - Route Handler & Authentication

## Table of Content

- [Disclaimer](#disclaimer)
- [Scope Pembelajaran](#scope-pembelajaran)
- [Demo](#demo)
  - [Step 0a - Membuat Collection pada Atlas](#step-0a---membuat-collection-pada-atlas)
- [References](#references)

## Disclaimer

- Pada pembelajaran ini kita akan menggunakan `MongoDB` sebagai database untuk melakukan authentication. Untuk itu, kita akan menggunakan `MongoDB Atlas` sebagai layanan database yang akan kita gunakan.

  Pastikan sudah memiliki akun terlebih dahulu di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

- Pembelajaran ini menggunakan kode dari pembelajaran sebelumnya yang sudah dimodifikasi sedikit yah. Jadi jangan kaget bila starter code-nya berbeda dengan end code pada pembelajaran sebelumnya

- Pembelajaran ini menggunakan package `jsonwebtoken` sebagai pembuat JWT yang akan disimpan pada cookies, namun, apabila menggunakan `Vercel`, sebenarnya lebih disarankan untuk menggunakan package `jose` yah !

## Scope Pembelajaran

- Route Handler
- Middleware
- Authentication in NextJS

## Demo

Sampai pada titik ini kita sudah menggunakan NextJS pada sisi "FrontEnd" untuk melakukan fetching data dan memutasikan data. Pada pembelajaran kali ini kita akan menggunakan NextJS pada sisi "BackEnd" untuk membuat API sederhana sampai dengan membuat Authentication dengan NextJS yah.

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

## References
