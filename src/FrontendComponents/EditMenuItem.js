import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function EditMenuItem(props) {
    // The useParams hook returns an object of key/value pairs of
    // the dynamic params from the current URL that were matched by
    //the <Route path>.
    let { id } = useParams();

    // React useState Hook to track state in a function component
    //initialize the state variables with an empty string for the form inputs
    const [name, setItemName] = useState('');
    const [allergens, setAllergenInfo] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

        axios.get('http://localhost:4000/api/menu/' + id)
            .then((response) => {
                setItemName(response.data.name);
                setAllergenInfo(response.data.allergens);
                setPrice(response.data.price);
                setIngredients(response.data.ingredients);
                setDescription(response.data.description);
            })
            .catch(function (error) {
                console.log(error);
            })

    }, []);
    //This is a method to handle the submission of the form
    // and creates a UPDATED version of the menu item with the parameters
    const handleSubmit = (event) => {
        event.preventDefault();
        //make an object with the data updates
        const updatedItem = {
            name: name,
            allergens: allergens,
            price: parseFloat(price),
            ingredients: ingredients,
            description: description
        };
        axios.put('http://localhost:4000/api/menu/' + id, updatedItem)
            .then((res) => {
                console.log(res.data);
                navigate('/Menus');
            });
    }

    return (
        <div>
            <h1>Update Existing Item</h1>
            <br></br>
            {/* when the button is clicked the function OnSubmit will be called */}
            {/* take in this information from the user  */}
            <form onSubmit={handleSubmit} style={{padding: '30px'}}>
                <div className="form-group" >
                    <label>Food Item Name: </label>
                    <input
                        style={{backgroundColor: 'whitesmoke'}}
                        type="text"
                        className="form-control"
                        value={name}
                        //set it to the name parameter
                        onChange={(e) => { setItemName(e.target.value) }} />

                </div>
                {/*  Get the allergen Information*/}
                <div className="form-group">
                    <label>Allergen Information: </label>
                    <input
                        style={{backgroundColor: 'whitesmoke'}}
                        type="text"
                        className="form-control"
                        value={allergens}
                        onChange={(e) => { setAllergenInfo(e.target.value) }} />

                </div>
                {/* Price */}
                <div className="form-group">
                    <label>Price: </label>
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
                        <label>Ingredients: </label>
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
                        <label>Description: </label>
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