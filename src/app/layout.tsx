import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SessionProvider } from "@/components/auth/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "HarborCart | Static E-commerce Demo",
  description: "Phase 1 static e-commerce storefront built for future microservice migration."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <SiteHeader />
          <main className="page-enter">{children}</main>
          <SiteFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
