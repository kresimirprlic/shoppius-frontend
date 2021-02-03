import React from "react";
import { Box, Card, CardContent, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles({
	container: {
		width: "30%",
		maxWidth: 800,
		zIndex: 99,
		position: "absolute",
		top: 200,
		right: 10,
	},
	card: {
		backgroundColor: "#e8eaf6",
		minHeight: 300,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},

	cart__item: {
		margin: 5,
		fontSize: 17,
	},
});

const QuickCartView = (props) => {
	const { cart, fadeIn } = props;
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Fade in={fadeIn} timeout={{ enter: 400 }}>
				<Card raised className={classes.card}>
					<CardContent>
						<Typography
							color="secondary"
							style={{ textAlign: "center", marginBottom: 3 }}
							variant="h6">
							Currently in cart
						</Typography>
						<Divider style={{ marginBottom: 3 }} />

						{cart[0].items.length > 0 ? (
							cart[0].items.map((item) => (
								<Box
									key={item.itemId}
									component="div"
									fontWeight={700}
									className={classes.cart__item}>
									<div>
										{item.name}..... x{item.quantity}
									</div>
								</Box>
							))
						) : (
							<div style={{ textAlign: "center", marginTop:20, fontWeight:"bold" }}>Start adding items to the cart</div>
						)}

						{/* {cart[0].items.map((item) => (
							<Box key={item.itemId} component="div" fontWeight={700} className={classes.cart__item} >
								{cart[0].items.length > 0 ? (
									<div>
										{item.name}..... x{item.quantity}
									</div>
								) : (
									<div style={{ textAlign: "center" }}>Start adding items to the cart</div>
								)}
							</Box>
						))} */}
					</CardContent>
					<div>
						<Divider style={{ margin: 4, marginLeft: 20, marginRight: 20 }} />
						<Typography
							style={{ textAlign: "center", fontStyle: "italic", margin: 5 }}
							variant="body2">
							Thank you for shopping with us
						</Typography>
					</div>
				</Card>
			</Fade>
		</div>
	);
};

export default QuickCartView;
