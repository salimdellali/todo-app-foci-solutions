"use server"

import { v4 as uuidv4 } from "uuid"
import { db } from "@/db"
import { todos, Todo } from "@/db/schema"

type GetAllTodosResponse =
  | {
      todos: Todo[]
      error: null
    }
  | {
      todos: null
      error: string
    }

const _TODOS: Todo[] = [
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

export default async function getAllTodos(): Promise<GetAllTodosResponse> {
  try {
    const allTodos = await db.select().from(todos)
    return { todos: allTodos, error: null }
  } catch (error) {
    console.error("Failed to get all todos:", error)
    return { todos: null, error: "Failed to fetch todos" }
  }
}
