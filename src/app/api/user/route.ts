// NOTE: prisma DB test용 production에서 제거

import prisma from "@/lib/prisma";

interface RequestBody {
  name: string;
  email: string;
  password: string;
  department: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
      department: body.department,
    },
  });

  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}
