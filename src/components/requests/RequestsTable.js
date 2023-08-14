import React from "react";
import moment from "moment";
import Table from "components/Table";
import "./RequestsTable.scss";

// dataField (key) props (value)
const columnConfig = {
    id: {
        children: "ID"
    },
	from: {
        children: "From"
    },
    createdAt: {
        children: "Created",
        dataFormat: cell =>
            cell && moment(cell).format("DD/MM/YYYY hh:mm A")
    },
    requestType: {
        children: "Request Type"
    }
};

const tableOptions = {
    hideSizePerPage: true,
    sizePerPage: 10
};

let gid = 0;

const columnOrder = ["ID", "Created", "Request Type"];

const RequestsTable = ({ transactions = [], ...props }) => {
    const unStyled = transactions
        .sort(
            (a, b) => columnOrder.indexOf(a.type) - columnOrder.indexOf(b.type)
        ) // Use set order when timestamps are equal
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort chronologically
        .sort((a, b) => b.groupID - a.groupID) // Sort by group reverse chronological order
        .map((t, id) => ({ id, ...t }));

    const data = unStyled.map((t, i) => {
        if (i !== 0 && t.groupID !== unStyled[i - 1].groupID) gid += 1;
        return { ...t, gid };
    });

    const formatRow = (row, i) => {
        return row.gid % 2 === 0 ? undefined : "transaction-table-row";
    };

    return (
        <Table
            data={data}
            columnConfig={columnConfig}
            options={tableOptions}
            trClassName={formatRow}
            striped={false}
            {...props}
        />
    );
};

export default RequestsTable;
