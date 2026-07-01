"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialAuth } from "@/components/shared/social-auth";
import { Separator } from "@/components/ui/separator";
import { PasswordInput } from "@/components/ui/password-input";
import { signInSchema, SignInValues } from "@/validations/auth";
import { signIn, authClient } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: SignInValues) => {
    setIsLoading(true);
    try {
      const { data, error } = await signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message || "Invalid credentials.");
      } else {
        toast.success("Welcome back!");
        // Redirect based on role
        if (data?.user?.role === "admin") {
          router.push("/dashboard/overview");
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (_err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("Please enter your email address.");
      return;
    }
    
    setIsResetting(true);
    try {
      // @ts-expect-error - better-auth dynamically exposes forgetPassword
      const { error } = await authClient.forgetPassword({
        email: resetEmail,
        redirectTo: "/reset-password",
      });

      if (error) {
        toast.error(error.message || "Failed to send reset email.");
      } else {
        toast.success("Password reset email sent! Check your inbox.");
        setIsForgotModalOpen(false);
      }
    } catch (_err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsResetting(false);
    }
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="h-11"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              
              <Dialog open={isForgotModalOpen} onOpenChange={setIsForgotModalOpen}>
                <DialogTrigger render={<button type="button" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" />}>
                  Forgot password?
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reset your password</DialogTitle>
                    <DialogDescription>
                      Enter your email address and we will send you a link to reset your password.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleForgotPassword} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="name@example.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsForgotModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isResetting || !resetEmail}>
                        {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send reset email
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

            </div>
            <PasswordInput
              id="password"
              className="h-11"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full h-11 text-base font-medium"
            disabled={isLoading || !isValid}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
