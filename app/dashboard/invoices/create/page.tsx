import CreateInvoice from '@/app/components/CreateInvoice';
import { userProps } from '@/app/types/types';
import { auth } from '@/app/utils/auth';
import { getUserData } from '@/app/utils/helperFunctions';
import React from 'react';

export default async function InvoiceCreatePage() {
  const session = await auth();

  const userData: userProps = await getUserData(session?.user?.id as string);

  return (
    <div>
      <CreateInvoice userData={userData} />
    </div>
  );
}
