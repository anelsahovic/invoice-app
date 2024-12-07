import CreateInvoice from '@/app/components/CreateInvoice';
import Loading from '@/app/components/Loading';
import { Suspense } from 'react';

export default function InvoiceCreatePage() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateInvoice />
    </Suspense>
  );
}
