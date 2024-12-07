import React from 'react';
import { requireUser } from '../utils/hooks';
import DashboardCards from './DashboardCards';
import DashboardChart from './DashboardChart';
import RecentInvoices from './RecentInvoices';
import { getInvoiceData } from '../utils/helperFunctions';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default async function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await requireUser();
  const data = await getInvoiceData(session.user?.id as string);
  return (
    <div className="w-full h-full">
      {data.length > 0 ? (
        <div className="flex flex-col space-y-6">
          <DashboardCards />

          <section className="w-full lg:max-h-[600px]">
            <div className="grid lg:grid-cols-3 gap-2 lg:gap-6 h-full w-full">
              <div className="lg:col-span-2 h-full w-full ">
                <DashboardChart />
              </div>
              <div className="lg:col-span-1 h-full w-full ">
                <RecentInvoices />
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="h-full w-full bg-gray-50 rounded-lg flex flex-col justify-center items-center gap-4 p-6">
          <p className="text-xl font-semibold text-gray-600">
            No invoices found
          </p>
          <Link
            href="/dashboard/invoices/create"
            className={buttonVariants({ variant: 'default' })}
          >
            Create New Invoice
          </Link>
        </div>
      )}
    </div>
  );
}
