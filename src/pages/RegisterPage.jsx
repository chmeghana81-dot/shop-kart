import { Link } from 'react-router-dom';
import AuthLayout   from '@components/auth/AuthLayout';
import RegisterForm from '@components/auth/RegisterForm';
import { ROUTES }    from '@constants/routes';
import { usePageTitle } from '@hooks/usePageTitle';

export default function RegisterPage() {
  usePageTitle('Create Account');

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join millions of shoppers on ShopKart. It's free!"
      footer={
        <>
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary-500 font-semibold hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}
