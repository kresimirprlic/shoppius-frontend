import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactDOM from "react-dom";
import { LinearProgress } from "@material-ui/core";

//Usage:
//instead of calling e.g. delete action on button, call show alert modal instead
//in alert modal set which (e.g. delete) action executes on "OK" press in modal
//calling modal: 
//onShowAlertModal("Delete", "Are you sure you want to delete the customer?", {method:"deleteCustomer"})

const AlertModal = (props) => {
	const {
		onHideAlertModal,
		alertModalVisible,
		alertModalIsLoading,
		title,
		message,
		onAlertModalSetActionInMotion,
	} = props;

	const content = (
		<Dialog
			fullWidth
			open={alertModalVisible}
			onClose={onHideAlertModal}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			{/* title */}
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				{/* message */}
				<DialogContentText id="alert-dialog-description">
					{message}
				</DialogContentText>
			</DialogContent>
			{/* spinner */}
			{alertModalIsLoading && <LinearProgress />}

			<DialogActions>
				<Button
					variant="contained"
					onClick={onAlertModalSetActionInMotion}
					color="primary"
				>
					OK
				</Button>
				<Button onClick={onHideAlertModal} color="primary">
					CANCEL
				</Button>
			</DialogActions>
		</Dialog>
	);
	return ReactDOM.createPortal(content, document.getElementById("alertmodal"));
};

const mapStateToProps = (state) => ({
	alertModalVisible: state.alertmodal.isVisible,
	alertModalIsLoading: state.alertmodal.isLoading,
	title: state.alertmodal.title,
	message: state.alertmodal.message,
});

const mapDispatchToProps = (dispatch) => ({
	onHideAlertModal: () => dispatch(actionCreators.hideAlertModal()),
	onAlertModalSetActionInMotion: () =>
		dispatch(actionCreators.setActionInMotion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertModal);
