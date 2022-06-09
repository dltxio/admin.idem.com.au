import * as React from "react";
import { useNetwork } from "wagmi";

const NetworkSwitcher = () => {
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
    useNetwork();

  return (
    <div>
      {switchNetwork &&
        networkData.chains.map((x) =>
          x.id === networkData.chain?.id ? null : (
            <button
              className="btn"
              key={x.id}
              onClick={() => switchNetwork(x.id)}
            >
              Switch to {x.name}
            </button>
          )
        )}

      {switchNetworkError && switchNetworkError?.message}
    </div>
  );
};

export default NetworkSwitcher;
