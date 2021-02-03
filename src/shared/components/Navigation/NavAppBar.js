import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import {
	AppBar,
	makeStyles,
	Toolbar,
	IconButton,
	Typography,
	Hidden,
	Button,
	
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerNav from "./NavDrawer";
import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
	root: {
		height: 64,
		display: "flex",
	},
	navItems_container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		color: theme.palette.grey[300],
		// fontFamily: `'Major Mono Display', monospace`
		fontFamily: `'Pacifico', cursive`,
		// fontFamily: `'Sansita Swashed', cursive`
	},
	title__container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		width: 200,
		cursor: "pointer",
	},
	actions: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	userEmail: {
		color: theme.palette.grey[400],
	},
	logo: {
		width: 30,
		height: 30,
		marginLeft: 10,
	},
	navHidden__triggerContainer: {
		width: 300,
		height: 40,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	navHidden__innerContainer: {
		width: "50%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		zIndex: 99,
	},
	activeLink: {
		"& > *": {
			color: "#ff9800 !important",
		},
	},
}));

const AppBarNav = (props) => {
	const history = useHistory();
	const classes = useStyles();
	const [isOpen, setIsOpen] = useState(false);

	const openDrawerHandler = () => {
		setIsOpen(true);
	};
	const closeDrawerHandler = () => {
		setIsOpen(false);
	};


	const ref = React.createRef();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					{/* hamburger */}
					<IconButton
						edge="start"
						size="medium"
						onClick={openDrawerHandler}
						className={classes.menuButton}
						color="inherit"
						aria-label="menu">
						<MenuIcon fontSize="large" />
					</IconButton>
					<div className={classes.navItems_container}>
						{/* app name */}
						<div className={classes.title__container} onClick={() => history.push("/")}>
							<Typography variant="h5" className={classes.title}>
								Kodius
							</Typography>
						</div>
						<Hidden smDown>
							{/* actions */}
							<div className={classes.actions}>
								{props.isLoggedIn && (
									<Typography mr={3} className={classes.userEmail} variant="body1">
										{props.email}
									</Typography>
								)}
								{props.isLoggedIn && (
									<Button onClick={props.onLogout} color="secondary">
										Logout
									</Button>
								)}
							</div>
						</Hidden>
						
					</div>
				</Toolbar>
			</AppBar>
			<DrawerNav ref={ref} isOpen={isOpen} closeDrawerHandler={closeDrawerHandler} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	isLoggedIn: state.auth.isLoggedIn,
	email: state.auth.email,
});

const mapDispatchToProps = (dispatch) => ({
	// onSignup: (values) => dispatch(actionCreators.signup(values)),
	onLogout: () => dispatch(actionCreators.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBarNav);
