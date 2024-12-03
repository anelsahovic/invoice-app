import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Verify() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Card className="w-[380px] px-5">
        <CardHeader className="text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
            <Mail className="size-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We have sent you a verification link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 rounded-md bg-yellow-50 border-yellow-300 p-4">
            <div className="flex justify-center items-center gap-2">
              <AlertCircle className="size-5 text-yellow-400" />
              <p className="text-sm font-medium text-yellow-700">
                Be sure to check your spam folder!
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/"
            className={buttonVariants({
              className: 'w-full',
              variant: 'outline',
            })}
          >
            <ArrowLeft className="size4 mr-2" /> Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
