import React from "react";
import LabelledTable from "components/LabelledTable";

const flattenData = data => {
    return {
        name: data?.name,
        email: data?.email,
        tagLine: data?.tagLine,
        description: data?.description
    };
};

const getColumns = data => {
    const map = {
        name: {
            label: "Name",
            format: v => v
        },
        email: {
            label: "Email",
            format: v => v
        },
        tagLine: {
            label: "Tag Line",
            format: v => v
        },
        description: {
            label: "Description",
            format: v => v
        }
    };

    return Object.keys(data).map(key => {
        return [map[key].label, map[key].format(data[key])];
    });
};

const AccountDetails = ({ details = {} }) => {
    const data = flattenData(details);
    const columns = getColumns(data);

    return <LabelledTable columns={columns} hover={false} />;
};

export default AccountDetails;
