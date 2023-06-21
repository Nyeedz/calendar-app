import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  selectedDate: Date | null = null;
  appointments: Appointment[] = [];

  constructor(
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.appointments = this.appointmentService.getAppointments();
  }

  onDateSelect(date: Date) {
    this.selectedDate = date;
  }

  openAppointmentModal() {
    if (this.selectedDate) {
      const formattedDate = this.dateAdapter.format(
        this.selectedDate,
        'dddd, MMMM d hh:mmA'
      );
      const dialogRef = this.dialog.open(AppointmentModalComponent, {
        data: { selectedDate: formattedDate },
        width: '500px',
      });

      dialogRef.afterClosed().subscribe(() => {
        this.appointments = this.appointmentService.getAppointments();
      });
    }
  }
}
