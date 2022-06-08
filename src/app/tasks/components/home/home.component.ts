import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LambdaTask } from 'src/app/interfaces/lambdaTask.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tasks: LambdaTask[] = [];

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private toastr: ToastrService
  ) {}

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

  changeDone(task: LambdaTask) {
    if (task?.id) {
      task.done = task.done === undefined ? false : !task.done;
      this.tasksService.changeDone(task).subscribe(() => {
        const toastMessage = task.done
          ? 'Tarea completada correctamente'
          : 'Tarea descompletada correctamente';
        this.toastr.success(toastMessage);
      });
    }
  }

  deleteTask(task: LambdaTask) {
    if (task?.id) {
      this.toastr.success('Tarea eliminada correctamente');
      this.tasksService
        .deleteTask(task.id)
        .pipe()
        .subscribe((message) => {
          this.getTasks();
        });
    }
  }
}
