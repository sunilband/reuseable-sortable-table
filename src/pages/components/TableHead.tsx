import { useState } from "react";

import React from "react";

type Props = {
  columns: any;
  handleSorting: any;
  setRows:any,
  rows:any
};

const TableHead = (props: Props) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor: any) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    props.handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      {/* <tr>
        <th colSpan={10}>Number Of Rows</th>

       
        <th>
        < select
      onChange={e => props.setRows(parseInt(e.target.value))}
      value={props.rows}
      className="browser-default custom-select" >
      
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
      
    </select >
        </th>
      </tr> */}
      <tr>
        {props.columns.map(({ label, accessor, sortable }: any) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? "up"
              : sortField === accessor && order === "desc"
              ? "down"
              : "default"
            : "";
          return (
            <th
              key={accessor}
              onClick={
                sortable ? () => handleSortingChange(accessor) : () => {}
              }
              className={cl}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
