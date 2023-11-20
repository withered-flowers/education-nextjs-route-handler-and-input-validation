// ?? Step 3 - Membuat Client Component `TableJokes` (6)
// Menambahkan perintah "use client" untuk mendeklarasikan component sebagai Client Component
"use client";

// ?? Step 3 - Membuat Client Component `TableJokes` (4)
// import Link dari "next/link"
import Link from "next/link";

// ?? Step 4 - Implementasi Delete pada Client Component `TableJokes` (3)
// Import hooks dengan nama useRouter untuk menavigasi (refresh) halaman nantinya
import { useRouter } from "next/navigation";

// ?? Step 3 - Membuat Client Component `TableJokes` (5)
// Membuat definition type untuk data yang akan di-parse
type Joke = {
  id: number;
  setup: string;
  delivery: string;
};

// ?? Step 3 - Membuat Client Component `TableJokes` (1)
// Membuat component TableJokes ini
const TableJokes = ({ jokes }: { jokes: Joke[] }) => {
  // ?? Step 4 - Implementasi Delete pada Client Component `TableJokes` (4)
  // Menggunakan useRouter
  const navigation = useRouter();

  // ?? Step 4 - Implementasi Delete pada Client Component `TableJokes` (2)
  // Membuat fungsi ini menjadi async karena kita akan melakukan fetch ke backend
  const buttonDeleteOnClickHandler = async (
    _event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    console.log("Delete Button Clicked for id:", id);

    // ?? Step 4 - Implementasi Delete pada Client Component `TableJokes` (1)
    // Menggunakan fetch untuk melakukan DELETE ke backend
    const response = await fetch(`http://localhost:3001/jokes/${id}`, {
      method: "DELETE",
    });
    const responseJson = await response.json();

    console.log("statusCode:", response.status, "result:", responseJson);

    // ?? Step 4 - Implementasi Delete pada Client Component `TableJokes` (5)
    // Menggunakan useRouter untuk melakukan refresh halaman
    navigation.refresh();
  };

  return (
    <>
      {/* ?? Step 3 - Membuat Client Component `TableJokes` (6) */}
      {/* Memindahkan table dari dashboard/jokes/page.tsx ke sini */}
      <table className="mt-4">
        <thead>
          <tr>
            <th className="p-4">No</th>
            <th className="p-4">Setup</th>
            <th className="p-4">Delivery</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke, idx) => (
            <tr key={joke.id}>
              <td>{idx + 1}</td>
              <td>{joke.setup}</td>
              <td>{joke.delivery}</td>
              <td className="p-2">
                <Link
                  href={`/dashboard/jokes/${joke.id}`}
                  className="py-2 px-4 bg-blue-200 hover:bg-blue-400 hover:text-white transition-colors duration-300 rounded"
                >
                  Detail
                </Link>
              </td>
              <td className="p-2">
                <button
                  onClick={(event) =>
                    buttonDeleteOnClickHandler(event, joke.id)
                  }
                  className="py-2 px-4 bg-red-200 hover:bg-red-400 hover:text-white transition-colors duration-300 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableJokes;
