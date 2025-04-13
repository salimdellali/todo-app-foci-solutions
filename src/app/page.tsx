"use client"

import { useState, useEffect } from "react"
import { Todo } from "@/lib/types"
import { TodoList } from "@/components/todo-list"
import { TodoFormDialog } from "@/components/todo-form-dialog"
import getAllTodos from "../actions/todos/get-all-todos"

export default function RootPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTodos() {
      setIsLoading(true)

      const { todos, error } = await getAllTodos()

      if (error) {
        setTodos([])
        setError(error)
      }

      if (todos) {
        setTodos(todos)
        console.log(todos)
        setError(null)
      }

      setIsLoading(false)
    }

    fetchTodos()
  }, [])

  function handleAddTodo(newTodo: Todo) {
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
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
        {isLoading ? (
          <div className="text-center py-8">Loading todos...</div>
        ) : error ? (
          <div className="text-center py-8">{error}</div>
        ) : (
          <TodoList todos={todos} />
        )}
      </div>
    </main>
  )
}
