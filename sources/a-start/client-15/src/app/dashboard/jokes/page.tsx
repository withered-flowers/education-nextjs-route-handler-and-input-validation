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
	id: string;
	setup: string;
	delivery: string;
};

const fetchJokes = async () => {
	const response = await fetch("http://localhost:3001/jokes");
	const responseJson: Joke[] = await response.json();

	if (!response.ok) {
		throw new Error("Waduh Error ...");
	}

	return responseJson;
};

const DashboardJokePage = async () => {
	const jokes = await fetchJokes();

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

			{/* ?? Step 3 - Membuat Client Component `TableJokes` (8) */}
			{/* Gunakan component TableJokes */}
			<TableJokes jokes={jokes} />
		</section>
	);
};

export default DashboardJokePage;
