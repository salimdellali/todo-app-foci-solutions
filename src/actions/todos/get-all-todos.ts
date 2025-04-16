"use server"

import { desc } from "drizzle-orm"
import { db } from "@/db"
import { todosTable, Todo } from "@/db/schema"

type GetAllTodosResult = {
  todos?: Todo[]
  errorMessage?: string
}

export default async function getAllTodos(): Promise<GetAllTodosResult> {
  try {
    const todos = await db
      .select()
      .from(todosTable)
      .orderBy(desc(todosTable.createdAt))
    return { todos }
  } catch (error) {
    console.error("Failed to get all todos:", error)
    return { errorMessage: "Failed to fetch todos" }
  }
}
