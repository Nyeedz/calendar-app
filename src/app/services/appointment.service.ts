import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointments: Appointment[] = [];
  private appointmentsSubject: BehaviorSubject<Appointment[]> =
    new BehaviorSubject<Appointment[]>([]);
  public appointments$: Observable<Appointment[]> =
    this.appointmentsSubject.asObservable();

  getAppointments(): Appointment[] {
    return this.appointments;
  }

  updateAppointments() {
    this.appointmentsSubject.next(this.appointments);
  }

  addAppointment(appointment: Appointment): void {
    this.appointments.push(appointment);
    this.updateAppointments();
  }

  deleteAppointment(appointment: Appointment): void {
    const index = this.appointments.findIndex((a) => a.id === appointment.id);
    if (index !== -1) {
      this.appointments.splice(index, 1);
      this.updateAppointments();
    }
  }
}
