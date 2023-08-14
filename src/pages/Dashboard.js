import React, { useContext, useState, useRef } from "react";
import useSWR from "swr";
import Layout from "components/layout/Layout";
import RequestsTable from "components/requests/RequestsTable";
import CurrentInvoice from "components/invoice/CurrentInvoice";
import AccountDetails from "components/users/AccountDetails";
import ErrorMessage from "components/ErrorMessage";
import Loader from "components/Loader";
import { AuthContext } from "components/auth/Auth";
import UserDetailsForm from "../components/forms/UserDetailsForm";
import QRCode from "qrcode.react";

import Card from "components/Card";
import "./Dashboard.scss";

import { CSVLink } from "react-csv";
import { Alert, Button, Modal, Image } from "react-bootstrap";
import api from "../apis/api";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [year, setYear] = useState(new Date().getFullYear());
    const [transactionsDownload, setTransactionsDowload] = useState([]);
    const [downloadError, setDownloadError] = useState({
        show: false,
        message: ""
    });

    const csvRef = useRef();

    const { data: partnerDetails, error: fetchDetailsError } = useSWR(
        `/partners/${user.id}`
    );
    const { data: requests, error: fetchRequestsError } = useSWR(
        `/partners/requests`
    );
    const { data: signups, error: fetchSignupsError } = useSWR(
        `/exchange/signups/${user.id}`
    );
    const { data: invoices } = useSWR(`/invoices/${user.id}`);

    // model for update details
    // const [show, setShow] = useState(false);
    const [showCrypto, setShowCrypto] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const handleCryptoClose = () => setShowCrypto(false);
    const handleCryptoShow = () => setShowCrypto(true);

    const isFetching = false;
    const currentYear = new Date().getFullYear();

    const handleDownload = async () => {
        setDownloadError({ show: false, message: "" });
        try {
            if (year) {
                const filterTransactions = await api.secure.get(
                    `/transaction/download/${year}`
                );
                if (filterTransactions.data.length > 0) {
                    setTransactionsDowload(filterTransactions.data);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    csvRef.current.link.click();
                } else {
                    setDownloadError({
                        show: true,
                        message: "No transactions found"
                    });
                }
            }
        } catch (error) {
            console.error(error);
            setDownloadError({ show: true, message: error.message });
        }
    };

    return (
        <Layout activeTab="Dashboard">
            <div className="dashboard container-fluid py-4">
                <Loader loading={false} />

                <section className="main row">
                    {/* <div className={isVerified ? "overlay" : "overlay active"} /> */}
                    <aside className="col-lg-5">
                        <section>
                            <Card>
                                <h4>Account Details</h4>
                                <ErrorMessage error={fetchDetailsError} />
                                <Loader loading={isFetching} />
                                <AccountDetails details={partnerDetails} />
                            </Card>
                        </section>
						<section>
                            <Button
                                block
                                variant="primary"
                                className="mt-2"
                            >
                                Update account details
                            </Button>
						</section>

                        {/* <section>
                            <Button
                                block
                                variant="primary"
                                onClick={handleShow}
                                className="mt-2"
                            >
                                Update my details
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        {" "}
                                        <h1>User Details</h1>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <UserDetailsForm
                                        iv={userDetails}
                                        afterSubmit={handleClose}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </section> */}
                        <section>
                            <Card>
                                <h4>Invoices</h4>
                                <ErrorMessage error={fetchDetailsError} />
                                <Loader loading={isFetching} />

                                <CurrentInvoice
                                    invoice={invoices?.last}
                                ></CurrentInvoice>
                            </Card>
                        </section>
                        <section>
                            <Button
                                block
                                className="mt-2"
                                onClick={handleCryptoShow}
                            >
                                Pay with Crypto
                            </Button>
                            <Modal show={showCrypto} onHide={handleCryptoClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        {" "}
                                        <h1>Pay with Crypto</h1>
                                    </Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <div>
                                        <p>
                                            We accept USDT and USDC. Please send
                                            your crypto to the following
                                            address:
                                        </p>
                                        <p>
                                            BTC:
                                            bc1q8y6n59szeew65hn8v3np428wfmgye8lzwg2txl
                                        </p>
                                        <QRCode
                                            id="IdemQRCode"
                                            value="bc1q8y6n59szeew65hn8v3np428wfmgye8lzwg2txl"
                                        />
                                        <hr></hr>
                                        <p>
                                            USDT and USDC:
                                            0xe59E0aE26a365cC0b580B73Cb626B78854Cb3856
                                        </p>

                                        <QRCode
                                            id="IdemQRCode"
                                            value="0xe59E0aE26a365cC0b580B73Cb626B78854Cb3856"
                                        />
                                    </div>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={handleCryptoClose}
                                    >
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </section>
                    </aside>
                    <section className="content col-lg-7">
                        <section style={{ position: "relative" }}>
                            <Card>
                                <div className="d-flex flex-row">
                                    <div className="mr-auto p-2">
                                        <h4>Requests</h4>
                                    </div>
                                    <div className="p-2">
                                        <select
                                            className="form-control"
                                            id="downloadYear"
                                            onChange={e => {
                                                setYear(e.target.value);
                                            }}
                                        >
                                            <option>{currentYear}</option>
                                            <option>{currentYear - 1}</option>
                                            <option>{currentYear - 2}</option>
                                            <option>{currentYear - 3}</option>
                                        </select>
                                    </div>
                                    <div className="p-2">
                                        <Button onClick={handleDownload}>
                                            Download CSV
                                        </Button>
                                        <CSVLink
                                            data={transactionsDownload}
                                            filename={"User-transactions.csv"}
                                            className="hidden"
                                            target="_blank"
                                            ref={csvRef}
                                        />
                                    </div>
                                </div>
                                {downloadError.show && (
                                    <Alert variant="danger">
                                        {downloadError.message}
                                    </Alert>
                                )}
                                <ErrorMessage error={fetchRequestsError} />
                                <Loader loading={isFetching} />
                                <RequestsTable transactions={requests} />
                            </Card>
                        </section>
                        <section style={{ position: "relative" }}>
                            <Card>
                                <div className="d-flex flex-row">
                                    <div className="mr-auto p-2">
                                        <h4>Sign Ups</h4>
                                    </div>
                                </div>
                                {downloadError.show && (
                                    <Alert variant="danger">
                                        {downloadError.message}
                                    </Alert>
                                )}
                                <ErrorMessage error={fetchRequestsError} />
                                <Loader loading={isFetching} />
                                <RequestsTable transactions={signups} />
                            </Card>
                        </section>
                    </section>
                </section>
            </div>
        </Layout>
    );
};

export default Dashboard;
