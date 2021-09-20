import React from 'react'
import ReactDOM from 'react-dom'
import Copyright from '../copyright';


it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Copyright />, div)
})
