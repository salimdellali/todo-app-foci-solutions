"use client"

import { useEffect, useState } from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { toast } from "sonner"
import { Todo, TodoInput } from "@/db/schema"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"

type Props = {
  mode: "create" | "update"
  todo?: Todo
  trigger: React.ReactNode
  onSubmit: (todoInput: TodoInput) => void
}

export function TodoFormDialog({
  mode,
  todo,
  trigger,
  onSubmit,
}: Readonly<Props>) {
  const [open, setOpen] = useState(false)

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)

  // Reset form when todo changes (for update mode)
  useEffect(() => {
    if (todo) {
      setTitle(todo.title)
      setDescription(todo.description ?? "")
      setDueDate(todo.dueDate)
    }
  }, [todo])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: improve validation
    // validate inputs
    if (!title.trim()) {
      toast("Please enter a title")
      return
    }

    if (!dueDate) {
      toast("Please select a due date")
      return
    }
    // inputs validated

    // the right server action will be called, either add new or update existing
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate,
    })

    // reset fields after form submission
    setTitle("")
    setDescription("")
    setDueDate(undefined)

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Todo" : "Edit Todo"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* title seciton */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                placeholder="Enter title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* description section */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* due date section */}
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon />
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Pick a due date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                  <Select
                    onValueChange={(value) =>
                      setDueDate(addDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Quick due dates" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="1">Tomorrow</SelectItem>
                      <SelectItem value="3">In 3 days</SelectItem>
                      <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <Button type="submit" className="w-full">
              {mode === "create" ? "Add Todo" : "Update Todo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
