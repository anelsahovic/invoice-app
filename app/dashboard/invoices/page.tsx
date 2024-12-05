import InvoiceList from '@/app/components/InvoiceList';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Invoices() {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
              <CardDescription>Manage your invoices.</CardDescription>
            </div>

            <Link
              href="/dashboard/invoices/create"
              className={buttonVariants()}
            >
              <Plus /> Create Invoice
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <InvoiceList />
        </CardContent>
      </Card>
    </div>
  );
}
