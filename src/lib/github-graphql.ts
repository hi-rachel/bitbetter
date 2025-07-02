import { toast } from "react-hot-toast";

import { ContributionDay } from "@/types/github";

export const fetchUserCreatedYear = async (
  username: string
): Promise<number> => {
  const res = await fetch("/api/github-created", {
    method: "POST",
    body: JSON.stringify({ username }),
  });

  const json = await res.json();

  if (!res.ok) {
    toast.error(json.message || "GitHub 사용자 정보를 불러오지 못했습니다.");
    throw new Error(json.message);
  }

  const createdAt = json?.data?.user?.createdAt;

  if (!createdAt) {
    toast.error("GitHub 생성일이 없습니다.");
    throw new Error("Missing createdAt");
  }

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
