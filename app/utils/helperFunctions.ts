import { notFound, redirect } from 'next/navigation';
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

export function convertToUsd(amount: number, currency: string) {
  switch (currency.toLowerCase()) {
    case 'eur': // Euros to USD
      return amount * 1.06; // Approximate exchange rate
    case 'yen': // Yen to USD
      return amount * 0.007; // Approximate exchange rate
    case 'inr': // Rupees to USD
      return amount * 0.012;
    case 'usd': // US Dollars (no conversion needed)
      return amount; // Approximate exchange rate
    default:
      throw new Error(`Unsupported currency: ${currency}`);
  }
}

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

export async function getAllInvoiceData(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }

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

export async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return redirect('/dashboard/invoices');
  }
}

export async function getStatistics(userId: string) {
  const [totalInvoices, pendingInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
        currency: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: 'PENDING',
      },
      select: {
        id: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: 'PAID',
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    totalInvoices,
    pendingInvoices,
    paidInvoices,
  };
}

export async function getLast30DaysInvoices(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      userId: userId,
      status: 'PAID',
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // grouping data by date
  const aggregatedData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      acc[date] = (acc[date] || 0) + curr.total;

      return acc;
    },
    {}
  );
  const transformedData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + ', ' + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount,
    }));

  return transformedData;
}

export async function getTransactions(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      recipientName: true,
      recipientEmail: true,
      total: true,
      currency: true,
      status: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

  return data;
}
