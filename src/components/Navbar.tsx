import { useAccount, useBalance } from "wagmi";
import { shortenAddress } from "../utils/shortenAddress";
import { WalletModal, Loader } from "./";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  const [{ data: accountData, loading: accountLoading }, disconnect] =
    useAccount({
      fetchEns: false
    });

  const [{ data: balanceData }] = useBalance({
    addressOrName: accountData?.address
  });

  return (
    <>
      <div className="navigation-bar-container z-50 fixed top-0 w-full">
        <div className="navbar mb-2 shadow-lg bg-primary text-neutral-content">
          <div className="px-2 mx-2 navbar-start">
            <button className="flex-none lg:hidden btn btn-square btn-ghost">
              <div className="dropdown ">
                <div tabIndex={0} className="m-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="p-2 text-primary shadow menu dropdown-content bg-white w-52"
                >
                  <li>
                    <a className="btn btn-ghost btn-sm rounded-btn" href="/">
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="btn btn-ghost btn-sm rounded-btn"
                      href="/About"
                    >
                      ABOUT
                    </a>
                  </li>
                </ul>
              </div>
            </button>
            <img className="m-5 h-10 md:h-15" src={Logo} />
            <span className="text-lg font-sans">DLTx</span>

            <div className="hidden px-2 mx-2 navbar-start lg:flex">
              <div className="flex items-stretch">
                <a
                  className="btn btn-ghost btn-sm rounded-btn hover:btn-accent"
                  href="/"
                >
                  HOME
                </a>
                <a
                  className="btn btn-ghost btn-sm rounded-btn hover:btn-accent"
                  href="/About"
                >
                  ABOUT
                </a>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            {accountData?.address ? (
              <>
                {!accountLoading ? (
                  <div className="mx-2 hidden badge-neutral badge-lg rounded-full lg:block">
                    {Number(balanceData?.formatted).toFixed(4)}{" "}
                    {balanceData?.symbol}
                  </div>
                ) : (
                  <Loader />
                )}

                <div className="mx-2 hidden badge-neutral badge-lg rounded-full lg:block">
                  <div>
                    {accountData?.ens?.name ??
                      shortenAddress(accountData?.address)}
                    {accountData?.ens
                      ? ` (${shortenAddress(accountData?.address)})`
                      : null}
                  </div>

                  {accountData?.ens?.avatar && (
                    <img
                      src={accountData.ens.avatar}
                      style={{ height: 40, width: 40 }}
                    />
                  )}
                </div>
                <div>
                  <div>
                    <button
                      className="btn btn-accent font-sans2 hover:bg-base-100 hover:text-accent"
                      onClick={() => disconnect()}
                    >
                      DISCONNECT
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <label
                htmlFor="connect-wallet-modal"
                className="btn btn-accent modal-button font-sans2 hover:bg-base-100 hover:text-accent"
              >
                CONNECT
              </label>
            )}
          </div>
        </div>

        <WalletModal />
      </div>
    </>
  );
};

export default Navbar;
