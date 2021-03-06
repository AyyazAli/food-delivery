import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import { AttachMoney, Check, Delete, Edit, Label, Receipt } from '@material-ui/icons';
import Layout from 'layouts/layout';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemFromCart, resetCart } from 'store/actions';
import axiosInstance from 'utils/axiosInstance';


const CartPage = ({history}) => {

    const cartState = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const placeOrder = () => {
        const mealIds = cartState.items.map(singleItem => singleItem._id)
        // Only Place order if there are items in cart
        if (cartState.count > 0) {
            axiosInstance.post('/order', {
                meals: mealIds,
                totalPrice: cartState.totalPrice,
                restaurant: cartState.restaurant,
                count: cartState.count
            }).then(response => {
                dispatch(resetCart())
                history.push('/orders')
            })
        }
    }

    return (
        <Layout title="Cart">
            <Card        >
                <CardHeader title="Review Your Order" />
                <Divider />
                <CardContent >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">
                                                Item Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                Price
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    {
                                        cartState.items.map((singleItem, index) =>
                                            <TableRow selected={index % 2 === 0 ? true : false} key={index}>
                                                <TableCell>{singleItem.name}</TableCell>
                                                <TableCell>$ {singleItem.price}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => { dispatch(deleteItemFromCart(index)) }}>
                                                        <Delete />
                                                    </IconButton>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h4" color="primary">
                                        Restaurant: {cartState.restaurant?.name}
                                    </Typography>
                                    <Typography variant="h6">
                                        Total Items: {cartState.count}
                                    </Typography>
                                    <Typography variant="h6">
                                        Total Price: $ {cartState.totalPrice}
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Button onClick={placeOrder} fullWidth variant="contained" color="primary">
                                        Place Order
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default CartPage;