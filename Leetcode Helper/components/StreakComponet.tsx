import { Flame } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"



export default function StreakCard({ streak }: {streak: number}) {
 
  const getMessage = (count: number) => {
    if (count === 0) return "Start small with one problem"
    if (count < 3) return "Great start! Keep going!"
    if (count < 7) return "You're building momentum!"
    if (count < 14) return "Impressive consistency!"
    if (count < 30) return "You're on fire! Amazing dedication!"
    if (count < 60) return "Unstoppable! You're in the coding zone!"
    if (count < 100) return "Legendary status approaching!"
    return "Coding master! Your dedication is inspiring!"
  }

 
  const getColorClass = (count: number) => {
    if (count < 3) return "bg-slate-100 text-slate-700"
    if (count < 7) return "bg-blue-100 text-blue-700"
    if (count < 14) return "bg-green-100 text-green-700"
    if (count < 30) return "bg-yellow-100 text-yellow-700"
    if (count < 60) return "bg-orange-100 text-orange-700"
    return "bg-red-100 text-red-700"
  }

  const getFlameColor = (count: number) => {
    if (count < 3) return "text-slate-400"
    if (count < 7) return "text-blue-500"
    if (count < 14) return "text-green-500"
    if (count < 30) return "text-yellow-500"
    if (count < 60) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <Card className={cn("w-full max-w-md overflow-hidden")}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Flame className={cn("h-6 w-6", getFlameColor(streak))} />
          LeetCode Streak
        </CardTitle>
        <CardDescription>Track your daily problem-solving consistency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="relative flex items-center justify-center">
            <div className={cn("absolute -inset-1 rounded-full blur opacity-60", getFlameColor(streak))} />
            <div
              className={cn("relative flex h-24 w-24 items-center justify-center rounded-full", getColorClass(streak))}
            >
              <span className="text-3xl font-bold">{streak}</span>
            </div>
          </div>

          <Badge variant="outline" className={cn("px-3 py-1 text-sm font-medium", streak >= 7 ? "border-2" : "")}>
            {streak === 1 ? "1 day" : `${streak} days`}
          </Badge>

          <p className="text-center text-muted-foreground">{getMessage(streak)}</p>

          {streak >= 7 && (
            <div className="w-full mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current milestone:</span>
                <Badge variant="secondary">
                  {streak >= 100
                    ? "100+ days"
                    : streak >= 60
                      ? "60+ days"
                      : streak >= 30
                        ? "30+ days"
                        : streak >= 14
                          ? "14+ days"
                          : "7+ days"}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

