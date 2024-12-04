import { requireUser } from '../utils/hooks';

// type Props = {};

export default async function DashboardRoute() {
  const session = await requireUser();
  return (
    <div>
      <h1>Dashboard content is here</h1>
    </div>
  );
}
