export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  isCompleted: boolean;
  assignedTo: string | null;
}

export interface IUser {
  name: string;
  id: string;
}
