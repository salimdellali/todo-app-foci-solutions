"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { differenceInSeconds } from "date-fns"
import { Plus } from "lucide-react"
import { Todo, TodoInput } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { TodoList } from "@/components/todo-list"
import { TodoFormDialog } from "@/components/todo-form-dialog"
import { TodoCardSkeleton } from "@/components/todo-card-skeleton"
import { TodoFilter } from "@/components/todo-organizer"
import {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  toggleCompletedAtTodo,
} from "@/actions/todos"
import {
  FilterOptions,
  SortOptions,
  FILTER_OPTIONS,
  SORT_OPTIONS,
  SECONDS_IN_DAY,
} from "@/lib/utils"

export default function RootPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [sortBy, setSortBy] = useState<SortOptions>(SORT_OPTIONS.LAST_CREATED)
  const [filterBy, setFilterBy] = useState<FilterOptions>(
    FILTER_OPTIONS.ALL_TASKS
  )

  function filteredTodos(todos: Todo[], filterBy: FilterOptions): Todo[] {
    return todos.filter((todo) => {
      if (filterBy === FILTER_OPTIONS.ALL_TASKS) return true
      if (filterBy === FILTER_OPTIONS.COMPLETED) return !!todo.completedAt

      const secondsToDue = differenceInSeconds(todo.dueDate, new Date())

      if (filterBy === FILTER_OPTIONS.IN_PROGRESS) {
        return !todo.completedAt && secondsToDue > SECONDS_IN_DAY
      }
      if (filterBy === FILTER_OPTIONS.OVERDUE) {
        return !todo.completedAt && secondsToDue < 0
      }
      if (filterBy === FILTER_OPTIONS.DUE_SOON) {
        return (
          !todo.completedAt &&
          secondsToDue >= 0 &&
          secondsToDue <= SECONDS_IN_DAY
        )
      }
      return true
    })
  }

  function sortedTodos(todos: Todo[], sortBy: SortOptions): Todo[] {
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

  const todosToDisplay: Todo[] = sortedTodos(
    filteredTodos(todos, filterBy),
    sortBy
  )

  useEffect(() => {
    async function fetchTodos() {
      setIsLoading(true)

      const { todos, errorMessage } = await getAllTodos()

      if (errorMessage) {
        setTodos([])
        toast.error(errorMessage)
      }

      if (todos) {
        setTodos(todos)
      }

      setIsLoading(false)
    }

    fetchTodos()
  }, [])

  async function handleAddTodo(todoInput: TodoInput) {
    toast.promise(
      async () => {
        const { todo: createdTodo, errorMessage } = await createTodo(todoInput)
        if (errorMessage) {
          throw new Error(errorMessage)
        }
        if (createdTodo) {
          // insert newly added todo at the beginning
          setTodos((prevTodos) => [createdTodo, ...prevTodos])
          return createdTodo
        }
      },
      {
        loading: "Creating todo...",
        error: (error) => error.message,
        success: (createdTodo) =>
          `Todo "${createdTodo!.title}" has been created`,
      }
    )
  }

  async function handleDeleteTodo(todo: Todo) {
    toast.promise(
      async () => {
        const { todo: deletedTodo, errorMessage } = await deleteTodo(todo.id)
        if (errorMessage) {
          throw new Error(errorMessage)
        }
        if (deletedTodo) {
          // Fix: Remove todo with matching id
          setTodos((prevTodos) =>
            prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
          )
          return deletedTodo
        }
      },
      {
        loading: "Deleting todo...",
        error: (error) => error.message,
        success: (deletedTodo) =>
          `Todo "${deletedTodo!.title}" has been deleted`,
      }
    )
  }

  async function handleUpdateTodo(todo: Todo, todoInput: TodoInput) {
    toast.promise(
      async () => {
        const { todo: updatedTodo, errorMessage } = await updateTodo(
          todo.id,
          todoInput
        )
        if (errorMessage) {
          throw new Error(errorMessage)
        }
        if (updatedTodo) {
          setTodos((prevTodos) =>
            prevTodos.map((prevTodo) =>
              prevTodo.id === updatedTodo.id ? updatedTodo : prevTodo
            )
          )
          return updatedTodo
        }
      },
      {
        loading: "Updating todo...",
        error: (error) => error.message,
        success: (updatedTodo) =>
          `Todo "${updatedTodo!.title}" has been updated`,
      }
    )
  }

  async function handleToggleCompletedAtTodo(todo: Todo) {
    toast.promise(
      async () => {
        const { todo: updatedTodo, errorMessage } = await toggleCompletedAtTodo(
          todo
        )
        if (errorMessage) {
          throw new Error(errorMessage)
        }
        if (updatedTodo) {
          setTodos((prevTodos) =>
            prevTodos.map((prevTodo) =>
              prevTodo.id === updatedTodo.id ? updatedTodo : prevTodo
            )
          )
          return updatedTodo
        }
      },
      {
        loading: "Toggling completion...",
        error: (error) => error.message,
        success: (updatedTodo) =>
          `Todo completion of "${updatedTodo!.title}" has been toggled`,
      }
    )
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* hero section */}
        <div className="flex justify-between py-4">
          <h1 className="text-3xl font-bold">Todo App</h1>
          <TodoFormDialog
            mode="create"
            onSubmit={handleAddTodo}
            trigger={
              <Button className="hover:shadow-lg transition-all duration-300">
                <Plus />
                <span>Add Todo</span>
              </Button>
            }
          />
        </div>

        {/* todo filter and sort */}
        <div className="py-4">
          <TodoFilter
            sortBy={sortBy}
            filterBy={filterBy}
            onSortChange={setSortBy}
            onFilterChange={setFilterBy}
          />
        </div>

        {/* todo list */}
        {isLoading ? (
          <TodoCardSkeleton />
        ) : (
          <TodoList
            todos={todosToDisplay}
            onDeleteTodo={handleDeleteTodo}
            onUpdateTodo={handleUpdateTodo}
            onToggleCompletedAtTodo={handleToggleCompletedAtTodo}
          />
        )}
      </div>
    </main>
  )
}
