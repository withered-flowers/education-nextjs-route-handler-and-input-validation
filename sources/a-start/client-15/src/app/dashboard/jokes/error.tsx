// ?? Step 11 - Membuat halaman error untuk /dashboard/jokes (1)
// Deklarasi error sebagai Client Component
"use client";

// ?? Step 12 - Menampilkan error yang di-throw dari server (1)
// Di sini kita akan menggunakan useEffect untuk meng-handle error
// Karena ini menggunakan client component, kita bisa menggunakan useEffect
import { useEffect } from "react";

// ?? Step 11 - Membuat halaman error untuk /dashboard/jokes (2)
// Membuat component seperti biasa

// ?? Step 12 - Menampilkan error yang di-throw dari server (2)
// Menerima props khusus untuk error: error dan reset
// error: berupa Error dan sebuah object yang berisi digest (optional), tipe string
// reset: berupa sebuah fungsi yang akan mereturn sesuatu yang berupa void
//        - digunakan untuk me-re-render segment yang terjadi error
const DashboardErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  /* ?? Step 12 - Menampilkan error yang di-throw dari server (5) */
  /* Mensimulasikan error yang terjadi dan bisa berubah */
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <section>
      <p className="text-red-400 animate-pulse">
        {/* ?? Step 12 - Menampilkan error yang di-throw dari server (3) */}
        Something wicked happened: {error.message}
      </p>
      {/* ?? Step 12 - Menampilkan error yang di-throw dari server (4) */}
      {/* Membuat button untuk melakukan reset */}
      <button
        type="button"
        className="py-2 px-4 bg-red-400 rounded hover:text-white transition-colors duration-300"
        onClick={() => reset()}
      >
        Reset
      </button>
    </section>
  );
};

export default DashboardErrorPage;
