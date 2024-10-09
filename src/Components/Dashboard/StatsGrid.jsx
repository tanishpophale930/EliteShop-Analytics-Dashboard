import React from 'react'
import { StatsGridData } from './StatsGridData'

const StatsGrid = () => {
  return (
    <div className='flex flex-col md:flex-row gap-5 my-4 w-full'>
        {
          StatsGridData.map((ele, index) => {
            return(
              <div className="flex flex-1 items-center gap-4 border bg-white h-20 py-4 pl-4 rounded-md">
                <div className={`rounded-full text-2xl h-12 w-12 flex items-center justify-center ${ele.statsImageBackColor}`}>
                    {ele.statsImage}
                </div>

                <div className='flex flex-col'>
                  <div>
                    <p className='text-sm text-gray-400'>{ele.statsName}</p>
                  </div>
                  <div className='flex gap-3 items-center'>
                    <p className='text-xl font-medium'>{ele.statsValueDollar}</p>
                    <p className={`${ele.statsValuecolor} text-sm`}>{ele.statsValue}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
    </div>
  )
}

export default StatsGrid