import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";
import { useHistory } from "react-router-dom";
import {
	Button,
	CircularProgress,
	Container,
	Grid,
	makeStyles,
	Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Stepper from "./Stepper";

const useStyles = makeStyles((theme) => ({
	header: {
		color: "#334752",
		fontFamily: `'Pacifico', cursive`,
		marginTop: 20,
		fontSize: 55,
		marginRight: 40,
		paddingLeft: 40,
		// textAlign:"center"
	},

	header__container: {
		marginBottom: 20,
	},
	stepper__container: {
		marginTop: 30,
	},
}));

const CheckoutPage = (props) => {
	const classes = useStyles();
	const history = useHistory();

	const { isLoading } = props;

	return (
		<Container maxWidth="xl">
			<Grid className={classes.header__container} container justify="center" alignItems="center">
				<Grid container alignItems="center" spacing={3} style={{ width: 450 }}>
					<Grid style={{width:50}} item>
						{/* Spinner */}
						{isLoading && <CircularProgress color="secondary" />}
					</Grid>
					{/* Page title */}
					<Grid item>
						<Typography className={classes.header}>Checkout</Typography>
					</Grid>
					<Grid item style={{ marginTop: 20 }}></Grid>
				</Grid>
			</Grid>
			{/* stepper component */}
			<Container className={classes.stepper__container} maxWidth="lg">
				<div style={{ paddingBottom:20 }}>
					<Button
						startIcon={<ArrowBackIosIcon color="secondary" />}
						variant="outlined"
						onClick={() => history.push("/test")}>
						Back to cart
					</Button>
				</div>
				<Stepper />
			</Container>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.shoppius.isLoading,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
