import React from 'react'
import { makeStyles, Drawer} from '@material-ui/core';

import drawerImage from "../../../assets/images/pexels-pineaple.jpeg"
import NavLinks from './NavLinks';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    imageContainer: {
        height: 200,
        width: 250,
        display: "block",
        background:`url(${drawerImage})`,
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat"
    },
    paper: {
        background: theme.palette.grey[200],
        color: theme.palette.primary.main
    },
    drawerImage: {
        maxWidth: "100%",
        maxHidth: "100%",
    },
    
}));

const DrawerNav = React.forwardRef(
    (props, ref) => {
        const classes = useStyles();
       

        return (
            <div ref={ref} className={classes.list}>
                <Drawer classes={{ paper: classes.paper }} anchor={"left"} open={props.isOpen} onClose={props.closeDrawerHandler}>
                    <div className={classes.imageContainer}>
                    </div>
                    {/* <Divider /> */}
                    <NavLinks closeDrawerHandler={props.closeDrawerHandler} />
                </Drawer>
            </div>
        )
    }

)

export default DrawerNav
