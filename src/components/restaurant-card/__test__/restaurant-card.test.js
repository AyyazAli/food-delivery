import { cleanup, render } from '@testing-library/react';
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import RestaurantCard from '../restaurant-card';
import { createBrowserHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer'

const history = createBrowserHistory();

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Router>
            <RestaurantCard to="/" />
        </Router>, div)
})


it("renders restaurant card correctly", () => {
    const { getByTestId } = render(
        <Router history={history}>
            <RestaurantCard
                to="/"
                name="KFC"
                description="Best Burgers in town"
                mealType="fastFood"
                action={() => { }} />
        </Router>
    )

    expect(getByTestId('restaurant-card')).toHaveTextContent("KFC")
})

it("matches snapshot", () => {
   const tree = renderer.create(
        <Router history={history}>
            <RestaurantCard
                to="/"
                name="KFC"
                description="Best Burgers in town"
                mealType="fastFood"
                action={() => { }} />
        </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot();
})