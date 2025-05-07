import { ContributionDay } from "@/types/github";

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
