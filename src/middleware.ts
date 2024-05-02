// 이 줄만 추가해도 바로 미들웨어가 작동함.
export { default } from "next-auth/middleware";

// 아래 matcher 부분에 로그인한 상태에만 볼 수 있는 페이지를 게속 추가할 수 있다.
// 원하는 경로를 추가하면 nextauth가 자동으로 보호해준다.
// 자동으로 로그인페이지로 리다이렉트 시킴.
// @, () 잘 되나 봐야함.
export const config = {
  matcher: ["/posts/:path*"],
};
