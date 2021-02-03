const throttled = {};
const throttle = ({ dispatch, getState }) => (next) => (action) => {
	const time = action.meta && action.meta.throttle;
	if (!time) {
		return next(action);
	}

	//ignore the action if it's already throttled
	if (throttled[action.type]) {
		return;
	}
	throttled[action.type] = true;

	setTimeout(() => {
		throttled[action.type] = false;
   }, time);
   
   return next(action)
};
export default throttle;
