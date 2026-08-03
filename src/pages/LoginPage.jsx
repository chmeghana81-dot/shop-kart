import { Link } from 'react-router-dom';
import AuthLayout from '@components/auth/AuthLayout';
import LoginForm  from '@components/auth/LoginForm';
import { ROUTES }  from '@constants/routes';
import { usePageTitle } from '@hooks/usePageTitle';

export default function LoginPage() {
  usePageTitle('Sign In');

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your ShopKart account to continue shopping."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to={ROUTES.REGISTER} className="text-primary-500 font-semibold hover:underline">
            Create one free
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
