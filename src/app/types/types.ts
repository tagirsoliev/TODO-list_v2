export interface TaskDraft  {
  value: string;
  type: string;
  isDone: boolean;
}
export interface Task extends TaskDraft {
    id: number;
}

export interface SelectOption {
  id: string;
  name: string;
}
