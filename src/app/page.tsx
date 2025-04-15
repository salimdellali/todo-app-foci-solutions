"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Todo, TodoInput } from "@/db/schema"
import { TodoList } from "@/components/todo-list"
import { TodoFormDialog } from "@/components/todo-form-dialog"
import { TodoCardSkeleton } from "@/components/todo-card-skeleton"
import {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "@/actions/todos"
import { Button } from "../components/ui/button"
import { Plus } from "lucide-react"

export default function RootPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

        {/* todo list */}
        {isLoading ? (
          <TodoCardSkeleton />
        ) : (
          <TodoList
            todos={todos}
            onDeleteTodo={handleDeleteTodo}
            onUpdateTodo={handleUpdateTodo}
          />
        )}
      </div>
    </main>
  )
}
