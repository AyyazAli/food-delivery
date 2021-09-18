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
        path: '/owner/restaurants/:id',
        isProtected: true,
        restrictTo: 'owner',
        exact: true,
        component: lazy(() => import('./views/restaurants/single-restaurant'))
    },
    {
        path: '/owner/create-restaurant',
        isProtected: true,
        exact: true,
        restrictTo: 'owner',
        component: lazy(() => import('./views/restaurants/create-restaurant'))
    },
    {
        path: '/owner/create-meal',
        isProtected: true,
        exact: true,
        restrictTo: 'owner',
        component: lazy(() => import('./views/restaurants/meals/create-meal/create-meal'))
    },
    // User Routes
    {
        path: '/restaurants',
        isProtected: true,
        exact: true,
        component: lazy(() => import('./views/restaurants/restaurants'))
    },
    {
        path: '/restaurants/:id',
        isProtected: true,
        exact: true,
        component: lazy(() => import('./views/restaurants/single-restaurant'))
    },
    {
        path: '/cart',
        isProtected: true,
        exact: true,
        component: lazy(() => import('./views/cart/cart'))
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
