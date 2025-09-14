import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],

})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe((data: Task[] | null) => {
      console.log('Received tasks:', data);
      this.tasks = data ?? [];
	  
		this.cdr.detectChanges(); 

    });
  }
  
}