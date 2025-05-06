import { ContributionDay, Week } from "@/types/github";

export const fetchGitHubContributions = async (
  username: string,
  year: number
): Promise<ContributionDay[]> => {
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
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();

  const days =
    json.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week: Week) => week.contributionDays
    );

  return days;
};
