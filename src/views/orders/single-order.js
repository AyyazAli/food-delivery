import { Card, CardContent, CardHeader, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import Layout from 'layouts/layout';
import React, { useEffect, useState } from 'react'
import axiosInstance from 'utils/axiosInstance';
import OrderHistory from './components/order-history';
import OrderMeals from './components/order-meals';
import StatusChanger from './components/status-changer';

const SingleOrder = ({ match }) => {
    const [order, setOrder] = useState()
    useEffect(() => {
        axiosInstance.get(`/order/${match.params.id}`).then(response => {
            setOrder(response.data.data)
        })
    }, [])

    const statusChangeHandler = (status) => {
        axiosInstance.patch(`/order/${match.params.id}`, { status }).then(response => {
            setOrder({
                ...order,
                status: response.data.order.status
            })
        })
    }
    return (
        <Layout title={`Order Details`}>
            <Card>
                <CardHeader action={<StatusChanger status={order?.status} onChangeHandler={statusChangeHandler} />} />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography >Name: {`${order?.user.firstName} ${order?.user.lastName}`}</Typography>
                            <Typography >Email: {order?.user.email}</Typography>
                            <Typography >Restaurant: {order?.restaurant.name}</Typography>
                            <Typography > Status: {order?.status.toUpperCase()} </Typography>
                            <Typography >Total Items: {order?.count}</Typography>
                            <Typography >Total Price: $ {order?.total}</Typography>
                            <Typography >Date:{(new Date(order?.createdAt).getMonth() + 1) + "-" + new Date(order?.createdAt).getDate() + "-" + new Date(order?.createdAt).getFullYear()}</Typography>
                            <Typography variant="h3" color="primary">
                                Meals
                            </Typography>
                            <OrderMeals order={order} />
                            <Typography variant="h3" color="primary">
                                Order History
                            </Typography>
                            <OrderHistory order={order} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Layout>

    )
}

export default SingleOrder;