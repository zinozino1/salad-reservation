import type { Metadata } from "next";
import { getSession } from "next-auth/react";
import { Inter } from "next/font/google";
import AuthProvider from "./_providers/AuthProvider";
import QueryProvider from "./_providers/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salad",
  description: "Salad",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { data: session } = useSession();

  const session = await getSession();

  // if (!session) {
  //   redirect("/login", RedirectType.replace);
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
