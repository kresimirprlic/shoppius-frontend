import React, { useEffect, useState } from "react";
import * as actionCreators from "../store/actions/index";
import { connect } from "react-redux";
import { Container, makeStyles } from "@material-ui/core";

import "./Styles.css";

const useStyles = makeStyles((theme) => ({}));

const Test = (props) => {
	const {} = props;

	return <Container maxWidth="lg"></Container>;
};

const mapStateToProps = (state) => ({
	isLoading: state.shoppius.isLoading,
	inventory: state.shoppius.inventory,
	cart: state.shoppius.cart,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
