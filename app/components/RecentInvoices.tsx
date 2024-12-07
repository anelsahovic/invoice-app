import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency, getTransactions } from '../utils/helperFunctions';
import { requireUser } from '../utils/hooks';
import { Separator } from '@/components/ui/separator';

export default async function RecentInvoices() {
  const session = await requireUser();
  const transactions = await getTransactions(session.user?.id as string);
  return (
    <Card className="p-2 w-full h-full flex flex-col justify-around">
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
        <CardDescription>Showing recent invoices</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 ">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex flex-col ">
            <div className="flex items-center bg-white py-2">
              {/* Recipient Info */}
              <div className="flex items-center gap-3">
                <Avatar className="size-10 md:hidden">
                  <AvatarFallback className="text-sm font-bold bg-blue-100 text-blue-600">
                    {transaction.recipientName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-base font-semibold text-gray-800">
                    {transaction.recipientName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.recipientEmail}
                  </p>
                </div>
              </div>

              {/* Transaction Amount */}
              <div className="flex flex-col items-center gap-2 ml-auto">
                <span className="text-base font-semibold text-green-600">
                  {formatCurrency(transaction.total, transaction.currency)}
                </span>
                {/* Status Badge */}
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    transaction.status === 'PAID'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
