import type { Metadata } from "next";
import "./globals.css";
import "../styles/utilities.css"
import { ReactQueryClientProvider } from "@/providers/QueryClientProvider";
import StoreProvider from "@/providers/StoreProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from 'sonner';
import TopLoader from "@/components/TopLoader";

export const metadata: Metadata = {
  title: "MeDHr+",
  description: "Explore job and internships opportunities at MeDhr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <StoreProvider>
        <html lang="en" className="bg-white text-black">
          <body>
            <AuthProvider>
              {children}
              <Toaster position="top-right" richColors />
              <TopLoader />
            </AuthProvider>
          </body>
        </html>
      </StoreProvider>
    </ReactQueryClientProvider>
  );
}
