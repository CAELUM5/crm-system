"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UserFetcher() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://dummyjson.com/users?limit=10")
      const data = await response.json()
      setUsers(data.users || [])
      console.log("Available users:", data.users)
    } catch (error) {
      console.error("Failed to fetch users:", error)
    }
    setLoading(false)
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>👥 Available Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={fetchUsers} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Real Users"}
        </Button>

        {users.length > 0 && (
          <div className="mt-4 space-y-2 max-h-60 overflow-auto">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="p-2 bg-gray-50 rounded text-xs">
                <div>
                  <strong>Username:</strong> {user.username}
                </div>
                <div>
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
