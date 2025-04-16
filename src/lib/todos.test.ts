import {
  getStatusFromTodo,
  TODO_STATUSES,
  filterTodos,
  FILTER_OPTIONS,
  sortTodos,
  SORT_OPTIONS,
} from "@/lib/todos"
import { SECONDS_IN_DAY } from "@/lib/dates"
import { Todo } from "@/db/schema"

const now = new Date()
const dayInMs = SECONDS_IN_DAY * 1000

const tomorrow = new Date(now.getTime() + dayInMs)
const nextHour = new Date(now.getTime() + 1000 * 60 * 60)
const in2Days = new Date(now.getTime() + 2 * dayInMs)
const in3Days = new Date(now.getTime() + 3 * dayInMs)

const yesterday = new Date(now.getTime() - dayInMs)
const _lastHour = new Date(now.getTime() - 1000 * 60 * 60)
const ago2Days = new Date(now.getTime() - 2 * dayInMs)
const ago3Days = new Date(now.getTime() - 3 * dayInMs)

describe("getStatusFromTodo()", () => {
  const baseTodo: Omit<Todo, "dueDate" | "completedAt"> = {
    id: "1",
    title: "Test Todo Title",
    description: "Test Todo description with some text",
    createdAt: now,
    updatedAt: now,
  }

  it("should return 'Completed' if completedAt is set", () => {
    const todo: Todo = {
      ...baseTodo,
      dueDate: nextHour,
      completedAt: now,
    }
    expect(getStatusFromTodo(todo)).toBe(TODO_STATUSES.COMPLETED)
  })

  it("should return 'Overdue' if dueDate is in the past and not completed", () => {
    const todo = {
      ...baseTodo,
      dueDate: yesterday,
      completedAt: null,
    }
    expect(getStatusFromTodo(todo)).toBe(TODO_STATUSES.OVERDUE)
  })

  it("should return 'Due Soon' if dueDate is within the next day and not completed", () => {
    const todo = {
      ...baseTodo,
      dueDate: nextHour,
      completedAt: null,
    }
    expect(getStatusFromTodo(todo)).toBe(TODO_STATUSES.DUE_SOON)
  })

  it("should return 'In Progress' if dueDate is more than a day away and not completed", () => {
    const todo = {
      ...baseTodo,
      dueDate: in2Days,
      completedAt: null,
    }
    expect(getStatusFromTodo(todo)).toBe(TODO_STATUSES.IN_PROGRESS)
  })
})

describe("filterTodos()", () => {
  const todos: Todo[] = [
    {
      id: "1",
      title: "Completed Task",
      description: null,
      dueDate: tomorrow,
      completedAt: new Date(),
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "2",
      title: "Overdue Task",
      description: null,
      dueDate: yesterday,
      completedAt: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "3",
      title: "Due Soon Task",
      description: null,
      dueDate: nextHour,
      completedAt: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "4",
      title: "In Progress Task",
      description: null,
      dueDate: in2Days,
      completedAt: null,
      createdAt: now,
      updatedAt: now,
    },
  ]

  it("should return all tasks for 'All Tasks'", () => {
    const result = filterTodos(todos, FILTER_OPTIONS.ALL_TASKS)
    expect(result.length).toBe(4)
  })

  it("should return only completed tasks", () => {
    const result = filterTodos(todos, FILTER_OPTIONS.COMPLETED)
    expect(result.length).toBe(1)
    expect(result[0].title).toBe("Completed Task")
  })

  it("should return only overdue tasks", () => {
    const result = filterTodos(todos, FILTER_OPTIONS.OVERDUE)
    expect(result.length).toBe(1)
    expect(result[0].title).toBe("Overdue Task")
  })

  it("should return only due soon tasks", () => {
    const result = filterTodos(todos, FILTER_OPTIONS.DUE_SOON)
    expect(result.length).toBe(1)
    expect(result[0].title).toBe("Due Soon Task")
  })

  it("should return only in progress tasks", () => {
    const result = filterTodos(todos, FILTER_OPTIONS.IN_PROGRESS)
    expect(result.length).toBe(1)
    expect(result[0].title).toBe("In Progress Task")
  })
})

describe("sortTodos()", () => {
  const todos: Todo[] = [
    {
      id: "1",
      title: "B Task",
      description: null,
      dueDate: in3Days,
      completedAt: null,
      createdAt: ago3Days,
      updatedAt: ago2Days,
    },
    {
      id: "2",
      title: "C Task",
      description: null,
      dueDate: tomorrow,
      completedAt: null,
      createdAt: ago2Days,
      updatedAt: yesterday,
    },
    {
      id: "3",
      title: "A Task",
      description: null,
      dueDate: in2Days,
      completedAt: null,
      createdAt: yesterday,
      updatedAt: now,
    },
  ]

  it("should sort by Last Created first", () => {
    const result = sortTodos([...todos], SORT_OPTIONS.LAST_CREATED)
    expect(result[0].id).toBe("3")
    expect(result[1].id).toBe("2")
    expect(result[2].id).toBe("1")
  })

  it("should sort by Last Updated first", () => {
    const result = sortTodos(todos, SORT_OPTIONS.LAST_UPDATED)
    expect(result[0].id).toBe("3")
    expect(result[1].id).toBe("2")
    expect(result[2].id).toBe("1")
  })

  it("should sort by closest Due Date first", () => {
    const result = sortTodos(todos, SORT_OPTIONS.DUE_DATE)
    expect(result[0].id).toBe("2")
    expect(result[1].id).toBe("3")
    expect(result[2].id).toBe("1")
  })

  it("should sort by Title (alphabetical)", () => {
    const result = sortTodos(todos, SORT_OPTIONS.TITLE)
    expect(result[0].id).toBe("3") // A Task
    expect(result[1].id).toBe("1") // B Task
    expect(result[2].id).toBe("2") // C Task
  })
})
