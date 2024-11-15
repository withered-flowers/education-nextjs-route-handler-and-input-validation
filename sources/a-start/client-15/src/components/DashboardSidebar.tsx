// ?? Step 7 - Membuat Component DashboardSidebar (1)
import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <aside className="w-64 h-full bg-gray-100 dark:bg-zinc-800/30 p-4">
      <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
      {/* Sidebar */}
      <ul>
        <li>
          <Link
            className="underline text-blue-400 hover:text-blue-600 underline-offset-4 transition-colors duration-300"
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="underline text-blue-400 hover:text-blue-600 underline-offset-4 transition-colors duration-300"
            href="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="underline text-blue-400 hover:text-blue-600 underline-offset-4 transition-colors duration-300"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </li>
        {/* Step 8 - Membuat Routing /dashboard/jokes (2) */}
        {/* Menambahkan link untuk menuju Dashboard Jokes */}
        <li className="ml-4">
          <Link
            className="underline text-blue-400 hover:text-blue-600 underline-offset-4 transition-colors duration-300"
            href="/dashboard/jokes"
          >
            Dashboard - Jokes
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
