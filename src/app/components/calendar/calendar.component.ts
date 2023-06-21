import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  appointments: Appointment[] = [];

  addAppointment(appointment: Appointment) {
    this.appointments.push(appointment);
  }

  deleteAppointment(appointment: Appointment) {
    const index = this.appointments.indexOf(appointment);
    if (index > -1) {
      this.appointments.splice(index, 1);
    }
  }
}
