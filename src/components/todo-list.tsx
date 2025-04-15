import { Todo, TodoInput } from "@/db/schema"
import { TodoCard } from "./todo-card"

type Props = {
  todos: Todo[]
  onDeleteTodo: (todo: Todo) => void
  onUpdateTodo: (todo: Todo, todoInput: TodoInput) => void
  onToggleCompletedAtTodo: (todo: Todo) => void
}

export function TodoList({
  todos,
  onDeleteTodo,
  onUpdateTodo,
  onToggleCompletedAtTodo,
}: Readonly<Props>) {
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
        <TodoCard
          key={todo.id}
          todo={todo}
          onDelete={onDeleteTodo}
          onUpdate={onUpdateTodo}
          onToggleCompletedAt={onToggleCompletedAtTodo}
        />
      ))}
    </div>
  )
}
