import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username } = await req.json();

  const query = `
    query {
      user(login: "${username}") {
        createdAt
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();

  if (json.errors && json.errors[0]?.type === "NOT_FOUND") {
    return NextResponse.json(
      { message: "GitHub 유저를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const createdAt = json?.data?.user?.createdAt;
  if (!createdAt) {
    return NextResponse.json(
      { message: "GitHub 생성일 정보를 불러오지 못했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(json);
};
