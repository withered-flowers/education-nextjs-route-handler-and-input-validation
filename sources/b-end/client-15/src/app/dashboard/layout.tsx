// ?? Step 6 - Membuat Routing /dashboard (1)
// layout ini akan meng-extend layout default dari NextJS (pages/app.tsx)
// Digunakan untuk menampilkan sidebar dan content
// import Link from "next/link";

// ?? Step 7 - Membuat Component DashboardSidebar (2)
// Import Component DashboardSidebar
// Delete component Link
import DashboardSidebar from "@/components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		// Whole Screen
		<section className="w-full h-screen flex">
			{/* Left Side */}
			{/* Step 7 - Membuat Component DashboardSidebar (3) */}
			{/* Mengganti aside yang ada dengan component DashboardSidebar */}
			<DashboardSidebar />

			{/* Right Side */}
			<main className="w-full h-full bg-white dark:bg-zinc-900/30 p-4">
				{/* Content */}
				{children}
			</main>
		</section>
	);
};

export default DashboardLayout;
