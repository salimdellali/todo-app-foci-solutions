"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Todo, TodoInput } from "@/db/schema"
import { TodoList } from "@/components/todo-list"
import { TodoFormDialog } from "@/components/todo-form-dialog"
import { TodoCardSkeleton } from "@/components/todo-card-skeleton"
import { getAllTodos, createTodo } from "@/actions/todos"

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
        const { todo, errorMessage } = await createTodo(todoInput)
        if (errorMessage) {
          throw new Error(errorMessage)
        }
        if (todo) {
          // insert newly added todo at the beginning
          setTodos((prevTodos) => [todo, ...prevTodos])
          return todo
        }
      },
      {
        loading: "Creating todo...",
        error: (error) => error.message,
        success: (todo) => `Todo "${todo!.title}" has been created`,
      }
    )
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* hero section */}
        <div className="flex justify-between py-4">
          <h1 className="text-3xl font-bold">Todo App</h1>
          <TodoFormDialog onSubmit={handleAddTodo} />
        </div>

        {/* todo list */}
        {isLoading ? <TodoCardSkeleton /> : <TodoList todos={todos} />}
      </div>
    </main>
  )
}
