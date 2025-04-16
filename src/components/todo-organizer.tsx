import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  FilterOptions,
  SortOptions,
  FILTER_OPTIONS,
  SORT_OPTIONS,
} from "@/lib/todos"

type Props = {
  sortBy: SortOptions
  filterBy: FilterOptions
  onSortChange: (value: SortOptions) => void
  onFilterChange: (value: FilterOptions) => void
}

export function TodoFilter({
  sortBy,
  filterBy,
  onSortChange,
  onFilterChange,
}: Readonly<Props>) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="space-y-1 w-full">
        <Label htmlFor="filter" className="text-sm">
          Filter
        </Label>
        <Select
          defaultValue={FILTER_OPTIONS.ALL_TASKS}
          value={filterBy}
          onValueChange={(value) => onFilterChange(value as FilterOptions)}
        >
          <SelectTrigger id="filter" className="w-full bg-white dark:bg-dark">
            <SelectValue placeholder="Filter tasks" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(FILTER_OPTIONS).map((filterOption) => (
              <SelectItem key={filterOption} value={filterOption}>
                {filterOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1 w-full">
        <Label htmlFor="sort" className="text-sm">
          Sort By
        </Label>
        <Select
          defaultValue={SORT_OPTIONS.LAST_CREATED}
          value={sortBy}
          onValueChange={(value) => onSortChange(value as SortOptions)}
        >
          <SelectTrigger id="sort" className="w-full bg-white dark:bg-dark">
            <SelectValue placeholder="Sort tasks" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(SORT_OPTIONS).map((sortOption) => (
              <SelectItem key={sortOption} value={sortOption}>
                {sortOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
