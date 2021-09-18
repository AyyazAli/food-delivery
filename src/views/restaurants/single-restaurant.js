import React, { Fragment, useEffect, useState } from 'react'
import Layout from 'layouts/layout'
import axiosInstance from 'utils/axiosInstance'
import AppBackdrop from 'components/backdrop/backdrop'
import { Button, Card, CardContent, colors, Dialog, DialogActions, DialogContent, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { Add, AddCircle, Delete } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, cartRestaurant, resetCart } from 'store/actions'

const SingleRestaurant = ({ match, history }) => {
    const restaurantId = match.params.id;
    const [restaurant, setRestaurant] = useState()
    const [loading, setLoading] = useState(false)
    const [meals, setMeals] = useState([])
    const [restaurantChangeDialog, setRestaurantChangeDialog] = useState(false)
    const authState = useSelector(state => state.auth)
    const cartState = useSelector(state => state.cart)
    const owner = authState.role === "owner";
    const dispatch = useDispatch();

    const addToCart = (item) => {
        dispatch(addItemToCart(item))
    }
    const handleCreateMeal = () => {
        history.push({
            pathname: '/owner/create-meal',
            search: `?name=${restaurant.name}&restaurantId=${restaurantId}`
        })
    }

    const deleteMeal = async (id) => {
        await axiosInstance.delete(`/meal/${id}`)
        setMeals(meals.filter(oneMeal => oneMeal._id !== id))
    }

    useEffect(() => {
        setLoading(true)
        axiosInstance.get(`/restaurant/${restaurantId}`).then(response => {
            setLoading(false)
            if (!owner) {
                setRestaurant(response.data.data)
                if (cartState.restaurant && (cartState.restaurant?.id !== restaurantId)) {
                    dispatch(resetCart())
                    setRestaurantChangeDialog(true)
                }
                dispatch(cartRestaurant(
                    {
                        id: response.data.data._id,
                        name: response.data.data.name
                    }
                ))
            }
        })
    }, [])

    useEffect(() => {
        axiosInstance.get(`/meal`, {
            params: {
                restaurant: restaurantId
            }
        }).then(response => {
            setMeals(response.data.data)
        })
    }, [restaurant])

    return (
        <Fragment>
            <AppBackdrop open={loading} />
            <Layout
                title={restaurant?.name}
                topButton={owner ? { text: "Create Meal", action: handleCreateMeal } : undefined}
            >
                <Dialog open={restaurantChangeDialog}>
                    <DialogContent>
                        You can only order from one restaurant at a single time. All of the items from your cart has been deleted. You can now add new items from this restaurant. Thanks
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={() => setRestaurantChangeDialog(false)}>
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid container spacing={1} >
                    {
                        meals.map((singleMeal, index) =>
                            <Grid item md={3} xs={12} key={index}>
                                <Card style={{ height: "120px" }}>
                                    <CardContent>
                                        <Grid container item xs={12}>
                                            <Grid item xs={9}>
                                                <Typography variant="h6">
                                                    {singleMeal.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {singleMeal.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="h6" style={{ color: colors.green[500] }}>
                                                    $ {singleMeal.price}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => owner ? deleteMeal(singleMeal._id) : addToCart(singleMeal)}
                                                    style={{ float: "right" }} >
                                                    {owner ? <Delete /> : <AddCircle />}
                                                </IconButton>
                                            </Grid>

                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>


            </Layout>
        </Fragment>
    )
}

export default SingleRestaurant;