import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  // overrides: {
  //   MuiOutlinedInput: {
  //     multiline:{
  //        padding:0
  //     }
  //   }},
  palette: {
    primary: {
      main: "#334752",
    },
    secondary: {
      main: "#46B39D",
    },
    error: {
      main: "#DE4F3C",
    },
    warning: {
      main: "#F0CA4D",
    },
    success: {
      main: "#64F5E6",
    }
  },
  pageTitle__CKP: {
    color: "#334752",
    fontFamily: `'Pacifico', cursive`,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 25
  },
  priorityColor: {
    standard: "#96ED89",
    high: "#F2C36B",
    urgent: "#F26F63"
  },
});

export default theme;