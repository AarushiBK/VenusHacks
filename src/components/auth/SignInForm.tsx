import { useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { FormField, TextInput } from "../ui/FormField";

interface SignInFormProps {
  onSubmit: (email: string, password: string) => void;
}

export function SignInForm({ onSubmit }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required";
    if (!password) next.password = "Password is required";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    onSubmit(email.trim(), password);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormField label="Email" htmlFor="signin-email" required error={errors.email}>
        <TextInput
          id="signin-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
        />
      </FormField>

      <FormField label="Password" htmlFor="signin-password" required error={errors.password}>
        <TextInput
          id="signin-password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
        />
      </FormField>

      <button
        type="button"
        className="self-start text-sm font-medium text-burgundy hover:underline"
      >
        Forgot password?
      </button>

      <Button type="submit" fullWidth>
        Sign in
      </Button>
    </form>
  );
}
