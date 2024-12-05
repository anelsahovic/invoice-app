import prisma from './db';

export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export async function getInvoiceData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      recipientName: true,
      total: true,
      currency: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return data;
}

export async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      address: true,
    },
  });
  if (!data) {
    // Handle the case where no user is found by returning a default object
    return {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    };
  }

  return data;
}
