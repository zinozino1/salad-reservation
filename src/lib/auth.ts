import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      // login form 내용 UI적 내용인듯.
      credentials: {
        username: { label: "id", type: "text", placeholder: "id" },
        password: { label: "password", type: "password" },
      },

      // 아이디와 패스워드 부분을 체크해서 맞으면 user 리턴, 틀리면 null 리턴
      async authorize(credentials, req) {
        // 추후 백엔드 url로 변경
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        // 아래 res.json()에서 이걸 리턴함(추후 백엔드 부분이겠지)
        // result :  {
        //   id: 1,
        //   email: 'jh__park@lotte.net',
        //   name: '박진호',
        //   department: 'SaaS 운영팀 운영 1담당',
        //   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqaF9fcGFya0Bsb3R0ZS5uZXQiLCJuYW1lIjoi67CV7KeE7Zi4IiwiZGVwYXJ0bWVudCI6IlNhYVMg7Jq07JiB7YyAIOyatOyYgSAx64u064u5IiwiaWF0IjoxNzE0NTcwMzAzLCJleHAiOjE3MTQ1NzM5MDN9.lBqUKVnCq5uZbcsrzgfxpdqik6oHT7S67aI_iCbFPzo'
        // }
        const user = await res.json();

        // nextauth는 null이 아닌걸 리턴하게되면 로그인이 되었다고 본다.
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  events: {
    // 추후 signIn이나 signOut 커스터마이징 가능?
  },
  // callback은 로그인 폼에서 유저네임과 패스워드를 넣고 제출하기 버튼을 눌렀을 때,
  // nextAuth의 authorize함수에서 로그인 로직을 수행하고 나서 마지막으로 실행되는 부분
  callbacks: {
    // 아래 함수에서 token과 user를 같은 항목으로 만들고 리턴함.
    // 그러면 다시 token을 리턴하게 되는데, 밑에 있는 session 콜백 함수에서 session.user에 그 값을 지정하고 다시 session을 리턴함.
    // 이렇게 하면 nextauth에서 사용하는 session에 accessToken이 포함되게 된다.
    // signIn() {
    //   console.log("sign in!!!!!!");
    //   return true;
    // },
    async jwt({ token, user }) {
      // user에서 들어오는 accessToken을 ...token에서 말아주는건가?
      return { ...token, ...user };
    },

    async session({ session, token }) {
      // 이걸 보아하니 token이란 객체는 jwt에서 말아주는 객체인듯
      session.user = token as any;
      return session;
    },
  },

  // 커스텀 로그인 페이지를 만들 수 있게 API를 제공해준다.
  pages: {
    signIn: "/login",
  },
  // session: {
  //   strategy: "jwt",
  //   maxAge: 3000,
  // },
};
