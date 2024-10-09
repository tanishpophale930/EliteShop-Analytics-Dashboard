import React from 'react'
import StatsGrid from './StatsGrid'
import TransactionsChart from './TransactionsChart'
import BuyerProfilePieChart from './BuyerProfilePieChart'
import RecentOrder from './RecentOrder'
import PopularProducts from './PopularProducts'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-4'>
        <StatsGrid />

        <div className='flex flex-col md:flex-row gap-3 justify-center w-full'>
          <TransactionsChart/>
          <BuyerProfilePieChart/>
        </div>

        <div className='flex flex-col md:flex-row gap-3 w-full'>
          <RecentOrder />
          <PopularProducts/>
        </div>
        

      
    </div>
  )
}

export default Dashboard