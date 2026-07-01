import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialAuth } from "@/components/shared/social-auth";
import { Separator } from "@/components/ui/separator";

export default function SignInPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-commissioner text-3xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue.
        </p>
      </div>

      <div className="space-y-6">
        <SocialAuth />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              className="h-11"
            />
          </div>
          <Button type="button" className="w-full h-11 text-base font-medium">
            Sign In
          </Button>
        </form>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-foreground hover:underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
