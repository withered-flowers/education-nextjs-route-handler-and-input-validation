// ?? Step 1 - Menambahkan "tombol" Detail pada `/dashboard/jokes` (1)
// Import Link untuk ke detail page
// import Link from "next/link";

// ?? Step 3 - Membuat Client Component `TableJokes` (7)
// Comment import Link
// Lakukan import TableJokes
import TableJokes from "@/components/TableJokes";

// ?? Step 6 - Membuat Form Add Joke (Client Component) (2)
// Mengimport component ClientFormAddJokes
import ClientFormAddJokes from "@/components/ClientFormAddJokes";

// ?? Step 7 - Membuat Form Add Joke (Server Rendered Component) (2)
// Mengimport component ServerFormAddJokes
import ServerFormAddJokes from "@/components/ServerFormAddJokes";

// Membuat definition type untuk data yang akan di-parse
type Joke = {
  id: number;
  setup: string;
  delivery: string;
};

const fetchJokes = async () => {
  // ?? Step 5 - Opt-out dari Data Cache (1),
  // Melakukan opt-out dari data cache
  // dengan menggunakan cache: "no-store"
  const response = await fetch("http://localhost:3001/jokes", {
    // ?? Step 7 - Membuat Form Add Joke (Server Rendered Component) (12)
    // Mematikan fungsi cache: no-store karena kita akan mencoba untuk menggunakan Server Rendered Component
    cache: "no-store",
  });
  const responseJson: Joke[] = await response.json();

  if (!response.ok) {
    throw new Error("Waduh Error ...");
  }

  return responseJson;
};

const DashboardJokePage = async () => {
  const jokes = await fetchJokes();

  // ?? Step 2 - Menambahkan tombol `Delete` pada `/dashboard/jokes` (1)
  // Karena kita sekarang akan membuat button yang bisa menghapus data, maka sekarang kita akan membutuhkan sebuah event handler (onClick) yah !
  // const buttonDeleteOnClickHandler = (
  //   // Info: untuk event ini akan memiliki interface dengan nama MouseEvent dan memiliki target interface HTMLButtonElement

  //   // Sehingga deklarasi typenya akan menjadi MouseEvent<HTMLButtonElement>
  //   // Mungkin di sini tidak akan digunakan, sehingga kita akan menambahkan _ (underscore) untuk mengabaikan parameter tersebut
  //   _event: React.MouseEvent<HTMLButtonElement>,
  //   id: number
  // ) => {
  //   // Kita di sini akan mencoba untuk mensimulasikan terlebih dahulu dengan menggunakan console.log
  //   console.log("Delete Button Clicked for id:", id);
  // };
  // ?? Step 3 - Membuat Client Component `TableJokes` (2)
  // Comment buttonDeleteOnClickHandler di atas

  return (
    <section>
      <h2 className="text-2xl font-semibold">Dashboard Page - Jokes</h2>

      {/* ?? Step 6 - Membuat Form Add Joke (Client Component) (3) */}
      {/* Memanggil component ClientFormAddJokes */}
      <section className="flex gap-4">
        <ClientFormAddJokes />
        {/* ?? Step 7 - Membuat Form Add Joke (Server Rendered Component) (3) */}
        {/* Memanggil component ServerFormAddJokes */}
        <ServerFormAddJokes />
      </section>

      {/* ?? Step 3 - Membuat Client Component `TableJokes` (3) */}
      {/* Comment table di bawah ini */}
      {/* <table className="mt-4">
        <thead>
          <tr>
            <th className="p-4">No</th>
            <th className="p-4">Setup</th>
            <th className="p-4">Delivery</th> */}
      {/* ?? Step 1 - Menambahkan "tombol" Detail pada `/dashboard/jokes` (2) */}
      {/* Menambahkan sebuah header untuk "Action" */}
      {/* <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody> */}
      {/* {jokes.map((todo, idx) => (
            <tr key={todo.id}>
              <td>{idx + 1}</td>
              <td>{todo.setup}</td>
              <td>{todo.delivery}</td> */}
      {/* Step 1 - Menambahkan "tombol" Detail pada `/dashboard/jokes` (3) */}
      {/* Menambahkan sebuah td untuk menggunakan component Link yang akan ditampilkan sebagai sebuah button */}
      {/* <td className="p-2">
                <Link
                  href={`/dashboard/jokes/${todo.id}`}
                  className="py-2 px-4 bg-blue-200 hover:bg-blue-400 hover:text-white transition-colors duration-300 rounded"
                >
                  Detail
                </Link>
              </td> */}
      {/* ?? Step 2 - Menambahkan tombol `Delete` pada `/dashboard/jokes` (2) */}
      {/* Di sini kita akan menambahkan button untuk melakukan interaksi buttonDeleteOnClickHandler */}
      {/* <td className="p-2">
                <button
                  onClick={(event) =>
                    buttonDeleteOnClickHandler(event, todo.id)
                  }
                  className="py-2 px-4 bg-red-200 hover:bg-red-400 hover:text-white transition-colors duration-300 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* ?? Step 3 - Membuat Client Component `TableJokes` (8) */}
      {/* Gunakan component TableJokes */}
      <TableJokes jokes={jokes} />
    </section>
  );
};

export default DashboardJokePage;
