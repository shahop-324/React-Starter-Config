// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  // Define auth paths here
};

export const PATH_PAGE = {
  problem1: '/problem-1',
  problem2: '/problem-2',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  // Define Nested Routing For Complete Guarded application pages here
};
