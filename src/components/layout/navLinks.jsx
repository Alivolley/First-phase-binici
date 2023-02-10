import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { BlogIcon } from '../svgIcons/BlogIcon';
import { BudgetIcon } from '../svgIcons/BudgetIcon';
import { CRMIcon } from '../svgIcons/CRMIcon';
import { DashboardIcon } from '../svgIcons/DashboardIcon';
import { InboxIcon } from '../svgIcons/InboxIcon';
import { StoreIcon } from '../svgIcons/StoreIcon';

export const categoriesLinks = [
  {
    id: '1',
    name: 'store',
    icon: <StoreIcon />,
    label: 'فروشگاه',
  },
  {
    id: '2',
    name: 'inbox',
    icon: <InboxIcon />,
    label: 'صندوق ورودی',
  },
  {
    id: '3',
    name: 'CRM',
    icon: <CRMIcon />,
    label: 'سی آر ام',
  },
  {
    id: '4',
    name: 'budget',
    icon: <BudgetIcon />,
    label: 'صورتحساب',
  },
  {
    id: '5',
    name: 'blog',
    icon: <BlogIcon />,
    label: 'بلاگ',
  },
];

export const sidebarActionsLinks = [
  {
    id: '1',
    icon: <DashboardIcon />,
    label: 'داشبورد',
  },
  {
    id: '2',
    icon: <SearchRoundedIcon />,
    label: 'سرچ',
  },
];

export const navMenuLinks = [
  {
    id: '1',
    icon: <GroupOutlinedIcon />,
    label: 'مدیریت مکان ها',
    subLinks: [
      {
        id: '1',
        href: '/',
        label: 'مکان ها',
      },
      // {
      //   id: '2',
      //   href: '/productsList',
      //   label: 'ریپورت ها',
      // },
    ],
    pathes: ['/', '/reports'],
  },
  {
    id: '2',
    icon: <GroupOutlinedIcon />,
    label: 'مدیریت محصولات',
    subLinks: [
      {
        id: '1',
        href: '/productsList',
        label: 'محصولات',
      },
      // {
      //   id: '2',
      //   href: '/product',
      //   label: 'محصول',
      // },
    ],
    pathes: ['/productsList', '/product'],
  },
  {
    id: '3',
    icon: <GroupOutlinedIcon />,
    label: 'تنظیمات',
    subLinks: [
      {
        id: '1',
        href: '/productsSettings',
        label: 'تنظیمات محصولات',
      },
      {
        id: '2',
        href: '/groups',
        label: 'گروه ها',
      },
    ],
    pathes: ['/productsSettings', '/groups'],
  },
];
