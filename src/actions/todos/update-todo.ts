"use server"

import { db } from "@/db"
import { Todo, TodoInput, todosTable } from "@/db/schema"
import { eq } from "drizzle-orm"

type UpdateTodoResult = {
  todo?: Todo
  errorMessage?: string
}

export default async function updateTodo(
  idTodo: Todo["id"],
  todoInput: TodoInput
): Promise<UpdateTodoResult> {
  try {
    const newTodoData = {
      ...todoInput,
      updatedAt: new Date(Date.now()),
    }

    const [todo] = await db
      .update(todosTable)
      .set(newTodoData)
      .where(eq(todosTable.id, idTodo))
      .returning()
    return { todo }
  } catch (error) {
    console.error("Failed to update todo:", error)
    return { errorMessage: "Failed to update todo" }
  }
}
