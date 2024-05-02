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
    //   <main
    //     className="flex min-h-screen flex-col items-center space-y-10 p-24 bg-zinc-500 scroll-m-1"
    //     style={{ border: "1px solid red" }}
    //   >
    //     <div className="flex border-green-950">홈페이지</div>
    //     <div className="sm:hidden md:hidden lg:hidden">
    //       {/* <!-- 모바일 화면에서만 보여질 콘텐츠 --> */}
    //     </div>

    //     <div className="hidden sm:block md:block lg:block text-center p-5">
    //       {/* <!-- 더 큰 화면에서 보여질 모바일 기기 사용 안내 메시지 -->
    // 이 웹사이트는 모바일 화면에 최적화되어 있습니다. 모바일 기기를 사용해 주세요. */}
    //     </div>
    //     <LoginForm />
    //   </main>
    <h1 className="text-3xl font-bold underline font-light">Hello, Next.js!</h1>
  );
}
