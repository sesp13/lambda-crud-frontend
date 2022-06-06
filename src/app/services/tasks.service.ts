import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LambdaTask } from '../interfaces/lambdaTask.interface';
import { ApiResponse } from '../interfaces/taskResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  baseUrl = `${environment.baseUrl}`;
  tasksUrl = `${this.baseUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<LambdaTask[]> {
    return this.http.get<ApiResponse>(this.tasksUrl).pipe(
      map((response) => {
        return response.body?.tasks ?? [];
      })
    );
  }
}
