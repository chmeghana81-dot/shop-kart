import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

import { loginThunk } from '@redux/slices/authSlice';
import { useAuth } from '@hooks/useAuth';
import { registerSchema } from '@utils/validators';
import { ROUTES } from '@constants/routes';
import { cn } from '@utils/helpers';
import Button from '@components/ui/Button';

/**
 * Registration form.
 * DummyJSON has no real register endpoint, so after collecting data
 * we auto-login with the DummyJSON demo account as a UX demo.
 * In production this would POST to /users/add then auto-login.
 */
export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useAuth();

  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting,  setSubmitting]  = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName:  '',
      email:     '',
      password:  '',
      confirm:   '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.HOME, { replace: true });
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // DummyJSON has no register endpoint — demo: auto-login with their test user
      const result = await dispatch(
        loginThunk({ username: 'emilys', password: 'emilyspass', remember: false })
      );
      if (loginThunk.fulfilled.match(result)) {
        toast.success(`Account created! Welcome, ${data.firstName}!`);
        navigate(ROUTES.HOME, { replace: true });
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const Field = ({ id, label, type = 'text', placeholder, icon: Icon, error, extra, ...props }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn('input-field pl-9', extra, error && 'border-red-400 focus:border-red-500 focus:ring-red-400')}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            First Name
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              id="firstName"
              type="text"
              placeholder="Emily"
              autoComplete="given-name"
              {...register('firstName')}
              className={cn('input-field pl-9', errors.firstName && 'border-red-400')}
            />
          </div>
          {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Last Name
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              id="lastName"
              type="text"
              placeholder="Smith"
              autoComplete="family-name"
              {...register('lastName')}
              className={cn('input-field pl-9', errors.lastName && 'border-red-400')}
            />
          </div>
          {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Email Address
        </label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register('email')}
            className={cn('input-field pl-9', errors.email && 'border-red-400')}
          />
        </div>
        {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            id="password"
            type={showPass ? 'text' : 'password'}
            placeholder="Min. 6 characters"
            autoComplete="new-password"
            {...register('password')}
            className={cn('input-field pl-9 pr-10', errors.password && 'border-red-400')}
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            aria-label={showPass ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>}
      </div>

      {/* Confirm password */}
      <div>
        <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Confirm Password
        </label>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            id="confirm"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Repeat your password"
            autoComplete="new-password"
            {...register('confirm')}
            className={cn('input-field pl-9 pr-10', errors.confirm && 'border-red-400')}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirm && <p className="mt-1.5 text-xs text-red-500">{errors.confirm.message}</p>}
      </div>

      {/* Terms */}
      <p className="text-xs text-gray-400 dark:text-gray-500">
        By creating an account you agree to our{' '}
        <a href="#" className="text-primary-500 hover:underline">Terms of Service</a>{' '}
        and{' '}
        <a href="#" className="text-primary-500 hover:underline">Privacy Policy</a>.
      </p>

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        loading={submitting || loading}
        leftIcon={!submitting && !loading && <UserPlus size={16} />}
      >
        Create Account
      </Button>
    </form>
  );
}
