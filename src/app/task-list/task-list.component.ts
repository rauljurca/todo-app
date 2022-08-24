import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { EditTaskComponent } from '../edit-task/edit-task.component';
import { DataService } from '../shared/data.service';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showNewTaskErrors: boolean = false;
  

  taskForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private dataService: DataService,
    private modal: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tasks = this.dataService.getAllTasks();
  }

  taskFormSubmit() {
    if (this.taskForm.valid) {
      const text = this.taskForm.value.name as any;
      this.dataService.addNewTask({ text, complete: false });
    }
    console.log(this.taskForm);

    if (this.taskForm.invalid) {
      return (this.showNewTaskErrors = true);
    }
    console.log(this.taskForm);

    this.showNewTaskErrors = false;
    this.taskForm.reset();
  }

  taskCompleted(task: Task) {
    task.complete = task.complete;
  }

  editTask(task: Task) {
    let editModalForm = this.modal.open(EditTaskComponent, {
      height: '250px',
      width: '80rem',
      data: task,
    });

    editModalForm.afterClosed().subscribe((result) => {
      if (result) {
        const indexOfTask = this.tasks.indexOf(task);
        this.dataService.updateTask(indexOfTask, result);
      }
    });
  }

  deleteTask(task: Task) {
    const indexOfTask = this.tasks.indexOf(task);
    console.log(indexOfTask);
    this.dataService.deleteTask(indexOfTask);
  }
}
