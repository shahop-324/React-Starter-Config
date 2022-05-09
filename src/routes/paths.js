// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
  mobileLogin: path(ROOTS_AUTH, '/mobile-login',),
  verifyMobile: path(ROOTS_AUTH, '/verify-mobile'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    home: path(ROOTS_DASHBOARD, '/home'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    delivery: path(ROOTS_DASHBOARD, '/delivery'),
    customer: path(ROOTS_DASHBOARD, '/customer'),
    marketing: path(ROOTS_DASHBOARD, '/marketing'),
    payment: path(ROOTS_DASHBOARD, '/payment'),
    discount: path(ROOTS_DASHBOARD, '/discount'),
    manage: path(ROOTS_DASHBOARD, '/manage'),
    questions: path(ROOTS_DASHBOARD, '/questions'),
    referral: path(ROOTS_DASHBOARD, '/refferal'),
    integration: path(ROOTS_DASHBOARD, '/integration'),
    reviews: path(ROOTS_DASHBOARD, '/reviews'),
    academy: path(ROOTS_DASHBOARD, '/academy'),
  },

  order: {
    root: path(ROOTS_DASHBOARD, '/order'),
    list: path(ROOTS_DASHBOARD, '/order/list'),
    abondonedCarts: path(ROOTS_DASHBOARD, '/order/abondoned-carts'),
  },

  catalouge: {
    root: path(ROOTS_DASHBOARD, '/catalouge'),
    product: path(ROOTS_DASHBOARD, '/catalouge/product'),
    category: path(ROOTS_DASHBOARD, '/catalouge/category'),
    subcategory: path(ROOTS_DASHBOARD, '/catalouge/sub-category'),
    // division: path(ROOTS_DASHBOARD, '/catalouge/division'),
    builder: path(ROOTS_DASHBOARD, '/catalouge/builder'),
  },
  store: {
    root: path(ROOTS_DASHBOARD, '/store'),
    settings: path(ROOTS_DASHBOARD, '/store/settings'),
    theme: path(ROOTS_DASHBOARD, '/store/theme'),
    pages: path(ROOTS_DASHBOARD, '/store/pages'),
    menus: path(ROOTS_DASHBOARD, '/store/menus'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
