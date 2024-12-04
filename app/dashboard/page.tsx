import { requireUser } from '../utils/hooks';

// type Props = {};

export default async function DashboardRoute() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await requireUser();
  return (
    <div>
      <h1>Dashboard content is here</h1>
    </div>
  );
}
