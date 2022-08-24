import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  tasks: Task[] = [];
  editErrors: boolean = false;

  editForm: FormGroup = this.formBuilder.group({
    text: [this.task.text, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    public editModalRef: MatDialogRef<EditTaskComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public task: Task
  ) {}

  ngOnInit(): void {}

  onEditSubmit() {
    if (this.editForm.invalid) {
      return (this.editErrors = true);
    }
    const updatedTask = {
      ...this.task,
      ...this.editForm.value,
    };
    console.log(this.editForm);

    this.editModalRef.close(updatedTask);
  }

  closeEdit() {
    this.editModalRef.close();
  }
}
