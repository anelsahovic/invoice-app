'use client';

import { useActionState } from 'react';
import { registerUser } from '../actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { userSchema } from '../utils/zodSchemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import SubmitButton from './SubmitButtons';

export default function RegisterForm() {
  const [lastResult, action] = useActionState(registerUser, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: userSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  return (
    <div className="flex h-screen w-full items-center justify-center px-8">
      <Card className=" max-w-sm grow">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create a New Account</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="flex flex-col gap-6"
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            // action={async (formData) => {
            //   'use server';
            //   await signIn('nodemailer', formData);
            // }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-2">
                <Label>First name</Label>
                <Input
                  id="firstname"
                  placeholder="John"
                  key={fields.firstName.key}
                  name={fields.firstName.name}
                  defaultValue={fields.firstName.initialValue as string}
                />
                <p className="text-sm text-rose-500">
                  {fields.firstName.errors}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last name</Label>
                <Input
                  id="lastname"
                  key={fields.lastName.key}
                  name={fields.lastName.name}
                  defaultValue={fields.lastName.initialValue as string}
                  placeholder="Doe"
                />
                <p className="text-sm text-rose-500">
                  {fields.lastName.errors}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <Input
                  id="username"
                  key={fields.username.key}
                  defaultValue={fields.username.initialValue as string}
                  name={fields.username.name}
                  placeholder="@username"
                />
                <p className="text-sm text-rose-500">
                  {fields.username.errors}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Address</Label>
                <Input
                  id="address"
                  key={fields.address.key}
                  defaultValue={fields.address.initialValue as string}
                  name={fields.address.name}
                  placeholder="St.Luis 123C"
                />
                <p className="text-sm text-rose-500">{fields.address.errors}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>E-mail</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="example@mail.com"
                key={fields.email.key}
                defaultValue={fields.email.initialValue as string}
                name={fields.email.name}
              />
              <p className="text-sm text-rose-500">{fields.email.errors}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                key={fields.password.key}
                name={fields.password.name}
              />
              <p className="text-sm text-rose-500">{fields.password.errors}</p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <p>Already have an account?</p>
              <Link
                className="text-primary hover:underline underline-offset-2 transition duration-300"
                href="/login"
              >
                Login
              </Link>
            </div>

            <SubmitButton text="Register" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
