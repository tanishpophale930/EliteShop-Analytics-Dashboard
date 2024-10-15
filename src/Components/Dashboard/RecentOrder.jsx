import React from 'react'
import {Link} from "react-router-dom"
import { RecentOrderData } from './RecentOrderData'

let getOrderStatus = (status) => {
    switch(status) {
        case 'PLACED':
          return(
            <span className='w-28 inline-block text-center capitalize rounded-md border border-sky-600 bg-sky-100 text-sm px-2 py-1 text-sky-600 '>
                 {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )
        case 'CONFIRMED':
          return(
            <span className='w-28 inline-block text-center capitalize rounded-md border border-orange-600 text-orange-600 bg-orange-100 text-sm px-2 py-1'>
                 {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )
        case 'SHIPPED':
          return(
            <span className='w-28 inline-block text-center capitalize rounded-md border border-teal-600 text-teal-600 bg-teal-100 text-sm px-2 py-1'>
              {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )
        case 'OUT FOR DELIVERY':
          return(
            <span className='w-28 inline-block text-center capitalize py-1 px-2 rounded-md text-xs border border-yellow-600 text-yellow-600 bg-yellow-100'>
                {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )
        case 'DELIVERED':
          return(
            <span className='w-28 inline-block text-center capitalize rounded-md border border-gray-600 text-green-600 bg-green-100 text-sm px-2 py-1'>
                {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )
        default:
          return(
            <span className='w-28 inline-block text-center capitalize rounded-md border border-gray-600 text-gray-600 bg-gray-100 text-sm px-2 py-1'>
                {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )
    }
}

const RecentOrder = () => {
  const firstFiveOrders = RecentOrderData.slice(0, 5);

  return (
    <div className='flex-1 border border-gray-200 bg-white mt-4 rounded-sm'>
      <h3 className='text-center mt-4 text-gray-800 text-lg font-bold px-4 tracking-wide'>Recent Orders</h3>

      {/* Make the table scrollable on small screens */}
      <div className='border border-gray-200 rounded-sm border-x my-3 mx-3 overflow-x-auto'>
        <table className='w-full h-full text-gray-700 min-w-[600px] sm:min-w-full'>
          <thead className='font-semibold'>
            <tr>
              <th className='text-sm sm:text-base'>Order ID</th>
              <th className='text-sm sm:text-base'>Customer Name</th>
              <th className='text-sm sm:text-base'>Order Date</th>
              <th className='text-sm sm:text-base'>Order Total</th>
              <th className='text-sm sm:text-base'>Shipping Address</th>
              <th className='text-sm sm:text-base'>Order Status</th>
            </tr>
          </thead>

          <tbody>
            {firstFiveOrders.map((ele, index) => {
              return (
                <tr key={index} className='text-sm sm:text-base'>
                  <td><Link to={`/order/${ele.id}`}>{ele.id}</Link></td>
                  <td><Link to="">{ele.name}</Link></td>
                  <td>{ele.orderDate}</td>
                  <td className='font-semibold '>{ele.orderTotal}</td>
                  <td>{ele.shippingAdress}</td>
                  <td>{getOrderStatus(ele.orderStatus)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrder
