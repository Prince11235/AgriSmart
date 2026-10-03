import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sprout, UserPlus, Loader2 } from 'lucide-react';
import { useAuth, ROLES } from '../context/AuthContext';
import { registerSchema } from '../utils/validators';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      role: 'Farmer',
    },
  });

  const onSubmit = async (values) => {
    setError('');
    try {
      await registerUser(values);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center max-w-7xl mx-auto px-4 py-12">
      <Card className="max-w-md w-full border-emerald-500/20">
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-2">
            <Sprout className="w-7 h-7" />
          </div>
          <CardTitle className="text-2xl">Register farm profile</CardTitle>
          <CardDescription>MongoDB-backed account · RBAC · JWT session</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Full name</Label>
              <Input className="mt-1" {...register('name')} />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label>Email</Label>
              <Input className="mt-1" type="email" {...register('email')} />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label>Password</Label>
              <Input className="mt-1" type="password" {...register('password')} />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <Label>Phone</Label>
              <Input className="mt-1" {...register('phone')} />
            </div>
            <div>
              <Label>Primary role</Label>
              <select
                {...register('role')}
                className="mt-1 w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 px-3 text-sm"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              Create account
            </Button>
          </form>
          <p className="text-center text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            Already registered?{' '}
            <Link to="/login" className="text-emerald-600 font-bold">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
