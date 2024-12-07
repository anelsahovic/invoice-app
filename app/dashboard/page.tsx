import { Suspense } from 'react';
import Loading from '../components/Loading';
import Dashboard from '../components/Dashboard';

// type Props = {};

export default function DashboardRoute() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
