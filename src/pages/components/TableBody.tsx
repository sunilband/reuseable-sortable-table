import React from "react";
import Image from "next/image";

type Props = {
  tableData: any;
  columns: any;
};

const TableBody = (props: Props) => {
  let address = "";
  return (
    <tbody>
      {props.tableData?props.tableData.map((data:any) => {
        return (
          <tr key={data.id}>
            {props.columns.map(({ accessor }:any) => {
              const tData = data[accessor] ? data[accessor] : "——";
              // if(accessor=="phone_price"){
              //   console.l
              // }
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      }):null}
    </tbody>
  );
};

export default TableBody;


