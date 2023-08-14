import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "apis/api";
import "./UserDetailsForm.scss";
import { Button } from "react-bootstrap";

// Create a form that allows users to enter their name, DOB, Address, and Phone Number.

// Validation Schema
const validationSchema = Yup.object({
	firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
	middleName: Yup.string().max(15, "Must be 15 characters or less"),
	lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
	dob: Yup.date().max(new Date(), "Must be a valid date and not in the future").required("Required"),
	address: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	phoneNumber: Yup.number().required("Required")
});

const renderField = (name, label, type, formik) => (
	<div className="form-field">
		<label htmlFor={name}>{label}</label>
		<input
			id={name}
			name={name}
			type={type}
			onChange={formik.handleChange}
			value={formik.values[name]}
			className={formik.errors[name] && formik.touched[name] ? "error" : ""}
		/>
		{formik.errors[name] && formik.touched[name] ? <div className="error-message">{formik.errors[name]}</div> : null}
	</div>
);

const UserDetailsForm = ({ afterSubmit, iv }) => {
	const [userDetailFromAS, setUserDetailsFromAS] = React.useState({});
	const [initialValues, setInitialValues] = React.useState({
		firstName: iv?.firstName || "",
		middleName: iv?.middleName || "",
		lastName: iv?.lastName || "",
		dob: iv?.dob || "",
		address: "",
		city: iv?.city || "",
		phoneNumber: iv?.phoneNumber || ""
	});
	const userEmail = iv.email;

	React.useEffect(() => {
		const instance = api.open;
		instance
			.get("/contacts", { params: { email: userEmail } })
			.then((response) => {
				setUserDetailsFromAS(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [userEmail]);

	React.useEffect(() => {
		setInitialValues({
			...initialValues,
			address: userDetailFromAS.physicalAddressLine1 || "",
			city: userDetailFromAS.physicalCity || "",
			phoneNumber: userDetailFromAS.phone1Number || ""

		});
	}, []);

	const formik = useFormik({
		initialValues,
		enableReinitialize: true,
		validationSchema,
		onSubmit: (values) => submitToAPI(values)
	});

	const submitToAPI = (values) => {
		values.userEmail = userEmail;
		const instance = api.open;

		instance
			.put("/contacts", values)
			.then((response) => {
				afterSubmit();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className="form-container">
			<form onSubmit={formik.handleSubmit} className="user-details-form">
				{renderField("firstName", "First Name", "text", formik)}
				{renderField("middleName", "Middle Name", "text", formik)}
				{renderField("lastName", "Last Name", "text", formik)}
				{renderField("dob", "DOB", "date", formik)}
				{renderField("address", "Street Address", "text", formik)}
				{renderField("city", "City/Suburb", "text", formik)}
				{renderField("phoneNumber", "Phone Number", "text", formik)}
				<Button type="submit">Save Changes</Button>
			</form>
		</div>
	);
};

export default UserDetailsForm;
