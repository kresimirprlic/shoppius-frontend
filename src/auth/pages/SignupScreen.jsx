import React from "react";
import * as actionCreators from "../../store/actions/index"
import { connect } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
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
	container: {
		// backgroundImage:`url(${})`,
		height: "100%",
		width: "100%",
		objectFit: "cover",
		position: "fixed",
	},
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
		<div>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{" "}
						Sign up
					</Typography>
					<Formik
						initialValues={{
							firstName: "",
							lastName: "",
							email: "",
							password: "",
						}}
						validate={(values) => {
							const errors = {};
							if (!values.firstName) {
								errors.firstName = "First name required";
							}
							if (!values.lastName) {
								errors.lastName = "Last name required";
							}
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
							props.onSignup(values).then((response) => {
								if (response.status === 201) {
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
									<Grid item xs={12} sm={6}>
										<Field
											component={TextField}
											name="firstName"
											type="text"
											label="First Name"
											variant="outlined"
											fullWidth
											autoFocus
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Field
											component={TextField}
											name="lastName"
											type="text"
											label="Last Name"
											variant="outlined"
											fullWidth
										/>
									</Grid>
									<Grid item xs={12}>
										<Field
											component={TextField}
											name="email"
											type="email"
											label="Email Address"
											variant="outlined"
											fullWidth
											autoComplete="email"
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
											autoComplete="current-password"
										/>
									</Grid>
								</Grid>
								{/* SUBMIT */}
								{isSubmitting && <LinearProgress />}
								<Button
									className={classes.submit}
									variant="contained"
									color="primary"
									fullWidth
									onClick={submitForm}
									disabled={isSubmitting}
								>
									Sign Up
								</Button>
								<Grid container justify="flex-end">
									<Grid item>
										<NavLink style={{ fontSize: "16px" }} to="/login">
											Already have an account? Log In
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
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	onSignup: (values) => dispatch(actionCreators.signup(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
