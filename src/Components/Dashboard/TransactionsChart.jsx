import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TransactionsChartData } from './TransactionsChartData';

const TransactionsChart = () => {
  return (
    <div className='h-[50rem]  md:h-[23rem] flex flex-col flex-1 gap-3 py-4 bg-white border border-gray-200 rounded-sm'>
        <p className="text-gray-800  text-xl font-bold px-4 tracking-wide text-center font-roboto">Transactions</p>
        <div className='px-0 md:px-2 lg:px-3 w-full flex-1 text-xs md:text-xs lg:text-sm'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                  data={TransactionsChartData}
                  margin={{
                      top: 20,
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
