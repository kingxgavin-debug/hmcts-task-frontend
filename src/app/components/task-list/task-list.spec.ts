import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from '../../services/task';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getAllTasks']);
    mockTaskService.getAllTasks.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [TaskListComponent, CommonModule, FormsModule, HttpClientTestingModule],
      providers: [{ provide: TaskService, useValue: mockTaskService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});