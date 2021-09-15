import React, { lazy } from 'react';

const routes = [
    {
        path: '/',
        exact: true,
        component: () => "home component"
    },
    {
        path: '/login',
        exact: true,
        component: lazy(() => import('./views/auth/sign-in.js'))
    },
    {
        path: '/sign-up',
        exact: true,
        component: lazy(() => import('./views/auth/sign-up.js'))
    }
];

export default routes;
