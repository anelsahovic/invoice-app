import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Graph from './Graph';
import { getLast30DaysInvoices } from '../utils/helperFunctions';
import { requireUser } from '../utils/hooks';
import { DollarSign } from 'lucide-react';

export default async function DashboardChart() {
  const session = await requireUser();
  const data = await getLast30DaysInvoices(session.user?.id as string);
  return (
    <Card className="h-full flex flex-col justify-around ">
      <CardHeader>
        <CardTitle>Invoices Chart</CardTitle>
        <CardDescription>Marked as paid</CardDescription>
      </CardHeader>
      <CardContent className="p-0 lg:p4 ">
        <Graph data={data} />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Data for paid invoices <DollarSign className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total processed invoices for the last 30 days
        </div>
      </CardFooter>
    </Card>
  );
}
