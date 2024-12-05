import EditInvoice from '@/app/components/EditInvoice';
import { getAllInvoiceData } from '@/app/utils/helperFunctions';
import { requireUser } from '@/app/utils/hooks';
import React from 'react';

interface Props {
  params: Promise<{ invoiceId: string }>;
}

export default async function EditInvoiceRoute({ params }: Props) {
  const session = await requireUser();
  const invoiceId = (await params).invoiceId;

  const invoiceData = await getAllInvoiceData(
    invoiceId,
    session.user?.id as string
  );
  return <EditInvoice invoiceData={invoiceData} />;
}
