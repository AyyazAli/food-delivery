import React, { lazy } from 'react';
import { Redirect } from 'react-router';

const routes = [
    {
        path: '/',
        exact: true,
        component: lazy(()=>import('./views/Presentation'))
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
    {
        path: '/owner/orders',
        isProtected: true,
        exact: true,
        restrictTo: 'owner',
        component: lazy(() => import('./views/orders/orders'))
    },
    {
        path: '/owner/orders/:id',
        isProtected: true,
        exact: true,
        restrictTo: 'owner',
        component: lazy(() => import('./views/orders/single-order'))
    },
    {
        path: '/owner/users',
        isProtected: true,
        exact: true,
        restrictTo: 'owner',
        component: lazy(() => import('./views/users/users'))
    },
    // User Routes
    {
        path: '/restaurants',
        isProtected: true,
        exact: true,
        restrictTo: 'user',
        component: lazy(() => import('./views/restaurants/restaurants'))
    },
    {
        path: '/restaurants/:id',
        isProtected: true,
        exact: true,
        restrictTo: 'user',
        component: lazy(() => import('./views/restaurants/single-restaurant'))
    },
    {
        path: '/cart',
        isProtected: true,
        exact: true,
        restrictTo: 'user',
        component: lazy(() => import('./views/cart/cart'))
    },
    {
        path: '/orders',
        isProtected: true,
        exact: true,
        restrictTo: 'user',
        component: lazy(() => import('./views/orders/orders'))
    },
    {
        path: '/orders/:id',
        isProtected: true,
        exact: true,
        restrictTo: 'user',
        component: lazy(() => import('./views/orders/single-order'))
    },
    {
        path: '/not-authorized',
        exact: true,
        component: lazy(() => import('./views/auth/not-authorized'))
    },
    {
        component: () => "Not FOund"
    }


];

export default routes;
