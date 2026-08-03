import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, User, Lock } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { loginThunk, clearError } from '@redux/slices/authSlice';
import { useAuth } from '@hooks/useAuth';
import { loginSchema } from '@utils/validators';
import { ROUTES } from '@constants/routes';
import { cn } from '@utils/helpers';
import Button from '@components/ui/Button';

/**
 * Full login form — username + password + remember me.
 * Uses React Hook Form + Zod for validation.
 * On success redirects to the originally requested page (or home).
 */
export default function LoginForm() {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const location   = useLocation();
  const { loading, error, isAuthenticated, clearError: resetError } = useAuth();

  const [showPass, setShowPass] = useState(false);
  const from = location.state?.from?.pathname ?? ROUTES.HOME;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '', remember: false },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  // Map Redux error → form error
  useEffect(() => {
    if (error) {
      setError('password', { message: error });
      toast.error(error);
      resetError();
    }
  }, [error, setError, resetError]);

  const onSubmit = async (data) => {
    const result = await dispatch(loginThunk(data));
    if (loginThunk.fulfilled.match(result)) {
      toast.success(`Welcome back, ${result.payload.firstName}!`);
      navigate(from, { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Username
        </label>
        <div className="relative">
          <User
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            id="username"
            type="text"
            placeholder="emilys"
            autoComplete="username"
            {...register('username')}
            className={cn(
              'input-field pl-9',
              errors.username && 'border-red-400 focus:border-red-500 focus:ring-red-400'
            )}
          />
        </div>
        {errors.username && (
          <p className="mt-1.5 text-xs text-red-500">{errors.username.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <Link
            to="#"
            className="text-xs text-primary-500 hover:text-primary-600 font-medium"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            id="password"
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            autoComplete="current-password"
            {...register('password')}
            className={cn(
              'input-field pl-9 pr-10',
              errors.password && 'border-red-400 focus:border-red-500 focus:ring-red-400'
            )}
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            aria-label={showPass ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Remember me */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          {...register('remember')}
          className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-400"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
      </label>

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        loading={loading}
        leftIcon={!loading && <LogIn size={16} />}
        className="mt-2"
      >
        Sign In
      </Button>

      {/* Demo credentials hint */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-500">
        Demo: <span className="font-mono font-semibold text-gray-600 dark:text-gray-300">emilys</span>
        {' / '}
        <span className="font-mono font-semibold text-gray-600 dark:text-gray-300">emilyspass</span>
      </p>
    </form>
  );
}
