import React from 'react'
import { PieChart, Pie, Sector, Cell, Legend } from 'recharts';
import {ResponsiveContainer} from 'recharts'
import { BuyerProfilePieChartData } from './BuyerProfilePieChartData';

const RADIAN = Math.PI / 180;

const COLORS = ['#00C49F', '#FFBB28', '#FF8042']

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const BuyerProfilePieChart = () => {
  return (
    <div className=' h-[23rem] flex flex-col gap-5 items-center border pt-4 bg-white border-gray-200'>
      <p className='text-gray-800 text-lg font-bold px-4 tracking-wide text-center'>Buyer Profile</p>
      <div className='text-sm font-semibold'>
          <PieChart width={300} height={300}>
            <Pie
              data={BuyerProfilePieChartData}
              cx="50%"
              cy="40%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {BuyerProfilePieChartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        
      </div>
    </div>
  )
}

export default BuyerProfilePieChart