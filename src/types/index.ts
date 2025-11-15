export type Competency = {
  id: string;
  title: string;
  description?: string;
  progress: number;
  milestones?: { id: string; label: string; completed: boolean }[];
  createdAt: string;
  updatedAt?: string;
};