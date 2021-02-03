import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";

import {  Container, makeStyles, Box,TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	form__container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
	},

	form__textField: {
		width: 500,
		marginBottom: 20,
	},

	card__image: {
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
		width: "50%",
		height: "auto",
      marginTop: 20,
      marginBottom:40
	},
}));

const StepPayment2 = (props) => {
	const classes = useStyles();
	const { onGetShoppiusCart, onSetCustomerFields, customer } = props;

	//for cart to be preserved in case of reload
	useEffect(() => {
		onGetShoppiusCart();
	}, [onGetShoppiusCart]);

	useEffect(() => {
		if (customer.email.length > 0) {
			setEmail(customer.email);
		}
		if (customer.address.length > 0) {
			setAddress(customer.address);
		}
		if (customer.creditCard.length > 0) {
			setCreditCard(customer.creditCard);
		}
	}, []);

	//------------------------------------------
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	//simple demo validations
	const onChangeEmail = (value) => {
		setEmail(value);
		if (email.length === 0) {
			setEmailError("Email required");
			return;
		} else {
			setEmailError("");
		}
		if (!value.includes("@") || !value.includes(".") || value.length < 6) {
			setEmailError("Entry should be an email");
			onSetCustomerFields("email", "");
			return;
		} else {
			setEmailError("");
		}
		onSetCustomerFields("email", value);
	};
	const [address, setAddress] = useState("");
	const [addressError, setAddressError] = useState("");
	const onChangeAddress = (value) => {
		setAddress(value);
		if (address.length === 0) {
			setAddressError("Address required");
			return;
		} else {
			setAddressError("");
		}
		onSetCustomerFields("address", value);
	};
	const [creditCard, setCreditCard] = useState("");
	const [cardError, setCardError] = useState("");
	const onChangeCreditCard = (value) => {
		let regex = /^[0-9]+$/;
		if (!value.match(regex)) {
		   console.log("is not a number")
			return;
		}
		// if (isNaN(value)) {
		// 	console.log("is not a number");
		// 	return;
		// }
		setCreditCard(value);
		if (creditCard.length === 0) {
			setCardError("Credit card required");
			return;
		} else {
			setCardError("");
		}

		if (value.length < 10) {
			setCardError("Credit card should have min 10 digits");
			onSetCustomerFields("creditCard", "");
			return;
		} else {
			setCardError("");
		}
		onSetCustomerFields("creditCard", value);
	};
	//------------------------------------------

	return (
		<Container>
			{/* header */}
			<Box
				style={{ marginBottom: 20, textAlign: "center" }}
				color="lightgrey"
				fontSize={20}
				fontWeight={700}>
				Payment information
			</Box>
			{/* form fields */}
			<form className={classes.form__container}>
				<TextField
					autoFocus
					onBlur={() => onChangeEmail(email.length === 0 ? "" : email)}
					error={emailError.length > 0}
					helperText={emailError}
					onChange={(e) => onChangeEmail(e.target.value)}
					size="small"
					variant="outlined"
					type="email"
					label="Email"
					className={classes.form__textField}
					defaultValue={customer.email}
				/>
				<TextField
					onBlur={() => onChangeAddress(address.length === 0 ? "" : address)}
					error={addressError.length > 0}
					helperText={addressError}
					onChange={(e) => onChangeAddress(e.target.value)}
					size="small"
					variant="outlined"
					type="text"
					label="Address"
					className={classes.form__textField}
					defaultValue={customer.address}
				/>
				<TextField
					onBlur={() => onChangeCreditCard(creditCard.length === 0 ? "" : creditCard)}
					error={cardError.length > 0}
					helperText={cardError}
					onChange={(e) => onChangeCreditCard(e.target.value)}
					size="small"
					variant="outlined"
					type="text"
					label="Credit Card Number"
					className={classes.form__textField}
					value={customer.creditCard.length > 0 ? customer.creditCard : creditCard}
				/>
			</form>
			<img
				className={classes.card__image}
				style={{ width: 300, height: "auto" }}
				alt="credit card"
				src="https://www.northshorebank.com/NorthShoreBank/media/Social/imgNSB-PersonalCreditCard.png"
			/>
			
		</Container>
	);
};

const mapStateToProps = (state) => ({
	customer: state.shoppius.customer,
});

const mapDispatchToProps = (dispatch) => ({
	onGetShoppiusCart: () => dispatch(actionCreators.getShoppiusCart()),
	onSetCustomerFields: (field, value) =>
		dispatch(actionCreators.set_shoppius_customer_fields(field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepPayment2);
