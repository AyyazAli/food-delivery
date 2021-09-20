import Layout from 'layouts/layout';
import React, { Fragment, useEffect, useState } from 'react'
import axiosInstance from 'utils/axiosInstance'
import { useSelector } from 'react-redux'
import { Table, TableHead, TableRow, TableCell, TableBody, Card, CardHeader, Chip } from '@material-ui/core'
import AppBackdrop from 'components/backdrop/backdrop';
import StatusChanger from './components/status-changer';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([])
    const authState = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false);
    const owner = authState.role === "owner"
    useEffect(() => {
        setLoading(true)
        axiosInstance.get('/order').then(response => {
            setOrders(response.data.data)
            setLoading(false)
        })
    }, [])

    const statusChangeHandler = (id, status) => {
        axiosInstance.patch(`/order/${id}`, { status }).then(response => {
            const index = orders.findIndex(oneOrder => oneOrder._id === response.data.order._id)
            const oldOrders = [...orders]
            oldOrders[index].status = response.data.order.status;
            setOrders(oldOrders)


        })
    }

    return (
        <Fragment>
            <AppBackdrop open={loading} />
            <Layout title="Orders">
                {!loading ?
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >Name</TableCell>
                                {owner ?
                                    <TableCell >Email</TableCell>
                                    : ""
                                }
                                <TableCell >Total</TableCell>
                                <TableCell >Status</TableCell>
                                <TableCell >Date</TableCell>
                                <TableCell >Restaurant</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((oneOrder, index) => (
                                <TableRow key={index} selected={index % 2 === 0 ? true : false}>
                                    <TableCell>
                                        <Link to={(owner ? '/owner' : "") + `/orders/${oneOrder._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                            {oneOrder.user?.firstName} {oneOrder.user?.lastName}
                                        </Link>
                                    </TableCell>
                                    {owner ? <TableCell>{oneOrder.user?.email}</TableCell> : undefined}
                                    <TableCell>$ {oneOrder?.total}</TableCell>
                                    <TableCell>
                                        <Chip color="primary" label={oneOrder?.status.toUpperCase()} />
                                    </TableCell>
                                    <TableCell>{
                                        (new Date(oneOrder?.createdAt).getMonth() + 1) + "-" + new Date(oneOrder?.createdAt).getDate() + "-" + new Date(oneOrder?.createdAt).getFullYear()
                                    }</TableCell>
                                    <TableCell>{oneOrder.restaurant?.name}</TableCell>
                                    <TableCell>
                                        <StatusChanger status={oneOrder?.status} onChangeHandler={(status) => statusChangeHandler(oneOrder?._id, status)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    : ""
                }
            </Layout>
        </Fragment>
    )
}

export default Orders;