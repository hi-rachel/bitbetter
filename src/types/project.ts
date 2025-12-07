export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  serviceUrl: string;
  githubUrl?: string;
  image?: string; // 대표 사진
  startYear: number; // 프로젝트 시작 년도
}
