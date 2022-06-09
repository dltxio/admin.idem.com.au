import { useConnect } from "wagmi";

import { MetaMaskIcon } from "../icons";
import { WalletConnectIcon } from "../icons";

const WalletModal = () => {
  const [
    {
      data: { connectors }
    },
    connect
  ] = useConnect();

  return (
    <>
      <input
        type="checkbox"
        id="connect-wallet-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box flex bg-white">
          <div className="w-full">
            <div className="flex justify-end">
              <label
                htmlFor="connect-wallet-modal"
                className="btn btn-outline btn-circle btn-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </label>
            </div>

            <div className="">
              <div className="text-center w-full">
                <div className="">
                  <label
                    className="flex justify-center cursor-pointer"
                    htmlFor="connect-wallet-modal"
                    onClick={() => connect(connectors[0])}
                  >
                    <MetaMaskIcon className="text-9xl transition-opacity duration-500 ease-out opacity-100 hover:opacity-40" />
                  </label>
                  <div className="font-bold">METAMASK</div>
                  <div>Connect using your browser.</div>
                  <div className="py-4 border-0 border-b border-solid"></div>

                  <label
                    className="flex justify-center cursor-pointer"
                    htmlFor="connect-wallet-modal"
                    onClick={() => connect(connectors[1])}
                  >
                    <WalletConnectIcon className="text-9xl transition-opacity duration-500 ease-out opacity-100 hover:opacity-40" />
                  </label>
                  <div className="font-bold">WALLET CONNECT</div>
                  <div className="pb-4">Connect using your mobile device.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletModal;
