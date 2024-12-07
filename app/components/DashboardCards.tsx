import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CreditCard, DollarSign, FilePenLine } from 'lucide-react';
import {
  convertToUsd,
  formatCurrency,
  getStatistics,
} from '../utils/helperFunctions';
import { requireUser } from '../utils/hooks';

export default async function DashboardCards() {
  const session = await requireUser();
  const { totalInvoices, pendingInvoices, paidInvoices } = await getStatistics(
    session.user?.id as string
  );

  const convertedTotal = totalInvoices.map((invoice) =>
    convertToUsd(invoice.total, invoice.currency)
  );

  const addedTotal = convertedTotal.reduce((acc, invoice) => acc + invoice, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="text-sm text-zinc-600">Total revenue</CardTitle>
          <DollarSign className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            {formatCurrency(addedTotal, 'USD')}
          </h2>
          <p className="text-xs text-muted-foreground">
            Total revenue converted to $USD
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="text-sm text-zinc-600">
            Invoices issued
          </CardTitle>
          <FilePenLine className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">{`+${totalInvoices.length}`}</h2>
          <p className="text-xs text-muted-foreground">Total invoices issued</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="text-sm text-zinc-600">Paid invoices</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold text-green-600 bg-green-100 py-0.5 px-3 rounded-md w-fit">{`+${paidInvoices.length}`}</h2>
          <p className="text-xs text-muted-foreground">
            Invoices that are paid
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="text-sm text-zinc-600">
            Pending invoices
          </CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold text-amber-600 bg-amber-100 py-0.5 px-3 rounded-md w-fit">{`+${pendingInvoices.length}`}</h2>
          <p className="text-xs text-muted-foreground">
            Invoices that are still not paid
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
