"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthGuard } from "@/components/auth-guard";
import { useAuthStore } from "@/lib/auth-store";
import { authApi } from "@/lib/api";
import { validateLoginForm, type ValidationErrors } from "@/lib/validation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();
  const router = useRouter();

  const handleInputChange = (field: "email" | "password", value: string) => {
    if (field === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      const loginResponse = await authApi.login({
        email,
        password,
        isEmployee: true,
      });

      const userInfo = await authApi.getUserInfo(loginResponse.token);

      login(loginResponse.token, userInfo);
      router.push("/dashboard");
    } catch (error: any) {
      setApiError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && password && !errors.email && !errors.password;
  const [bgLoaded, setBgLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const allLoaded = bgLoaded && logoLoaded;
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center p-4  bg-[radial-gradient(at_top_left,_#e3d9f9,_#fbe5ff,_#c5b1f5,_#B0D2E5)]">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center bg-transparent">
          <div className="flex justify-center bg-transparent">
            <Card className="w-full max-w-md  border-0 bg-transparent ">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-[56px] font-light text-black">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-gray-600 ]">
                  Step into our shopping metaverse for an unforgettable shopping
                  experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {apiError && (
                    <Alert variant="destructive">
                      <AlertDescription>{apiError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`pl-10 bg-white bg-opacity-40 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={`pl-10  bg-white bg-opacity-40 pr-10 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full  bg-[#9414FF] text-white font-medium py-2.5"
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Logging in...
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                  <p className="inline-block mr-1">Don't have an account ? </p>
                  <Link href="http://localhost:3000/"> Sign Up</Link>
                </div>
                {/* <div className="mt-2 text-center text-sm text-gray-600">
                  
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">
                    dev.aert@gmail.com / helloworld
                  </p>
                </div> */}
              </CardContent>
            </Card>
          </div>

          <div className="hidden lg:flex justify-center items-center min-h-[600px] relative">
           

            <div className="relative w-full max-w-3xl min-h-[600px]">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/abstract-shape.png"
                  alt="Abstract 3D Shape"
                  fill
                  className="object-contain"
                  onLoad={() => setBgLoaded(true)}
                  priority
                />
              </div>

              {/* Logo Overlay Image */}
              <div className="absolute bottom-40 left-1/4">
                <Image
                  src="/images/logo2.png"
                  alt="Logo"
                  width={250}
                  height={200}
                  className="object-contain"
                  loading="lazy"
                  onLoad={() => setLogoLoaded(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
