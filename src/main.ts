import { bootstrapApplication } from '@angular/platform-browser';
import { TaskListComponent } from './app/components/task-list/task-list';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { App } from './app/app';

bootstrapApplication(TaskListComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection() 
  ]
});
