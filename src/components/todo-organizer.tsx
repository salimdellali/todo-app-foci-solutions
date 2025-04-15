"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FilterOption, SortOption } from "@/app/page"

type TodoFilterProps = {
  sortBy: SortOption
  filterBy: FilterOption
  onSortChange: (value: SortOption) => void
  onFilterChange: (value: FilterOption) => void
}

export function TodoFilter({
  sortBy,
  filterBy,
  onSortChange,
  onFilterChange,
}: TodoFilterProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="space-y-1 w-full">
        <Label htmlFor="filter" className="text-sm">
          Filter
        </Label>
        <Select
          defaultValue="all"
          value={filterBy}
          onValueChange={(value) => onFilterChange(value as FilterOption)}
        >
          <SelectTrigger
            defaultValue="all"
            id="filter"
            className="w-full bg-white dark:bg-dark"
          >
            <SelectValue placeholder="Filter tasks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Tasks">All Tasks</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
            <SelectItem value="Due Soon">Due Soon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1 w-full">
        <Label htmlFor="sort" className="text-sm">
          Sort By
        </Label>
        <Select
          defaultValue="createdAt"
          value={sortBy}
          onValueChange={(value) => onSortChange(value as SortOption)}
        >
          <SelectTrigger id="sort" className="w-full bg-white dark:bg-dark">
            <SelectValue placeholder="Sort tasks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Created At">Last Created</SelectItem>
            <SelectItem value="Updated At">Last Updated</SelectItem>
            <SelectItem value="Due Date">Due Date</SelectItem>
            <SelectItem value="Title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
