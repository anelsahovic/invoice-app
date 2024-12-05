/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { requireUser } from './utils/hooks';
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema, onboardingSchema } from './utils/zodSchemas';
import prisma from './utils/db';
import { redirect } from 'next/navigation';

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect('/dashboard');
}

export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      recipientName: submission.value.recipientName,
      recipientEmail: submission.value.recipientEmail,
      recipientAddress: submission.value.recipientAddress,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromName: submission.value.fromName,
      fromEmail: submission.value.fromEmail,
      fromAddress: submission.value.fromAddress,
      invoiceDescription: submission.value.invoiceDescription,
      invoiceQuantity: submission.value.invoiceQuantity,
      invoiceRate: submission.value.invoiceRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note as string,
      userId: session.user?.id,
    },
  });

  return redirect('/dashboard/invoices');
}
