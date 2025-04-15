"use client"

import { formatDistanceToNow } from "date-fns"
import { Todo, TodoInput } from "@/db/schema"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Calendar,
  CircleCheckBig,
  CircleX,
  Clock,
  Pencil,
  RefreshCw,
  Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TodoFormDialog } from "@/components/todo-form-dialog"

type Props = {
  todo: Todo
  onDelete: (todo: Todo) => void
  onUpdate: (todo: Todo, todoInput: TodoInput) => void
  onToggleCompletedAt: (todo: Todo) => void
}

// internal delete todo dialog trigger
function TodoDeleteDialogTrigger({
  todo,
  onDelete,
}: Readonly<Pick<Props, "todo" | "onDelete">>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-destructive hover:bg-destructive/20"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are about to delete a Todo</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{todo.title}&quot; ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete(todo)}
            className="bg-destructive/80 hover:bg-destructive"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function TodoCard({
  todo,
  onDelete,
  onUpdate,
  onToggleCompletedAt,
}: Readonly<Props>) {
  const getDistanceToNow = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex justify-between gap-3 ">
        {/* checkbox and title */}
        <div className="flex gap-3 items-center">
          <Checkbox
            className="rounded-full border-2"
            checked={!!todo.completedAt}
            onCheckedChange={() => onToggleCompletedAt(todo)}
          />
          <h3 className="font-medium text-lg">{todo.title}</h3>
        </div>

        {/* actions */}
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <TodoFormDialog
            mode="update"
            todo={todo}
            onSubmit={(todoInput) => onUpdate(todo, todoInput)}
            trigger={
              <Button variant="ghost" size="icon" className="rounded-full">
                <Pencil />
              </Button>
            }
          />
          <TodoDeleteDialogTrigger todo={todo} onDelete={onDelete} />
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* status*/}
        <Badge>In progress</Badge>

        {/* description */}
        <p>{todo.description}</p>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col w-full pt-6 border-t text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            {/* completed metadata */}
            <div className="flex items-center">
              {todo.completedAt ? (
                <>
                  <CircleCheckBig className="size-3 mr-1 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-600">
                    Completed {getDistanceToNow(todo.completedAt)}
                  </span>
                </>
              ) : (
                <>
                  <CircleX className="size-3 mr-1" />
                  <span>Not Completed</span>
                </>
              )}
            </div>

            {/* due date metadata */}
            <div className="flex items-center">
              <Calendar className="size-3 mr-1" />
              <span>Due {getDistanceToNow(todo.dueDate)}</span>
            </div>

            {/* updated metadata */}
            <div className="flex items-center">
              <RefreshCw className="size-3 mr-1" />
              <span>Updated {getDistanceToNow(todo.updatedAt)}</span>
            </div>

            {/* created metadata */}
            <div className="flex items-center">
              <Clock className="size-3 mr-1" />
              <span>Created {getDistanceToNow(todo.createdAt)}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
