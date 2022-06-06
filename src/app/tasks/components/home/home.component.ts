import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LambdaTask } from 'src/app/interfaces/lambdaTask.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tasks: LambdaTask[] = [];

  constructor(private tasksService: TasksService, private router: Router) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTasks().subscribe((tasksArray) => {
      this.tasks = tasksArray;
    });
  }

  createTask() {
    this.router.navigate(['/add']);
  }

  editTask(task: LambdaTask) {
    if (task?.id) this.router.navigate(['/edit', task?.id]);
  }

  deleteTask(task: LambdaTask) {
    if (task?.id) {
      this.tasksService.deleteTask(task.id).subscribe(console.log);
    }
  }
}
