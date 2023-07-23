export interface Appointment {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  day?: string | null;
}
