import { bootstrapApplication } from '@angular/platform-browser';
import { TaskListComponent } from './app/components/task-list/task-list';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';

bootstrapApplication(TaskListComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection() 
  ]
});