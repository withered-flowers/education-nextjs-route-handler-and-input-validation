import DashboardSidebar from "@/components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // Whole Screen
    <section className="w-full h-screen flex">
      {/* Left Side */}
      <DashboardSidebar />

      {/* Right Side */}
      <main className="w-full h-full overflow-auto bg-white dark:bg-zinc-900/30 p-4">
        {/* Content */}
        {children}
      </main>
    </section>
  );
};

export default DashboardLayout;
