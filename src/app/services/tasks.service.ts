import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LambdaTask } from '../interfaces/lambdaTask.interface';
import { ApiResponse, SimpleResponse } from '../interfaces/responses.interface';

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

  getSingleTask(id: string): Observable<LambdaTask> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<ApiResponse>(url).pipe(
      map((response) => {
        return response.body;
      })
    );
  }

  addTask(task: LambdaTask): Observable<LambdaTask> {
    return this.http.post<LambdaTask>(this.tasksUrl, task);
  }

  completeTask(id: string, done: boolean) {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.put<SimpleResponse>(url, { done });
  }

  deleteTask(id: string) {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url);
  }
}
