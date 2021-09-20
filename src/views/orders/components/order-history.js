import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
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
                        <TableCell>
                            <Typography>
                                Date: {singleHistory.date.split("T")[0]}
                            </Typography>
                            <Typography>
                                Time: {singleHistory.date.split("T")[1].split(".")[0]}
                            </Typography>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default OrderHistory;