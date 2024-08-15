import { MetaPagination } from "./Meta.types";

export interface ResponseEntity<T> {
  code: number;
  status: boolean;
  message: string;
  data: T;
  meta?: MetaPagination;
}
