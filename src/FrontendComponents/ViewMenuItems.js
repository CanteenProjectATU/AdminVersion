import React from 'react';
import axios from 'axios';import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { getAuthenticationTokenFromLocalStorage } from '../utilities/utils';
import '../CssFiles/Recipe.css';
import MenuItems from './MenuItem';

const ViewMenuItems = () => {

  const [menuItems, setMenuItems] = useState([]);

  useEffect(
    () => {

        const token = getAuthenticationTokenFromLocalStorage(); // Retrieve authentication token from localStorage

        axios.get('http://localhost:4000/menu_items', {
            headers: {
                Authorization: `${token}` // Include token in the request headers
            }
        }).then((response) => {
            setMenuItems(response.data)
        }).catch((error) => { //catch errors - is to send an error message to the console
            console.log(error.response.data.message);
        });
    }, []
  );

  const Reload = (e) => {

    const token = getAuthenticationTokenFromLocalStorage(); // Retrieve authentication token from localStorage
    //get all the data from the database
    axios.get(`http://localhost:4000/menu_items`, {
        headers: {
            Authorization: `${token}` // Include token in the request headers
        }
    }).then((response) => {
      setMenuItems(response.data)
    }).catch((error) => { //send an error message to the console
        console.log(error);
    });

}

  return (

    <div>
      {menuItems.map(item => (
        <MenuItems Reload={Reload} myMenuItem={item} key={item._id} isInDay={false}/>
      ))}
    </div>


  );
}
export default ViewMenuItems;