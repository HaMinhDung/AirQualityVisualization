"use client"

import { useEffect, useState } from "react"

// Simple Card component
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
)

export default function TimeSeriesPage() {
  const [graphs, setGraphs] = useState({
    pm25: '',
    temperature: '',
    humidity: ''
  })

  // Function to fetch and update a single graph
  const fetchGraph = async (type: string) => {
    try {
      // Create a unique timestamp to prevent caching
      const timestamp = new Date().getTime()
      const response = await fetch(`http://localhost:5000/graphs/${type}?t=${timestamp}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} graph`)
      }

      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      
      setGraphs(prev => ({
        ...prev,
        [type]: imageUrl
      }))
    } catch (error) {
      console.error(`Error fetching ${type} graph:`, error)
    }
  }

  // Function to fetch all graphs
  const fetchAllGraphs = () => {
    fetchGraph('pm25')
    fetchGraph('temperature')
    fetchGraph('humidity')
  }

  // Initial fetch and setup interval for periodic updates
  useEffect(() => {
    fetchAllGraphs()

    // Update graphs every 5 minutes
    const interval = setInterval(fetchAllGraphs, 5 * 60 * 1000)

    return () => {
      clearInterval(interval)
      // Cleanup object URLs
      Object.values(graphs).forEach(url => {
        if (url) URL.revokeObjectURL(url)
      })
    }
  }, [])

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Time Series Analysis</h2>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* PM2.5 Graph */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">PM2.5 Levels</h3>
            {graphs.pm25 && (
              <img 
                src={graphs.pm25} 
                alt="PM2.5 Graph" 
                className="w-full h-auto"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            )}
          </Card>

          {/* Temperature Graph */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Temperature</h3>
            {graphs.temperature && (
              <img 
                src={graphs.temperature} 
                alt="Temperature Graph" 
                className="w-full h-auto"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            )}
          </Card>

          {/* Humidity Graph */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Humidity</h3>
            {graphs.humidity && (
              <img 
                src={graphs.humidity} 
                alt="Humidity Graph" 
                className="w-full h-auto"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}