import { AppNavigator } from '../components/AppNavigator';

const { router } = AppNavigator;
const mainNavAction = router.getActionForPathAndParams('Main');
const initialNavState = router.getStateForAction(mainNavAction);

const NavReducer = (state = initialNavState, action) => router.getStateForAction(action, state);

export default NavReducer;
