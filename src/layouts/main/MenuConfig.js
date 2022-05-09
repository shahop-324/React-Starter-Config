
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
    title: 'Problem 1',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: '/problem-1',
  },
  {
    title: 'Problem 2',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: '/problem-2',
  },
];

export default menuConfig;
