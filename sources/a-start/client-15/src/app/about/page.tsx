// ?? Step 5 - Menambahkan "anchor" pada /about (1)
// Import Link
import Link from "next/link";

// Nama dari "Component" untuk page.tsx tidak perlu sama.
const AboutPage = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">About Page</h1>
      {/* ?? Step 5 - Menambahkan "anchor" pada /about (2) */}
      {/* Gunakan link di manapun diinginkan seperti layaknya tag <a> */}
      {/* Untuk props apa saja yang dimiliki link, bisa dibaca pada ref berikut */}
      {/* https://nextjs.org/docs/app/api-reference/components/link */}
      <Link
        href="/"
        className="underline text-blue-400 hover:text-blue-600 underline-offset-4 transition-colors duration-300"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default AboutPage;
