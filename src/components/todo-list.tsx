import { Todo } from "../lib/types"
import { TodoItem } from "./todo-item"

type Props = {
  todos: Todo[]
}

export function TodoList({ todos }: Readonly<Props>) {
  if (!todos.length) {
    return (
      <div className="flex flex-col border border-dashed rounded-2xl h-60 items-center justify-center bg-white text-gray-500">
        <p className="text-xl font-bold">No Todos available</p>
        <p>Get started by creating your first Todo</p>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
