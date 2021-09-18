import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import RestaurantCard from 'components/restaurant-card/restaurant-card'
import axiosInstance from 'utils/axiosInstance'
import Layout from 'layouts/layout'
import AppBackdrop from 'components/backdrop/backdrop'
import { useSelector } from 'react-redux'

const Restaurants = ({ history }) => {
    const [restaurants, setRestaurants] = useState([])
    const authState = useSelector(state => state.auth)
    const owner = authState.role === "owner";
    const [loader, setLoader] = useState(false);
    const createRestaurant = () => {
        history.push('/owner/create-restaurant')
    }

    const deleteRestaurant = async (id) => {
        setLoader(true)
        await axiosInstance.delete(`/restaurant/${id}`)
        setLoader(false)
        setRestaurants(restaurants.filter(oneRestaurant => oneRestaurant._id !== id))
    }

    useEffect(() => {
        axiosInstance.get(`/restaurant`).then(response => {
            setRestaurants(response.data.data)
        });

    }, [])

    return (
        <Layout
            title="Restaurants"
            topButton={owner ? { text: "Create", action: createRestaurant } : undefined}>
            <AppBackdrop open={loader} />
            <Grid container spacing={2}>
                {restaurants ? restaurants.map((singleRestaurant, index) =>
                    <Grid md={4} xs={12} item key={index}>
                        <RestaurantCard
                            to={owner
                                ? `/owner/restaurants/${singleRestaurant._id}`
                                : `/restaurants/${singleRestaurant._id}`}
                            name={singleRestaurant.name}
                            description={singleRestaurant.description}
                            mealType={singleRestaurant.mealType}
                            action={owner ? () => deleteRestaurant(singleRestaurant._id) : undefined} />
                    </Grid>
                ) : ""}
            </Grid>
        </Layout>
    )
}

export default Restaurants;