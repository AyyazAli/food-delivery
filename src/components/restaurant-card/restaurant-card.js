import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { Delete, Restaurant, RestaurantMenu } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react'
import { Link } from 'react-router-dom';


const RestaurantCard = ({ to, name, description, mealType, action }) => {
    return (
        <Card data-testid="restaurant-card">
            <Link style={{ textDecoration: 'none', color: "inherit" }} to={to}>
                <CardActionArea>
                    <CardHeader title={
                        <Typography variant="h2">
                            {name}
                        </Typography>
                    } avatar={
                        <RestaurantMenu />

                    } />
                    <CardContent >
                        <Typography variant="body1">
                            {description}
                        </Typography>
                        <Typography variant="body2" color="error">
                            Meal Type: {mealType}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            {action ? <CardActions>
                <Button onClick={action} color="primary" variant="contained">
                    <Delete />
                </Button>

            </CardActions> : ""}
        </Card>

    )
}

RestaurantCard.PropType = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mealType: PropTypes.string.isRequired
}

export default RestaurantCard;