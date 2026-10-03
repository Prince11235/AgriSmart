import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Sprout, LogIn, Loader2, ShieldCheck, Phone } from 'lucide-react';
import { useAuth, ROLES } from '../context/AuthContext';
import { loginSchema } from '../utils/validators';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { authService } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [otpMode, setOtpMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'farmer@agrismart.demo',
      password: 'password123',
      roleOverride: 'Farmer',
    },
  });

  const selectedRole = watch('roleOverride');

  const onSubmit = async (values) => {
    setError('');
    try {
      await login({
        email: values.email,
        password: values.password,
        roleOverride: values.roleOverride,
      });
      navigate(location.state?.from?.pathname || '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to sign in');
    }
  };

  const handleOtpRequest = async () => {
    setError('');
    try {
      await authService.requestOtp(phone);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleOtpVerify = async () => {
    setError('');
    try {
      const data = await authService.verifyOtp({ phone, otp, role: selectedRole || 'Farmer' });
      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
        })
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center max-w-7xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="border-emerald-500/20">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-2">
              <Sprout className="w-7 h-7" />
            </div>
            <CardTitle className="text-2xl">Sign in to AgriSmart</CardTitle>
            <CardDescription>Enterprise crop intelligence · JWT secured · RBAC dashboards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 text-xs font-semibold">
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg ${!otpMode ? 'bg-white dark:bg-gray-900 shadow' : ''}`}
                onClick={() => setOtpMode(false)}
              >
                Email
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg ${otpMode ? 'bg-white dark:bg-gray-900 shadow' : ''}`}
                onClick={() => setOtpMode(true)}
              >
                OTP
              </button>
            </div>

            {!otpMode ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label>Role</Label>
                  <select
                    {...register('roleOverride')}
                    className="mt-1 w-full h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 px-3 text-sm"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
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
                {error && <p className="text-xs text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                  Enter as {selectedRole || 'Farmer'}
                </Button>
                <Link to="/forgot-password" className="block text-center text-xs text-emerald-600 font-semibold">
                  Forgot password?
                </Link>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>Mobile number</Label>
                  <Input className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                </div>
                {otpSent && (
                  <div>
                    <Label>OTP</Label>
                    <Input className="mt-1" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" />
                  </div>
                )}
                {error && <p className="text-xs text-red-500">{error}</p>}
                {!otpSent ? (
                  <Button type="button" className="w-full" onClick={handleOtpRequest}>
                    <Phone className="w-4 h-4" /> Send OTP
                  </Button>
                ) : (
                  <Button type="button" className="w-full" onClick={handleOtpVerify}>
                    <ShieldCheck className="w-4 h-4" /> Verify &amp; Sign in
                  </Button>
                )}
              </div>
            )}

            <p className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
              New to AgriSmart?{' '}
              <Link to="/register" className="text-emerald-600 font-bold">
                Register your farm
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
