'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SubmitButton from '../components/SubmitButtons';
import Link from 'next/link';
import { useActionState } from 'react';
import { useForm } from '@conform-to/react';
import { loginUser } from '../actions';
import { parseWithZod } from '@conform-to/zod';
import { loginSchema } from '../utils/zodSchemas';

export default function LoginForm() {
  const [lastResult, action] = useActionState(loginUser, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  console.log(lastResult?.error);

  const renderErrors = (error: Record<string, string[] | null>) => {
    return Object.entries(error).map(([field, messages]) => {
      if (messages) {
        return (
          <div key={field}>
            <ul>
              {messages.map((message, index) => (
                <li className="text-rose-500" key={index}>
                  {message}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-8">
      <Card className=" max-w-sm grow">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Please Login to your Account</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="flex flex-col gap-y-4"
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   const formData = new FormData(e.target as HTMLFormElement);
            //   loginUser(undefined, formData);
            // }}
          >
            {/* Display Global Error Message */}
            {lastResult?.error && renderErrors(lastResult.error)}

            <div className="flex flex-col gap-y-2">
              <Label>E-mail</Label>
              <Input
                type="email"
                required
                placeholder="example@mail.com"
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={fields.email.initialValue}
              />
              {/* Display Field Validation Errors */}

              <span className="text-rose-500">{fields.email.errors}</span>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                key={fields.password.key}
                name={fields.password.name}
                defaultValue={fields.password.initialValue}
              />

              <span className="text-rose-500">{fields.password.errors}</span>
            </div>

            <div className="flex items-center justify-center gap-1">
              <p>Don&apos;t have an account?</p>
              <Link
                className="text-primary hover:underline underline-offset-2 transition duration-300"
                href="/register"
              >
                Register
              </Link>
            </div>

            <SubmitButton text="Login" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
