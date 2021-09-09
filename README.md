# Food Delivery Application

### Introduction

> The application focuses on a food delivery system where users can create an account and should be able to login in order to access the content of the application. 
#### Project Details
- There are two type of users
    * Regular User: Can see all restaurants and place orders from them
    * Restaurant Owner: Can CRUD restaurants and meals
- A Restaurant should have a name and description of the type of food they serve
- A meal should have a name, description, and price
- Orders consist of a list of meals, date, total amount and status
- An Order should be placed for a single Restaurant only, but it can have multiple meals
- Restaurant Owners and Regular Users can change the Order Status respecting below flow and permissions:
    * Placed: Once a Regular user places an Order
    * Canceled: If the Regular User cancel the Order
    * Processing: Once the Restaurant Owner starts to make the meals
    * In Route: Once the meal is finished and Restaurant Owner marks it’s on the way
    * Delivered: Once the Restaurant Owner receives information that the meal was delivered by their staff
    * Received: Once the Regular User receives the meal and marks it as Received
- Status should follow the sequence as stated above, and not allowed to move back
- Status can not be changed by a different user than is stated above
- Orders should have a history about the date and time of the status changing
- Both Regular Users and Restaurant Owners should be able to see a list of the orders
- Restaurant Owners have the ability to block a User

### Installation

> Use **`Yarn install`** to install the dependencies

## Technical Details
This section will include all kind of technical details necessary to run the project successfully

### Frontend Details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

###### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

###### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

###### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Backend Details
The project uses **nodemon** to run the developement environment. 

###### `yarn start:server` 
This will run the backend for the application and will be used to communicate with frontend
_Use **yarn start:server** to run backend server_ on **port 4200**. `server.js` will be responsible to handle all the communication to and from the application.
