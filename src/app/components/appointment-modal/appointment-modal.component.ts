import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss'],
})
export class AppointmentModalComponent {
  appointmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
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
      id: new Date().getTime(),
      title: this.appointmentForm.value.title,
      description: this.appointmentForm.value.description,
      startDate: this.data.selectedDateTime,
    };

    this.appointmentService.addAppointment(appointmentData);
    this.appointmentService.updateSelectedDate(this.data.selectedDateTime);

    this.appointmentForm.reset();
    this.dialogRef.close();
  }

  onCancel() {
    this.appointmentForm.reset();
    this.dialogRef.close();
  }
}
