
import { Sidebar } from "@/components/dashboard/sidebar";





export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans antialiased bg-[#f8f9fb] min-h-screen">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative">{children}</main>
      </div>
    </div>
  );
}
