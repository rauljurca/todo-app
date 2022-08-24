import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  tasks: Task[] = [
    // { text: 'Test 1 - first task', complete: false },
    // { text: 'Test 2 - second task', complete: false },
  ];

  constructor() {}

  getAllTasks() {
    return this.tasks;
  }

  addNewTask(tasks: Task) {
    this.tasks.push(tasks);
    // this.tasks = [
    //   ...this.tasks,
    //   tasks
    // ];
  }

  updateTask(index: number, updateTask: Task) {
    this.tasks[index] = updateTask;
    console.log(updateTask);
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
