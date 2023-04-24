import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "../../../logic/useSortableTable";

import React from "react";

type Props = {
  caption: any;
  data: any;
  columns: any;
  setRows: any;
  rows: any;
};

const Table = (props: Props) => {
  const [tableData, handleSorting] = useSortableTable(
    props.data?props.data:[],
    props.columns?props.columns:[]
  );
  return (
    <div className="flex flex-col ">
      <h2 className="text-4xl text-center mt-4 mb-4">{props.caption}</h2>
      <table className="table self-center" >
        <TableHead
          {...{ columns: props.columns, handleSorting }}
          setRows={props.setRows}
          rows={props.rows}
        />
        <TableBody {...{ columns: props.columns, tableData }} />
      </table>
    </div>
  );
};

export default Table;
