import {WorkRequest} from "./work-request";
import {Task} from "./task";

export interface SearchResults {
  workrequest: Array <WorkRequest>
  tasks: Array <Task>
}
