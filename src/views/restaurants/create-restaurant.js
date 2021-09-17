import { Card, Box, TextField, Typography, Button, CardContent, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import OwnerLayout from 'layouts/owner-layout/owner-layout';
import React, { useState } from 'react'
import axiosInstance from 'utils/axiosInstance';

const CreateRestaurant = ({ history }) => {
    const [mealType, setMealType] = useState('seaFood');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const result = await axiosInstance.post('/restaurant', {
            name: data.get('name'),
            description: data.get('description'),
            mealType: data.get('mealType')
        })
        history.push('/owner/restaurants')
    }

    return (
        <OwnerLayout title="Create Restaurant">
            <Card style={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                padding: '1rem'
            }}>
                <CardContent>

                </CardContent>
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
                        label="description"
                        type="description"
                        id="description"
                        variant="outlined"
                        autoComplete="current-password"
                    />
                    <FormControl fullWidth>
                        <InputLabel id="restaurant-meal-type"> Meal Type </InputLabel>
                        <Select
                            required
                            labelId="restaurant-meal-type"
                            label="Meal Type"
                            name="mealType"
                            defaultValue={mealType}
                            value={mealType}
                            variant="outlined"
                            onChange={(event) => setMealType(event.target.value)}>
                            <MenuItem value="seaFood">
                                Sea Food
                            </MenuItem>
                            <MenuItem value="fastFood">
                                Fast Food
                            </MenuItem>
                            <MenuItem value="chineese">
                                Chineese
                            </MenuItem>
                        </Select>
                    </FormControl>
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
            </Card>
        </OwnerLayout>
    )
}

export default CreateRestaurant;