import { NextRequest, NextResponse } from "next/server";
import { Week } from "@/types/github";

export const GET = async (req: NextRequest) => {
  const username = req.nextUrl.searchParams.get("username");
  const year = req.nextUrl.searchParams.get("year");

  if (!username || !year) {
    return new NextResponse("Missing params", { status: 400 });
  }

  const start = `${year}-01-01T00:00:00Z`;
  const end = `${year}-12-31T23:59:59Z`;

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection(from: "${start}", to: "${end}") {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
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

  const days =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks?.flatMap(
      (week: Week) => week.contributionDays
    );

  return NextResponse.json(days || []);
};
