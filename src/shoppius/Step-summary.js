import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";

import {
	Container,
	makeStyles,
	Box,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
} from "@material-ui/core";

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
		marginBottom: 30,
	},
	customer__container: {
		width: "70%",
		marginBottom: 50,
	},
}));

const StepSummary = (props) => {
	const classes = useStyles();
	const { onGetShoppiusCart, customer, cart } = props;

	//for cart to be preserved in case of reload
	useEffect(() => {
		onGetShoppiusCart();
	}, [onGetShoppiusCart]);

	const calculateTotalWithDiscountHandler = () => {
		let totalWithDiscount = cart[0].total;
		cart[0].appliedCodes.forEach((element) => {
			//case promo is percentage
			if (element.isPercentage === true) {
				totalWithDiscount = totalWithDiscount * ((100 - element.value) / 100);
				//case promo value
			} else if (!element.isPercentage) {
				totalWithDiscount = totalWithDiscount - element.value;
			}
		});
		if (totalWithDiscount < 0) {
			return 0;
		} else {
			return totalWithDiscount.toFixed(2);
		}
	};
	const calculateDiscountHandler = () => {
		const total = cart[0].total;
		return (total - calculateTotalWithDiscountHandler()).toFixed(2);
	};

	return (
		<Container>
			{/* header */}
			<Box
				style={{ marginBottom: 20, textAlign: "center" }}
				color="lightgrey"
				fontSize={20}
				fontWeight={700}>
				Order Summary
			</Box>

			{/* summary  */}
			<div className={classes.summary__container}>
				<div className={classes.table__container}>
					{/* Table */}
					{cart.length > 0 && (
						<Table className={classes.table} size="small" aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Item name</TableCell>
									<TableCell align="right">Price</TableCell>
									<TableCell align="right">Quantity</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{cart[0].items.map((row) => (
									<TableRow key={row.itemId}>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">{row.price}</TableCell>
										<TableCell align="right">{row.quantity}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</div>
				{/* subtotal */}
				<div className={classes.total__container}>
					<Typography
						variant="body2"
						style={{ marginTop: 30, marginBottom: 3, textAlign: "end", paddingRight: 20 }}>
						SUBTOTAL: {cart.length && cart[0].total.toFixed(2)}€
					</Typography>
					<Typography variant="body2" style={{ textAlign: "end", paddingRight: 20 }}>
						DISCOUNT: {calculateDiscountHandler()}€
					</Typography>
					<Typography
						variant="subtitle2"
						style={{ marginBottom: 30, textAlign: "end", paddingRight: 20 }}>
						TOTAL: {calculateTotalWithDiscountHandler()}€
					</Typography>
				</div>
				{/* customer */}
				<Box
					style={{ marginBottom: 20, textAlign: "start" }}
					color="lightgrey"
					fontSize={20}
					fontWeight={700}>
					Customer Details
				</Box>
				<div className={classes.customer__container}>
					{customer.email && (
						<Typography
							variant="body2"
							style={{ marginBottom: 3, textAlign: "start", color: "grey" }}>
							EMAIL: <span style={{ fontSize: 18, color: "#000" }}>{customer.email}</span>{" "}
						</Typography>
					)}
					{customer.address && (
						<Typography
							variant="body2"
							style={{ marginBottom: 3, textAlign: "start", color: "grey" }}>
							ADDRESS: <span style={{ fontSize: 18, color: "#000" }}>{customer.address}</span>
						</Typography>
					)}
				</div>
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	customer: state.shoppius.customer,
	cart: state.shoppius.cart,
});

const mapDispatchToProps = (dispatch) => ({
	onGetShoppiusCart: () => dispatch(actionCreators.getShoppiusCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepSummary);
