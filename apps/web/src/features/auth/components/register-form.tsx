import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { messageFor } from '@/lib/errors'
import { useRegister } from '../hooks/useAuth'
import { registerSchema, type RegisterValues } from '../schemas'

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const register = useRegister()
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  })

  const errors = form.formState.errors

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit((values) =>
        register.mutate(values, { onSuccess }),
      )}
    >
      {register.isError && (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertDescription>
            {/* A conflict here can only mean one thing. */}
            {messageFor(register.error, {
              CONFLICT: 'That email is already registered.',
            })}
          </AlertDescription>
        </Alert>
      )}

      <FieldGroup>
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            autoComplete="name"
            {...form.register('name')}
          />
          <FieldError errors={[errors.name]} />
        </Field>

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
            autoComplete="new-password"
            {...form.register('password')}
          />
          {errors.password ? (
            <FieldError errors={[errors.password]} />
          ) : (
            <FieldDescription>At least 6 characters.</FieldDescription>
          )}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={register.isPending}
      >
        {register.isPending ? 'Creating account…' : 'Create account'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
