"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  useEffect(() => {
    const val = sessionStorage.getItem("studioSocialLoading");
    if (val) setSocialLoading(val);
  }, []);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email address.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setLoading(true);
    try {
      const res = await authClient.signIn.email({ email, password });
      if (res.error) throw new Error(res.error.message || "Login failed");
      toast.success("Logged in successfully.");
      router.push(callbackUrl);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue your creative journey with StudioSpace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-9"
                />
              </div>
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-amber-500 hover:text-amber-600">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-amber-500 text-white hover:bg-amber-600">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full" disabled={!!socialLoading} onClick={async () => {
            if (socialLoading) return;
            setSocialLoading("google");
            sessionStorage.setItem("studioSocialLoading", "google");
            try {
              await authClient.signIn.social({ provider: "google", callbackURL: "/" });
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Something went wrong");
            } finally {
              setSocialLoading(null);
            }
          }}>
            {socialLoading === "google" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
            <span className="ml-2">{socialLoading === "google" ? "Connecting to Google..." : "Continue with Google"}</span>
          </Button>

          <Button variant="outline" type="button" className="w-full" disabled={!!socialLoading} onClick={async () => {
            if (socialLoading) return;
            setSocialLoading("github");
            sessionStorage.setItem("studioSocialLoading", "github");
            try {
              await authClient.signIn.social({ provider: "github", callbackURL: "/" });
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Something went wrong");
            } finally {
              setSocialLoading(null);
            }
          }}>
            {socialLoading === "github" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.27-.01-1-.02-1.96-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.72-1.34-1.72-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.21 1.84 1.21 1.07 1.8 2.8 1.28 3.49.98.11-.76.42-1.28.76-1.57-2.67-.29-5.47-1.31-5.47-5.85 0-1.29.47-2.35 1.24-3.18-.12-.3-.54-1.51.12-3.15 0 0 1.01-.32 3.3 1.2a11.5 11.5 0 0 1 6 0c2.29-1.52 3.3-1.2 3.3-1.2.66 1.64.24 2.85.12 3.15.77.83 1.24 1.89 1.24 3.18 0 4.55-2.81 5.56-5.49 5.84.43.36.82 1.08.82 2.18 0 1.57-.02 2.84-.02 3.23 0 .31.22.68.83.56A12.04 12.04 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" /></svg>}
            <span className="ml-2">{socialLoading === "github" ? "Connecting to GitHub..." : "Continue with GitHub"}</span>
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-amber-500 hover:text-amber-600">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}