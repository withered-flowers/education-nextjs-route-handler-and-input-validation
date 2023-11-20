import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">About Page</h1>
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
