import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LambdaTask } from 'src/app/interfaces/lambdaTask.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  isEdit = false;
  taskId = '';
  title = '';
  saveButtonText = '';

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', Validators.required],
    done: [false],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private taskService: TasksService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const id = params['id'];
        if (id) {
          this.isEdit = true;
          this.taskId = id;
          this.setEditForm();
        } else {
          this.setAddForm();
        }
      },
    });
  }

  setEditForm() {
    this.title = 'Editar tarea';
    this.saveButtonText = 'Editar tarea';
    this.taskService
      .getSingleTask(this.taskId)
      .subscribe((task: LambdaTask) => {
        const titleField = this.form.get('title');
        const descriptionField = this.form.get('description');
        const doneField = this.form.get('done');

        titleField?.setValue(task.title);
        descriptionField?.setValue(task.description);
        doneField?.setValue(task.done);

        titleField?.disable();
        descriptionField?.disable();
      });
  }

  setAddForm() {
    this.title = 'Agregar una nueva tarea';
    this.saveButtonText = 'Agregar tarea';
  }

  submitForm() {
    const { title, description } = this.form.value;
    const task: LambdaTask = { title, description, id: this.taskId };

    if (this.isEdit) {
      task.done = this.form.value.done;
      if (task?.id) {
        this.taskService
          .completeTask(task.id, task?.done ?? false)
          .subscribe((message) => {
            this.toastr.info('Tarea editada correctamente');
          });
      }
    } else {
      this.taskService.addTask(task).subscribe((task: LambdaTask) => {
        this.toastr.success('Tarea creada correctamente');
        this.router.navigate(['/edit', task.id]);
      });
    }
  }
}
