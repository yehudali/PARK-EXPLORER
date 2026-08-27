import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { messageFor } from '@/lib/errors'
import { useLogin } from '../hooks/useAuth'
import { loginSchema, type LoginValues } from '../schemas'

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const login = useLogin()
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const errors = form.formState.errors

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit((values) =>
        login.mutate(values, { onSuccess }),
      )}
    >
      {login.isError && (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertDescription>
            {/* The one code that means something specific on this screen. */}
            {messageFor(login.error, {
              UNAUTHORIZED: 'Email or password is incorrect.',
            })}
          </AlertDescription>
        </Alert>
      )}

      <FieldGroup>
        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...form.register('email')}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={Boolean(errors.password)}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...form.register('password')}
          />
          <FieldError errors={[errors.password]} />
        </Field>
      </FieldGroup>

      <Button type="submit" size="lg" className="w-full" disabled={login.isPending}>
        {login.isPending ? 'Signing in…' : 'Sign in'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        No account yet?{' '}
        <Link to="/register" className="text-primary hover:underline">
          Create one
        </Link>
      </p>
    </form>
  )
}
