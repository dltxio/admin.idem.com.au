import React, { useContext } from "react";
import LabelledTable from "components/LabelledTable";
import { AuthContext } from "components/auth/Auth";

export default function PreviousTable({
  bankDetails
}) {
  const { user } = useContext(AuthContext);
  // const ref = "REF 123";

  const columnConfig = [
    ["Current Invoice", bankDetails?.name],
    ["Last", bankDetails?.account],
    ["#2", bankDetails?.bsb],
    ["#3", bankDetails?.ref]
  ];
  return <LabelledTable hover={false} columns={columnConfig} />;
}
