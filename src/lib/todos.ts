import { Todo } from "@/db/schema"
import { getDifferenceInSecondsToNow, SECONDS_IN_DAY } from "@/lib/dates"

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

export function filterTodos(todos: Todo[], filterBy: FilterOptions): Todo[] {
  return todos.filter((todo) => {
    if (filterBy === FILTER_OPTIONS.ALL_TASKS) return true
    if (filterBy === FILTER_OPTIONS.COMPLETED) return !!todo.completedAt

    const secondsToDue = getDifferenceInSecondsToNow(todo.dueDate)

    if (filterBy === FILTER_OPTIONS.IN_PROGRESS) {
      return !todo.completedAt && secondsToDue > SECONDS_IN_DAY
    }
    if (filterBy === FILTER_OPTIONS.OVERDUE) {
      return !todo.completedAt && secondsToDue < 0
    }
    if (filterBy === FILTER_OPTIONS.DUE_SOON) {
      return (
        !todo.completedAt && secondsToDue >= 0 && secondsToDue <= SECONDS_IN_DAY
      )
    }
    return true
  })
}

export function sortTodos(todos: Todo[], sortBy: SortOptions): Todo[] {
  return todos.sort((a, b) => {
    if (sortBy === SORT_OPTIONS.LAST_CREATED)
      return b.createdAt.getTime() - a.createdAt.getTime() // last created comes first
    if (sortBy === SORT_OPTIONS.LAST_UPDATED)
      return b.updatedAt.getTime() - a.updatedAt.getTime() // last updated comes first
    if (sortBy === SORT_OPTIONS.DUE_DATE)
      return a.dueDate.getTime() - b.dueDate.getTime() // closest due date comes first
    if (sortBy === SORT_OPTIONS.TITLE) return a.title.localeCompare(b.title) // alphabetical order
    return 0
  })
}
