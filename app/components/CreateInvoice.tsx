import React from 'react';
import { auth } from '../auth';
import { userProps } from '../types/types';
import { getUserData } from '../utils/helperFunctions';
import CreateInvoiceCard from './CreateInvoiceCard';

export default async function CreateInvoice() {
  const session = await auth();

  const userData: userProps = await getUserData(session?.user?.id as string);

  return <CreateInvoiceCard userData={userData} />;
}
