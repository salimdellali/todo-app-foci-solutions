"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { Todo, todosTable } from "@/db/schema"

type DeleteTodoResult = {
  todo?: Todo
  errorMessage?: string
}

export default async function deleteTodo(
  idTodo: Todo["id"]
): Promise<DeleteTodoResult> {
  try {
    const [todo] = await db
      .delete(todosTable)
      .where(eq(todosTable.id, idTodo))
      .returning()
    return { todo }
  } catch (error) {
    console.error("Failed to delete todo:", error)
    return { errorMessage: "Failed to delete todo" }
  }
}
