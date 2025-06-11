"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginTester() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const testCredentials = async (username: string, password: string) => {
    setLoading(true)
    setError("")
    setResult(null)

    try {
      console.log(`Testing: ${username} / ${password}`)

      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        console.log("✅ Login successful:", data)
      } else {
        setError(`❌ ${data.message || "Login failed"}`)
        console.log("❌ Login failed:", data)
      }
    } catch (err) {
      setError(`❌ Network error: ${err}`)
      console.error("❌ Network error:", err)
    }

    setLoading(false)
  }

  const testUsers = [
    { username: "kminchelle", password: "0lelplR" },
    { username: "atuny0", password: "9uQFF1Lh" },
    { username: "hbingley1", password: "CQutx25i8r" },
    { username: "rshawe2", password: "OWsTbMUgFc" },
  ]

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>🧪 API Login Tester</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {testUsers.map((user) => (
            <Button
              key={user.username}
              onClick={() => testCredentials(user.username, user.password)}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              Test {user.username}
            </Button>
          ))}
        </div>

        {loading && <div className="text-center">Testing...</div>}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Alert>
            <AlertDescription>
              ✅ Success! User: {result.firstName} {result.lastName} ({result.username})
            </AlertDescription>
          </Alert>
        )}

        {result && (
          <pre className="p-4 bg-gray-100 rounded text-xs overflow-auto max-h-40">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  )
}
