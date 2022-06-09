import { useAccount, useBalance, useNetwork } from "wagmi";

const useWagmi = () => {
  const [{ data: networkData, error: switchNetworkError }] = useNetwork();

  const [{ data: accountData, error: accountError, loading: accountLoading }] =
    useAccount({
      fetchEns: false
    });

  const [{ data: balanceData, error: balanceError, loading: balanceLoading }] =
    useBalance({
      addressOrName: accountData?.address
    });

  return {
    networkData,
    switchNetworkError,

    accountData,
    accountError,
    accountLoading,

    balanceData,
    balanceError,
    balanceLoading
  };
};
export default useWagmi;
