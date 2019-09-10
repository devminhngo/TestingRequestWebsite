import { WorkRequest } from './work-request';

export interface WorkRequests {
  total: Number,
  limit: Number,
  skip: Number,
  data: Array<WorkRequest>// This returns an array of Work Requests
}