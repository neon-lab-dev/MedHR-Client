import Footer from "@/components/Footer";
import "../globals.css";
import Navbar from "@/components/Navbar";

export default function EmployeeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
