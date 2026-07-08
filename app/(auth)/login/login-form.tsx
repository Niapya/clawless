'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ofetch } from 'ofetch';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordHelp, setShowPasswordHelp] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const target = `/api/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`;
      const response = await ofetch.raw<{
        error?: string;
        redirectTo?: string;
      }>(target, {
        method: 'POST',
        body: { username, password },
        ignoreResponseError: true,
      });

      const data = response._data ?? {};
      if (!response.ok) {
        setError(data.error ?? 'Login failed.');
        return;
      }

      router.replace(data.redirectTo ?? '/');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-sm border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Use the configured admin account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                onClick={() => setShowPasswordHelp((visible) => !visible)}
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {showPasswordHelp ? (
              <p className="text-xs text-muted-foreground">
                Check the environment variables for the configured credentials.
              </p>
            ) : null}
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center border-t px-6 py-4">
        <p className="text-xs text-muted-foreground">
          Powered by{' '}
          <Link
            href="https://github.com/Niapya/ClawLess"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            ClawLess
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
