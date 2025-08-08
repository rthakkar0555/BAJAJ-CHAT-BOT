'use client'

import { Wifi, WifiOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface NetworkStatusProps {
  isOnline: boolean
  isLoading: boolean
}

export function NetworkStatus({ isOnline, isLoading }: NetworkStatusProps) {
  if (isLoading) {
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2" />
        API Call in Progress...
      </Badge>
    )
  }

  return (
    <Badge 
      variant="outline" 
      className={isOnline ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}
    >
      {isOnline ? (
        <>
          <Wifi className="w-3 h-3 mr-1" />
          Connected
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3 mr-1" />
          Offline
        </>
      )}
    </Badge>
  )
}
