
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  
  {
    title: 'Features',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: '#features',
  },
  // {
  //   title: 'Pricing',
  //   icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
  //   path: '/pricing',
  // },
  {
    title: 'Login',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: '/auth/login',
  },
];

export default menuConfig;
