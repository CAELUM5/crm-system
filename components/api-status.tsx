"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ApiStatus() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking")
  const [responseTime, setResponseTime] = useState<number>(0)

  useEffect(() => {
    const checkApi = async () => {
      const startTime = Date.now()
      try {
        const response = await fetch("https://dummyjson.com/test", {
          method: "GET",
        })
        const endTime = Date.now()
        setResponseTime(endTime - startTime)

        if (response.ok) {
          setStatus("online")
        } else {
          setStatus("offline")
        }
      } catch (error) {
        setStatus("offline")
        console.error("API check failed:", error)
      }
    }

    checkApi()
  }, [])

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm">API Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Badge variant={status === "online" ? "default" : status === "offline" ? "destructive" : "secondary"}>
            {status === "checking" ? "Checking..." : status === "online" ? "Online" : "Offline"}
          </Badge>
          {status === "online" && <span className="text-xs text-gray-500">{responseTime}ms</span>}
        </div>
      </CardContent>
    </Card>
  )
}
