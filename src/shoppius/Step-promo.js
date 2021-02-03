import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";

import {
	Button,
	Container,
	makeStyles,
	Typography,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Box,
	TextField,
	IconButton,
	Tooltip,
} from "@material-ui/core";
import { calculateTotalWithPromosHelper } from "../store/actions/shoppius";
import DeleteIcon from "@material-ui/icons/Delete";


const useStyles = makeStyles((theme) => ({
	promoCode__container: {
		marginTop: 10,
		marginBottom: 20,
	},
	promoCode__list:{
		marginBottom:40,
		marginLeft:30,
		color:"#616161"
	}
}));

const StepPromo = (props) => {
	const classes = useStyles();

	const { cart, onApplyCouponCode, onGetShoppiusCart,onClearCouponCodes,onRemoveItemFromCart } = props;

	const [coupon, setCoupon] = useState("");

	//for cart to be preserved in case of reload
	useEffect(() => {
		onGetShoppiusCart();
	}, [onGetShoppiusCart]);


	return (
		<Container>
			{/* header */}
			<Box
				style={{ marginBottom: 20, textAlign: "center" }}
				color="lightgrey"
				fontSize={20}
				fontWeight={700}>
				Currently selected items
			</Box>
			{/* items list */}
			{cart.length > 0 && (
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Item name</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="right">Quantity</TableCell>
							<TableCell align="right">Actions</TableCell>
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
								<TableCell align="right"><IconButton
								onClick={()=>onRemoveItemFromCart(row.itemId, row.name)}
								style={{ marginTop: 1 }}
								size="small"
								aria-label="delete">
								<Tooltip title="Remove item from cart">
									<DeleteIcon style={{ fill: "#78909c" }} />
								</Tooltip>
							</IconButton></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}

			{/* subtotal */}
			<Typography
				variant="h6"
				style={{ marginTop: 30, marginBottom: 30, textAlign: "end", paddingRight: 20 }}>
				TOTAL: {cart.length && calculateTotalWithPromosHelper(cart)}€
			</Typography>
			{/* promo code */}
			<Box
				style={{ marginBottom: 20,  }}
				color="lightgrey"
				fontSize={20}
				fontWeight={700}>
				Apply promo codes
			</Box>
			
			<div className={classes.promoCode__container}>
				<TextField
					size="small"
					variant="outlined"
					onChange={(e) => setCoupon(e.target.value)}
					label="coupon code"
					style={{width:280}}
					helperText="(E.g. 20%OFF, 5%OFF or 20EUROFF)"
				/>
				<Button style={{marginLeft:10}} variant="contained" color="secondary" onClick={() => onApplyCouponCode(coupon)}>Apply</Button>
				<Button color="primary" onClick={onClearCouponCodes}>Clear all</Button>
			</div>
			
			<div className={classes.promoCode__list}>
				<ul>
					{cart.length && cart[0].appliedCodes.map((code) => <li key={code._id}>{code.name}</li>)}
				</ul>
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	cart: state.shoppius.cart,
});

const mapDispatchToProps = (dispatch) => ({
	onApplyCouponCode: (codeName) => dispatch(actionCreators.applyCouponCode(codeName)),
	onClearCouponCodes: () => dispatch(actionCreators.clearCuponCodes()),
	onGetShoppiusCart: () => dispatch(actionCreators.getShoppiusCart()),
	onRemoveItemFromCart: (itemId, name) =>
		dispatch(actionCreators.removeFromShoppiusCart(itemId, name)),
	
});

export default connect(mapStateToProps, mapDispatchToProps)(StepPromo);
