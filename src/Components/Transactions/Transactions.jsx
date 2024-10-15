import React, {useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect} from 'react-table'
import { Link } from 'react-router-dom'
import { TransactionsData } from './TransactionsData'
import NextArrowButton from '../Buttons/NextArrowButton/NextArrowButton'
import ExportButton from '../Buttons/ExportButton/ExportButton'
import "../Buttons/CheckBox/CheckBox.css"
import * as XLSX from 'xlsx';
import TableSearchButton from '../Buttons/TableSearchButton/TableSearchButton'
import SearchButton from '../Buttons/SearchButton/SearchButton.jsx'



let GlobalFilter = ({filter, setFilter}) => {
  return (
    <div>
      <TableSearchButton filter={filter} setFilter={setFilter}/>
    </div>
  )
}


const Checkbox = React.forwardRef(({ indeterminate, ...rest}, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <>
    <input type='checkbox' ref={resolvedRef} {...rest}/>
    
    </>
  )
})


let paymentMode = (status) => {
  switch(status) {
      case 'Credit Card':
        return(
          <span className='w-32 inline-block capitalize rounded-md border border-sky-600 text-center bg-sky-100 text-sm px-2 py-1 text-sky-600 '>
               {status.replaceAll('_', ' ').toLowerCase()}
          </span>
        )
      
      case 'UPI':
        return(
          <span className='w-32 inline-block capitalize rounded-md border border-orange-600 text-center text-orange-600 bg-orange-100 text-sm px-2 py-1'>
               {status.replaceAll('_', ' ').toUpperCase()}
          </span>
        )


      case 'Debit Card':
        return(
          <span className='w-32 inline-block capitalize rounded-md border border-teal-600 text-center text-teal-600 bg-teal-100 text-sm px-2 py-1'>
            {status.replaceAll('_', ' ').toLowerCase()}
          </span>
        )

      case 'Cash':
        return(
          <span className='w-32 inline-block capitalize rounded-md border border-green-600 text-center text-green-600 bg-green-100 text-sm px-2 py-1'>
              {status.replaceAll('_', ' ').toLowerCase()}
          </span>
        )
      
      default:
        return(
          <span className='w-32 inline-block capitalize rounded-md border border-gray-600 text-center text-gray-600 bg-gray-100 text-sm px-2 py-1'>
              {status.replaceAll('_', ' ').toLowerCase()}
          </span>
        )
  }
}


let COLUMNS = [
  {
    Header: 'Payment ID',
    accessor: 'pay_id',
    Cell: ({value}) => <Link to={`/payment/${value}`} className='text-gray-700 hover:no-underline'>{value}</Link>,
  },
  {
    Header: 'Order ID',
    accessor: 'ord_id',
    Cell: ({ value }) => <Link to={`/order/${value}`} className='text-gray-700 hover:no-underline'>{value}</Link>,
  },
  {
    Header: 'Customer Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Mobile No',
    accessor: 'phone_no',
  },
  {
    Header: 'Payment Date',
    accessor:'payment_date',
  },
  {
    Header: "Total Amount",
    accessor: 'transaction_amount',
    Cell: ({ value }) => <p className='text-gray-700 font-semibold hover:no-underline'>{value}</p>,
  },
  {
    Header: 'Mode of Payment',
    accessor: 'mode_of_payment',
    Cell: ({ value }) => paymentMode(value),
  },
]



const Transactions = () => {

  const columns = useMemo(()=> COLUMNS, [])
  const data = useMemo(()=> TransactionsData, [])
   
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
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow, 
    selectedFlatRows,
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
    <div className='flex-1 border border-gray-200 bg-white rounded-md'>
      <div className='flex items-center justify-between my-3 mx-3'>
        <p className='text-xl sm:text-3xl font-bold tracking-wide'>Transactions Report</p>

        {/* Code for Exporting in Excel  */}
        <div>
            <ExportButton  exportToExcel={exportToExcel}/>
        </div>
      </div>


      {/* Code for Show Entries  */}
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
              {
                [10,25,50,100,500,1000,2000,5000, 10000].map(pageSize => (
                  <option className='font-medium' key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
              ))}
            </select>
          <span className="text-sm sm:text-md text-gray-700">entries</span>
        </div>

        {/* Code for Table Search Button  */}
        <div className='mt-4 sm:mt-0'>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        </div>
      </div>
      
      {/* Add responsive table container */}
      <div className='border border-gray-200 rounded-sm border-x my-3 mx-3 overflow-x-auto'>
        <table {...getTableProps()} className='w-full h-full text-gray-700 table-auto'> 
          <thead>
            {
              headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className='font-bold'>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className='text-base md:text-lg font-bold px-2 py-2'>
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? '⬇️': '⬆️'): ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {
              page.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                      return (
                        <td {...cell.getCellProps()} className='text-sm sm:text-base px-2 py-2'>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      
      
      {/* // Go to  Page functionality
      <span>
        | Go To Page :{' '}
        <input
          type='number'
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value  ? Number(e.target.value) -1: 0
            gotoPage(pageNumber)
          }}
          style={{width: '50px'}}
        />
      </span>
      */}

      {/* // Page 1 of 3 - Code
      <div className=''>
        <span className=''>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
      */}


      <div className='flex flex-col sm:flex-row items-center justify-between'>
        <div className="flex items-center justify-end px-4 py-3 text-sm sm:text-base text-gray-700">
          <p>
            Showing{' '}
            <span className="font-bold">
              {pageIndex * pageSize + 1}
            </span>
            {' '}
            to{' '}
            <span className="font-bold">
              {Math.min((pageIndex + 1) * pageSize, data.length)}
            </span>
            {' '}
            of{' '}
            <span className="font-bold">
              {data.length}
            </span>
            {' '}entries
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

export default Transactions