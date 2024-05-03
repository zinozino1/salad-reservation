import LoginForm from "@/app/_component/LoginForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session) {
        console.log(session);
        // role에 따라 나누면 된다.
        if (session.user.email === "jh__park@lotte.net") {
            // redirect("/reservation");
        } else {
            // redirect("/dashboard");
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center space-y-10 p-24 bg-zinc-500 scroll-m-1">
            <div className="flex border-green-950">ee</div>
            asdfasdf123213fffffff
            {/* <LoginForm /> */}
        </main>
    );
}
