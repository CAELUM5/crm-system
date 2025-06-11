"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { loginUser, clearError } from "@/lib/features/auth/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Info } from "lucide-react"
import { LoginTester } from "@/components/login-tester"
import { ApiStatus } from "@/components/api-status"
import { UserFetcher } from "@/components/user-fetcher"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      return
    }

    dispatch(loginUser({ username, password }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Login Form */}
          <div className="lg:col-span-1">
            <Card className="w-full">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Sign in to CRM</CardTitle>
                <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading || !username || !password}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>

                {/* Mock Credentials */}
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Info className="h-4 w-4 text-green-600 mr-2" />
                    <p className="text-sm text-green-800 font-medium">Working Demo Credentials:</p>
                  </div>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left border-green-300 hover:bg-green-50"
                      onClick={() => {
                        setUsername("admin")
                        setPassword("admin123")
                      }}
                    >
                      <div className="text-left">
                        <div className="font-medium text-green-700">👤 admin / admin123</div>
                        <div className="text-xs text-green-600">Administrator Account</div>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left border-green-300 hover:bg-green-50"
                      onClick={() => {
                        setUsername("demo")
                        setPassword("demo123")
                      }}
                    >
                      <div className="text-left">
                        <div className="font-medium text-green-700">👤 demo / demo123</div>
                        <div className="text-xs text-green-600">Demo Account</div>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left border-green-300 hover:bg-green-50"
                      onClick={() => {
                        setUsername("test")
                        setPassword("test123")
                      }}
                    >
                      <div className="text-left">
                        <div className="font-medium text-green-700">👤 test / test123</div>
                        <div className="text-xs text-green-600">Test Account</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Debug Tools */}
          <div className="lg:col-span-2 space-y-4">
            <ApiStatus />
            <LoginTester />
            <UserFetcher />
          </div>
        </div>
      </div>
    </div>
  )
}
