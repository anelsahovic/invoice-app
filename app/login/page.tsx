import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth, signIn } from '../utils/auth';
import SubmitButton from '../components/SubmitButtons';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-8">
        <Card className=" max-w-sm grow">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Please Login to your Account</CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="flex flex-col gap-y-4"
              action={async (formData) => {
                'use server';
                await signIn('nodemailer', formData);
              }}
            >
              <div className="flex flex-col gap-y-2">
                <Label>E-mail</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="example@mail.com"
                />
              </div>
              {/* <div className="flex flex-col gap-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div> */}

              <SubmitButton text="Submit" />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
