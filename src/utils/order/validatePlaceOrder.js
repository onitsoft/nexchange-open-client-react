import { getPostponedOrder, removePostponedOrder, savePostponedOrder } from './postponedOrder';
import { isUserResidenceLocationLegal } from '../restrictedCountires/restirctionCheck';
import { isUserAuthenticated, isResidenceLocationMissing } from '../user/authChecks';

const PlaceOrderFailureReason = {
  NOT_AUTH: 'NOT_AUTH', // -> to sign up
  MISSING_RESIDENCE_LOCATION: 'MISSING_RESIDENCE_LOCATION', // -> set residence location
  RESTRICTED_RESIDENCE_LOCATION: 'RESTRICTED_RESIDENCE_LOCATION', // -> show error modal
};

const handleAuthorizationToPlaceOrder = async ({ loadUserDetails }) => {
  if (!isUserAuthenticated()) {
    return {
      isUserAuthorizedToPlaceOrder: false,
      placeOrderFailureReason: PlaceOrderFailureReason.NOT_AUTH,
    };
  }

  const userData = await loadUserDetails();

  if (isResidenceLocationMissing(userData.username)) {
    return {
      isUserAuthorizedToPlaceOrder: false,
      placeOrderFailureReason: PlaceOrderFailureReason.MISSING_RESIDENCE_LOCATION,
      userData,
    };
  }

  if (!isUserResidenceLocationLegal(userData.residenceLocation)) {
    removePostponedOrder();
    return {
      isUserAuthorizedToPlaceOrder: false,
      placeOrderFailureReason: PlaceOrderFailureReason.RESTRICTED_RESIDENCE_LOCATION,
      userData,
    };
  }

  return { isUserAuthorizedToPlaceOrder: true, userData };
};

const handlePlaceOrderValidation = async ({ loadUserDetails, submittedOrderData }) => {
  savePostponedOrder(submittedOrderData);
  const { isUserAuthorizedToPlaceOrder, placeOrderFailureReason, userData } = await handleAuthorizationToPlaceOrder({ loadUserDetails });

  return {
    isUserAuthorizedToPlaceOrder,
    placeOrderFailureReason,
    userData
  };
};

const resumeToAuthOrder = async (history, loadUserDetails, redirectRouteOnError = '/') => {
  const postponedOrderData = getPostponedOrder();

  if (!postponedOrderData) {
    console.error('There is no order to resume in.');
    history.push(redirectRouteOnError);
    return;
  }

  await handlePlaceOrderValidation({ submittedOrderData: postponedOrderData, loadUserDetails} );
};

export { PlaceOrderFailureReason, resumeToAuthOrder, handlePlaceOrderValidation };
