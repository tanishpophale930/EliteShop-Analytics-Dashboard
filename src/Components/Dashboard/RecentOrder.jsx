import React from 'react'
import {Link} from "react-router-dom"
import { RecentOrderData } from './RecentOrderData'


let getOrderStatus = (status) => {
    switch(status) {
        case 'PLACED':
          return(
            <span className='capitalize rounded-sm border bg-sky-100 text-sm px-2 py-1 text-sky-600 '>
                 {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )
        
        case 'CONFIRMED':
          return(
            <span className='capitalize rounded-sm border text-orange-600 bg-orange-100 text-sm px-2 py-1'>
                 {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )


        case 'SHIPPED':
          return(
            <span className='capitalize rounded-sm border text-teal-600 bg-teal-100 text-sm px-2 py-1'>
              {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )

        case 'OUT FOR Delivery':
          return(
            <span className='capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100'>
                {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )

        case 'DELIVERED':
          return(
            <span className='capitalize rounded-sm border text-green-600 bg-green-100 text-sm px-2 py-1'>
                {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )
        
        default:
          return(
            <span className='capitalize rounded-sm border  text-gray-600 bg-gray-100 text-sm px-2 py-1'>
                {status.replaceAll('_', ' ').toLowerCase()}
            </span>
          )
    }
}


const RecentOrder = () => {
  return (
    <div className='flex-1 border border-gray-200 bg-white mt-4 rounded-sm'>
        <h3 className='text-gray-700 font-medium text-center mt-4'>Recent Orders</h3>
        <div className='border border-gray-200 rounded-sm border-x mt-4 ml-3'>
          <table className='w-full h-full text-gray-700'>
            <thead>
              <tr>
                  <td>ID</td>
                  <td>Product ID</td>
                  <td>Customer Name</td>
                  <td>Order Date</td>
                  <td>Order Total</td>
                  <td>Shiping Address</td>
                  <td>Order Status</td>
              </tr>  
            </thead>

            <tbody>
              {
                RecentOrderData.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <td><Link to={`/order/${ele.id}`}>{ele.id}</Link></td>
                      <td><Link to={`/product/${ele.product_id}`}>{ele.product_id}</Link></td>
                      <td><Link to="">{ele.name}</Link></td>
                      <td>{ele.orderDate}</td>
                      <td>{ele.orderTotal}</td>
                      <td>{ele.shippingAdress}</td>
                      <td>{getOrderStatus(ele.orderStatus)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default RecentOrder