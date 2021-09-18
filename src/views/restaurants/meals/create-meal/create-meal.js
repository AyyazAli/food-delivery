import { Box, Button, Card, CardContent, TextField } from '@material-ui/core'
import Layout from 'layouts/layout'
import React from 'react'
import qs from 'qs'
import axiosInstance from 'utils/axiosInstance'


const CreateMeal = ({ location, history }) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        await axiosInstance.post('/meal', {
            restaurantId: query.restaurantId,
            name: data.get('name'),
            description: data.get('description'),
            price: data.get('price')
        })
        history.push(`/owner/restaurants/${query.restaurantId}`)
    }
    return (
        <Layout
            title={`Create ${query.name} Meal`}
        >
            <Card>
                <CardContent style={{
                    display: 'block',
                    alignContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                    textAlign: 'center',
                    // marginLeft: '20%'
                }}>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            variant="outlined"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="description"
                            label="Description"
                            type="text"
                            id="description"
                            variant="outlined"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="price"
                            label="Price"
                            type="number"
                            id="price"
                            variant="outlined"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            color="primary"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default CreateMeal