import React from 'react'
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index"
import { makeStyles, List, ListItem, ListItemText, ListItemIcon, Button } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import AndroidIcon from '@material-ui/icons/Android';




const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
        marginTop:20,
    },
   
    navLink: {
        textDecoration: "none",
        color:theme.palette.grey[900]
    },
    activeLink: {
        fontWeight: "bold",
        color: "grey"
    },

    icon:{
        color:theme.palette.primary.main,
    },

    bottomActions:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        marginTop:30
    }
}));

const NavLinks = (props) => {
    const classes = useStyles();
    return (
        <div
            className={classes.list}
            onClick={props.closeDrawerHandler}
            onKeyDown={props.closeDrawerHandler}
        >
            <List>
                {/* test */}
                <NavLink
                    exact
                    activeClassName={classes.activeLink}
                    className={classes.navLink} to="/test">
                    <ListItem button>
                        <ListItemIcon>
                            <AndroidIcon className={classes.icon}/>
                        </ListItemIcon>
                        <ListItemText primary="Shop" />
                    </ListItem>
                </NavLink>
                
            </List>
            <div className={classes.bottomActions}>
            <Button onClick={props.onLogout}  color="secondary">Logout</Button>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    onLogout:()=>dispatch(actionCreators.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavLinks);
