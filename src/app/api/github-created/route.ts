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
  return NextResponse.json(json);
};
