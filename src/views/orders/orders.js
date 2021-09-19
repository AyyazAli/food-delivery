import Layout from 'layouts/layout';
import React, { useEffect, useState } from 'react'
import axiosInstance from 'utils/axiosInstance'
import { useSelector } from 'react-redux'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const authState = useSelector(state => state.auth)
    const owner = authState.role === "owner"
    useEffect(() => {
        axiosInstance.get('/order').then(response => {
            setOrders(response.data.data)
        })
    }, [])

    return (
        <Layout title="Orders">
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
                        <TableCell >Restaurant</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((oneOrder, index) => (
                        <TableRow selected={index % 2 === 0 ? true : false} key={index}>
                            <TableCell>{oneOrder.user?.firstName} {oneOrder.user?.lastName}</TableCell>
                            {owner ? <TableCell>{oneOrder.user?.email}</TableCell> : ""}
                            <TableCell>$ {oneOrder?.total}</TableCell>
                            <TableCell>{oneOrder?.status}</TableCell>
                            <TableCell>{oneOrder?.restaurant.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Layout>
    )
}

export default Orders;