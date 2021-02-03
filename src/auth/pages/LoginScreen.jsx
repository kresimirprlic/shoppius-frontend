import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index"
import { NavLink, useHistory } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import {
	makeStyles,
	Container,
	CssBaseline,
	Avatar,
	Typography,
	LinearProgress,
	Button,
	Grid,
	Box,
	Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="">
				Kresimir Prlic
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const SignupScreen = (props) => {
	const history = useHistory();
	const classes = useStyles();
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{" "}
					Log in
				</Typography>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validate={(values) => {
						const errors = {};
						if (!values.email) {
							errors.email = "Email required";
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
						) {
							errors.email = "Invalid email address";
						}
						if (!values.password) {
							errors.password = "Password required";
						} else if (values.password.length < 5) {
							errors.password =
								"Password length should be 5 characters minumum";
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						// alert(JSON.stringify(values, null, 2));
						setSubmitting(true);
						props.onLogin(values).then((response) => {
							if (response.status === 200) {
								history.push("/");
							} else {
								setSubmitting(false);
							}
						});
					}}
				>
					{({ submitForm, isSubmitting }) => (
						<Form className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Field
										component={TextField}
										name="email"
										type="email"
										label="Email Address"
										variant="outlined"
										fullWidth
										autoComplete="email"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										component={TextField}
										name="password"
										type="password"
										label="Password"
										variant="outlined"
										fullWidth
										id="password"
										autoComplete="current-password"
									/>
								</Grid>
							</Grid>
							{isSubmitting && <LinearProgress />}
							{/* SUBMIT */}
							<Button
								className={classes.submit}
								variant="contained"
								color="primary"
								fullWidth
								disabled={isSubmitting}
								onClick={submitForm}
							>
								Log In
							</Button>
							<Grid container justify="flex-end">
								<Grid item>
									<NavLink to="/signup" style={{ fontSize: "16px" }}>
										Dont have an account? Sign Up
									</NavLink>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	// isLoadingSignup: state.user.isLoading, - linear progress instead
});

const mapDispatchToProps = (dispatch) => ({
	onLogin: (values) => dispatch(actionCreators.login(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
