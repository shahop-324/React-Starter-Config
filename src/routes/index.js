import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const storeSlugs = ['uncle-store', 'pal-store'];

  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'update-password', element: <UpdatePassword /> },
        { path: 'verify', element: <VerifyCode /> },
        { path: 'mobile-login', element: <VerifyLoginOTP /> },
        { path: 'verify-mobile', element: <VerifyRegistrationCodeForm /> },
      ],
    },
    // Dashboard Routes
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'home', element: <GeneralHome /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        {
          path: 'order',
          children: [
            { element: <Navigate to="/dashbord/order/list" replace />, index: true },
            { path: 'list', element: <GeneralOrders /> },
            { path: 'abondoned-carts', element: <GeneralAbondonedCarts /> },
          ],
        },
        { path: 'delivery', element: <GeneralDelivery /> },
        { path: 'customer', element: <GeneralCustomer /> },

        { path: 'marketing', element: <GeneralMarketing /> },
        { path: 'payment', element: <GeneralPayment /> },
        { path: 'discount', element: <GeneralDiscount /> },
        { path: 'manage', element: <GeneralManage /> },
        { path: 'questions', element: <GeneralQuestion /> },
        { path: 'refferal', element: <GeneralReferral /> },
        { path: 'integration', element: <GeneralIntegration /> },
        { path: 'reviews', element: <GeneralReviews /> },
        // { path: 'academy', element: <GeneralAcademy /> },
        {
          path: 'catalouge',
          children: [
            { element: <Navigate to="/dashboard/catalouge/product" replace />, index: true },
            { path: 'product', element: <EcommerceProductList /> },
            { path: 'category', element: <GeneralCategory /> },
            { path: 'sub-category', element: <GeneralSubCategory /> },
            // { path: 'division', element: <GeneralDivision /> },
            { path: 'builder', element: <GeneralCatalougeBuilder /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
            { path: ':id/edit', element: <InvoiceEdit /> },
            { path: 'new', element: <InvoiceCreate /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new', element: <BlogNewPost /> },
          ],
        },
        {
          path: 'store',
          children: [
            { element: <Navigate to="/dashboard/store/settings" replace />, index: true },
            { path: 'settings', element: <StoreProfile /> },
            { path: 'theme', element: <StoreTheme /> },
            { path: 'pages', element: <StorePages /> },
            { path: 'menus', element: <StoreMenus /> },
          ],
        },
      ],
    },
    // Store Routes
    {
      path: '*',
      element: <StoreHeader />,
      children: storeSlugs.map((el) => ({
        path: el,
        children: [
          { element: <Navigate to={`home`} replace />, index: true },
          { path: '*', element: <StoreHome /> },
          { path: 'catalouge', element: <StoreCatalouge /> },
          { path: 'bag', element: <EcommerceCheckout /> },
          { path: 'product/*', element: <EcommerceProductDetails /> },
          { path: 'account', element: <StoreAccount /> },
          { path: 'wishlist', element: <StoreWishlist /> },
          { path: 'offers', element: <StoreOffers /> },
        ],
      })),
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'pricing', element: <Pricing /> },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
        { path: 'terms-of-service', element: <TermsOfService /> },
        { path: 'privacy-policy', element: <PrivacyPolicy /> },
        { path: 'refund-policy', element: <RefundPolicy /> },
        { path: 'connect-mailchimp', element: <MailchimpConnect /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const UpdatePassword = Loadable(lazy(() => import('../pages/auth/UpdatePassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));
// Dashboard
const GeneralHome = Loadable(lazy(() => import('../pages/dashboard/GeneralHome')));

const GeneralOrders = Loadable(lazy(() => import('../pages/dashboard/GeneralOrders')));
const GeneralDelivery = Loadable(lazy(() => import('../pages/dashboard/GeneralDelivery')));
const GeneralCustomer = Loadable(lazy(() => import('../pages/dashboard/GeneralCustomer')));
const GeneralMarketing = Loadable(lazy(() => import('../pages/dashboard/GeneralMarketing')));
const GeneralPayment = Loadable(lazy(() => import('../pages/dashboard/GeneralPayment')));
const GeneralDiscount = Loadable(lazy(() => import('../pages/dashboard/GeneralDiscount')));
const GeneralReferral = Loadable(lazy(() => import('../pages/dashboard/GeneralRefferal')));
const GeneralQuestion = Loadable(lazy(() => import('../pages/dashboard/GeneralQuestions')));
const GeneralManage = Loadable(lazy(() => import('../pages/dashboard/GeneralManage')));
const GeneralIntegration = Loadable(lazy(() => import('../pages/dashboard/GeneralIntegration')));
const GeneralAbondonedCarts = Loadable(lazy(() => import('../pages/dashboard/GeneralAbondonedCarts')));
const GeneralReviews = Loadable(lazy(() => import('../pages/dashboard/GeneralReviews')));
// const GeneralAcademy = Loadable(lazy(() => import('../pages/dashboard/GeneralAcademy')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const GeneralCategory = Loadable(lazy(() => import('../pages/dashboard/GeneralCategory')));
const GeneralSubCategory = Loadable(lazy(() => import('../pages/dashboard/GeneralSubCategory')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// Store
const StoreHeader = Loadable(lazy(() => import('../layouts/store/storeHeader')));
const StoreCatalouge = Loadable(lazy(() => import('../layouts/store/StoreCatalouge')));
const StoreHome = Loadable(lazy(() => import('../layouts/store/storeHome')));
const StoreAccount = Loadable(lazy(() => import('../layouts/store/storeAccount')));
const StoreWishlist = Loadable(lazy(() => import('../layouts/store/storeWishlist')));
const StoreOffers = Loadable(lazy(() => import('../layouts/store/storeOffers')));

//
const GeneralCatalougeBuilder = Loadable(lazy(() => import('../pages/dashboard/GeneralCatalougeBuilder')));

const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));

// Store Settings Dashboard

const StoreProfile = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const StoreTheme = Loadable(lazy(() => import('../pages/dashboard/Store/StoreWebsite')));
const StorePages = Loadable(lazy(() => import('../pages/dashboard/Store/StorePages')));
const StoreMenus = Loadable(lazy(() => import('../pages/dashboard/Store/StoreMenus')));

const TermsOfService = Loadable(lazy(() => import('../pages/TermsOfService')));
const PrivacyPolicy = Loadable(lazy(() => import('../pages/PrivacyPolicy')));
const RefundPolicy = Loadable(lazy(() => import('../pages/RefundPolicy')));

const MailchimpConnect = Loadable(lazy(() => import('../pages/MailchimpConnect')));
const VerifyLoginOTP = Loadable(lazy(() => import('../pages/auth/VerifyLoginOTP')));
const VerifyRegistrationCodeForm = Loadable(lazy(() => import('../pages/auth/VerifyRegistrationOTP')));

// INVOICE
const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// BLOG
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
