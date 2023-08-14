import React from "react";

export default function CurrentInvoice({ invoice }) {

	if (!invoice) {
        return <div>You have no outstanding invoices.</div>
    }

	return (
		<div>
			<p>
				<b>
					RE: Invoice #{invoice?.id} dated {invoice?.date}
				</b>
			</p>
			<p>
				Please find enclosed your invoice #{invoice?.id} dated {invoice?.date}. Your invoice is ${invoice?.amount} and includes an itemised listing of the work
				undertaken.
			</p>

			<p>We would be grateful if you immediately pay the outstanding balance of ${invoice?.amount} owed.</p>
		</div>
	);
}
