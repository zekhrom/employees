import { Employee } from "./models/employees";

export interface AppState {
  readonly employee: Employee[];
}
