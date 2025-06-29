"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/components/auth-guard"
import { useAuthStore } from "@/lib/auth-store"
import { useRouter } from "next/navigation"
import { LogOut, User, BadgeIcon as IdCard } from "lucide-react"

export default function DashboardPage() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
 
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>

 
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Welcome Card */}
            <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome back, {user?.name || "User"}!</CardTitle>
                <CardDescription className="text-purple-100">{"Here's your dashboard overview"}</CardDescription>
              </CardHeader>
            </Card>

          
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Information</CardTitle>
                <User className="h-4 w-4 ml-auto text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <IdCard className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">User ID</p>
                      <p className="font-mono text-sm">{user?.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium">{user?.name}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

       
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Session Status</CardTitle>
                <div className="h-2 w-2 bg-green-500 rounded-full ml-auto"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Active</div>
                <p className="text-xs text-gray-500">Logged in successfully</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Account Type</CardTitle>
                <div className="h-2 w-2 bg-purple-500 rounded-full ml-auto"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">Employee</div>
                <p className="text-xs text-gray-500">Full access granted</p>
              </CardContent>
            </Card>
          </div>

   
          <div className="mt-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <User className="h-6 w-6" />
                    Profile
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <IdCard className="h-6 w-6" />
                    Settings
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <LogOut className="h-6 w-6" />
                    Security
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 bg-transparent"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-6 w-6" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
