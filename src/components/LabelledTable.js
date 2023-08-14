import React from "react";
import { Table } from "react-bootstrap";

const LabelledTable = ({ columns, ...props }) => {
  // console.log(columns, "columns")
  return (
    <Table hover {...props}>
      <tbody>
        {columns.map(([label, value, config], i) => (
          <tr key={i} {...config?.trProps}>
            <td {...config?.labelProps}>{label}</td>
            <td className="text-right" {...config?.valueProps}>
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LabelledTable;
