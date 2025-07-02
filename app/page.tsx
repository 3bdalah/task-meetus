"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
  const [showImages, setShowImages] = useState(false);

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
      <div className="relative  h-screen  bg-[#E3E1F3] overflow-hidden flex  ">
        <div className="absolute top-0 left-40 w-[300px] h-[300px] bg-[#9E77F6] opacity-30 blur-[100px] rounded-full "></div>

        {/* Top Right */}
        <div className="absolute top-[-200px] right-60 w-[500px] h-[500px] bg-[#E477F6] opacity-80 blur-[150px] rounded-full"></div>

        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#B0D2E5] opacity-30 blur-[200px] rounded-full "></div>

        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#9E77F6] opacity-80 blur-[100px] rounded-full"></div>

        <div className="w-full bg-transparent border-0 relative grid lg:grid-cols-12 gap-1 items-center z-20 ">
          <div className="flex justify-center items-center m-auto border-0  bg-transparent lg:col-span-5 w-[554px]">
            <Card className="w-full max-w-md  border-0 bg-transparent shadow-transparent ">
              <CardHeader className="space-y-1 text-center border-0 ">
                <CardTitle className="text-[50px]  leading-[100%] text-[#1A1A1E] tracking-[0%] font-normal text-center ">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-[#62626B] text-[18px]">
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
                      {/* <Mail className="" /> */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-4 h-[24px] w-[24px] "
                      >
                        <path
                          d="M17 21.25H7C3.35 21.25 1.25 19.15 1.25 15.5V8.5C1.25 4.85 3.35 2.75 7 2.75H17C20.65 2.75 22.75 4.85 22.75 8.5V15.5C22.75 19.15 20.65 21.25 17 21.25ZM7 4.25C4.14 4.25 2.75 5.64 2.75 8.5V15.5C2.75 18.36 4.14 19.75 7 19.75H17C19.86 19.75 21.25 18.36 21.25 15.5V8.5C21.25 5.64 19.86 4.25 17 4.25H7Z"
                          fill="#1A1A1E"
                        />
                        <path
                          d="M11.9998 12.87C11.1598 12.87 10.3098 12.61 9.65978 12.08L6.52978 9.57997C6.20978 9.31997 6.14978 8.84997 6.40978 8.52997C6.66978 8.20997 7.13978 8.14997 7.45978 8.40997L10.5898 10.91C11.3498 11.52 12.6398 11.52 13.3998 10.91L16.5298 8.40997C16.8498 8.14997 17.3298 8.19997 17.5798 8.52997C17.8398 8.84997 17.7898 9.32997 17.4598 9.57997L14.3298 12.08C13.6898 12.61 12.8398 12.87 11.9998 12.87Z"
                          fill="#1A1A1E"
                        />
                      </svg>

                      {/* <Image className="absolute left-3 top-3 h-4 w-4 text-gray-400" src="/images/mail.jpg" alt="test" width={4} height={4}/> */}
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`pl-10 border-2 w-[381px] h-[57px] border-white  bg-white bg-opacity-40 ${
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
                    <div className="relative ">
                      {/* <Lock  /> */}
                      <svg
                        width="24"
                        // className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3 top-4 h-[24px] w-[24px]"
                      >
                        <path
                          d="M18 10.75C17.59 10.75 17.25 10.41 17.25 10V8C17.25 4.85 16.36 2.75 12 2.75C7.64 2.75 6.75 4.85 6.75 8V10C6.75 10.41 6.41 10.75 6 10.75C5.59 10.75 5.25 10.41 5.25 10V8C5.25 5.1 5.95 1.25 12 1.25C18.05 1.25 18.75 5.1 18.75 8V10C18.75 10.41 18.41 10.75 18 10.75Z"
                          fill="#1A1A1E"
                        />
                        <path
                          d="M12 19.25C10.21 19.25 8.75 17.79 8.75 16C8.75 14.21 10.21 12.75 12 12.75C13.79 12.75 15.25 14.21 15.25 16C15.25 17.79 13.79 19.25 12 19.25ZM12 14.25C11.04 14.25 10.25 15.04 10.25 16C10.25 16.96 11.04 17.75 12 17.75C12.96 17.75 13.75 16.96 13.75 16C13.75 15.04 12.96 14.25 12 14.25Z"
                          fill="#1A1A1E"
                        />
                        <path
                          d="M17 22.75H7C2.59 22.75 1.25 21.41 1.25 17V15C1.25 10.59 2.59 9.25 7 9.25H17C21.41 9.25 22.75 10.59 22.75 15V17C22.75 21.41 21.41 22.75 17 22.75ZM7 10.75C3.42 10.75 2.75 11.43 2.75 15V17C2.75 20.57 3.42 21.25 7 21.25H17C20.58 21.25 21.25 20.57 21.25 17V15C21.25 11.43 20.58 10.75 17 10.75H7Z"
                          fill="#1A1A1E"
                        />
                      </svg>

                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={`mt-[20px] pl-10 text-[16px] border-2 w-[381px] h-[57px] border-white  bg-white bg-opacity-40 pr-10 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-7 top-4  text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-[24px] w-[24px]" />
                        ) : (
                          <Eye className="h-[24px] w-[24px]" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="bg-[#9414FF] text-white font-medium py-2.5 w-[381px] h-[43px] rounded-[8px]"
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

          <div className="hidden   lg:flex lg:col-span-7 justify-center  w-full bg-black/[0.01] items-center min-h-[600px] relative">
            {/* <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/10"></div> */}
            <div className="relative w-full max-w-5xl min-h-[950px]">
              {/* Background Image */}
              <div className="flex items-center w-[844px] h-[623px]">
                 <Image
                  className="m-auto "
                  src="/images/abstract-shape2.png"
                  alt="Abstract 3D Shape"
                  width={1630}
                  height={1630}
                  onLoad={() => setBgLoaded(true)}
                  priority={false}
                  
                  loading="lazy"
                />
                
               
              </div>

              {/* Logo Overlay Image */}
              <div className="absolute bottom-44 left-44 ">
                <Image
                  src="/images/logo2.png"
                  alt="Logo"
                  width={450}
                  height={400}
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
