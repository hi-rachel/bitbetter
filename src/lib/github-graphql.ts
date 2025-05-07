import { ContributionDay } from "@/types/github";

export const fetchUserCreatedYear = async (
  username: string
): Promise<number> => {
  const query = `
    query {
      user(login: "${username}") {
        createdAt
      }
    }
  `;

  const res = await fetch("/api/github-created", {
    method: "POST",
    body: JSON.stringify({ username, query }),
  });

  if (!res.ok) throw new Error("Failed to fetch user createdAt");

  const json = await res.json();
  const createdAt = json?.data?.user?.createdAt;
  return new Date(createdAt).getFullYear();
};

export const fetchGitHubContributions = async (
  username: string,
  year: number
): Promise<ContributionDay[]> => {
  const res = await fetch(
    `/api/github-contributions?username=${username}&year=${year}`
  );
  if (!res.ok) throw new Error("Failed to fetch contributions");
  return res.json();
};
