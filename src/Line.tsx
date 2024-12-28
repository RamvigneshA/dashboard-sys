import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export function Linechart({ data }) {
  const Data = data;
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>CPU Usage Over Time</CardTitle>
        <CardDescription>
          
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={Data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="cpuUsage"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          CPU Usage
        </div>
      </CardFooter>
    </Card>
  );
}
