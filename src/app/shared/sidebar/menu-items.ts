import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Admin',
        icon: '',
        class: 'nav-small-cap',
        label: '',
        labelClass: '',
        extralink: true,
        submenu: []
    },
    {
        path: '/component/list-user',
        title: 'User',
        icon: 'mdi mdi-account',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/list-post',
        title: 'Post',
        icon: 'mdi mdi-equal',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/list-item',
        title: 'Purchase',
        icon: 'mdi mdi-library-books',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/list-comment',
        title: 'Comments',
        icon: 'mdi mdi-comment-multiple-outline',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    }
];
