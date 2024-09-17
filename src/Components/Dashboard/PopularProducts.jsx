import React from 'react'
import {Link} from "react-router-dom"
import classNames from 'classnames'
import { PopularProductsData } from './PopularProductsData'

const PopularProducts = () => {
  return (
    <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200 mt-4">
			<p className="text-gray-700 font-medium text-center">Popular Products</p>
			<div className="mt-4 flex flex-col gap-3">
				{PopularProductsData.map((product) => (
					<Link
						key={product.productId}
						to={`/product/${product.productId}`}
						className="flex items-start hover:no-underline"
					>
						<div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
							<img
								className="w-full h-full object-cover rounded-sm"
								src={product.image}
							/>
						</div>
						<div className="ml-4 flex-1">
							<p className="text-sm text-gray-800">{product.productTitle}</p>
							<span
								className={classNames(
									product.StockNo === 0
										? 'text-red-500'
										: product.StockNo > 50
										? 'text-green-500'
										: 'text-orange-500',
									'text-xs font-medium'
								)}
							>
								{product.StockNo === 0 ? 'Out of Stock' : product.StockNo + ' in Stock'}
							</span>
						</div>
						<div className="text-xs text-gray-400 pl-1.5">{product.productprice}</div>
					</Link>
				))}
			</div>
		</div>
  )
}

export default PopularProducts