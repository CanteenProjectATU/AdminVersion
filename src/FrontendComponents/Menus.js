import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button, Card, CardImg, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import '../CssFiles/Menu.css';
import LoadMenuItems from './LoadMenuItem';

//This page displays the menu cards under the relevent day
const MenuPage = () => {
  //holds the menu items data
  const [data, setData] = useState([]);

  //useEffect is a React Hook that lets you synchronize a component with an external system.
  //i.e. get the items data
  useEffect(
    () => {
      //asyncrious operation taking place here - it waits
      //callback, get data from menuItems component
      axios.get('http://localhost:4000/menu_items').then((response) => {
        console.log("Getting the info"+response.data)
        setData(response.data)
      }).catch((error) => { //send an error message to the console
        console.log(error);
      });
    }, []
  );

  //to make the component automatically update when deleted so you dont have to refresh
  const Reload = (e) => {
    //get all the data from the database
    axios.get('http://localhost:4000/menu_items').then((response) => {
      setData(response.data)
    }).catch((error) => { //send an error message to the console
      console.log(error);
    });

  }

  return (
    <div className="menuPage">
      {/* This page is supposed to lead you to the other pages */}
      <h1>Choose a day of the week!</h1>
      
      <Container className="buttonsContainer" fluid>
        <Link to="/Monday">
          <button className="navButtons">Monday</button>
        </Link>
        <Link to="/Tuesday">
          <button className="navButtons">Tuesday</button>
        </Link>
        <Link to="/Wednesday">
          <button className="navButtons">Wednesday</button>
        </Link>
        <Link to="/Thursday">
          <button className="navButtons">Thursday</button>
        </Link>
        <Link to="/Friday">
          <button className="navButtons">Friday</button>
        </Link>
        
      </Container>
    </div>
  )
  
};

export default MenuPage;