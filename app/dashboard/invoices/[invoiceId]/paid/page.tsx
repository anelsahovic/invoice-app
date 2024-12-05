import { markAsPaid } from '@/app/actions';
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
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  params: Promise<{ invoiceId: string }>;
}

export default async function MarkAsPaid({ params }: Props) {
  const session = await requireUser();
  const invoiceId = (await params).invoiceId;

  await Authorize(invoiceId, session.user?.id as string);
  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-[500px]">
        <CardHeader className="flex flex-col justify-center items-center">
          <div className="p-2 bg-green-100 text-green-500 rounded-full flex items-center justify-center gap-1  w-fit">
            <CheckCircle className="size-20" />
          </div>
          <CardTitle className="text-center text-2xl">Mark as Paid</CardTitle>
          <CardDescription className="font-semibold text-zinc-900">
            Are you sure you want to mark this invoice as paid?
          </CardDescription>
          <CardDescription className="text-center">
            Marking this invoice as paid will change its status to complete and
            update its value in database.
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
              await markAsPaid(invoiceId);
            }}
          >
            <SubmitButton text="Mark as Paid" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
