import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react'

const OrderHistory = ({ order }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {order?.orderHistory.map((singleHistory, index) => (
                    <TableRow key={index}>
                        <TableCell>{singleHistory.message}</TableCell>
                        <TableCell> {Date(singleHistory.date)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default OrderHistory;