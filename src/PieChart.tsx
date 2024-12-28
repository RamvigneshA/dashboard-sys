"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const memoryColorScheme = {
  consumed: {
    label: "Consumed",
    color: "hsl(var(--chart-1))",
  },
  available: {
    label: "Available",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function MemoryUsageChart({ memInfo }) {
  if (!memInfo) return null;
  
  const memoryData = [
    { name: "Available Memory", value: memInfo.free, fill: memoryColorScheme.available.color },
    { name: "Consumed Memory", value: memInfo.used, fill: memoryColorScheme.consumed.color },
  ]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Memory Usage</CardTitle>
        <CardDescription>System Memory Overview</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={memoryColorScheme}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="name" valueKey="value" />}
            />
            <Pie data={memoryData} dataKey="value" fill={memoryColorScheme.consumed.color}>
              <LabelList
                dataKey="value"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof memoryColorScheme) =>
                  memoryColorScheme[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
        Available Memory: {`${(memInfo.free).toFixed(2)}`} GB <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Consumed Memory: {`${(memInfo.used).toFixed(2)}`} GB
        </div>
      </CardFooter>
    </Card>
  )
}
