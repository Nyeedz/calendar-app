import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss'],
})
export class AppointmentModalComponent {
  appointmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appointmentService: AppointmentService,
    public dialogRef: MatDialogRef<AppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.appointmentForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.appointmentForm.invalid) {
      return;
    }

    const appointmentData: Appointment = {
      id: new Date().getTime(), // Generate a unique ID for the appointment
      title: this.appointmentForm.value.title,
      description: this.appointmentForm.value.description,
      startDate: this.data.selectedDate,
      endDate: null, // Set the end date based on your requirements
    };

    this.appointmentService.addAppointment(appointmentData);

    this.appointmentForm.reset();
    this.dialogRef.close();
  }

  onCancel() {
    this.appointmentForm.reset();
    this.dialogRef.close();
  }
}
