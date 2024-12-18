import { auth } from '../auth';
import { redirect } from 'next/navigation';
import LoginForm from '../components/LoginForm';

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <>
      <LoginForm />
    </>
  );
}
