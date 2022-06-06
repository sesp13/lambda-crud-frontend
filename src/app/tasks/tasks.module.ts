// angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Custom modules
import { TasksRoutingModule } from './tasks-routing.module';

// Pipes
import { BooleanTransformPipe } from './pipes/boolean-transform.pipe';

// Components
import { HomeComponent } from './components/home/home.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';

@NgModule({
  declarations: [HomeComponent, AddEditComponent, BooleanTransformPipe],
  imports: [CommonModule, ReactiveFormsModule, TasksRoutingModule],
})
export class TasksModule {}
