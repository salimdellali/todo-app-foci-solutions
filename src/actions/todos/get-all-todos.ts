"use server"

import prisma from "@/lib/prisma"
import type { Todo } from "@/generated/prisma"

export type GetAllTodosResponse =
  | {
      todos: Todo[]
      error: null
    }
  | {
      todos: null
      error: string
    }

export default async function getAllTodos(): Promise<GetAllTodosResponse> {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return { todos, error: null }
  } catch (error) {
    console.error("Failed to get all todos:", error)
    return { todos: null, error: "Failed to fetch todos" }
  }
}
