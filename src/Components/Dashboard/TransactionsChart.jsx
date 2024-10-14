import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TransactionsChartData } from './TransactionsChartData';

const TransactionsChart = () => {
  return (
    <div className='h-[23rem] md:h-[20rem] sm:h-[15rem] flex flex-col flex-1 gap-3 py-4 bg-white border border-gray-200 rounded-sm'>
        <p className="text-gray-800 text-xl font-bold px-4 tracking-wide text-center font-roboto">Transactions</p>
        <div className='px-3 w-full flex-1 text-sm'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                  data={TransactionsChartData}
                  margin={{
                      top: 10,
                      right: 10,
                      left: -10,
                      bottom: 0
                  }}
                  >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Income" fill="#0ea5e9" />
                  <Bar dataKey="Expense" fill="#ea580c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
    </div>
  )
}

export default TransactionsChart
