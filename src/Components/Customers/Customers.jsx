import React, {useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect} from 'react-table'
import { Link } from 'react-router-dom'
import {format} from "date-fns"
import { customerData } from './CustomersData'
import TableSearchButton from '../Buttons/TableSearchButton/TableSearchButton'
import ExportButton from '../Buttons/ExportButton/ExportButton'


let GlobalFilter = ({filter, setFilter}) => {
  return (
    <div>
      <TableSearchButton/>
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
    <input 
      type="checkbox" ref={resolvedRef} {...rest} 
    />
  )
})


let COLUMNS = [
  {
    Header: 'Cust ID',
    accessor: 'id',
    Cell: ({value}) => <Link to={`/customerId/${value}`} className='text-blue-400'>{value}</Link>,
  },
  {
    Header: 'Customer Name',
    accessor: 'name',
    Cell: ({ value }) => <Link to={`/customerName/${value}`} className='text-blue-400'>{value}</Link>,
  },
  {
    Header: 'Customer Email',
    accessor: 'email',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Mobile No',
    accessor: 'phone_no',
  },
  {
    Header: 'Shipping Address',
    accessor:'shipping_address',
  },
]


const Customers = () => {

  const columns = useMemo(()=> COLUMNS, [])
  const data = useMemo(()=> customerData, [])
   
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
    prepareRow, 
    selectedFlatRows,
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
        <p className='text-3xl font-bold tracking-wide'>Customers Report</p>

        {/* Code for Exporting in Excel  */}
        <div>
            <ExportButton  exportToExcel={exportToExcel}/>
        </div>
      </div>
      
      {/* Code for Show Entries  */}
      <div className='flex items-center justify-between mt-6 mb-5 mx-3'>
        <div className="flex items-center space-x-2">
          <span className="text-md font-medium text-gray-700">Show</span>
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
          <span className="text-md text-gray-700">entries</span>
        </div>

        {/* Code for Table Search Button  */}
        <div>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        </div>
      </div>


      <div className='border border-gray-200 rounded-sm border-x my-3 mx-3'>
        <table {...getTableProps()} className='w-full h-full text-gray-700 table-auto'> 
          <thead>
            {
              headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className='font-bold'>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className='text-base font-bold'>
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
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <div className='flex items-center justify-between'>
        <div className="flex items-center justify-end px-4 py-3 text-gray-700">
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
        
        <div className="flex px-4 py-3">
          <button
            className="px-3 py-1 bg-gray-200 rounded mr-2"
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
                className={`px-3 py-1 rounded ${pageIndex === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>

          <button className="px-3 ml-2 py-1 bg-gray-200 rounded" onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>

        </div>
        </div>
    </div>
  )
}

export default Customers