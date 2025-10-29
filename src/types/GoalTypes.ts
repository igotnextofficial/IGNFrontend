export type GoalStatus = "active" | "in_progress" | "completed" | "archived";
export type ObjectiveStatus = "pending" | "in_progress" | "completed";

export interface GoalSpecialty {
  id: string;
  name: string;
}

export interface GoalUserSummary {
  id?: string;
  first_name?: string;
  last_name?: string;
}

export interface GoalObjective {
  id?: string;
  task: string;
  description?: string | null;
  status: ObjectiveStatus;
  due_at?: string | null;
  completed_at?: string | null;
  sequence: number;
  assigned_by?: GoalUserSummary | null;
  assigned_to?: GoalUserSummary | null;
}

export interface GoalResource {
  id: string;
  goal: string;
  status: GoalStatus;
  completed_at?: string | null;
  created_at?: string;
  updated_at?: string;
  progress: number;
  specialty?: GoalSpecialty | null;
  is_primary: boolean;
  source: "mentee" | "mentor";
  objectives: GoalObjective[];
}

export interface GoalPrompt {
  id: string;
  user_id: string;
  context: string;
  dismissed_at?: string | null;
  remind_after?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface GoalPayload {
  goal: string;
  specialty_id?: string | null;
  is_primary?: boolean;
  status?: GoalStatus;
  objectives: Array<{
    task: string;
    description?: string | null;
    due_at?: string | null;
    status?: ObjectiveStatus;
    sequence?: number;
  }>;
}

export interface MentorGoalPayload extends GoalPayload {
  goal_id?: string;
}
