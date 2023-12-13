// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/home',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Game',
    path: '/dashboard/game',
    icon: icon('ic_cart'),
  },
  {
    title: 'Avatar',
    path: '/dashboard/avatar',
    icon: icon('ic_blog'),
  },
  {
    title: 'Board',
    path: '/dashboard/board',
    icon: icon('ic_lock'),
  },
  {
    title: 'Payments',
    path: '/dashboard/payments',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
