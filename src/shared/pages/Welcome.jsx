import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import "./Welcome.css";

const Welcome = () => {
	const history = useHistory();
	return ( 
		<div className="background">
			<div className="title__container">
				<div className="title">WELCOME TO SHOPPIUS EXPERIENCE</div>
				<div className="subtitle">- Kodius ability task  -</div>
				<Button style={{marginTop:20, marginBottom:90}} onClick={()=>history.push("/test")} variant="contained" size="large" color="secondary" endIcon={<ShoppingBasketIcon />}>Let's start exploring</Button>
				<div className="signature">Developed by Krešimir Prlić </div>
			</div>
		</div>
	);
};

export default Welcome;
