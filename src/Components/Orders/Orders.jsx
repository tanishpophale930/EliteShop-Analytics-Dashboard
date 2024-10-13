import React, {useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect} from 'react-table'
import { Link } from 'react-router-dom'
import {format} from "date-fns"
import * as XLSX from 'xlsx';
import { RecentOrderData } from '../Dashboard/RecentOrderData'
import TableSearchButton from '../Buttons/TableSearchButton/TableSearchButton'
import ExportButton from '../Buttons/ExportButton/ExportButton'

let GlobalFilter = ({filter, setFilter}) => {
  return (
    <div>
      <TableSearchButton filter={filter} setFilter={setFilter}/>
    </div>
  )
}

let getOrderStatus = (status) => {
  switch(status) {
      case 'PLACED':
        return(
          <span className='w-32 capitalize text-center inline-block rounded-md border border-sky-600 bg-sky-100 text-sm px-2 py-1 text-sky-600 '>
               {status.replaceAll('_', ' ').toLowerCase()}
          </span>
        )
      
      case 'CONFIRMED':
        return(
          <span className='w-32 capitalize rounded-md text-center inline-block border border-orange-600 text-orange-600 bg-orange-100 text-sm px-2 py-1'>
               {status.replaceAll('_', ' ').toLowerCase()}
          </span>
        )


      case 'SHIPPED':
        return(
          <span className='w-32 capitalize rounded-md border border-teal-600 text-center inline-block text-teal-600 bg-teal-100 text-sm px-2 py-1'>
            {status.replaceAll('_', ' ').toLowerCase()}
          </span>
        )

      case 'OUT FOR Delivery':
        return(
          <span className='w-32 capitalize py-1 px-2 rounded-md border border-yellow-600 text-center inline-block text-xs text-yellow-600 bg-yellow-100'>
              {status.replaceAll('_', ' ').toLowerCase()}
          </span>
        )

      case 'DELIVERED':
        return(
          <span className='w-32 capitalize rounded-md text-center inline-block border border-green-600 text-green-600 bg-green-100 text-sm px-2 py-1'>
              {status.replaceAll('_', ' ').toLowerCase()}
          </span>
        )
      
      default:
        return(
          <span className='w-32 capitalize rounded-md border border-gray-600 text-center inline-block text-gray-600 bg-gray-100 text-sm px-2 py-1'>
              {status.replaceAll('_', ' ').toLowerCase()}
          </span>
        )
  }
}

const Checkbox = React.forwardRef(({ indeterminate, ...rest}, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <input 
      type="checkbox" ref={resolvedRef} {...rest} 
    />
  )
})


let COLUMNS = [
  {
    Header: 'Order ID',
    accessor: 'id',
    Cell: ({value}) => <Link to={`/order/${value}`} className='text-blue-400'>{value}</Link>,
  },
  {
    Header: 'Customer Name',
    accessor: 'name',
    Cell: ({ value }) => <Link to={`/customer/${value}`}>{value}</Link>,
  },
  {
    Header: 'Order Date',
    accessor: 'orderDate',
  },
  {
    Header: 'Order Total',
    accessor: 'orderTotal',
  },
  {
    Header: 'Shipping Address',
    accessor:'shippingAdress',
  },
  {
    Header: 'Order Status',
    accessor: 'orderStatus',
    Cell: ({ value }) => getOrderStatus(value), // Use the getOrderStatus function
  },
]


const Orders = () => {

  const columns = useMemo(()=> COLUMNS, [])
  const data = useMemo(()=> RecentOrderData, [])
   
  const tableInstance = useTable({
    columns,
    data,
  }, 
  useGlobalFilter, 
  useSortBy, 
  usePagination, 
  useRowSelect,
  (hooks) => {
    hooks.visibleColumns.push((columns) => {
      return [
        {
          id: 'selection',
          Header : ({getToggleAllRowsSelectedProps}) => (
            <Checkbox {...getToggleAllRowsSelectedProps()}/>
          ),
          Cell: ({row}) => (
            <Checkbox {...row.getToggleRowSelectedProps()}/>
            )
          },
          ...columns
      ]
    })
  }
  )

  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    page, 
    nextPage, 
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    selectedFlatRows,
    prepareRow, 
    state, 
    setGlobalFilter
  } = tableInstance

  const {globalFilter, pageIndex, pageSize} = state

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Transactions")
    XLSX.writeFile(wb, "TransactionsData.xlsx")
  }

  return (
    <div className='flex-1 border border-gray-200 bg-white rounded-sm'>

      <div className='flex items-center justify-between my-3 mx-3'>
        <p className='text-xl sm:text-3xl font-bold tracking-wide'>Orders Report</p>

        {/* Code for Exporting in Excel */}
        <div>
            <ExportButton exportToExcel={exportToExcel} />
        </div>
      </div>

      {/* Code for Show Entries */}
      <div className='flex flex-col sm:flex-row items-center justify-between mt-6 mb-5 mx-3'>
        <div className="flex items-center space-x-2">
          <span className="text-sm sm:text-md font-medium text-gray-700">Show</span>
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
            className="block w-14 p-1 text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {[10, 25, 50, 100, 500, 1000, 2000, 5000, 10000].map(pageSize => (
              <option className='font-medium' key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span className="text-sm sm:text-md text-gray-700">entries</span>
        </div>

        {/* Code for Table Search Button */}
        <div className='mt-4 sm:mt-0'>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>

      {/* Add responsive table container */}
      <div className='border border-gray-200 rounded-sm border-x my-3 mx-3 overflow-x-auto'>
        <table {...getTableProps()} className='w-full h-full text-gray-700 table-auto'>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className='font-bold'>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className='text-base md:text-lg font-bold px-2 py-2'>
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? '⬇️' : '⬆️') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className='text-sm sm:text-base px-2 py-2'>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className='flex flex-col sm:flex-row items-center justify-between'>
        <div className="flex items-center justify-end px-4 py-3 text-sm sm:text-base text-gray-700">
          <p>
            Showing{' '}
            <span className="font-bold">{pageIndex * pageSize + 1}</span>
            {' '}to{' '}
            <span className="font-bold">{Math.min((pageIndex + 1) * pageSize, data.length)}</span>
            {' '}of{' '}
            <span className="font-bold">{data.length}</span>{' '}entries
          </p>
        </div>

        <div className="flex justify-center sm:justify-end px-4 py-3">
          <button
            className="px-3 py-1 bg-gray-200 rounded mr-2 text-sm sm:text-base"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-2">
            {pageOptions.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => gotoPage(pageNumber)}
                className={`px-3 py-1 rounded text-sm sm:text-base ${pageIndex === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>

          <button className="px-3 py-1 bg-gray-200 rounded ml-2 text-sm sm:text-base" onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </div>
      </div>
   </div>

  )
}

export default Orders;
