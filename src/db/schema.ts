import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const todosTable = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date").notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Todo = typeof todosTable.$inferSelect
export type TodoInput = Pick<Todo, "title" | "description" | "dueDate">
