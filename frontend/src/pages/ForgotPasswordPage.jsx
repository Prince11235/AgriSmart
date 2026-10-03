import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { z } from 'zod';
import { authService } from '../services/authService';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const schema = z.object({ email: z.string().email() });

export const ForgotPasswordPage = () => {
  const [message, setMessage] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async ({ email }) => {
    const res = await authService.forgotPassword(email);
    setMessage(res.message || 'If the account exists, a reset link was sent.');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input className="mt-1" type="email" {...register('email')} />
            </div>
            {message && <p className="text-xs text-emerald-600">{message}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <Mail className="w-4 h-4" /> Send reset link
            </Button>
            <Link to="/login" className="text-xs text-center block text-emerald-600 font-semibold">
              Back to login
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
