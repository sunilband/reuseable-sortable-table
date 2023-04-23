import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "../../../logic/useSortableTable";


import React from 'react'

type Props = {
  caption:any,
  data:any, 
  columns:any,
  setRows:any,
  rows:any,
}

const Table = (props: Props) => {
  const [tableData, handleSorting] = useSortableTable(props.data, props.columns);
  return (
          <><h2 className="text-4xl">{props.caption}</h2>
            <table className="table">
              <TableHead {...{ columns:props.columns, handleSorting }} setRows={props.setRows} rows={props.rows} />
              <TableBody {...{ columns:props.columns, tableData }} />
            </table>
          </>
  )
}

export default Table


