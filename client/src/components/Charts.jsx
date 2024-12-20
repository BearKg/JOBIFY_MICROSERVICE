import React, { useEffect } from 'react'
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts'
import { useGlobalContext } from './context'

const Charts = ({ formatMonthlyApplication }) => {
  const { chart, handleChart } = useGlobalContext()
  const theme = localStorage.getItem('theme')
  const color = theme === 'light' ? '#00cfbd' : '#ffb86c'
  return (
    <div className="ml-14 flex flex-col w-fit items-center mb-8 mt-16">
      <h1 className="text-2xl font-medium">Monthly Applications</h1>
      <h2 className="text-xl text-accent cursor-pointer mb-8" onClick={handleChart}>
        {chart}
      </h2>
      {chart === "Area Chart" ? (
      <BarChart width={912} height={300} data={formatMonthlyApplication}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill={color} barSize={80} />
      </BarChart>
      ) : (
      <AreaChart width={912} height={300} data={formatMonthlyApplication}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="count"
          stroke={color}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
      )}
    </div>
  )
}

export default Charts
