import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

// nextjs 13부터 api 파일은 명시적으로 GET, POST 내보내야함.
export { handler as GET, handler as POST };
