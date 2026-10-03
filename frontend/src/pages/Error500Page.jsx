import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const Error500Page = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <Card className="max-w-lg w-full text-center">
      <CardHeader>
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-2" />
        <CardTitle className="text-3xl">500 — Server Error</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500">
          Our agronomy intelligence services hit a temporary fault. Engineering has been notified via audit logs.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => window.location.reload()}>Retry</Button>
          <Link to="/">
            <Button variant="outline">Home</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
);
