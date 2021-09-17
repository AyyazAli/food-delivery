import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, restrictTo, ...restOfProps }) => {
    const isAuthenticated = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("role");
    if (restrictTo) {
        if (role !== restrictTo) {
            return (<Route
                {...restOfProps}
                render={(props) => <Redirect to="/not-authorized" />}
            />)
        }
    }
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default ProtectedRoute;