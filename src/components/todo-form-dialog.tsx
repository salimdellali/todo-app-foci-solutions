"use client"

import { useState } from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon, Plus } from "lucide-react"
import { toast } from "sonner"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { TodoInput } from "@/db/schema"

type Props = {
  onSubmit: (todoInput: TodoInput) => void
}

export function TodoFormDialog({ onSubmit }: Readonly<Props>) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [dueDate, setDueDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: improve validation
    // validate inputs
    if (!title.trim) {
      toast("Please enter a title")
      return
    }

    if (!dueDate) {
      toast("Please select a due date")
      return
    }
    // inputs validated

    // call add todo server action
    onSubmit({
      title,
      description,
      dueDate,
    })

    // reset fields
    setTitle("")
    setDescription("")
    setDueDate(undefined)

    // Close dialog after submission
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:shadow-lg transition-all duration-300">
          <Plus />
          <span>Add Todo</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* title seciton */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
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
              Add Todo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
