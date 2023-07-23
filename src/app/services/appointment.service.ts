import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private _appointments: Appointment[] = [];
  private _appointments$: BehaviorSubject<Appointment[]> = new BehaviorSubject<
    Appointment[]
  >([]);
  private _selectedDate$: BehaviorSubject<Date | null> =
    new BehaviorSubject<Date | null>(null);

  constructor() {}

  get appointments$(): Observable<Appointment[]> {
    return this._appointments$.asObservable();
  }

  get selectedDate$(): Observable<Date | null> {
    return this._selectedDate$.asObservable();
  }

  addAppointment(appointment: Appointment) {
    this._appointments.push(appointment);
    this._appointments$.next(this._appointments);
  }

  deleteAppointment(appointment: Appointment) {
    const index = this._appointments.findIndex(
      (appointmentItem) => appointmentItem.id === appointment.id
    );
    if (index !== -1) {
      this._appointments.splice(index, 1);
      this._appointments$.next(this._appointments);
    }
  }

  updateAppointment(updatedAppointment: Appointment) {
    const index = this._appointments.findIndex(
      (appointmentItem) => appointmentItem.id === updatedAppointment.id
    );
    if (index !== -1) {
      this._appointments[index] = updatedAppointment;
      this._appointments$.next(this._appointments);
    }
  }

  updateSelectedDate(date: Date | null) {
    this._selectedDate$.next(date);
  }

  getAppointmentsByDate(date: Date): Appointment[] {
    const appointmentsByDate = this._appointments.filter((appointment) => {
      const appointmentDate = appointment.startDate.toDateString();
      const givenDate = date.toDateString();
      return appointmentDate === givenDate;
    });
    return appointmentsByDate;
  }
}
