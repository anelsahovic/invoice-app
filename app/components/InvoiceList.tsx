import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import InvoiceActions from './InvoiceActions';
import { requireUser } from '../utils/hooks';
import { formatCurrency, getInvoiceData } from '../utils/helperFunctions';
import { Badge } from '@/components/ui/badge';

export default async function InvoiceList() {
  const session = await requireUser();

  const data = await getInvoiceData(session.user?.id as string);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Recipient</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.recipientName}</TableCell>
              <TableCell>
                {formatCurrency(invoice.total, invoice.currency)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={invoice.status === 'PENDING' ? 'pending' : 'success'}
                >
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(invoice.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <InvoiceActions
                  invoiceId={invoice.id}
                  status={invoice.status}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              <p className="text-gray-500">No invoices found.</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
