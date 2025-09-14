import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task';
import { Subject, Observable } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskListComponent implements OnInit {

  private refreshTrigger$ = new Subject<void>();
  tasks$!: Observable<Task[]>;


  editingTask: Task | null = null;
  minDueDate: string = '';
  errorMessages$ = new BehaviorSubject<{ [key: string]: string }>({});


  newTask: Task = {
    title: '',
    description: '',
    status: '',
    dueDate: ''
  };
	
  constructor(private taskService: TaskService) {}

	isFutureDate(dateStr: string): boolean {
	  const now = new Date();
	  const input = new Date(dateStr);
	  return input > now;
	}

  ngOnInit(): void {
    this.tasks$ = this.refreshTrigger$.pipe(
      startWith(null), // initialize 
      switchMap(() => this.taskService.getAllTasks())
    );
	  const now = new Date();
	  const yyyy = now.getFullYear();
	  const mm = String(now.getMonth() + 1).padStart(2, '0');
	  const dd = String(now.getDate()).padStart(2, '0');
	  const hh = String(now.getHours()).padStart(2, '0');
	  const min = String(now.getMinutes()).padStart(2, '0');
	  this.minDueDate = `${yyyy}-${mm}-${dd}T${hh}:${min}`;

  }

  // Delete task
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.refreshTrigger$.next(); 
    });
  }

  // Create task
	createTask(): void {
	  this.taskService.createTask(this.newTask).subscribe({
		next: () => {
		  this.newTask = {
			title: '',
			description: '',
			status: '',
			dueDate: ''
		  };
		this.errorMessages$.next({});
		  this.refreshTrigger$.next();
		},
		error: (err) => {			
		  if (err.status === 400 && err.error) {
			this.errorMessages$.next(err.error);

		  }
		}
	  });
	}


  // Clone the task for update
  editTask(task: Task): void {
    this.editingTask = { ...task };
  }

  // Update task
  updateTask(): void {
    if (!this.editingTask?.id) return;

    this.taskService.updateTask(this.editingTask.id, this.editingTask).subscribe(() => {
      this.editingTask = null;
      this.refreshTrigger$.next(); 
    });
  }

  // Cancel Edit
  cancelEdit(): void {
    this.editingTask = null;
  }
}