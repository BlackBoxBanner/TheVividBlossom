import {HTMLProps, useEffect, useMemo, useRef, useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {ProductTable} from "@/components/admin/product/makeData";

export function getColumesProducts(props: ProductTable[]) {

  function getTotalPrice() {
    let total = 0
    props.map(product => {
      total += product.selling_price
    })
    return total
  }

  const columesProducts: ColumnDef<ProductTable>[] = [
    {
      id: 'select',
      header: ({table}) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({row}) => (
        <div>
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "title",
      header: "FLOWER NAME",
    },
    {
      accessorKey: "Flower_Color",
      header: "COLOR",
    },
    {
      accessorKey: "Flower_Type",
      header: "FLOWER TYPE",
    },
    {
      accessorKey: "Seasonal_Information",
      header: "BLOOMING SEASON",
    },
    {
      accessorKey: "selling_price",
      header: "PRICE",
      footer: String(getTotalPrice())
    },
    {
      accessorKey: "inventory",
      header: "INVENTORY",
    },
  ]
  return columesProducts
}

function IndeterminateCheckbox({
                                 indeterminate,
                                 className = '',
                                 ...rest
                               }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}