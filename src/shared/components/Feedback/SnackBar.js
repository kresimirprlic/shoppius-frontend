import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from "../../../store/actions/index"

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ReactDOM from "react-dom"

const SnackBarEl = (props) => {


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.onHideSnackbar();
  };

  const content = <div>
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={props.snackbarVisible}
      autoHideDuration={3000}
      onClose={handleClose}
      message={props.snackbarMessage}
      action={
        <React.Fragment>
          {/* <Button color="secondary" size="small" onClick={handleClose}>
          UNDO
        </Button> */}
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  </div>
  return ReactDOM.createPortal(content, document.getElementById("snackbar"));
}

const mapStateToProps = (state) => ({
  snackbarVisible: state.snack.isVisible,
  snackbarMessage: state.snack.snackbarMessage
})

const mapDispatchToProps = dispatch => {
  return {
    onShowSnackbar: () => dispatch(actionCreators.showSnackbar()),
    onHideSnackbar: () => dispatch(actionCreators.hideSnackbar())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarEl)
