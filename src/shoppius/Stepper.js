import React, { useState} from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";
import { Button, makeStyles, Step, StepLabel, Stepper} from "@material-ui/core";
import StepPromo from "./Step-promo";
import StepPayment from "./Step-payment2";
import StepSummary from "./Step-summary";
import StepFinish from "./Step-finish";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	stepper__Navbar: {
		borderRadius: 10,
		backgroundColor: "#e0f2f1",
		marginBottom: 40,
	},
}));

function getSteps() {
	return ["Promo Code", "Payment method", "Order Summary"];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return <StepPromo />;
		case 1:
			return <StepPayment />;
		case 2:
			return <StepSummary />;
		default:
			return "Unknown step";
	}
}

// ----------------------component--------------------------------

const StepperComponent = (props) => {
	const { customer, onClearShoppingCart, onSetCustomerFields, cart,onGetShoppiusCart } = props;
	const classes = useStyles();

	const [activeStep, setActiveStep] = useState(0);

	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};


	const finishShoppingHandler = () => {
		//clear basket - db
		onClearShoppingCart();
		//clear r
		onSetCustomerFields("email", "");
		onSetCustomerFields("address", "");
		onSetCustomerFields("creditCard", "");
		//move to next stepper step
		handleNext();
	};

	//"next" button disabled prop validation
	const isNextButtonDisabledHelper = () => {
		//checks if cart is empty
		if (activeStep === 0 ) {
			if (cart[0] && cart[0].items.length === 0) {
				return true
			}else{
				return false
			}
			//checks if all fields in payment step are valid
		} else if(activeStep === 1){
			if (
				customer.email.length === 0 ||
				customer.address.length === 0 ||
				customer.creditCard.length === 0
			) {
				return true;
			} else {
				return false;
			}
		}else{
			return false
		}
	}

	// -----------------JSX-----------------
	return (
		<div className={classes.root}>
			<Stepper className={classes.stepper__Navbar} activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<StepFinish />
				) : (
					<div>
						<div className={classes.instructions}>{getStepContent(activeStep)}</div>
						<div>
							<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
								Back
							</Button>

							<Button
								disabled={isNextButtonDisabledHelper()}
								variant="contained"
								color="primary"
								onClick={activeStep === steps.length - 1 ? finishShoppingHandler : handleNext}
								className={classes.button}>
								{activeStep === steps.length - 1 ? "Complete order" : "Next"}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	customer: state.shoppius.customer,
	cart: state.shoppius.cart,
});

const mapDispatchToProps = (dispatch) => ({
	onClearShoppingCart: () => dispatch(actionCreators.clearShoppingCart()),
	onSetCustomerFields: (field, value) =>
		dispatch(actionCreators.set_shoppius_customer_fields(field, value)),
	onGetShoppiusCart: () => dispatch(actionCreators.getShoppiusCart()),

});

export default connect(mapStateToProps, mapDispatchToProps)(StepperComponent);
