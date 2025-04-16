import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SECONDS_IN_DAY = 86400

export const TODO_STATUSES = {
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
  DUE_SOON: "Due Soon",
  OVERDUE: "Overdue",
} as const
export type TodoStatuses = (typeof TODO_STATUSES)[keyof typeof TODO_STATUSES]

export const FILTER_OPTIONS = {
  ALL_TASKS: "All Tasks",
  ...TODO_STATUSES,
} as const
export type FilterOptions = (typeof FILTER_OPTIONS)[keyof typeof FILTER_OPTIONS]

export const SORT_OPTIONS = {
  LAST_CREATED: "Last Created",
  LAST_UPDATED: "Last Updated",
  DUE_DATE: "Due Date",
  TITLE: "Title",
} as const
export type SortOptions = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]
