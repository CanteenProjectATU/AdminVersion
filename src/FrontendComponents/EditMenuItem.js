import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getAuthenticationTokenFromLocalStorage } from "../utilities/utils";

//This page is a form for updating the information of an existing menu item
export default function EditMenuItem(props) {
    //Reference: Martin Kenirons notes from Data Representation
    // The useParams hook returns an object of key/value pairs of
    // the dynamic params from the current URL
    let { id } = useParams();

    // React useState Hook to track state in a function component
    //initialize the state variables with an empty string for the form inputs
    const [name, setItemName] = useState('');
    const [allergens, setAllergenInfo] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [description, setDescription] = useState('');

    //for navigating to other pages
    const navigate = useNavigate();

    //the useEffect hook to get the current menu data
    useEffect(() => {
        const token = getAuthenticationTokenFromLocalStorage(); // Retrieve authentication token from localStorage
        //get the information for this id
        axios.get('http://localhost:4000/menu_items/' + id, {
            headers: {
                Authorization: `${token}` // Include token in the request headers
            }
        })
            .then((response) => {
                setItemName(response.data.name);
                setAllergenInfo(response.data.allergens);
                setPrice(response.data.price);
                setIngredients(response.data.ingredients);
                setDescription(response.data.description);
            })
            .catch(function (error) {
                console.log(error.response.data.message);
            })

    }, []);
    //This is a method to handle the submission of the form
    // and creates a UPDATED version of the menu item with the parameters
    const handleSubmit = (event) => {
        event.preventDefault();

        const token = getAuthenticationTokenFromLocalStorage(); // Retrieve authentication token from localStorage

        //make an object with the data updates
        const updatedItem = {
            name: name,
            allergens: allergens,
            price: parseFloat(price),
            ingredients: ingredients,
            description: description
        };
        //update the info in the database
        axios.put('http://localhost:4000/menu_items/' + id, updatedItem, {
            headers: {
                Authorization: `${token}` // Include token in the request headers
            }
        })
            .then((res) => {
                console.log(res.data);
                navigate('/ViewItems');
            })
            .catch(error => {
                console.log(error.response.data.message);
            });;
    }

    return (
        <div>
            <h1>Update Existing Item</h1>
            <br></br>
            {/* when the button is clicked the function handleSubmit will be called */}
            {/* take in this information from the user  */}
            <form onSubmit={handleSubmit} style={{padding: '30px'}}>
                <div className="form-group" >
                    <label>Edit Food Item Name: </label>
                    <input
                        //make the boxes a bit more visible
                        style={{backgroundColor: 'whitesmoke'}}
                        type="text"
                        className="form-control"
                        value={name}
                        //set it to the name parameter
                        onChange={(e) => { setItemName(e.target.value) }} />

                </div>
                {/*  Get the allergen Information*/}
                <div className="form-group">
                    <label>Edit Allergen Information: </label>
                    <input
                        style={{backgroundColor: 'whitesmoke'}}
                        type="text"
                        className="form-control"
                        value={allergens}
                        onChange={(e) => { setAllergenInfo(e.target.value) }} />

                </div>
                {/* Price */}
                <div className="form-group">
                    <label>Edit Price: </label>
                    <input
                        style={{backgroundColor: 'whitesmoke'}}
                        type="text"
                        className="form-control"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }} />

                </div>
                {/* Checkboxes for choosing multiple days that the item could be sold on */}
                    {/* Ingredients */}
                    <div className="form-group">
                        <label>Edit Ingredients: </label>
                        <input
                            style={{backgroundColor: 'whitesmoke'}}
                            type="text"
                            className="form-control"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label>Edit Description: </label>
                        <textarea
                            style={{backgroundColor: 'whitesmoke'}}
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                <br></br>
                {/* button that calls the submit function */}
                <div>
                    <input type="submit" value="Edit Menu Item" className="btn btn-info" />
                </div>
            </form>

        </div>
    );
}