import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }


export function DashCardSkeleton() {

  return (
    <Card className="w-full h-full border-4 py-2 border-blue-400 bg-gray-50">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="mx-auto">
        <p className="text-4xl  mx-auto py-0 my-0"></p>
      </CardContent>

    </Card>
  )
}

