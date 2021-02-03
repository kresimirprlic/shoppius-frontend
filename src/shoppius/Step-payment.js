import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";

import { Button, Container, makeStyles, Box, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";

const useStyles = makeStyles((theme) => ({}));

const StepPayment = (props) => {
	const classes = useStyles();
	const { cart, onGetShoppiusCart } = props;

	//for cart to be preserved in case of reload
	useEffect(() => {
		onGetShoppiusCart();
	}, [onGetShoppiusCart]);

	//------------------------------------------
      //NOT USED  - instead custom setup is used, not formik
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
			{/* formik */}
			<div>
				<Formik
					initialValues={{
						email: "",
						address: "",
					}}
					validate={(values) => {
						const errors = {};
						if (!values.email) {
							errors.email = "Email required";
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
							errors.email = "Invalid email address";
						}
						if (!values.address) {
							errors.address = "Adderss required";
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							setSubmitting(false);
							alert(JSON.stringify(values, null, 2));
						}, 500);
					}}>
					{({ submitForm, isSubmitting }) => (
						<Form>
							<Field
								component={TextField}
								size="small"
								variant="outlined"
								name="email"
								type="email"
                        label="Email"
                        style={{width:300, marginBottom:10}}
							/>
							<br />
							<Field
								component={TextField}
								size="small"
								variant="outlined"
								type="text"
								label="Address"
                        name="address"
                        style={{width:300}}
							/>
							{isSubmitting && <LinearProgress />}
							<br />
							<Button
								variant="contained"
								color="primary"
								disabled={isSubmitting}
								onClick={submitForm}>
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	cart: state.shoppius.cart,
});

const mapDispatchToProps = (dispatch) => ({
	onGetShoppiusCart: () => dispatch(actionCreators.getShoppiusCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepPayment);
