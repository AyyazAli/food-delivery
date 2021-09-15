import React, { Suspense } from 'react'
import { Route } from 'react-router'
import ProtectedRoute from '../protectedRoute/protectedRoute'
import PropTypes from 'prop-types'
import { CircularProgress } from '@material-ui/core'

const RenderRoutes = ({ routes }) => {
    return (
        <Suspense fallback={<CircularProgress style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
            top: "50%",
            margin: "auto",
            height: "100%"
        }} 
        color="primary" />}>
            {
                routes.map(({ path, exact, component, isProtected = false }, index) => {
                    console.log({ path, exact, component, isProtected })
                    return isProtected
                        ? <ProtectedRoute
                            path={path}
                            exact={exact}
                            component={component}
                            key={index} />
                        : <Route
                            path={path}
                            exact={exact}
                            component={component}
                            key={index} />
                })
            }
        </Suspense>
    )
}

RenderRoutes.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string,
        exact: PropTypes.bool,
        component: PropTypes.any,
        isProtected: PropTypes.bool
    })).isRequired,
}

export default RenderRoutes;