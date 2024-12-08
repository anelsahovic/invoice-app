import { redirect } from 'next/navigation';
import { auth } from '../auth';
import RegisterForm from '../components/RegisterForm';

export default async function Register() {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <>
      <RegisterForm />
    </>
  );
}
