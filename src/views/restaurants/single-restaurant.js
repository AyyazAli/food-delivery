import React, { Fragment, useEffect, useState } from 'react'
import OwnerLayout from 'layouts/owner-layout/owner-layout'
import axiosInstance from 'utils/axiosInstance'
import AppBackdrop from 'components/backdrop/backdrop'
import { Card, CardContent, colors, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

const SingleRestaurant = ({ match, history }) => {
    const restaurantId = match.params.id;
    const [restaurant, setRestaurant] = useState()
    const [loading, setLoading] = useState(false)
    const [meals, setMeals] = useState([])

    const handleCreateMeal = () => {
        history.push({
            pathname: '/owner/create-meal',
            search: `?name=${restaurant.name}&restaurantId=${restaurantId}`
        })
    }

    const deleteMeal = async(id) => {
        await axiosInstance.delete(`/meal/${id}`)
        setMeals(meals.filter(oneMeal => oneMeal._id !== id))
    }

    useEffect(() => {
        setLoading(true)
        axiosInstance.get(`/restaurant/${restaurantId}`).then(response => {
            setLoading(false)
            setRestaurant(response.data.data)
        })
    }, [])

    useEffect(() => {
        axiosInstance.get(`/meal`, {
            params: {
                restaurant: restaurantId
            }
        }).then(response => {
            console.log(response.data.data)
            setMeals(response.data.data)
        })
    }, [restaurant])

    return (
        <Fragment>
            <AppBackdrop open={loading} />
            <OwnerLayout
                title={restaurant?.name}
                topButton={{ text: "Create Meal", action: handleCreateMeal }}
            >

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
                                                <IconButton color="primary" onClick={() => deleteMeal(singleMeal._id)} style={{ float: "right" }} >
                                                    <Delete />
                                                </IconButton>
                                            </Grid>

                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>


            </OwnerLayout>
        </Fragment>
    )
}

export default SingleRestaurant;