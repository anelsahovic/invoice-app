import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CheckCircle,
  Download,
  FileText,
  MoreHorizontal,
  Pencil,
  Trash,
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  invoiceId: string;
  status: string;
}

export default function InvoiceActions({ invoiceId, status }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {status === 'PENDING' && (
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/invoices/${invoiceId}/paid`}>
              <CheckCircle className="size-4 mr-2" /> Mark as paid
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${invoiceId}`}>
            <Pencil className="size-4 mr-2" /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${invoiceId}`}>
            <FileText className="size-4 mr-2" /> Generate PDF
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="">
            <Download className="size-4 mr-2" /> Download PDF
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${invoiceId}/delete`}>
            <Trash className="size-4 mr-2" /> Delete
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
