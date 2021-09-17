import React, { lazy } from 'react';
import { Redirect } from 'react-router';

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
    },
    {
        path: '/owner/restaurants',
        isProtected: true,
        exact: true,
        restrictTo: 'owner',
        component: lazy(() => import('./views/restaurants/restaurants'))
    },
    {
        path: '/owner/create-restaurant',
        isProtected: true,
        exact: true,
        restrictTo: 'owner',
        component: lazy(() => import('./views/restaurants/create-restaurant'))
    },
    {
        path: '/restaurants',
        isProtected: true,
        exact: true,
        component: lazy(() => import('./views/restaurants/restaurants'))
    },
    {
        path: '/not-authorized',
        exact: true,
        component: lazy(() => import('./views/auth/not-authorized'))
    },
    {
        component: () => <Redirect to="/not-authorized" />
    }


];

export default routes;
