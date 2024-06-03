// types.ts

export interface Applicant {
  application_id: number;
  user_id: number;
  applicant_name: string;
  project_id: number;
  role_name: string;
  status: string;
  applied_on: Date;
  reviewed_on: Date | null;
}
