import { Button } from '@/components/ui/button';
import { signOut } from '../utils/auth';
import { requireUser } from '../utils/hooks';

// type Props = {};

export default async function DashboardRoute() {
  const session = await requireUser();
  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
