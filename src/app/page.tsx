"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Plus } from "lucide-react"
import { Todo } from "@/lib/types"
import { TodoList } from "@/components/todo-list"
import { Button } from "@/components/ui/button"

const TODOS: Todo[] = [
  {
    id: uuidv4(),
    title: "Complete FOCI Solutions project",
    description: "Finish developing the Todo app requested by FOCI Solutions",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    completedAt: new Date(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: uuidv4(),
    title: "Deploy the app to Vercel",
    description: "Make sure to successfully deploy the app to Vercel",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    completedAt: null,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
]

export default function RootPage() {
  const [todos, setTodos] = useState<Todo[]>(TODOS)

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* hero section */}
        <div className="flex justify-between py-4">
          <h1 className="text-3xl font-bold text-center">Todo App</h1>
          <Button
            className="hover:shadow-lg transition-all duration-300"
            onClick={() => {
              alert("Add todo clicked")
            }}
          >
            <Plus />
            <span>Add Todo</span>
          </Button>
        </div>

        {/* todo list */}
        <TodoList todos={todos} />
      </div>
    </main>
  )
}
