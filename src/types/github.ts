export type ContributionDay = {
  date: string;
  contributionCount: number;
  color?: string;
};

export type Week = {
  contributionDays: ContributionDay[];
};
