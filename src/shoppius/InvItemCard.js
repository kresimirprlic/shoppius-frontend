import React from "react";
import { connect } from "react-redux";
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	makeStyles,
	Typography,
	Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 280,
		position: "relative",
		height: "auto",
	},
	media: {
		height: 140,
	},

	actions__container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		paddingRight: 20,
	},
}));

const InvItemCard = (props) => {
	const classes = useStyles();
	const { name, description, image, price, onAdd, onRemove, quantity } = props;

	return (
		<Card className={classes.root} style={{ ...props.style }}>
			<CardActionArea style={{ marginBottom: 55 }}>
				<CardMedia className={classes.media} image={image} title="Contemplative Reptile" />
				<CardContent style={{ paddingBottom: 0 }}>
					<Typography gutterBottom variant="h6" component="h2">
						{name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions style={{ width: "100%" }}>
				<div style={{ position: "absolute", bottom: 8, width: "100%" }}>
					<div className={classes.actions__container}>
						<div style={{ width: 150 }}>
							<Tooltip title="Add an item to the cart">
								<Button onClick={onAdd} variant="contained" size="small" color="primary">
									Add
								</Button>
							</Tooltip>

							<IconButton
								onClick={onRemove}
								style={{ marginTop: 1 }}
								size="medium"
								aria-label="delete">
								<Tooltip title="Remove from cart">
									<DeleteIcon style={{ fill: "#78909c" }} />
								</Tooltip>
							</IconButton>
						</div>
						<div style={{ overflowWrap: "break-word" }}>
							<Typography variant="h5" color="primary" component="h2">
								{price}€
							</Typography>
						</div>
					</div>
				</div>
			</CardActions>
		</Card>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(InvItemCard);
