"use server"

import { db } from "@/db"
import { todosTable, Todo, TodoInput } from "@/db/schema"

type CreateTodoResult = {
  todo?: Todo
  errorMessage?: string
}

export default async function createTodo(
  todoInput: TodoInput
): Promise<CreateTodoResult> {
  try {
    const todoToInsert = {
      ...todoInput,
      completedAt: null,
    }
    const [todo] = await db.insert(todosTable).values(todoToInsert).returning()
    return { todo }
  } catch (error) {
    console.error("Failed to create todo:", error)
    return { errorMessage: "Failed to create todo" }
  }
}
