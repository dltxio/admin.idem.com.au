import * as React from "react";
import { useAccount } from "wagmi";

const Account = () => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true
  });

  if (!accountData) return <div>No account connected</div>;

  return (
    <div>
      <div>
        {accountData?.ens?.name ?? accountData?.address}
        {accountData?.ens ? ` (${accountData?.address})` : null}
      </div>

      {accountData?.ens?.avatar && (
        <img src={accountData.ens.avatar} style={{ height: 40, width: 40 }} />
      )}
    </div>
  );
};
export default Account;
