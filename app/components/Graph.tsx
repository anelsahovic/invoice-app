'use client';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis } from 'recharts';

interface Props {
  data: { date: string; amount: number }[];
}

export default function Graph({ data }: Props) {
  console.log(data);

  const chartConfig = {
    amount: {
      label: 'Amount',
      color: 'hsl(var(--primary))',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="">
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="var(--color-amount)"
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
}
