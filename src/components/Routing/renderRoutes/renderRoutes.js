import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router'
import ProtectedRoute from '../protectedRoute/protectedRoute'
import PropTypes from 'prop-types'
import { CircularProgress } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { autoAuthenticate } from 'store/actions'

const RenderRoutes = ({ routes }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(autoAuthenticate())
    }, [])

    return (
        <Suspense fallback={<CircularProgress style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginTop: "50%",
            margin: "auto",
            height: "100%"
        }}
            color="primary" />}>
            <Switch>

                {
                    routes.map(({ path, exact, component, isProtected = false, restrictTo }, index) => {
                        return isProtected
                            ? <ProtectedRoute
                                path={path}
                                exact={exact}
                                component={component}
                                key={index}
                                restrictTo={restrictTo} />
                            : <Route
                                path={path}
                                exact={exact}
                                component={component}
                                key={index} />
                    })
                }
            </Switch>
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