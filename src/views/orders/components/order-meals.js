import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react'

const OrderMeals = ({ order }) => {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {order?.meals.map((singleMeal, index) => (
                    <TableRow key={index}>
                        <TableCell>{singleMeal.name}</TableCell>
                        <TableCell>{singleMeal.price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}


export default OrderMeals;