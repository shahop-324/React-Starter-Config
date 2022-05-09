import { combineReducers } from "redux";
import authSlice from "./authSlice";
import snackbarSlice from "./snackbarSlice";
import notificationSlice from "./notificationSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import storeSlice from "./storeSlice";
import orderSlice from "./orderSlice";
import appSlice from "./appSlice";
import categorySlice from "./categorySlice";
import subCategorySlice from "./subCategorySlice";
import deliverySlice from "./deliverySlice";
import shipmentSlice from "./shipmentSlice";
import transactionSlice from "./transactionSlice";
import discountSlice from "./discountSlice";
import pageSlice from "./pagesSlice";
import referralSlice from "./referralSlice";
import marketingSlice from "./marketingSlice";
import customerSlice from "./customerSlice";
import reviewSlice from "./reviewSlice";
import questionSlice from "./questionsSlice";
import divisionSlice from "./divisionSlice";
import menuSlice from "./menuSlice";
import walletSlice from "./walletSlice";

export default combineReducers({
    auth: authSlice.reducer,
    snackbar: snackbarSlice.reducer,
    notification: notificationSlice.reducer,
    product: productSlice.reducer,
    user: userSlice.reducer,
    store: storeSlice.reducer,
    order: orderSlice.reducer,
    app: appSlice.reducer,
    category: categorySlice.reducer,
    subCategory: subCategorySlice.reducer,
    delivery: deliverySlice.reducer,
    shipment: shipmentSlice.reducer,
    transaction: transactionSlice.reducer,
    discount: discountSlice.reducer,
    page: pageSlice.reducer,
    referral: referralSlice.reducer,
    marketing: marketingSlice.reducer,
    customer: customerSlice.reducer,
    review: reviewSlice.reducer,
    question: questionSlice.reducer,
    division: divisionSlice.reducer,
    menu: menuSlice.reducer,
    wallet: walletSlice.reducer,
});