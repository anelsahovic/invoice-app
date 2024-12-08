import Link from 'next/link';
import { requireUser } from '../utils/hooks';
import Logo from '@/public/logo.png';
import Image from 'next/image';
import DashboardLinks from '../components/DashboardLinks';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '../auth';
import prisma from '../utils/db';
import { redirect } from 'next/navigation';
import { getUserData } from '../utils/helperFunctions';

interface Props {
  children: React.ReactNode;
}

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
    },
  });

  if (!data?.firstName || !data?.lastName || !data?.address) {
    redirect('/onboarding');
  }
}

export default async function layout({ children }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await requireUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = await getUser(session.user?.id as string);
  const user = await getUserData(session.user?.id as string);
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center ">
                <Image src={Logo} alt="logo" className="size-10" />
                <p className="text-2xl font-bold ml-2">Invoice</p>
                <span className="text-primary font-bold text-sm uppercase">
                  App
                </span>
              </Link>
            </div>

            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={'default'} size={'icon'} className="md:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left">
                <SheetTitle>
                  <Link href="/" className="flex items-center ">
                    <Image src={Logo} alt="logo" className="size-10" />
                    <p className="text-2xl font-bold ml-2 ">Invoice</p>
                    <span className="text-primary font-bold text-sm uppercase">
                      App
                    </span>
                  </Link>
                </SheetTitle>
                <nav className="grid gap-2 mt-10">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex items-center ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    className="rounded-full text-primary hover:text-primary/90"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <User className="p-1" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <p className="text-slate-700 text-xs">{`@${user?.username}`}</p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/invoices">Invoices</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        'use server';
                        await signOut();
                      }}
                    >
                      <button className="w-full text-left" type="submit">
                        Log Out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
