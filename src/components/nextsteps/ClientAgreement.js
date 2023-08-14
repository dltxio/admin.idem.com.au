import React from "react";
import { Container } from "react-bootstrap";
import ToggleField from "../forms/Toggle";

const ClientAgreement = ({ summary, show }) => {

	// const handleCheckboxChange = (taskNumber) => (event) => {
	// 	setTasks({
	// 		...tasks,
	// 		[taskNumber]: event.target.checked,
	// 	});
	// };

	if (!summary || !show) {
		return;
	}

	return (
		<Container>
			<p>Click here to upload your client agreement.</p>
            <ToggleField></ToggleField>
		</Container>
	);
}

export default ClientAgreement;