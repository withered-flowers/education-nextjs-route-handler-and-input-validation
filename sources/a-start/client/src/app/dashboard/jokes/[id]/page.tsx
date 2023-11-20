// Membuat Type dari Joke yang akan diambil dari API
type Joke = {
  id: string;
  joke: string;
  categories: string[];
};

const fetchJokeById = async (id: number) => {
  const response = await fetch(`http://localhost:3001/jokes/${id}`);
  const data: Joke = await response.json();

  if (!response.ok) {
    throw new Error(`FAILED_FETCH_JOKE_${id}`);
  }

  return data;
};

const DashboardJokesByIdPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const joke = await fetchJokeById(
    Number(params.id) <= 0 ? 1 : Number(params.id)
  );

  return (
    <section>
      <h2 className="text-2xl font-semibold">
        Dashboard Page - Joke ({params.id})
      </h2>
      <pre>{JSON.stringify(joke, null, 2)}</pre>
    </section>
  );
};

export default DashboardJokesByIdPage;
