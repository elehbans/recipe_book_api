import React, { useEffect, useState } from 'react'
import { useTable } from 'react-table'

import API from '../../../utils/api'
import { Recipe } from '../../../types/custom'

interface TableWrapperProps {
  updateRecipesCallback: () => Promise<void>
  updateSelectedRecipeCallback: (id: string) => void
  recipes: Recipe[]
}

function TableWrapper ({ updateRecipesCallback, updateSelectedRecipeCallback, recipes }: TableWrapperProps) {
  const formatData = (recipes: Recipe[]): ReadonlyArray<{ [x: string]: {} }> => {
    const results = new Array<{}>()
    if (recipes !== undefined) {
      recipes.forEach(v => {
        results.push({
          id: v.id,
          name: v.name,
          description: v.description,
          instructions: v.instructions,
          ingredients: v.ingredients
        })
      })
    }
    return (results)
  }

  const [data, setData] = useState(formatData(recipes))

  useEffect(() => {
    setData(formatData(recipes))
  }, [recipes])

  const handleEdit = (recipeId: string) => {
    console.log(recipeId)
    updateSelectedRecipeCallback(recipeId)
  }

  const handleDelete = async (recipe: Recipe) => {
    await API.delete_recipe(recipe)
    updateRecipesCallback()
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name' // accessor is the "key" in the data
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        Cell: ({ value, row }: any) => (
              <div>
                <button onClick={() => handleEdit(row.original.id)}>Edit</button>
              </div>
        )
      },
      {
        Header: 'Delete',
        accessor: 'delete',
        Cell: ({ value, row }: any) => (
              <div>
                <button onClick={async () => await handleDelete(row.original)}>Delete</button>
              </div>
        )
      }
    ],
    []
  )

  const tableInstance = useTable({ columns, data })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance

  return (
        <table {...getTableProps()}>
              <thead>
                {// Loop over the header rows
                headerGroups.map(headerGroup => (
                  // Apply the header row props
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {// Loop over the headers in each row
                    headerGroup.headers.map(column => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {// Render the header
                        column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {/* Apply the table body props */}
              <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                rows.map(row => {
                  // Prepare the row for display
                  prepareRow(row)
                  return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                      {// Loop over the rows cells
                      row.cells.map(cell => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {// Render the cell contents
                            cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
  )
}

export default TableWrapper
