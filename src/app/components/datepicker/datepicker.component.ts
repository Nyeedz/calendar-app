import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentListComponent } from '../appointment-list/appointment-list.component';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  selectedDate: Date | null = null;
  selectedTime: number | null = null;
  hours: string[] = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? 'am' : 'pm';
    return `${hour}:00 ${period}`;
  });

  @ViewChild(AppointmentListComponent)
  appointmentListComponent!: AppointmentListComponent;

  constructor(
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.appointmentService.selectedDate$.subscribe((date) => {
      this.selectedDate = date;
    });
  }

  onDateSelect(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.selectedDate = selectedDate;
      this.appointmentService.updateSelectedDate(selectedDate);
    }
  }

  onTimeSelect(event: MatSelectChange) {
    this.selectedTime = event.value;
  }

  openAppointmentModal() {
    if (this.selectedDate && this.selectedTime !== null) {
      const formattedDate = this.dateAdapter.format(
        this.selectedDate,
        'dddd, MMMM d hh:mmA'
      );
      const selectedDateTime = new Date(this.selectedDate);
      selectedDateTime.setHours(this.selectedTime);
      const dialogRef = this.dialog.open(AppointmentModalComponent, {
        data: {
          selectedDate: formattedDate,
          selectedDateTime: selectedDateTime,
        },
        width: '500px',
      });

      dialogRef.afterClosed().subscribe(() => {
        this.selectedDate = null;
        this.selectedTime = null;
      });
    }
  }
}
