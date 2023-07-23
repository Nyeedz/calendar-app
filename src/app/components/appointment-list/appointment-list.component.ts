import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  dataSource: MatTableDataSource<Appointment>;
  hours: number[] = Array.from({ length: 24 }, (_, index) => index);
  currentDate: Date;

  constructor(private appointmentService: AppointmentService) {
    this.dataSource = new MatTableDataSource<Appointment>([]);
    this.currentDate = new Date();
    this.appointmentService.appointments$.subscribe((appointments) => {
      this.dataSource.data = appointments;
    });
  }

  ngOnInit() {
    this.appointmentService.appointments$.subscribe((appointments) => {
      this.dataSource.data = appointments;
    });
  }

  getAppointmentsByHour(hour: number): Appointment[] {
    const appointmentsByHour = this.dataSource.data.filter(
      (appointment) => appointment.startDate.getHours() === hour
    );
    return appointmentsByHour;
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentService.deleteAppointment(appointment);
  }

  drop(event: CdkDragDrop<Appointment[]>) {
    if (event.previousContainer !== event.container) {
      const previousAppointment = event.previousContainer.data[
        event.previousIndex
      ] as Appointment;
      const newAppointment: Appointment = {
        ...previousAppointment,
        startDate: new Date(this.currentDate.getTime()),
      };
      newAppointment.startDate.setHours(parseInt(event.container.id, 10));
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex] = newAppointment;
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  goToPreviousDate() {
    this.currentDate = new Date(
      this.currentDate.getTime() - 24 * 60 * 60 * 1000
    );
    this.appointmentService.updateSelectedDate(this.currentDate);
    this.dataSource.data = this.appointmentService.getAppointmentsByDate(
      this.currentDate
    );
  }

  goToNextDate() {
    this.currentDate = new Date(
      this.currentDate.getTime() + 24 * 60 * 60 * 1000
    );
    this.appointmentService.updateSelectedDate(this.currentDate);
    this.dataSource.data = this.appointmentService.getAppointmentsByDate(
      this.currentDate
    );
  }
}
