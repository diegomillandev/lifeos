import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "LifeOS",
  description: "Your Personal Life Operating System",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#ff7652" />
      </Head>
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="darkMode"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors/>
        </ThemeProvider>
      </body>
    </html>
  );
}
