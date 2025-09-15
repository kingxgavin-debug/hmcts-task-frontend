# HmctsTaskFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.1.

## Overview

**HmctsTaskFrontend** is the Angular frontend for the HMCTS Task Manager application.  
It provides a responsive UI for viewing, creating, updating, and deleting tasks, and communicates with a Spring Boot backend API.

## Development

To start the development server:

ng serve

Then open your browser at http://localhost:4200/. The app will reload automatically when source files are modified.

## Building

To compile the project:

ng build

Build artifacts will be stored in the dist/ directory. Production builds are optimized for performance.

## Code Generation

To scaffold a new component:

ng generate component component-name

For other schematics (e.g. directives, pipes):

ng generate --help

## Running Unit Tests

Unit tests are executed using the Karma test runner:

ng test

Basic smoke tests are implemented for key components and services.  
Full coverage and logic testing will be expanded in future iterations.

## End-to-End Testing

End-to-end (e2e) testing is not currently implemented in this project.  
You may integrate frameworks such as Cypress or Playwright if needed.

## Backend API Integration

The frontend communicates with the backend via the following endpoints:

Method | Endpoint         | Description         
-------|------------------|---------------------
GET    | /api/tasks       | Get all tasks     
POST   | /api/tasks       | Create a new task   
PUT    | /api/tasks/:id   | Update a task's Status       
DELETE | /api/tasks/:id   | Delete a task       

All requests are handled via Angular's HttpClient through the TaskService.

## Submission Status

This project is ready for submission and integration with the HMCTS backend.  
Unit tests are in place and passing. End-to-end testing is deferred for future development.

## Resources

- Angular CLI Reference: https://angular.dev/tools/cli
- Angular Docs: https://angular.dev