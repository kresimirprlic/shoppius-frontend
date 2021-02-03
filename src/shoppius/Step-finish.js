import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Container, makeStyles, Box, Typography } from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const useStyles = makeStyles((theme) => ({
	summary__container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	table__container: {
		width: "70%",
	},
	table: {},
	total__container: {
		width: "70%",
	},
	summary__conatainer: {
		color: theme.palette.text.primary,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: 50,
	},
}));

const StepFinish = (props) => {
	const classes = useStyles();
	const history = useHistory();

   const {} = props;
   
   const finishHandler = () => {
      history.replace("/test");
   }

	return (
		<Container>
			{/* header */}
			<Box
				style={{ marginBottom: 50, textAlign: "center" }}
				color="secondary"
				fontSize={20}
				fontWeight={700}>
				<div>
					<Typography variant="h5"> Order Complete!</Typography>
					<Typography variant="h6">Thank you for shopping with us</Typography>
				</div>
			</Box>
         

			{/* summary  */}
			<div className={classes.summary__conatainer}>
				<Typography variant="subtitle2">This demo was made by Krešimir Prlić</Typography>
				<Typography variant="body2">All rights reserved</Typography>
				<Button
					onClick={finishHandler}
					style={{ marginTop: 50 }}
					endIcon={<ShoppingBasketIcon />}
					variant="contained"
					color="secondary"
					size="large">
					continue shopping?
				</Button>
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(StepFinish);
