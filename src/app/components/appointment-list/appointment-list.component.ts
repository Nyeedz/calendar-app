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
  dataSource!: MatTableDataSource<Appointment>;
  displayedColumns: string[] = [
    'title',
    'description',
    'startDate',
    'endDate',
    'actions',
  ];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.appointmentService.appointments$.subscribe((appointments) => {
      this.dataSource = new MatTableDataSource<Appointment>(appointments);
    });
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentService.deleteAppointment(appointment);
  }
}
