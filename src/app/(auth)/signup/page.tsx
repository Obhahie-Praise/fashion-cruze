import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialAuth } from "@/components/shared/social-auth";
import { Separator } from "@/components/ui/separator";

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-commissioner text-3xl font-semibold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to get started.
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
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Jane Doe"
              required
              className="h-11"
            />
          </div>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              className="h-11"
            />
          </div>
          <Button type="button" className="w-full h-11 text-base font-medium">
            Create Account
          </Button>
        </form>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-medium text-foreground hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
