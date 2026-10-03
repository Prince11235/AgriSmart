import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Save, Loader2 } from 'lucide-react';
import { farmerProfileSchema } from '../utils/validators';
import { farmerService } from '../services/authService';
import { FarmLocationMap } from '../components/maps/FarmLocationMap';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';

export const FarmerProfilePage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['farmer-profile'],
    queryFn: farmerService.getProfile,
  });

  const profile = data?.data;

  const { register, handleSubmit, reset, watch } = useForm({
    resolver: zodResolver(farmerProfileSchema),
    values: profile
      ? {
          farmAreaAcres: profile.farmAreaAcres,
          soilType: profile.soilType,
          experienceYears: profile.experienceYears,
          preferredLanguage: profile.preferredLanguage,
          irrigationType: profile.irrigationType,
          primaryCrops: profile.primaryCrops?.join(', ') || '',
          village: profile.location?.village,
          district: profile.location?.district,
          state: profile.location?.state,
        }
      : undefined,
  });

  const mutation = useMutation({
    mutationFn: farmerService.upsertProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['farmer-profile'] }),
  });

  const onSubmit = (values) => {
    mutation.mutate({
      ...values,
      primaryCrops: values.primaryCrops
        ? values.primaryCrops.split(',').map((c) => c.trim()).filter(Boolean)
        : [],
      location: {
        village: values.village,
        district: values.district,
        state: values.state,
        lat: profile?.location?.lat ?? 30.9,
        lng: profile?.location?.lng ?? 75.85,
      },
    });
  };

  const lat = profile?.location?.lat ?? 30.9;
  const lng = profile?.location?.lng ?? 75.85;

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black gradient-text">Farmer Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Farm registry · geo-tagged fields · crop history baseline</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-500" /> Farm details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Village</Label>
                <Input className="mt-1" {...register('village')} />
              </div>
              <div>
                <Label>District</Label>
                <Input className="mt-1" {...register('district')} />
              </div>
            </div>
            <div>
              <Label>State</Label>
              <Input className="mt-1" {...register('state')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Farm area (acres)</Label>
                <Input className="mt-1" type="number" step="0.1" {...register('farmAreaAcres')} />
              </div>
              <div>
                <Label>Experience (years)</Label>
                <Input className="mt-1" type="number" {...register('experienceYears')} />
              </div>
            </div>
            <div>
              <Label>Soil type</Label>
              <Input className="mt-1" {...register('soilType')} />
            </div>
            <div>
              <Label>Primary crops (comma separated)</Label>
              <Input className="mt-1" {...register('primaryCrops')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Language</Label>
                <Input className="mt-1" {...register('preferredLanguage')} />
              </div>
              <div>
                <Label>Irrigation</Label>
                <Input className="mt-1" {...register('irrigationType')} />
              </div>
            </div>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save profile
            </Button>
            {mutation.isSuccess && (
              <p className="text-xs text-emerald-600">Profile synced to MongoDB Atlas.</p>
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Farm location map</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <FarmLocationMap lat={lat} lng={lng} farmName={watch('village') || 'Farm'} />
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
