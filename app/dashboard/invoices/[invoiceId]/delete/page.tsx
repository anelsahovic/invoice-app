import { deleteInvoice } from '@/app/actions';
import SubmitButton from '@/app/components/SubmitButtons';
import { Authorize } from '@/app/utils/helperFunctions';
import { requireUser } from '@/app/utils/hooks';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleAlert } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  params: Promise<{ invoiceId: string }>;
}

export default async function DeleteInvoiceRoute({ params }: Props) {
  const invoiceId = (await params).invoiceId;
  const session = await requireUser();
  await Authorize(invoiceId, session.user?.id as string);

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-[500px]">
        <CardHeader className="flex flex-col justify-center items-center">
          <div className="p-2 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center gap-1  w-fit">
            <CircleAlert className="size-20" />
          </div>
          <CardTitle className="text-center text-2xl">Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure you want to delete this invoice?
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-around items-center">
          <Link
            className={buttonVariants({ variant: 'outline' })}
            href="/dashboard/invoices"
          >
            Cancel
          </Link>
          <form
            action={async () => {
              'use server';

              await deleteInvoice(invoiceId);
            }}
          >
            <SubmitButton variant="destructive" text="Delete" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
