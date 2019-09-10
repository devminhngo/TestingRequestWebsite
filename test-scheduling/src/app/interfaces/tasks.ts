import { Task } from './task';

export interface Tasks {
    total: Number,
    limit: Number,
    skip: Number,
    data: Array<Task>// This returns an array of Work Requests
  }