import * as actionCreators from "./index";
import axios from "axios";

export const shoppius_isLoading = (isLoading) => ({
	type: "[SHOPPIUS] IS_LOADING",
	isLoading,
});

export const set_shoppius_inventory = (inventory) => ({
	type: "[SHOPPIUS] SET_INVENTORY",
	inventory,
});
export const set_shoppius_cart = (cart) => ({
	type: "[SHOPPIUS] SET_CART",
	cart,
});
export const set_shoppius_customer_fields = (field, value) => ({
	type: "[SHOPPIUS] SET_CUSTOMER_FIELDS",
	field,
	value,
});

export const getShoppiusInventory = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(shoppius_isLoading(true));
			//get all inv items
			const result = await axios.get(process.env.REACT_APP_NODE_URL + "/api/shoppius/inventory");
			//set items in r
			dispatch(set_shoppius_inventory(result.data.inventory));
		} catch (error) {
			// console.log("shoppius actions [getShoppiusInventory] :", error);
			dispatch(
				actionCreators.showErrorModal(error.response.data.message || "Something went wrong"),
			);
		} finally {
			dispatch(shoppius_isLoading(false));
		}
	};
};

export const getShoppiusCart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(shoppius_isLoading(true));
			//get all inv items
			const result = await axios.get(process.env.REACT_APP_NODE_URL + "/api/shoppius/cart");
			//set items in r
			dispatch(set_shoppius_cart(result.data.cart));
		} catch (error) {
			// console.log("shoppius actions [getShoppiusCart] :", error);
			dispatch(
				actionCreators.showErrorModal(error.response.data.message || "Something went wrong"),
			);
		} finally {
			dispatch(shoppius_isLoading(false));
		}
	};
};

export const addToShoppiusCart = (itemId, name) => {
	return async (dispatch, getState) => {
		try {
			dispatch(shoppius_isLoading(true));
			const data = {
				itemId,
				name,
			};
			const result = await axios.post(process.env.REACT_APP_NODE_URL + "/api/shoppius/cart", data);
			// console.log("[addToShoppiusCart] result ->", result);
			//reload for items in basket
			dispatch(actionCreators.getShoppiusCart());
			dispatch(actionCreators.showSnackbar(`${name} added to cart!`));
		} catch (error) {
			// console.log("shoppius actions [addToShoppiusCart] :", error);
			dispatch(
				actionCreators.showErrorModal(error.response.data.message || "Something went wrong"),
			);
		} finally {
			dispatch(shoppius_isLoading(false));
		}
	};
};

export const removeFromShoppiusCart = (itemId, name) => {
	return async (dispatch, getState) => {
		try {
			dispatch(shoppius_isLoading(true));
			const data = {
				itemId,
			};
			const result = await axios.put(process.env.REACT_APP_NODE_URL + "/api/shoppius/cart", data);
			// console.log("[addToShoppiusCart] result ->", result);
			//reload for items in basket
			dispatch(actionCreators.getShoppiusCart());
			dispatch(actionCreators.showSnackbar(`${name} removed from cart!`));
		} catch (error) {
			// console.log("shoppius actions [removeFromShoppiusCart] :", error);
			dispatch(
				actionCreators.showErrorModal(error.response.data.message || "Something went wrong"),
			);
		} finally {
			dispatch(shoppius_isLoading(false));
		}
	};
};

export const applyCouponCode = (codeName) => {
	return async (dispatch, getState) => {
		try {
			dispatch(shoppius_isLoading(true));
			const data = {
				codeName: codeName.toUpperCase(),
			};
			const result = await axios.post(
				process.env.REACT_APP_NODE_URL + "/api/shoppius/coupon",
				data,
			);
			// console.log("[addToShoppiusCart] result ->", result)
			////reload for items in basket
			dispatch(actionCreators.getShoppiusCart());
			dispatch(actionCreators.showSnackbar(`${codeName} promo code applied!`));
		} catch (error) {
			// console.log("shoppius actions [applyCouponCode] :", error);
			dispatch(
				actionCreators.showErrorModal(error.response.data.message || "Something went wrong"),
			);
		} finally {
			dispatch(shoppius_isLoading(false));
		}
	};
};

export const clearCuponCodes = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(shoppius_isLoading(true));

			const result = await axios.delete(process.env.REACT_APP_NODE_URL + "/api/shoppius/coupon");
			// console.log("[addToShoppiusCart] result ->", result)
			////reload for items in basket
			dispatch(actionCreators.getShoppiusCart());
			dispatch(actionCreators.showSnackbar(`Promo codes cleared!`));
		} catch (error) {
			// console.log("shoppius actions [clearCuponCodes] :", error);
			dispatch(
				actionCreators.showErrorModal(error.response.data.message || "Something went wrong"),
			);
		} finally {
			dispatch(shoppius_isLoading(false));
		}
	};
};

// exported helper method to calculate total from cart - including promo codes discount
export const calculateTotalWithPromosHelper = (cart) => {
	let newTotal = cart[0].total;
	//first apply "value" codes (e.g. 20EUROFF)
	cart[0].appliedCodes.filter(code => !code.isPercentage).forEach((element) => {
		newTotal -= element.value;

	});
	//then apply percantage codes (e.g. 5%OFF)
	cart[0].appliedCodes.filter(code => code.isPercentage).forEach((element) => {
		newTotal *= ((100 - element.value) / 100);

	});
	if (newTotal < 0) {
		newTotal = 0;
		return newTotal;
	} else {
		return newTotal.toFixed(2);
	}
};

//clear shopping cart
export const clearShoppingCart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(shoppius_isLoading(true));
			const result = await axios.delete(process.env.REACT_APP_NODE_URL + "/api/shoppius/cart");
			dispatch(actionCreators.getShoppiusCart());
		} catch (error) {
			// console.log("shoppius actions [clearShoppingCart] :", error);
			dispatch(
				actionCreators.showErrorModal(error.response.data.message || "Something went wrong"),
			);
		} finally {
			dispatch(shoppius_isLoading(false));
		}
	};
};


