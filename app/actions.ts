/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { requireUser } from './utils/hooks';
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema, loginSchema, userSchema } from './utils/zodSchemas';
import prisma from './utils/db';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { signIn } from './auth';

export const registerUser = async (prevState: unknown, formData: FormData) => {
  // const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: userSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const hashedPassword = await bcrypt.hash(submission.value.password, 10);
    const normalizedEmail = submission.value.email.toLowerCase().trim();

    const data = await prisma.user.create({
      data: {
        firstName: submission.value.firstName.trim(),
        lastName: submission.value.lastName.trim(),
        username: submission.value.username.trim(),
        address: submission.value.address.trim(),
        email: normalizedEmail,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      status: 'error',
      message: 'Failed to register user. Please try again.',
    };
  }
  return redirect('/login');
};

export const loginUser = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const email = submission.value.email.toLowerCase().trim();
  const password = submission.value.password;

  try {
    const result = await signIn('credentials', {
      redirect: false, // Avoid automatic redirect
      callbackUrl: '/dashboard', // Successful login redirect
      email,
      password,
    });

    if (!result || result.error) {
      throw new Error(result?.error || 'Unknown error occurred');
    }
  } catch (error) {
    return {
      success: false,
      error: 'Invalid credentials. Please try again.',
    };
  }
  return redirect('/dashboard');
};

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: userSchema,
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

  return redirect('/login');
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
      note: (submission.value.note as string) ?? '',
      userId: session.user?.id,
    },
  });

  return redirect('/dashboard/invoices');
}

export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get('id') as string,
      userId: session.user?.id,
    },
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
    },
  });

  return redirect('/dashboard/invoices');
}

export async function deleteInvoice(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
  });

  return redirect('/dashboard/invoices');
}

export async function markAsPaid(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.update({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
    data: {
      status: 'PAID',
    },
  });

  return redirect('/dashboard/invoices');
}
