import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService, Task } from './task';
import { environment } from '../../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tasks', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task 1', description: '', status: 'pending', dueDate: '2025-09-15T10:00' }
    ];

    service.getAllTasks().subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Task 1');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should create a task', () => {
    const newTask: Task = { title: 'New Task', description: '', status: 'pending', dueDate: '2025-09-20T10:00' };

    service.createTask(newTask).subscribe(task => {
      expect(task.title).toBe('New Task');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(newTask);
  });

  it('should update a task', () => {
    const updatedTask: Task = { id: 1, title: 'Updated', description: '', status: 'done', dueDate: '2025-09-21T10:00' };

    service.updateTask(1, updatedTask).subscribe(task => {
      expect(task.title).toBe('Updated');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    service.deleteTask(1).subscribe(response => {
      expect(response).toBeNull(); 
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});