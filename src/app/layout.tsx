import type { Metadata } from "next";
import { getSession } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./_providers/AuthProvider";
import QueryProvider from "./_providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "111",
    description: "11",
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
