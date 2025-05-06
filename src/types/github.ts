export interface ContributionDay {
  date: string;
  contributionCount: number;
  color?: string;
}

export interface Week {
  contributionDays: ContributionDay[];
}
