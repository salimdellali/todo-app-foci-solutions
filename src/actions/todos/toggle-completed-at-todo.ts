"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { Todo, todosTable } from "@/db/schema"

type ToggleCompletedAtTodoResult = {
  todo?: Todo
  errorMessage?: string
}

export default async function toggleCompletedAtTodo(
  todoToUpdate: Todo
): Promise<ToggleCompletedAtTodoResult> {
  try {
    const newTodoData = {
      completedAt: todoToUpdate.completedAt ? null : new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }

    const [todo] = await db
      .update(todosTable)
      .set(newTodoData)
      .where(eq(todosTable.id, todoToUpdate.id))
      .returning()
    return { todo }
  } catch (error) {
    console.error("Failed to toggle completedAt:", error)
    return { errorMessage: "Failed to toggle todo completion" }
  }
}
