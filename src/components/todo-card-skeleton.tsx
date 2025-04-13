import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TodoCardSkeleton() {
  return (
    <Card className="group">
      <CardHeader className="flex justify-between gap-3">
        {/* checkbox and title skeleton */}
        <div className="flex gap-3 items-center">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-6 w-48" />
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* status skeleton */}
        <Skeleton className="h-5 w-20" />

        {/* description skeleton */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>

      <CardFooter>
        <div className="flex flex-col w-full pt-6 border-t space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            {/* metadata skeletons */}
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
