import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from "../../../store/actions/index"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ErrorModal = (props) => {
    return (
        <Dialog
        open={props.errorModalVisible}
        onClose={props.onHideErrorModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"An error occured."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.errorModalMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onHideErrorModal} color="primary">
            OK
          </Button>
          
        </DialogActions>
      </Dialog>
    )
}

const mapStateToProps = (state) => ({
    errorModalVisible:state.errormodal.isVisible,
    errorModalMessage:state.errormodal.message
});

const mapDispatchToProps = dispatch => ({
    onHideErrorModal: ()  => dispatch(actionCreators.hideErrorModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal)
