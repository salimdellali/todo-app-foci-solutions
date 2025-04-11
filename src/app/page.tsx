import { TodoItem } from "../components/todo-item"
import { v4 as uuidv4 } from "uuid"
import { Todo } from "../lib/types"

const todo: Todo = {
  id: uuidv4(),
  title: "Complete FOCI Solutions project",
  description:
    "Finish developing the Todo app requested by FOCI Solutions and deploy it to vercel",
  dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  // completedAt: null,
  completedAt: new Date(),
  createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
}

export default function RootPage() {
  return <TodoItem todo={todo} />
}
