import React, { useEffect, useState } from "react";
import * as actionCreators from "../store/actions/index";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	Badge,
	Button,
	CircularProgress,
	Container,
	Grid,
	IconButton,
	makeStyles,
	Tooltip,
	Typography,
} from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import InvItemCard from "../shoppius/InvItemCard";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import QuickCartView from "../shoppius/QuickCartView";

const useStyles = makeStyles((theme) => ({
	header: {
		color: "#334752",
		fontFamily: `'Pacifico', cursive`,
		marginTop: 20,
		fontSize: 55,
		marginRight: 40,
		paddingLeft: 40,
	},

	header__container: {
		marginBottom: 60,
	},
	cards__container: {
		margin: 20,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		width: "100%",
		flexWrap: "wrap",
	},
}));

const Test = (props) => {
	const {
		isLoading,
		onGetShoppiusInventory,
		inventory,
		onAddItemToCart,
		onGetShoppiusCart,
		cart,
		onRemoveItemFromCart,
	} = props;
	const classes = useStyles();
	const history = useHistory();

	const [quickCartPreviewIsVisible, setQuickCartPreviewIsVisible] = useState(false);

	useEffect(() => {
		onGetShoppiusInventory();
		onGetShoppiusCart();
	}, [onGetShoppiusInventory, onGetShoppiusCart]);

	const getCartTotalQuantity = () => {
		let totalQuantity = 0;
		if (cart[0]) {
			cart[0].items.forEach((element) => {
				totalQuantity += element.quantity;
			});
			
		}
		return totalQuantity;
	};

	return (
		<Container maxWidth="lg">
			<Grid className={classes.header__container} container justify="center" alignItems="center">
				<Grid container alignItems="center" spacing={3} style={{ width: 450 }}>
					<Grid style={{width:50}} item>
						{/* Spinner */}
						{isLoading && <CircularProgress color="secondary" />}
					</Grid>
					{/* Page title */}
					<Grid item>
						<Typography className={classes.header}>Shoppius</Typography>
					</Grid>
					<Grid item style={{ marginTop: 20 }}>
						<Tooltip title="Proceed to checkout">
							<IconButton
								onMouseEnter={() => {
									setQuickCartPreviewIsVisible(true);
							}}
								onMouseLeave={() => {
									setQuickCartPreviewIsVisible(false);
								}}
								aria-label="show 11 new notifications"
								color="inherit">
								<Badge badgeContent={getCartTotalQuantity()} color="secondary">
									<ShoppingBasketIcon color="primary" fontSize="large" />
								</Badge>
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</Grid>
			<div style={{ paddingLeft: 30 }}>
				<Button
					endIcon={<DoubleArrowIcon color="secondary" />}
					variant="outlined"
					onClick={()=> history.push("/checkout")}>
					Proceed to checkout
				</Button>
			</div>
			<div className={classes.cards__container}>
				{inventory.map((item) => (
					<InvItemCard
						key={item._id}
						style={{ margin: 10 }}
						name={item.name}
						description={item.description}
						image={item.image}
						price={item.price}
						quantity = {item.quantity}
						onAdd={() => onAddItemToCart(item._id, item.name)}
						onRemove={() => onRemoveItemFromCart(item._id, item.name)}
					/>
				))}
			</div>
			{quickCartPreviewIsVisible && (
				<QuickCartView cart={cart} fadeIn={quickCartPreviewIsVisible} />
			)}
		</Container>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.shoppius.isLoading,
	inventory: state.shoppius.inventory,
	cart: state.shoppius.cart,
});

const mapDispatchToProps = (dispatch) => ({
	onGetShoppiusInventory: () => dispatch(actionCreators.getShoppiusInventory()),
	onAddItemToCart: (itemId, price, name) =>
		dispatch(actionCreators.addToShoppiusCart(itemId, price, name)),
	onRemoveItemFromCart: (itemId, name) =>
		dispatch(actionCreators.removeFromShoppiusCart(itemId, name)),
	onGetShoppiusCart: () => dispatch(actionCreators.getShoppiusCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
