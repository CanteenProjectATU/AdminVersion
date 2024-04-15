import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MenuItems from './MenuItem';
import { getAuthenticationTokenFromLocalStorage } from '../utilities/utils';

//This page displays all the menu items in the database regardless of assigned day so they can be added to a day
const AddMenuItemToDay = () => {
    const { day } = useParams();
    const [menuItems, setMenuItem] = useState([]);
    const navigate = useNavigate();

    //get all the menu items from database
    useEffect(
        () => {

            const token = getAuthenticationTokenFromLocalStorage(); // Retrieve authentication token from localStorage

            axios.get('http://localhost:4000/menu_items', {
                headers: {
                    Authorization: `${token}` // Include token in the request headers
                }
            }).then((response) => {
                setMenuItem(response.data)
            }).catch((error) => { //catch errors - is to send an error message to the console
                console.log(error.response.data.message);
            });
        }, []
    );

    //Refence: I had the wrong way (I didnt pass in menuItemId for example) so this method was assisted by chatGPT
    //This method is for adding a specific menu item to specific days of the week. It should cause the card to appear in that menu display
    const addToDay = (menuItemId) => {
        //Get the password that allows for admin actions from the local storage and assign it to a variable
        const token = getAuthenticationTokenFromLocalStorage(); // Retrieve authentication token from localStorage
        //Write to the console what id was added to what day
        console.log(`Adding to day: ${day}, MenuItemId: ${menuItemId}`);
        //PUT request that is sent to the server (with the token for authentication) for that day to have that item id added to it
        axios.put(`http://localhost:4000/menu/${day}/${menuItemId}`, {}, {
            headers: {
                Authorization: `${token}` // Include token in the request headers
            }
        })
        .then(()=>  {
            
            //if it is added correctly alert the user that it worked on they will end up clicking multiple times
            alert('Added menu item to ' + day)
            navigate('/day/'+day)
        }).catch((error) => { //catch errors - is to send an error message to the console
                console.log(error.response.data.message);
            });
    }

    

    return (
        <div>
            <h1>Add Item to Day</h1>
            <h2>Choose which item to add to {day} by clicking on the card</h2>
            {/* The map function iterates over all the menu items and will display a list of the items */}
            {menuItems.map(item => (
                <MenuItems
                    key={item._id}  //this is the identifier
                    myMenuItem={item}  //passes in this items information
                    onClick={() => addToDay(item._id)} //When the card is clicked call the addToDay function
                    isClickable={true} // This allows the entire card to be clicked as I have not assigned a button for add to day
                    isInDay={false}
                />
                
            ))}
        </div>

    );


};

export default AddMenuItemToDay;