import React from "react";
import { Container } from "react-bootstrap";
import ClientAgreement from "./ClientAgreement";

const NextSteps = ({ steps, summary }) => {

	let showClientAgreement = false;

	if (steps === "CLIENT_AGREEMENT") {
		showClientAgreement = true;
	}

	return (
		<Container>
			<h3>Next step</h3>
			{showClientAgreement && <ClientAgreement summary={summary} />}
		</Container>
	);
}

export default NextSteps;