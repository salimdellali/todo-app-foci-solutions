"use client"

import {
  formatDistanceToNow,
  formatRelative,
  differenceInDays,
  differenceInSeconds,
} from "date-fns"
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
import { cn } from "@/lib/utils"

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
  const getDistanceToNow = (date: Date): string => {
    return formatDistanceToNow(date, { addSuffix: true })
  }

  const formatCompletedAt = (date: Date): string => {
    return formatRelative(date, new Date())
  }

  enum TodoStatusEnum {
    COMPLETED = "Completed",
    IN_PROGRESS = "In Progress",
    DUE_SOON = "Due Soon",
    OVERDUE = "Overdue",
  }

  const getTodoStatus = (todo: Todo): TodoStatusEnum => {
    if (todo.completedAt) {
      return TodoStatusEnum.COMPLETED
    }

    const daysToDueDate = differenceInDays(todo.dueDate, new Date())
    if (daysToDueDate < 0) {
      return TodoStatusEnum.OVERDUE
    }
    if (daysToDueDate <= 1) {
      return TodoStatusEnum.DUE_SOON
    }

    return TodoStatusEnum.IN_PROGRESS
  }

  const getStatusColor = (status: TodoStatusEnum) => {
    switch (status) {
      case TodoStatusEnum.COMPLETED:
        return "bg-emerald-400"
      case TodoStatusEnum.OVERDUE:
        return "bg-red-400"
      case TodoStatusEnum.DUE_SOON:
        return "bg-orange-400"
      default:
        return "bg-primary"
    }
  }

  const todoStatus = getTodoStatus(todo)

  return (
    <Card
      className={cn(
        "group relative overflow-hidden hover:shadow-lg transition-all duration-300",
        todo.completedAt && "bg-muted text-muted-foreground"
      )}
    >
      {/* Priority indicator line */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1",
          getStatusColor(todoStatus)
        )}
      />

      <CardHeader className="flex justify-between gap-3">
        {/* checkbox and title */}
        <div className="flex gap-3 items-center">
          <Checkbox
            className="size-6 rounded-full border-2 data-[state=checked]:bg-emerald-400 data-[state=checked]:text-white"
            checked={!!todo.completedAt}
            onCheckedChange={() => onToggleCompletedAt(todo)}
          />
          <h3
            className={cn(
              "font-medium text-lg",
              todo.completedAt && "line-through"
            )}
          >
            {todo.title}
          </h3>
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
        {/* status */}
        <Badge className={getStatusColor(todoStatus)}>{todoStatus}</Badge>

        {/* description */}
        <p>{todo.description}</p>
      </CardContent>

      <CardFooter>
        <div className="w-full pt-6 border-t">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 text-xs text-muted-foreground">
            {/* completed metadata */}
            <div className="flex items-center">
              {todo.completedAt ? (
                <>
                  <CircleCheckBig className="size-3 mr-1 shrink-0" />
                  <span className="truncate">
                    Completed {formatCompletedAt(todo.completedAt)}
                  </span>
                </>
              ) : (
                <>
                  <CircleX className="size-3 mr-1 shrink-0" />
                  <span className="truncate">
                    {differenceInSeconds(todo.dueDate, new Date()) > 0
                      ? "Not yet completed"
                      : "Not completed"}
                  </span>
                </>
              )}
            </div>

            {/* due date metadata */}
            <div className="flex items-center">
              <Calendar className="size-3 mr-1 shrink-0" />
              <span className="truncate">
                Due {getDistanceToNow(todo.dueDate)}
              </span>
            </div>

            {/* updated metadata */}
            <div className="flex items-center">
              <RefreshCw className="size-3 mr-1 shrink-0" />
              <span className="truncate">
                Updated {getDistanceToNow(todo.updatedAt)}
              </span>
            </div>

            {/* created metadata */}
            <div className="flex items-center">
              <Clock className="size-3 mr-1 shrink-0" />
              <span className="truncate">
                Created {getDistanceToNow(todo.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
